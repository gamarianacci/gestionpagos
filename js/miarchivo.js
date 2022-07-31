const formatoMonedaArg = new Intl.NumberFormat('es-AR', {
    currency: 'ARS', 
    style: 'currency',
    minimumFractionDigits: "0",
});

const formatoMonedaUsa = new Intl.NumberFormat('es-AR', {
    currency: 'USD', 
    style: 'currency',
    minimumFractionDigits: "0",
});

//Clase obrero
class Obrero {
    constructor (nombre, dni, edad, rango, jornal) {
        this.nombre = nombre;
        this.dni = dni;
        this.edad = edad;
        this.rango = rango;
        this.jornal = jornal;
    }
}

//Creacion de objetos - Estos saldran de una base de datos
const obrero1 = new Obrero ("Juan Perez", 38490567, 28, "Ayudante", 2500);
const obrero2 = new Obrero ("Roberto Guzman", 15097432, 55, "Oficial", 4000);
const obrero3 = new Obrero ("Manuel Gonzalez", 20324432, 40, "Medio Oficial", 3000);
const obrero4 = new Obrero ("Roman Martinez", 36499568, 30, "Ayudante", 2500);
const obrero5 = new Obrero ("Roberto Heredia", 40327432, 26, "Medio Oficial", 3000);

//Creacion del Array "nominaPersonalPropio" con objetos de base de datos
const nominaPersonalPropio = [obrero1, obrero2, obrero3, obrero4, obrero5];

//Creacion del Array "sueldos" con los jornales de cada obrero de la nomina
const sueldos = nominaPersonalPropio.map((el) => el.jornal);

//Determinacion del monto total de pagos a personal propio por semana
let pagosPropios = 0;
for (let i = 0; i < sueldos.length; i++) {
    pagosPropios = pagosPropios + (sueldos[i] * 5);
}

let botonEjecutar = document.getElementById('ejecutar');
botonEjecutar.onclick = function() {

//Ingreso de datos - Dinero disponible
let caja = parseInt(document.getElementById('montoCaja').value);

let cobranzas = parseInt(document.getElementById('montoCobranzas').value);

//Ingreso de datos - Pagos que se deben realizar
let pagosSubcontratistas = parseInt(document.getElementById('montoSubcontratistas').value);

//Ingreso de datos - Otros pagos
let cantidadOtrosPagos = parseInt(document.getElementById('otrosPagos').value);

let montoOtrosPagos;
let sumaOtrosPagos = 0;
for (let i = 0; i < cantidadOtrosPagos; i++) {
    let montoOtrosPagos = parseInt(document.getElementById('montoOtrosPagos').value);
    sumaOtrosPagos = sumaOtrosPagos + montoOtrosPagos;
}

//Ingreso de datos - Valor del dolar
let valorDolar = parseInt(document.getElementById('montoValorDolar').value);

//Calculo del monto en pesos disponible y del monto total de pagos que se deben realizar
let pesosDisponibles = caja + cobranzas;
let pagosTotal = pagosSubcontratistas + pagosPropios + sumaOtrosPagos;

let resultados = document.getElementById("divResultados");
resultados.innerHTML = `<h2>Resultados</h2>
                        <hr class = "divider"/>
                        <p> El monto de pagos a peronsal propio es de: ${formatoMonedaArg.format(pagosPropios)}</p>
                        <p> Pesos disponibles: ${formatoMonedaArg.format(pesosDisponibles)}</p>
                        <p> Pagos que se deben realizar: ${formatoMonedaArg.format(pagosTotal)}</p>`;

//Calculo del saldo luego de realizar los pagos
let saldo = pesosDisponibles - pagosTotal;

//Caso 1: el monto en pesos disponible es mayor que los pagos que se deben realizar
if (saldo >= 0){
    let resultados2 = document.getElementById("divResultados2");
    resultados2.innerHTML = `<p> Es posible realizar todos los pagos con el dinero disponible. Saldo disponible luego de realizar los pagos: ${formatoMonedaArg.format(saldo)}</p>`;
}

//Caso 2: el monto en pesos disponible es menor que los pagos que se deben realizar. Calculo de la cantidad de dolares que se deben cambiar.
else {
    let dolares = Math.ceil (saldo * (-1) / valorDolar);
    let saldoDespuesPagos = (pesosDisponibles + (dolares*valorDolar) - pagosTotal);
    let resultados3 = document.getElementById("divResultados3");
    resultados3.innerHTML = `<p> No es posible realizar todos los pagos con el dinero disponible, se deben cambiar dolares.</p>
                            <p> Cantidad de dolares que se deben cambiar: ${formatoMonedaUsa.format(dolares)}</p>
                            <p> Saldo disponible luego de realizar los pagos: ${formatoMonedaArg.format(saldoDespuesPagos)}</p>`;
}
}