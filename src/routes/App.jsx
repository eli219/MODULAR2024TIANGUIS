
import React from 'react';
import { BrowserRouter as Router, Route, Switch,Routes } from 'react-router-dom';
import Login from '../containers/Home/Login/login';
import Tarifas from '../containers/Home/Tarifas/Tarifas';
import Comerciantes from '../containers/Home/Comerciantes/comerciantes';
import Home from '../containers/Home/Home';
import Configuracion from '../containers/Home/Configuracion/configuracion';
import Pagos from '../containers/Home/Pagos/Pagos';
import Movil from '../containers/Home/AppMovil/Movil';

const App = () => {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<Login />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tarifas" element={<Tarifas />} />
        <Route path="/comerciantes" element={<Comerciantes />} />
        <Route path="/pagos" element={<Pagos />} />
        <Route path="/movil" element={<Movil />} />
        <Route path="/configuracion" element={<Configuracion/>}/>
        <Route path="*" element={<Login />} />
        
      </Routes>
    </Router>
  );
};

export default App;
