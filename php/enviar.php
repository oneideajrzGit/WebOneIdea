<?php
/* ==========================================================
   enviar.php — recibe el formulario de contact.html y:
     1) manda el mensaje a One Idea
     2) manda un correo de confirmación al cliente
   Responde en JSON: {"ok":true} o {"ok":false,"error":"..."}
   ========================================================== */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/Exception.php';
require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';

header('Content-Type: application/json; charset=utf-8');

function responder($ok, $error = '', $code = 200) {
    http_response_code($code);
    echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $error], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(false, 'Método no permitido', 405);
}

$cfg = require __DIR__ . '/config.php';

/* ---------- Anti-spam ---------- */
// Campo trampa: los humanos no lo ven; si viene lleno, es un bot.
if (!empty($_POST['sitio'])) {
    responder(true); // fingimos éxito para no darle pistas al bot
}
// Si el formulario se envió en menos de 3 segundos tras cargar la página, es un bot.
$t = isset($_POST['t']) ? (int) $_POST['t'] : 0;
if ($t > 0 && (round(microtime(true) * 1000) - $t) < 3000) {
    responder(true);
}

/* ---------- Leer y validar datos ---------- */
function campo($nombre, $max = 256) {
    $v = isset($_POST[$nombre]) ? trim((string) $_POST[$nombre]) : '';
    $v = str_replace(["\r", "\n"], ' ', $v);           // evita inyección de cabeceras
    return mb_substr($v, 0, $max, 'UTF-8');
}

$nombre        = campo('nombre');
$empresa       = campo('empresa');
$email         = campo('email');
$telefono      = campo('telefono', 20);
$producto      = campo('producto');
$producto_otro = campo('producto_otro');
$mensaje       = isset($_POST['mensaje']) ? mb_substr(trim((string) $_POST['mensaje']), 0, 5000, 'UTF-8') : '';

if ($nombre === '' || $email === '' || $telefono === '' || $producto === '') {
    responder(false, 'Faltan campos obligatorios.', 422);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    responder(false, 'El correo no es válido.', 422);
}
if ($producto === 'Otros' && $producto_otro !== '') {
    $producto = 'Otros: ' . $producto_otro;
}

$h = function ($s) { return nl2br(htmlspecialchars($s, ENT_QUOTES, 'UTF-8')); };

/* ---------- Preparar PHPMailer ---------- */
function nuevoCorreo($cfg) {
    $m = new PHPMailer(true);
    $m->isSMTP();
    $m->Host       = $cfg['smtp_host'];
    $m->SMTPAuth   = true;
    $m->Username   = $cfg['smtp_user'];
    $m->Password   = $cfg['smtp_pass'];
    $m->SMTPSecure = $cfg['smtp_secure'] === 'tls' ? PHPMailer::ENCRYPTION_STARTTLS : PHPMailer::ENCRYPTION_SMTPS;
    $m->Port       = (int) $cfg['smtp_port'];
    $m->CharSet    = 'UTF-8';
    $m->setFrom($cfg['smtp_user'], $cfg['from_name']);
    $m->isHTML(true);
    return $m;
}

$fila = function ($etiqueta, $valor) use ($h) {
    if ($valor === '') return '';
    return '<tr><td style="padding:8px 12px;background:#f4f4f4;font-weight:bold;width:160px;vertical-align:top">'
         . $etiqueta . '</td><td style="padding:8px 12px">' . $h($valor) . '</td></tr>';
};

$tabla = '<table style="border-collapse:collapse;width:100%;max-width:600px;font-family:Arial,sans-serif;font-size:14px">'
       . $fila('Nombre', $nombre)
       . $fila('Empresa', $empresa)
       . $fila('Email', $email)
       . $fila('Teléfono', $telefono)
       . $fila('Producto', $producto)
       . $fila('Información adicional', $mensaje)
       . '</table>';

$textoPlano = "Nombre: $nombre\nEmpresa: $empresa\nEmail: $email\nTeléfono: $telefono\n"
            . "Producto: $producto\n\nInformación adicional:\n$mensaje";

/* ---------- 1) Correo para One Idea ---------- */
try {
    $m = nuevoCorreo($cfg);
    foreach (explode(',', $cfg['destino']) as $dest) {
        if (trim($dest) !== '') $m->addAddress(trim($dest));
    }
    $m->addReplyTo($email, $nombre);   // al darle "Responder" le contestas directo al cliente
    $m->Subject = "Nuevo mensaje de contacto: $nombre — $producto";
    $m->Body    = '<div style="font-family:Arial,sans-serif">'
                . '<h2 style="margin:0 0 16px">Nuevo mensaje desde la página de contacto</h2>'
                . $tabla
                . '<p style="color:#888;font-size:12px;margin-top:16px">Responde a este correo para contestarle directamente al cliente.</p>'
                . '</div>';
    $m->AltBody = $textoPlano;
    $m->send();
} catch (Exception $e) {
    error_log('Contacto One Idea (interno): ' . $e->getMessage());
    responder(false, 'No se pudo enviar el mensaje.', 500);
}

/* ---------- 2) Confirmación para el cliente ---------- */
try {
    $c = nuevoCorreo($cfg);
    $c->addAddress($email, $nombre);
    $primerDestino = trim(explode(',', $cfg['destino'])[0]);
    $c->addReplyTo($primerDestino, $cfg['from_name']);
    $c->Subject = 'Recibimos tu mensaje — One Idea';
    $c->Body    = '<div style="font-family:Arial,sans-serif;font-size:15px;color:#222;max-width:600px">'
                . '<p>Hola ' . $h($nombre) . ',</p>'
                . '<p>¡Gracias por escribirnos! Este correo es para confirmarte que <b>recibimos tu mensaje</b> '
                . 'y nos pondremos en contacto contigo lo antes posible.</p>'
                . '<p>Esto es lo que nos enviaste:</p>'
                . $tabla
                . '<p style="margin-top:20px">Si necesitas algo urgente, escríbenos por WhatsApp al <b>'
                . $h($cfg['whatsapp']) . '</b>.</p>'
                . '<p>Saludos,<br><b>One Idea</b><br>'
                . '<a href="' . htmlspecialchars($cfg['sitio_web'], ENT_QUOTES) . '">' . $h($cfg['sitio_web']) . '</a></p>'
                . '</div>';
    $c->AltBody = "Hola $nombre,\n\nGracias por escribirnos. Recibimos tu mensaje y te contactaremos pronto.\n\n"
                . "Lo que nos enviaste:\n$textoPlano\n\nWhatsApp: {$cfg['whatsapp']}\n\nOne Idea";
    $c->send();
} catch (Exception $e) {
    // El mensaje a One Idea ya llegó; solo registramos el fallo de la confirmación.
    error_log('Contacto One Idea (confirmación): ' . $e->getMessage());
}

responder(true);
