<?php
/*
 * Inicio de Sitio Web para Ingreso de Denuncias por parte de ciudadanos
 * Para uso exclusivo de Ministerior del Interior - Republica Oriental de Uruguay
 * Autor: Wilon Denis Arriola
 * 01/10/2013 - Montevideo Uruguay
 * 
 * Pagina proceso de inicio
 *
 * Se incluye  archivos necesarios, se inicia el control de errores y de sesion.
 * Para iniciar sesion se recibe el correo como usuario y la contraseña ya cifrada.
 * Para mayor seguridad se utiliza el correo como usaurio, ya q es un dato que nunca esta visible para otros usuarios.
 * Para mayor seguridad la ontraseña es cifrada antes de que el formulario de inicio de sesion sea enviado por POST.
 * Se controla que el usuario y su correo esten activados.
 *
 */
include_once 'config/db_connect.php';
include_once 'funciones/functions.php';
set_error_handler('showErrors'); 
sec_session_start();
 
if(isset($_POST['email'], $_POST['p'])) {
   $email = $_POST['email'];
   $password = $_POST['p'];
   if(login($email, $password, $mysqli) == true) {
        //Inicio de sesión exitosa
		if ($_SESSION['activado'] == '1'){
			if ($_SESSION['activado_correo'] == '1'){
				header('Location: inicio.php');
			}else{
				header('Location: error.php?t=ecrnac&n='. $_SESSION['username'].'&m=0');
			}
		}else{
			header('Location: error.php?t=eusnac&n='. $_SESSION['username'].'&m='.$_SESSION['mid_usuarios_nombrereal']);
		}
   } else {
        //Inicio de sesión fallida
		header('Location: error.php?t=enop&n='.$_POST['email'].'&m=0');
   }
} else {
   // en esta caso estamos ante un posible ataque por paraemtos de url
   $res = 'Se intentó violar la seguridad al inicio de sesion.';
   header('Location: error.php?t=einiatk&n=post&m='.$res);
}
?>