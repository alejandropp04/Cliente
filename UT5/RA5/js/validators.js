// validators.js
import { nameRegex, resultRegex, simpleDateRegex } from './regex.js';

export function validarNombre(nombre) {
    return nameRegex.test(nombre.trim());
}

export function nombresDistintos(nombre1, nombre2) {
    return nombre1.trim().toLowerCase() !== nombre2.trim().toLowerCase();
}

export function validarFecha(fecha) {
    if (!simpleDateRegex.test(fecha)) return false;
    const fechaInput = new Date(fecha);
    const hoy = new Date();
    return fechaInput <= hoy;
}

export function validarResultado(resultado) {
    return resultRegex.test(resultado);
}