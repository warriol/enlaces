<?php
/*
 * Inicio de Sitio Web para Ingreso de Denuncias por parte de ciudadanos
 * Para uso exclusivo de Ministerior del Interior - Republica Oriental de Uruguay
 * Autor: Wilon Denis Arriola
 * 01/10/2013 - Montevideo Uruguay
 * 
 * Pagina functions
 *
 * Se encarga de controlar el inicio de sesion, sesion activa y datos de usuarios
 */
// control de errores
function showErrors ($numero, $error, $archivo, $linea) {
	header('Location: error.php?t='.$archivo.'&n='.$linea.'&m='.$error);
	// echo 'Ha ocurrido un error en el archivo ' . $archivo . ', la linea ' . $linea . '<br/> ERROR: ' . $error . '<br/>Las actuales variables son:' . print_r($GLOBALS, 1);
}

function sec_session_start() {
	$session_name = 'sec_session_id'; 							//Configura un nombre de sesión personalizado
	$secure = false; 											//Configura en verdadero (true) si utilizas https
	$httponly = true; 											//Esto detiene que javascript sea capaz de accesar la identificación de la sesión.
	ini_set('session.use_only_cookies', 1); 					//Forza a las sesiones a sólo utilizar cookies.
	$cookieParams = session_get_cookie_params(); 				//Obtén params de cookies actuales.
	session_set_cookie_params($cookieParams["lifetime"], $cookieParams["path"], $cookieParams["domain"], $secure, $httponly);
	session_name($session_name); 								//Configura el nombre de sesión a el configurado arriba.
	session_start(); 											//Inicia la sesión php
	session_regenerate_id(true); 								//Regenera la sesión, borra la previa.
}

function login($email, $password, $mysqli) {
   //Uso de sentencias preparadas significa que la inyección de SQL no es posible.
   if ($stmt = $mysqli->prepare("SELECT id_mid_usuarios, mid_usuarios_usuario, mid_usuarios_pass, mid_usuarios_salt, mid_usuarios_nombrereal, id_mid_privilegios, mid_usuarios_activado, mid_usuarios_activado_correo, mid_usuarios_correo, mid_usuarios_fecharegistro FROM mid_usuarios WHERE mid_usuarios_correo = ? LIMIT 1")) {
		$stmt->bind_param('s', $email); //Liga "$email" a parámetro.
		$stmt->execute(); //Ejecuta la consulta preparada.
		$stmt->store_result();
		$stmt->bind_result($user_id, $username, $db_password, $salt, $nombre, $id_mid_privilegios, $usuarios_activado, $activado_correo, $correo, $freg); //Obtiene las variables del resultado.
		$stmt->fetch();
		$password = hash('sha512', $password.$salt); //Hash de la contraseña con salt única.
		echo $password;
		echo ' ';
		echo $db_password;
		//c6588c2f9d3ef4a1484291fb69a1621d2e5e34474e4f4ec19e1e22295f6986e3e5b33602282df563224805113deac0d3e2f4f4d52868c52033bbe52b16ca4bba
		if($stmt->num_rows == 1) { //Si el usuario existe.
		//Revisamos si la cuenta está bloqueada de muchos intentos de conexión.
		if(checkbrute($user_id, $mysqli) == true) {
			//La cuenta está bloqueada
			//Envia un correo electrónico al usuario que le informa que su cuenta está bloqueada
			$stmt -> free_result();
			// Cerramos la conexión con el servidor mysql.
			$mysqli->close();
			return false;
		} else {
			if($db_password == $password) { //Revisa si la contraseña en la base de datos coincide con la contraseña que el usuario envió.
			//¡La contraseña es correcta!
				// Usuario Activado
					$user_browser = $_SERVER['HTTP_USER_AGENT']; //Obtén el agente de usuario del usuario
					$user_id = preg_replace("/[^0-9]+/", "", $user_id); //protección XSS ya que podemos imprimir este valor
					$_SESSION['user_id'] = $user_id;
					$username = preg_replace("/[^a-zA-Z0-9_\-]+/", "", $username); //protección XSS ya que podemos imprimir este valor
					$_SESSION['username'] = $username;
					$_SESSION['mid_usuarios_nombrereal'] = $nombre;
					$_SESSION['login_string'] = hash('sha512', $password.$user_browser);
					$_SESSION['privilegio'] = dame_privilegios($id_mid_privilegios, $mysqli);
					$_SESSION['activado'] = $usuarios_activado;
					$_SESSION['activado_correo'] = $activado_correo;
					//Inicio de sesión exitosa
					$stmt -> free_result();
					// Cerramos la conexión con el servidor mysql.
					$mysqli->close();
					return true; 
			} else {
					//La conexión no es correcta
					//Grabamos este intento en la base de datos
					$now = time();
					$mysqli->query("INSERT INTO mid_login_attempts (id_mid_usuarios, mid_login_attempts_time) VALUES ('$user_id', '$now')");
					$stmt -> free_result();
					// Cerramos la conexión con el servidor mysql.
					$mysqli->close();
					return false;
			}
		}
	} else {
	//No existe el usuario.
	$stmt -> free_result();
	// Cerramos la conexión con el servidor mysql.
	$mysqli->close();
	return false;
	}
   }
}

function dame_privilegios($id_mid_privilegios, $mysqli){
	// 1 - usuario
	// 2 - administrador
     if ($stmt = $mysqli->prepare("SELECT mid_privilegios_nombre FROM mid_privilegios WHERE id_mid_privilegios = ? LIMIT 1")) {
        $stmt->bind_param('i', $id_mid_privilegios); //Liga "$user_id" a parámetro.
        $stmt->execute(); //Ejecuta la consulta preparada.
        $stmt->store_result();
        $stmt->bind_result($val); //Obtén variables del resultado.
		$stmt->fetch();
		return $val;  // retornamos el texto de privilegio
	}

}

function checkbrute($user_id, $mysqli) {
   //Obtén timestamp en tiempo actual
   $now = time();
   //Todos los intentos de inicio de sesión son contados desde las 2 horas anteriores.
   $valid_attempts = $now - (2 * 60 * 60);
   if ($stmt = $mysqli->prepare("SELECT mid_login_attempts_time FROM mid_login_attempts WHERE id_mid_usuarios = ? AND mid_login_attempts_time > '$valid_attempts'")) {
        $stmt->bind_param('i', $user_id);
        //Ejecuta la consulta preparada.
        $stmt->execute();
        $stmt->store_result();
        //Si ha habido más de 5 intentos de inicio de sesión fallidos
        if($stmt->num_rows > 5) {
        	return true;
        } else {
        	return false;
        }
   }
}

function login_check($mysqli) {
   //Revisa si todas las variables de sesión están configuradas.
if(isset($_SESSION['user_id'], $_SESSION['username'], $_SESSION['login_string'])) {
     $user_id = $_SESSION['user_id'];
     $login_string = $_SESSION['login_string'];
     $username = $_SESSION['username'];
     $user_browser = $_SERVER['HTTP_USER_AGENT']; //Obtén la cadena de caractéres del agente de usuario
 
     if ($stmt = $mysqli->prepare("SELECT mid_usuarios_pass FROM mid_usuarios WHERE id_mid_usuarios = ? LIMIT 1")) {
        $stmt->bind_param('i', $user_id); //Liga "$user_id" a parámetro.
        $stmt->execute(); //Ejecuta la consulta preparada.
        $stmt->store_result();
        if($stmt->num_rows == 1) { //Si el usuario existe
        $stmt->bind_result($password); //Obtén variables del resultado.
		$stmt->fetch();
		$stmt->free_result();
		// Cerramos la conexión con el servidor mysql.
		$mysqli->close();
        $login_check = hash('sha512', $password.$user_browser);
        if($login_check == $login_string) {
                //¡¡¡¡Conectado!!!!
                return true;
        } else {
                //No conectado
                return false;
        }
        } else {
                //No conectado
                return false;
        }
     } else {
        //No conectado
        return false;
     }
   } else {
     //No conectado
     return false;
   }
}
?>