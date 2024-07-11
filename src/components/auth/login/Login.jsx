import React, { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import javaPetApi from '../../../api/javaPetApi';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import contacto from '../../../assets/contactoIMG.jpeg';
import NavBar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const resp = await javaPetApi.post('/auth/login', {
				email,
				password,
			});

			localStorage.setItem('token', resp.data.token);
			if (resp.data.rol === 'usuario') {
				navigate('/shop');
			} else {
				navigate('/admin');
			}
			Swal.fire('Bienvenido!', 'JavaPet', 'success');
		} catch (error) {
			let errorMsg = 'Error desconocido';
			if (error.response?.data?.msg) {
				errorMsg = error.response.data.msg;
			}
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: errorMsg,
				footer: '<a href="#">Why do I have this issue?</a>',
			});
		}
	};

	return (
		<div>
			<NavBar />
			<Container className="py-5">
				<h1 className="font-celeste-crud">Iniciar Sesión</h1>
				<hr />
				<div className="my-5">
					<Form className="my-5" onSubmit={handleSubmit} noValidate>
						<Row>
							<Col xs={12} md={6} className="my-2">
								<Form.Group className="mb-3">
									<Form.Label className="font-celeste-crud" htmlFor="email">
										Nombre de usuario / email
									</Form.Label>
									<Form.Control
										type="email"
										id="email"
										placeholder="Usuario"
										value={email}
										onChange={(e) => setEmail(e.target.value.trim())}
										required
									></Form.Control>
								</Form.Group>
								<Form.Group className="mb-3">
									<Form.Label className="font-celeste-crud" htmlFor="password">
										Contraseña
									</Form.Label>
									<Form.Control
										required
										id="password"
										type="password"
										placeholder="Contraseña"
										value={password}
										onChange={(e) => setPassword(e.target.value.trim())}
									></Form.Control>
								</Form.Group>

								<div className="text-end">
									<button className="btn-celeste-crud mb-4">Ingresar</button>
								</div>
								<span className="register-question">¿No tienes una cuenta?</span>
								<Link to="/register" className="register-link ms-2">
									Regístrate aquí
								</Link>
							</Col>
							<Col xs={12} md={6} className="my-2">
								<img src={contacto} width="100%" alt="Imagen de contacto"></img>
							</Col>
						</Row>
					</Form>
				</div>
			</Container>
			<Footer />
		</div>
	);
};
