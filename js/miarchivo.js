//Funcion mostrar
function mostrar (resultado){
    console.log(resultado);
}

//Ingreso de datos - Dinero disponible
let caja = parseInt(prompt("Ingrese el monto disponible en caja: "));
let cobranzas = parseInt(prompt("Ingrese el monto de cobranzas que podrian ingresar: "));


//Ingreso de datos - Pagos que se deben realizar
let pagosSubcontratistas = parseInt(prompt("Ingrese el monto de pagos a subcontratistas: "));
let pagosPropios = parseInt(prompt("Ingrese el monto de pagos a personal propio: "));

let num = parseInt (prompt("Cantidad de otros pagos a ingresar: "));
let pagosOtros;
let totalPagosOtros = 0;
for (let i = 0; i < num; i++) {
    pagosOtros = parseInt(prompt("Ingrese el pago: "));
    totalPagosOtros = parseInt(totalPagosOtros) + parseInt(pagosOtros);
}

//Ingreso de datos - Valor del dolar
let valorDolar = parseInt(prompt("Ingrese el valor del dolar en el dia de la fecha: "));

//Calculo del monto en pesos disponible y del monto total de pagos que se deben realizar
let pesosDisponibles = caja + cobranzas;
let pagosTotal = pagosSubcontratistas + pagosPropios + totalPagosOtros;
mostrar(pesosDisponibles);
mostrar(pagosTotal);

//Calculo del saldo luego de realizar los pagos
let saldo = pesosDisponibles - pagosTotal;

//Caso 1: el monto en pesos disponible es mayor que los pagos que se deben realizar
if (saldo >= 0){
    mostrar("Es posible realizar todos los pagos con el dinero disponible. Saldo disponible luego de realizar los pagos:");
    mostrar(saldo);
}

//Caso 2: el monto en pesos disponible es menor que los pagos que se deben realizar. Calculo de la cantidad de dolares que se deben cambiar.
else {
    mostrar("No es posible realizar todos los pagos con el dinero disponible. Se deben cambiar dolares.");
    let dolares = Math.ceil (saldo * (-1) / valorDolar);
    mostrar(dolares);
    mostrar("Saldo disponible luego de realizar los pagos:");
    mostrar(pesosDisponibles + (dolares*valorDolar) - pagosTotal);
}