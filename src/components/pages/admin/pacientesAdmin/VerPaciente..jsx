import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './pacienteCSS/VerPacientes.css';

const ModalDetalleUsuario = ({ usuario, show, handleClose }) => {
	if (!usuario) {
		return null;
	}

	return (
		<Modal show={show} onHide={handleClose} className="modal-ver-paciente">
			<Modal.Header closeButton>
				<Modal.Title>Detalles del Usuario</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3">
						<Form.Label>Nombre</Form.Label>
						<Form.Control type="text" value={usuario.nombre} readOnly />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Apellido</Form.Label>
						<Form.Control type="text" value={usuario.apellido} readOnly />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" value={usuario.email} readOnly />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Teléfono</Form.Label>
						<Form.Control type="text" value={usuario.telefono} readOnly />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Rol</Form.Label>
						<Form.Control as="select" value={usuario.rol} disabled>
							<option value="admin">Admin</option>
							<option value="usuario">Usuario</option>
						</Form.Control>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Cerrar
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalDetalleUsuario;
