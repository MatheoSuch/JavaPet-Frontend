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
			if (error.response.status === 401) {
				Swal.fire({
					icon: 'warning',
					title: 'Sesión Expirada',
					text: 'Tu sesión ha expirado. Por favor, inicie sesión nuevamente.',
					confirmButtonColor: '#3085d6',
					confirmButtonText: 'Iniciar sesión',
				});
			}
		}
		return Promise.reject(error);
	}
);
export default javaPetApi;
