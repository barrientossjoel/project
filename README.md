# CodeLearn - Plataforma de Aprendizaje

Una plataforma educativa moderna para aprender programación desde cero hasta nivel profesional.

## 🚀 Características

- **Frontend**: Angular 17 con diseño moderno y responsive
- **Backend**: PHP con MySQL para gestión de usuarios
- **Autenticación**: Sistema de login/registro completo
- **Dashboard**: Panel personalizado con progreso de cursos
- **CRUD**: Gestión completa de usuarios

## 📋 Requisitos Previos

### Frontend (Angular)
- Node.js 18+ 
- npm o yarn
- Angular CLI

### Backend (PHP)
- PHP 7.4+
- MySQL 5.7+ o MariaDB
- Servidor web (Apache/Nginx) o PHP built-in server

## 🛠️ Instalación y Configuración

### 1. Configurar el Backend

```bash

# Iniciar el servidor PHP
php -S localhost:8000
```

### 2. Configurar el Frontend

```bash
# Navegar al directorio frontend
cd frontend

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
ng serve
```

### 3. Verificar la Configuración

1. **Backend**: Visita `http://localhost:8000/test.php` para verificar la conexión a la base de datos
2. **Frontend**: Visita `http://localhost:4200` para ver la aplicación

## 🗄️ Base de Datos

- **Base de datos**: `crud_db`
- **Tabla**: `usuarios`

### Estructura de la tabla usuarios:
```sql
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Configuración del Backend

### Archivo config.php
```php
$host = "localhost";        // Host de MySQL
$dbname = "crud_db";        // Nombre de la base de datos
$username = "root";         // Usuario de MySQL
$password = "";             // Contraseña de MySQL
```

### Endpoints de la API

- `GET /api/usuarios.php` - Obtener todos los usuarios
- `GET /api/usuarios.php?id={id}` - Obtener usuario por ID
- `POST /api/usuarios.php` - Crear nuevo usuario
- `PUT /api/usuarios.php?id={id}` - Actualizar usuario
- `DELETE /api/usuarios.php?id={id}` - Eliminar usuario

## 🎨 Características del Frontend

### Páginas Principales
- **Home**: Hero section, beneficios, testimonios
- **Cursos**: Áreas de aprendizaje y proceso educativo
- **Nosotros**: Historia, misión, equipo y comunidad
- **Login**: Formulario de inicio de sesión
- **Registro**: Formulario de creación de cuenta
- **Dashboard**: Panel personalizado con cursos y gestión de usuarios

### Componentes
- **Navbar**: Navegación responsive con estados de autenticación
- **Footer**: Enlaces, redes sociales y newsletter
- **Notificaciones**: Sistema de toasts para feedback

### Funcionalidades
- Registro de nuevos usuarios
- Login con validación
- Sesión persistente
- Redirección automática al dashboard
- Logout con limpieza de sesión

## 🚨 Solución de Problemas

### Error: "Failed to open stream: No such file or directory"
- Verificar que el archivo `config.php` existe en el directorio `backend/`
- Verificar que la ruta en `usuarios.php` es correcta: `include '../config.php';`

### Error: "Call to a member function prepare() on null"
- Verificar que MySQL está ejecutándose
- Verificar las credenciales en `config.php`
- Ejecutar `test.php` para diagnosticar problemas de conexión

### Error CORS en el frontend
- Verificar que el backend está ejecutándose en `localhost:8000`
- Verificar que los headers CORS están configurados correctamente

## 📱 Responsive Design

La aplicación está optimizada para:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🎯 Próximas Características

- [ ] Sistema de cursos reales
- [ ] Progreso de aprendizaje persistente
- [ ] Sistema de pagos
- [ ] Chat en vivo
- [ ] Certificados de finalización
- [ ] API REST completa
- [ ] Tests unitarios y e2e

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

vidor]
