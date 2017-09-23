class Pasajero {
    constructor(nombrePasajero, apellidoPasajero, dniPasajero, asiento) {
        this.nombrePasajero = nombrePasajero;
        this.apellidoPasajero = apellidoPasajero;
        this.dniPasajero = dniPasajero;
        this.asiento = asiento;
    }
    listar() {
        let html = "";
        html += "Nombre: " + this.nombrePasajero + "<br>";
        html += "Apellido: " + this.apellidoPasajero + "<br>";
        html += "DNI: " + this.dniPasajero + "<br>";
        html += "Nro Asiento: " + this.asiento + "<br><hr>";
        
        return html;
    }
}

class AsientosReserva {
    constructor() {
        this.asientos = [];
        this.global = undefined;
    }
    addPassenger(pasajero) {
        this.asientos.push(pasajero);

        this.global.style.backgroundColor = "#66ff33";

    }
    buscar(dniBusqueda) {
        for (let i = 0; i < this.asientos.length; i++) {
            let datos = this.asientos[i];
            if (datos.dniPasajero == dniBusqueda) {

                document.getElementById("txtNombre").value = datos.nombrePasajero;
                document.getElementById("txtApellido").value = datos.apellidoPasajero;
                document.getElementById("txtDNI").value = datos.dniPasajero;

            }
        }
    }
    cancelar(dniBusqueda) {
        for (let i in this.asientos) {
            let datos = this.asientos[i];
            if (datos.dniPasajero == dniBusqueda) {
                this.asientos.splice(i, 1);
            }
        }
        this.global.style.backgroundColor = "#1CC7DA";

    }
    listar(element) {
        for (let i in this.asientos) {
            let datos = this.asientos[i];
            element.innerHTML += datos.listar();
        }

    }
    limpiar() {
        document.getElementById("txtNombre").value = "";
        document.getElementById("txtApellido").value = "";
        document.getElementById("txtDNI").value = "";
        document.getElementById("resultado").innerHTML = "";
    }
    seleccionar(celda) {

        let numAsiento = celda.textContent;
        let numero = parseInt(numAsiento);
        for (let i = 0; i < this.asientos.length; i++) {
            let datos = this.asientos[i];
            if (datos.asiento == numero) {
                document.getElementById("txtNombre").value = datos.nombrePasajero;
                document.getElementById("txtApellido").value = datos.apellidoPasajero;
                document.getElementById("txtDNI").value = datos.dniPasajero;
                document.getElementById("resultado").innerHTML = "";

            }
        }
        this.global = celda;
    }

}

let asientoReserva = new AsientosReserva();

$("#btnBuscar").click(function () {
    let dniBusqueda = $("#dniBusqueda").val();
    asientoReserva.buscar(dniBusqueda);
});

let resultado = document.getElementById("resultado");
$("#btnlistar").click(function () {
    asientoReserva.listar(resultado);
});

$("#btnReservar").click(function () {
    let nombre = $("#txtNombre").val();
    let apellido = $("#txtApellido").val();
    let DNI = $("#txtDNI").val();
    let asiento = parseInt(asientoReserva.global.textContent);
    console.log("asiento: " + asiento);
    asientoReserva.addPassenger(new Pasajero(nombre, apellido, DNI, asiento));
    alert("Asiento reservado");
    asientoReserva.limpiar();
});

$("#btnCancelar").click (function () {
    let DNI = $("#txtDNI").val();
    asientoReserva.cancelar(DNI);
    asientoReserva.limpiar();
    alert("Pasajero eliminado");
});

let celdas = document.getElementsByTagName('td');
for (let i = 0; i < celdas.length; i++) {
    celdas[i].onclick = function (event) {
        asientoReserva.seleccionar(event.target);
    }
}

