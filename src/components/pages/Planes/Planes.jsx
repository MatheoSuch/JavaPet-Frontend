import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';
import './planes.css';
import bannerImg from '../../../assets/Banner.png';
import planImg1 from '../../../assets/Rectangle 4296.png';
import texturaImg from '../../../assets/textura.png';
import planImg2 from '../../../assets/Cacho-e-gato-juntos-no-chao-posando-pra-foto_3.webp';
import planImg3 from '../../../assets/186654806-adorable-gato-y-perro-sobre-fondo-blanco-lindos-amigos.jpg';
import iconoPatita from '../../../assets/icono patita.png';
import javaPetApi from '../../../api/javaPetApi';
import { useNavigate } from 'react-router-dom';

export const Planes = () => {
	const navigate = useNavigate();
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState(null);

	const openModal = (plan) => {
		setSelectedPlan(plan);
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();

		emailjs
			.sendForm('service_511isyj', 'template_sayp2i4', e.target, 'sEkVlvVxP6LALiDNo')
			.then(
				(result) => {
					closeModal();
					Swal.fire({
						icon: 'success',
						title: 'Mensaje enviado correctamente',
						text: 'Recibimos tu información. Te contactaremos pronto.',
					});
				},
				(error) => {
					Swal.fire({
						icon: 'error',
						title: 'Error al enviar el mensaje',
						text: 'Hubo un problema al enviar tu mensaje. Inténtalo de nuevo más tarde.',
					});
				}
			);
	};

	const checkSessionExpiration = async () => {
		try {
			await javaPetApi.get('/auth/verify-token');
		} catch (error) {
			if (error.response && error.response.status === 401) {
				localStorage.removeItem('token');
				Swal.fire({
					icon: 'warning',
					title: 'Sesión Expirada',
					text: 'Tu sesión ha expirado. Por favor, inicie sesión nuevamente.',
					confirmButtonColor: '#3085d6',
					confirmButtonText: 'Iniciar sesión',
					allowOutsideClick: false,
					allowEscapeKey: false,
					showCancelButton: false,
				}).then((result) => {
					if (result.isConfirmed) {
						navigate('/login', { replace: true });
					}
				});
			} else {
				console.error('Error verificando la sesión:', error);
			}
		}
	};

	useEffect(() => {
		checkSessionExpiration();
	}, [navigate]);

	return (
		<>
			<div className="banner">
				<img src={bannerImg} alt="Banner" style={{ width: '100%' }} />
				<div className="texto-y-boton-encima">
					<div className="texto-banner-izquierda">
						<h2 className="subtitulo">Nuestros mejores planes para tu peludito</h2>
						<h1 className="titulo-principal-banner">Protege a tu mascota</h1>
						<h5 className="texto-descriptivo">
							¡Cuida a tu compañero peludo con nuestros planes de salud
							personalizados!
						</h5>
					</div>
					<button
						className="boton-ver-planes"
						onClick={() =>
							window.scrollTo({
								top: document.body.scrollHeight,
								behavior: 'smooth',
							})
						}
					>
						Ver planes
					</button>
				</div>
			</div>

			<h1 className="titulo-principal">Nuestros Planes de Salud</h1>

			<div className="plan-container">
				<div className="imagen-plan">
					<img
						src={planImg1}
						alt="Descripción de la imagen"
						style={{ width: '100%' }}
					/>
				</div>

				<div className="contenido-plan plan-basico">
					<h1>Plan Primeros Pasos</h1>
					<h3>
						Nuestro plan básico ofrece los servicios esenciales para mantener la
						salud de tu mascota al día. Incluye chequeos anuales, vacunas básicas,
						desparasitación, y descuentos en servicios adicionales.
						<br />
						<br />
						Beneficios:
						<br />
						<br />
						- Chequeo anual completo con nuestro veterinario.
						<br />
						- Vacunas básicas para la protección contra enfermedades comunes.
						<br />
						- Desparasitación anual para prevenir infestaciones de parásitos internos
						y externos.
						<br />
						- Descuentos en servicios adicionales como consultas de emergencia y
						análisis de laboratorio.
						<br />- Acceso a consejos y recomendaciones personalizadas para el
						cuidado de tu mascota.
					</h3>
					<img
						src={texturaImg}
						alt="Imagen de fondo"
						style={{ width: '100%', height: '397px', marginTop: '-350px' }}
					/>
					<div className="overlay">
						<h1>PRECIO: 12.520$ MENSUALES</h1>
						<button onClick={() => openModal('Plan Básico')}>
							Pedir más información
						</button>
					</div>
				</div>
			</div>

			<div className="beneficios">
				<div className="beneficio">
					<img src={iconoPatita} alt="Chequeo Anual" />
					<h4>Chequeo Anual</h4>
					<p>Completo con nuestro veterinario.</p>
				</div>
				<div className="beneficio">
					<img src={iconoPatita} alt="Vacunas Básicas" />
					<h4>Vacunas Básicas</h4>
					<p>Para la protección contra enfermedades comunes.</p>
				</div>
				<div className="beneficio">
					<img src={iconoPatita} alt="Desparasitación Anual" />
					<h4>Desparasitación Anual</h4>
					<p>Para prevenir infestaciones de parásitos.</p>
				</div>
				<div className="beneficio">
					<img src={iconoPatita} alt="Descuentos" />
					<h4>Descuentos</h4>
					<p>En servicios adicionales como consultas de emergencia.</p>
				</div>
			</div>

			<div className="plan-container">
				<div className="imagen-plan">
					<img
						src={planImg2}
						alt="Descripción de la imagen"
						style={{ width: '100%' }}
					/>
				</div>

				<div className="contenido-plan plan-basico-2">
					<h1>Plan Madurando</h1>
					<h3>
						El Plan Avanzado ofrece una cobertura más completa para tu mascota.
						Incluye todos los beneficios del Plan Básico, además de servicios
						adicionales como consultas ilimitadas, análisis de laboratorio y acceso a
						especialistas.
						<br />
						<br />
						Beneficios:
						<br />
						<br />
						- Chequeo anual completo con nuestro veterinario.
						<br />
						- Vacunas completas para la protección contra una gama más amplia de
						enfermedades.
						<br />
						- Desparasitación semestral para una mayor protección.
						<br />
						- Consultas veterinarias ilimitadas durante el año.
						<br />
						- Análisis de laboratorio gratuitos.
						<br />
						- Acceso a especialistas en caso de necesitar tratamientos avanzados.
						<br />- Descuentos en procedimientos quirúrgicos.
					</h3>
					<img
						src={texturaImg}
						alt="Imagen de fondo"
						style={{ width: '100%', height: '397px', marginTop: '-350px' }}
					/>
					<div className="overlay">
						<h1>PRECIO: 20.520$ MENSUALES</h1>
						<button onClick={() => openModal('Plan Avanzado')}>
							Pedir más información
						</button>
					</div>
				</div>
			</div>

			<div className="beneficios">
				<div className="beneficio">
					<img src={iconoPatita} alt="Chequeo Anual" />
					<h4>Chequeo Anual</h4>
					<p>Completo con nuestro veterinario.</p>
				</div>
				<div className="beneficio">
					<img src={iconoPatita} alt="Vacunas Completas" />
					<h4>Vacunas Completas</h4>
					<p>Protección contra una gama más amplia de enfermedades.</p>
				</div>
				<div className="beneficio">
					<img src={iconoPatita} alt="Desparasitación Semestral" />
					<h4>Desparasitación Semestral</h4>
					<p>Para una mayor protección.</p>
				</div>
				<div className="beneficio">
					<img src={iconoPatita} alt="Consultas Ilimitadas" />
					<h4>Consultas Ilimitadas</h4>
					<p>Durante el año.</p>
				</div>
			</div>

			<div className="plan-container">
				<div className="imagen-plan">
					<img
						src={planImg3}
						alt="Descripción de la imagen"
						style={{ width: '100%' }}
					/>
				</div>

				<div className="contenido-plan plan-basico-3">
					<h1>Plan Adultos</h1>
					<h3>
						El Plan Premium es el más completo para la salud de tu mascota. Incluye
						todos los beneficios del Plan Avanzado, además de atención preferencial,
						cobertura en emergencias y servicios de hospitalización.
						<br />
						<br />
						Beneficios:
						<br />
						<br />
						- Chequeo anual completo con nuestro veterinario.
						<br />
						- Vacunas completas para la protección contra una gama más amplia de
						enfermedades.
						<br />
						- Desparasitación trimestral para una protección máxima.
						<br />
						- Consultas veterinarias ilimitadas durante el año.
						<br />
						- Análisis de laboratorio gratuitos.
						<br />
						- Acceso a especialistas en caso de necesitar tratamientos avanzados.
						<br />
						- Descuentos en procedimientos quirúrgicos.
						<br />
						- Atención preferencial en todas nuestras clínicas.
						<br />
						- Cobertura en emergencias 24/7.
						<br />- Servicios de hospitalización en caso de ser necesario.
					</h3>
					<img
						src={texturaImg}
						alt="Imagen de fondo"
						style={{ width: '100%', height: '397px', marginTop: '-350px' }}
					/>
					<div className="overlay">
						<h1>PRECIO: 32.520$ MENSUALES</h1>
						<button onClick={() => openModal('Plan Premium')}>
							Pedir más información
						</button>
					</div>
				</div>
			</div>

			<div className="beneficios mb-5">
				<div className="beneficio">
					<img src={iconoPatita} alt="Atención Preferencial" />
					<h4>Atención Preferencial</h4>
					<p>En todas nuestras clínicas.</p>
				</div>
				<div className="beneficio">
					<img src={iconoPatita} alt="Cobertura en Emergencias" />
					<h4>Cobertura en Emergencias</h4>
					<p>24/7.</p>
				</div>
				<div className="beneficio">
					<img src={iconoPatita} alt="Hospitalización" />
					<h4>Servicios de Hospitalización</h4>
					<p>En caso de ser necesario.</p>
				</div>
			</div>
			{modalVisible && (
				<div className="modalPlanes">
					<div className="modal-content-planes">
						<span className="close" onClick={closeModal}>
							&times;
						</span>
						<h2>Pedir más información sobre {selectedPlan}</h2>
						<form onSubmit={handleFormSubmit}>
							<label htmlFor="name">
								Nombre:
								<input type="text" id="name" name="name" required />
							</label>
							<label htmlFor="email">
								Correo Electrónico:
								<input type="email" id="email" name="email" required />
							</label>
							<label htmlFor="message">
								Mensaje:
								<textarea id="message" name="message" required></textarea>
							</label>
							<button type="submit">Enviar</button>
						</form>
					</div>
				</div>
			)}
		</>
	);
};
