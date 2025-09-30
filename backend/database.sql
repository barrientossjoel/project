-- Crear base de datos
CREATE DATABASE IF NOT EXISTS crud_db;
USE crud_db;

-- Crear tabla usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo
INSERT INTO usuarios (nombre, email) VALUES 
('Juan Pérez', 'juan@ejemplo.com'),
('María García', 'maria@ejemplo.com'),
('Carlos López', 'carlos@ejemplo.com');
