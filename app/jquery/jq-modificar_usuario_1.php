<?php
/*
 * Inicio de Sitio Web para Ingreso de Denuncias por parte de ciudadanos
 * Para uso exclusivo de Ministerior del Interior - Republica Oriental de Uruguay
 * Autor: Wilon Denis Arriola
 * 01/10/2013 - Montevideo Uruguay
 * 
 * Pagina jq-modificar_usuario_1
 *
 * Se encarga de modificar los privilegios y la activacion de los correos
 *
 */
 
$priv = $_POST['m'];
$act = $_POST['n'];
$id = $_POST['o'];

include_once '../config/db_connect_jq.php';

if ($mysqli->connect_error) {die(header('Location: error.php?t=econb&n='.$mysqli->connect_errno.'&m='.$mysqli->connect_error));exit;}

$sql = "UPDATE mid_usuarios SET id_mid_privilegios=?, mid_usuarios_activado=? WHERE	id_mid_usuarios = ?";
		$stmt = $mysqli->prepare($sql) or die(header('Location: error.php?t=edtot&n=id&m=0'));
		$stmt->bind_param('iii', $priv, $act, $id);
		$stmt->execute() or die($stmt->error()); 									// Ejecuta la consulta preparada.
		$stmt -> free_result();
		$mysqli->close();
		
		echo '<div id="borrame" class="mensajes icon-checkmark-2"> Se actualizaron los privilegios correctamente correctamente!!!</div>';
?>