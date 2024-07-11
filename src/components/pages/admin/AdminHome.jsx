import React from 'react';
import { ListaUsuarios } from './pacientesAdmin/ListaUsuarios';
import { ListaTurnos } from './turnosAdmin/ListaTurnos';
import './AdminHome.css';
import NavBar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

export const AdminHome = () => {
	return (
		<div>
			<NavBar />
			<ListaUsuarios />
			<ListaTurnos />
			<Footer />
		</div>
	);
};
