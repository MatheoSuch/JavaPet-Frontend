import React from 'react';
import './Veterinario.css';
import veterinario1 from '../../../../../assets/veterinario1.png';
import veterinario2 from '../../../../../assets/veterinario2.png';
import veterinario3 from '../../../../../assets/veterinario3.png';

export const Veterinario = () => {
	return (
		<div className="d-flex flex-column justify-content-center align-items-center">
			<h2 className="veterinario-title">Nuestros Profesionales</h2>
			<div className="row">
				<div className="col-12 col-lg-4 d-flex flex-column justify-content-center align-items-center img-container">
					<img src={veterinario1} alt="Alejo" />
					<h2>Alejo Sanchez</h2>
					<p>Traumatología Veterinaria</p>
					<p>
						Experiencia: 10 años trabajando en disciplina de la Traumatología,
						especializado en cirugía ortopédica.
					</p>
				</div>

				<div className="col-12 col-lg-4 d-flex flex-column justify-content-center align-items-center img-container">
					<img src={veterinario2} alt="Camila" />
					<h2>Camila Rodriguez</h2>
					<p>Peluquería Canina y Felina</p>
					<p>
						Experiencia: 8 años en el cuidado y estilismo de mascotas, certificada en
						varias técnicas de grooming.
					</p>
				</div>

				<div className="col-12 col-lg-4 d-flex flex-column justify-content-center align-items-center img-container position-relative">
					<img src={veterinario3} alt="Melissa" className="veterinario-image" />
					<h2>Melissa Lopez</h2>
					<p>Clínica Veterinaria</p>
					<p>
						Experiencia: 12 años, con un enfoque en medicina preventiva y tratamiento
						de enfermedades en mascotas.
					</p>
					<div className="not-available-badge">No Disponible</div>
				</div>
			</div>
		</div>
	);
};
