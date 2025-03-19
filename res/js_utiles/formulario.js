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
//