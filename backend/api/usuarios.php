<?php
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

include '../config.php';

$method = $_SERVER['REQUEST_METHOD'];
$path = $_GET['id'] ?? null;

switch ($method) {
    case 'GET':
        if ($path) {
            $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE id = ?");
            $stmt->execute([$path]);
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
            echo $usuario ? json_encode($usuario) : json_encode(["error" => "Usuario no encontrado"]);
        } else {
            $stmt = $pdo->query("SELECT * FROM usuarios");
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $pdo->prepare("INSERT INTO usuarios (nombre, email) VALUES (?, ?)");
        if ($stmt->execute([$data['nombre'], $data['email']])) {
            echo json_encode(["id" => $pdo->lastInsertId(), "mensaje" => "Usuario creado"]);
        } else {
            echo json_encode(["error" => "Error al crear"]);
        }
        break;

    case 'PUT':
        if (!$path) {
            echo json_encode(["error" => "ID requerido"]);
            break;
        }
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $pdo->prepare("UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?");
        if ($stmt->execute([$data['nombre'], $data['email'], $path])) {
            echo json_encode(["mensaje" => "Usuario actualizado"]);
        } else {
            echo json_encode(["error" => "Error al actualizar"]);
        }
        break;

    case 'DELETE':
        if (!$path) {
            echo json_encode(["error" => "ID requerido"]);
            break;
        }
        $stmt = $pdo->prepare("DELETE FROM usuarios WHERE id = ?");
        if ($stmt->execute([$path])) {
            echo json_encode(["mensaje" => "Usuario eliminado"]);
        } else {
            echo json_encode(["error" => "Error al eliminar"]);
        }
        break;

    default:
        echo json_encode(["error" => "Método no soportado"]);
        break;
}
?>
