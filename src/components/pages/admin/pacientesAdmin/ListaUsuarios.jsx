import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import javaPetApi from '../../../../api/javaPetApi';
import { eliminarPaciente } from './EliminarPaciente';
import Button from 'react-bootstrap/Button';
import { EditarPaciente } from './EditarPaciente';
import { CrearUsuario } from './CrearPaciente';
import { PencilSquare, Trash, Eye } from 'react-bootstrap-icons';
import './pacienteCSS/ListaUsuarios.css';
import ModalDetalleUsuario from './VerPaciente.';
import Swal from 'sweetalert2';

export const ListaUsuarios = () => {
	const [cargarUsuarios, setCargarUsuarios] = useState([]);
	const [showEditar, setShowEditar] = useState(false);
	const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
	const [showDetails, setShowDetails] = useState(false);
	const [habilitarBotones, setHabilitarBotones] = useState(false);
	const navigate = useNavigate();

	const actualizarHabilitacionBotones = (usuarios) => {
		const contarAdmins = usuarios.filter(
			(usuario) => usuario.rol === 'admin'
		).length;

		setHabilitarBotones(contarAdmins >= 2);
	};

	const listaUsuariosBack = async () => {
		try {
			const resp = await javaPetApi.get('/admin/listaPacientes');
			const usuarios = resp.data.listaPacientes;
			setCargarUsuarios(usuarios);
			actualizarHabilitacionBotones(usuarios);
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
				console.error('Error verificando la sesión:', error);
			}
		}
	};

	useEffect(() => {
		listaUsuariosBack();
	}, [navigate]);

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
		actualizarHabilitacionBotones(updatedPacientes);
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

	const esAdmin = (usuario) => usuario.rol === 'admin';

	const esEditable = (usuario) => {
		return !esAdmin(usuario) || (esAdmin(usuario) && habilitarBotones);
	};
	const esEliminable = (usuario) => {
		return !esAdmin(usuario) || (esAdmin(usuario) && habilitarBotones);
	};

	return (
		<div>
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
							{cargarUsuarios.map((usuario, index) => (
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
												disabled={!esEditable(usuario)}
											>
												<PencilSquare />
											</Button>
											<Button
												variant="outline-danger"
												onClick={() =>
													eliminarPaciente(usuario._id, listaUsuariosBack)
												}
												disabled={!esEliminable(usuario)}
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
							))}
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
		</div>
	);
};
