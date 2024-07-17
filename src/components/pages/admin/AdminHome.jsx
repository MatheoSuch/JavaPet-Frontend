import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminHome.css';
import NavBar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import { ListaUsuarios } from './pacientesAdmin/ListaUsuarios';
import { ListaTurnos } from './turnosAdmin/ListaTurnos';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

Chart.register(...registerables);

export const AdminHome = () => {
	const chartData = {
		labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
		datasets: [
			{
				label: 'Usuarios Registrados',
				data: [12, 19, 3, 5, 2, 7],
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
				borderColor: 'rgba(75, 192, 192, 1)',
				borderWidth: 1,
			},
		],
	};

	const handleWelcomeAlert = () => {
		Swal.fire({
			title: 'Bienvenido, Admin!',
			text: 'JavaPet',
			icon: 'success',
			customClass: {
				popup: 'animated fadeInDown faster',
			},
			showConfirmButton: false,
			timer: 2000,
		});
	};

	useEffect(() => {
		handleWelcomeAlert();
	}, []);

	return (
		<div>
			<NavBar />
			<div className="admin-home-container">
				<div className="admin-welcome">
					<h1>Bienvenido al Panel de Administración</h1>
					<p>Versión del sistema: 1.0.0</p>
				</div>
				<div className="admin-actions">
					<Link to="/listaUsuarios" className="admin-button">
						<FontAwesomeIcon icon={faUsers} /> Lista de Usuarios
					</Link>
					<Link to="/listaTurnos" className="admin-button">
						<FontAwesomeIcon icon={faCalendarCheck} /> Lista de Turnos
					</Link>
				</div>
				<div className="admin-stats">
					<h2>Estadísticas del Sistema</h2>
					<Bar data={chartData} />
				</div>
			</div>
			<Footer />
		</div>
	);
};
