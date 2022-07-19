//Funcion mostrar
function mostrar (resultado){
    console.log(resultado);
}

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

//Ingreso de datos - Dinero disponible
let caja = parseInt(prompt("Ingrese el monto disponible en caja: "));
let cobranzas = parseInt(prompt("Ingrese el monto de cobranzas que podrian ingresar: "));

//Ingreso de datos - Pagos que se deben realizar
let pagosSubcontratistas = parseInt(prompt("Ingrese el monto de pagos a subcontratistas: "));

//Alert - Pagos a personal propio
alert("El monto de pagos a personal propio es de: " + pagosPropios);

//Ingreso de datos - Otros pagos
let cantidadOtrosPagos = parseInt(prompt("Cantidad de otros pagos a ingresar: "));
let montoOtrosPagos;
let sumaOtrosPagos = 0;
for (let i = 0; i < cantidadOtrosPagos; i++) {
    montoOtrosPagos = parseInt(prompt("Ingrese el monto del pago: "));
    sumaOtrosPagos = parseInt(sumaOtrosPagos) + parseInt(montoOtrosPagos);
}

//Ingreso de datos - Valor del dolar
let valorDolar = parseInt(prompt("Ingrese el valor del dolar en el dia de la fecha: "));

//Calculo del monto en pesos disponible y del monto total de pagos que se deben realizar
let pesosDisponibles = caja + cobranzas;
let pagosTotal = pagosSubcontratistas + pagosPropios + sumaOtrosPagos;
mostrar("Pesos disponibles: " + pesosDisponibles);
mostrar("Pagos que se deben realizar: " + pagosTotal);

//Calculo del saldo luego de realizar los pagos
let saldo = pesosDisponibles - pagosTotal;

//Caso 1: el monto en pesos disponible es mayor que los pagos que se deben realizar
if (saldo >= 0){
    mostrar("Es posible realizar todos los pagos con el dinero disponible. Saldo disponible luego de realizar los pagos: " + saldo);
}

//Caso 2: el monto en pesos disponible es menor que los pagos que se deben realizar. Calculo de la cantidad de dolares que se deben cambiar.
else {
    mostrar("No es posible realizar todos los pagos con el dinero disponible, se deben cambiar dolares");
    let dolares = Math.ceil (saldo * (-1) / valorDolar);
    mostrar("Cantidad de dolares que se deben cambiar: " + dolares);
    mostrar("Saldo disponible luego de realizar los pagos: " + (pesosDisponibles + (dolares*valorDolar) - pagosTotal));
}