<?php
/*
 * Inicio de Sitio Web para Ingreso de Denuncias por parte de ciudadanos
 * Para uso exclusivo de Ministerior del Interior - Republica Oriental de Uruguay
 * Autor: Wilon Denis Arriola
 * 01/10/2013 - Montevideo Uruguay
 * 
 * Pagina error
 *
 * Esta pagina recibe todos los errores que surgen en el sitio y se encarga de dar un mensaje adecuado al usuario
 * Además puede contar con laposibilidad de crear un log para administradores, y sistema de alerta.
 * Tras detectarse un error de este tipo, por seguridad la sesion actual es destruida.
 *
 */
 
$var = 0;
// Solo se aditen tres valores GETya seteados, en caso diferente se trataría de un intento no autorizado de envio de información.
if(count($_GET) != 3 || !isset($_SERVER['HTTP_REFERER'])){
	$result = 'Se ha intentado violar la seguridad del sitio.<br>';
	$result .= '::>uri::>'.$_SERVER['REQUEST_URI'].'<br>';
}else{
	switch ($_GET['t']) {
		case 'econb':
			$dat = explode("'", $_GET['m']);
			$result = '::>tipo::>econb'.$dat[1].'. <br>';
			$result .= '::>detalle::>error al conectar la base de dato, no existe la base de datos. <br>';
			break;
		case 'enop':
			// t=enop&n='.$_POST['email'].'&m=0
			//	echo "i es igual a 1";
			if ($_GET['m'] == '0'){
				$result = '::>Usuario o contraseña invalida. <br>';
			}
			break;
		case 'ernoini':
			if ($_GET['m'] == '1'){
				$result = '::>Usuario NO AUTORIZADO, su petición no puede ser realizada debido a las restricciones de usuario. <br>';
				$result .= '::>Esto también puede deberse a que su sesión ha caducado, si es así inicie sesión nuevamente.<br>';
			}
			break;
		case 'eusnac':
			// header('Location: error.php?t=eusnac&n='.$username.'&m='.$nombre);
			$var = 1;			
			$res = 'Estimado Usuario Sr/a.: ' . $_GET['m'].'<br>';
			$res .= 'Lamentamos informarle que el Administrador del Sitio mantiene la cuenta asociada al Usuario : "' . $_GET['n'] .'" bloqueada.<br>
					Si Usted entiende que esto se debe a un error pongase en contacto con el Aministrador a través del Sistema de Soporte.<br>
					Si es un Usuario Nuevo, debe esperar a que sus datos sean validados por el Administrador, y una vez hecho esto, su usuario será Activado.<br>
					Si se debe a un reciente Baneo, habra ya recibido un correo electrónico con información detallada del ¿porque? y hasta cuando, se ecuentra Baneado.';
			break;
		case 'ecrnac':
			// header('Location: error.php?t=ecrnac&n='. $_SESSION['username'].'&m=0')
			$var = 1;			
			$res = 'Estimado Usuario Sr/a.: ' . $_GET['n'].'<br>';
			$res .= 'Su datos de inicio de sesión son correctos!.<br>
					Pero el correo asociado a su cuenta aún no ha sido activado.<br>
					Dirijase a su correo electrónico u busque el correo que le hemos enviado; en él encontrará los paso a seguir para activar su cuenta.<br>
					Si nuestro correo no se encuentra en la Bandeja de Entrada, buque en Correo No Deseado, quizas si Sistema Anti SPAM lo ha bloqueado.';
			break;
		case 'enopriv':
			$result = 'Se intentó violar la seguridad del sitio.<br>Usuario sin privilegios!!!!<br>';
			break;
		case 'enopost':
			$result = 'Error en comando jquery.<br>Al incio se datos no se recibe la infromación correcta.';
			break;
		case 'enorm':
			$result = 'El sitio se encuentra en mantenieminto.<br>En breve volverá a estar activo.<br>';
			break;
		case 'einiatk':
			$result = 'Se intentó violar la seguridad del sitio, mediante envio de Get o Post inválidos.<br>';
			$result += '::>Valor: '.$_GET['m'].' - dump: '.$_GET['n'].'<br>';
			break;
		default:
			// header('Location: error.php?t='.$archivon.'n='.$linea.'&m='.$error);
			$var = 1;			
			$res = 'Ha ocurrido un error en el archivo ' . $_GET['t'] . ', linea ' . $_GET['n'] . '
						<br/> ERROR: ' . $_GET['m'] . '
						<br/>Las actuales variables son:' . print_r($GLOBALS, 1);
			// $res .= '<br> DUMP: '.var_dump($_GET);
	}
	if ($var == 0){
		$result .= '::>self::>'.$_SERVER['PHP_SELF'].'<br>';
		$result .= '::>ip::>'.$_SERVER['SERVER_ADDR'].'<br>';
		$result .= '::>time::>'.$_SERVER['REQUEST_TIME'].'<br>';
		$result .= '::>ref::>'.$_SERVER['HTTP_REFERER'].'<br>';
		$result .= '::>browser::>'.$_SERVER['HTTP_USER_AGENT'].'<br>';
		$result .= '::>iprem::>'.$_SERVER['REMOTE_ADDR'].'<br>';
		$result .= '::>uri::>'.$_SERVER['REQUEST_URI'].'<br>';
	}else{
		$result = $res;
	}
}
include 'funciones/functions.php';
sec_session_start();
//Desconfigura todos los valores de sesión
if (isset($stmt)){
	$stmt -> free_result();
	// Cerramos la conexión con el servidor mysql.
	$mysqli->close();
}
$_SESSION = array();
//Obtén parámetros de sesión
$params = session_get_cookie_params();
//Borra la cookie actual
setcookie(session_name(), '', time() - 42000, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
//Destruye sesión
session_destroy();
include('error_tpl.php');
?>