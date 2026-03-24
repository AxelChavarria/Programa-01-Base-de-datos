


// llenado de tabla apenas carga la página
document.addEventListener("DOMContentLoaded",() => {
    cargarDatos();
});

//carga los datos desde la base
async function cargarDatos() {


    console.log("Intentando cargar datos...");
    try {
        const res = await fetch("http://localhost:3000/api/empleados");
        const data = await res.json();
        let tabla = document.querySelector("#empleados tbody");
        tabla.innerHTML = "";

        data.forEach(emp => {
            tabla.innerHTML += `
                <tr>
                    <td>${emp.id}</td>
                    <td>${emp.Nombre}</td>
                    <td>${emp.Salario}</td>
                </tr>`;
        });
    } catch (error) {
        console.error("Error cargando tabla:", error);
    }
}


//obtiene los datos del formulario
function obtenerDatos() {
    console.log("obtiene")
    return {
        nombre: document.getElementById("nombre").value.trim(),
        salario: document.getElementById("salario").value.trim()
    };
}

// Validación
function validarDatos({ nombre, salario }) {
    console.log("valida")
    if (nombre === "" || salario === "") {
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


async function insertarEmpleado(datos) {
    try {
        const res = await fetch("http://localhost:3000/api/empleados", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });
        const respuesta = await res.json();

        if (respuesta.Codigo === 1) {
            alert("✅ " + respuesta.Mensaje);
            cargarDatos(); // Refresca el Grid
            document.getElementById("formulario").reset();
        } else {
            alert("❌ " + respuesta.Mensaje);
        }
    } catch (err) {
        console.error("Error al insertar:", err);
    }
}


const form = document.getElementById("formulario");

document.getElementById("formulario").addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const salario = document.getElementById("salario").value.trim();
    
    // Aquí podrías llamar a tu función validarDatos({nombre, salario})
    if(validarDatos({nombre,salario})){
    await insertarEmpleado({ nombre, salario });
}
});


