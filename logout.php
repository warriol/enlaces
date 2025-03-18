<?php
/*
 * Inicio de Sitio Web para Ingreso de Denuncias por parte de ciudadanos
 * Para uso exclusivo de Ministerior del Interior - Republica Oriental de Uruguay
 * Autor: Wilon Denis Arriola
 * 01/10/2013 - Montevideo Uruguay
 * 
 * Pagina cerrar sesion
 *
 * Se carga la funcion correspondiente y se destruye la sesión actual.
 *
 */
include_once 'funciones/functions.php';
sec_session_start();
//Desconfigura todos los valores de sesión
$_SESSION = array();
//Obtén parámetros de sesión
$params = session_get_cookie_params();
//Borra la cookie actual
setcookie(session_name(), '', time() - 42000, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
//Destruye sesión
session_destroy();
header('Location: ./index.php');
?>