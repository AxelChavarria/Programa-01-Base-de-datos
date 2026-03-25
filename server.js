import sql from 'mssql';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

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


app.get('/api/empleados', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT id, Nombre, Salario FROM dbo.Empleado ORDER BY Salario DESC');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.post('/api/empleados', async (req, res) => {
    try {
        const { nombre, salario } = req.body;
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('inNombre', sql.VarChar, nombre)
            .input('inSalario', sql.Money, salario)
            .execute('sp_InsertarEmpleadoValidado');

        res.json(result.recordset[0]); // Devuelve { Codigo, Mensaje }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
