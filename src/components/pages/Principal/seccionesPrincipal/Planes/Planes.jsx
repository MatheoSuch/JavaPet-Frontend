import React from 'react';
import './Planes.css'; // Asegúrate de importar tu archivo CSS
import perrito1 from '../../../../../assets/perritobebe.jpg';
import perrito2 from '../../../../../assets/perrito2.jpg';
import perrito3 from '../../../../../assets/gatito.jpg';

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
							<a
								href="https://mail.google.com"
								target="_blank"
								rel="noopener noreferrer"
								className="plan-link"
							>
								<p>
									<strong>Plan Primeros Pasos</strong>: servicios para mascotas de 0
									a 5 años Este plan incluye vacunas, desparasitaciones, chequeos
									periódicos y asesoramiento nutricional para garantizar un
									crecimiento saludable.
								</p>
								<button className="btn-plan">Ver Plan</button>
							</a>
						</div>
					</div>
					<div className="plan" id="divReverse">
						<div className="plan-description">
							<a
								href="https://mail.google.com"
								target="_blank"
								rel="noopener noreferrer"
								className="plan-link"
							>
								<p>
									<strong>Plan Madurando</strong>: servicios para mascotas de 5 a 10
									años Incluye controles veterinarios completos, prevención de
									enfermedades comunes y consejos para el cuidado dental y físico.
								</p>
								<button className="btn-plan">Ver Plan</button>
							</a>
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
							<a
								href="https://mail.google.com"
								target="_blank"
								rel="noopener noreferrer"
								className="plan-link"
							>
								<p>
									<strong>Plan Adultos</strong>: servicios para mascotas de más de 10
									años Este plan ofrece cuidados especializados, incluyendo exámenes
									geriátricos, manejo de enfermedades crónicas y soporte nutricional.
								</p>
								<button className="btn-plan">Ver Plan</button>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
