<?php
/*
 * Inicio de Sitio Web para Ingreso de Denuncias por parte de ciudadanos
 * Para uso exclusivo de Ministerior del Interior - Republica Oriental de Uruguay
 * Autor: Wilon Denis Arriola
 * 01/10/2013 - Montevideo Uruguay
 * 
 * Pagina jq-agregar_usuarios
 *
 * Se encarga de agregar usuarios de la BD
 * ya se recieben todos los datos preparados para gaurdar en la BD, asi mismo antes de gaurdar se limpian los datso reciibbidos por post
 * para evitar posibles injecciones.
 *
 */

include_once '../config/db_connect_jq.php';

if ($mysqli->connect_error) {die(header('Location: error.php?t=econb&n='.$mysqli->connect_errno.'&m='.$mysqli->connect_error));exit;}

$now = date('Y-m-d');
// usuario recibido por post
$usuario = $_POST['m'];
// contraseña se recibe por POST ya con hex_sha512
$password = $_POST['p'];
// creo el salt para gaurdarlo
$mid_usuarios_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));   	// hash
// uno el pass (con hex_sha512) con el salt
$mid_usuarios_pass = hash('sha512', $password.$mid_usuarios_salt);
// salt se recibe por POST

// nombre real queda en blanco, al iniciar sesion por primera vez se lo exige
$mid_usuarios_nombrereal = "";
// privilegios
	// 1 - usuario
	// 2 - administrador
$id_mid_privilegios = $_POST['o'];
// activado
	// 1 - activado
	// 0 - no activado
$mid_usuarios_activado = 0;
$mid_usuarios_activado_correo = 1;
// correo se recibe por post
$mid_usuarios_correo = $_POST['n'];
$mid_usuarios_fecharegistro = $now;
$mid_usuarios_fechaultima = $now;
$mid_usuarios_logerror = 0;
$mid_usuarios_avatar = '';

$mysqli->query("INSERT INTO mid_usuarios
					(mid_usuarios_usuario, mid_usuarios_pass, mid_usuarios_salt, mid_usuarios_nombrereal, id_mid_privilegios, mid_usuarios_activado, mid_usuarios_activado_correo, mid_usuarios_correo, mid_usuarios_fecharegistro, mid_usuarios_fechaultima, mid_usuarios_logerror, mid_usuarios_avatar)
				VALUES (
				'" . mysql_real_escape_string($usuario) . "',
				'" . mysql_real_escape_string($mid_usuarios_pass) . "',
				'" . mysql_real_escape_string($mid_usuarios_salt) . "',
				'" . mysql_real_escape_string($mid_usuarios_nombrereal) . "',
				'" . mysql_real_escape_string($id_mid_privilegios) . "',
				'" . mysql_real_escape_string($mid_usuarios_activado) . "',
				'" . mysql_real_escape_string($mid_usuarios_activado_correo) . "',
				'" . mysql_real_escape_string($mid_usuarios_correo) . "',
				'$now',
				'$now',
				'" . mysql_real_escape_string($mid_usuarios_logerror) . "',
				'" . mysql_real_escape_string($mid_usuarios_avatar) . "')");
// Cerramos la conexión con el servidor mysql.
$mysqli->close();

echo '<div id="borrame" class="mensajes icon-checkmark-2">El Usuario: '.$usuario.', fue ingresado correctamente!!!</div>'
?>