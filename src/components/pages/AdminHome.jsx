import React, { useState } from 'react';
import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import javaPetApi from '../../api/javaPetApi';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { Navigate } from 'react-router-dom';

export const AdminHome = () => {
	const [cargarUsuarios, setCargarUsuarios] = useState([]);
	const [cargarTurnos, setCargarTurnos] = useState([]);
	const [show, setShow] = useState(false);
	const [showEditar, setShowEditar] = useState(false);
	const [formData, setFormData] = useState({
		detalleCita: '',
		veterinario: '',
		mascota: '',
		especie: '',
		raza: '',
		fecha: '',
		hora: '',
	});
	const [turnoEditSelecc, setturnoEditSelecc] = useState({});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const listaUsuariosBack = async () => {
		try {
			const resp = await javaPetApi.get('/admin/listaPacientes');
			setCargarUsuarios(resp.data.listaPacientes);
		} catch (error) {
			if (error.response.status === 401) {
				localStorage.removeItem('token');
				Navigate('/login', {
					replace: true,
				});
			}
			// Swal.fire({
			// 	icon: 'error',
			// 	title: 'Oops...',
			// 	text: 'Error en algo',
			// 	footer: '<a href="#">Why do I have this issue?</a>',
			// });
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const listaTurnosBack = async () => {
		try {
			const resp = await javaPetApi.get('/admin/listaTurnos');

			setCargarTurnos(resp.data.listaTurnos);

			if (resp.data.rol === 'usuario') {
				// navigate('/shop');
			} else {
				// navigate('/admin');
			}
		} catch (error) {
			if (error.response.status === 401) {
				localStorage.removeItem('token');
				navigate('/login', {
					replace: true,
				});
			}
			// Swal.fire({
			// 	icon: 'error',
			// 	title: 'Oops...',
			// 	text: 'Algo salió mal',
			// 	footer: '<a href="#">Why do I have this issue?</a>',
			// });
		}
	};
	useEffect(() => {
		listaUsuariosBack();
		listaTurnosBack();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { detalleCita, veterinario, mascota, especie, raza, fecha, hora } =
			formData;
		if (
			!detalleCita ||
			!veterinario ||
			!mascota ||
			!especie ||
			!raza ||
			!fecha ||
			!hora
		) {
			// Manejar el caso donde faltan campos
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Todos los campos son obligatorios',
			});
		}

		// Validar longitud mínima y máxima del detalle de la cita
		if (detalleCita.length < 10 || detalleCita.length > 200) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'El detalle de la cita debe tener entre 10 y 200 caracteres',
			});
		}

		// Validar que el veterinario seleccionado esté en la lista permitida
		const veterinariosDefinidos = ['Dr. Sanchez Alejo', 'Dra. Gonzáles Camila'];
		if (!veterinariosDefinidos.includes(veterinario)) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Debe seleccionar uno de los veterinarios disponibles',
			});
		}

		// Validar longitud mínima y máxima del nombre de la mascota
		if (mascota.length < 2 || mascota.length > 30) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'El nombre de la mascota debe tener entre 2 y 30 caracteres',
			});
		}

		// Validar longitud mínima y máxima de la especie
		if (especie.length < 2 || especie.length > 30) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'La especie de la mascota debe tener entre 2 y 30 caracteres',
			});
		}

		// Validar longitud mínima y máxima de la raza
		if (raza.length < 2 || raza.length > 30) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'La raza de la mascota debe tener entre 2 y 30 caracteres',
			});
		}

		// Validar que la fecha sea válida
		const hoy = new Date();
		const fechaTurno = new Date(fecha);
		if (fechaTurno < hoy) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'La fecha del turno no puede ser anterior a la fecha actual',
			});
		}

		// Validar que la hora esté dentro del rango permitido (8:00 a 16:00)
		const horaTurno = parseInt(hora.split(':')[0], 10); // Obtener solo la hora como número
		if (horaTurno < 8 || horaTurno >= 16) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'La hora del turno debe estar entre las 8:00 y las 16:00',
			});
		}
		guardarTurnoDB(detalleCita, veterinario, mascota, especie, raza, fecha, hora);
	};
	const guardarTurnoDB = async (
		detalleCita,
		veterinario,
		mascota,
		especie,
		raza,
		fecha,
		hora
	) => {
		try {
			const resp = await javaPetApi.post('/admin/crearTurnos', {
				detalleCita,
				veterinario,
				mascota,
				especie,
				raza,
				fecha,
				hora,
			});
			console.log(resp);
			if (resp.status === 201) {
				Swal.fire({
					icon: 'success',
					title: '¡Turno creado!',
					text: 'El turno se ha creado correctamente.',
				});
				setFormData({
					detalleCita: '',
					veterinario: '',
					mascota: '',
					especie: '',
					raza: '',
					fecha: '',
					hora: '',
				});
				listaTurnosBack();
				setShow(false);
			} else {
				throw new Error('Error al crear turno');
			}
			// if (resp.data.rol === 'usuario') {
			// navigate('/shop');
			// } else {
			// navigate('/admin');
			// }
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'No se pudo crear el turno. Inténtalo de nuevo más tarde.',
				footer: '<a href="#">Why do I have this issue?</a>',
			});
		}
	};

	const editarTurnos = (turno) => {
		setShowEditar(true);
		setturnoEditSelecc({
			...turno,
			fecha: new Date(turno.fecha).toISOString().split('T')[0], // Convertir fecha a formato yyyy-MM-dd
		});
	};

	const handleChangeEditar = (propiedad, valor) => {
		setturnoEditSelecc({
			...turnoEditSelecc,
			[propiedad]: valor,
		});
	};

	const handleSubmitEditar = async (e) => {
		e.preventDefault();
		// validar
		editarTurnoDB(turnoEditSelecc);
	};
	const editarTurnoDB = async ({
		detalleCita,
		veterinario,
		mascota,
		especie,
		raza,
		fecha,
		hora,
		_id,
	}) => {
		try {
			const resp = await javaPetApi.put('/admin/editarTurno', {
				detalleCita,
				veterinario,
				mascota,
				especie,
				raza,
				fecha: new Date(fecha).toISOString().split('T')[0], // Convertir fecha a formato yyyy-MM-dd
				hora,
				_id,
			});
			console.log(resp);
			if (resp.status === 201) {
				Swal.fire({
					icon: 'success',
					title: '¡Turno editado!',
					text: 'El turno se ha editado correctamente.',
				});
				listaTurnosBack();
				setShowEditar(false);
			} else {
				throw new Error('Error al editar turno');
			}
			// if (resp.data.rol === 'usuario') {
			// navigate('/shop');
			// } else {
			// navigate('/admin');
			// }
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'No se pudo editar el turno. Inténtalo de nuevo más tarde.',
				footer: '<a href="#">Why do I have this issue?</a>',
			});
		}
	};

	const eliminarTurno = async (id) => {
		try {
			const resp = await javaPetApi.delete(`/admin/eliminarTurno/${id}`);

			console.log(resp);
			listaTurnosBack();
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'No se pudo elimar el turno. Inténtalo de nuevo más tarde.',
				footer: '<a href="#">Why do I have this issue?</a>',
			});
		}
	};

	return (
		<div>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Nombre</th>
						<th>Apellido</th>
						<th>Email</th>
						<th>Teléfono</th>
						<th>Rol</th>
					</tr>
				</thead>
				<tbody>
					{cargarUsuarios.map((usuario) => {
						return (
							<tr key={usuario._id}>
								<td>{usuario._id}</td>
								<td>{usuario.nombre}</td>
								<td>{usuario.apellido}</td>
								<td>{usuario.email}</td>
								<td>{usuario.telefono}</td>
								<td>{usuario.rol}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>

			<Button className="my-3" variant="primary" onClick={handleShow}>
				Nuevo Turno
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Crear Turno</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>Detalle de la cita</Form.Label>
							<Form.Control
								type="text"
								name="detalleCita"
								value={formData.detalleCita}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Veterinario</Form.Label>
							<Form.Control
								as="select"
								name="veterinario"
								onChange={handleInputChange}
								value={formData.veterinario || ''}
							>
								<option value="" disabled>
									Seleccionar veterinario
								</option>
								<option value="Dr. Sanchez Alejo">Dr. Sanchez Alejo</option>
								<option value="Dra. Gonzáles Camila">Dra. Gonzáles Camila</option>
							</Form.Control>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Mascota (nombre)</Form.Label>
							<Form.Control
								type="text"
								name="mascota"
								value={formData.mascota}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Especie</Form.Label>
							<Form.Control
								type="text"
								name="especie"
								value={formData.especie}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Raza</Form.Label>
							<Form.Control
								type="text"
								name="raza"
								value={formData.raza}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Fecha</Form.Label>
							<Form.Control
								type="date"
								name="fecha"
								value={formData.fecha}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Hora</Form.Label>
							<Form.Control
								as="select"
								name="hora"
								onChange={handleInputChange}
								value={formData.hora || ''}
							>
								<option value="" disabled>
									Seleccionar hora
								</option>
								<option value="08:00">08:00</option>
								<option value="09:00">09:00</option>
								<option value="10:00">10:00</option>
								<option value="11:00">11:00</option>
								<option value="12:00">12:00</option>
								<option value="13:00">13:00</option>
								<option value="14:00">14:00</option>
								<option value="15:00">15:00</option>
								<option value="16:00">16:00</option>
							</Form.Control>
						</Form.Group>

						<Button variant="secondary" onClick={handleClose}>
							Cerrar
						</Button>
						<Button
							className="mx-3"
							variant="primary"
							type="submit"
							onClick={handleSubmit}
						>
							Guardar cambios
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
			<Modal show={showEditar} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Editar Turno</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>Detalle de la cita</Form.Label>
							<Form.Control
								type="text"
								value={turnoEditSelecc.detalleCita}
								onChange={(e) => handleChangeEditar('detalleCita', e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Veterinario</Form.Label>
							<Form.Control
								as="select"
								value={turnoEditSelecc.veterinario}
								onChange={(e) => handleChangeEditar('veterinario', e.target.value)}
							>
								<option value="" disabled>
									Seleccionar veterinario
								</option>
								<option value="Dr. Sanchez Alejo">Dr. Sanchez Alejo</option>
								<option value="Dra. Gonzáles Camila">Dra. Gonzáles Camila</option>
							</Form.Control>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Mascota (nombre)</Form.Label>
							<Form.Control
								type="text"
								value={turnoEditSelecc.mascota}
								onChange={(e) => handleChangeEditar('mascota', e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Especie</Form.Label>
							<Form.Control
								type="text"
								value={turnoEditSelecc.especie}
								onChange={(e) => handleChangeEditar('especie', e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Raza</Form.Label>
							<Form.Control
								type="text"
								value={turnoEditSelecc.raza}
								onChange={(e) => handleChangeEditar('raza', e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Fecha</Form.Label>
							<Form.Control
								type="date"
								value={turnoEditSelecc.fecha}
								onChange={(e) => handleChangeEditar('fecha', e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Hora</Form.Label>
							<Form.Control
								as="select"
								value={turnoEditSelecc.hora}
								onChange={(e) => handleChangeEditar('hora', e.target.value)}
							>
								<option value="" disabled>
									Seleccionar hora
								</option>
								<option value="08:00">08:00</option>
								<option value="09:00">09:00</option>
								<option value="10:00">10:00</option>
								<option value="11:00">11:00</option>
								<option value="12:00">12:00</option>
								<option value="13:00">13:00</option>
								<option value="14:00">14:00</option>
								<option value="15:00">15:00</option>
								<option value="16:00">16:00</option>
							</Form.Control>
						</Form.Group>

						<Button variant="secondary" onClick={handleClose}>
							Cerrar
						</Button>
						<Button
							className="mx-3"
							variant="primary"
							type="submit"
							onClick={handleSubmitEditar}
						>
							Guardar cambios
						</Button>
					</Form>
				</Modal.Body>
			</Modal>

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Detalle de la cita</th>
						<th>Veterinario</th>
						<th>Mascota</th>
						<th>Especie</th>
						<th>Raza</th>
						<th>Fecha</th>
						<th>Hora</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{cargarTurnos.map((turno) => {
						return (
							<tr key={turno._id}>
								<td>{turno._id}</td>
								<td>{turno.detalleCita}</td>
								<td>{turno.veterinario}</td>
								<td>{turno.mascota}</td>
								<td>{turno.especie}</td>
								<td>{turno.raza}</td>
								<td>{format(new Date(turno.fecha), 'yyyy-MM-dd')}</td>
								<td>{turno.hora}</td>
								<td>
									<Button variant="dark" onClick={() => editarTurnos(turno)}>
										Editar
									</Button>
									<Button variant="dark" onClick={() => eliminarTurno(turno._id)}>
										Eliminar
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
};
