import React, { useState } from 'react';
import './Error404.css';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Error404 = () => {
	const [showModal, setShowModal] = useState(false);

	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	return (
		<div className="error-page">
			<div className="text-container">
				<h1 className="title">Error404 - Página no encontrada</h1>
				<h3 className="subtitle">
					Al parecer esta página no existe. ¡No te preocupes! Para volver al Inicio,
					puede clickear el botón debajo para regresar.
				</h3>
				<Link to="/" className="button-link">
					Volver al Inicio
				</Link>
				<Button variant="info" onClick={handleShow} className="info-button">
					Información Adicional
				</Button>
			</div>

			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Información Adicional</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>¡Gracias por informarnos sobre este problema!</p>
					<p>
						Si tienes más preguntas o necesitas ayuda adicional, por favor
						contáctanos.
					</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cerrar
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Error404;
