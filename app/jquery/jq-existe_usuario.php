<?php
/*
 * Inicio de Sitio Web para Ingreso de Denuncias por parte de ciudadanos
 * Para uso exclusivo de Ministerior del Interior - Republica Oriental de Uruguay
 * Autor: Wilon Denis Arriola
 * 01/10/2013 - Montevideo Uruguay
 * 
 * Pagina jq-existe_usuario
 *
 * Se encarga de consultar en la BD si el usuario o correo que se quiere registrar ya existe
 *
 */
 
$dato = $_POST['m'];
$consulta = $_POST['n'];

include_once '../config/db_connect_jq.php';

if ($mysqli->connect_error) {die(header('Location: error.php?t=econb&n='.$mysqli->connect_errno.'&m='.$mysqli->connect_error));exit;}

if ($consulta == 0){
	$sql = "SELECT id_mid_usuarios FROM mid_usuarios WHERE mid_usuarios_usuario = ?";
}
if ($consulta == 1){
	$sql = "SELECT id_mid_usuarios FROM mid_usuarios WHERE mid_usuarios_correo = ?";
}
	$stmt = $mysqli->prepare($sql) or die(header('Location: error.php?t=edtot&n=id&m=0'));
	$stmt->bind_param("s", $dato);
	$stmt->execute();
	$stmt->store_result();								// almacenamos los resultados
	$t_A = $stmt->num_rows;							// total de registros
	$stmt -> free_result();
	$mysqli->close();
	if ($t_A == 0){$resp = "no";}else{$resp = "si";};
	echo $resp;
?>