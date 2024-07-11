import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import javaPetApi from '../../../../api/javaPetApi';
import './pacienteCSS/CrearPaciente.css';

export const CrearUsuario = ({ onUsuarioCreated }) => {
	const [show, setShow] = useState(false);
	const [formData, setFormData] = useState({
		nombre: '',
		apellido: '',
		email: '',
		telefono: '',
		password: '',
		rol: '',
	});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { nombre, apellido, email, telefono, password, rol } = formData;

		if (!nombre || !apellido || !email || !telefono || !password || !rol) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Todos los campos son obligatorios',
			});
		}

		if (nombre.length < 2 || nombre.length > 30) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'El nombre debe tener entre 2 y 30 caracteres',
			});
		}

		if (apellido.length < 2 || apellido.length > 30) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'El apellido debe tener entre 2 y 30 caracteres',
			});
		}

		if (!validateEmail(email)) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'El email ingresado no es válido',
			});
		}

		if (telefono.length !== 10) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'El teléfono debe tener exactamente 10 caracteres',
			});
		}

		if (password.length < 6) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'La contraseña debe tener al menos 6 caracteres',
			});
		}

		const rolesDefinidos = ['usuario', 'administrador'];
		if (!rolesDefinidos.includes(rol)) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Debe seleccionar un rol válido',
			});
		}

		console.log('Datos a enviar:', {
			nombre,
			apellido,
			email,
			telefono,
			password,
			rol,
		});

		await guardarUsuarioDB(nombre, apellido, email, telefono, password, rol);
	};

	const guardarUsuarioDB = async (
		nombre,
		apellido,
		email,
		telefono,
		password,
		rol
	) => {
		try {
			const resp = await javaPetApi.post(
				'/admin/crearPaciente',
				{
					nombre,
					apellido,
					email,
					telefono,
					password,
					rol,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			console.log('Respuesta del servidor:', resp);

			if (resp.status === 201) {
				Swal.fire({
					icon: 'success',
					title: '¡Usuario creado!',
					text: 'El usuario se ha creado correctamente.',
				});
				setFormData({
					nombre: '',
					apellido: '',
					email: '',
					telefono: '',
					password: '',
					rol: '',
				});
				setShow(false);
				onUsuarioCreated();
			} else {
				throw new Error('Error al crear usuario');
			}
		} catch (error) {
			console.error('Error al guardar el usuario:', error);
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'No se pudo crear el usuario. Inténtalo de nuevo más tarde.',
			});
		}
	};

	const validateEmail = (email) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};

	return (
		<>
			<div className="d-flex justify-content-start">
				<Button
					variant="primary"
					onClick={handleShow}
					className="mx-5 mx-md-auto nuevo-usuario-button"
				>
					Nuevo Usuario
				</Button>
			</div>

			<Modal show={show} onHide={handleClose} dialogClassName="modal-crear-usuario">
				<Modal.Header closeButton>
					<Modal.Title>Crear Nuevo Usuario</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3">
							<Form.Label>Nombre</Form.Label>
							<Form.Control
								type="text"
								name="nombre"
								value={formData.nombre}
								onChange={handleInputChange}
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Apellido</Form.Label>
							<Form.Control
								type="text"
								name="apellido"
								value={formData.apellido}
								onChange={handleInputChange}
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Teléfono</Form.Label>
							<Form.Control
								type="text"
								name="telefono"
								value={formData.telefono}
								onChange={handleInputChange}
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Contraseña</Form.Label>
							<Form.Control
								type="password"
								name="password"
								value={formData.password}
								onChange={handleInputChange}
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Rol</Form.Label>
							<Form.Control
								as="select"
								name="rol"
								onChange={handleInputChange}
								value={formData.rol || ''}
								required
							>
								<option value="" disabled>
									Seleccionar rol
								</option>
								<option value="usuario">Usuario</option>
								<option value="administrador">Administrador</option>
							</Form.Control>
						</Form.Group>

						<div className="d-flex justify-content-end">
							<Button variant="secondary" onClick={handleClose} className="me-2">
								Cerrar
							</Button>
							<Button variant="primary" type="submit">
								Guardar Usuario
							</Button>
						</div>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
};