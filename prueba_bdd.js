import sql from 'mssql';

const config = {
    user: 'bdd_sql_2026', 
    password: 'Tec20IC26', 
    server: 'py-01-bdd-1s2026.database.windows.net', 
    database: 'PY01BDDIS2026',
    options: {
        encrypt: true, 
        trustServerCertificate: true 
    }
};

async function insertarEmpleado(nombre, salario) {
    try {
        let pool = await sql.connect(config);
        
        // Insertar los datos
        let result = await pool.request()
            .input('Nombre', sql.VarChar, nombre)
            .input('Salario', sql.Money, salario)
            .execute('sp_InsertarEmpleadoValidado');

        const respuesta = result.recordset[0];

        if (respuesta.Codigo === 1) {
            console.log("éxito " + respuesta.Mensaje);
        } else {
            console.error("error " + respuesta.Mensaje);
        }

    } catch (err) {
        console.error("Error de conexión:", err);
    }
}


insertarEmpleado('Fabián Gutiérrez', 650000);