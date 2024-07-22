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
import { Planes } from '../components/pages/Planes/Planes';
import PrivateRoute from '../routes/RutasProtegidas';

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/registro" element={<Registro />} />
				<Route path="/login" element={<Login />} />
				<Route
					path="/adminHome"
					element={<PrivateRoute element={AdminHome} roles={['admin']} />}
				/>
				<Route
					path="/listaUsuarios"
					element={<PrivateRoute element={ListaUsuarios} roles={['admin']} />}
				/>
				<Route
					path="/listaTurnos"
					element={<PrivateRoute element={ListaTurnos} roles={['admin']} />}
				/>
				<Route path="/QuienesSomos" element={<AcercaDe />} />
				<Route path="/Error404" element={<Error404 />} />
				<Route path="/Contactanos" element={<Contacto />} />
				<Route path="/planes" element={<Planes />} />
				<Route path="*" element={<Error404 />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
};
