import React, { useState } from 'react';
import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import javaPetApi from '../../api/javaPetApi';

export const AdminHome = () => {
	const [cargarUsuarios, setCargarUsuarios] = useState([]);
	const [cargarTurnos, setCargarTurnos] = useState([]);
	const listaUsuariosBack = async () => {
		try {
			const resp = await javaPetApi.get('/admin/listaPacientes');

			setCargarUsuarios(resp.data.listaPacientes);

			if (resp.data.rol === 'usuario') {
				// navigate('/shop');
			} else {
				// navigate('/admin');
			}
		} catch (error) {
			setErrorMsg(error.response.data.msg);
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: errorMsg,
				footer: '<a href="#">Why do I have this issue?</a>',
			});
		}
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
			setErrorMsg(error.response.data.msg);
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: errorMsg,
				footer: '<a href="#">Why do I have this issue?</a>',
			});
		}
	};
	useEffect(() => {
		listaUsuariosBack();
		listaTurnosBack();
	}, []);

	return (
		<div>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Nombre</th>
						<th>Email</th>
						<th>Rol</th>
					</tr>
				</thead>
				<tbody>
					{cargarUsuarios.map((usuario) => {
						return (
							<tr key={usuario._id}>
								<td>{usuario._id}</td>
								<td>{usuario.name}</td>
								<td>{usuario.email}</td>
								<td>{usuario.rol}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Nombre</th>
						<th>Email</th>
						<th>Rol</th>
					</tr>
				</thead>
				<tbody>
					{cargarTurnos.map((turno) => {
						return (
							<tr key={turno._id}>
								<td>{turno._id}</td>
								<td>{turno.edad}</td>
								<td>{turno.rol}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
};
