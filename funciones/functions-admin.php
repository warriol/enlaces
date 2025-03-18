<?php
/*
 * Inicio de Sitio Web para Ingreso de Denuncias por parte de ciudadanos
 * Para uso exclusivo de Ministerior del Interior - Republica Oriental de Uruguay
 * Autor: Wilon Denis Arriola
 * 01/10/2013 - Montevideo Uruguay
 * 
 * Pagina funciones-admin
 *
 * aqui se colocan todas las funciones relacionadas con el administrador
 * estas se utilizan para todo lo relacionado con el sitio y en especial con la BD y su mantenimiento sobre usuarios
 *
 */
function dame_tbl($tbl, $mysqli){
// ya etsamos conectados
	if ($stmt = $mysqli->prepare("SELECT
										mid_usuarios_usuario, mid_usuarios_nombrereal, id_mid_privilegios, mid_usuarios_activado, mid_usuarios_activado_correo,
										mid_usuarios_correo, mid_usuarios_fecharegistro, mid_usuarios_fechaultima, mid_usuarios_logerror, mid_usuarios_avatar
									FROM 
										mid_usuarios")){	// preparo consulta
        $stmt->execute(); 									// Ejecuta la consulta preparada.
        $stmt->store_result();								// almacenamos los resultados
		$total = $stmt->num_rows;							// total de registros
        $stmt->bind_result($usu, $nrl, $priv, $act, $actc, $correo, $fin, $fult, $log, $img); //vinculamos variables
		// dibujo la tabla
		echo "<table border='1'>";
		echo "<tr><th>Usuario</th><th>Nombre</th><th>priv</th><th>act</th><th>act correo</th><th>correo</th><th>f. reg.</th><th>f. ult.</th><th>err</th><th>img</th></tr>";
		while ($stmt->fetch()){
			echo "<tr><td>".$usu."</td><td>".$nrl."</td><td>".$priv."</td><td>".$act."</td><td>".$actc."</td><td>".$correo."</td><td>".$fin."</td><td>".$fult."</td><td>".$log."</td><td>".$img."</td></tr>";
		}
		echo "</table>";
		$stmt -> free_result();
		// Cerramos la conexión con el servidor mysql.
		$mysqli->close();
	}else{return 'error al seleccionar';}
}
?>