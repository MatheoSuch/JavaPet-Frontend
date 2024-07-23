import React, { useEffect } from 'react';
import Bienvenida from './seccionesPrincipal/Bienvenida/Bienvenida';
import Servicios from './seccionesPrincipal/Servicios/Servicios';
import Slider from './seccionesPrincipal/Deslizante/Slider';
import Publicidad from './seccionesPrincipal/Publicidad/Publicidad';
import Clima from './seccionesPrincipal/Clima/Clima';
import { Planes } from './seccionesPrincipal/Planes/Planes';
import { Veterinario } from './seccionesPrincipal/Veterinario/Veterinario';
import { Testimonios } from './seccionesPrincipal/Testimonios/Testimonios';
import { useNavigate } from 'react-router-dom';
import javaPetApi from '../../../api/javaPetApi';
import Swal from 'sweetalert2';

export const LandingPage = () => {
	const navigate = useNavigate();

	const checkSessionExpiration = async () => {
		try {
			await javaPetApi.get('/admin/listaPacientes');
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
			}
		}
	};

	useEffect(() => {
		checkSessionExpiration();
	}, []);

	return (
		<div className="contenedor-padre">
			<Bienvenida />
			<Servicios />
			<Slider />
			<br />
			<br />
			<br />
			<Publicidad />
			<br />
			<br />
			<br />
			<br />
			<Planes />
			<br />
			<br />
			<br />
			<br />
			<br />
			<Veterinario />
			<br />
			<br />
			<Testimonios />
			<br />
			<br />
			<br />
			<br />
			<Clima />
		</div>
	);
};
