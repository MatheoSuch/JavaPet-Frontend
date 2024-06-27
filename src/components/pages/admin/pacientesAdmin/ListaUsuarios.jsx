import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import javaPetApi from '../../../../api/javaPetApi';
import { eliminarPaciente } from './EliminarPaciente';
import Button from 'react-bootstrap/esm/Button';

export const ListaUsuarios = () => {
	const [cargarUsuarios, setCargarUsuarios] = useState([]);

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

	useEffect(() => {
		listaUsuariosBack();
	}, []);

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
								<td>
									<Button variant="dark" onClick={() => EditarTurno(turno)}>
										Editar
									</Button>

									<Button
										variant="dark"
										onClick={() => eliminarPaciente(usuario._id, listaUsuariosBack)}
									>
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
