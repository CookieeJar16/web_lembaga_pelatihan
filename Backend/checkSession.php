<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['isLoggedIn']) && $_SESSION['isLoggedIn'] === true) {
    echo json_encode([
        'isLoggedIn' => true,
        'role' => $_SESSION['role']
    ]);
} else {
    echo json_encode(['isLoggedIn' => false]);
}
?>
