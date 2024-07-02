import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import { useNavigate } from 'react-router-dom';
import javaPetApi from '../../api/javaPetApi';
import Swal from 'sweetalert2';

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	// const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		//aca van las validaciones

		startLogin(email, password);
	};

	const startLogin = async (email, password) => {
		try {
			const resp = await javaPetApi.post('/auth/login', {
				email,
				password,
			});
			localStorage.setItem('token', resp.data.token);
			if (resp.data.rol === 'usuario') {
				// navigate('/shop');
			} else {
				// navigate('/admin');
			}
		} catch (error) {
			setErrorMsg(error.response.data.msg);
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: errorMsg,
				footer: '<a href="#">Why do I have this issue?</a>',
			});
		}
	};
	return (
		<Form onSubmit={handleSubmit}>
			<h2>Login</h2>
			<Form.Group>
				<Form.Label>Email</Form.Label>
				<Form.Control
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Ingresa tu email"
				/>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Ingresa tu contraseña"
				/>
			</Form.Group>
			<Button variant="primary" type="submit">
				Loguearse
			</Button>
		</Form>
	);
};