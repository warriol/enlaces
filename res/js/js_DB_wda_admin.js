/**
*			FUNCION PARA TRABAJAR CON INDEXEDDB
*			WILSON DENIS ARRIOLA - 2015
*			warriol@gmail.com
*			ADMIN.HTML
*/
if(window.sessionStorage){console.log("soportaSessionStorage ...  [ok]");soportaSessionStorage=true;}else{soportaSessionStorage=false;console.log("soportaSessionStorage ...  [err]");throw new Error('Tu Browser no soporta LocalStorage!');}


function indexedWda(sSS) {
	/**
	*					VERIFICO LAS OPCIONES DEL NAVEGADOR Q USA EL USUARIO
	*/

	var explorador;
	//explorador = '[JavaScript Activado: ' + navigator.javaEnabled() + ' ] '; /* JAVASCRIPT */
	//explorador += '[idioma: ' + navigator.language + ' ] ';	/* IDIOMA */
	//explorador += '[verision: ' + navigator.appVersion + '] '; /* VERSION */
	//explorador += "[Nombre: " + navigator.appName + " ] [Codigo:  " + navigator.appCodeName + " ] "; /* NOMBE */
	//explorador += "[Cookies Activadas: " + navigator.cookieEnabled + ' ]'; /* COOKIES */
	//explorador += '[viene de: ' + document.referrer + ' ]';

	//document.getElementById("demo").innerHTML = explorador;
	/**
	*					NECESARIOS
	*/
	window.indexedDB 		= window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.OIndexedDB;
	window.IDBTransaction 	= window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || window.OIDBTransaction;
	window.IDBKeyRange 		= window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
	/**
	*         CONSTANTES
	*/
	const DB_NAME				= 'arriola_DB';
	const DB_VERSION			= 2;                /* no usar numeros decimales */
	const DB_STORE_USUARIOS		= 'usuarios';
	const DB_STORE_PROBLEMAS	= 'problemas';
	const DB_STORE_PROTOCOLO	= 'protocolo';
	const DB_STORE_CODIGOPENAL	= 'codigopenal';
	/**
	*         VARIABLES
	*/
	var db;                                         /* variable para guardar la conexion a la DB */
	var dentroFuera				= 1;
	var consoleLogWda			= true;
	var consoleErrorWda			= true;
	var soportaSessionStorage	= sSS;
	var modoDebug				= false;
	/* CONTADORES */
	var contCorreos = 1;
	var contAdmins = 1;
	var contLlamadas = 1;
	var contCursos = 1;
	var contOtros = 1;
	/* USUARIOS */
	var obj                   	= {usuario: "Wilson",clave: "admin",permiso: 4,correo: "warrio@gmail.com",nombre: "Wilson",apellido: "Arriola",sesion: 0};
	var usuarioJSON 			= {key:0,usuario: "invitado",nombre: "Invitado",iniciado: false,permiso: 0,sesion: 0};
	var usuarioAGuardar 		= JSON.stringify(usuarioJSON);
	var usuarioGuardado;
	var permisoUsuario 			= {1: "NO ACTIVADO",2: "USUARIO",3: "ADMINISTRADOR",4: "SUPER USUARIO"};
	/* CODIGO PENAL */
	var cpLibTitCap				= {"Libros":["Libro 1","Libro 2","Libro 3"],"Titulos":[["Titulo I - Parte General","Titulo II - De las Circunstancias que eximen de Pena","Titulo III - De las Circunstancias que alteran el Grado de la Pena","Titulo IV - Del Concurso de Delitos y Delincuentes","Titulo V - De las Penas","Titulo VI - De las Medidas de Seguridad","Titulo VII - De los efectos Civiles del Delito","Titulo VIII - De la extincion de los Delitos y de las Penas"],["Titulo I - De los delitos contra la soberania del Estado, contra los Estados extranjeros, sus Jefes o representantes","Titulo II - Delitos contra el orden Politico interno de un estado","Titulo III - Delitos contra la Paz Publica","Titulo IV - Delitos contra la Administracion Publica","Titulo V - De los delitos contra la administracion de la Justicia","Titulo VI - Delitos contra la Seguridad Publica","Titulo VII - Delitos contra la Salud Publica","Titulo VIII - De los Delitos contra la Fe Publica","Titulo IX - Delitos contra la Economia y la Hacienda Publica","Titulo X - De los delitos contra las buenas costumbres","Titulo XI - Delitos contra la Libertad","Titulo XII - De los Delitos contra la Personalidad Fisica y Moral del Hombre","Titulo XIII - Delitos contra la Propiedad"],["Titulo I - De las Faltas"]],"Capitulos":[[["CAPITULO I Principios generales","CAPITULO II De la aplicacion de las leyes penales","CAPITULO III De la culpabilidad"],["CAPITULO I De las causas de justificacion","CAPITULO II De las causas de inimputabilidad","CAPITULO III De las causas de impunidad"],["CAPITULO I De las circunstancias atenuantes","CAPITULO II De las circunstancias agravantes","CAPITULO III Efectos de las circunstancias agravantes y atenuantes, de su concurrencia, y de su comunicabilidad"],["CAPITULO I Formas de la reiteracion","CAPITULO II Del concurso de delincuentes"],["CAPITULO I De su enumeracion y clasificacion","CAPITULO II De sus limites, naturaleza y efectos","CAPITULO III De su aplicacion"],["CAPITULO I De su regimen"],["CAPITULO I De su regimen"],["CAPITULO I De la extincion del delito","CAPITULO II De la extincion de la pena"]],[["CAPITULO I Delitos contra la patria","CAPITULO II Delitos contra los estados extranjeros, sus jefes o representantes"],["CAPITULO I","CAPITULO II"],["CAPITULO I"],["CAPITULO I","CAPITULO II Abuso de autoridad y violacion de los deberes inherentes a una funcion publica","CAPITULO III De la usurpacion de funciones publicas y titulos","CAPITULO IV De la violacion de sellos y de la apropiacion por el secuestre de cosas depositadas por la autoridad","CAPITULO V De la violencia y la ofensa a la autoridad publica","CAPITULO VI Disposiciones comunes a los capitulos precedentes"],["CAPITULO I","CAPITULO II","CAPITULO III Evasion y quebrantamiento de condena","CAPITULO IV Prevaricato","CAPITULO V","CAPITULO VI","CAPITULO VII Duelo"],["CAPITULO I","CAPITULO II","CAPITULO III","CAPITULO IV"],["CAPITULO I"],["CAPITULO I","CAPITULO II Falsificacion documentaria","CAPITULO III De la falsificacion de sellos o instrumentos o signos de autenticacion, certificacion o reconocimiento","CAPITULO IV","CAPITULO V Delitos de marcas de fabrica y de comercio"],["CAPITULO I","CAPITULO II Destruccion de materias primas o de productos industriales o de medios de produccion","CAPITULO III Contrabando"],["CAPITULO I De la suposicion y de la supresion de estado civil","CAPITULO II Bigamia y otros matrimonios ilegales","CAPITULO III Rapto","CAPITULO IV De la violencia carnal, corrupcion de menores, ultraje publico al pudor","CAPITULO V Espectaculos y publicaciones inmorales y pornograficos","CAPITULO VI Omision de los deberes inherentes al ejercicio de la patria potestad y la tutela"],["CAPITULO I De los delitos contra la libertad individual","CAPITULO II De los delitos contra la inviolabilidad del domicilio","CAPITULO III Delitos contra la inviolabilidad del secreto","CAPITULO IV De los delitos contra la libertad politica","CAPITULO V De los delitos contra la libertad de cultos y el sentimiento religioso"],["CAPITULO I","CAPITULO II","CAPITULO III","CAPITULO IV","CAPITULO V","CAPITULO VI Difamacion e injuria"],["CAPITULO I Delitos contra la propiedad mueble, con violencia en las cosas","CAPITULO II Delitos contra la propiedad mueble, con violencia en las personas","CAPITULO III Delitos contra la propiedad mueble, mediante engaÃ±o","CAPITULO IV Delitos contra la propiedad mueble, de la que se esta en posesion","CAPITULO V Delitos contra la propiedad inmueble","CAPITULO VI Delitos contra la propiedad mueble o inmueble"]],["CAPITULO I De las faltas contra el orden publico","CAPITULO II De las faltas contra la moral y las buenas costumbres","CAPITULO III De las faltas contra la salubridad publica","CAPITULO IV De las faltas contra la integridad fisica","CAPITULO V De las faltas contra la propiedad"]]};
	/* JSON Codigo Penal Capito 1 al 3 */
	var objCPTICI_III 			= { "art": [{ "ltc": "001","art": 1, "artT": " (Concepto del delito)", "artD": "Es delito toda acción u omisión expresamente prevista por la ley penal. Para que ésta se considere tal, debe contener una norma y una sanción.", "artI": 0, "artID": "", "artL": "", "artLD": ""}, { "ltc": "001","art": 2, "artT": " (División de los delitos)", "artD": "Los delitos, atendida su gravedad se dividen en delitos y faltas. Las faltas se rigen por lo dispuesto en el Libro III de este Código.", "artI": 0, "artID": "", "artL": "", "artLD": ""}, { "ltc": "001","art": 3, "artT": " (Relación de causalidad)", "artD": "Nadie puede ser castigado por un hecho previsto por la ley como delito, si el daño o el peligro del cual depende la existencia del delito, no resulta ser la consecuencia de su acción o de su omisión. No impedir un resultado que se tiene la obligación de evitar, equivale a producirlo.", "artI": 0, "artID": "", "artL": "", "artLD": ""}, { "ltc": "001","art": 4, "artT": " (De la concausa)", "artD": "No se responde de la concausa preexistente, superviniente o simultánea, independiente del hecho, que no se ha podido prever. La que se ha podido prever y no se ha prevista, será tenida en cuenta por el Juez para rebajar la pena, según su criterio, de acuerdo con las circunstancias del caso, y lo dispuesto en el artículo 18.", "artI": 0, "artID": "", "artL": "", "artLD": ""}, { "ltc": "001","art": 5, "artT": " (De la tentativa y del delito imposible)", "artD": "Es punible el que empieza la ejecución de un delito por actos externos y no realiza todos los que exige su consumación, por causas independientes de su voluntad. El desistimiento voluntario exime de responsabilidad, salvo que los actos ejecutados constituyan, por sí mismos, un delito. Se hallan exentos de pena los actos inadecuados para cometer el delito, o porque el fin que se propone el agente es absolutamente imposible, o porque resultan absolutamente inidóneos los medios puestos en práctica por él. En tales casos el Juez queda facultado para adoptar medidas de seguridad respecto del agente, si lo considera peligroso.", "artI": 0, "artID": "", "artL": "", "artLD": ""}, { "ltc": "001","art": 6, "artT": " (Del castigo de las faltas)", "artD": "Las faltas sólo se castigan cuando hubieran sido consumadas.", "artI": 0, "artID": "", "artL": "", "artLD": ""}, { "ltc": "001","art": 7, "artT": " (Del acto preparatorio, de la conspiración y de la proposición)", "artD": "La proposición, la conspiración y el acto preparatorio, para cometer un delito, sólo son punibles en los casos en que la ley los pena especialmente.La conspiración existe, cuando dos o más personas se conciertan para la ejecución del delito.La proposición se configura, cuando el que ha resuelto cometer el delito propone su ejecución a otra u otras personas.El acto preparatorio se perfila, cuando el designio criminal se concreta por actos externos, previos a la ejecución del delito.", "artI": 0, "artID": "", "artL": "", "artLD": ""}, { "ltc": "001","art": 8, "artT": " (Del delito putativo y la provocación por la autoridad)", "artD": "No se castiga el hecho jurídicamente lícito, cometido bajo la convicción de ser delictivo, ni el hecho delictuoso provocado por la autoridad para obtener su represión.Queda el Juez facultado en tales casos, para adoptar medidas de seguridad.", "artI": 0, "artID": "", "artL": "", "artLD": ""}, { "ltc": "002","art": 9, "artT": " (La ley penal y el territorio)", "artD": "Los delitos cometidos en el territorio de la República, serán castigados con arreglo a la ley uruguaya, fueren los autores nacionales o extranjeros, sin perjuicio de las excepciones establecidas por el derecho público interno o por el Derecho Internacional.En el caso de condena en el extranjero de un delito cometido en el territorio nacional, la pena cumplida en todo o en parte, se tendrá en cuenta para la aplicación de la nueva.", "artI": 0, "artID": "", "artL": "", "artLD": ""}, { "ltc": "002","art": 10, "artT": " (La ley penal", "artD": "Se sustraen a la aplicación de la ley uruguaya, los delitos cometidos por nacionales o extranjeros en territorio extranjero, con las siguientes excepciones: Los delitos cometidos contra la seguridad del Estado. Los delitos de falsificación del sello del Estado, o uso de sello falsificado del Estado. Los delitos de falsificación de moneda de curso legal en el territorio del Estado, o de títulos nacionales de crédito público. Los delitos cometidos por funcionarios al servicio de la República, con abuso de sus funciones o mediante violación de los deberes inherentes al cargo. Los delitos cometidos por un uruguayo, castigados tanto por la ley extranjera como por la nacional, cuando se autor fuere habido en el territorio de la República y no fuese requerido por las autoridades del país donde cometió el delito, aplicándose en ese caso la ley más benigna. Los delitos cometidos por un extranjero en perjuicio de un uruguayo, o en perjuicio del país, con sujeción a lo establecido en el inciso precedente, y siempre que concurran las circunstancias en él articuladas. Todos los demás delitos sometidos a la ley uruguaya en virtud de disposiciones especiales de orden interno, o de convenios internacionales.", "artI": 0, "artID": "", "artL": "", "artLD": ""}, { "ltc": "002","art": 11, "artT": " (De las condiciones requeridas para que se puedan castigar en el país los delitos cometidos en el extranjero)", "artD": "No se aplicará el artículo 10: Cuando la acción penal se hallare prescripta con arreglo a una u otra legislación. Cuando el delito cometido fuera de carácter político. Cuando el sujeto haya sido absuelto en el país extranjero, o cumplido la pena, o ésta se hallare prescripta.", "artI": 0, "artID": "", "artL": "", "artLD": ""}, { "ltc": "002","art": 12, "artT": " (Régimen en el caso de que la pena más benigna fuese la extranjera y ésta no se hallare comprendida en la legislación nacional)", "artD": "Si la pena más benigna fuese la extranjera y ésta no se hallare admitida en el Uruguay, se aplicará la pena que más se le aproxime, en concepto del Juez.", "artI": 0, "artID": "", "artL": "", "artLD": ""}, { "ltc": "002","art": 13, "artT": " (Extradición)", "artD": "La extradición no es admitida por delitos políticos, por delitos comunes conexos a delitos políticos, ni por delitos comunes cuya represión obedezca a fines políticos. Tampoco es admisible, cuando el hecho que motiva el pedido no ha sido previsto como delito por la legislación nacional. La extradición puede otorgarse u ofrecerse aún por delitos no contemplados en los Tratados, siempre que no existiera prohibición en ellos.", "artI": 0, "artID": "", "artL": "", "artLD": ""}, { "ltc": "002","art": 14, "artT": " (Condiciones que rigen la extradición no mediando Tratado)", "artD": "(No existiendo Tratado, la extradición del extranjero sólo puede verificarse con sujeción a las reglas siguientes: Que se trate de delitos castigados por este Código con pena de penitenciaría por tiempo indeterminado, o de penitenciaría por más de seis años. Que la reclamación se presente por el respectivo gobierno al Poder Ejecutivo, acompañada de sentencia condenatoria, o de auto de prisión, con los justficativos requeridos por las leyes de la República para proceder al arresto. Que medie declaración judicial de ser procedente la extradición, previa audiencia del inculpado y del Ministerio Público).", "artI": 0, "artID": "", "artL": "", "artLD": ""}, { "ltc": "002","art": 15, "artT": " (De la ley penal en orden al tiempo)", "artD": "(Cuando las leyes penales configuran nuevos delitos, o establecen una pena más severa, no se aplican a los hechos cometidos con anterioridad a su vigencia. Cuando se suprimen, en cambio, delitos existentes o se disminuye la pena de los mismos, se aplican a los hechos anteriores a su vigencia, determinando la cesación del procedimiento o de la condena en el primer caso, y sólo la modificación de la pena, en el segundo, en cuanto no se hallare ésta fijada por sentencia ejecutoriada).", "artI": 0, "artID": "", "artL": "", "artLD": ""}, { "ltc": "002","art": 16, "artT": " (De las leyes de prescripción y de procedimiento)", "artD": "Las leyes de prescripción siguen las reglas del artículo anterior, y las procesales se aplican a los delitos cometidos con anterioridad a su vigencia, salvo que supriman un recurso o eliminen determinado género de prueba.", "artI": 0, "artID": "", "artL": "", "artLD": ""}, { "ltc": "002","art": 17, "artT": " (Régimen de las leyes penales especiales)", "artD": "Las disposiciones del presente Código se aplican a los hechos previstos por leyes penales especiales, salvo que en éstas se establezca lo contrario.", "artI": 0, "artID": "", "artL": "", "artLD": ""}, { "ltc": "003","art": 18, "artT": " (Régimen de la culpabilidad)", "artD": "Nadie puede ser castigado por un hecho que la ley prevé como delito, si no es intencional, ultraintencional o culposo, cometido además con conciencia y voluntad.El hecho se considera intencional, cuando el resultado se ajusta a la intención ; ultraintencional cuando el resultado excede de la intención, siempre que tal resultado haya podido ser previsto ; culpable, cuando con motivo de ejecutar un hecho, en sí mismo jurídicamente indiferente, se deriva un resultado que, pudiendo ser previsto, no lo fue, por imprudencia, impericia, negligencia o violación de leyes o reglamentos.El resultado que no se quiso, pero que se previó, se considera intencional, el daño que se previó como imposible se considera culpable.En ningún caso podrá castigarse por un resultado antijurídico, distinto o más grave que el querido, que no haya podido ser previsto por el agente.", "artI": 0, "artID": "", "artL": "", "artLD": ""}, { "ltc": "003","art": 19, "artT": " (Punibilidad de la ultraintención y de la culpa)", "artD": "El hecho ultraintencional y el culpable sólo son punibles en los casos determinados por la ley.", "artI": 0, "artID": "", "artL": "", "artLD": ""}, { "ltc": "003","art": 20, "artT": " (Régimen del dolo y de la culpa en los delitos de peligro)", "artD": "Cuando la ley manda o prohibe ciertos actos en defensa de un determinado bien jurídico, el dolo o la culpa se aprecian con relación a los actos mandados o prohibidos y no con relación al bien jurídico que se pretende salvaguardar.", "artI": 0, "artID": "", "artL": "", "artLD": ""}, { "ltc": "003","art": 21, "artT": "", "artD": "Si para responder por los actos ordenados o prohibidos en los delitos a que se refiere el artículo anterior basta la culpa, se castiga también el dolo ; pero si se requiere el dolo, no se imputa la culpa. El dolo y la culpa se presumen en esta clase de delitos, sin perjuicio de la prueba en contrario.", "artI": 0, "artID": "", "artL": "", "artLD": ""}, { "ltc": "003","art": 22, "artT": " (Error de hecho)", "artD": "El error de hecho que versare sobre las circunstancias constitutivas del delito exime de pena, salvo que tratándose de ese delito, la ley castigare la simple culpa.", "artI": 0, "artID": "", "artL": "", "artLD": ""}, { "ltc": "003","art": 23, "artT": " (Error de personal)", "artD": "Cuando por efecto de un error de hecho el mal recayere sobre distinta persona que la que el sujeto se proponía ofender, la responsabilidad se determina por la intención, y el culpable debe ser castigado, no con arreglo a la ley violada, sino con sujeción a la que intentaba violar.", "artI": 0, "artID": "", "artL": "", "artLD": ""}, { "ltc": "003","art": 24, "artT": " (Error de derecho)", "artD": "El error de derecho se presume voluntario sin admitirse prueba en contrario, salvo tratándose de las faltas, en que según su naturaleza, dicha prueba puede tener acogimiento. El error de derecho que emane del desconocimiento de una ley que no fuera penal, exime de pena sólo cuando hubiere generado un error de hecho, acerca de alguno de los elementos constitutivos del delito.", "artI": 0, "artID": "", "artL": "", "artLD": ""}, { "ltc": "003","art": 25, "artT": " (Del que induce en error)", "artD": "La eximente de responsabilidad prevista en el artículo 22, no cubre al sujeto que intencionalmente indujo en error al autor del delito. Tampoco se extiende al que, por la generación intencional de un error sobre la persona que sufre las consecuencias del delito, determinara una infracción más grave que la que el agente se proponía cometer.", "artI": 0, "artID": "", "artL": "", "artLD": ""}] };
	var cpObjT					= Object.keys(objCPTICI_III.art).length;
	/* ETIQUETAS */
	var tagIdIniciarSesion  = $('#etiqueta');
	/* HTML */
	var frm_ingresar_usuario =
			'<div id="form_usuarios">' +
			'    <form id="frm_usr">' +
			'      <caption>Ingreso de Usuarios</caption> <br />' +
			'		<fieldset><legend>Requeridos</legend>' +
			'        <label class="required"></label><input type="text" id="usuario" placeholder="usuarios" class="required" />' +
			'        <label class="required"></label><input type="text" id="clave" placeholder="clave" class="required" />' +
			'        <label class="required"></label><input type="text" id="correo" placeholder="correo" class="required" />' +
			'		</fieldset>' +

			'		<fieldset><legend>Importantes</legend>' +
			'        <label class="required"></label><input type="text" id="nombre" placeholder="nombre" class="required" />' +
			'        <label class="required"></label><input type="text" id="apellido" placeholder="apellido" class="required" />' +
			'		</fieldset>' +
			
			'		<fieldset><legend>Opcionales</legend>' +
			'        <label class="opcional"></label><input type="text" id="telefono" placeholder="telefono" />' +
			'        <label class="opcional"></label><input type="text" id="direccion" placeholder="direccion" />' +
			'        <label class="opcional"></label><input type="file" id="pub-file"/>' +
			'		</fieldset>' +
			
			'        <br />' +
			'        <input type="button" id="enviar_form_usuarios" value="Enviar" />' +
			'        <input type="reset" id="usuarios-form-reset" />' +
			'    </form>' +
			'</div>';
	/* 510 */
	var frm_ingresar_codigop = 
			'  <div id="form_codigopenal">' +
			'    <form id="frm_cp">' +
			'      <caption>Ingreso de Codigo Penal</caption>' +
			'		<fieldset><legend>LIBRO</legend>' +
			'        <input type="text" id="libro" placeholder="Libro" />' +
			'		<fieldset><legend>TITULO</legend>' +
			'        <input type="text" id="titulo" placeholder="Título" />' +
			'		<fieldset><legend>CAPITULO</legend>' +
			'        <input type="text" id="capitulo" placeholder="Capítulo" />' +
			'		<fieldset><legend>ARTICULO</legend>' +
			'        <input type="text" id="articulo" placeholder="artículo" />' +
			'        <input type="text" id="articuloTitulo" placeholder="Título del Artículo" />' +
			'        <input type="text" id="articuloDesc" placeholder="Descripción del Artículo" />' +
			'		<fieldset><legend>INCISO</legend>' +
			'        <input type="text" id="inciso" placeholder="Inciso" />' +
			'        <input type="text" id="incisoDesc" placeholder="Descripción del Inciso" />' +
			'		<fieldset><legend>LITERAL</legend>' +
			'        <input type="text" id="literal" placeholder="literal" />' +
			'        <input type="text" id="literalDesc" placeholder="Descripción del Literal" />' +
			'		<fieldset><legend>OTROS</legend>' +
			'        <input type="text" id="otro" placeholder="otro" />' +
			'		</fieldset></fieldset></fieldset></fieldset></fieldset></fieldset></fieldset>'+
			'    </form>' +
			'    <input type="button" id="enviar_form_cp" value="enviar" />' +
			'  </div>';
	var contenidoUsuarioAdmin = 
			'  <div>' +
			'    <div id="pub-msg"></div>' +
			'    <!-- <div id="pub-viewer"></div> -->' +
			'    <ul id="pub-list"></ul>' +
			'    <ul id="elementsList"></ul>' +
			'  </div>' +
			'  <br />' +
			'  <div id="form_problemas">' +
			'    <form id="frm_prb">' +
			'      <caption>Ingreso de Problema / Solcuion</caption>' +
			'        <input type="text" id="problema" placeholder="problema" />' +
			'        <input type="text" id="solucion" placeholder="solucion" />' +
			'    </form>' +
			'    <input type="button" id="enviar_form_problemas" value="enviar" />' +
			'  </div>' +
			'  <div id="form_Protocolo">' +
			'    <form id="frm_ptr">' +
			'      <caption>Ingreso de Protocolo</caption>' +
			'        <input type="text" id="sintoma" placeholder="sintoma" />' +
			'        <input type="text" id="accion" placeholder="accion" />' +
			'    </form>' +
			'    <input type="button" id="enviar_form_protocolo" value="enviar" />' +
			'  </div>' +
			'  <div id="form_codigopenal">' +
			'    <form id="frm_cp">' +
			'      <caption>Ingreso de Codigo Penal</caption>' +
			'        <input type="text" id="articulo" placeholder="articulo" />' +
			'        <input type="text" id="titulo" placeholder="titulo" />' +
			'        <input type="text" id="descripcion" placeholder="descripcion" />' +
			'        <input type="text" id="otro" placeholder="otro" />' +
			'    </form>' +
			'    <input type="button" id="enviar_form_cp" value="enviar" />' +
			'  </div>';
	var inicioDebug =
			'<h1>Creación de base de datos y sesion con IndexedDB</h1>' +
			'    <div class="note">' +
			'       <p>Funcionando y probado para:</p>' +
			'       <div id="compat"></div>' +
			'    </div>';
	/**
	*			DEBUG
	*/
	if (modoDebug){
		var debug = $('#debug');
		debug.append(inicioDebug);

		var compat = $('#compat');
		compat.empty();
		compat.append('<ul id="compat-list"></ul>');
		COMPAT_ENVS.forEach(function(val, idx, array) {
			$('#compat-list').append('<li>' + val[0] + ': ' + val[1] + '</li>');
		});
	}
	/**
	*			FUNCIONES
	*/
	/**
	*         ABRIR LA DB
	*/
	this.openDb = function openDb() {
		// log
		if (consoleLogWda) console.log("[Abriendo openDB --->" + DB_NAME + " - " +DB_VERSION);

		var req = indexedDB.open(DB_NAME, DB_VERSION);

		req.onblocked = function(event) {
			// If some other tab is loaded with the database, then it needs to be closed
			// before we can proceed.
			alert("Cierre las demás pestañas abiertas con este sitio!");
		};

		req.onupgradeneeded = function (evt) {
			var dbtmp = req.result;
			// log
			if (consoleLogWda) console.log("Entrando en: onupgradeneeded: " + evt.oldVersion + ' - ' + dbtmp.version);
			if (dbtmp.version == 1 ) {
				// Usuarios
				var store1 = evt.currentTarget.result.createObjectStore(DB_STORE_USUARIOS, { keyPath: 'id', autoIncrement: true });
					store1.createIndex('por_usuario', 'usuario', { unique: true });
					store1.createIndex('por_nombre', 'nombre', { unique: false });
					store1.createIndex('por_apellido', 'apellido', { unique: false });
				// Problemas
				var store2 = evt.currentTarget.result.createObjectStore(DB_STORE_PROBLEMAS, { keyPath: 'id', autoIncrement: true });
					store2.createIndex('por_problema', 'problema', { unique: true });
				// Protocolo
				var store3 = evt.currentTarget.result.createObjectStore(DB_STORE_PROTOCOLO, { keyPath: 'id', autoIncrement: true });
					store3.createIndex('por_protocolo', 'protocolo', { unique: false });

			  /* Inicar DB con datos */
				store1.add(obj);
				console.log("añadido registro admin..... [ok]");      
			  /*var obj = [
							  {
								"usuario": "Administrador",
								"clave": "admin",
								"permiso": 4,
								"correo": "warrio@gmail.com",
								"nombre": "Wilson",
								"apellido": "Arriola"
							  },
							  {
								"usuario": "prueba1",
								"clave": "prueba",
								"permiso": 1,
								"correo": "prueba@prueba.com",
								"nombre": "usuario",
								"apellido": "prueba"
							  },
							  {
								"usuario": "prueba2",
								"clave": "prueba",
								"permiso": 1,
								"correo": "prueba@prueba.com",
								"nombre": "usuario",
								"apellido": "prueba"
							  },
							  {
								"usuario": "prueba3",
								"clave": "prueba",
								"permiso": 1,
								"correo": "prueba@prueba.com",
								"nombre": "usuario",
								"apellido": "prueba"
							  }
							];
				*/
			}
			if (dbtmp.version == 2 ) {
				// Codigo Penal
				var store4 = evt.currentTarget.result.createObjectStore(DB_STORE_CODIGOPENAL, { keyPath: 'id', autoIncrement: true });
					store4.createIndex('por_articulo', 'art', { unique: true });
					store4.createIndex('por_titulo', 'artT', { unique: true });
					
				console.log("Actualizando Codigo Penal: " + cpObjT);
				for (var i = 0; i < cpObjT; i++){
					store4.add(objCPTICI_III.art[i]);
					console.log("añadido registro al CP: " + i + " [ok]");
				}
			 }
		};
		
		req.onsuccess = function (evt) {
			db = this.result;
			// log
			if (consoleLogWda) console.log("<-- Cerrando openDB]");
			db.close();
		};

		req.onerror = function (evt) {
			// log error 
			if (consoleErrorWda) console.error("openDb: Error al abrir... ", this.error);
			if (consoleLogWda) console.log("Error abriendo la DB: Titutlo: " + this.error.name + " - Mensaje: " + this.error.message );
		};
	}
	/**
	*         CONTROLADOR DE EVENTOS DE BOTONES
	*/
	// this.addEventListeners = function addEventListeners() {
	function addEventListeners() {
		/* log */
		if (consoleLogWda) console.log("addEventListeners... [ok]");
		/*  Boton cerrar de sesion */
		$('#btn_cerrarsesion').click(function(evt) {
			/* log */
			if (consoleLogWda) console.log("btn_cerrarsesion: ");
			sessionStorage.clear();
			/* location.reload(true); */
			window.location="./index.html";
		});
		/* resetar frm */
		$('#usuarios-form-reset').click(function(evt) {
			// log
			if (consoleLogWda) console.log("usuarios-form-reset");
		});
		/* usuarios */
		$('#btn_Usuarios').click(function(evt) {
			/* log */
			if (consoleLogWda) console.log("btn_Usuarios: ");
			callFn(mostrarListaUsuarios);
		});
		/* codigo penal */
		$('#btn_CodigoP').click(function(evt) {
			/* log */
			if (consoleLogWda) console.log("btn_Usuarios: ");
			callFn(mostrarCodigoPenal);
		});
		/* control de eventos */
		$('#btn_Control').click(function(evt){
			/* log */
			if (consoleLogWda) console.log("btn_Control: ");
			callFn(mostrarControl);
		});
	};
	/**
	*			LLAMO FUNCIONES INTERNAS
	*/
	function callFn(f){
		f();
	}
	/**
	*			INICIALIZAR
	*/
	this.inicializar = function inicializar(){

		/* log */
		if (consoleLogWda) console.log("Inicializar...");

	    /* recupero variable de sesion */
        usuarioGuardado = sessionStorage.getItem("usuario");
        usuarioGuardado = JSON.parse(usuarioGuardado);
		
		/* actualizo sesion de usuario */
		res = actualizarFechaSesion();

		/* log */
		if (consoleLogWda) console.log("Inicializar..."+ usuarioGuardado.nombre);
		
		var permiso = permisoUsuario[usuarioGuardado.permiso];
		
		/* document.getElementById("imgPerfil").innerHTML = '<img width="100px" height="100px" src="img/no-img.gif"/>'; */
		dameFoto(usuarioGuardado.key);
        document.getElementById("saludo").innerHTML = "Hola: "+ usuarioGuardado.nombre + ".";
        document.getElementById("iniciado").innerHTML = "Iniciado: "+ permiso +" (total: "+ usuarioGuardado.sesion +").";

	    resumenDB(); /* resumen de la base de datos */

	    addEventListeners();
	};
	/**
	*         OBTENGO LA FOTO SEGUN SU ID
	*/
	function dameFoto(key) {
		/* log*/
		if (consoleLogWda) console.log("dameFoto: Abrir DB...");
		var db;
		var request = indexedDB.open(DB_NAME);
			request.onerror = function(event) {
				/* log error */
				if (consoleErrorWda) console.error("Error dameFoto:", "Al abrir la DB. -> " + this.error);
			};
			request.onsuccess = function(event) {
				db 		= this.result;
				var tx 	= db.transaction(DB_STORE_USUARIOS, 'readonly');
				store 	= tx.objectStore(DB_STORE_USUARIOS);
				var req;
					/* log */
					if (consoleLogWda) console.log("dameFoto: buscando....");
					req = store.get(key);
					req.onsuccess = function (evt) {
						var value = evt.target.result;

						/*  OBTENGO LA IMAGEN CORRESPONDIENTE */
						if (value.hasOwnProperty('blob') && typeof value.blob != 'undefined') {
							var imgFile = value.blob;
							/* Get window.URL object */
							var URL = window.URL || window.webkitURL;
							/* Create and revoke ObjectURL */
							var imgURL = URL.createObjectURL(imgFile);
							/*  Set img src to ObjectURL*/
							if (consoleLogWda) console.log("dameFoto: " + imgURL);
							/*
							var imgTag = document.getElementById(img_id);
							imgTag.setAttribute("src", imgURL);
							*/
							document.getElementById("imgPerfil").innerHTML = '<img width="100px" height="100px" src="'+imgURL+'"/>';
							/* Revoking ObjectURL */
							URL.revokeObjectURL(imgURL);
							/* log */
							if (consoleLogWda) console.log("dameFoto: se cargó la foto.... [ok]");
						}else{
							document.getElementById("imgPerfil").innerHTML = '<img width="100px" height="100px" src="img/no-img.gif"/>';
							/* log */
							if (consoleLogWda) console.log("dameFoto: no hay foto registrada.... [err]");
							/*
							var imgURL = "img/no-img.gif";
							var imgTag = document.getElementById(img_id);
							imgTag.setAttribute("src", imgURL);
							*/
						}
					};
					// log
					if (consoleLogWda) console.log("dameFoto: Cierro DB..."); //, cursor);
					db.close();
			};
	}
	/**
	*         MENSAJES DE ERROR O DE EXTITO
	*/
	function displayActionSuccess(msg) {
		msg = typeof msg != 'undefined' ? "Exito: " + msg : "Éxito";
		$('#msg').html('<span class="action-success">' + msg + '</span>');
		/* log */
		if (consoleLogWda) console.log(msg);
	}
	function displayActionFailure(msg) {
		msg = typeof msg != 'undefined' ? "Falla: " + msg : "Error";
		$('#msg').html('<span class="action-failure">' + msg + '</span>');
		/* log */
		if (consoleLogWda) console.log(msg);
	}
	/**
	*         MOSTRAR OCULTAR FORMULARIO ACTUALIZAR
	*/
	this.ocultarMostrarFrmActualizar = function ocultarMostrarFrmActualizar(n) {
		n = 'divmostrar-ocultar-' + n;
		if(dentroFuera == 0) {
		document.getElementById(n).style.display='none';
			dentroFuera = 1;
		}else{
			document.getElementById(n).style.display='block';
			dentroFuera = 0;
		}
	};
	/**
	*         ACTUALIZAR USUARIOS
	*/
	this.actualizarUsuario = function actualizarUsuario(key){
		err = 0;
		/* log */
		if (consoleLogWda) console.log("ActualizarUsuario:", arguments);
		// creando objeto
		var clave 			= $('#a_clave-' + key).val();
		var permiso 		= $('#a_permiso-' + key).val();
		var telefono 		= $('#a_telefono-' + key).val();
		var direccion 		= $('#a_direccion-' + key).val();
		var correo 			= $('#a_correo-' + key).val();
		var nombre 			= $('#a_nombre-' + key).val();
		var apellido 		= $('#a_apellido-' + key).val();
		var file_input 		= $('#a_pub-file-' + key);
		var selected_file 	= file_input.get(0).files[0];
		/* buscando errores */
		if (!clave) {
			err++;
		}else{
			/* clave = CryptoJS.SHA1(clave); */
			if (consoleLogWda) console.log("ActualizarUsuario: clave: SE CAMBIO LA CONTRASEÑA CON HASH: " + clave);
		}
		if (!permiso) err++;
		if (!telefono) err++;
		if (!direccion) err++;
		if (!correo) err++;
		if (!nombre) err++;
		if (!apellido) err++;
		if (!selected_file) err++;
		/* cambiando tipos */
		permiso 			= Number(permiso);
		telefono 			= Number(telefono);
		/* log */
		if (consoleLogWda) console.log("ActualizarUsuario: clave: " + clave + " - correo a actualziar: " + correo + ' - Totoal de errores: ' + err);
		if (err == 8) {
			displayActionFailure("Debe completar al menos un campo en el formulario de actualización.");
			return;
		}

		if (consoleLogWda) console.log("ActualizarUsuario: Abriendo ...");

		var db;
		var request = indexedDB.open(DB_NAME);
			request.onerror = function(event) {
				/* log error */
				if (consoleErrorWda) console.error("actualizarUsuario:", "Al abrir la DB. -> " + this.error);
			};
			request.onsuccess = function(event) {
				db 				= this.result;
				var tx 			= db.transaction(DB_STORE_USUARIOS, 'readwrite');
				store 			= tx.objectStore(DB_STORE_USUARIOS);
				var keyRange 	= IDBKeyRange.only(key);
				objCursor 		= store.openCursor(keyRange);

				objCursor.onsuccess = function(e){
					var cursor 	= this.result;
					var obj 	= cursor.value;
					old_key 	= obj.clave;
					/* cargo los objetos a actualizar */
					if (clave != "") obj.clave 							= clave;
					if (permiso != "") obj.permiso 						= permiso;
					if (telefono != "") obj.telefono 					= telefono;
					if (direccion != "") obj.direccion 					= direccion;
					if (correo != "") obj.correo 						= correo;
					if (nombre != "") obj.nombre 						= nombre;
					if (apellido != "") obj.apellido 					= apellido;
					if (typeof selected_file != 'undefined') obj.blob 	= selected_file;
					/* log */
					if (consoleLogWda) console.log(obj);
					var request = cursor.update(obj);
						request.onsuccess = function(){
							/* log */
							if (consoleLogWda) console.log('Se actualizo el usuario cuya key es: ' + key + ' - clave: ' + clave + ' - old_clave: ' + old_key);
							mostrarListaUsuarios();
						};
						request.onerror = function(e){
							/* log */
							if (consoleLogWda) conosole.log("error al actualizar: " + e);
						};
				};
				objCursor.onerror = function(e){
					/* log */
					if (consoleLogWda) conosole.log("error al actualizar: " + e);
				};
				if (consoleLogWda) console.log("actualizarUsuario: Cierro DB..."); //, cursor);
				db.close();
			};
	};
	/**
	*			ENVIAR USUARIOS
	*/
	function enviarFrmUsuarios(){
			// log
			if (consoleLogWda) console.log("enviarFrmUsuarios...");
			// validacion del formulario
			var usuario = $('#usuario').val();
			var clave = $('#clave').val();
			// var permiso = $('#permiso').val(); permiso = Number(permiso);
			var telefono = $('#telefono').val(); telefono = Number(telefono);
			var direccion = $('#direccion').val();
			var correo = $('#correo').val();
			var nombre = $('#nombre').val();
			var apellido = $('#apellido').val();
			// var sesion = $('#sesion').val(); sesion = Number(sesion);

			if (!usuario || !clave || !correo || !nombre || !apellido) {
				displayActionFailure("Debe completar los campos obligatorios marcados con (*).");
				return;
			}

			var file_input = $('#pub-file');
			var selected_file = file_input.get(0).files[0];
			//log
			if (consoleLogWda) console.log("selected_file:", selected_file);

			var file_url = $('#pub-file-url').val();
			if (selected_file) {
				addUsuario(usuario, clave, telefono, direccion, correo, nombre, apellido, selected_file);
				// log
				if (consoleLogWda) console.log("Envio Usuario a añadir con img:", usuario + clave + telefono + direccion + correo + nombre + apellido + selected_file);
			} else {
				addUsuario(usuario, clave, telefono, direccion, correo, nombre, apellido);
				// log
				if (consoleLogWda) console.log("Envio Usuario a añadir sin img:", usuario + clave + telefono + direccion + correo + nombre + apellido);
			}
	};
/**
*			MOSTRAR OCULTAR CAPAS DEL FORMULARIO DE CONTROL DE EVENTOS
*/
	this.mostrarocultarFrmControl = function mostrarocultarFrmControl(a, b, c){
		console.log(a,b,c);
		document.getElementById(a).style.display = 'none';
		document.getElementById(b).style.display = 'none';
		document.getElementById(c).style.display = 'block';
	}
	/**
	*			MOSTRAR CONTROL DE EVENTOS
	*/
	function mostrarControl(){
		if (consoleLogWda) console.log("mostrarControl: ");
		var frm_i 	= $('#frm_ingresar'); frm_i.empty();
		var pub_msg 	= $('#pub-msg'); pub_msg.empty();
		var pub_list 	= $('#pub-list'); pub_list.empty();
		html = 
			'<div id="frm_control"><form>'+
				'<div id="fecha_frmControl">{11/05/2015} || {06:00}</div>'+
/*
				'<select name="oculMenu" class="formularios" id="oculMenu" >'+ // onChange="oculta_select(this.value);" >'+
					'<option value="SL" selected>Seleccione un artículo...</option>'+
					'<option value="c1" onClick="miClase.mostrarocultarFrmControl(\'c3\',\'c2\',\'c1\');">Libros de Texto</option>'+
					'<option value="c2" onClick="miClase.mostrarocultarFrmControl(\'c3\',\'c1\',\'c2\');">Literatura (Libros de Lectura)</option>'+
					'<option value="c3" onClick="miClase.mostrarocultarFrmControl(\'c1\',\'c2\',\'c3\');">Otros</option>'+
				'</select>'+
				'<div id="c1">algo</div><div id="c2">algo</div><div id="c3">algo</div>'+
*/
				'<div id="cuerpo_frmControl">'+
					'<div id="dosColIzq">'+
					'	<div id="contEnvioNumero">'+
					'		<div id="contEnvioNumeroLbl">'+
					'			<div><label id="contEnvioNumeroLabel" type="label">Texto:</label></div>'+
					'			<div><input id="contEnvioNumeroText" type="text" value="0"></input></div>'+
					'		</div>'+
					'		<div id="contEnvioNumeroDivBtn">'+
					'			<input id="contEnvioNumeroBtn" type="button" value="Enviar">'+
					'		</div>'+
					'	</div>'+
					'	<div id="contEnvioRadioTipo">'+
					'		<div id="contEnvioRadioDivLabel">'+
					'			<label>Evento-></label>'+
					'		</div>'+
//  <!-- Slide TWO -->
					'		<div id="contEnvioRadioDivRadio">'+
'  <div class="slideTwo">'+
'      <input type="checkbox" value="None" id="slideTwo" name="check" checked />'+
'      <label for="slideTwo"></label>'+
'  </div>'+
					'		</div>'+
					'		<div id="contEnvioRadioDivLabel">'+
					'			<label><-Ampliación</label>'+
					'		</div>'+
/*
					'		<div id="contEnvioRadioDivRadio0">'+
					'			<span><input type="radio" name="tipo" value="e" id="tipo0" checked = "checked">'+
					'			<label for="tipo0">Evento</label></span>'+
					'		</div>'+
					'		<div id="contEnvioRadioDivRadio1">'+
					'			<input type="radio" name="tipo" value="a" id="tipo1">'+
					'			<label for="tipo1">Ampliacion</label>'+
					'		</div>'+
*/
					'	</div>'+
					'	<div id="contEnvioRadioRechazo">'+
					'		<div id="contEnvioRadioDivLabel">'+
					'			<label>Controlado: </label>'+
					'		</div>'+
					'		<div id="contEnvioRadioDivRadio0">'+
//   <!-- Slide THREE -->
'  <div class="slideThree">'+
'      <input type="checkbox" value="s" id="slideThree" name="controlado" checked />'+
'      <label for="slideThree"></label>'+
'  </div>'+
//					'			<input type="radio" name="rechazo" value="s" id="tipo0">Si'+
					'		</div>'+
/*					'		<div id="contEnvioRadioDivRadio1">'+
					'			<input type="radio" name="rechazo" value="n" id="tipo1" checked = "checked">No'+
					'		</div>'+
*/
					'	</div>'+
					'</div>'+
/**
*	 botones que aumentan los valores dle formulario
*/
/*
	var contCorreos = 0;
	var contAdmins = 0;
	var contLlamadas = 0;
	var contCorreos = 0;
	var contCursos = 0;
	var contOtros = 0;
*/
/* correo */
/*
$('#contEnvioCorreoBtn').click(function(evt){
document.getElementById('contEnvioCorreoText').readOnly = true;
contCorreos++;
document.getElementById('contEnvioCorreoText').value = contCorreos;
});
*/
					'<div id="dosColDer"><div>'+
					'	<div id="contAumentoCorreo">'+
					'		<div><label>Correo:</label></div>'+
					'		<div><input id="contEnvioCorreoText" type="text" value="0" disabled="disabled"></input></div>'+
					'		<div><input id="contEnvioCorreoBtn" type="button" value="+" onClick="miClase.aumentarValor(1);"></div>'+
					'	</div>'+
					'	<div id="contAumentoAdmin">'+
					'		<div><label>Admin:</label></div>'+
					'		<div><input id="contEnvioAdminText" type="text" value="0" disabled="disabled"></input></div>'+
					'		<div><input id="contEnvioAdminBtn" type="button" value="+" onClick="miClase.aumentarValor(2);"></div>'+
					'	</div>'+
					'	<div id="contAumentoLlamada">'+
					'		<div><label>Telef.:</label></div>'+
					'		<div><input id="contEnvioLlamadaText" type="text" value="0" disabled="disabled"></input></div>'+
					'		<div><input id="contEnvioLlamadaBtn" type="button" value="+" onClick="miClase.aumentarValor(3);"></div>'+
					'	</div>'+
					'	<div id="contAumentoCurso">'+
					'		<div><label>Curso:</label></div>'+
					'		<div><input id="contEnvioCursoText" type="text" value="0" disabled="disabled"></input></div>'+
					'		<div><input id="contEnvioCursoBtn" type="button" value="+" onClick="miClase.aumentarValor(4);"></div>'+
					'	</div>'+
					'	<div id="contAumentoOtros">'+
					'		<div><label>Otros:</label></div>'+
					'		<div><input id="contEnvioOtrosText" type="text" value="0" disabled="disabled"></input></div>'+
					'		<div><input id="contEnvioOtrosBtn" type="button" value="+" onClick="miClase.aumentarValor(5);"></div>'+
					'	</div>'+
					'	</div><div>'+
					'	<div id="contEnvioResumen"><div>'+
					'		<div id="enLinea">'+
					'			<label id="etiqueta">Minutos: <spand id="lblMinutos">0</spand></label>'+
					'			<label id="etiqueta">Esfuerzo: <spand id="lblEsfuerzo">0</spand></label></div>'+
					'		</div>'+
					'		<div id="contEnvioResumenDivBtn"><input id="contEnvioResumenBtn" type="button" value="Generar"></div>'+
					'	</div></div>'+
					'</div>'+
				'</div>'+
			'</form></div>';

		html1 =
			'<div id="tabla">'+
			'<table>'+
			'    <tr>'+
			'	<th></th>'+
			'	<th>Control</th>'+
			'	<th>Rechazo</th>'+
			'	<th></th>'+
			'	<th>Correo</th>'+
			'	<th>Admin</th>'+
			'	<th>Llamada</th>'+
			'	<th>Curso</th>'+
			'	<th>Otros</th>'+
			'	<th>Minutos</th>'+
			'	<th>Esfuerzo</th>'+
			'    </tr>'+
			'    <tr>'+
			'	<td>Evento</td>'+
			'	<td>83</td>'+
			'	<td>1</td>'+
			'	<td></td>'+
			'	<td>1</td>'+
			'	<td>2</td>'+
			'	<td>3</td>'+
			'	<td>4</td>'+
			'	<td>50</td>'+
			'	<td>330</td>'+
			'	<td>100</td>'+
			'    </tr>'+
			'    <tr>'+
			'	<td>Ampliaci&oacute;n</td>'+
			'	<td>2</td>'+
			'	<td>1</td>'+
			'	<td></td>'+
			'	<td></td>'+
			'	<td></td>'+
			'	<td></td>'+
			'	<td></td>'+
			'	<td></td>'+
			'	<td></td>'+
			'	<td></td>'+
			'    </tr>'+
			'</table>'+
			'</div>';
		html2 = 
			'<div id="aviso">'+
			'<p>Se ha CONTROLADO el Evento x.xxx.xxx.</p>'+
			'</div>';

		frm_i.append(html);
		pub_msg.append(html2);
		pub_list.append(html1);

	};
	/**
	*			AUMENTO LOS CONTADORES AL HACER CLICK
	*/
	this.aumentarValor = function aumentarValor(a){
		/*
			var contCorreos = 0;
			var contAdmins = 0;
			var contLlamadas = 0;
			var contCursos = 0;
			var contOtros = 0;
		*/
		if (a == 1) {
			inp = "contEnvioCorreoText";
			cont = contCorreos++;
		}
		if (a == 2) {
			inp = "contEnvioAdminText";
			cont = contAdmins++;
		}
		if (a == 3) {
			inp = "contEnvioLlamadaText";
			cont = contLlamadas++;
		}
		if (a == 4) {
			inp = "contEnvioCursoText";
			cont = contCursos++;
		}
		if (a == 5) {
			inp = "contEnvioOtrosText";
			cont = contOtros++;
		}

		/* log*/
		// if (consoleLogWda) console.log("aumentarValor... input: " + inp + " - contador= " + cont);
		document.getElementById(inp).value = cont;

	};
	/**
	*			MOSTRAR CODIGO PENAL
	*/
	function mostrarCodigoPenal() {
		/* log*/
		if (consoleLogWda) console.log("mostrarCodigoPenal: Abrir DB...");
		var db;
		var tablaVacia = true;
		var txt1, txt2, txt3, capituloIni, tituloMed = "", cuerpo = "", tmp = 0;
		var tot;
		var request = indexedDB.open(DB_NAME);
			request.onerror = function(event) {
				/* log error */
				if (consoleErrorWda) console.error("Error mostrarCodigoPenal:", "Al abrir la DB. -> " + this.error);
			};
			request.onsuccess = function(event) {
				db 		= this.result;
				var tx 	= db.transaction(DB_STORE_CODIGOPENAL, 'readonly');
				store 	= tx.objectStore(DB_STORE_CODIGOPENAL);
				/* log */
				if (consoleLogWda) console.log("mostrarCodigoPenal: Abrir DB..." + DB_STORE_CODIGOPENAL);
				var frm_i 		= $('#frm_ingresar'); frm_i.empty(); // frm_i.append(frm_ingresar_codigop);
				var pub_msg 	= $('#pub-msg'); pub_msg.empty();
				var pub_list 	= $('#pub-list'); pub_list.empty();
				var req;
				var req = store.count();
					req.onsuccess = function(evt) {
						pub_msg.append('<p>Existen <strong>' + evt.target.result + '</strong> Artículos guardados en el Almacén.' +
										' <input type="button" id="search-list-button" value="Listar" />' +
										' <input type="button" id="ordenar_por_nombre" value="Ordenar" /></p>');
					};
					req.onerror = function(evt) {
						/* log error */
						if (consoleErrorWda) console.error("Error:", "Error al obtener el total de mostrarCodigoPenal guardados. -> " + this.error);
						displayActionFailure(this.error);
					};
					var i = 0;
					req = store.openCursor();
					req.onsuccess = function(evt) {
						var cursor = this.result;
						if (cursor) {
							/* log */
							// if (consoleLogWda) console.log("Mostrando mostrarCodigoPenal cursor:"); //, cursor);
							tablaVacia = false;
							req = store.get(cursor.key);
							req.onsuccess = function (evt) {
								var value = evt.target.result;
								/**
								* 		genero el html y lo guarod en variable
								*		{ 	"ltc": "001",
								*			"art": 1,
								*			"artT": " (Concepto del delito)",
								*			"artD": "Es delito toda acción u omisión expresamente prevista por la ley penal. Para que ésta se considere tal, debe contener una norma y una sanción.",
								*			"artI": 0,
								*			"artID": "",
								*			"artL": "",
								*			"artLD": ""}
								*/
								var libro = value.ltc.charAt(0);
								var titulo = value.ltc.charAt(1);
								var capitulo = value.ltc.charAt(2);
								capitulo = capitulo-1;
								// console.log("ltc: " + libro + titulo + capitulo);
								if (libro == 0){ // libro 1
									if (titulo == 0) { // titulo 1
										var tituloIni = '<fieldset><legend>'+ cpLibTitCap.Titulos[libro][titulo] +'</legend>';
										var tituloFin = '</fieldset>';
										if(capitulo == 0 && tmp == 0){
											capituloIni = '<h1>'+ cpLibTitCap.Capitulos[libro][titulo][capitulo] +'</h1>';
											tmp++;
										}
										if(capitulo == 1 && tmp == 1){
											capituloIni = '<h1>'+ cpLibTitCap.Capitulos[libro][titulo][capitulo] +'</h1>';
											tmp++;
										}
										if(capitulo == 2 && tmp == 2){
											capituloIni = '<h1>'+ cpLibTitCap.Capitulos[libro][titulo][capitulo] +'</h1>';
											tmp++;
										}
										if(value.artI != 0){
											if(value.artL != ""){
												tituloMed = 										
													'<ul>' +
													'<li>'+ value.art +'</li>' +
													'<li>'+ value.artT +'</li>' +
													'<li>'+ value.artD +'</li>' +
													'<li>'+ value.artI +'</li>' +
													'<li>'+ value.artID +'</li>' +
													'<li>'+ value.artL +'</li>' +
													'<li>'+ value.artLD +'</li>' +
													'</ul>';
											}else{										
												tituloMed = 										
													'<ul>' +
													'<li>'+ value.art +'</li>' +
													'<li>'+ value.artT +'</li>' +
													'<li>'+ value.artD +'</li>' +
													'<li>'+ value.artI +'</li>' +
													'<li>'+ value.artID +'</li>' +
													'</ul>';
											}
										}else{
											tituloMed = 										
												'<ul>' +
												'<li><b>Artículo Nº '+ value.art +'</b> '+ value.artT +'</li>' +
												'<li>'+ value.artD +'</li>' +
												'</ul>';
										}
										if (capituloIni == "no"){
											cuerpo += tituloMed;
										}else{
											cuerpo += capituloIni + tituloMed;
										}
											capituloIni = "no";
											// console.log(capituloIni);

										txt1 = tituloIni + cuerpo + tituloFin;
									}
								}
								if (libro == 1){ // libro 2
									txt2 +=
											'<p>Contenido Libro 2... Los setimos, etamos trabajando en ello... :(</p>';
								}
								if (libro == 2){ // libro 3
									txt3 +=
											'<p>Contenido Libro 3... Los setimos, etamos trabajando en ello... :(</p>';
								}
							};
							/* me muevo al siguiente registro */
							cursor.continue();
						} else {
							/* log */
							if (consoleLogWda) console.log("Terminaron los registros para esta tabla.");
							if (tablaVacia){
								// codigo para tabla vacia
								txt1 += 								
										'<div id="acordeon-1">' +
											'<p>La Tabla seleccionada se encuentra vacía! :( </p>' +
										'</div>';
							}else{
								txtIni = 	'<div id="accordion">' +
												'<div id="h3">' +
													'<h3 onClick="miClase.mostrarOcultarAcordeon(1);">Libro 1</h3>' +
													'<h3 onClick="miClase.mostrarOcultarAcordeon(2);">Libro 2</h3>' +
													'<h3 onClick="miClase.mostrarOcultarAcordeon(3);">Libro 3</h3>' +
												'</div>' +
												'<div id="acordeones">';
								txtFin =		'</div>' +
											'<div>';
								if (txt1 == undefined){txt1 = '<div id="acordeon-2"><p>Contenido Libro 2... Los setimos, etamos trabajando en ello... :(</p></div>';}
									else{txt1 = '<div id="acordeon-1">' + txt1 + '</div>';}
								if (txt2 == undefined){txt2 = '<div id="acordeon-2"><p>Contenido Libro 2... Los setimos, etamos trabajando en ello... :(</p></div>';}
									else{txt2 = '<div id="acordeon-2">' + txt2 + '</div>';}
								if (txt3 == undefined){txt3 = '<div id="acordeon-3"><p>Contenido Libro 3... Los setimos, etamos trabajando en ello... :(</p></div>';}
									else{txt2 = '<div id="acordeon-3">' + txt3 + '</div>';}
								// console.log(txt2 + txt3);
								tot = txtIni + txt1 + txt2 + txt3 + txtFin;
							}
						}
						pub_list.append(tot);
					};
					// log
					if (consoleLogWda) console.log("mostrarCodigoPenal: Cierro DB...");
					db.close();
			};
	}
	/**
	*         MOSTRAR OCULTAR ACORDEON
	*/
	this.mostrarOcultarAcordeon = function mostrarOcultarAcordeon(n) {
		if (n == 1){
			document.getElementById("acordeon-1").style.display='block';
			document.getElementById("acordeon-2").style.display='none';
			document.getElementById("acordeon-3").style.display='none';
		}
		if (n == 2){
			document.getElementById("acordeon-2").style.display='block';
			document.getElementById("acordeon-1").style.display='none';
			document.getElementById("acordeon-3").style.display='none';
		}
		if (n == 3){
			document.getElementById("acordeon-3").style.display='block';
			document.getElementById("acordeon-2").style.display='none';
			document.getElementById("acordeon-1").style.display='none';
		}
	};
	/**
	*         MOSTRAR LISTADO DE USUARIOS
	*/
	function mostrarListaUsuarios() {
		/* log*/
		if (consoleLogWda) console.log("mostrarListaUsuarios: Abrir DB...");
		var db;
		var request = indexedDB.open(DB_NAME);
			request.onerror = function(event) {
				/* log error */
				if (consoleErrorWda) console.error("Error mostrarListaUsuarios:", "Al abrir la DB. -> " + this.error);
			};
			request.onsuccess = function(event) {
				db 		= this.result;
				var tx 	= db.transaction(DB_STORE_USUARIOS, 'readonly');
				store 	= tx.objectStore(DB_STORE_USUARIOS);
				/* log */
				if (consoleLogWda) console.log("mostrarListaUsuarios: Abrir DB..." + store);
				var frm_i 		= $('#frm_ingresar'); frm_i.empty(); frm_i.append(frm_ingresar_usuario);
				var pub_msg 	= $('#pub-msg'); pub_msg.empty();
				var pub_list 	= $('#pub-list'); pub_list.empty();
				//addEventListeners();
				var req;
				var req = store.count();
					req.onsuccess = function(evt) {
						pub_msg.append('<p>Existen <strong>' + evt.target.result + '</strong> Usuarios guardados en el almacén.' +
										' <input type="button" id="search-list-button" value="Listar" />' +
										' <input type="button" id="ordenar_por_nombre" value="Ordenar" /></p>');
					};
					req.onerror = function(evt) {
						/* log error */
						if (consoleErrorWda) console.error("Error:", "Error al obtener el total de Usuarios guardados. -> " + this.error);
						displayActionFailure(this.error);
					};
					var i = 0;
					/* req = store.openCursor(null, "prev"); / orden ascendente */
					req = store.openCursor();
					req.onsuccess = function(evt) {
						var cursor = this.result;
						if (cursor) {
							/* log */
							if (consoleLogWda) console.log("Mostrando Usuarios cursor:"); //, cursor);
							req = store.get(cursor.key);
							req.onsuccess = function (evt) {
								var value = evt.target.result;
								/* genero el html y lo guarod en variable */
								var txt1 = '<li>' + 
												'<table><tr>' +
													'<td rowspan="2"><img id="image-' + cursor.key + '" alt="Imagen_' + cursor.key + '" height="42" width="42" src=""/></td>'+
													'<td>'+ value.nombre +	'</td><td>' + value.apellido + '</td><td colspan="2">' + value.correo + 
													'</td><td rowspan="2"><input type="button" id="delete-button_' + cursor.key +'" onclick="miClase.eliminarUsuario('+ cursor.key +');" value="Eliminar" />' +
													'<input type="button" id="mostrar-ocultar-' + cursor.key + '" onClick="miClase.ocultarMostrarFrmActualizar(' + cursor.key + ');" value="Mostrar"></td>' +
												'</tr><tr>' +
													'<td>[' + cursor.key + '] ' + value.usuario + '</td><td>'+ value.clave +'</td><td>' + value.fecha + '</td><td>Total: '+ value.sesion + '</td>' +
												'</tr><tr><td colspan="6">' +
													'<div id="divmostrar-ocultar-' + cursor.key + '" style="display:none;">'+
														'<form name="frmActualizarUsuario">' +
														'<table><tr><td>' +
															'<label class="required"></label><input type="text" id="a_clave-' + cursor.key + 
															'" placeholder="clave" class="required" />' +
															'<label class="opcional"></label><input type="text" id="a_permiso-' + cursor.key + 
															'" placeholder="permiso" />' +
															'<label class="opcional"></label><input type="text" id="a_telefono-' + cursor.key + 
															'" placeholder="telefono" />' +
															'<label class="opcional"></label><input type="text" id="a_direccion-' + cursor.key + 
															'" placeholder="direccion" />' +
															'<label class="required"></label><input type="text" id="a_correo-' + cursor.key + 
															'" placeholder="correo" class="required" />' +
														'</td></tr><tr><td>' +
															'<label class="required"></label><input type="text" id="a_nombre-' + cursor.key + 
															'" placeholder="nombre" class="required" />' +
															'<label class="required"></label><input type="text" id="a_apellido-' + cursor.key + 
															'" placeholder="apellido" class="required" />' +
															'<label class="opcional"></label><input type="file" id="a_pub-file-' + cursor.key + '"/>' +
															'<br /><input type="reset" id="usuarios-form-reset" />' +
															'<input type="button" id="usuario-actualizar-button" value="Actualizar" onClick="miClase.actualizarUsuario(' + cursor.key +');" />' +
														'</td></tr></table>' +
														'</form>' +
													'</div>' +
												'</td></tr></table>' +
											'</li>';
								/* inserto el html dentro de ul con jquery */
								var txt2 = $("<ul></ul>").html(txt1);
								/* agreo al final del pub_list: prepend al principio */
								pub_list.append(txt2);
								/* ya existe el html en el documento puedo buscar las ID y cambairlas por la foto */
								/*  OBTENGO LA IMAGEN CORRESPONDIENTE */
								var img_id = 'image-' + cursor.key;
								if (value.hasOwnProperty('blob') && typeof value.blob != 'undefined') {
									var imgFile = value.blob;
									/* Get window.URL object */
									var URL = window.URL || window.webkitURL;
									/* Create and revoke ObjectURL */
									var imgURL = URL.createObjectURL(imgFile);
									/*  Set img src to ObjectURL*/
									if (consoleLogWda) console.log("ImgTag: " + img_id + " - ImgUrl: " + imgURL);
									var imgTag = document.getElementById(img_id);
									imgTag.setAttribute("src", imgURL);
									/* Revoking ObjectURL */
									URL.revokeObjectURL(imgURL);
								}else{
									var imgURL = "img/no-img.gif";
									var imgTag = document.getElementById(img_id);
									imgTag.setAttribute("src", imgURL);
								}
							};
						/* me muevo al siguiente registro */
						cursor.continue();
						/* agrego un contador */
						i++;
						} else {
							/* log */
							if (consoleLogWda) console.log("Terminaron los registros para esta tabla.");
						}
					};
					// log
					if (consoleLogWda) console.log("mostrarListaUsuarios: Cierro DB..."); //, cursor);
					db.close();
						/* agregar usuarios desde el formulario*/
					$('#enviar_form_usuarios').click(function(evt) {
						// log
						if (consoleLogWda) console.log("enviarFrmUsuarios: ");
						callFn(enviarFrmUsuarios);
					});
			};
	}
	/**
	*            AGREGAR USUARIO
	*/
	function addUsuario(usuario, clave, telefono, direccion, correo, nombre, apellido, blob) {
		/* log */
		if (consoleLogWda) console.log("Agregando Usuario - argumentos:", arguments);
		
		$('#msg').html('');
		
		sesion 	= 0;
		permiso = 0;
		var obj = { usuario: usuario, clave: clave, permiso: permiso, telefono: telefono, direccion: direccion, correo: correo, nombre: nombre, apellido: apellido, sesion: sesion };
		if (typeof blob != 'undefined'){
			obj.blob = blob;
		}
		var db;
		/* log */
		if (consoleLogWda) console.log("Agregando Usuario - Abriendo ...");
		var request = indexedDB.open(DB_NAME);
			request.onerror = function(event) {
				/* log error */
				if (consoleErrorWda) console.error("Error mostrarListaUsuarios:", "Al abrir la DB. -> " + this.error);
			};
			request.onsuccess = function(event) {
				db 		= this.result;
				var tx 	= db.transaction(DB_STORE_USUARIOS, 'readwrite');
				store 	= tx.objectStore(DB_STORE_USUARIOS);
				var req;
					try {
						req = store.add(obj);
					} catch (e) {
						if (e.name == 'DataCloneError')
							displayActionFailure("El sistema no sabe como clonar Blob, use Firefox.");
						throw e;
					}
					req.onsuccess = function (evt) {
						/* log */
						if (consoleLogWda) console.log("Insersion de Usuario en DB .......  [ok]");
						displayActionSuccess();
						mostrarListaUsuarios(store);
					};
					req.onerror = function() {
						/* log error */
						if (consoleErrorWda) console.error("Error al agregar Usuario: ", this.error);
						displayActionFailure(this.error);
					};
				/* log */
				if (consoleLogWda) console.log("Agregando Usuario - Cerrando ...");
				db.close();
			};
	}
	/**
	*			RESUMEN DE BD
	*/
	function resumenDB(){
		// log
		if (consoleLogWda) console.log("resumenDB... Abriendo DB...");

		/*
		var nom = nombreUsuario.value;
		var input_pass = document.getElementById("pass");
		var pass = input_pass.value; // CryptoJS.SHA1(input_pass.value);
		*/

		var db;
		var req;

		var request = indexedDB.open(DB_NAME);
		
			request.onerror = function(event) {
				// log error
				if (consoleErrorWda) console.error("resumenDB:", "Al abrir la DB. -> " + this.error);
			};
			
			request.onsuccess = function(event) {
				db = this.result;
				
				comprobarEstadoDB(db, DB_STORE_USUARIOS, "TUsr");
				comprobarEstadoDB(db, DB_STORE_PROBLEMAS, "TProb");
				comprobarEstadoDB(db, DB_STORE_PROTOCOLO, "TProt");
				comprobarEstadoDB(db, DB_STORE_CODIGOPENAL, "TCP");

				db.close();
			};
	}
	/**
	*		COMPROBAR ESTADO DE DB
	*		DB - TABLA - ELEMENTID
	*/
	function comprobarEstadoDB(db, tabla, tagId){
		var tx = db.transaction(tabla, 'readonly');
		store = tx.objectStore(tabla);

		req = store.count(); /* total de usuarios */
		
		req.onsuccess = function(evt) {
			/* log */
			if (consoleLogWda) console.log("comprobarEstadoDB... "+ tabla +" Total : " + this.result);
			
			document.getElementById(tagId).innerHTML = this.result;
			return;
		};
	}
	/**
	*         ACTUALIZAR USUARIOS
	*/
	function actualizarFechaSesion(){
		// log
		if (consoleLogWda) console.log("actualizarFechaSesion:");

		var fecha = new Date();
		var sesion;
		var key = usuarioGuardado.key;

		// log
		if (consoleLogWda) console.log("actualizarFechaSesion: Abriendo ... " + key);

		var db;
		var request = indexedDB.open(DB_NAME);
		  request.onerror = function(event) {
			// log error
			if (consoleErrorWda) console.error("actualizarFechaSesion:", "Al abrir la DB. -> " + this.error);
			return false;
		  };
		  request.onsuccess = function(event) {
			db = this.result;

			var tx = db.transaction(DB_STORE_USUARIOS, 'readwrite');
			store = tx.objectStore(DB_STORE_USUARIOS);

			var keyRange = IDBKeyRange.only(key);

			objCursor = store.openCursor(keyRange);

			objCursor.onsuccess = function(e){
				var cursor = this.result;
				var obj = cursor.value;
				if(isNaN(obj.sesion)){
					sesion = 1;
				}else{
					sesion = obj.sesion + 1;
				}
				
				// cargo los objetos a actualizar
				obj.fecha =  fecha.toDateString();
				obj.sesion = sesion;
				usuarioGuardado.sesion = sesion;
				// log
				if (consoleLogWda) console.log("actualizarFechaSesion: guardando ..." + obj.sesion);

				var request = cursor.update(obj);
				  request.onsuccess = function(e){
					// log
					if (consoleLogWda) console.log('actualizarFechaSesion: Se actualizo el usuario cuya key es: ' + key + ' - sesion: ' + sesion);
					db.close();
					return true;
				  }
				  request.onerror = function(e){
					// log
					if (consoleLogWda) conosole.log("actualizarFechaSesion: error al actualizar cursor: " + e);
					db.close();
					return false;
				  }
			}
			objCursor.onerror = function(e){
				// log
				if (consoleLogWda) conosole.log("actualizarFechaSesion: error al actualizar al abrir cursor: " + e);
				db.close();
				return false;
			}   
		  }
	}
	/**
	*         ELIMINAR ELEMENTOS CON SU KEY PRIMARIA
	*/
	this.eliminarUsuario = function eliminarUsuario(key) {
		/* log */
		if (consoleLogWda) console.log("eliminarUsuario - Abriendo ...");
		var db;
		var request = indexedDB.open(DB_NAME);
			request.onerror = function(event) {
				/* log error */
				if (consoleErrorWda) console.error("Error mostrarListaUsuarios:", "Al abrir la DB. -> " + this.error);
			};
			request.onsuccess = function(event) {
				db 		= this.result;
				var tx 	= db.transaction(DB_STORE_USUARIOS, 'readwrite');
				store 	= tx.objectStore(DB_STORE_USUARIOS);
				var req = store.get(key);
					req.onsuccess = function(evt) {
						var record = evt.target.result;
						/* log */
						if (consoleLogWda) console.log("eliminar usuario: ", record);
						if (typeof record == 'undefined') {
							displayActionFailure("Error en el script, la calve enviada ya fue borrada o no existe.");
							db.close();
							return;
						}
						req = store.delete(key);
							req.onsuccess = function(evt) {
								/* log */
								if (consoleLogWda) console.log("evt:", evt);
								if (consoleLogWda) console.log("evt.target:", evt.target);
								if (consoleLogWda) console.log("evt.target.result:", evt.target.result);
								if (consoleLogWda) console.log("eliminado correctamente");
								displayActionSuccess("Eliminado correctamente");
								mostrarListaUsuarios();
							};
							req.onerror = function (evt) {
								/* log error */
								if (consoleErrorWda) console.error("eliminar usuario: ", evt.target.errorCode);
							};
					};
					req.onerror = function (evt) {
						/* log error */
						if (consoleErrorWda) console.error("eliminar usuario: ", evt.target.errorCode);
					};
					/* log */
					if (consoleLogWda) console.log("eliminarUsuario - Cerrando ...");
					db.close();					
			};
	};
	/**
	*         BUSCAR EN LA BASE DE DATOS SEGUN LOS INDICES
	*/
	function loadAllByName() {
		/* log */
		if (consoleLogWda) console.log("loadAllByName Abriendo ...");
		var db;
		var request = indexedDB.open(DB_NAME);
			request.onerror = function(event) {
				/* log error */
				if (consoleErrorWda) console.error("loadAllByName:", "Al abrir la DB. -> " + this.error);
			};
			request.onsuccess = function(event) {
				db 			= this.result;
				var tx 		= db.transaction(DB_STORE_USUARIOS, 'readonly');
				store 		= tx.objectStore(DB_STORE_USUARIOS);
				var o_nom 	= $('#elementsList');	o_nom.empty();
				var HTML 	= '<div><table>';
				var index 	= store.index("por_usuario");
					index.openCursor().onsuccess = function (e) {
						var cursor = this.result;
						if (cursor) {
							HTML += '<tr><td>'+cursor.value.nombre+'</td><td>'+cursor.value.apellido+'</td></tr></div>';
							cursor.continue();
						}else{
							HTML += '</table></div>';
							if (consoleLogWda) console.log("ordenar por nombre: fuera: " + HTML);
							o_nom.append(HTML);
							/* log */
							if (consoleLogWda) console.log('Se listaron todos los registros. ATENCIÓN: Listar por indice, implica que si un indice contiene valores undefined, estos no se listarán.');
						}
					};
					if (consoleLogWda) console.log("loadAllByName: Cierro DB..."); //, cursor);
					db.close();
			};
	} 
/* CIRRO LA CLASE */
}

/*
*         INICIO
*/
var miClase = new indexedWda(soportaSessionStorage);
miClase.openDb();
miClase.inicializar();

//miClase.addEventListeners();
//