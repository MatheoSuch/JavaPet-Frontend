import React, { useState } from 'react';
import Swal from 'sweetalert2';
import javaPetApi from '../../../../api/javaPetApi';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export const CrearUsuario = () => {
	const [show, setShow] = useState(false);
	const [formData, setFormData] = useState({
		nombre: '',
		apellido: '',
		email: '',
		telefono: '',
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
		const { nombre, apellido, email, telefono, rol } = formData;

		// Validaciones
		if (!nombre || !apellido || !email || !telefono || !rol) {
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

		if (telefono.length < 6 || telefono.length > 15) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'El teléfono debe tener entre 6 y 15 caracteres',
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

		console.log('Datos a enviar:', { nombre, apellido, email, telefono, rol });

		await guardarUsuarioDB(nombre, apellido, email, telefono, rol);
	};

	const guardarUsuarioDB = async (nombre, apellido, email, telefono, rol) => {
		try {
			const resp = await javaPetApi.post(
				'/admin/crearUsuario',
				{
					nombre,
					apellido,
					email,
					telefono,
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
					rol: '',
				});
				setShow(false);
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
		// Expresión regular para validar email básico
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};

	return (
		<div>
			<Button className="my-3" variant="primary" onClick={handleShow}>
				Nuevo Usuario
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Crear Usuario</Modal.Title>
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
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Apellido</Form.Label>
							<Form.Control
								type="text"
								name="apellido"
								value={formData.apellido}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Teléfono</Form.Label>
							<Form.Control
								type="text"
								name="telefono"
								value={formData.telefono}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Rol</Form.Label>
							<Form.Control
								as="select"
								name="rol"
								onChange={handleInputChange}
								value={formData.rol || ''}
							>
								<option value="" disabled>
									Seleccionar rol
								</option>
								<option value="usuario">Usuario</option>
								<option value="administrador">Administrador</option>
							</Form.Control>
						</Form.Group>

						<Button variant="secondary" onClick={handleClose}>
							Cerrar
						</Button>
						<Button className="mx-3" variant="primary" type="submit">
							Guardar cambios
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</div>
	);
};
