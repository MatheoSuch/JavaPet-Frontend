import React from 'react';
import { ListaUsuarios } from './pacientesAdmin/ListaUsuarios';
import { ListaTurnos } from './turnosAdmin/ListaTurnos';
import FotoAdminHome from '../../../img/FotoAdminHome.jpg';
import './AdminHome.css';

export const AdminHome = () => {
	return (
		<div className="admin-home" style={{ backgroundImage: `url(${FotoAdminHome})` }}>
			<div className="overlay"></div>
			<ListaUsuarios />
			<ListaTurnos />
		</div>
	);
};
