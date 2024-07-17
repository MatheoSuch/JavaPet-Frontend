import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import sliderImage1 from '../../../../../assets/alimentogato1.png';
import sliderImage2 from '../../../../../assets/alimentogato2.png';
import sliderImage3 from '../../../../../assets/alimentogato3.png';
import sliderImage4 from '../../../../../assets/alimentogato4.png';
import sliderImage5 from '../../../../../assets/alimentogato5.png';
import sliderImage6 from '../../../../../assets/alimentoperro1.png';
import sliderImage7 from '../../../../../assets/alimentoperro1a.png';
import sliderImage8 from '../../../../../assets/alimentoperro1ab.png';
import sliderImage9 from '../../../../../assets/alimentoperro1abc.png';
import './Slider.css';

const Slider = () => {
	const responsive = {
		largeDesktop: {
			breakpoint: { max: 4000, min: 1024 },
			items: 5,
		},
		desktop: {
			breakpoint: { max: 1024, min: 768 },
			items: 3,
		},
		tablet: {
			breakpoint: { max: 768, min: 464 },
			items: 2,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	};

	return (
		<div className="slider-container" style={{ marginTop: '100px' }}>
			<h2 className="slider-title">Nuestros Productos</h2>
			<Carousel
				responsive={responsive}
				ssr={true}
				infinite={true}
				autoPlay={true}
				autoPlaySpeed={3000}
				itemClass="carousel-item-padding-40-px custom-carousel-item"
				containerClass="custom-carousel-container"
				className="custom-carousel-container"
			>
				<img className="custom-carousel-item" src={sliderImage1} alt="Producto 1" />
				<img className="custom-carousel-item" src={sliderImage2} alt="Producto 2" />
				<img className="custom-carousel-item" src={sliderImage3} alt="Producto 3" />
				<img className="custom-carousel-item" src={sliderImage4} alt="Producto 4" />
				<img className="custom-carousel-item" src={sliderImage5} alt="Producto 5" />
				<img className="custom-carousel-item" src={sliderImage6} alt="Producto 6" />
				<img className="custom-carousel-item" src={sliderImage7} alt="Producto 7" />
				<img className="custom-carousel-item" src={sliderImage8} alt="Producto 8" />
				<img className="custom-carousel-item" src={sliderImage9} alt="Producto 9" />
			</Carousel>
		</div>
	);
};

export default Slider;
