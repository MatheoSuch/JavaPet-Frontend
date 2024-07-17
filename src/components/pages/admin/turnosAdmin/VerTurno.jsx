import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './turnoCSS/VerTurno.css';

const ModalDetalleTurno = ({ turno, show, handleClose }) => {
	if (!turno) {
		return null;
	}

	return (
		<Modal show={show} onHide={handleClose} className="modal-ver-turno">
			<Modal.Header closeButton>
				<Modal.Title>Detalles del Turno</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3">
						<Form.Label>ID</Form.Label>
						<Form.Control type="text" value={turno._id} readOnly />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Detalle de la cita</Form.Label>
						<Form.Control type="text" value={turno.detalleCita} readOnly />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Veterinario</Form.Label>
						<Form.Control type="text" value={turno.veterinario} readOnly />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Mascota</Form.Label>
						<Form.Control type="text" value={turno.mascota} readOnly />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Especie</Form.Label>
						<Form.Control type="text" value={turno.especie} readOnly />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Raza</Form.Label>
						<Form.Control type="text" value={turno.raza} readOnly />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Fecha</Form.Label>
						<Form.Control
							type="text"
							value={turno.fecha ? new Date(turno.fecha).toLocaleDateString() : ''}
							readOnly
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Hora</Form.Label>
						<Form.Control
							type="text"
							value={turno.hora ? turno.hora.substring(0, 5) : ''}
							readOnly
						/>
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

export default ModalDetalleTurno;
