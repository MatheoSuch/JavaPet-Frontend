import React from 'react';
import Bienvenida from './seccionesPrincipal/Bienvenida/Bienvenida.jsx';
import Servicios from '../Servicios/../Principal/seccionesPrincipal/Servicios/Servicios.jsx';
import Slider from '../Principal/seccionesPrincipal/Deslizante/Slider.jsx';
import Publicidad from '../Principal/seccionesPrincipal/Publicidad/Publicidad.jsx';
import Clima from '../Principal/seccionesPrincipal/Clima/Clima.jsx';
import { Planes } from '../Principal/seccionesPrincipal/Planes/Planes.jsx';
import { Veterinario } from '../Principal/seccionesPrincipal/Veterinario/Veterinario.jsx';
import { Testimonios } from '../Principal/seccionesPrincipal/Testimonios/Testimonios.jsx';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
// import { Login } from "../Login/Login";
// import Login from '../Login/Login'; // Asegúrate de que la ruta sea correcta

export const LandingPage = () => {
	return (
		<div className="contenedor-padre">
			{/* <Login /> */}
			<Navbar />
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
			<Footer />
		</div>
	);
};
