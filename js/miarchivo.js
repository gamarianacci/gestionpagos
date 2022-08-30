//Funciones
function validarDatos(a, b) {
    if (isNaN(a) || isNaN(b)) {
        swal("Error!", "Por favor completá todos los campos para visualizar los resultados correctamente.", "error");
    }
}

function validarDato(c) {
    if (isNaN(c)) {
        swal("Error!", "Por favor completá todos los campos para visualizar los resultados correctamente.", "error");
    }
}

function capturarInput(elementId){
    return parseInt(document.getElementById(elementId).value);
}

function suma2(a,b){
    return a + b;
}

function resta2(a,b){
    return a - b;
}

function suma3(a,b,c){
    return a + b + c;
}

//Formato Moneda
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
    constructor(nombre, dni, edad, rango, jornal) {
        this.nombre = nombre;
        this.dni = dni;
        this.edad = edad;
        this.rango = rango;
        this.jornal = jornal;
    }
}

//Creación de objetos
const obrero1 = new Obrero("Juan Perez", 38490567, 28, "Ayudante", 2500);
const obrero2 = new Obrero("Roberto Guzman", 15097432, 55, "Oficial", 4000);
const obrero3 = new Obrero("Manuel Gonzalez", 20324432, 40, "Medio Oficial", 3000);
const obrero4 = new Obrero("Roman Martinez", 36499568, 30, "Ayudante", 2500);
const obrero5 = new Obrero("Roberto Heredia", 40327432, 26, "Medio Oficial", 3000);

//Creación del Array "nominaPersonalPropio" con objetos
const nominaPersonalPropio = [obrero1, obrero2, obrero3, obrero4, obrero5];

//Creación del Array "sueldos" con los jornales de cada obrero de la nómina
const sueldos = nominaPersonalPropio.map((el) => el.jornal);

//Determinación del monto total de pagos a personal propio por semana
let pagosPropios = 0;
for (let i = 0; i < sueldos.length; i++) {
    pagosPropios = pagosPropios + (sueldos[i] * 5);
}

//Botón ejecutar
let botonEjecutar = document.getElementById('ejecutar');
botonEjecutar.onclick = function () {

    //Ingreso de datos - Caja

    let caja = capturarInput('montoCaja');

    //Uso del local storage en caso de no ingresar un valor en monto de caja
    if (isNaN(caja)) {
        if (localStorage.getItem("saldo") === null) {
            caja = 0;
        } else {
            caja = document.getElementById('montoCaja').value = parseInt(localStorage.getItem("saldo"));
        }
    }    

    //Ingreso de datos - Cobranzas
    let cobranzas = capturarInput('montoCobranzas');

    //Ingreso de datos - Pagos que se deben realizar
    let pagosSubcontratistas = capturarInput('montoSubcontratistas');

    //Ingreso de datos - Otros pagos y validación de dato
    let cantidadOtrosPagos = capturarInput('otrosPagos');
    validarDato(cantidadOtrosPagos);

    let montoOtrosPagos;
    let sumaOtrosPagos = 0;
    for (let i = 0; i < cantidadOtrosPagos; i++) {
        let montoOtrosPagos = capturarInput('montoOtrosPagos');
        sumaOtrosPagos = suma2(sumaOtrosPagos,montoOtrosPagos);
    }

    //Cálculo del monto en pesos disponible y del monto total de pagos que se deben realizar
    let pesosDisponibles = suma2(caja,cobranzas);
    let pagosTotal = suma3(pagosSubcontratistas,pagosPropios,sumaOtrosPagos);

    //Validación de datos para asegurar que se ingresen todos los datos
    validarDatos(pesosDisponibles, pagosTotal);

    //Resultados
    let resultados = document.getElementById("divResultados");
    resultados.innerHTML = `<h2>Resultados</h2>
                            <hr class = "divider"/>
                            <p> El monto total de pagos a peronsal propio es de: ${formatoMonedaArg.format(pagosPropios)}</p>
                            <p> Pesos disponibles (disponible en caja + cobranzas): ${formatoMonedaArg.format(pesosDisponibles)}</p>
                            <p> Pagos que se deben realizar: ${formatoMonedaArg.format(pagosTotal)}</p>`;

    //Cálculo del saldo luego de realizar los pagos
    let saldo = resta2(pesosDisponibles,pagosTotal);

    //Caso 1: el monto en pesos disponible es mayor que los pagos que se deben realizar
    if (saldo >= 0) {
        let resultados2 = document.getElementById("divResultados2");
        resultados2.innerHTML = `<p> Es posible realizar todos los pagos con el dinero disponible. Saldo disponible luego de realizar los pagos: ${formatoMonedaArg.format(saldo)}</p>`;
    }

    //Caso 2: el monto en pesos disponible es menor que los pagos que se deben realizar. Cálculo de la cantidad de dólares que se deben cambiar.
    //Se utiliza una API para traer el valor del dólar y se guarda en el local storage el saldo después de realizar los pagos.
    else {
        buscarValorDolar = () => {
            fetch('https://api.bluelytics.com.ar/v2/latest')
                .then((response) => response.json())
                .then((data) => {
                    valorDolar = (parseInt(data.blue["value_avg"]));
                    let dolares = Math.ceil(saldo * (-1) / valorDolar);
                    let saldoDespuesPagos = (pesosDisponibles + (dolares * valorDolar) - pagosTotal);
                    let resultados3 = document.getElementById("divResultados3");
                    resultados3.innerHTML = `<p> No es posible realizar todos los pagos con el dinero disponible, se deben cambiar dólares.</p>
                                            <p> Valor del dólar: ${formatoMonedaUsa.format(valorDolar)}</p>
                                            <p> Cantidad de dólares que se deben cambiar: ${formatoMonedaUsa.format(dolares)}</p>
                                            <p> Saldo disponible luego de realizar los pagos: ${formatoMonedaArg.format(saldoDespuesPagos)}</p>`;
                    saldoJSON = localStorage.setItem("saldo", saldoDespuesPagos);
                })
        }
        buscarValorDolar();
    }
}