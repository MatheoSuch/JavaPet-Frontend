import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import javaPetApi from '../../../../api/javaPetApi';
import { eliminarPaciente } from './EliminarPaciente';
import Button from 'react-bootstrap/Button';
import { EditarPaciente } from './EditarPaciente';
import { CrearUsuario } from './CrearPaciente';
import './ListaUsuarios.css';

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
		<div className="mt-5 mb-4">
			<h2 className="text-center highlight">Lista de Usuarios</h2>
			<CrearUsuario onUsuarioCreated={handleUsuarioCreated} />
			<div className="table-responsive">
				<Table striped bordered hover className="tabla-usuarios">
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
									<td data-label="ID">{usuario._id}</td>
									<td data-label="Nombre">{usuario.nombre}</td>
									<td data-label="Apellido">{usuario.apellido}</td>
									<td data-label="Email">{usuario.email}</td>
									<td data-label="Teléfono">{usuario.telefono}</td>
									<td data-label="Rol">{usuario.rol}</td>
									<td data-label="Acciones">
										<div className="acciones-container">
											<Button
												variant="primary"
												onClick={() => handleEditarClick(usuario)}
											>
												Editar
											</Button>
											<Button
												variant="danger"
												onClick={() =>
													eliminarPaciente(usuario._id, listaUsuariosBack)
												}
											>
												Eliminar
											</Button>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
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
