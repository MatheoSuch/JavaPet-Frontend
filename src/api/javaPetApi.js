import axios from 'axios';

const javaPetApi = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
});

javaPetApi.interceptors.request.use((config) => {
	config.headers = {
		'x-token': localStorage.getItem('token'),
	};
	return config;
});

export default javaPetApi;
