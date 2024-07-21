import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import javaPetApi from '../../../api/javaPetApi';
import NavBar from '../../Navbar/Navbar';
import { Container, Row, Col } from 'react-bootstrap';
import Footer from '../../Footer/Footer';
import './Registro.css';
import fondoRegistro2 from '../../../assets/fondoRegistro2.jpg';
import { useNavigate } from 'react-router-dom';

export const Registro = () => {
	const [nombre, setNombre] = useState('');
	const [apellido, setApellido] = useState('');
	const [email, setEmail] = useState('');
	const [telefono, setTelefono] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false); // State to handle password visibility
	const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to handle confirm password visibility
	const [errorMsg, setErrorMsg] = useState('');
	const [acceptedTerms, setAcceptedTerms] = useState(false); // State to handle terms acceptance
	const navigate = useNavigate();

	const validateEmail = (email) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(String(email).toLowerCase());
	};

	const validatePhone = (phone) => {
		const re = /^\d{10}$/;
		return re.test(String(phone));
	};

	const registroUsuarioBackend = async () => {
		try {
			const respuesta = await javaPetApi.post('/auth/registro', {
				nombre,
				apellido,
				email,
				telefono,
				password,
				confirmPassword,
			});
			if (respuesta.status === 201) {
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: '¡Registro exitoso!',
					html: '<p>Bienvenido a JavaPet. Por favor ingrese su mail y contraseña para iniciar la sesión.</p>',
					showConfirmButton: false,
					timer: 3000,
					timerProgressBar: true,
				}).then(() => {
					navigate('/login');
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
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Todos los campos son obligatorios',
			});
			return;
		}

		if (!validateEmail(email)) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'El email no es válido',
			});
			return;
		}

		if (!validatePhone(telefono)) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'El teléfono debe tener 10 dígitos',
			});
			return;
		}

		if (password.length < 5) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'La contraseña debe tener más de 5 caracteres',
			});
			return;
		}

		if (password !== confirmPassword) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Las contraseñas deben ser iguales',
			});
			return;
		}

		if (!acceptedTerms) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Debe aceptar los términos y condiciones',
			});
			return;
		}

		registroUsuarioBackend();
	};

	return (
		<div>
			<Container className="py-5">
				<h1 className="tituloRegistro">Registrarse</h1>
				<hr />
				<Row className="align-items-stretch">
					<Col xs={12} lg={6} className="registro-form-container">
						<Form onSubmit={handleSubmit} className="w-100 p-5">
							<Form.Group className="mb-3">
								<Form.Label>Nombre</Form.Label>
								<Form.Control
									type="text"
									id="nombre"
									required
									maxLength="30"
									minLength="2"
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
									required
									maxLength="30"
									minLength="2"
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
									required
									minLength="10"
									maxLength="30"
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
									required
									maxLength="10"
									minLength="10"
									value={telefono}
									onChange={(e) => setTelefono(e.target.value)}
									placeholder="Ingresa tu teléfono"
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Password</Form.Label>
								<div className="password-container">
									<Form.Control
										type={showPassword ? 'text' : 'password'}
										id="password"
										required
										minLength="5"
										maxLength="30"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder="Ingresa tu contraseña"
									/>
									<FontAwesomeIcon
										icon={showPassword ? faEyeSlash : faEye}
										className="password-icon"
										onClick={() => setShowPassword(!showPassword)}
									/>
								</div>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Confirmar Password</Form.Label>
								<div className="password-container">
									<Form.Control
										type={showConfirmPassword ? 'text' : 'password'}
										id="confirmPassword"
										required
										minLength="5"
										maxLength="30"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										placeholder="Confirma tu contraseña"
									/>
									<FontAwesomeIcon
										icon={showConfirmPassword ? faEyeSlash : faEye}
										className="password-icon"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									/>
								</div>
							</Form.Group>
							<Form.Group className="mb-2">
								<Form.Check
									type="checkbox"
									label="Acepto los términos y condiciones"
									required
									checked={acceptedTerms}
									onChange={(e) => setAcceptedTerms(e.target.checked)}
								/>
							</Form.Group>
							<Button variant="primary" type="submit">
								Registrarse
							</Button>
						</Form>
					</Col>
					<Col xs={12} lg={6} className="registro-image-container">
						<img
							src={fondoRegistro2}
							className="registro-image"
							alt="Imagen de registro"
						/>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
