import React from 'react';
import { ListaUsuarios } from './pacientesAdmin/ListaUsuarios';
import { ListaTurnos } from './turnosAdmin/ListaTurnos';

export const AdminHome = () => {
	return (
		<div>
			<ListaUsuarios />
			<ListaTurnos />
		</div>
	);
};
