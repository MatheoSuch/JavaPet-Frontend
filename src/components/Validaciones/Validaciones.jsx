const regExpTexto = /*/^[A-Za-z\s?]+$/;*//^[A-Za-zÑñÁáÉéÍíÓóÚúÜü ]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{1,8}$/;

const regExpTextoEsp=/^[\w\W ]+$/;
const regExpCategory = /^[A-Za-z\-\s?]+$/;
const regExpEmail =
  // /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const regExpFecha =
  /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/;
const regExpHora = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
const regExpTelefono = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/;

export const validateTexto = (field) => {
  if (regExpTexto.test(field) && field.trim() !== "") {
    return true;
  } else {
    return false;
  }
};

export const validatePass = (field) => {
  if (passwordRegex.test(field) && field.trim() !== "") {
    return true;
  } else {
    return false;
  }
};


export const validateTextoEsp = (field) => {
  if (regExpTextoEsp.test(field) && field.trim() !== "") {
    return true;
  } else {
    return false;
  }
};

export const validateEmail = (field) => {
  if (regExpEmail.test(field) && field.trim() !== "") {
    return true;
  } else {
    return false;
  }
};

export const validateFecha = (field) => {
  if (regExpFecha.test(field) && field.trim() !== "") {
    return true;
  } else {
    return false;
  }
};

export const validateHora = (field) => {
  if (regExpHora.test(field) && field.trim() !== "") {
    return true;
  } else {
    return false;
  }
};

export const validateTelefono = (field) => {
  if (regExpTelefono.test(field) && field.trim() !== "") {
    return true;
  } else {
    return false;
  }
};

export const validateCategoriaVet = (field) => {
  if (
    regExpCategory.test(field) &&
    field.trim() !== "" &&
    (field === "Figueroa Patricia" ||
      field === "Such Matheo" ||
      field === "De Cristobal Marcelo" )
      
  ) {
    return true;
  } else {
    return false;
  }
};


export const validateCategoriaMascota = (field) => {
    if (
      regExpCategory.test(field) &&
      field.trim() !== "") {
      return true;
    } else {
      return false;
    }
  };