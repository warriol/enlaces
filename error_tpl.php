<?php
/*
 * Inicio de Sitio Web para Ingreso de Denuncias por parte de ciudadanos
 * Para uso exclusivo de Ministerior del Interior - Republica Oriental de Uruguay
 * Autor: Wilon Denis Arriola
 * 01/10/2013 - Montevideo Uruguay
 * 
 * Pagina includes.error
 *
 * Esta pagina se incluye en el archivo de error, contiene el cuepro html
 *
 */
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>MIDenuncias - Error</title>
    <meta name="description" content="Proyecto Formulario para Denuncias Web - Ministerio del Interior" />
    <meta name="viewport" content="width=device-width" />
    <link rel="shortcut icon" href="favicon_cl.png" />
    <link rel="stylesheet" href="res/css/error.css" />
	<link rel="stylesheet" href="res/css/iconos.css" />
</head>
<body>
<!--[if gt IE 7]>
<p class="chromeframe">Estas usando un explorador <strong>desactualizado</strong>. Porfavor <a href="http://browsehappy.com/">actualice su explorador</a> o <a href="http://www.google.com/chromeframe/?redirect=true">active Google Chrome Frame</a> para mejorar su experiencia.</p>
<![endif]-->
<!-- html -->
<!--	[Seccion de Cabecera, header y formulario de inicio]				INICIO		-->
    <div>
        <div id="head">
            <span id="home"><a href="./index.php" data-tooltip="Inicio."><span class="icon-home iconogrande brillo"></span></a></span>
            <header>
                <div id="logo">
                    <h5 id="subtitulo"><span>Mis enlaces</span></h5>
                </div>
            </header>
         </div>
    </div>
<!--	FIN						[Seccion de Cabecera, header y formulario de inicio]	-->
<!--	[Seccion pirncipa donde se colocara el contenido de paginas]		INICIO		-->
    <div id="principal">
        <section>
			<div id="main"> 
                <div id="container">
                    <h1 class="rojo sombra"><span class="icon-cancel-circle iconoenorme"></span> Se produjo un error...</h1>
                    <div id="unbloque">
                    	<p>Hemos detectado un error y se ha detenido la conexión con el Servidor.</p>
                        <p>La tarea que estaba realizado se ha perdido y deberá comenzar nuevamente. Cierre la sesión actual he inicie una nueva.</p>
                        <p>Si el problema persiste, pongase en contacto con Servicio Técnico, enviando la información que mas abajo se detalla.</p>
                            <div id="micolumna">
                                <div class="noti_titulo sombra"><span class="icon-info azul iconogrande"></span> Por favor, envíenos esta información...</div>
                                <div class="noti_mensaje"><?php echo $result; ?></div>
                            </div>
                        <p id="izquieda">Disculpe las molestias.<br /><a href="./index.php" data-tooltip="Inicio.">Volver</a></p>
                    </div>
                </div> <!-- container -->
            </div> <!-- div final
                	<div class="botonera">
                    	<p></p>
                    </div>
                -->
        </section>
    </div> <!-- principal -->
<!--	FIN			[Seccion pirncipa donde se colocara el contenido de paginas]	-->
<?php include('app/includes-pie.php'); ?>
<!-- html -->
</body>
</html>