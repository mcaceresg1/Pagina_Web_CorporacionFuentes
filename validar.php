<?php
$nombre = $_POST['p1'];
$email = $_POST['p2'];
$telf = $_POST['p3'];
$mensaje = $_POST['p4'];
$header = 'From: ' . $email . " \r\n";
$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
$header .= "Mime-Version: 1.0 \r\n";
$header .= "Content-Type: text/plain";

$mensaje = "Nombre: " . $nombre . "        Correo: " . $email . "   Telef : " . $telf . "    Mensaje: " . $mensaje . " \r\n";
$para = 'gerencia@corporacionfuentes.com';
$asunto = 'Asunto del mail recibido';
mail($para, $asunto, $mensaje, $header);

echo 'Mensaje enviado correctamente';
?>