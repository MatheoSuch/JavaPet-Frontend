import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '../components/auth/login/Login';
import { AdminHome } from '../components/pages/admin/AdminHome';
import { LandingPage } from '../components/pages/Principal/LandingPage';
import { Registro } from '../components/auth/registro/Registro';
import { ListaUsuarios } from '../components/pages/admin/pacientesAdmin/ListaUsuarios';
import { ListaTurnos } from '../components/pages/admin/turnosAdmin/ListaTurnos';
import AcercaDe from '../components/pages/AcercaDeNosotros/Acercade';
import NavBar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Contacto from '../components/pages/Contacto/Contacto';
import Error404 from '../components/pages/Error404/Error404';

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/registro" element={<Registro />} />
				<Route path="/login" element={<Login />} />
				<Route path="/adminHome" element={<AdminHome />} />
				<Route path="/listaUsuarios" element={<ListaUsuarios />} />
				<Route path="/listaTurnos" element={<ListaTurnos />} />
				<Route path="/QuienesSomos" element={<AcercaDe />} />
				<Route path="/Error404" element={<Error404 />} />
				<Route path="/Contactanos" element={<Contacto />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
};
