//Exportar las expresiones regulares

//Regex para validar el nombre (solo letras y espacios)
export const nameRegex = /^[a-zA-Z\s]+$/;

//Regex para validar el resultado ("1-0", "0-1" o "1/2-1/2")
export const resultRegex = /^(1-0|0-1|1\/2-1\/2)$/;

//Regex para validar la fecha simple (formato "YYYY-MM-DD")
export const simpleDateRegex = /^\d{4}-\d{2}-\d{2}$/;
