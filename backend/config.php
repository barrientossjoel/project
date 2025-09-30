<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost";
$dbname = "crud_db";
$username = "root";
$password = "";

try {
    // Primero conectar sin especificar la base de datos para crearla si no existe
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  
} catch (PDOException $e) {
    echo json_encode(["error" => "Conexión fallida: " . $e->getMessage()]);
    exit();
}
?>
