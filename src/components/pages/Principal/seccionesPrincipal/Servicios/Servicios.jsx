import './Servicios.css';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import servicios1 from '../../../../../assets/servicios1a.png';

const Servicios = () => {
	const servicios = [
		{
			titulo: 'Servicios de Vacunación',
			imagen: servicios1,
			descripcion:
				'Ofrecemos una gama completa de vacunas para la salud de tu mascota',
		},
		{
			titulo: 'Servicios de Clinica General',
			imagen: servicios1,
			descripcion: 'Atención médica general y especializada para  las mascotas.',
		},
		{
			titulo: 'Servicios de Ecografias',
			imagen: servicios1,
			descripcion: 'Ecografías de alta calidad para diagnósticos precisos.',
		},
		{
			titulo: 'Servicios de Peluqueria',
			imagen: servicios1,
			descripcion:
				'Peluquería y estética para que tus mascotas siempre luzcan bien.',
		},
		{
			titulo: 'Servicios de Oftalmología',
			imagen: servicios1,
			descripcion:
				'Cuida la vista de tus mascotas con nuestros servicios de oftalmología.',
		},
		{
			titulo: 'Servicios a la comunidad',
			imagen: servicios1,
			descripcion: 'Programas y servicios para el bienestar de la comunidad animal.',
		},
	];

	return (
		<div className="services-container" style={{ marginTop: '100px' }}>
			<h2 className="services-title">Nuestros Servicios</h2>
			<section id="home-outstanding" className="my-5">
				<Container>
					<Row>
						{servicios.map((servicio, index) => (
							<Col xs={12} md={6} className="text-center my-3" key={index}>
								<div className="service-card rounded p-4">
									<div className="mb-4">
										<img
											alt={servicio.titulo}
											height="90px"
											src={servicio.imagen}
											className="lazyload"
										/>
									</div>
									<div className="mt-4">
										<h3 className="h3 service-title my-3">{servicio.titulo}</h3>
										<p className="service-description">{servicio.descripcion}</p>
									</div>
								</div>
							</Col>
						))}
					</Row>
				</Container>
			</section>
		</div>
	);
};

export default Servicios;
