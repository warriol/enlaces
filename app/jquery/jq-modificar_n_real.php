<?php
/*
 * Inicio de Sitio Web para Ingreso de Denuncias por parte de ciudadanos
 * Para uso exclusivo de Ministerior del Interior - Republica Oriental de Uruguay
 * Autor: Wilon Denis Arriola
 * 01/10/2013 - Montevideo Uruguay
 * 
 * Pagina jq-modificar_n_real
 *
 * Moficia el nomb ereal en la BD
 *
 */
 
$nom = $_POST['n'];
$id = $_POST['m'];

include_once '../config/db_connect_jq.php';

if ($mysqli->connect_error) {die(header('Location: error.php?t=econb&n='.$mysqli->connect_errno.'&m='.$mysqli->connect_error));exit;}

$sql = "UPDATE mid_usuarios SET mid_usuarios_nombrereal=? WHERE	id_mid_usuarios = ?";
		$stmt = $mysqli->prepare($sql) or die(header('Location: error.php?t=edtot&n=id&m=0'));
		$stmt->bind_param('si', $nom, $id);
		$stmt->execute() or die($stmt->error()); 									// Ejecuta la consulta preparada.
		$stmt -> free_result();
		$mysqli->close();
		
		echo '<div id="borrame" class="mensajes icon-checkmark-2"> Se actualizó el Nombre Real correctamente correctamente!!!</div>';
?>