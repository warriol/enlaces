<?php
/*
 * Inicio de Sitio Web para Ingreso de Denuncias por parte de ciudadanos
 * Para uso exclusivo de Ministerior del Interior - Republica Oriental de Uruguay
 * Autor: Wilon Denis Arriola
 * 01/10/2013 - Montevideo Uruguay
 * 
 * Pagina coneccion a la BD
 *
 * Se definen variables para conección a la Base de datos.
 * Si conecta a través de TCP/IP en lugar de un socket de UNIX, agregar el número de puerto como un parámetro.
 *
 */
define("HOST", "localhost"); 		//El alojamiento al que deseas conectarte.
define("USER", "wilsonar_mi"); 			//El nombre de usuario de la base de datos.
define("PASSWORD", "wda43791"); 			//La contraseña de la base de datos.
define("DATABASE", "wilsonar_mi"); 	//El nombre de la base de datos.

$mysqli = @new mysqli(HOST, USER, PASSWORD, DATABASE);

// Funciona en PHP 5.2.9 y 5.3.0.
if ($mysqli->connect_error) {
    die(header('Location: error.php?t=econb&n='.$mysqli->connect_errno.'&m='.$mysqli->connect_error));
	exit;
}
?>