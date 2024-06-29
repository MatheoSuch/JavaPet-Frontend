
// Carousel.jsx
import React from 'react';
import '../Deslizante/Deslizante.css'; // Asegúrate de importar correctamente el componente Slider
import '../Carrusel/Carrusel.css'; // Si tienes un archivo de estilos para Carousel, asegúrate de importarlo aquí

const Carousel = () => {
  return (
    <div className="slider-container">
      <Slider /> {/* Utiliza el componente Slider aquí */}
    </div>
  );
}

export default Carousel;

