import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import javaPetApi from '../../../../api/javaPetApi';
import { format } from 'date-fns';
import { EditarTurno } from './EditarTurno';
import { CrearTurno } from './CrearTurno';
import { eliminarTurno } from './EliminarTurno';
import { PencilSquare, Trash, Eye } from 'react-bootstrap-icons';
import './turnoCSS/ListaTurnos.css';
import ModalDetalleTurno from './VerTurno';

export const ListaTurnos = () => {
	const [cargarTurnos, setCargarTurnos] = useState([]);
	const [showEditar, setShowEditar] = useState(false);
	const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
	const [showDetails, setShowDetails] = useState(false);
	const navigate = useNavigate();

	const listaTurnosBack = async () => {
		try {
			const resp = await javaPetApi.get('/admin/listaTurnos');
			setCargarTurnos(resp.data.listaTurnos);
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
			}
		}
	};

	useEffect(() => {
		listaTurnosBack();
	}, []);

	const handleEditarClick = (turno) => {
		setTurnoSeleccionado(turno);
		setShowEditar(true);
	};

	const handleCloseEditar = () => {
		setShowEditar(false);
		setTurnoSeleccionado(null);
	};

	const onUpdateTurno = (turnoActualizado) => {
		setCargarTurnos((prevTurnos) =>
			prevTurnos.map((turno) =>
				turno._id === turnoActualizado._id ? turnoActualizado : turno
			)
		);
	};

	const handleEliminarClick = async (turnoId) => {
		try {
			await eliminarTurno(turnoId);
			listaTurnosBack();
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'No se pudo eliminar el turno. Inténtalo de nuevo más tarde.',
			});
		}
	};

	const handleShowDetails = (turno) => {
		setTurnoSeleccionado(turno);
		setShowDetails(true);
	};

	const handleCloseDetails = () => {
		setShowDetails(false);
	};

	const onTurnoCreado = () => {
		listaTurnosBack();
	};

	return (
		<div>
			<div className="listaT">
				<h2 className="text-center highlightTurno">Lista de Turnos</h2>
				<CrearTurno onTurnoCreado={onTurnoCreado} />
				<div className="mt-4 table-responsive">
					<Table striped bordered hover className="tabla-turnos">
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
							{cargarTurnos.map((turno, index) => {
								if (
									turno &&
									turno._id &&
									turno.detalleCita &&
									turno.veterinario &&
									turno.mascota &&
									turno.especie &&
									turno.raza &&
									turno.fecha &&
									turno.hora
								) {
									return (
										<tr key={turno._id}>
											<td data-label="ID">{index + 1}</td>
											<td data-label="Detalle de la cita">{turno.detalleCita}</td>
											<td data-label="Veterinario">{turno.veterinario}</td>
											<td data-label="Mascota">{turno.mascota}</td>
											<td data-label="Especie">{turno.especie}</td>
											<td data-label="Raza">{turno.raza}</td>
											<td data-label="Fecha">
												{turno.fecha && format(new Date(turno.fecha), 'yyyy-MM-dd')}
											</td>
											<td data-label="Hora">
												{turno.hora && turno.hora.substring(0, 5)}
											</td>
											<td data-label="Acciones">
												<div className="acciones-container">
													<Button
														variant="outline-primary"
														onClick={() => handleEditarClick(turno)}
													>
														<PencilSquare />
													</Button>
													<Button
														variant="outline-danger"
														onClick={() => handleEliminarClick(turno._id)}
													>
														<Trash />
													</Button>
													<Button
														variant="outline-info"
														onClick={() => handleShowDetails(turno)}
													>
														<Eye />
													</Button>
												</div>
											</td>
										</tr>
									);
								}
								return null;
							})}
						</tbody>
					</Table>
				</div>
				<EditarTurno
					turno={turnoSeleccionado}
					show={showEditar}
					handleClose={handleCloseEditar}
					onUpdateTurno={onUpdateTurno}
				/>
				<ModalDetalleTurno
					turno={turnoSeleccionado}
					show={showDetails}
					handleClose={handleCloseDetails}
				/>
			</div>
		</div>
	);
};
