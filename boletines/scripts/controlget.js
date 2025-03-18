	// JavaScript Document
	// index.html?numbod=&date=&date1=&enviar=Enviar#
	// index.html?id=123&ref=jmp
    //  http://10.100.0.202:8080/intranet.anterior/Boletines/Montevideo/BOD/34681.pdf
	function controlGET(){
	    
	    //valida_envia();
	    
		var Url = location.href;
		// var Url_b = "http://10.100.0.6/intranet/boletines/";
		var Url_2016 = "http://10.100.0.202:8080/intranet.anterior/Vistas/BuscarBoletinIntranet2.php?tipodoc=1&formulario=nro&fnroboletin=";
		var Url_2016_Can = "http://10.100.0.202:8080/intranet.anterior/Vistas/BuscarBoletinIntranet2.php?tipodoc=3&formulario=nro&fnroboletin=";
		// ffechaboletin
		var Url_F_2016 = "http://10.100.0.202:8080/intranet.anterior/Vistas/BuscarBoletinIntranet2.php?tipodoc=1&formulario=fecha&ffechaboletin=";
						var Url_F_2016_Can = "http://10.100.0.202:8080/intranet.anterior/Vistas/BuscarBoletinIntranet2.php?tipodoc=3&formulario=fecha&ffechaboletin=";
		var Url_b = "http://10.100.0.202:8080/intranet.anterior/Boletines/";
		var Url_n = "abmBoletin/archivador/";
		var Url_d_M = "Montevideo/";
		var Url_t_b = "BOD/";
		var Url_t_p = "PDI/";
		var Url_a_M_B = "Consulta.asp?Enlace=2&Tipo=1&Fecha=";
		var Url_a_M_P = "Consulta.asp?Enlace=2&Tipo=2&Fecha=";
		var Ext = ".pdf";
		var res = "No hay resultados";
		// Salida.mivar = "";
		/*
		Enlace:
			2- busca por fecha
			3- va al almanaque
		Tipo:
			1- BOD Montevideo
			2- PDI Montevideo
		*/
			//http://localhost/wda/otros/enlaces.html-5.me/boletines/index.html?numbod=&numbodcan=&date=&date1=12%2F02%2F2020&enviar=Enviar#
			//http://localhost/wda/otros/enlaces.html-5.me/boletines/index.html?numbod=&numbodcan=&date=12%2F01%2F2020&date1=&enviar=Enviar#
			Url = Url.replace(/.*\?(.*?)/,"$1");
			Variables = Url.split ("&");
			
			for (i = 0; i < Variables.length; i++) {
				Separ = Variables[i].split("=");
				eval ('var '+Separ[0]+'="'+Separ[1]+'"');
			}
			
				Separ = date.split("%2F");
				dateSplit = Separ[0] + '/' + Separ[1] + '/' + Separ[2];
				// date = Separ[1] + '/' + Separ[0] + '/' + Separ[2];
				sep = date1.split("%2F");
                dateSplit2 = sep[0] + '/' + sep[1] + '/' + sep[2]
				// Para comprobarlo:
    			//	alert("numbod: " + numbod + ".");
				//	alert(ref);
			if (numbod != ""){
				// res1 = Url_b + Url_n + Url_d_M + Url_t_b + numbod + Ext;
				// res1 = Url_b + Url_d_M + Url_t_b + numbod + Ext;
				res1 = Url_2016 + numbod;
				// res += '<br><a href="http://google.com.uy/" target="_new">hola</a>';
				res = '<samp id="subtitulo1">Resultado de la Búsqueda:</samp> <br> Aquí el enlace: <a href="javascript:otra_ventana(\'' + res1 + '\')">' + numbod + '</a><br>';
				// alert(res);
				document.getElementById('contenedorBODN').innerHTML = res;
			}
			if(numbodcan != ""){
				res1 = Url_2016_Can + numbodcan;
				// res += '<br><a href="http://google.com.uy/" target="_new">hola</a>';
				res = '<samp id="subtitulo1">Resultado de la Búsqueda:</samp> <br> Aquí el enlace: <a href="javascript:otra_ventana(\'' + res1 + '\')">' + numbodcan + '</a><br>';
				// alert(res);
				document.getElementById('contenedorBODC').innerHTML = res;
			}
			if (dateSplit != "/undefined/undefined" ){
				res1 = Url_F_2016 + dateSplit;
				//res2 = Url_b + Url_a_M_P + date;
				res = '<samp id="subtitulo1">Resultado de la Búsqueda:</samp> <br> Aquí el enlace: <a href="javascript:otra_ventana(\'' + res1 + '\')">' + dateSplit + '</a><br>';
				// res += '<samp id="subtitulo1">Listado de Boletines de Montevideo:</samp> <br> ---> <a href="javascript:otra_ventana(\'' + res1 + '\')">' + date + '</a><br>';
				// res += '<samp id="subtitulo1">Parte Diario:</samp> <br> Aquí el enlace: <a href="javascript:otra_ventana(\'' + res2 + '\')">' + dateSplit + '</a><br>';
				// alert(res);
				document.getElementById('contenedorBODMF').innerHTML = res;
			}
			if (dateSplit2 != "/undefined/undefined"){
				//alert(dateSplit2);
				res1 = Url_F_2016_Can + dateSplit2;
				res = '<samp id="subtitulo1">Resultado de la Búsqueda:</samp> <br> Aquí el enlace: <a href="javascript:otra_ventana(\'' + res1 + '\')">' + dateSplit2 + '</a><br><small>Recuerde que en Canelones se publican los Boletines los días Viernes únciamente.</small>';
				document.getElementById('contenedorBODCF').innerHTML = res;
			}
			/*
			else{
				res = "Todavía no se ha implementado la busqueda por margenes de fecha, disculpe.";
				alert(res);
			}
			*/
				// createCustomAlert('Tiene que llenar al menos un campo: hola.');
			   //alert('Importante!!!\n\n\t Si no logras ver bien la página o algún servicio no funciona como debería, no pierda la calma y prefiona Ctrl + F5.');
			   //document.fvalida.edad.focus();
			   // val = false;
	}

//******
