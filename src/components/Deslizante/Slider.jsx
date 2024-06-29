import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import sliderImage1 from '../../assets/alimentogato1.png';
import sliderImage2 from '../../assets/alimentogato2.jpg';
import sliderImage3 from '../../assets/alimentogato3.jpg';
import sliderImage4 from '../../assets/alimentogato4.jpg';
import sliderImage5 from '../../assets/alimentogato5.jpg';
import sliderImage6 from '../../assets/alimentoperro1.jpg';
import sliderImage7 from '../../assets/alimentoperro2.jpg';
import sliderImage8 from '../../assets/alimentoperro3.jpg';
import sliderImage9 from '../../assets/alimentoperro4.jpg';
import "./Slider.css"


const Slider = () => {
  const responsive = {
    largeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className="slider-container"style={{ marginTop: '100px' }}>
    <h2 className="slider-title">Nuestros Productos</h2>
    <Carousel
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={false}
      itemClass="carousel-item-padding-40-px custom-carousel-item"
      containerClass="custom-carousel-container"
      className="custom-carousel-container"
    >
      
      <div className="d-flex justify-content-center align-items-center custom-carousel-item" style={{ height: '100%' }}>
        <img className="d-block w-100" src={sliderImage1} alt="First slide" />
      </div>
      <div className="d-flex justify-content-center align-items-center custom-carousel-item" style={{ height: '100%' }}>
        <img className="d-block w-100" src={sliderImage2} alt="Second slide" />
      </div>
      <div className="d-flex justify-content-center align-items-center custom-carousel-item" style={{ height: '100%' }}>
        <img className="d-block w-100" src={sliderImage3} alt="Third slide" />
      </div>
      <div className="d-flex justify-content-center align-items-center custom-carousel-item" style={{ height: '100%' }}>
        <img className="d-block w-100" src={sliderImage4} alt="Third slide" />
      </div>

      <div className="d-flex justify-content-center align-items-center custom-carousel-item" style={{ height: '100%' }}>
        <img className="d-block w-100" src={sliderImage5} alt="Third slide" />
      </div>
      <div className="d-flex justify-content-center align-items-center custom-carousel-item" style={{ height: '100%' }}>
        <img className="d-block w-100" src={sliderImage6} alt="Third slide" />
      </div>

      <div className="d-flex justify-content-center align-items-center custom-carousel-item" style={{ height: '100%' }}>
        <img className="d-block w-100" src={sliderImage7} alt="Third slide" />
      </div>
      <div className="d-flex justify-content-center align-items-center custom-carousel-item" style={{ height: '100%' }}>
        <img className="d-block w-100" src={sliderImage8} alt="Third slide" />
      </div>
      <div className="d-flex justify-content-center align-items-center custom-carousel-item" style={{ height: '100%' }}>
        <img className="d-block w-100" src={sliderImage9} alt="Third slide" />
      </div>


    </Carousel>
    </div>
  );
};

export default Slider;
