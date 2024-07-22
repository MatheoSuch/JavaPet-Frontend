import React from 'react';
import './Navbar.css';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../../assets/Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const NavBar = () => {
	const session = localStorage.getItem('token') !== null;
	const role = localStorage.getItem('rol');
	const navigate = useNavigate();

	const handleLogout = () => {
		Swal.fire({
			title: '¿Estás seguro?',
			text: '¡Quieres cerrar sesión!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#007bff',
			cancelButtonColor: '#6c757d',
			confirmButtonText: 'Sí, cerrar sesión',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				localStorage.removeItem('token');
				localStorage.removeItem('rol');
				navigate('/Login');
			}
		});
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
								<Link to="/Planes" className="nav-link custom-nav-link">
									Nuestros Servicios
								</Link>
								<Link to="/Contactanos" className="nav-link custom-nav-link">
									Contactanos
								</Link>
								{role === 'admin' && (
									<Link to="/AdminHome" className="nav-link custom-nav-link">
										Administración
									</Link>
								)}
								<Nav.Link onClick={handleLogout} className="custom-nav-link">
									Cerrar Sesión
								</Nav.Link>
							</>
						) : (
							<>
								<Link to="/" className="nav-link custom-nav-link">
									Inicio
								</Link>
								<Link to="/QuienesSomos" className="nav-link custom-nav-link">
									Quienes Somos
								</Link>
								<Link to="/Planes" className="nav-link custom-nav-link">
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
