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
    mostrarAutos();

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
    datosBusqueda.minimo = e.target.value;

})
maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;

})
puertas.addEventListener('change', e => {
    datosBusqueda.puertas = e.target.value;

})
transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;

})
color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    // console.log(datosBusqueda);
})


function resetForm() {
    formulario.reset();
}

function mostrarAutos(){
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
    const result = autos.filter( filtrarMarca ).filter ( filtrarYear );
    console.log(result);
}

// al ser High order function, el parametro de pasa automaticament desde autos.filter
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