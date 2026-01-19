//importar validators, data y ui
import { validarNombre, nombresDistintos, validarFecha, validarResultado } from './validators.js';
import { anyadirPartida, vaciarPartidas } from './data.js';
import { actualizarResumen } from './ui.js';

export function initForm(){
    console.log("formController init");
    const form = document.getElementById('form-partida');
    const blancas = document.getElementById('blancas');
    const negras = document.getElementById('negras');
    const fecha = document.getElementById('fecha');
    const resultado = document.getElementById('resultado');

    //Obtener los errores
    const errBlancas = document.getElementById('err-blancas');
    const errNegras = document.getElementById('err-negras');
    const errFecha = document.getElementById('err-fecha');
    const errResultado = document.getElementById('err-resultado');
    const ok = document.getElementById('ok');

    actualizarResumen();

    //Validacion en tiempo real
    blancas.addEventListener('input', () => {
        errBlancas.textContent = validarNombre(blancas.value) ? '' : 'Nombre inválido.'
    });

    negras.addEventListener('input', () => {
        errNegras.textContent = validarNombre(negras.value) ? '' : 'Nombre inválido.'
    });

    fecha.addEventListener('input', () => {
        errFecha.textContent = validarFecha(fecha.value) ? '' : 'Fecha inválida.'
    })
    resultado.addEventListener('input', () => {
        errResultado.textContent = validarResultado(resultado.value) ? '' : 'Resultado inválido.'
    })

    //submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let valid = true;

        //Validar nombres
        if(!validarNombre(blancas.value)){
            errBlancas.textContent = 'Nombre inválido.';
            valid = false;
        } else {
            errBlancas.textContent = '';
        }

        if(!validarNombre(negras.value)){
            errNegras.textContent = 'Nombre inválido.';
            valid = false;
        } else {
            errNegras.textContent = '';
        }

        //Validar que los nombres sean distintos
        if(!nombresDistintos(blancas.value, negras.value)){
            errBlancas.textContent = 'Los nombres deben ser distintos.';
            errNegras.textContent = 'Los nombres deben ser distintos.';
            valid = false;
        }

        //Validar fecha
        if(!validarFecha(fecha.value)){
            errFecha.textContent = 'Fecha inválida.';
            valid = false;
        } else {
            errFecha.textContent = '';
        }

        //Validar resultado
        if(!validarResultado(resultado.value)){
            errResultado.textContent = 'Resultado inválido.';
            valid = false;
        } else {
            errResultado.textContent = '';
        }

        //Si todo es válido, añadir la partida
        if(valid){
            const partida = {
                blancas: blancas.value.trim(),
                negras: negras.value.trim(),
                fecha: fecha.value,
                resultado: resultado.value
            };
            anyadirPartida(partida);
            actualizarResumen();
            ok.textContent = 'Partida añadida correctamente.';
            form.reset();
        }
    });

    //Boton reset
    const resetBtn = document.getElementById('reset-btn');
    if(resetBtn){
        resetBtn.addEventListener('click', () => {
            vaciarPartidas();
            actualizarResumen();
            ok.textContent = 'Todas las partidas han sido eliminadas.';
        });
    }
}