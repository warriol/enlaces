<?php
/*
 * Inicio de Sitio Web uso personal y exclusivo en mi trabajo.
 * Para uso exclusivo del autor.
 * Autor: Wilon Denis Arriola
 * 01/10/2013 - Montevideo Uruguay
 * 
 * Pagina index
 *
 * Se inicia al cargar el sitio y se encarga de controlar que no hayan sido enviados datos por parametro en URL.
 * Luego incluye el verdadero archivo index del sitio.
 *
 */
switch($_SERVER['REQUEST_METHOD'])
{
	case 'GET':
		// echo 'error get: ' . count($_GET) . ' - ' . var_dump($_GET);
		if(count($_GET) == 0 || isset($_GET[i])){
			include('app/index-publico.tpl');
			break;
		}
		//echo 'SE RECIBE GET';
		break;
	case 'POST':
	    include('process_login.php');
		//echo 'SE RECIBE POST';
		break;
	case 'COOKIE':
		echo 'SE RECIBE COOKIE';
		break;
	default:
		header('Location: error.php?t=enorm&n=manteniemitno&m=0');
		break;
}
?>