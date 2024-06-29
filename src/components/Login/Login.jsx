import React, { useState, useEffect } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
// import {Footer} from "../Footer/Footer";
// import {NavBar} from "../NavBar/Navbar";
import contacto from "../../assets/contactoIMG.jpeg" ;
import bcrypt from "bcryptjs/dist/bcrypt";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { validateEmail, validatePass, validateTexto } from "../Validaciones/Validaciones";
import "./Login.css";
const Login = ({ user }) => {
  const [logUser, setLogUser] = useState("");
  const [logPass, setLogPass] = useState("");
  const [inputUser, setInputUser] = useState("");
  const [inputPass, setInputPass] = useState("");

  useEffect(() => {
    setInputUser(document.getElementById("inputUser"));
    setInputPass(document.getElementById("inputPass"));
  }, []);
  let session = false;
  const navigate = useNavigate();
  const testPass = () => {
    if (validatePass(inputPass.value) && inputPass.value.length === 8) {
      inputPass.className = "form-control is-valid";
      return true;
    } else {
      inputPass.className = "form-control is-invalid";
      return false;
    }
  };

  const testUser = () => {
    if (validateEmail(inputUser.value) && inputUser.value.length > 5) {
      inputUser.className = "form-control is-valid";
      return true;
    } else {
      inputUser.className = "form-control is-invalid";
      return false;
    }
  };
  const gralValidate = () => {
    if (
      bcrypt.compareSync(logUser, user[0].userName) &&
      bcrypt.compareSync(logPass, user[0].pass)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (gralValidate()) {
      session = true;
      sessionStorage.setItem("stateSession", JSON.stringify(session));
      Swal.fire('Bienvenido "ADMINISTRADOR"!', "JavaPet", "success");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else if (testUser()) {
      Swal.fire("Ops!", "Por favor ingrese la contraseña", "error");
      inputPass.className = "form-control is-invalid";
    } else if (testPass()) {
      Swal.fire("Ops!", "Por favor ingrese su nombre de usuario", "error");
      inputUser.className = "form-control is-invalid";
    } else {
      Swal.fire("Ops", "Debe completar todos los campos", "error");
      inputPass.className = "form-control is-invalid";
      inputUser.className = "form-control is-invalid";
    }
  };
  return (
    <div>
      {/* <NavBar /> */}
      <Container className="py-5">
        <h1 className="font-celeste-crud">INICIE SESION</h1>
        <hr />
        <div className="my-5">
          <Form className="my-5" onSubmit={handleSubmit} noValidate>
            <Row>
              <Col xs={12} md={6} className="my-2">
                <Form.Group className="mb-3">
                  <Form.Label className="font-celeste-crud" htmlFor="inputUser">
                    Nombre de usuario / email
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="inputUser"
                    placeholder="Usuario"
                    onChange={({ target }) => {
                      setLogUser(target.value.trimStart());
                      testUser();
                    }}
                    minLength={5}
                    maxLength={50}
                    required
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Ingrese un usuario valido
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="font-celeste-crud" htmlFor="inputPass">
                    Contraseña
                  </Form.Label>
                  <Form.Control
                    required
                    id="inputPass"
                    type="password"
                    placeholder="Contraseña"
                    onChange={({ target }) => {
                      setLogPass(target.value.trimStart());
                      testPass();
                    }}
                    minLength={8}
                    maxLength={8}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Ingrese una contraseña valida
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="text-end">
                  <button className="btn-celeste-crud">Ingresar</button>
                </div>
              </Col>
              <Col xs={12} md={6} className="my-2">
                <img src={contacto} width="100%" alt="Imagen de contacto"></img>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
      {/* <Footer /> */}
    </div>
  );
};

export default Login;