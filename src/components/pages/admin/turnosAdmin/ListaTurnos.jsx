import React, { useEffect, useState } from 'react';
import javaPetApi from '../../../../api/javaPetApi';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { eliminarTurno } from './EliminarTurno';
import { format } from 'date-fns';
import { EditarTurno } from './EditarTurno';
import { CrearTurno } from './CrearTurno';

export const ListaTurnos = () => {
	const [cargarTurnos, setCargarTurnos] = useState([]);
	const [showEditar, setShowEditar] = useState(false);
	const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
	const navigate = useNavigate();

	const listaTurnosBack = async () => {
		try {
			const resp = await javaPetApi.get('/admin/listaTurnos');
			setCargarTurnos(resp.data.listaTurnos);

			if (resp.data.rol === 'usuario') {
				navigate('/shop');
			} else {
				navigate('/admin');
			}
		} catch (error) {
			if (error.response.status === 401) {
				localStorage.removeItem('token');
				navigate('/login', {
					replace: true,
				});
			} else {
				console.error('Error al cargar la lista de turnos:', error);
				// Mostrar mensaje de error con Swal
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
		const updatedTurnos = cargarTurnos.map((turno) => {
			if (turno._id === turnoActualizado._id) {
				return turnoActualizado;
			}
			return turno;
		});
		setCargarTurnos(updatedTurnos);
	};

	return (
		<div>
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
							<td>{format(new Date(turno.fecha), 'yyyy-MM-dd')}</td>
							<td>{turno.hora}</td>
							<td>
								<Button variant="dark" onClick={() => handleEditarClick(turno)}>
									Editar
								</Button>
								<Button
									variant="dark"
									onClick={() => eliminarTurno(turno._id, listaTurnosBack)}
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
					onUpdateTurno={onUpdateTurno} // Pasar onUpdateTurno como prop
				/>
			)}
		</div>
	);
};
