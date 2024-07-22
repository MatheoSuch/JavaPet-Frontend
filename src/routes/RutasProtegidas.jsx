import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, roles }) => {
	const token = localStorage.getItem('token');
	const userRole = localStorage.getItem('rol');

	const isAuthenticated = !!token;
	const hasRole = roles ? roles.includes(userRole) : true;

	return isAuthenticated && hasRole ? <Element /> : <Navigate to="/login" />;
};

export default PrivateRoute;
