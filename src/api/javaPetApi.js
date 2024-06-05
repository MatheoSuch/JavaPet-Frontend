import axios from 'axios';

const javaPetApi = axios.create({
	baseURL: 'http://localhost:3000',
});

javaPetApi.interceptors.request.use((config) => {
	config.headers = {
		'x-token': localStorage.getItem('token'),
	};
	return config;
});

export default javaPetApi;
