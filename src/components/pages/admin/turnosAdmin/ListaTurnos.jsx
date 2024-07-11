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
import './ListaTurnos.css';

export const ListaTurnos = () => {
	const [cargarTurnos, setCargarTurnos] = useState([]);
	const [showEditar, setShowEditar] = useState(false);
	const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
	const navigate = useNavigate();

	const listaTurnosBack = async () => {
		try {
			const resp = await javaPetApi.get('/admin/listaTurnos');
			setCargarTurnos(resp.data.listaTurnos);
		} catch (error) {
			if (error.response && error.response.status === 401) {
				localStorage.removeItem('token');
				navigate('/login', { replace: true });
			} else {
				console.error('Error al cargar la lista de turnos:', error);
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'No se pudo cargar la lista de turnos. Inténtalo de nuevo más tarde.',
				});
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

	const onTurnoCreado = (nuevoTurno) => {
		setCargarTurnos([...cargarTurnos, nuevoTurno]);
	};

	const onUpdateTurno = (turnoActualizado) => {
		const updatedTurnos = cargarTurnos.map((turno) =>
			turno._id === turnoActualizado._id ? turnoActualizado : turno
		);
		setCargarTurnos(updatedTurnos);
	};

	const handleEliminarClick = async (turnoId) => {
		try {
			await eliminarTurno(turnoId);
			listaTurnosBack();
		} catch (error) {
			console.error('Error al eliminar el turno:', error);
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'No se pudo eliminar el turno. Inténtalo de nuevo más tarde.',
			});
		}
	};

	return (
		<div className="mt-5 mb-4">
			<h2 className="text-center highlight">Lista de Turnos</h2>
			<CrearTurno onTurnoCreado={onTurnoCreado} />
			<div className="table-responsive">
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
						{cargarTurnos.map((turno) => (
							<tr key={turno._id}>
								<td data-label="ID">{turno._id}</td>
								<td data-label="Detalle de la cita">{turno.detalleCita}</td>
								<td data-label="Veterinario">{turno.veterinario}</td>
								<td data-label="Mascota">{turno.mascota}</td>
								<td data-label="Especie">{turno.especie}</td>
								<td data-label="Raza">{turno.raza}</td>
								<td data-label="Fecha">
									{turno.fecha && format(new Date(turno.fecha), 'yyyy-MM-dd')}
								</td>
								<td data-label="Hora">{turno.hora && turno.hora.substring(0, 5)}</td>
								<td data-label="Acciones">
									<div className="acciones-container">
										<Button
											variant="primary"
											onClick={() => handleEditarClick(turno)}
											className="mr-2"
										>
											Editar
										</Button>
										<Button
											variant="danger"
											onClick={() => handleEliminarClick(turno._id)}
										>
											Eliminar
										</Button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
			{turnoSeleccionado && (
				<EditarTurno
					turno={turnoSeleccionado}
					show={showEditar}
					handleClose={handleCloseEditar}
					onUpdateTurno={onUpdateTurno}
				/>
			)}
		</div>
	);
};
