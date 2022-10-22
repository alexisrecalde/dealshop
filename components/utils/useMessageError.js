const invalid = (label) => {
  return `Por favor ingrese un ${label} valido.`;
};

const max = (label, number) => {
  return `${label} es muy larga. Maximo de caracteres es ${number}.`;
};

const min = (label, number) => {
  return `Minimo de caracteres es ${number}.`;
};

const match = (label) => {
  return `${label} no coinciden.`;
};

const required = (label) => {
  return `Por favor ingrese ${label}.`;
};

const passwordValid = (label) => {
  return `${label} debe tener al menos una mayuscula, miniscula y un numero.`;
};

const onlyNumber = (label) => {
  return `Por favor ingrese un ${label} valido. Solo numeros.`;
};

const onlyNumberNumber = (label) => {
  return `Solo numeros.`;
};

export {
  max,
  required,
  invalid,
  onlyNumber,
  match,
  passwordValid,
  min,
  onlyNumberNumber
};
