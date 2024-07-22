import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import javaPetApi from '../../../../api/javaPetApi';
import './pacienteCSS/EditarPaciente.css';
import ModalFooter from 'react-bootstrap/esm/ModalFooter';

export const EditarPaciente = ({
	paciente,
	show,
	handleClose,
	onUpdatePaciente,
}) => {
	const [pacienteEditSelecc, setPacienteEditSelecc] = useState({
		nombre: '',
		apellido: '',
		email: '',
		telefono: '',
		_id: '',
		rol: '',
	});

	useEffect(() => {
		if (paciente) {
			setPacienteEditSelecc({
				nombre: paciente.nombre || '',
				apellido: paciente.apellido || '',
				email: paciente.email || '',
				telefono: paciente.telefono || '',
				_id: paciente._id || '',
				rol: paciente.rol || '',
			});
		}
	}, [paciente]);

	const handleChangeEditar = (propiedad, valor) => {
		setPacienteEditSelecc({
			...pacienteEditSelecc,
			[propiedad]: valor,
		});
	};

	const handleSubmitEditar = async (e) => {
		e.preventDefault();
		const isValid = validarFormulario();
		if (isValid) {
			try {
				await editarPacienteDB(pacienteEditSelecc);
			} catch (error) {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'No se pudo editar el paciente. Inténtalo de nuevo más tarde.',
				});
			}
		}
	};

	const validarFormulario = () => {
		const { nombre, apellido, email, telefono, rol } = pacienteEditSelecc;

		if (!nombre || nombre.length < 2 || nombre.length > 30) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'El nombre debe tener entre 2 y 30 caracteres',
			});
			return false;
		}

		if (!apellido || apellido.length < 2 || apellido.length > 30) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'El apellido debe tener entre 2 y 30 caracteres',
			});
			return false;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'El correo electrónico no es válido',
			});
			return false;
		}

		const telefonoRegex = /^\d{10}$/;
		if (!telefonoRegex.test(telefono)) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'El teléfono debe tener 10 dígitos',
			});
			return false;
		}

		if (!rol || (rol !== 'admin' && rol !== 'usuario')) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'El rol debe ser "admin" o "usuario"',
			});
			return false;
		}

		return true;
	};

	const editarPacienteDB = async (usuario) => {
		try {
			const { _id, nombre, apellido, email, telefono, rol } = usuario;
			const resp = await javaPetApi.put(`/admin/editarPaciente/${_id}`, {
				nombre,
				apellido,
				email,
				telefono,
				rol,
			});
			if (resp.status === 200) {
				Swal.fire({
					icon: 'success',
					title: '¡Paciente editado!',
					text: 'El paciente se ha editado correctamente.',
				});
				onUpdatePaciente(usuario);
				handleClose();
			} else {
				throw new Error('Error al editar paciente');
			}
		} catch (error) {
			if (error.response) {
				if (error.response.data.msg.includes('correo electrónico ya existe')) {
					Swal.fire({
						icon: 'error',
						title: 'Correo electrónico duplicado',
						text: 'El correo electrónico ingresado ya existe. Por favor, ingresa un correo electrónico diferente.',
					});
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'No se pudo editar el paciente. Inténtalo de nuevo más tarde.',
					});
				}
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'No se pudo editar el paciente. Inténtalo de nuevo más tarde.',
				});
			}
		}
	};

	return (
		<Modal show={show} onHide={handleClose} className="modal-editar-paciente">
			<Modal.Header closeButton>
				<Modal.Title>Editar Paciente</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmitEditar}>
					<Form.Group className="mb-3">
						<Form.Label>Nombre</Form.Label>
						<Form.Control
							type="text"
							value={pacienteEditSelecc.nombre}
							onChange={(e) => handleChangeEditar('nombre', e.target.value)}
							required
							minLength="2"
							maxLength="30"
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Apellido</Form.Label>
						<Form.Control
							type="text"
							value={pacienteEditSelecc.apellido}
							onChange={(e) => handleChangeEditar('apellido', e.target.value)}
							required
							minLength="2"
							maxLength="30"
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							value={pacienteEditSelecc.email}
							onChange={(e) => handleChangeEditar('email', e.target.value)}
							required
							pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
							minLength="10"
							maxLength="30"
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Teléfono</Form.Label>
						<Form.Control
							type="tel"
							value={pacienteEditSelecc.telefono}
							onChange={(e) => handleChangeEditar('telefono', e.target.value)}
							required
							minLength="10"
							maxLength="10"
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Rol</Form.Label>
						<Form.Control
							as="select"
							value={pacienteEditSelecc.rol}
							onChange={(e) => handleChangeEditar('rol', e.target.value)}
							required
						>
							<option value="" disabled>
								Seleccionar rol
							</option>
							<option value="admin">admin</option>
							<option value="usuario">usuario</option>
						</Form.Control>
					</Form.Group>
					<ModalFooter>
						<div className="d-flex justify-content-end">
							<Button variant="secondary" onClick={handleClose} className="me-2">
								Cerrar
							</Button>
							<Button variant="primary" type="submit">
								Guardar Usuario
							</Button>
						</div>
					</ModalFooter>
				</Form>
			</Modal.Body>
		</Modal>
	);
};
