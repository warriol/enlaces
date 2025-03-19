// JavaScript Document
// JavaScript Document

function valida_envia(){
	// variables
	var numbod = document.fvalida.numbod.value.length;
	var numbod1 = document.fvalida.numbod.value;
	var fini = document.fvalida.date.value;
	var ffin = document.fvalida.date1.value;
	var val = true;

    //controlar campos vacios
    if (numbod=="" && fini=="" && ffin=="" && numbodcan==""){
		// createCustomAlert('Tiene que llenar al menos un campo: hola.');
       alert("Tiene que llenar al menos un campo. Si solo coloca un número de BOD l podrá ver. Si solo coloca una fecha de inicio, verá el BOD de dicha fecha. Si coloca fecha de inicio y fin, verá el listado de boletines comprendido en las fechas ingresadas.")
       document.fvalida.edad.focus()
       val = false;
    }
    /*
    else{
  		// si hay fecha de inicio, controlo si hay fecha de fin
  		if (numbod != ""){
  			// alert("Se mostrará el BDO Nº: " + numbod1);
  			document.fvalida.date.value = "";
  			document.fvalida.date1.value = "";
  		}
  		if (fini != ""){
          	// alert("Se buscará boletines del día: " + fini)
  			document.fvalida.numbod.value = "";
  			document.fvalida.date1.value = "";
  		}
      /*
  		if (ffin != "" && fini == ""){
          	alert("Debe indicar la fecha de inicio.")
  			// document.fvalida.numbod.value = "";
  		}
  		if (ffin != "" && fini != ""){
  				if (compare_dates(fini, ffin)){  
  				  alert("La fecha de inicio es posterior a la fecha de fin"); 
  				  val = false;
  				}else{  
  				  alert("Todav a no se ha implementado esta opci n.");  
  				}  
  		}
    * /
    }
    */
    //el formulario se envia
    // alert("La página se recargará....");
	if (val = true) {
		document.location.href = document.location.href;
	}else{
		return false;
	}
    //document.fvalida.submit();
} 

function otra_ventana(direccion){
		var ruta=direccion;
		var caracteristicas="toolbar=0, location=0, directories=0, resizable=0, scrollbars=0, height=800, width=600, top=50, left=150";
		win=window.open(ruta ,"",caracteristicas);
} 

function compare_dates(fecha, fecha2){  
    var xMonth=fecha.substring(3, 5);  
    var xDay=fecha.substring(0, 2);  
    var xYear=fecha.substring(6,10);  
    var yMonth=fecha2.substring(3, 5);  
    var yDay=fecha2.substring(0, 2);  
    var yYear=fecha2.substring(6,10);  
    if (xYear> yYear)  
    {  
        return(true)  
    }  
    else  
    {  
      if (xYear == yYear)  
      {   
        if (xMonth> yMonth)  
        {  
            return(true)  
        }  
        else  
        {   
          if (xMonth == yMonth)  
          {  
            if (xDay> yDay)  
              return(true);  
            else  
              return(false);  
          }  
          else  
            return(false);  
        }  
      }  
      else  
        return(false);  
    }  
}  

/*
function valida_envia(){
	// variables
	var numbod = document.fvalida.numbod.value.length;
	var numbod1 = document.fvalida.numbod.value;
	var fini = document.fvalida.date.value;
	var ffin = document.fvalida.date1.value;
	var val = true;

    //controlar campos vacios
    if (numbod=="" && fini=="" && ffin==""){
		// createCustomAlert('Tiene que llenar al menos un campo: hola.');
       alert("Tiene que llenar al menos un campo. Si solo coloca un número de BOD l podrá ver. Si solo coloca una fecha de inicio, verá el BOD de dicha fecha. Si coloca fecha de inicio y fin, verá el listado de boletines comprendido en las fechas ingresadas.")
       document.fvalida.edad.focus()
       val = false;
    }else{
		// si hay fecha de inicio, controlo si hay fecha de fin
		if (numbod != ""){
			// alert("Se mostrará el BDO Nº: " + numbod1);
			document.fvalida.date.value = "";
			document.fvalida.date1.value = "";
		}
		if (fini != ""){
        	// alert("Se buscará boletines del día: " + fini)
			document.fvalida.numbod.value = "";
			document.fvalida.date1.value = "";
		}
		if (ffin != "" && fini == ""){
        	alert("Debe indicar la fecha de inicio.")
			// document.fvalida.numbod.value = "";
		}
		if (ffin != "" && fini != ""){
				if (compare_dates(fini, ffin)){  
				  alert("La fecha de inicio es posterior a la fecha de fin"); 
				  val = false;
				}else{  
				  alert("Todav a no se ha implementado esta opci n.");  
				}  
		}
    }
    //el formulario se envia
    // alert("La página se recargará....");
	if (val = true) {
		document.location.href = document.location.href;
	}else{
		return false;
	}
    //document.fvalida.submit();
} 

function otra_ventana(direccion){
		var ruta=direccion;
		var caracteristicas="toolbar=0, location=0, directories=0, resizable=0, scrollbars=0, height=800, width=600, top=50, left=150";
		win=window.open(ruta ,"",caracteristicas);
} 

function compare_dates(fecha, fecha2){  
    var xMonth=fecha.substring(3, 5);  
    var xDay=fecha.substring(0, 2);  
    var xYear=fecha.substring(6,10);  
    var yMonth=fecha2.substring(3, 5);  
    var yDay=fecha2.substring(0, 2);  
    var yYear=fecha2.substring(6,10);  
    if (xYear> yYear)  
    {  
        return(true)  
    }  
    else  
    {  
      if (xYear == yYear)  
      {   
        if (xMonth> yMonth)  
        {  
            return(true)  
        }  
        else  
        {   
          if (xMonth == yMonth)  
          {  
            if (xDay> yDay)  
              return(true);  
            else  
              return(false);  
          }  
          else  
            return(false);  
        }  
      }  
      else  
        return(false);  
    }  
}
//**
//