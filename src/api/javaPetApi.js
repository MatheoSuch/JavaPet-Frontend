import axios from 'axios';

const javaPetApi = axios.create({
	baseURL: 'http://localhost:3000',
});

export default javaPetApi;
