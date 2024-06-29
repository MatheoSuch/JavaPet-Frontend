import React from "react";
import "../Navbar/Navbar.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  let session = JSON.parse(sessionStorage.getItem("stateSession")) || false;
  const navigate = useNavigate();

  const handleClose = () => {
    if (session) {
      session = false;
      sessionStorage.setItem("stateSession", JSON.stringify(session));      
      navigate("/Login");
    }
  };
  return (
    <div className="">
      <Navbar className="bg-celeste" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="/" className="text-white">
            {" "}
            <img
              src={logo}
              width="80"
              height="50"
              className="d-inline-block align-top"
              alt="Logo Rolling Vet"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {session ? (
                <>
                  <Link to="/" className="nav-link text-white">
                    Inicio
                  </Link>
                  <Link to="/QuienesSomos" className="nav-link text-white">
                    Quienes Somos
                  </Link>
                  <Link to="/*" className="nav-link text-white">
                    {" "}
                    Nuestros Servicios
                  </Link>
                  <Link to="/Contactanos" className="nav-link text-white">
                    Contactanos
                  </Link>
                  <Link to="/Adm" className="nav-link text-white">
                    Administracion
                  </Link>                  
                  <Nav.Link onClick={handleClose} className="text-white">
                    Logout
                  </Nav.Link>
                  <div className="text-end">
                    <Nav.Link className="text-white">USUARIO: "Administrador"</Nav.Link>
                  </div>                 
                </>
              ) : (
                <>
                  <Link to="/" className="nav-link text-white">
                    Inicio
                  </Link>
                  <Link to="/QuienesSomos" className="nav-link text-white">
                    Quienes Somos
                  </Link>
                  <Link to="/Error404" className="nav-link text-white">      
                    Nuestros Servicios
                  </Link>
                  <Link to="/Contactanos" className="nav-link text-white">
                    Contactanos
                  </Link>
                  <Link to="/Login" className="nav-link text-white">Inicio Sesion
                  </Link>                  
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;