<?php
// Servidor PHP simple para desarrollo
// Ejecutar con: php -S localhost:8000 server.php

// Headers CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Datos de ejemplo (simulando base de datos)
$usuarios = [
    ['id' => 1, 'nombre' => 'Juan Pérez', 'email' => 'juan@ejemplo.com'],
    ['id' => 2, 'nombre' => 'María García', 'email' => 'maria@ejemplo.com'],
    ['id' => 3, 'nombre' => 'Carlos López', 'email' => 'carlos@ejemplo.com']
];

$method = $_SERVER['REQUEST_METHOD'];
$path = $_GET['id'] ?? null;

switch ($method) {
    case 'GET':
        if ($path) {
            $usuario = array_filter($usuarios, fn($u) => $u['id'] == $path);
            echo $usuario ? json_encode(array_values($usuario)[0]) : json_encode(["error" => "Usuario no encontrado"]);
        } else {
            echo json_encode($usuarios);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $newId = max(array_column($usuarios, 'id')) + 1;
        $newUser = ['id' => $newId, 'nombre' => $data['nombre'], 'email' => $data['email']];
        $usuarios[] = $newUser;
        echo json_encode(["id" => $newId, "mensaje" => "Usuario creado"]);
        break;

    case 'PUT':
        if (!$path) {
            echo json_encode(["error" => "ID requerido"]);
            break;
        }
        $data = json_decode(file_get_contents("php://input"), true);
        $index = array_search($path, array_column($usuarios, 'id'));
        if ($index !== false) {
            $usuarios[$index] = ['id' => $path, 'nombre' => $data['nombre'], 'email' => $data['email']];
            echo json_encode(["mensaje" => "Usuario actualizado"]);
        } else {
            echo json_encode(["error" => "Usuario no encontrado"]);
        }
        break;

    case 'DELETE':
        if (!$path) {
            echo json_encode(["error" => "ID requerido"]);
            break;
        }
        $index = array_search($path, array_column($usuarios, 'id'));
        if ($index !== false) {
            unset($usuarios[$index]);
            echo json_encode(["mensaje" => "Usuario eliminado"]);
        } else {
            echo json_encode(["error" => "Usuario no encontrado"]);
        }
        break;

    default:
        echo json_encode(["error" => "Método no soportado"]);
        break;
}
?>

