import React, { useState } from "react";
import Axios from "axios";
import { StyledHome, StyledLogin, StyledTitle, StyledInput, StyledButton } from './styles';
import Button from '../../../components/Button';
import logo from '../../../Images/logo.png'
import TitleLogin from "../../../components/TitleLogin";
import Input from '../../../components/Input';
import { useNavigate } from "react-router-dom";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [expectedCaptcha, setExpectedCaptcha] = useState(generateCaptcha());
  const [errorMessage, setErrorMessage] = useState('');
  const [isCaptchaVisible, setIsCaptchaVisible] = useState(false);
  const navigate = useNavigate();

  function generateCaptcha() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCaptchaInputChange = (event) => {
    setCaptchaInput(event.target.value);
  };

  const handleLogin = () => {
    if (isCaptchaVisible && captchaInput.toUpperCase() !== expectedCaptcha) {
      setErrorMessage("Por favor, ingresa el código de captcha correcto.");
      return;
    }

    Axios.post("https://node.sistemaintegraldetianguis.com/login", {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.length > 0) {
        setErrorMessage("");
        navigate("/home");
      } else {
        setErrorMessage("Credenciales incorrectas");
      }
    }).catch((error) => {
      setErrorMessage("Error al iniciar sesión");
      console.error('Error al iniciar sesión:', error);
    });
  };

  const regenerateCaptcha = () => {
    setCaptchaInput('');
    setExpectedCaptcha(generateCaptcha());
    setIsCaptchaVisible(true);
  };

  return (
    <div className="App">
      <StyledHome>
        <StyledLogin>
          <img src={logo} className='logo'/>
          <StyledTitle>
            <TitleLogin className='Title' text="Iniciar Sesión" />
          </StyledTitle>
          <StyledInput> 
            <Input
              label={"Correo Electrónico"}
              name="email"
              id="email"
              value={email}
              setValue={setEmail}
              placeholder={"a@a.com"}
              onChange={handleEmailChange}
            />
            <Input
              label={"Contraseña"}
              placeholder={"******"}
              name="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            {isCaptchaVisible && (
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img
                  src={`https://dummyimage.com/120x40/3498db/fff&text=${expectedCaptcha}`}
                  alt="Captcha"
                  style={{
                    width: '50%',
                    marginLeft:'-70px',
                    marginTop:'10px',
                    height: 'auto',
                    border: '2px solid #3498db',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#ecf0f1',
                    overflow: 'hidden',
                  }}
                />
              </div>
            )}
            <Input
              label={"Código de Captcha"}
              name="captcha"
              value={captchaInput}
              onChange={handleCaptchaInputChange}
            />
            <StyledButton>
            <Button
              width="200px"
              height="40px"
              onClick={handleLogin}
            >
              Ingresar
            </Button>
            <div style={{marginRight:'35px'}}/>
            <Button
              width="200px"
              height="40px"
              onClick={regenerateCaptcha}
            >
              Generar nuevo código
            </Button>
            </StyledButton>
            {errorMessage && <p>{errorMessage}</p>}
          </StyledInput>
        </StyledLogin>
      </StyledHome>
    </div>
  );
}

export default App;

