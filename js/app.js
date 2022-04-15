const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const formulario = document.querySelector('#buscador');
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 10;

// Objeto de busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
};

document.addEventListener('DOMContentLoaded', () => {
    resetForm();
    mostrarAutos(autos);

    // llena el select de years
    llenarSelect();
})

// Listeners para los campos selects
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
})
year.addEventListener('change', e => {
    datosBusqueda.year = e.target.value;
    filtrarAuto();
})
minimo.addEventListener('change', e => {
    datosBusqueda.minimo = parseInt(e.target.value);
    filtrarAuto();
})
maximo.addEventListener('change', e => {
    datosBusqueda.maximo = parseInt(e.target.value);
    filtrarAuto();
})
puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
})
transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
})
color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    // console.log(datosBusqueda);
    filtrarAuto();
})


function resetForm() {
    formulario.reset();
}

function mostrarAutos(autos){
    limpiarHTML();  // elimina el HTML previo
    autos.forEach( auto => {
        const { marca, modelo, year, precio, puertas, color, transmision } = auto;
        const autoHTML = document.createElement('p');
        autoHTML.textContent = `
            ${marca}
            ${modelo} - 
            ${year} - 
             Price: ${precio} - 
             Doors: ${puertas} - 
            ${color} - 
            ${transmision}
            `;

        // insertar en el HTML
        resultado.appendChild(autoHTML);
    });
}

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function llenarSelect() {
    for (let i = max; i >= min; i--) {
        // console.log(i);
        const op = document.createElement('option');
        op.value = i;
        op.textContent = i;
        year.appendChild(op);   // agrega year al select
    }
}

function filtrarAuto() {
    // Array method
    const result = autos.filter( filtrarMarca ).filter ( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( filtrarPuertas ).filter( filtrarGear ).filter( filtrarColor );
     // console.log(result);
    if (result.length) {
        mostrarAutos(result);
    } else {
        noResultado();
    }
}

function noResultado() {
    limpiarHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No matches have been found';

    resultado.appendChild(noResultado);
}
   

// al ser High order function, el parametro se pasa automaticament desde autos.filter
function filtrarMarca(auto) {
    if (datosBusqueda.marca ) {
        return auto.marca === datosBusqueda.marca;
    }
    return auto;
}
function filtrarYear(auto) {
    const { year } = datosBusqueda;
    if(year){
        return auto.year === parseInt(year);
    }
    return auto;
}
function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda;
    if (minimo) {
        return auto.precio >= minimo;
    }
    return auto;
}
function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda;
    if (maximo ) {
        return auto.precio <= maximo;
    }
    return auto;
}
function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda;
    if (puertas) {
        return auto.puertas === puertas;
    }
    return auto;
}
function filtrarGear(auto) {
    const { transmision } = datosBusqueda;
    if ( transmision ) {
        return auto.transmision == transmision;
    }
    return auto;
}
function filtrarColor(auto) {
    const { color } = datosBusqueda;
    if (color ) {
        return auto.color == color;
    }
    return auto;
}