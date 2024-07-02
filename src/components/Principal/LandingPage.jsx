// LandingPage.jsx
import React from "react";
import Bienvenida from "../Bienvenida/Bienvenida";
import Servicios from "../Servicios/Servicios";
import Slider from "../Deslizante/Slider"; 
import Publicidad  from "../Publicidad/Publicidad";
import Clima from '../Clima/Clima';  // Ajusta la ruta según sea necesario
import {Planes} from "../Planes/Planes";
import {Veterinario} from "../Veterinario/Veterinario";
import {Testimonios} from "../Testimonios/Testimonios";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer"
// import { Login } from "../Login/Login";
// import Login from '../Login/Login'; // Asegúrate de que la ruta sea correcta

const LandingPage = () => {
    return (
        <div className="contenedor-padre">
            {/* <Login /> */}

            <Navbar />
            <Bienvenida/>
            <Servicios/>
            <Slider />
            <br />
            <br />
            <br />
            <Publicidad/>
            <br />
            <br />
            <br />
            <br />
            <Planes />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Veterinario />
            <br />
            <br />
            <Testimonios />
            <br />
            <br />
            <br />
            <br />
            
            <Clima />
            <Footer /> 
           
            
        </div>
    );
};

export default LandingPage;



