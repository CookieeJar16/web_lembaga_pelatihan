<?php

function isAdmin() {
    if (isset($_SESSION['user_id']) && $_SESSION['role'] === '1') {
        return true;
    }
    return false;
}

function isUser() {
    if (isset($_SESSION['user_id']) && $_SESSION['role'] === '2') {
        return true;
    }
    return false;
}

function isTrainer() {
    if (isset($_SESSION['user_id']) && $_SESSION['role'] === '3') {
        return true;
    }
    return false;
}
?>
