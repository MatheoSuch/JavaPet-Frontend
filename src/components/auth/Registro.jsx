import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import javaPetApi from '../../api/javaPetApi';
import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';

export const Registro = () => {
	const [nombre, setNombre] = useState('');
	const [edad, setEdad] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	// const navigate = useNavigate;

	const registroUsuarioBackend = async (nombre, edad, email, password) => {
		try {
			const respuesta = await javaPetApi.post('/auth/crearUsuario', {
				nombre,
				edad,
				email,
				password,
			});
			if (respuesta.status === 201) {
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: 'Registrado correctamente',
					showConfirmButton: false,
					timer: 1500,
				});
				// navigate("/")
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
	const handleSubmit = (e) => {
		e.preventDefault();
		if (nombre === '' || !edad === '' || !email === '' || !password === '') {
			return console.log('error');
		} else if (edad < 15) {
			return console.log('Debe ser mayor de edad');
		}
		registroUsuarioBackend(nombre, edad, email, password);
	};

	return (
		<Form onSubmit={handleSubmit} className="w-50 p-5">
			<h1>Registro</h1>

			{/* {error ? <h3 className="errorStyle">{msgError}</h3> : ''} */}
			<Form.Group className="mb-3">
				<Form.Label>Nombre</Form.Label>
				<Form.Control
					type="text"
					id="nombre"
					value={nombre}
					onChange={(e) => setNombre(e.target.value)}
					placeholder="Ingresa tu nombre"
				/>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Edad</Form.Label>
				<Form.Control
					type="number"
					id="edad"
					value={edad}
					onChange={(e) => setEdad(e.target.value)}
					placeholder="Ingresa tu contraseña"
				/>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Email</Form.Label>
				<Form.Control
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Ingresa tu email"
				/>
				<Form.Text className="text-muted">
					No compartiremos tu mail con ningún tercero.
				</Form.Text>
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
			<Form.Group className="mb-3">
				<Form.Check type="checkbox" label="Acepto los términos y condiciones" />
			</Form.Group>
			<Button variant="primary" type="submit">
				Registrarse
			</Button>
		</Form>
	);
};
