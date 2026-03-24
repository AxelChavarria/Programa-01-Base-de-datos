// llenado de tabla apenas carga la página
document.addEventListener("DOMContentLoaded",() => {
    cargarDatos();
});

//carga los datos desde la base
function cargarDatos() {
    fetch("http:///dbo.Empleado") **Ruta de la base**
        .then(res => res.json())
        .then(data => {
            let tabla = document.querySelector("#empleados tbody");
            tabla.innerHTML = "";

            data.forEach(usuario => {
                let fila = `
                    <tr>
                        <td>${dbo.Empleado.id}</td>
                        <td>${dbo.Empleado.nombre}</td>
                        <td>${dbo.Empleado.salario}</td>
                    </tr>
                `;
                tabla.innerHTML += fila;
            });
        })
        .catch(error => console.error("Error:", error));
}



//obtiene los datos del formulario
function obtenerDatos() {

    return {
        nombre: document.getElementById("nombre").value.trim(),
        edad: document.getElementById("edad").value.trim()
    };
}

// Validación
function validarDatos({ nombre, edad }) {
    if (nombre === "" || edad === "") {
        alert("Todos los campos son obligatorios");
        return false;
    }

    if (nombre.length < 3) {
        alert("El nombre debe tener al menos 3 caracteres");
        return false;
    }

    if (salario <= 0) {
        alert("Salario inválido");
        return false;
    }

    return true;
}

// Limpiar formulario
function limpiarFormulario() {
    document.getElementById("formulario").reset();
}

// Manejar éxito
function manejarRespuesta(respuesta) {
    alert("Usuario guardado correctamente");
    limpiarFormulario();

}

// Manejar error
function manejarError(error) {
    console.error("Error:", error);
    alert("Error al guardar");
}

// Enviar a la base
function insertarEmpleado(datos) {
    fetch("http:///dbo.Empleado", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    })
    .then(res => res.json())
    .then(respuesta => manejarRespuesta(respuesta))
    .catch(error => manejarError(error));
}


const form = document.getElementById("formulario");

form.addEventListener("submit", () -> {
	alert("Funciona");
	if(!validarDatos(obtenerDatos)) return;
	insertarEmpleado;
});



