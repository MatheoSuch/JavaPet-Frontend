import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import javaPetApi from '../../../api/javaPetApi';
import NavBar from '../../Navbar/Navbar';
import { Container, Row, Col } from 'react-bootstrap';
import Footer from '../../Footer/Footer';
import './Registro.css'; // Importa el archivo CSS
import fondoRegistro2 from '../../../assets/fondoRegistro2.jpg';

export const Registro = () => {
	const [nombre, setNombre] = useState('');
	const [apellido, setApellido] = useState('');
	const [email, setEmail] = useState('');
	const [telefono, setTelefono] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const registroUsuarioBackend = async () => {
		try {
			const respuesta = await javaPetApi.post('/auth/crearUsuario', {
				nombre,
				apellido,
				email,
				telefono,
				password,
				confirmPassword,
			});
			if (respuesta.status === 201) {
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: 'Registrado correctamente',
					showConfirmButton: false,
					timer: 1500,
				});
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
		if (
			!nombre ||
			!apellido ||
			!email ||
			!telefono ||
			!password ||
			!confirmPassword
		) {
			console.log('Todos los campos son obligatorios');
			return;
		} else if (password.length < 5) {
			console.log('La contraseña debe tener más de 5 caracteres');
			return;
		} else if (password !== confirmPassword) {
			console.log('Las contraseñas deben ser iguales');
			return;
		}
		registroUsuarioBackend();
	};

	return (
		<div>
			<NavBar />
			<Container className="py-5">
				<h1 className="font-celeste-crud">Registrarse</h1>
				<hr />
				<Row>
					<Col xs={12} md={6} className="registro-form-container">
						<Form onSubmit={handleSubmit} className="w-100 p-5">
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
								<Form.Label>Apellido</Form.Label>
								<Form.Control
									type="text"
									id="apellido"
									value={apellido}
									onChange={(e) => setApellido(e.target.value)}
									placeholder="Ingresa tu apellido"
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
									No compartiremos tu correo con ningún tercero.
								</Form.Text>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Teléfono</Form.Label>
								<Form.Control
									type="tel"
									id="telefono"
									value={telefono}
									onChange={(e) => setTelefono(e.target.value)}
									placeholder="Ingresa tu teléfono"
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
							<Form.Group className="mb-3">
								<Form.Label>Confirmar Password</Form.Label>
								<Form.Control
									type="password"
									id="confirmPassword"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									placeholder="Confirma tu contraseña"
								/>
							</Form.Group>
							<Form.Group className="mb-2">
								<Form.Check
									type="checkbox"
									label="Acepto los términos y condiciones"
								/>
							</Form.Group>
							<Button variant="primary" type="submit">
								Registrarse
							</Button>
						</Form>
					</Col>
					<Col xs={12} md={6} className="my-2">
						<div className="registro-image-container">
							<img
								src={fondoRegistro2}
								className="img-fluid"
								alt="Imagen de registro"
							/>
						</div>
					</Col>
				</Row>
			</Container>
			<Footer />
		</div>
	);
};
