import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '../components/auth/login/Login';
import { AdminHome } from '../components/pages/admin/AdminHome';
import { LandingPage } from '../components/pages/Principal/LandingPage';
import { Registro } from '../components/auth/registro/Registro';

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/registro" element={<Registro />} />
				<Route path="/login" element={<Login />} />
				<Route path="/admin" element={<AdminHome />} />
			</Routes>
		</BrowserRouter>
	);
};
