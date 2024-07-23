import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Envelope } from 'react-bootstrap-icons';
import './Contacto.css';
import imgPerrito2 from '../../../assets/contact.jpg';
import javaPetApi from '../../../api/javaPetApi';
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal);

const Contacto = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		nombre: '',
		apellido: '',
		correo: '',
		mensaje: '',
	});

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const validate = () => {
		let tempErrors = {};
		if (!formData.nombre || formData.nombre.length < 3) {
			tempErrors.nombre = 'Nombre debe tener al menos 3 caracteres.';
		}
		if (!formData.apellido || formData.apellido.length < 3) {
			tempErrors.apellido = 'Apellido debe tener al menos 3 caracteres.';
		}
		if (!formData.correo) {
			tempErrors.correo = 'Correo electrónico es requerido.';
		} else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
			tempErrors.correo = 'Correo electrónico no es válido.';
		}
		if (!formData.mensaje || formData.mensaje.length < 10) {
			tempErrors.mensaje = 'Mensaje debe tener al menos 10 caracteres.';
		}
		return tempErrors;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const validationErrors = validate();
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			MySwal.fire({
				title: '¡Formulario enviado con éxito!',
				text: 'Nos pondremos en contacto contigo pronto.',
				icon: 'success',
				confirmButtonText: 'Aceptar',
				customClass: {
					confirmButton: 'my-button-class',
				},
			});
		}
	};

	const checkSessionExpiration = async () => {
		try {
			await javaPetApi.get('/auth/verify-token');
		} catch (error) {
			if (error.response && error.response.status === 401) {
				localStorage.removeItem('token');
				Swal.fire({
					icon: 'warning',
					title: 'Sesión Expirada',
					text: 'Tu sesión ha expirado. Por favor, inicie sesión nuevamente.',
					confirmButtonColor: '#3085d6',
					confirmButtonText: 'Iniciar sesión',
					allowOutsideClick: false,
					allowEscapeKey: false,
					showCancelButton: false,
				}).then((result) => {
					if (result.isConfirmed) {
						navigate('/login', { replace: true });
					}
				});
			} else {
				console.error('Error verificando la sesión:', error);
			}
		}
	};

	useEffect(() => {
		checkSessionExpiration();
	}, [navigate]);

	return (
		<div className="container contact-container">
			<div className="contact-content">
				<h1>Contáctanos</h1>
				<h3>
					Escribe tu información y déjanos tu consulta! Te responderemos pronto.
				</h3>

				<Form id="mi-formulario" onSubmit={handleSubmit}>
					<Form.Group className="mb-3">
						<Form.Label>Nombre</Form.Label>
						<Form.Control
							type="text"
							name="nombre"
							value={formData.nombre}
							onChange={handleChange}
							placeholder="Escriba su nombre"
							isInvalid={!!errors.nombre}
							minLength={3}
							maxLength={15}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.nombre}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Apellido</Form.Label>
						<Form.Control
							type="text"
							name="apellido"
							value={formData.apellido}
							onChange={handleChange}
							placeholder="Escriba su apellido"
							isInvalid={!!errors.apellido}
							minLength={3}
							maxLength={15}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.apellido}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Correo electrónico</Form.Label>
						<Form.Control
							type="email"
							name="correo"
							value={formData.correo}
							onChange={handleChange}
							placeholder="email@dominio.com"
							isInvalid={!!errors.correo}
							minLength={5}
							maxLength={35}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.correo}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicMessage">
						<Form.Label>Tu mensaje</Form.Label>
						<Form.Control
							as="textarea"
							name="mensaje"
							rows={5}
							value={formData.mensaje}
							onChange={handleChange}
							placeholder="Escribe tu pregunta o mensaje"
							isInvalid={!!errors.mensaje}
							minLength={5}
							maxLength={250}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.mensaje}
						</Form.Control.Feedback>
					</Form.Group>

					<Button className="boton-enviar" variant="primary" type="submit">
						Enviar <Envelope className="ms-2" />
					</Button>
				</Form>
			</div>

			<div className="imagen-container">
				<img className="imagen" src={imgPerrito2} alt="Perrito" />
			</div>
		</div>
	);
};

export default Contacto;
