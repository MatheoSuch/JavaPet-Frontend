import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import javaPetApi from '../../../../api/javaPetApi';
import { eliminarPaciente } from './EliminarPaciente';
import Button from 'react-bootstrap/esm/Button';
import { EditarPaciente } from './EditarPaciente';
import { CrearUsuario } from './CrearPaciente';

export const ListaUsuarios = () => {
	const [cargarUsuarios, setCargarUsuarios] = useState([]);
	const [showEditar, setShowEditar] = useState(false);
	const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

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
		}
	};

	useEffect(() => {
		listaUsuariosBack();
	}, []);

	const handleEditarClick = (usuario) => {
		setPacienteSeleccionado(usuario);
		setShowEditar(true);
	};

	const handleCloseEditar = () => {
		setShowEditar(false);
		setPacienteSeleccionado(null);
	};

	const onUpdatePaciente = (pacienteActualizado) => {
		const updatedPacientes = cargarUsuarios.map((usuario) => {
			if (usuario._id === pacienteActualizado._id) {
				return pacienteActualizado;
			}
			return usuario;
		});
		setCargarUsuarios(updatedPacientes);
	};

	const handleUsuarioCreated = () => {
		listaUsuariosBack();
	};

	return (
		<div>
			<h2>Lista de Usuarios</h2>
			<CrearUsuario onUsuarioCreated={handleUsuarioCreated} />
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Nombre</th>
						<th>Apellido</th>
						<th>Email</th>
						<th>Teléfono</th>
						<th>Rol</th>
						<th>Acciones</th>
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
									<Button variant="dark" onClick={() => handleEditarClick(usuario)}>
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
			{pacienteSeleccionado && (
				<EditarPaciente
					paciente={pacienteSeleccionado}
					show={showEditar}
					handleClose={handleCloseEditar}
					onUpdatePaciente={onUpdatePaciente}
				/>
			)}
		</div>
	);
};
