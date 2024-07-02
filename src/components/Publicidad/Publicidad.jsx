import React from 'react';
import './Publicidad.css';
import imagen1 from '../../assets/marca1.png';
import imagen2 from '../../assets/marca3.jpg';
import imagen3 from '../../assets/marca2.png';
import imagen4 from '../../assets/marca4.png';
import imagen5 from '../../assets/marca5.png';
import imagen6 from '../../assets/marca6.png';

const Publicidad = () => {
  const images = [imagen1, imagen2, imagen3, imagen4, imagen5, imagen6];

  return (
    <div className="publicidad-container" style={{ marginTop: '100px' }}>
      <h2 className="publicidad-title">Marcas con las que trabajamos </h2>
      <div className="container mt-5">
        <div className="row d-flex justify-content-center align-items-center">
          {images.map((image, index) => (
            <div key={index} className="col-4 col-md-3 d-flex justify-content-center align-items-center mb-4">
              <img src={image} alt={`Publicidad ${index + 1}`} className="img-fluid publicidad-image" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Publicidad;

