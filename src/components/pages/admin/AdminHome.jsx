import React from 'react';
import { ListaUsuarios } from './pacientesAdmin/ListaUsuarios';
import { ListaTurnos } from './turnosAdmin/ListaTurnos';
import { CrearUsuario } from './pacientesAdmin/CrearPaciente';

export const AdminHome = () => {
	return (
		<div>
			<CrearUsuario />
			<h2>Lista de Usuarios</h2>
			<ListaUsuarios />
			<h2>Lista de Turnos</h2>
			<ListaTurnos />
		</div>
	);
};
