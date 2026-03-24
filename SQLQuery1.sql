CREATE TABLE dbo.Empleado  
(  
id INT IDENTITY (1, 1) PRIMARY KEY   
, Nombre VARCHAR(128) NOT NULL 
, Salario MONEY NOT NULL 
); 

INSERT INTO dbo.Empleado (Nombre, Salario) 
VALUES 
('Juan Perez', 200000.00),
('Maria Rodriguez', 350000.00),
('Carlos Alfaro', 420000.00),
('Ana Segura', 280000.00),
('Luis Chavarria', 500000.00),
('Laura Mendez', 310000.00),
('Diego Solano', 450000.00),
('Elena Rojas', 220000.00),
('Jose Castillo', 380000.00),
('Sofia Vargas', 290000.00),
('Andres Morales', 415000.00),
('Lucia Jimenez', 330000.00),
('Gabriel Navarro', 275000.00),
('Valeria Campos', 490000.00),
('Ricardo Soto', 360000.00),
('Paola Quesada', 320000.00),
('Fernando Castro', 440000.00),
('Daniela Blanco', 210000.00),
('Oscar Ruiz', 395000.00),
('Marta Fonseca', 305000.00),
('Felipe Herrera', 260000.00),
('Jimena Ortiz', 470000.00),
('Roberto Salazar', 340000.00),
('Camila Duarte', 230000.00),
('Adrian Vega', 405000.00),
('Natalia Silva', 315000.00),
('Hugo Marin', 250000.00),
('Beatriz Nu�ez', 480000.00),
('Sebastian Cordero', 370000.00),
('Monica Brenes', 335000.00),
('Julian Araya', 295000.00),
('Raquel Villalobos', 425000.00),
('Ignacio Calvo', 240000.00),
('Silvia Monge', 460000.00),
('Esteban Garita', 355000.00),
('Karla Porras', 285000.00),
('Manuel Gamboa', 435000.00),
('Victoria Delgado', 325000.00),
('Santiago Uma�a', 265000.00),
('Patricia Fallas', 495000.00);
GO

CREATE PROCEDURE sp_InsertarEmpleadoValidado
    @Nombre VARCHAR(128),
    @Salario MONEY
AS
BEGIN
    -- Validamos si existe el empleado
    IF EXISTS (SELECT 1 FROM dbo.Empleado WHERE Nombre = @Nombre)
    BEGIN
        -- Retornamos el error con c�digo 0, que es, que ya existe el empleado
        SELECT 0 AS Codigo, 'Nombre de Empleado ya existe.' AS Mensaje;
    END


    ELSE
    BEGIN
        -- Si no existe, se inserta
        INSERT INTO dbo.Empleado (Nombre, Salario)
        VALUES (@Nombre, @Salario);

        -- Retornamos 1 que es el c�digo de inserci�n exitosa
        SELECT 1 AS Codigo, 'Inserci�n exitosa' AS Mensaje;
    END
END

1

EXEC sp_InsertarEmpleadoValidado "Axel Chavarria", 3000;
select * from dbo.Empleado