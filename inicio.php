<!--[@AUTOR:WILSON DENIS ARRIOLA_2021]-->
<?php
/*
 * 
 * Pagina inicio
 *
 * Esta página se incluye en todos los script, es la encargada de verificar que la sesión este activa.
 * Que el usuarios este validado, y además es la que detecta errores y los redirige a la pagina correspondiente.
 * El inicio de sesion es personalizado para evitar abusos por formas ya conocidas.
 * Al iniciar sesion, dependiendo de q se trate de un usuarios o administrador, se muestra en inicio para cada uno.
 *
 */

// Se incluyen archivos necesarios
include_once 'config/db_connect.php';
include_once 'funciones/functions.php';
// Se inicia el controlador de errores
set_error_handler('showErrors'); 
// Incio y control de sesion
sec_session_start();

if(count($_GET) != 0){
  // si llega parametro por get
  // verificamos que sea un valor p, si no lo es se envia error
  if(isset($_GET["p"])){
    $p = $_GET["p"];
    include 'app/index-contenido.tpl';
  }else{
    $div = array("&");
    $res = str_replace($div, "-", $_SERVER['REQUEST_URI']);
    header('Location: error.php?t=einiatk&n=get&m='.$res);
  }

}else{
  if(login_check($mysqli) == true) {
    if ( !isset($_SESSION['id_pag']) )
      $_SESSION['id_pag'] = 0;
    switch($_SESSION['privilegio']) {
    case 'administrador':
      //include 'app/index-contenido.tpl';
      //break;  
    case 'usuario':
      include 'app/index-contenido.tpl';
      break;
    default:
      header('Location: error.php?t=enopriv&n=nopriv&m=0');
      break;
    }
  } else {
    header('Location: error.php?t=ernoini&n=noautorizado&m=1');
  }
}

?>