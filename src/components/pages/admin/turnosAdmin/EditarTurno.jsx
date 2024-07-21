import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import javaPetApi from '../../../../api/javaPetApi';
import './turnoCSS/EditarTurno.css';

export const EditarTurno = ({ turno, show, handleClose, onUpdateTurno }) => {
	const [turnoEditSelecc, setTurnoEditSelecc] = useState({
		detalleCita: '',
		veterinario: '',
		mascota: '',
		especie: '',
		raza: '',
		fecha: new Date(),
		hora: '',
	});

	// Utiliza useEffect para actualizar turnoEditSelecc cuando cambia la prop turno
	useEffect(() => {
		if (turno) {
			setTurnoEditSelecc({
				id: turno._id,
				detalleCita: turno.detalleCita || '',
				veterinario: turno.veterinario || '',
				mascota: turno.mascota || '',
				especie: turno.especie || '',
				raza: turno.raza || '',
				fecha: turno.fecha ? new Date(turno.fecha) : new Date(),
				hora: turno.hora || '',
			});
		}
	}, [turno]);

	const handleChangeEditar = (propiedad, valor) => {
		setTurnoEditSelecc({
			...turnoEditSelecc,
			[propiedad]: valor,
		});
	};

	const handleSubmitEditar = async (e) => {
		e.preventDefault();
		const isValid = validarFormulario();
		if (isValid) {
			try {
				await editarTurnoDB(turnoEditSelecc);
			} catch (error) {
				console.error('Error al editar turno:', error);
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'No se pudo editar el turno. Inténtalo de nuevo más tarde.',
				});
			}
		} else {
			// La validación falló, no hacer nada más aquí
		}
	};

	const validarFormulario = () => {
		const { detalleCita, veterinario, mascota, especie, raza, fecha, hora } =
			turnoEditSelecc;

		if (!detalleCita || detalleCita.length < 10 || detalleCita.length > 200) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'El detalle de la cita debe tener entre 10 y 200 caracteres',
			});
			return false;
		}

		const veterinariosDefinidos = ['Dr. Sanchez Alejo', 'Dra. Gonzáles Camila'];
		if (!veterinariosDefinidos.includes(veterinario)) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Debe seleccionar uno de los veterinarios disponibles',
			});
			return false;
		}

		if (mascota.length < 2 || mascota.length > 30) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'El nombre de la mascota debe tener entre 2 y 30 caracteres',
			});
			return false;
		}

		if (especie.length < 2 || especie.length > 30) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'La especie de la mascota debe tener entre 2 y 30 caracteres',
			});
			return false;
		}

		if (raza.length < 2 || raza.length > 30) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'La raza de la mascota debe tener entre 2 y 30 caracteres',
			});
			return false;
		}

		const hoy = new Date();
		const fechaTurno = new Date(fecha);
		if (fechaTurno < hoy) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'La fecha del turno no puede ser anterior a la fecha actual',
			});
			return false;
		}
		const selectedDate = new Date(fecha);
		if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Los turnos solo se pueden programar de lunes a viernes',
			});
			return false;
		}

		const horaTurno = parseInt(hora.split(':')[0], 10);
		if (horaTurno < 8 || horaTurno > 16) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'La hora del turno debe estar entre las 8:00 y las 16:00',
			});
			return false;
		}

		return true;
	};

	const editarTurnoDB = async (turno) => {
		try {
			console.log('Enviando solicitud para editar turno con ID:', turno.id);
			const resp = await javaPetApi.put(`/admin/editarTurno/${turno.id}`, turno);
			if (resp.status === 200) {
				Swal.fire({
					icon: 'success',
					title: '¡Turno editado!',
					text: 'El turno se ha editado correctamente.',
				});

				// Asegúrate de que resp.data.turnoActualizado siempre tenga un _id válido
				if (resp.data.turnoActualizado && resp.data.turnoActualizado._id) {
					onUpdateTurno(resp.data.turnoActualizado);
				} else {
					console.error(
						'El objeto turnoActualizado no tiene un _id válido:',
						resp.data.turnoActualizado
					);
					// Manejo del error o notificación adecuada si falta el _id
				}

				handleClose(); // Cerrar el modal después de editar
			} else {
				throw new Error('Error al editar turno');
			}
		} catch (error) {
			console.log('Error en la solicitud de edición de turno:', error);
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'No se pudo editar el turno. Inténtalo de nuevo más tarde.',
			});
		}
	};

	return (
		<Modal show={show} onHide={handleClose} className="modal-editar-turno">
			<Modal.Header closeButton>
				<Modal.Title>Editar Turno</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmitEditar} className="formulario-editar-turno">
					<Form.Group className="mb-3">
						<Form.Label>Detalle de la cita</Form.Label>
						<Form.Control
							type="text"
							required // Campo requerido
							minLength={10} // Longitud mínima
							maxLength={200} // Longitud máxima
							value={turnoEditSelecc.detalleCita}
							onChange={(e) => handleChangeEditar('detalleCita', e.target.value)}
						/>
						<Form.Control.Feedback type="invalid">
							Ingrese el detalle de la cita (min. 10 caracteres, max. 200 caracteres)
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Veterinario</Form.Label>
						<Form.Control
							as="select"
							required
							value={turnoEditSelecc.veterinario}
							onChange={(e) => handleChangeEditar('veterinario', e.target.value)}
						>
							<option value="" disabled>
								Seleccionar veterinario
							</option>
							<option value="Dr. Sanchez Alejo">Dr. Sanchez Alejo</option>
							<option value="Dra. Gonzáles Camila">Dra. Gonzáles Camila</option>
						</Form.Control>
						<Form.Control.Feedback type="invalid">
							Seleccione un veterinario de la lista
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Mascota (nombre)</Form.Label>
						<Form.Control
							type="text"
							required // Campo requerido
							minLength={2} // Longitud mínima
							maxLength={30} // Longitud máxima
							value={turnoEditSelecc.mascota}
							onChange={(e) => handleChangeEditar('mascota', e.target.value)}
						/>
						<Form.Control.Feedback type="invalid">
							{turnoEditSelecc.mascota.length < 2
								? 'Ingrese al menos 2 caracteres'
								: 'El nombre de la mascota no debe exceder los 30 caracteres'}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Especie</Form.Label>
						<Form.Control
							type="text"
							required
							minLength={2} // Longitud mínima
							maxLength={30} // Longitud máxima
							value={turnoEditSelecc.especie}
							onChange={(e) => handleChangeEditar('especie', e.target.value)}
						/>
						<Form.Control.Feedback type="invalid">
							Ingrese la especie de la mascota
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Raza</Form.Label>
						<Form.Control
							type="text"
							required
							minLength={2} // Longitud mínima
							maxLength={30} // Longitud máxima
							value={turnoEditSelecc.raza}
							onChange={(e) => handleChangeEditar('raza', e.target.value)}
						/>
						<Form.Control.Feedback type="invalid">
							Ingrese la raza de la mascota
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Fecha</Form.Label>
						<DatePicker
							required
							selected={turnoEditSelecc.fecha}
							onChange={(date) => handleChangeEditar('fecha', date)}
							className="form-control"
							dateFormat="yyyy-MM-dd"
							minDate={new Date()}
						/>
						<Form.Control.Feedback type="invalid">
							Seleccione una fecha válida
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Hora</Form.Label>
						<Form.Control
							as="select"
							required
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
						<Form.Control.Feedback type="invalid">
							Seleccione una hora válida (entre 8:00 y 16:00)
						</Form.Control.Feedback>
					</Form.Group>
					<Modal.Footer>
						<div className="d-flex justify-content-end">
							<Button variant="secondary" onClick={handleClose} className="me-2">
								Cerrar
							</Button>
							<Button variant="primary" type="submit">
								Guardar Cambios
							</Button>
						</div>
					</Modal.Footer>
				</Form>
			</Modal.Body>
		</Modal>
	);
};
