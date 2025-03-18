<?php
/*
m:i,n:a,o:b,p:c
*/
include_once '../config/db_connect_jq.php';

if ($mysqli->connect_error) {die(header('Location: error.php?t=econb&n='.$mysqli->connect_errno.'&m='.$mysqli->connect_error));exit;}

$id_u = $_POST['m']; // id
$p_a = $_POST['n']; // pass antigua
$p_n = $_POST['o']; // pass nueva

//FB::log('Log message');

// creo el salt para gaurdarlo
$nuevo_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));   	// hash
// uno el pass (con hex_sha512) con el salt
$nuevo_pass = hash('sha512', $p_n.$nuevo_salt);
// salt se recibe por POST

// verifico que la contraseña antigua es correcta
	$sql = "SELECT mid_usuarios_pass, mid_usuarios_salt FROM mid_usuarios WHERE id_mid_usuarios = ? LIMIT 1";
   		$stmt = $mysqli->prepare($sql) or die(header('Location: error.php?t=edtot&n=id&m=0'));
		$stmt->bind_param('i', $id_u); //Liga "$email" a parámetro.
		$stmt->execute(); //Ejecuta la consulta preparada.
		$stmt->store_result();
		$row = $stmt->num_rows;
		$stmt->bind_result($password, $salt); //Obtiene las variables del resultado.
		$stmt->fetch();
		// $viejo_pass = hash('sha512', $password.$salt); //Hash de la contraseña con salt única.
		$actual_pass = hash('sha512', $p_a.$salt); //Hash de la contraseña con salt única.
/*		
	echo 'rows: '.$row.'<br>';
	echo 'pass de la DB: '.$password.'<br>';
	echo 'salt de la DB: '.$salt.'<br>';
	echo 'p_a: '.$p_a.'<br>';
	echo 'id: '.$id_u.'<br>';
	echo 'passactual+salt DB: '.$actual_pass.'<br>';
*/
	$nuevo_pass = mysql_real_escape_string($nuevo_pass);
	$nuevo_salt = mysql_real_escape_string($nuevo_salt);
	$id_u = mysql_real_escape_string($id_u);
		
		if($row == 1) { //Si el usuario existe.
			if($actual_pass == $password) { //Revisa si la contraseña en la base de datos coincide con la contraseña que el usuario envió.
			//¡La contraseña es correcta!
			$sql = '';
				$stmt = $mysqli->prepare("UPDATE mid_usuarios SET
											mid_usuarios_pass = ?,
										   	mid_usuarios_salt = ?
										  WHERE
											id_mid_usuarios = ?");
				$stmt->bind_param('ssi', $nuevo_pass, $nuevo_salt, $id_u);
				$stmt->execute();
				$stmt -> free_result();
				$mysqli->close();
				// actualizo la base de datos con salt y pass nuevo
				echo '<div id="borrame" class="mensajes_ch icon-checkmark-2"> Se Actualizó su contraseña de forma correcta.</div>';
				return true; 
			} else {
				//La conexión no es correcta
				//Grabamos este intento en la base de datos
				$now = time();
				$mysqli->query("INSERT INTO mid_login_attempts (id_mid_usuarios, mid_login_attempts_time) VALUES ('$id_u', '$now')");
				$stmt -> free_result();
				// Cerramos la conexión con el servidor mysql.
				$mysqli->close();
				echo '<div id="borrame" class="mensajes_ch_mal icon-cancel-circle "> La contraseña actual que ingresó es incorrecta.</div>';
			}
		}else{
			echo '<div id="borrame" class="mensajes_ch_mal icon-cancel-circle "> La contraseña actual que ingresó es incorrecta, o esta duplicada.'.$row.'</div>';
		}
/*
	}else{
		//No existe el usuario.
		$stmt -> free_result();
		// Cerramos la conexión con el servidor mysql.
		$mysqli->close();
		echo '<div id="borrame" class="mensajes_ch_mal icon-cancel-circle "> La contraseña actual que ingresó es incorrecta.</div>';
	}
/*
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
*/
// Cerramos la conexión con el servidor mysql.

?>