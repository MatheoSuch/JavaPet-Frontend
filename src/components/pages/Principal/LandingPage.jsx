import React from 'react';
import Bienvenida from './seccionesPrincipal/Bienvenida/Bienvenida';
import Servicios from './seccionesPrincipal/Servicios/Servicios';
import Slider from './seccionesPrincipal/Deslizante/Slider';
import Publicidad from './seccionesPrincipal/Publicidad/Publicidad';
import Clima from './seccionesPrincipal/Clima/Clima';
import { Planes } from './seccionesPrincipal/Planes/Planes';
import { Veterinario } from './seccionesPrincipal/Veterinario/Veterinario';
import { Testimonios } from './seccionesPrincipal/Testimonios/Testimonios';
// import { Login } from "../Login/Login";
// import Login from '../Login/Login'; // Asegúrate de que la ruta sea correcta

export const LandingPage = () => {
	return (
		<div className="contenedor-padre">
			{/* <Login /> */}

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
