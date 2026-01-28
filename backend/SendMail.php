<?php

// CORS Headers (Allows access from any origin - adjust for production)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json');

require_once 'Mail.php';

try {
    // Check if $_POST is empty (can happen if Content-Type is application/json)
    if (empty($_POST)) {
        $json_input = file_get_contents('php://input');
        $_POST = json_decode($json_input, true) ?? [];
    }

    $name = trim($_POST["name"] ?? "");
    $lastname = trim($_POST["lastname"] ?? "");
    $company = trim($_POST["company"] ?? "");
    $cargo = trim($_POST["cargo"] ?? "");
    $tel = trim($_POST["tel"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $message = trim($_POST["message"] ?? "");

    $errors = [];

    // Validation
    if (empty($name) || strlen($name) < 2) {
        $errors['name'] = 'El nombre es obligatorio y debe tener al menos 2 caracteres.';
    }

    if (empty($lastname)) {
        $errors['lastname'] = 'El apellido es obligatorio.';
    }

    if (empty($tel) || strlen($tel) < 9) {
        $errors['tel'] = 'El teléfono es obligatorio y debe tener al menos 9 caracteres.';
    }

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'El correo electrónico no es válido.';
    }

    if (empty($message) || strlen($message) < 10) {
        $errors['message'] = 'El mensaje es obligatorio y debe tener al menos 10 caracteres.';
    }

    if (!empty($errors)) {
        echo json_encode(['status' => 'error', 'errors' => $errors]);
        exit;
    }

    // Prepare Email
    $mail = new Mail();
    
    // Construct HTML body
    $body = "<h2>Nuevo contacto desde la web</h2>";
    $body .= "<p><strong>Nombre:</strong> " . htmlspecialchars($name) . " " . htmlspecialchars($lastname) . "</p>";
    $body .= "<p><strong>Empresa:</strong> " . htmlspecialchars($company) . "</p>";
    $body .= "<p><strong>Cargo:</strong> " . htmlspecialchars($cargo) . "</p>";
    $body .= "<p><strong>Teléfono:</strong> " . htmlspecialchars($tel) . "</p>";
    $body .= "<p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>";
    $body .= "<p><strong>Mensaje:</strong><br>" . nl2br(htmlspecialchars($message)) . "</p>";

    // Sender settings (using hardcoded recipient from original file or configuring properly)
    // In Mail.php: sendMail() sends using configured SMTP settings.
    // makeMail arguments: $body, $subject, $recipient, $name_recipient, $origin, $name_origin
    
    // Default recipient (as per original code or dummy) - Assuming logic from context
    // Ideally user of the site gets the email? Or the admin?
    // Usually 'makeMail' sends TO the admin.
    // Let's assume a default admin email for recipient as it's not clear.
    // However, Mail.php has hardcoded credentials, I will sending to the admin.
    
    // Let's use the values sent for origin, but strict SMTP often forbids spoofing 'From'.
    // `makeMail` calls `$this->mail->setFrom($origin, $name_origin);`
    // If using Gmail SMTP ($this->mail->Host = 'smtp.example.com' in original probably placeholder, 
    // but Username was 'hectorvenalvarez@gmail.com'), Gmail forces the authenticated user as From.
    
    $subject = "Nuevo Contacto de $name $lastname";
    $adminEmail = "hectorvenalvarez@gmail.com"; // Assuming this is the admin based on SMTP User
    $adminName = "Administrador";

    // Calling makeMail
    // Note: If using Gmail, setFrom might be ignored or shown as "on behalf of".
    $result = $mail->makeMail(
        $body,
        $subject,
        $adminEmail, 
        $adminName,
        $email,       // Origin email (the user's email)
        "$name $lastname" // Origin name
    );

    if ($result === 'Mensaje enviado') {
        echo json_encode(['status' => 'success', 'message' => 'Mensaje enviado correctamente']);
    } else {
        // Log error for debugging if needed
        echo json_encode(['status' => 'error', 'message' => $result]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
