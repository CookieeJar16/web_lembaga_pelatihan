<?php
  header('Content-Type: application/json');
  session_start();
  include'../Backend/config.php';
  include'../Backend/verif.php';

  $method = $_SERVER['REQUEST_METHOD'];
  $input = json_decode(file_get_contents('php://input'), true);

  switch ($method) {
    case 'GET':
      handleGet($pdo, $input);
      break;

    case 'POST':
      handlePost($pdo, $input);
      break;

    case 'PUT':
      handlePut($pdo, $input);
      break;

    case 'DELETE':
      handleDelete($pdo, $input);
      break;

    default:
      echo json_encode(['message' => 'Invalid request method']);
      break;
  }

  function handleGet($pdo) {
    $requestUri = $_SERVER['REQUEST_URI'];

      if (strpos($requestUri, '/users') !== false) {
        getUser($pdo);
      } elseif (strpos($requestUri, '/articles') !== false) {
        getArticle($pdo);
      } elseif (strpos($requestUri, '/mainArticle') !== false) {
        getArticleMain($pdo);
      } elseif (strpos($requestUri, '/profile') !== false) {
        getProfile($pdo);
      } elseif (strpos($requestUri, '/categories') !== false) {
        getCategory($pdo);
      } elseif (strpos($requestUri, '/trainers') !== false) {
        getTrainer($pdo);
      } elseif (strpos($requestUri, '/programs') !== false) {
        getPrograms($pdo);
      } elseif (strpos($requestUri, '/adminArticle') !== false) {
        getArticleAdmin($pdo);
      } 
    }

  function handlePost($pdo, $input) {
    $action = $input['action'] ?? '';

    if ($action === 'register') {
        registerUser($pdo, $input);
    } elseif ($action === 'login') {
        loginUser($pdo, $input);
    } elseif ($action === 'logout') {
        logoutUser();
    } elseif ($action === 'dataUser') {
        inputUserData($pdo, $input);
    } elseif ($action === 'addTrainer') {
        addTrainer($pdo, $input);
    } elseif ($action === 'addProgram') {
        addProgram($pdo, $input);
    } elseif ($action === 'addUser') {
        addUser($pdo, $input);
    } elseif ($_POST['action'] === 'addArticle') {
        addArticle($pdo);
    } elseif ($_POST['action'] === 'editArticle') {
        editArticle($pdo);
    } else {
        echo json_encode(['message' => 'Invalid action']);
    }
  }

  function handlePut($pdo, $input) {
    $action = $input['action'] ?? '';

    if ($action === 'updateProfile') {
        updateProfile($pdo, $input);
    } elseif ($action === 'editUser') {
        editUser($pdo, $input);
    } elseif ($action === 'editTrainer') {
        editTrainer($pdo, $input);
    } elseif ($action === 'editProgram') {
        editProgram($pdo, $input);
    } 
  }

  
  function handleDelete($pdo, $input) {
    $action = $input['action'] ?? '';

    if ($action === 'deleteUser') {
        deleteUser($pdo, $input);
    } elseif ($action === 'deleteTrainer') {
        deleteTrainer($pdo, $input);
    } elseif ($action === 'deleteArticle') {
        deleteArticle($pdo, $input);
    } elseif ($action === 'deleteProgram') {
        deleteProgram($pdo, $input);
    } else {
        echo json_encode(['message' => 'Invalid action']);
    }
  }

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


  function registerUser($pdo, $input) {
    $checkSql = "SELECT * FROM user WHERE email = :email";
    $checkStmt = $pdo->prepare($checkSql);
    $checkStmt->execute(['email' => $input['email']]);
    $existingUser = $checkStmt->fetch(PDO::FETCH_ASSOC);

    if ($existingUser) {
        echo json_encode(['message' => 'Email already exists', 'success' => false]);
    } else {
      $sql = "INSERT INTO user (email, password, role) VALUES (:email, :password, 2)";
      $stmt = $pdo->prepare($sql);
      $passwordHash = password_hash($input['password'], PASSWORD_DEFAULT);
      $stmt->execute(['email' => $input['email'], 'password' => $passwordHash]);
      echo json_encode(['message' => 'User registered successfully', 'success' => true]);
    }
  }

  function loginUser($pdo, $input) {
    $sql = "SELECT * FROM user WHERE email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['email' => $input['email']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($input['password'], $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['role'] = $user['role'];
        $_SESSION['isLoggedIn'] = true;
        
        if (isAdmin()) {
          echo json_encode(['message' => 'Login successful', 'role' => 'admin', 'success' => true]);
      } elseif (isUser()) {
          echo json_encode(['message' => 'Login successful', 'role' => 'user', 'success' => true]);
      } elseif (isTrainer()) {
          echo json_encode(['message' => 'Login successful', 'role' => 'trainer', 'success' => true]);
      } else {
        echo json_encode(['message' => 'Login successful, but role is unknown', 'success' => true]);
    }
  } else {
      echo json_encode(['message' => 'Invalid email or password', 'success' => false]);
  }
}

function getUser($pdo){
  $sql = "SELECT * FROM user WHERE role = 2";
  $stmt = $pdo->prepare($sql);
  $stmt->execute();
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($result);
}

function getTrainer($pdo){
  $sql = "SELECT * FROM user WHERE role = 3";
  $stmt = $pdo->prepare($sql);
  $stmt->execute();
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($result);
}

function getPrograms($pdo){
  $sql = "SELECT * FROM program";
  $stmt = $pdo->prepare($sql);
  $stmt->execute();
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($result);
}

function getProfile($pdo){
  $id = $_SESSION['user_id'];

  if($id){
    $sql = "SELECT nama, email, no_telp, alamat FROM user WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if($result){
      echo json_encode($result);
    } else {
      echo json_encode(["error" => "Profile not found"]);
    }
  } else {
    echo json_encode(["error" => "ID not found"]);
  }
}

function updateProfile($pdo ,$input){
  $id = $_SESSION['user_id'];

  $fields = [];
  $values = [];

  if (isset($input['nama'])) {
    $fields[] = "nama = ?";
    $values[] = $input['nama'];
  }
  if (isset($input['no_telp'])) {
    $fields[] = "no_telp = ?";
    $values[] = $input['no_telp'];
  }
  if (isset($input['alamat'])) {
    $fields[] = "alamat = ?";
    $values[] = $input['alamat'];
  }

  if (empty($fields)) {
    echo json_encode(["error" => "No profile data provided for update"]);
    return;
  }


  $updateQuery = "UPDATE user SET " . implode(", ", $fields) . " WHERE id = ?";
  $values[] = $id;

  $updateStmt = $pdo->prepare($updateQuery);
  $success = $updateStmt->execute($values);

  if ($success) {
    echo json_encode(["message" => "Profile updated successfully"]);
  } else {
    echo json_encode(["error" => "Failed to update profile"]);
  }
}

function getArticle($pdo){
  $id = $_GET['id'] ?? null;

    if ($id) {
        $sql = "SELECT * FROM berita WHERE id_berita = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            echo json_encode($result);
        } else {
            echo json_encode(["error" => "Article not found"]);
        }
    } else {
        echo json_encode(["error" => "No article ID provided"]);
    }
}

function getArticleMain($pdo){
  $sql = "SELECT *, substring(isi_berita,1,200) AS preview_text FROM berita ORDER BY tanggal_publikasi DESC LIMIT 4";
  $stmt = $pdo->prepare($sql);
  $stmt->execute();
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

  if ($result) {
      echo json_encode($result);
  } else {
      echo json_encode(["error" => "No articles found"]);
  }
}

function getArticleAdmin($pdo){
  $sql = "SELECT *, substring(isi_berita,1,200) AS preview_text FROM berita 
  INNER JOIN kategori ON berita.id_kategori = kategori. id_kategori 
  ORDER BY tanggal_publikasi DESC";

  $stmt = $pdo->prepare($sql);
  $stmt->execute();
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

  if ($result) {
      echo json_encode($result);
  } else {
      echo json_encode(["error" => "No articles found"]);
  }
}

function getArticleByCategory($pdo) {
  $id_category = $_GET['id_category'] ?? null;
  
  if ($id_category) {
    $sql = "SELECT *, substring(isi_berita,1,200) AS preview_text 
          FROM berita 
          WHERE id_kategori = ?
          ORDER BY tanggal_publikasi DESC";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  if ($result) {
      echo json_encode($result);
  } else {
      echo json_encode(["error" => "No articles found for this category"]);
  }
}

function getCategory($pdo){
  $sql = "SELECT * FROM kategori";
  $stmt = $pdo->prepare($sql);
  $stmt->execute();
  $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
  
  if ($categories) {
      echo json_encode($categories);
  } else {
      echo json_encode(["error" => "No categories found"]);
  }
}

function inputUserData($pdo, $input) {
  $sql = "UPDATE user SET email = :email WHERE id = :id";
  $stmt = $pdo->prepare($sql);
  $stmt->execute(['email' => $input['email'], 'id' => $input['id']]);
  echo json_encode(['message' => 'User updated successfully']);
}

function logoutUser() {
  session_unset();
  session_destroy();
  echo json_encode(['message' => 'Logout successful']);
}

function deleteUser($pdo, $input) {
  $sql = "DELETE FROM user WHERE id = :id && role = 2";
  $stmt = $pdo->prepare($sql);
  $stmt->execute(['id' => $input['id']]);
  echo json_encode(['message' => 'User deleted successfully']);
}

function deleteTrainer($pdo, $input) {
  $sql = "DELETE FROM user WHERE id = :id && role = 3";
  $stmt = $pdo->prepare($sql);
  $stmt->execute(['id' => $input['id']]);
  echo json_encode(['message' => 'Trainer deleted successfully']);
}

function addTrainer($pdo, $input) {
  $checkSql = "SELECT * FROM user WHERE email = :email";
  $checkStmt = $pdo->prepare($checkSql);
  $checkStmt->execute(['email' => $input['email']]);
  $existingUser = $checkStmt->fetch(PDO::FETCH_ASSOC);

  if ($existingUser) {
      echo json_encode(['message' => 'Email already exists', 'success' => false]);
  } else {
    $sql = "INSERT INTO user (nama, alamat, no_telp, email, password, role) VALUES (:nama, :alamat, :no_telp, :email, :password, 3)";
    $stmt = $pdo->prepare($sql);
    $passwordHash = password_hash($input['password'], PASSWORD_DEFAULT);
    $stmt->execute([ 'nama' => $input['nama'], 'alamat' => $input['alamat'], 'no_telp' => $input['no_telp'], 'email' => $input['email'], 'password' => $passwordHash]);
    echo json_encode(['message' => 'Trainer registered successfully', 'success' => true]);
  }
}

function addProgram($pdo, $input) {
  $sql = "INSERT INTO program (nama_program, deskripsi, jadwal, materi) VALUES (:nama_program, :deskripsi, :jadwal, :materi)";
  $stmt = $pdo->prepare($sql);
  $stmt->execute(['nama_program' => $input['nama_program'], 'deskripsi' => $input['deskripsi'], 'jadwal' => $input['jadwal'], 'materi' => $input['materi']]);
  echo json_encode(['message' => 'Program added successfully', 'success' => true]);
}

function deleteProgram($pdo, $input) {
  $sql = "DELETE FROM program WHERE id_program = :id_program";
  $stmt = $pdo->prepare($sql);
  $stmt->execute(['id_program' => $input['id_program']]);
  echo json_encode(['message' => 'Program deleted successfully']);
}

function addArticle($pdo) {
  $uploadDir = __DIR__ . '/../uploadedImg/article/';
    if (isset($_FILES['foto_berita'])) {
        $fotoName = basename($_FILES['foto_berita']['name']);
        $uploadFile = $uploadDir . $fotoName;

        if (move_uploaded_file($_FILES['foto_berita']['tmp_name'], $uploadFile)) {
            
            $fotoPath = '/M1/uploadedImg/article/' . $fotoName;
            
            $sql = "INSERT INTO berita (judul_berita, isi_berita, tanggal_publikasi, id_kategori, foto_berita) 
                    VALUES (:judul_berita, :isi_berita, :tanggal_publikasi, :id_kategori, :foto_berita)";
            
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':judul_berita' => $_POST['judul_berita'],
                ':isi_berita' => $_POST['isi_berita'],
                ':tanggal_publikasi' => $_POST['tanggal_publikasi'],
                ':id_kategori' => $_POST['id_kategori'],
                ':foto_berita' => $fotoPath
            ]);

            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Gagal mengunggah foto']);
        }
  }
}

function deleteArticle($pdo, $input) {
  $sql = "DELETE FROM berita WHERE id_berita = :id_berita";
  $stmt = $pdo->prepare($sql);
  $stmt->execute(['id_berita' => $input['id_berita']]);
  echo json_encode(['message' => 'Article deleted successfully']);
}

function addUser($pdo, $input) {
  $checkSql = "SELECT * FROM user WHERE email = :email";
  $checkStmt = $pdo->prepare($checkSql);
  $checkStmt->execute(['email' => $input['email']]);
  $existingUser = $checkStmt->fetch(PDO::FETCH_ASSOC);

  if ($existingUser) {
      echo json_encode(['message' => 'Email already exists', 'success' => false]);
  } else {
    $sql = "INSERT INTO user (nama, alamat, no_telp, email, password, role) VALUES (:nama, :alamat, :no_telp, :email, :password, 2)";
    $stmt = $pdo->prepare($sql);
    $passwordHash = password_hash($input['password'], PASSWORD_DEFAULT);
    $stmt->execute([ 'nama' => $input['nama'], 'alamat' => $input['alamat'], 'no_telp' => $input['no_telp'], 'email' => $input['email'], 'password' => $passwordHash]);
    echo json_encode(['message' => 'User added successfully', 'success' => true]);
  }
}

function editUser($pdo, $input) {
  $id = $input['id'];

  $fields = [];
  $values = [];
  $passwordHash = password_hash($input['password'], PASSWORD_DEFAULT);

  if (isset($input['nama'])) {
    $fields[] = "nama = ?";
    $values[] = $input['nama'];
  }
  if (isset($input['email'])) {
    $fields[] = "email = ?";
    $values[] = $input['email'];
  }
  if (isset($input['no_telp'])) {
    $fields[] = "no_telp = ?";
    $values[] = $input['no_telp'];
  }
  if (isset($input['alamat'])) {
    $fields[] = "alamat = ?";
    $values[] = $input['alamat'];
  }
  if (isset($input['password'])) {
    $fields[] = "password = ?";
    $values[] = $passwordHash;
  }

  if (empty($fields)) {
    echo json_encode(["error" => "No profile data provided for update"]);
    return;
  }


  $updateQuery = "UPDATE user SET " . implode(", ", $fields) . " WHERE id = ?";
  $values[] = $id;

  $updateStmt = $pdo->prepare($updateQuery);
  $success = $updateStmt->execute($values);

  if ($success) {
    echo json_encode(["message" => "Profile updated successfully"]);
  } else {
    echo json_encode(["error" => "Failed to update profile"]);
  }
}

function editTrainer($pdo, $input) {
  $id = $input['id'];

  $fields = [];
  $values = [];
  $passwordHash = password_hash($input['password'], PASSWORD_DEFAULT);

  if (isset($input['nama'])) {
    $fields[] = "nama = ?";
    $values[] = $input['nama'];
  }
  if (isset($input['email'])) {
    $fields[] = "email = ?";
    $values[] = $input['email'];
  }
  if (isset($input['no_telp'])) {  
    $fields[] = "no_telp = ?";
    $values[] = $input['no_telp'];
  }
  if (isset($input['alamat'])) {
    $fields[] = "alamat = ?";
    $values[] = $input['alamat'];
  }
  if (isset($input['password'])) {
    $fields[] = "password = ?";
    $values[] = $passwordHash;
  }

  if (empty($fields)) {
    echo json_encode(["error" => "No profile data provided for update"]);
    return;
  }


  $updateQuery = "UPDATE user SET " . implode(", ", $fields) . " WHERE id = ?";
  $values[] = $id;

  $updateStmt = $pdo->prepare($updateQuery);
  $success = $updateStmt->execute($values);

  if ($success) {
    echo json_encode(["message" => "Profile updated successfully"]);
  } else {
    echo json_encode(["error" => "Failed to update profile"]);
  }
}

function editProgram($pdo, $input) {
  $id = $input['id'];

  $fields = [];
  $values = [];

  if (isset($input['nama_program'])) {
    $fields[] = "nama_program = ?";
    $values[] = $input['nama_program'];
  }
  if (isset($input['deskripsi'])) {
    $fields[] = "deskripsi = ?";
    $values[] = $input['deskripsi'];
  }
  if (isset($input['jadwal'])) {
    $fields[] = "jadwal = ?";
    $values[] = $input['jadwal'];
  }
  if (isset($input['materi'])) {
    $fields[] = "materi = ?";
    $values[] = $input['materi'];
  }

  if (empty($fields)) {
    echo json_encode(["error" => "No profile data provided for update"]);
    return;
  }


  $updateQuery = "UPDATE program SET " . implode(", ", $fields) . " WHERE id_program = ?";
  $values[] = $id;

  $updateStmt = $pdo->prepare($updateQuery);
  $success = $updateStmt->execute($values);

  if ($success) {
    echo json_encode(["message" => "Profile updated successfully"]);
  } else {
    echo json_encode(["error" => "Failed to update profile"]);
  }
}

function editArticle($pdo) {
  $uploadDir = __DIR__ . '/../uploadedImg/article/';
    if (isset($_FILES['foto_berita'])) {
        $fotoName = basename($_FILES['foto_berita']['name']);
        $uploadFile = $uploadDir . $fotoName;

        if (move_uploaded_file($_FILES['foto_berita']['tmp_name'], $uploadFile)) {
            
            $fotoPath = '/M1/uploadedImg/article/' . $fotoName;
            $id = $_POST['id_berita'];

            $fields = [];
            $values = [];

            if (isset($_POST['judul_berita'])) {
                $fields[] = "judul_berita = ?";
                $values[] = $_POST['judul_berita'];
            }
            if (isset($_POST['isi_berita'])) {
                $fields[] = "isi_berita = ?";
                $values[] = $_POST['isi_berita'];
            }
            if (isset($_POST['tanggal_publikasi'])) {
                $fields[] = "tanggal_publikasi = ?";
                $values[] = $_POST['tanggal_publikasi'];
            }
            if (isset($_POST['id_kategori'])) {
                $fields[] = "id_kategori = ?";
                $values[] = $_POST['id_kategori'];
            }
            if (isset($fotoPath)) {
                $fields[] = "foto_berita = ?";
                $values[] = $fotoPath;
            }
            if (empty($fields)) {
                echo json_encode(["error" => "No profile data provided for update"]);
                return;
            }
            
            $updateQuery = "UPDATE berita SET" . implode(", ", $fields) . " WHERE id_berita = ?"; 
            $values[] = $id;
            
            $stmt = $pdo->prepare($updateQuery);
            $stmt->execute();

            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Gagal mengunggah foto']);
        }
  }
}

?>