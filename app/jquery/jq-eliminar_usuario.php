<?php
/*
 * Inicio de Sitio Web para Ingreso de Denuncias por parte de ciudadanos
 * Para uso exclusivo de Ministerior del Interior - Republica Oriental de Uruguay
 * Autor: Wilon Denis Arriola
 * 01/10/2013 - Montevideo Uruguay
 * 
 * Pagina jq-eliminar_usuario
 *
 * Se encarga de eliminar usuarios de la BD
 *
 */
 
$usuario = $_POST['m'];

include_once '../config/db_connect_jq.php';

if ($mysqli->connect_error) {die(header('Location: error.php?t=econb&n='.$mysqli->connect_errno.'&m='.$mysqli->connect_error));exit;}

$stmt = $mysqli->prepare("DELETE FROM mid_usuarios WHERE id_mid_usuarios = ?");
$stmt->bind_param('i', $usuario);
$stmt->execute(); 
$stmt->close();
echo '<div id="borrame" class="mensajes icon-checkmark-2"> El Usuario: '.$usuario.', fue eliminado correctamente!!!</div>'
?>