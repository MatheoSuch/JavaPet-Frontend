import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '../components/auth/login/Login.jsx';
import { AdminHome } from '../components/pages/admin/AdminHome.jsx';
// import LandingPage from '../components/pages/Principal/LandingPage.jsx'
import { Registro } from '../components/auth/registro/Registro.jsx';
import  AcercaDe  from '../components/pages/Acercadenosotros/Acercade.jsx';
import  Contacto  from '../components/pages/Contacto/Contacto.jsx';
import  Error404  from '../components/pages/Error404/Error404.jsx';

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				{/* <Route path="/" element={<LandingPage />} /> */}
				<Route path="/registro" element={<Registro />} />
				<Route path="/login" element={<Login />} />
				<Route path="/admin" element={<AdminHome />} />
				<Route path="/nosotros" element={<AcercaDe />} />
				<Route path="/contacto" element={<Contacto />} />
				<Route path="/error404" element={<Error404 />} />
			</Routes>
			</BrowserRouter>
	);
};
