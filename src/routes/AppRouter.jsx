import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '../components/auth/Login';
import { Registro } from '../components/auth/Registro';
import { AdminHome } from '../components/pages/AdminHome';

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Registro />} />
				<Route path="/login" element={<Login />} />
				<Route path="/admin" element={<AdminHome />} />
			</Routes>
		</BrowserRouter>
	);
};
