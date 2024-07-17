import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import javaPetApi from '../../../../api/javaPetApi';
import { eliminarPaciente } from './EliminarPaciente';
import Button from 'react-bootstrap/Button';
import { EditarPaciente } from './EditarPaciente';
import { CrearUsuario } from './CrearPaciente';
import { PencilSquare, Trash, Eye } from 'react-bootstrap-icons';
import './pacienteCSS/ListaUsuarios.css';
import NavBar from '../../../Navbar/Navbar';
import Footer from '../../../Footer/Footer';
import ModalDetalleUsuario from './VerPaciente.';

export const ListaUsuarios = () => {
	const [cargarUsuarios, setCargarUsuarios] = useState([]);
	const [showEditar, setShowEditar] = useState(false);
	const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
	const [showDetails, setShowDetails] = useState(false);

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

	const handleShowDetails = (usuario) => {
		setPacienteSeleccionado(usuario);
		setShowDetails(true);
	};

	const handleCloseDetails = () => {
		setShowDetails(false);
	};

	return (
		<div>
			<NavBar />
			<div className="lista">
				<h2 className="text-center highlightUsuario">Lista de Usuarios</h2>
				<CrearUsuario onUsuarioCreated={handleUsuarioCreated} />
				<div className="mt-4 table-responsive">
					<Table striped bordered hover className="tabla-usuarios">
						<thead>
							<tr>
								<th>#</th>
								<th>Nombre</th>
								<th>Apellido</th>
								<th>Email</th>
								<th>Teléfono</th>
								<th>Rol</th>
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody>
							{cargarUsuarios.map((usuario, index) => {
								return (
									<tr key={usuario._id}>
										<td data-label="#">{index + 1}</td>
										<td data-label="Nombre">{usuario.nombre}</td>
										<td data-label="Apellido">{usuario.apellido}</td>
										<td data-label="Email">{usuario.email}</td>
										<td data-label="Teléfono">{usuario.telefono}</td>
										<td data-label="Rol">{usuario.rol}</td>
										<td data-label="Acciones">
											<div className="acciones-container">
												<Button
													variant="outline-primary"
													onClick={() => handleEditarClick(usuario)}
												>
													<PencilSquare />
												</Button>
												<Button
													variant="outline-danger"
													onClick={() =>
														eliminarPaciente(usuario._id, listaUsuariosBack)
													}
												>
													<Trash />
												</Button>
												<Button
													variant="outline-info"
													onClick={() => handleShowDetails(usuario)}
												>
													<Eye />
												</Button>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</div>
				<EditarPaciente
					paciente={pacienteSeleccionado}
					show={showEditar}
					handleClose={handleCloseEditar}
					onUpdatePaciente={onUpdatePaciente}
				/>
				<ModalDetalleUsuario
					usuario={pacienteSeleccionado}
					show={showDetails}
					handleClose={handleCloseDetails}
				/>
			</div>
			<Footer />
		</div>
	);
};
