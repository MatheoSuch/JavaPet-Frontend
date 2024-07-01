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
		<div>
			<h2>Lista de Turnos</h2>
			<CrearTurno onTurnoCreado={onTurnoCreado} />
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
					{cargarTurnos.map((turno) => (
						<tr key={turno._id}>
							<td>{turno._id}</td>
							<td>{turno.detalleCita}</td>
							<td>{turno.veterinario}</td>
							<td>{turno.mascota}</td>
							<td>{turno.especie}</td>
							<td>{turno.raza}</td>
							<td>{turno.fecha && format(new Date(turno.fecha), 'yyyy-MM-dd')}</td>
							<td>{turno.hora && turno.hora.substring(0, 5)}</td>
							<td>
								<Button variant="dark" onClick={() => handleEditarClick(turno)}>
									Editar
								</Button>
								<Button
									variant="dark"
									onClick={() => handleEliminarClick(turno._id)}
								>
									Eliminar
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
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
