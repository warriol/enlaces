 <?php
ob_start();
header("Content-type: text/javascript");
// url = pptls
// app = 250895068282603
if (isset($_GET['url']) && isset($_GET['app'])){
	
	// verifico el tipo de servidor que esta corriendo
	if($_SERVER["SERVER_NAME"] == "localhost"){
		// servidor local
		$DB_host = "localhost";
		$DB_user = "root";
		$DB_pass = "";
		$DB_name = "b6_3784887_sitio";
		
		$_URLBASE_ = "http://localhost/wda/htdocs/"; // . $_SERVER["REQUEST_URI"];
	}else{
		// servidor externo
		$DB_host = "sql106.byethost6.com";
		$DB_user = "b6_3784887";
		$DB_pass = "wda43791";
		$DB_name = "b6_3784887_sitio";
		
		$_URLBASE_ = "http://" . $_SERVER["SERVER_NAME"]. "/";
	}

	// Creamos la conexion con la base de datos
	$con = @mysqli_connect($DB_host, $DB_user, $DB_pass, $DB_name) or die("document.write('Error al conectar a la BD.');");
	
	// Obtenemos, y validamos enlace actual
	$enlace = $_GET['url'];
	/*
	if (!$enlace || $enlace == '') {
		die();
	}
	*/
	// Obtenemos los datos de la base de datos
	$sql = "SELECT visitas FROM megusta WHERE url='$enlace'";
	$query = mysqli_query($con, $sql);
	$row = mysqli_fetch_assoc($query);
	
	/*creamos los codigos querys verificando primero las cookies, para contar visitas y no impresiones web*/
	if (isset($_COOKIE[md5($enlace)])) {
		// si existe la cookie solo le damos el valor a $visitas
		$visitas = $row['visitas'];
		echo "document.write($visitas);";
	} elseif (!isset($_COOKIE[md5($enlace)])) {
		// Comprobamos si el enlace ya esta en la base de datos
		$rows = mysqli_num_rows($query);
		if ($rows > 0) {
			// Cuando exista lo enlace actualizamos
			$SQL = "UPDATE megusta SET visitas=visitas+1 WHERE url='$enlace'";
			if (mysqli_query($con, $SQL)) { // Si se inserta la visita
				$visitas = ($row['visitas']) + (1); // Le sumamos uno para mostrar la visita actual
				echo "document.write($visitas);";
				setcookie(md5($enlace), '_vStD', time() + 21600); // Y creamos la cookie de 6 hs
			} else { // Si no se inserta la visita
				$visitas = $row['visitas']; // Solo obtenemos las visitas
				echo "document.write($visitas);";
			}
		} elseif ($rows == 0) {
			// Cuando no existe el enlace en la base de datos la insertamos
			$SQL = "INSERT INTO megusta (url,visitas) VALUES ('$enlace',1)";
			if (mysqli_query($con,$SQL)) { // Si se inserta la nueva enlace
				echo "document.write(1);";
				setcookie(md5($enlace), '_vStD', time() + 86400); // Y creamos la cookie de 1 dia
			} else { // Si no se inserta mostramos
				echo "document.write(0);";
			}
		}
	}
	
	mysqli_close($con);
}else{
	echo "document.write('err');";
}
// Por ultimo cerramos la conexion, y cerramos el script
ob_end_flush();
die();
?>