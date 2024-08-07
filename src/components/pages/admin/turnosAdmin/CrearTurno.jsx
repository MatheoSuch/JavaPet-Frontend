import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import javaPetApi from '../../../../api/javaPetApi';
import './turnoCSS/CrearTurno.css';

export const CrearTurno = ({ onTurnoCreado }) => {
	const [show, setShow] = useState(false);
	const [formData, setFormData] = useState({
		detalleCita: '',
		veterinario: '',
		mascota: '',
		especie: '',
		raza: '',
		fecha: new Date(),
		hora: '',
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
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Todos los campos son obligatorios',
			});
		}

		if (detalleCita.length < 10 || detalleCita.length > 200) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'El detalle de la cita debe tener entre 10 y 200 caracteres',
			});
		}

		const veterinariosDefinidos = ['Dr. Sanchez Alejo', 'Dra. Gonzáles Camila'];
		if (!veterinariosDefinidos.includes(veterinario)) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Debe seleccionar uno de los veterinarios disponibles',
			});
		}

		if (mascota.length < 2 || mascota.length > 30) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'El nombre de la mascota debe tener entre 2 y 30 caracteres',
			});
		}

		if (especie.length < 2 || especie.length > 30) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'La especie de la mascota debe tener entre 2 y 30 caracteres',
			});
		}

		if (raza.length < 2 || raza.length > 30) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'La raza de la mascota debe tener entre 2 y 30 caracteres',
			});
		}

		const selectedDate = new Date(fecha);
		if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Los turnos solo se pueden programar de lunes a viernes',
			});
		}

		const horaTurno = parseInt(hora.split(':')[0], 10);
		if (horaTurno < 8 || horaTurno > 16) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'La hora del turno debe estar entre las 8:00 y las 16:00',
			});
		}

		try {
			const resp = await guardarTurnoDB(
				detalleCita,
				veterinario,
				mascota,
				especie,
				raza,
				fecha.toISOString().split('T')[0],
				hora
			);

			if (resp.status === 201) {
				Swal.fire({
					icon: 'success',
					title: '¡Turno creado!',
					text: 'El turno se ha creado correctamente.',
				}).then((result) => {
					if (result.isConfirmed || result.isDismissed) {
						onTurnoCreado(resp.data);
						setFormData({
							detalleCita: '',
							veterinario: '',
							mascota: '',
							especie: '',
							raza: '',
							fecha: new Date(),
							hora: '',
						});
						setShow(false);
					}
				});
			} else {
				throw new Error('Error al crear turno');
			}
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'No se pudo crear el turno. Inténtalo de nuevo más tarde.',
			});
		}
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
			const resp = await javaPetApi.post(
				'/admin/crearTurnos',
				{
					detalleCita,
					veterinario,
					mascota,
					especie,
					raza,
					fecha,
					hora,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (resp.status === 201) {
				onTurnoCreado(resp.data);
			}

			return resp;
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'No se pudo crear el turno. Inténtalo de nuevo más tarde.',
			});
			throw error;
		}
	};

	return (
		<div>
			<div className="d-flex justify-content-start">
				<Button
					variant="primary"
					onClick={handleShow}
					className="mx-5 mx-md-auto nuevo-turno-button"
				>
					Nuevo Turno
				</Button>
			</div>

			<Modal show={show} onHide={handleClose} className="modal-crear-turno">
				<Modal.Header closeButton>
					<Modal.Title>Crear Turno</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3">
							<Form.Label>Detalle de la cita</Form.Label>
							<Form.Control
								type="text"
								name="detalleCita"
								value={formData.detalleCita}
								onChange={handleInputChange}
								required
								minLength="10"
								maxLength="200"
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Veterinario</Form.Label>
							<Form.Control
								as="select"
								required
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
								required
								minLength="2"
								maxLength="30"
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Especie</Form.Label>
							<Form.Control
								type="text"
								name="especie"
								value={formData.especie}
								onChange={handleInputChange}
								required
								minLength="2"
								maxLength="30"
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Raza</Form.Label>
							<Form.Control
								type="text"
								name="raza"
								value={formData.raza}
								onChange={handleInputChange}
								required
								minLength="2"
								maxLength="30"
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Fecha</Form.Label>
							<DatePicker
								selected={formData.fecha}
								onChange={(date) => setFormData({ ...formData, fecha: date })}
								dateFormat="yyyy-MM-dd"
								className="form-control"
								minDate={new Date()}
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Hora</Form.Label>
							<Form.Control
								as="select"
								name="hora"
								required
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
						<div className="d-flex justify-content-end">
							<Button variant="secondary" onClick={handleClose}>
								Cerrar
							</Button>
							<Button className="mx-3" variant="primary" type="submit">
								Guardar cambios
							</Button>
						</div>
					</Form>
				</Modal.Body>
			</Modal>
		</div>
	);
};
