<?php
/*
 * Inicio de Sitio Web para Ingreso de Denuncias por parte de ciudadanos
 * Para uso exclusivo de Ministerior del Interior - Republica Oriental de Uruguay
 * Autor: Wilon Denis Arriola
 * 01/10/2013 - Montevideo Uruguay
 * 
 * Pagina jq-ver_perfil
 *
 * Se encargar de solicitar y mostrar la información del perfil de usuario
 * La conecciones por jquery cuentan con autenticación de sql incluida, pude usarse usuario diferente
 *
 */
$dato = $_POST['m']; // id de usuario

// include_once '../config/db_connect_jq.php';

if ($mysqli->connect_error) {die(header('Location: error.php?t=econb&n='.$mysqli->connect_errno.'&m='.$mysqli->connect_error));exit;}

	$sql = "SELECT mid_usuarios_usuario, mid_usuarios_nombrereal, mid_usuarios_activado_correo, mid_usuarios_correo, mid_usuarios_fecharegistro FROM mid_usuarios WHERE id_mid_usuarios = ?";

	$stmt = $mysqli->prepare($sql) or die(header('Location: error.php?t=edtot&n=id&m=0'));
	$stmt->bind_param("i", $dato);
	$stmt->execute(); 									// Ejecuta la consulta preparada.
	$stmt->store_result();								// almacenamos los resultados
	$stmt->bind_result($usu, $nom, $act, $correo, $freg); //vinculamos variables
	$stmt->fetch();
$resp = '
		<div id="contenedor_mensajes"></div>
		<div id="main"> 
			<div class="aux">
				<aside>
					<h1><span class="icon-user-4 iconogrande"></span> Perfil de usuario... '. $usu .'</h1>
					<div id="micolumna2">
						<div class="noti_titulo2">Datos Personales</div>
						<div class="noti_mensaje2">
						<br>
							<form id="form_enliena" method="post">
							<fieldset>
							<legend>Cambiar Nombre Real</legend>
							<input type="hidden" id="_id" name="_id" value="'.$_POST['m'].'" />
								<input id="_nom" name="_nom" value="'. $nom .'" />
								<input class="btn_linea" value="Enviar" onclick="modificar_n_real(this.form);" />
							</fieldset>
							</form>
							<p><span class="negrita">Correo activado:</span> ';
				if($act == 0){ $resp .= 'No';}else{ $resp .= 'Si';}
		
		$resp .=	'		</p>
							<p><span class="negrita">Correo asociado:</span> '. $correo .'</p>
							<p><span class="negrita">Fecha de registro:</span> '. $freg .'</p>
						</div>
					</div>
					<div id="micolumna2">
						<div class="noti_titulo2">Cambiar contraseña</div>
						<div id="contenedor_mensajes_pass"></div>
						<div class="noti_mensaje2">
							<div id="contenedor_mensajes">
							<br>
								<form id="form1" action="" method="post">
									<fieldset>
					                	<input type="hidden" id="_i" name="_i" value="'.$_POST['m'].'" />
										<p><label class="label" >
											<span>Contraseña actual: </span>
											<input type="text" id="_a" name="_a" placeholder="actual" required autofocus />
										</label></p>
										<p><label class="label" >
											<span>Contraseña Nueva: </span>
											<input type="text" id="_n" name="_n" placeholder="nueva" required />
										</label></p>
										<p><label class="label" >
											<span>Repetir Contraseña: </span>
											<input type="text" id="_r" name="_r" placeholder="repetir" required />
										</label></p>
									</fieldset>
									<input class="close" value="Enviar" onclick="modificar_pass(this.form);" />
								</form>
							</div>
						</div>
					</div>
					<!-- <aside>Cambiar contraseña</aside> -->
				</aside>
			</div>
		</div
';


	$stmt -> free_result();
	$mysqli->close();

	echo $resp;
?>