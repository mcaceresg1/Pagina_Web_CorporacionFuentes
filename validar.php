<?php
/**
 * Backend PHP para formulario de contacto
 * Corporación Fuentes y Asociados
 */

// Configuración de seguridad
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// Configuración de correo
define('EMAIL_TO', 'gerencia@corporacionfuentes.com'); // Email de gerencia
define('EMAIL_FROM', 'noreply@corporacionfuentes.com');
define('EMAIL_SUBJECT', 'Nuevo mensaje desde el formulario de contacto');
define('SITE_NAME', 'Corporación Fuentes y Asociados');

// Habilitar errores solo en desarrollo
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

/**
 * Función principal
 */
function main() {
    // Verificar que sea una petición POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        sendResponse(false, 'Método no permitido');
        return;
    }

    // Verificar CSRF (opcional pero recomendado)
    // if (!verifyCsrfToken()) {
    //     sendResponse(false, 'Token de seguridad inválido');
    //     return;
    // }

    // Obtener y sanitizar datos
    $nombre = sanitizeInput($_POST['p1'] ?? '');
    $email = sanitizeInput($_POST['p2'] ?? '');
    $telefono = sanitizeInput($_POST['p3'] ?? '');
    $mensaje = sanitizeInput($_POST['p4'] ?? '');

    // Validar datos
    $errors = validateData($nombre, $email, $telefono, $mensaje);
    
    if (!empty($errors)) {
        sendResponse(false, 'Por favor corrija los siguientes errores: ' . implode(', ', $errors));
        return;
    }

    // Verificar honeypot (anti-spam)
    if (!empty($_POST['website'])) {
        // Campo honeypot completado - probablemente spam
        sendResponse(true, 'Mensaje recibido'); // Fingir éxito pero no enviar
        return;
    }

    // Preparar email
    $emailBody = prepareEmailBody($nombre, $email, $telefono, $mensaje);
    
    // Enviar email
    $sent = sendEmail(EMAIL_TO, EMAIL_SUBJECT, $emailBody, $email, $nombre);
    
    if ($sent) {
        // Opcional: Guardar en base de datos
        // saveToDatabase($nombre, $email, $telefono, $mensaje);
        
        // Opcional: Enviar email de confirmación al usuario
        sendConfirmationEmail($email, $nombre);
        
        sendResponse(true, '¡Gracias por contactarnos! Responderemos pronto.');
    } else {
        sendResponse(false, 'Error al enviar el mensaje. Por favor intente nuevamente o contáctenos directamente.');
    }
}

/**
 * Sanitizar entrada
 */
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

/**
 * Validar datos del formulario
 */
function validateData($nombre, $email, $telefono, $mensaje) {
    $errors = [];

    // Validar nombre
    if (empty($nombre)) {
        $errors[] = 'El nombre es obligatorio';
    } elseif (strlen($nombre) < 2) {
        $errors[] = 'El nombre debe tener al menos 2 caracteres';
    } elseif (strlen($nombre) > 100) {
        $errors[] = 'El nombre es demasiado largo';
    }

    // Validar email
    if (empty($email)) {
        $errors[] = 'El email es obligatorio';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'El email no es válido';
    }

    // Validar teléfono
    if (empty($telefono)) {
        $errors[] = 'El teléfono es obligatorio';
    } elseif (!preg_match('/^[0-9\s\-\+\(\)]{6,20}$/', $telefono)) {
        $errors[] = 'El teléfono no es válido';
    }

    // Validar mensaje
    if (empty($mensaje)) {
        $errors[] = 'El mensaje es obligatorio';
    } elseif (strlen($mensaje) < 10) {
        $errors[] = 'El mensaje debe tener al menos 10 caracteres';
    } elseif (strlen($mensaje) > 5000) {
        $errors[] = 'El mensaje es demasiado largo';
    }

    // Verificar spam en el mensaje
    if (detectSpam($mensaje)) {
        $errors[] = 'El mensaje contiene contenido no permitido';
    }

    return $errors;
}

/**
 * Detectar spam básico
 */
function detectSpam($text) {
    $spamKeywords = ['viagra', 'casino', 'lottery', 'pills', 'enlarge'];
    $text = strtolower($text);
    
    foreach ($spamKeywords as $keyword) {
        if (strpos($text, $keyword) !== false) {
            return true;
        }
    }
    
    // Verificar demasiados enlaces
    if (substr_count($text, 'http') > 3) {
        return true;
    }
    
    return false;
}

/**
 * Preparar cuerpo del email
 */
function prepareEmailBody($nombre, $email, $telefono, $mensaje) {
    $date = date('d/m/Y H:i:s');
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'Desconocida';
    
    $html = <<<HTML
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563eb, #0891b2); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
        .field { margin-bottom: 15px; padding: 15px; background: white; border-left: 4px solid #2563eb; border-radius: 5px; }
        .label { font-weight: bold; color: #1f2937; margin-bottom: 5px; }
        .value { color: #6b7280; }
        .footer { background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 10px 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Nuevo mensaje de contacto</h2>
            <p>Corporación Fuentes y Asociados</p>
        </div>
        <div class="content">
            <div class="field">
                <div class="label">Nombre:</div>
                <div class="value">{$nombre}</div>
            </div>
            <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:{$email}">{$email}</a></div>
            </div>
            <div class="field">
                <div class="label">Teléfono:</div>
                <div class="value"><a href="tel:{$telefono}">{$telefono}</a></div>
            </div>
            <div class="field">
                <div class="label">Mensaje:</div>
                <div class="value">{$mensaje}</div>
            </div>
            <div class="field">
                <div class="label">Fecha:</div>
                <div class="value">{$date}</div>
            </div>
            <div class="field">
                <div class="label">IP:</div>
                <div class="value">{$ip}</div>
            </div>
        </div>
        <div class="footer">
            Este mensaje fue enviado desde el formulario de contacto del sitio web.<br>
            © 2025 Corporación Fuentes y Asociados
        </div>
    </div>
</body>
</html>
HTML;

    return $html;
}

/**
 * Enviar email
 */
function sendEmail($to, $subject, $body, $replyTo = null, $replyName = null) {
    $headers = [];
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/html; charset=UTF-8';
    $headers[] = 'From: ' . SITE_NAME . ' <' . EMAIL_FROM . '>';
    
    if ($replyTo) {
        $replyName = $replyName ? $replyName : $replyTo;
        $headers[] = 'Reply-To: ' . $replyName . ' <' . $replyTo . '>';
    }
    
    $headers[] = 'X-Mailer: PHP/' . phpversion();
    
    return mail($to, $subject, $body, implode("\r\n", $headers));
}

/**
 * Enviar email de confirmación al usuario
 */
function sendConfirmationEmail($email, $nombre) {
    $subject = 'Gracias por contactarnos - ' . SITE_NAME;
    
    $body = <<<HTML
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563eb, #0891b2); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
        .footer { background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; padding: 12px 30px; background: #2563eb; color: white; text-decoration: none; border-radius: 25px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>¡Gracias por contactarnos!</h2>
        </div>
        <div class="content">
            <p>Hola <strong>{$nombre}</strong>,</p>
            <p>Hemos recibido tu mensaje correctamente. Nuestro equipo lo revisará y te responderá a la brevedad posible.</p>
            <p>En Corporación Fuentes y Asociados nos especializamos en:</p>
            <ul>
                <li>Asesoría Contable</li>
                <li>Auditoría Contable</li>
                <li>Asesoría Tributaria</li>
                <li>Asesoría Laboral y Planillas</li>
                <li>Constitución de Empresas</li>
            </ul>
            <p style="text-align: center;">
                <a href="https://www.corporacionfuentes.com" class="button">Visitar nuestro sitio web</a>
            </p>
            <p>Si necesitas asistencia inmediata, puedes contactarnos:</p>
            <p>
                📞 <strong>Teléfono:</strong> 01 252 0652<br>
                📱 <strong>Móvil:</strong> 980 602 352<br>
                📧 <strong>Email:</strong> gerencia@corporacionfuentes.com
            </p>
        </div>
        <div class="footer">
            <p><strong>Corporación Fuentes y Asociados</strong></p>
            <p>Calle Maximiliano Arguedas Nº 184, Chorrillos, Lima, Perú</p>
            <p>© 2025 Todos los derechos reservados</p>
        </div>
    </div>
</body>
</html>
HTML;

    return sendEmail($email, $subject, $body, EMAIL_TO, SITE_NAME);
}

/**
 * Guardar en base de datos (opcional)
 */
function saveToDatabase($nombre, $email, $telefono, $mensaje) {
    // Ejemplo con PDO
    try {
        $pdo = new PDO('mysql:host=localhost;dbname=tu_base_datos', 'usuario', 'contraseña');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $stmt = $pdo->prepare("
            INSERT INTO contactos (nombre, email, telefono, mensaje, fecha, ip)
            VALUES (:nombre, :email, :telefono, :mensaje, NOW(), :ip)
        ");
        
        $stmt->execute([
            ':nombre' => $nombre,
            ':email' => $email,
            ':telefono' => $telefono,
            ':mensaje' => $mensaje,
            ':ip' => $_SERVER['REMOTE_ADDR']
        ]);
        
        return true;
    } catch (PDOException $e) {
        error_log('Error BD: ' . $e->getMessage());
        return false;
    }
}

/**
 * Enviar respuesta JSON
 */
function sendResponse($success, $message, $data = []) {
    $response = [
        'success' => $success,
        'message' => $message,
        'data' => $data
    ];
    
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Verificar token CSRF (opcional)
 */
function verifyCsrfToken() {
    session_start();
    $token = $_POST['csrf_token'] ?? '';
    $sessionToken = $_SESSION['csrf_token'] ?? '';
    
    return hash_equals($sessionToken, $token);
}

// Ejecutar
main();
?>
