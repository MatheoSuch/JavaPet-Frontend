import React from 'react';
import './Error404.css';
import { Link } from 'react-router-dom';

const Error404 = () => {
	return (
		<div className="error-page">
			<div className="text-container">
				<h1 className="title">Error404 - Página no encontrada</h1>
				<h3 className="subtitle">
					Al parecer esta página no existe, te redireccionaremos en segundos a una
					página de inicio. ¡No te preocupes! Si esta página no cambia, puede tocar
					el botón debajo para regresar.
				</h3>
				<Link to="/" className="button-link">
					Volver al Inicio
				</Link>
			</div>
		</div>
	);
};

export default Error404;
