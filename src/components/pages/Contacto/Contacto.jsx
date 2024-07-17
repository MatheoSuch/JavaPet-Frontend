import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../Contacto/Contacto.css'
import imgPerrito2 from "../../../assets/perrito3.jpg";


   
const Contacto = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        mensaje: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.nombre) tempErrors.nombre = "Nombre es requerido.";
        if (!formData.apellido) tempErrors.apellido = "Apellido es requerido.";
        if (!formData.correo) {
            tempErrors.correo = "Correo electrónico es requerido.";
        } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
            tempErrors.correo = "Correo electrónico no es válido.";
        }
        return tempErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log("Formulario enviado:", formData);
            alert("Formulario enviado con éxito!");
        }
    };

    return (
        <div className='contenedor'>
            <div className='contenido'>
                <div className='contenedorTitulos'>
                    <h1>Contáctanos</h1>
                    <h3>Escribe tu información y déjanos tu consulta! Te responderemos pronto</h3>
                </div>

                <Form id="mi-formulario" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3 row nombre-apellido-group">
                        <div className='col'>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                className='customLabel'
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder="Escriba su nombre"
                                isInvalid={!!errors.nombre}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nombre}
                            </Form.Control.Feedback>
                        </div>
                        <div className='col'>
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                className='customLabel'
                                type="text"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                                placeholder="Escriba su apellido"
                                isInvalid={!!errors.apellido}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.apellido}
                            </Form.Control.Feedback>
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Dirección de correo electrónico</Form.Label>
                        <Form.Control
                            className='customLabel'
                            type="email"
                            name="correo"
                            value={formData.correo}
                            onChange={handleChange}
                            placeholder="email@dominio.com"
                            isInvalid={!!errors.correo}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.correo}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicMessage">
                        <Form.Label>Tu mensaje</Form.Label>
                        <div>
                            <textarea
                                className='w-100'
                                id='areaTexto'
                                name="mensaje"
                                rows={10}
                                value={formData.mensaje}
                                onChange={handleChange}
                                placeholder="Escribe tu pregunta o mensaje"
                            />
                        </div>
                    </Form.Group>

                    <Button className='botonEnviar' variant="primary" type="submit">
                        Enviar
                    </Button>
                </Form>
            </div>

            <div className='imagen-container'>
                <img className='imagen' src={imgPerrito2} alt="Perrito" />
            </div>
        </div>
    );
};

export default Contacto;