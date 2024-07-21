import React from 'react';
import { Envelope, Github } from 'react-bootstrap-icons';
import avatarMatheo from '../../../assets/Matheoo.jpg';
import avatarJuan from '../../../assets/Juan.png';
import avatarPato from '../../../assets/Patricia.jpg';
import avatarMarcelo from '../../../assets/marcelo.jpg';
import './Acercade.css';

const teamMembers = [
	{
		name: 'Matheo Such',
		role: 'Estudiante de Programación',
		email: 'matheosuch1@gmail.com',
		github: 'https://github.com/MatheoSuch',
		avatar: avatarMatheo,
		quote: '¡Programar es como navegar por un océano de posibilidades!',
	},
	{
		name: 'Juan Pablo Gomez Maturana',
		role: 'Estudiante de Programación',
		email: 'jgomezmaturana@gmail.com',
		github: 'https://github.com/JPGomezMaturana',
		avatar: avatarJuan,
		quote: 'La mejor forma de predecir el futuro es programarlo.',
	},
	{
		name: 'Patricia Figueroa',
		role: 'Estudiante de Programación',
		email: 'cpfigueroa1@gmail.com',
		github: 'https://github.com/cpfigueroa',
		avatar: avatarPato,
		quote: 'El código es poesía en el mundo digital.',
	},
	{
		name: 'Marcelo de Cristobal',
		role: 'Estudiante de Programación',
		email: 'marcelodecristobal87@gmail.com',
		github: 'https://github.com/MarcedeCris',
		avatar: avatarMarcelo,
		quote: 'La tecnología es mejor cuando nos une, no cuando nos divide.',
	},
];

const AcercaDe = () => {
	return (
		<div className="container acerca-de-container">
			<div className="text-center mb-5">
				<h1 className="titutloAcer">NUESTRO EQUIPO</h1>
				<div className="section-title-underline mx-auto"></div>
				<p className="text-white mt-3">
					Especialistas en codear, investigadores de los lugares más recónditos de
					Google, estos somos:
				</p>
			</div>

			<div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 justify-content-center">
				{teamMembers.map((member, index) => (
					<div key={index} className="col my-2">
						<div className="card shadow purple-bg">
							<div className="card-img-container">
								<img
									src={member.avatar}
									className="card-img-top rounded-circle"
									alt={`Avatar ${member.name}`}
								/>
							</div>
							<div className="card-body text-center d-flex flex-column justify-content-between">
								<h5 className="card-title fw-bold text-white">{member.name}</h5>
								<p className="card-text text-white">{member.role}</p>
								<p className="card-text text-white">{member.email}</p>
								<p className="card-text text-white mb-4">{member.quote}</p>
								<div className="social-links">
									<a href={`mailto:${member.email}`} className="text-white me-3">
										<Envelope />
									</a>
									<a href={member.github} className="text-white">
										<Github />
									</a>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AcercaDe;
