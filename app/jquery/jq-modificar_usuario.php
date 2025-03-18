<?php
/*
 * Inicio de Sitio Web para Ingreso de Denuncias por parte de ciudadanos
 * Para uso exclusivo de Ministerior del Interior - Republica Oriental de Uruguay
 * Autor: Wilon Denis Arriola
 * 01/10/2013 - Montevideo Uruguay
 * 
 * Pagina jq-modificar_usuario
 *
 * Obtiene los datos de la BD necesarios par acrear el formulario de modificacion de privilegios
 *
 */
 
$usuario = $_POST['m'];

include_once '../config/db_connect_jq.php';

if ($mysqli->connect_error) {die(header('Location: error.php?t=econb&n='.$mysqli->connect_errno.'&m='.$mysqli->connect_error));exit;}

$sql = "SELECT mid_usuarios_usuario, id_mid_privilegios, mid_usuarios_activado FROM mid_usuarios WHERE	id_mid_usuarios = ?";
		$stmt = $mysqli->prepare($sql) or die(header('Location: error.php?t=edtot&n=id&m=0'));
		$stmt->bind_param('i', $usuario);
		$stmt->execute(); 									// Ejecuta la consulta preparada.
		//$stmt->bind_param("i","1");
		$stmt->store_result();								// almacenamos los resultados
		// $total = $stmt->num_rows;							// total de registros
		$stmt->bind_result($usu, $priv, $act); //vinculamos variables
		$stmt->fetch();
		$res = '
					<div class="window-container form3 zoomin">
					<h3>Modificar Usuario: '.$usu.'</h3>		
						<form id="form_res1" action="" method="post">
						<div id="contenedor_mensajes">
						<fieldset id="mod_usu">
						<!------- Comienza el formulario ------->
						<input type="hidden" id="_id" name="_id" value="'.$usuario.'" />
						<label class="label ui-widget"><span>Privilegios:</span>
							<select id="_priv" name="_priv">
		';
		if($priv == 1){
			$res .= '
									<option value="1" selected="selected">Usuario</option>
									<option value="2">Administrador</option>';
		}else{
			$res .= '
									<option value="1">Usuario</option>
									<option value="2" selected="selected">Administrador</option>';
		}
		$res .= '
							</select>
						</label>
						<label class="label ui-widget"><span>Activado:</span>
							<select id="_act" name="_act">
		';
		if($act == 0){
			$res .= '
									<option value="0" selected="selected">No</option>
									<option value="1">Si</option>';
		}else{
			$res .= '
									<option value="0">No</option>
									<option value="1" selected="selected">Si</option>';
		}
		$res .= '
							</select>
						</label>
						</fieldset>
						</div>
						<!------- Botón de enviar ------->
						<input class="close" value="Enviar" onclick="modificar_usr_1(this.form, this.form._priv, this.form._act);" />
						<span class="close" onclick="ocultar();">Cancelar</span>
						</form>
		';

		$stmt -> free_result();
		// Cerramos la conexión con el servidor mysql.
		$mysqli->close();
		
		echo $res; //'<div id="borrame" class="mensajes icon-checkmark-2"> El Usuario: '.$usuario.', fue eliminado correctamente!!!</div>'
?>