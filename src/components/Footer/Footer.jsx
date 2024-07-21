import React from 'react';
import './Footer.css'; // Asegúrate de importar el archivo CSS
import logo from '../../assets/Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
	faFacebookSquare,
	faInstagramSquare,
	faTwitterSquare,
	faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<div className="footer-container">
			<div>
				<img src={logo} alt="Logo JavaPet" className="footer-logo" />
			</div>
			<div className="footer-links">
				<Link to="/error404" className="footer-link">
					<FontAwesomeIcon icon={faWhatsapp} className="footer-icon" /> 381560312
				</Link>
				<Link to="/error404" className="footer-link">
					<FontAwesomeIcon icon={faEnvelope} className="footer-icon" />{' '}
					javapet@gmail.com
				</Link>
				<Link to="/error404" className="footer-link">
					<FontAwesomeIcon icon={faMapMarkerAlt} className="footer-icon" /> San
					Miguel de Tucumán
				</Link>
				<Link to="/error404" className="footer-link">
					<FontAwesomeIcon icon={faFacebookSquare} className="footer-icon" />{' '}
					JavaPetFace
				</Link>
				<Link to="/error404" className="footer-link">
					<FontAwesomeIcon icon={faInstagramSquare} className="footer-icon" />{' '}
					JavaPetOficial
				</Link>
				<Link to="/error404" className="footer-link">
					<FontAwesomeIcon icon={faTwitterSquare} className="footer-icon" />{' '}
					JavaPetTwitter
				</Link>
			</div>
			<hr className="footer-hr" />
			<p className="footer-text">
				JavaPet siempre cerca de ti. Síguenos para más opciones.
			</p>
			<div>
				<img
					className="footer-banner"
					src="https://veterinariaeltoro.com/wp-content/uploads/2019/05/veterinaria-el-toro-comp.gif"
					alt="banner domicilios veterinaria"
					style={{ width: '100%', maxWidth: '1268px' }}
				/>
			</div>
		</div>
	);
};

export default Footer;
