import React from 'react';
import '../Navbar/Navbar.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../../assets/Logo.png';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
	let session = JSON.parse(sessionStorage.getItem('stateSession')) || false;
	const navigate = useNavigate();

	const handleClose = () => {
		if (session) {
			session = false;
			sessionStorage.setItem('stateSession', JSON.stringify(session));
			navigate('/Login');
		}
	};
	return (
		<div>
			<Navbar className="bg-celeste" expand="lg" variant="dark">
				<Navbar.Brand href="/" className="text-white">
					<img
						src={logo}
						className="d-inline-block align-top navbar-logo mx-3"
						alt="Logo Rolling Vet"
					/>
				</Navbar.Brand>
				<Navbar.Toggle
					aria-controls="basic-navbar-nav"
					className="navbar-toggler-custom mx-5"
				/>
				<Navbar.Collapse id="basic-navbar-nav" className="mx-3">
					<Nav className="ms-auto">
						{session ? (
							<>
								<Link to="/" className="nav-link custom-nav-link">
									Inicio
								</Link>
								<Link to="/QuienesSomos" className="nav-link custom-nav-link">
									Quienes Somos
								</Link>
								<Link to="/*" className="nav-link custom-nav-link">
									Nuestros Servicios
								</Link>
								<Link to="/Contactanos" className="nav-link custom-nav-link">
									Contactanos
								</Link>
								<Link to="/Adm" className="nav-link custom-nav-link">
									Administración
								</Link>
								<Nav.Link onClick={handleClose} className="custom-nav-link">
									Logout
								</Nav.Link>
								<div className="text-end">
									<Nav.Link className="custom-nav-link">
										USUARIO: "Administrador"
									</Nav.Link>
								</div>
							</>
						) : (
							<>
								<Link to="/" className="nav-link custom-nav-link">
									Inicio
								</Link>
								<Link to="/QuienesSomos" className="nav-link custom-nav-link">
									Quienes Somos
								</Link>
								<Link to="/Error404" className="nav-link custom-nav-link">
									Nuestros Servicios
								</Link>
								<Link to="/Contactanos" className="nav-link custom-nav-link">
									Contactanos
								</Link>
								<Link to="/Login" className="nav-link custom-nav-link">
									Inicio Sesión
								</Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

export default NavBar;
