import { useState } from "react";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
import "../css/planes.css";

export const Planes = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_0q3qw0r", "template_e8gzu9x", e.target, "yABYGQbq-y8zvNKml")
      .then(
        (result) => {
          console.log(result.text);
          closeModal();
          Swal.fire({
            icon: "success",
            title: "Mensaje enviado correctamente",
            text: "Recibimos tu información. Te contactaremos pronto.",
          });
        },
        (error) => {
          console.log(error.text);
          Swal.fire({
            icon: "error",
            title: "Error al enviar el mensaje",
            text: "Hubo un problema al enviar tu mensaje. Inténtalo de nuevo más tarde.",
          });
        }
      );
  };

  return (
    <>
      <div className="banner">
        <img src="src/assets/img-planes/Planes/Banner.png" alt="Banner" style={{ width: "100%" }} />
        <div className="texto-y-boton-encima">
          <div className="texto-banner-izquierda">
            <h2 className="subtitulo">Nuestros mejores planes para tu peludito</h2>
            <h1 className="titulo-principal">Protege a tu mascota</h1>
            <h5 className="texto-descriptivo">¡Cuida a tu compañero peludo con nuestros planes de salud personalizados!</h5>
          </div>
          <button
            className="boton-ver-planes"
            onClick={() =>
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              })
            }
          >
            Ver planes
          </button>
        </div>
      </div>

      <h1 className="titulo-principal">Nuestros Planes de Salud</h1>

      <div className="plan-container">
        <div className="imagen-plan">
          <img src="src/assets/img-planes/Planes/Rectangle 4296.png" alt="Descripción de la imagen" style={{ width: "100%" }} />
        </div>

        <div className="contenido-plan plan-basico">
          <h1>Plan Básico</h1>
          <h3>
            Nuestro plan básico ofrece los servicios esenciales para mantener la salud de tu mascota al día. Incluye chequeos anuales, vacunas
            básicas, desparasitación, y descuentos en servicios adicionales.
            <br />
            <br />
            Beneficios:
            <br />
            <br />
            - Chequeo anual completo con nuestro veterinario.
            <br />
            - Vacunas básicas para la protección contra enfermedades comunes.
            <br />
            - Desparasitación anual para prevenir infestaciones de parásitos internos y externos.
            <br />
            - Descuentos en servicios adicionales como consultas de emergencia y análisis de laboratorio.
            <br />- Acceso a consejos y recomendaciones personalizadas para el cuidado de tu mascota.
          </h3>
          <img src="src/assets/img-planes/textura.png" alt="Imagen de fondo" style={{ width: "100%", height: "397px", marginTop: "-350px" }} />
          <div className="overlay">
            <h1>PRECIO: 12.520$ MENSUALES</h1>
            <button onClick={() => openModal("Plan Básico")}>Pedir más información</button>
          </div>
        </div>
      </div>

      <div className="beneficios">
        <div className="beneficio">
          <img src="src/assets/img-planes/icono patita.png" alt="Chequeo Anual" />
          <h4>Chequeo Anual</h4>
          <p>Completo con nuestro veterinario.</p>
        </div>
        <div className="beneficio">
          <img src="src/assets/img-planes/icono patita.png" alt="Vacunas Básicas" />
          <h4>Vacunas Básicas</h4>
          <p>Para la protección contra enfermedades comunes.</p>
        </div>
        <div className="beneficio">
          <img src="src/assets/img-planes/icono patita.png" alt="Desparasitación Anual" />
          <h4>Desparasitación Anual</h4>
          <p>Para prevenir infestaciones de parásitos.</p>
        </div>
        <div className="beneficio">
          <img src="src/assets/img-planes/icono patita.png" alt="Descuentos" />
          <h4>Descuentos</h4>
          <p>En servicios adicionales como consultas de emergencia.</p>
        </div>
      </div>

      <div className="plan-container">
        <div className="imagen-plan">
          <img src="src/assets/img-planes/Planes/Cacho-e-gato-juntos-no-chao-posando-pra-foto_3.webp" alt="Descripción de la imagen" style={{ width: "108.2%" }} />
        </div>

        <div className="contenido-plan plan-basico-2">
          <h1>Plan Básico Plus</h1>
          <h3>
            Nuestro plan básico plus ofrece los servicios esenciales para mantener la salud de tu mascota al día, con servicios adicionales.
            Incluye chequeos anuales, vacunas básicas, desparasitación, y descuentos en servicios adicionales.
            <br />
            <br />
            Beneficios:
            <br />
            <br />
            - Chequeo anual completo con nuestro veterinario.
            <br />
            - Vacunas básicas para la protección contra enfermedades comunes.
            <br />
            - Desparasitación anual para prevenir infestaciones de parásitos internos y externos.
            <br />
            - Descuentos en servicios adicionales como consultas de emergencia y análisis de laboratorio.
            <br />- Acceso a consejos y recomendaciones personalizadas para el cuidado de tu mascota.
          </h3>
          <img src="src/assets/img-planes/textura.png" alt="Imagen de fondo" style={{ width: "100%", height: "397px", marginTop: "-350px" }} />
          <div className="overlay">
            <h1>PRECIO: 20.520$ MENSUALES</h1>
            <button onClick={() => openModal("Plan Básico Plus")}>Pedir más información</button>
          </div>
        </div>
      </div>

      <div className="beneficios">
        <div className="beneficio">
          <img src="src/assets/img-planes/icono patita.png" alt="Chequeo Anual" />
          <h4>Chequeo Anual</h4>
          <p>Completo con nuestro veterinario.</p>
        </div>
        <div className="beneficio">
          <img src="src/assets/img-planes/icono patita.png" alt="Vacunas Básicas" />
          <h4>Vacunas Básicas</h4>
          <p>Para la protección contra enfermedades comunes.</p>
        </div>
        <div className="beneficio">
          <img src="src/assets/img-planes/icono patita.png" alt="Desparasitación Anual" />
          <h4>Desparasitación Anual</h4>
          <p>Para prevenir infestaciones de parásitos.</p>
        </div>
        <div className="beneficio">
          <img src="src/assets/img-planes/icono patita.png" alt="Descuentos" />
          <h4>Descuentos</h4>
          <p>En servicios adicionales como consultas de emergencia.</p>
        </div>
      </div>

      <div className="plan-container">
        <div className="imagen-plan">
          <img src="src/assets/img-planes/Planes/186654806-adorable-gato-y-perro-sobre-fondo-blanco-lindos-amigos.jpg" alt="Descripción de la imagen" style={{ width: "76%" }} />
        </div>

        <div className="contenido-plan plan-basico-3">
          <h1>Plan Básico Premium</h1>
          <h3>
            Nuestro plan básico premium ofrece los servicios esenciales para mantener la salud de tu mascota al día, con servicios adicionales y
            soporte premium. Incluye chequeos anuales, vacunas básicas, desparasitación, y descuentos en servicios adicionales.
            <br />
            <br />
            Beneficios:
            <br />
            <br />
            - Chequeo anual completo con nuestro veterinario.
            <br />
            - Vacunas básicas para la protección contra enfermedades comunes.
            <br />
            - Desparasitación anual para prevenir infestaciones de parásitos internos y externos.
            <br />
            - Descuentos en servicios adicionales como consultas de emergencia y análisis de laboratorio.
            <br />- Acceso a consejos y recomendaciones personalizadas para el cuidado de tu mascota.
          </h3>
          <img src="src/assets/img-planes/textura.png" alt="Imagen de fondo" style={{ width: "100%", height: "397px", marginTop: "-350px" }} />
          <div className="overlay">
            <h1>PRECIO: 20.520$ MENSUALES</h1>
            <button onClick={() => openModal("Plan Básico Premium")}>Pedir más información</button>
          </div>
        </div>
      </div>

      <div className="beneficios">
        <div className="beneficio">
          <img src="src/assets/img-planes/icono patita.png" alt="Chequeo Anual" />
          <h4>Chequeo Anual</h4>
          <p>Completo con nuestro veterinario.</p>
        </div>
        <div className="beneficio">
          <img src="src/assets/img-planes/icono patita.png" alt="Vacunas Básicas" />
          <h4>Vacunas Básicas</h4>
          <p>Para la protección contra enfermedades comunes.</p>
        </div>
        <div className="beneficio">
          <img src="src/assets/img-planes/icono patita.png" alt="Desparasitación Anual" />
          <h4>Desparasitación Anual</h4>
          <p>Para prevenir infestaciones de parásitos.</p>
        </div>
        <div className="beneficio">
          <img src="src/assets/img-planes/icono patita.png" alt="Descuentos" />
          <h4>Descuentos</h4>
          <p>En servicios adicionales como consultas de emergencia.</p>
        </div>
      </div>

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Formulario de Consulta - {selectedPlan}</h2>
            <form onSubmit={handleFormSubmit}>
              <label>
                Nombre:
                <input type="text" name="name" required />
              </label>
              <label>
                Email:
                <input type="email" name="email" required />
              </label>
              <label>
                Mensaje:
                <textarea name="message" required></textarea>
              </label>
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};