<?php
/* ==========================================================
   CONFIGURACIÓN DEL CORREO (Hostinger)
   Llena estos datos con la cuenta de correo que creaste en
   hPanel > Correos electrónicos. NO subas este archivo a
   repositorios públicos: contiene la contraseña.
   ========================================================== */

return [
    // Servidor SMTP de Hostinger (no cambiar)
    'smtp_host'   => 'smtp.hostinger.com',
    'smtp_port'   => 465,          // 465 = SSL  (alternativa: 587 con 'tls')
    'smtp_secure' => 'ssl',

    // Cuenta de correo de Hostinger que ENVÍA los mensajes
    'smtp_user'   => 'oneideajrz@morethanoneidea.com',
    'smtp_pass'   => 'OneIdea26@',

    // Nombre que verán como remitente
    'from_name'   => 'One Idea',

    // Correo(s) donde ustedes quieren RECIBIR los mensajes del formulario.
    // Puede ser el mismo de arriba u otro (Gmail, etc.). Separa varios con coma.
    'destino'     => 'oneideajrz@morethanoneidea.com',

    // Datos que aparecen en el correo de confirmación al cliente
    'whatsapp'    => '656 000 0000',
    'sitio_web'   => 'https://morethanoneidea.com',
];
