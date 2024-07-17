import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '../components/auth/login/Login';
import { AdminHome } from '../components/pages/admin/AdminHome';
import { LandingPage } from '../components/pages/Principal/LandingPage';
import { Registro } from '../components/auth/registro/Registro';
import { ListaUsuarios } from '../components/pages/admin/pacientesAdmin/ListaUsuarios';
import { ListaTurnos } from '../components/pages/admin/turnosAdmin/ListaTurnos';

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/registro" element={<Registro />} />
				<Route path="/login" element={<Login />} />
				<Route path="/adminHome" element={<AdminHome />} />
				<Route path="/listaUsuarios" element={<ListaUsuarios />} />
				<Route path="/listaTurnos" element={<ListaTurnos />} />
			</Routes>
		</BrowserRouter>
	);
};
