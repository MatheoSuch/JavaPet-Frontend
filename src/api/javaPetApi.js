import axios from 'axios';
import Swal from 'sweetalert2';

const javaPetApi = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
});

javaPetApi.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers = {
				...config.headers,
				'x-token': token,
			};
		}
		return config;
	},
	(error) => Promise.reject(error)
);

javaPetApi.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response) {
			const { status } = error.response;
			if (status === 401) {
				Swal.fire({
					icon: 'warning',
					title: 'Sesión Expirada',
					text: 'Tu sesión ha expirado. Por favor, inicie sesión nuevamente.',
					confirmButtonColor: '#3085d6',
					confirmButtonText: 'Iniciar sesión',
					allowOutsideClick: false,
					allowEscapeKey: false,
				}).then((result) => {
					if (result.isConfirmed) {
						window.location.href = '/login';
					}
				});
			} else if (status === 403) {
				Swal.fire({
					icon: 'error',
					title: 'Acceso Denegado',
					text: 'No tienes permiso para acceder a esta sección.',
					confirmButtonColor: '#3085d6',
					confirmButtonText: 'Aceptar',
					allowOutsideClick: false,
					allowEscapeKey: false,
				});
				return Promise.resolve();
			} else {
				console.error('Error en la solicitud:', error.response.status);
			}
		} else {
			console.error('Error en la solicitud:', error.message);
		}
		return Promise.reject(error);
	}
);

export default javaPetApi;
