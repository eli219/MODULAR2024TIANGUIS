const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
  
const db = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: "",
});

const pool = mysql.createPool({
    host: "",
    user: "",
    password: "",
    database: "",
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err);
    } else {
        console.log("Conexión exitosa a la base de datos");
    }
});

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000","https://sistemaintegraldetianguis.com"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);

let uploading = multer({
  dest: './public/files'
})

app.get('/health', (req, res) => {
    // Verifica si la aplicación está funcionando correctamente
    // En este caso, simplemente respondemos con un estado 200 OK
    res.status(200).send('OK 1');
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Usar el pool para obtener una conexión
    pool.getConnection((err, connection) => {
        if (err) {
            res.status(500).json({ error: 'Error al conectar a la base de datos: ' + err });
            return;
        }

        // Ejecutar la consulta usando la conexión obtenida del pool
        connection.execute(
            'SELECT * FROM users WHERE email = ? AND password = ?',
            [email, password],
            (err, result) => {
                // Libera la conexión una vez que se ha completado la consulta
                connection.release();

                if (err) {
                    res.status(500).json({ error: 'Error en la consulta a la base de datos: ' + err });
                } else {
                    if (result.length > 0) {
                        res.status(200).json(result);
                    } else {
                        res.status(401).json({ message: 'Combinación de correo/contraseña incorrecta' });
                    }
                }
            }
        );
    });
});

// Ruta para registrar un comerciante
app.post('/registrarComerciante', async (req, res) => {
    let folio
    try {
        const connection = await pool.promise().getConnection();

        // Obtener el último folio
        const [result] = await connection.execute(
            'SELECT folio FROM comerciantes ORDER BY folio DESC LIMIT 1'
        );
        
        if (result.length === 0) {
          folio = 1
        } else {
          folio = result[0].folio + 1
        }

        const { nombre, tianguis, metros, giro, piso, basura } = req.body.nuevoComerciante;
        // Obtener la fecha actual
        const fechaActual = new Date();
        
        // Formatear la fecha en el formato YYYY-MM-DD
        const fecha = fechaActual.toISOString().slice(0, 10);

        // Insertar el nuevo comerciante
        const [insertResult] = await connection.execute(
            `INSERT INTO comerciantes (folio, fecha, nombre, tianguis, metros, giro, piso, basura) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [folio, fecha, nombre, tianguis, metros, giro, piso, basura]
        );

        connection.release();

        if (insertResult.affectedRows === 1) {
            res.status(200).json({ message: 'Comerciante registrado exitosamente' });
        } else {
            res.status(500).json({ message: 'Error al registrar el comerciante' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error de servidor al intentar registrar el comerciante: ' + err.message });
    }
});

app.post('/buscarComerciante', async (req, res) => {
    const nombre = req.body.nombre;

    try {
        const connection = await pool.promise().getConnection();

        // Realiza la consulta para buscar un comerciante por nombre
        const [result] = await connection.execute(
            'SELECT * FROM comerciantes WHERE nombre = ? LIMIT 1',
            [nombre]
        );

        connection.release();

        // Si hay resultados, los devuelve
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: 'No se encontró un comerciante con el nombre especificado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error de servidor al buscar el comerciante: ' + err.message });
    }
});

app.post('/subirimagen', uploading.single('file'), async (req, res) => {
    try {
        if (!req.file || req.file.length === 0) {
            return res.status(400).json({ error: 'Ingrese una imagen' });
        }

        const fileType = req.file.mimetype;
        if (!fileType.includes('image/jpeg') && !fileType.includes('image/png')) {
            return res.status(400).json({ error: 'Formato de imagen no válido' });
        }

        const { folio, nombre, tianguis, fecha } = JSON.parse(req.body.folioComerciante);
        const monto = JSON.parse(req.body.monto)
        const codigoqr = req.file.filename;

        const connection = await pool.promise().getConnection();

        const [insertResult] = await connection.execute(
            `INSERT INTO comerciantespago (folio, nombre, tianguis, fecha, codigoqr, monto)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [folio, nombre, tianguis, fecha, codigoqr, monto]
        );

        connection.release();

        if (insertResult.affectedRows === 1) {
            return res.status(200).json({ message: 'Comerciante registrado exitosamente' });
        } else {
            return res.status(500).json({ error: 'Error al registrar el comerciante' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error de servidor al intentar registrar el comerciante: ' + err.message });
    }
});

app.post('/mostrarImagen', (req, res) => {
    const codigoqr = req.body.codigoqr;

    if (!codigoqr) {
        return res.status(400).json({ error: 'Código QR no proporcionado' });
    }

    try {
        const rutaArchivo = path.join(__dirname, 'public/files', codigoqr);
        res.sendFile(rutaArchivo);
    } catch (err) {
        res.status(500).json({ error: 'Error al enviar el código: ' + err.message });
    }
});


app.post('/registrarTarifa', async (req, res) => {
    let id
    try {
        const connection = await pool.promise().getConnection();

        const [result] = await connection.execute(
            'SELECT id FROM tarifatianguis ORDER BY id DESC LIMIT 1'
        );

        if (result.length === 0) {
            id = 1
        } else {
            id = result[0].id + 1
        }


        const { nombre, precio, basura } = req.body.nuevaTarifa;

        const [insertResult] = await connection.execute(
            `INSERT INTO tarifatianguis (id, nombreTianguis, costoMetros, tarifaBasura)
             VALUES (?, ?, ?, ?)`,
            [id, nombre, precio, basura]
        );

        connection.release();

        if (insertResult.affectedRows === 1) {
            res.status(200).json({ message: 'Tarifa registrada correctamente' });
        } else {
            res.status(500).json({ error: 'Error al registrar la tarifa' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error de servidor al intentar registrar la tarifa: ' + err.message });
    }
});


app.get('/registrarComerciante', async (req, res) => {
    try {
        const connection = await pool.promise().getConnection();
        
        const [result] = await connection.execute('SELECT * FROM comerciantes');
        
        connection.release();
        
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Error de servidor al obtener los comerciantes: ' + err.message });
    }
});


app.get('/listarPagosComerciante', async (req, res) => {
    try {
        const connection = await pool.promise().getConnection();
        
        const [result] = await connection.execute('SELECT * FROM comerciantespago');
        
        connection.release();
        
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Error de servidor al obtener los pagos de comerciantes: ' + err.message });
    }
});


app.get('/listarTarifa', async (req, res) => {
    try {
        const connection = await pool.promise().getConnection();
        
        const [result] = await connection.execute('SELECT * FROM tarifatianguis');
        
        connection.release();
        
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Error de servidor al obtener las tarifas: ' + err.message });
    }
});

app.listen();
