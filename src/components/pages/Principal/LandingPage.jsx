import React from 'react';
import Bienvenida from './seccionesPrincipal/Bienvenida/Bienvenida';
import Servicios from '../Servicios/../Principal/seccionesPrincipal/Servicios/Servicios';
import Slider from '../Principal/seccionesPrincipal/Deslizante/Slider';
import Publicidad from '../Principal/seccionesPrincipal/Publicidad/Publicidad';
import Clima from '../Principal/seccionesPrincipal/Clima/Clima';
import { Planes } from '../Principal/seccionesPrincipal/Planes/Planes';
import { Veterinario } from '../Principal/seccionesPrincipal/Veterinario/Veterinario';
import { Testimonios } from '../Principal/seccionesPrincipal/Testimonios/Testimonios';
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
