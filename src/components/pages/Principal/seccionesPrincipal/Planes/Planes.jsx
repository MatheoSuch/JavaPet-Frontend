import React from 'react';
import './Planes.css';
import perrito1 from '../../../../../assets/perritobebe.jpg';
import perrito2 from '../../../../../assets/perrito2.jpg';
import perrito3 from '../../../../../assets/gatito.jpg';
import { Link } from 'react-router-dom';

export const Planes = () => {
	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-10 col-md-10 planes-container">
					<h2 className="titulo-planes">Nuestros planes de salud</h2>
					<div className="plan">
						<div className="plan-image">
							<img src={perrito1} alt="Imagen 1" />
						</div>
						<div className="plan-description">
							<div className="plan-link">
								<p>
									<strong>Plan Primeros Pasos</strong>: servicios para mascotas de 0
									a 5 años Este plan incluye vacunas, desparasitaciones, chequeos
									periódicos y asesoramiento nutricional para garantizar un
									crecimiento saludable.
								</p>
								<Link to="/planes#plan1" className="btn-plan">
									Ver Plan
								</Link>
							</div>
						</div>
					</div>
					<div className="plan" id="divReverse">
						<div className="plan-description">
							<div className="plan-link">
								<p>
									<strong>Plan Madurando</strong>: servicios para mascotas de 5 a 10
									años Incluye controles veterinarios completos, prevención de
									enfermedades comunes y consejos para el cuidado dental y físico.
								</p>
								<Link to="/planes#plan2" className="btn-plan">
									Ver Plan
								</Link>
							</div>
						</div>
						<div className="plan-image">
							<img src={perrito2} alt="Imagen 2" />
						</div>
					</div>
					<div className="plan">
						<div className="plan-image">
							<img src={perrito3} alt="Imagen 3" />
						</div>
						<div className="plan-description">
							<div className="plan-link">
								<p>
									<strong>Plan Adultos</strong>: servicios para mascotas de más de 10
									años Este plan ofrece cuidados especializados, incluyendo exámenes
									geriátricos, manejo de enfermedades crónicas y soporte nutricional.
								</p>
								<Link to="/planes#plan3" className="btn-plan">
									Ver Plan
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
