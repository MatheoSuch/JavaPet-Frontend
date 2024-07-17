import React, { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import javaPetApi from '../../../api/javaPetApi';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import contacto from '../../../assets/contactoIMG.jpeg';
import NavBar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import alertImage from '../../../assets/Logo.png';

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	const validateForm = () => {
		const newErrors = {};
		if (!email) newErrors.email = 'El email es requerido';
		else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'El email no es válido';
		if (!password) newErrors.password = 'La contraseña es requerida';
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;

		try {
			const resp = await javaPetApi.post('/auth/login', { email, password });
			console.log(resp);
			localStorage.setItem('token', resp.data.token);
			if (resp.data.rol === 'usuario') {
				navigate('/');
			} else {
				navigate('/admin');
			}
			Swal.fire({
				title: '¡Bienvenido a JavaPet!',
				html: `<p>Estamos encantados de verte de nuevo, <strong>${email}</strong>!</p>`,
				icon: 'success',
				customClass: {
					popup: 'animated fadeInDown faster',
				},
				background: '#218b99',
				confirmButtonColor: '#purple',
				timer: 4000,
				timerProgressBar: true,
				imageUrl: alertImage,
				imageWidth: 100,
				imageHeight: 100,
				imageAlt: 'JavaPet',
				showClass: {
					popup: 'animate__animated animate__fadeInDown',
				},
				hideClass: {
					popup: 'animate__animated animate__fadeOutUp',
				},
			});
		} catch (error) {
			let errorMsg = 'Error desconocido';
			if (error.response?.data?.msg) {
				errorMsg = error.response.data.msg;
			}
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: errorMsg,
				footer: '<a href="#">Recupere su mail o contraseña aquí</a>',
				customClass: {
					popup: 'animated shake',
					confirmButton: 'btn btn-danger',
				},
				buttonsStyling: false,
			});
		}
	};

	return (
		<div>
			<NavBar />
			<Container className="py-5">
				<h1 className="tituloLogin">Iniciar Sesión</h1>
				<hr />
				<div className="my-5">
					<Form className="my-5" onSubmit={handleSubmit} noValidate>
						<Row>
							<Col xs={12} md={6} className="my-2">
								<Form.Group className="mb-3">
									<Form.Label className="font-celeste-crud" htmlFor="email">
										Email
									</Form.Label>
									<div className="input-container">
										<Form.Control
											type="email"
											id="email"
											placeholder="Ingrese su mail"
											value={email}
											onChange={(e) => setEmail(e.target.value.trim())}
											required
											isInvalid={!!errors.email}
											className="input-bg"
										/>
										{errors.email && (
											<div className="error-message">{errors.email}</div>
										)}
									</div>
								</Form.Group>
								<Form.Group className="mb-3">
									<Form.Label className="font-celeste-crud" htmlFor="password">
										Contraseña
									</Form.Label>
									<div className="input-container password-input">
										<Form.Control
											required
											id="password"
											type={showPassword ? 'text' : 'password'}
											placeholder="Ingrese su contraseña"
											value={password}
											onChange={(e) => setPassword(e.target.value.trim())}
											isInvalid={!!errors.password}
											className="input-bg"
										/>
										<FontAwesomeIcon
											icon={showPassword ? faEyeSlash : faEye}
											onClick={() => setShowPassword(!showPassword)}
											className="password-toggle-icon"
										/>
										{errors.password && (
											<div className="error-message">{errors.password}</div>
										)}
									</div>
								</Form.Group>

								<div className="text-end">
									<button className="btn-celeste-crud mb-4">Ingresar</button>
								</div>
								<span className="register-question">¿No tienes una cuenta?</span>
								<Link to="/registro" className="register-link ms-2">
									Regístrate aquí
								</Link>
							</Col>
							<Col xs={12} md={6} className="my-2">
								<img
									src={contacto}
									width="100%"
									alt="Imagen de contacto"
									className="loginImg"
								></img>
							</Col>
						</Row>
					</Form>
				</div>
			</Container>
			<Footer />
		</div>
	);
};
