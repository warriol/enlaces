<!--
function validarnoticia(form)
{
    if (form.ftitulo.value == "" || form.ftitulo.value == null)
    {alert("Por favor ingrese un titulo");form.ftitulo.focus();return false;}
    if (form.fresumen.value == "" || form.fresumen.value ==null)
    {alert("Por favor ingrese un pequeÃ±o resumen");form.fresumen.focus();return false;}
    if (form.fcuerpo.value == "" || form.fcuerpo.value == null)
    {alert("Por favor reingrese el texto de la noticia");form.fcuerpo.focus();return false;}
    

     return true;
}

// ****************************************************************************************
// ************************* FUNCIONES GENERALES ***************************************
function iniciofoco()
{
    if(document.forms.length > 0) {
  for(var i=0; i < document.forms[0].elements.length; i++) {
    var campo = document.forms[0].elements[i];
    if(campo.type != "hidden") {
      campo.focus();
      break;
    }
  }
}
}



function permite(elEvento, permitidos) {
  // Variables que definen los caracteres permitidos
  var numeros = "0123456789";
  var caracteres = " abcdefghijklmnÃ±opqrstuvwxyzABCDEFGHIJKLMNÃ‘OPQRSTUVWXYZ";
  var numeros_caracteres = numeros + caracteres;
  var teclas_especiales = [8, 9, 37, 39, 46];
  // 8 = BackSpace, 9 = tab, 46 = Supr, 37 = flecha izquierda, 39 = flecha derecha
 
 
  // Seleccionar los caracteres a partir del parÃ¡metro de la funciÃ³n
  switch(permitidos) {
    case 'num':
      permitidos = numeros;
      break;
    case 'car':
      permitidos = caracteres;
      break;
    case 'num_car':
      permitidos = numeros_caracteres;
      break;
  }
 
  // Obtener la tecla pulsada 
  var evento = elEvento || window.event;
  var codigoCaracter = evento.charCode || evento.keyCode;
  var caracter = String.fromCharCode(codigoCaracter);
 
  // Comprobar si la tecla pulsada es alguna de las teclas especiales
  // (teclas de borrado y flechas horizontales)
  var tecla_especial = false;
  for(var i in teclas_especiales) {
    if(codigoCaracter == teclas_especiales[i]) {
      tecla_especial = true;
      break;
    }
  }
 
  // Comprobar si la tecla pulsada se encuentra en los caracteres permitidos
  // o si es una tecla especial
  return permitidos.indexOf(caracter) != -1 || tecla_especial;
}
/* 
// SÃ³lo nÃºmeros
<input type="text" id="texto" onkeypress="return permite(event, 'num')" />
 
// SÃ³lo letras
<input type="text" id="texto" onkeypress="return permite(event, 'car')" />
 
// SÃ³lo letras o nÃºmeros
<input type="text" id="texto" onkeypress="return permite(event, 'num_car')" />
*/

//****************************************************************************
//LIMITA CANTIDAD DE CARACTERES QUE SE INGRESA A UN TEXTAREA
//****************************************************************************
function limita(elEvento, maximoCaracteres) {
  var elemento = document.getElementById("texto");
 
  // Obtener la tecla pulsada 
  var evento = elEvento || window.event;
  var codigoCaracter = evento.charCode || evento.keyCode;
  // Permitir utilizar las teclas con flecha horizontal
  if(codigoCaracter == 37 || codigoCaracter == 39) {
    return true;
  }
 
  // Permitir borrar con la tecla Backspace y con la tecla Supr.
  if(codigoCaracter == 8 || codigoCaracter == 46) {
    return true;
  }
  else if(elemento.value.length >= maximoCaracteres ) {
    return false;
  }
  else {
    return true;
  }
}

//<textarea id="texto" onkeypress="return limita(100);"></textarea>
 //*****************************************************************************
 
 //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 //INDICA LA CANTIDAD QUE RESTAN PARA INGRESAR EN EL TEXTAREA
 //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function actualizaInfo(maximoCaracteres) {
  var elemento = document.getElementById("texto");
  var info = document.getElementById("info");
 
  if(elemento.value.length >= maximoCaracteres ) {
    info.innerHTML = "MÃ¡ximo "+maximoCaracteres+" caracteres";
  }
  else {
    info.innerHTML = "Puedes escribir hasta "+(maximoCaracteres-elemento.value.length)+" caracteres adicionales";
  }
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//*****************************************************************************
//CREA Y MUESTRA RELOJ
//*****************************************************************************
function muestraReloj(){
    var fechaHora= new Date();
    
    var diadelmes=fechaHora.getDate();
    var nromes=fechaHora.getMonth();
    var diadelasemana=fechaHora.getDay();
    var anio=fechaHora.getFullYear();
    var horas=fechaHora.getHours();
    var minutos=fechaHora.getMinutes();
    var segundos=fechaHora.getSeconds();
    var meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Setiembre","Octubre","Noviembre","Diciembre"];
    var diasdelasemana=["Domingo","Lunes","Martes","Mi&eacute;rcoles","Jueves","Viernes","S&aacute;bado"];
    
    if(horas<10) {horas='0'+horas;}
    if(minutos<10) {minutos='0'+minutos;}
    if(segundos<10) {segundos='0'+segundos;}
    
    document.getElementById("reloj").innerHTML= diasdelasemana[diadelasemana]+", "+diadelmes+" de "+meses[nromes]+" de "+anio+" --- "+horas+':'+minutos+':'+segundos;
}
window.onload=function(){
    setInterval(muestraReloj,1000);
}
    
//*****************************************************************************
// ***************** VER BOLETINES ******************************************

function asignoTipoDoc(){
    //////////////////////////////////////////////////////////////////////////////
    // OBTENER EL VALOR DE UNA OPCION DEL COMBO
    //////////////////////////////////////////////////////////////////////////////
    //Obtener la referencia a la lista
    var lista=document.getElementById("ftipodocumento");
    //Obtener el Ã­ndice de la opciÃ³n que se ha seleccionado
    var indiceSeleccionado=lista.selectedIndex;
    //Con el indice y el array options, obtengo la opcion seleccionada
    var opcionSeleccionada=lista.options[indiceSeleccionado];
    //Obtener el valor y el texto de la opciÃ³n seleccionada
    //var textoSeleccionado=opcionSeleccionada.text;
    var valorSeleccionado=opcionSeleccionada.value;
    ////////////////////////////////////////////////////////////////////////////
    if(valorSeleccionado!=0){
    //    alert("Opcion Seleccionada: "+textoSeleccionado+" Valor de opcion: "+valorSeleccionado);
        document.getElementById("FrameNro").hidden=false;
        document.getElementById("FrameFecha").hidden=false;
        //document.getElementById("FrameRango").hidden=false;

        var tipodocumento=document.getElementsByName("tipodoc");
        for (x=0;x<tipodocumento.length;x++){
            tipodocumento[x].value=valorSeleccionado;
        }


    } else {
            alert("Debe elegir un tipo de documento para visualizar");
            document.getElementById("FrameNro").hidden=true;
            document.getElementById("FrameFecha").hidden=true;
            document.getElementById("FrameRango").hidden=true;
        }
  
}

function chequeaComboTipoDocumento(){
    var lista=document.getElementById("ftipodocumento");
    var opcionSeleccionada=lista.options[lista.selectedIndex];
    var valorSeleccionado=opcionSeleccionada.value;
    ////////////////////////////////////////////////////////////////////////////
    if(valorSeleccionado!=0){return true;} else {return false;}
}

function validarNroBoletin(form){
    if(chequeaComboTipoDocumento()){
        if (form.fnroboletin.value == "" || form.fnroboletin.value == null){
                alert("Debe ingresar un numero de documento");form.fnroboletin.focus();return false;
            }
        else{return true;}
    } else {
        alert("Debe ingresar un tipo de documento.");
        return false;
    }
    
}

function validarFechaBoletin(form){
    if(chequeaComboTipoDocumento()){
        if (form.ffechaboletin.value == "" || form.ffechaboletin.value == null)
        {alert("Debe ingresar una fecha de documento");form.ffechaboletin.focus();return false;
            }
        else{return true;}
    } else {
        alert("Debe ingresar un tipo de documento.");
        return false;
    }
    }
        


//*******************************************************************************
// ************************ ALTA BOLETINES *************************************

function validarAltaBoletin(){
    var lista=document.getElementById("ftipodocumento");
    var farchivo=document.getElementById("archivo");
    
    //Obtener la opciÃ³n que se ha seleccionado en el combo Tipo Documento
    var indiceSeleccionado=lista.selectedIndex;
    var opcionSeleccionada=lista.options[indiceSeleccionado];
    var valorSeleccionado=opcionSeleccionada.value;

    //Obtener nombre y extensiÃ³n del archivo que se va a subir
    var archivo=farchivo.value;
//    var nombreArchivo=archivo.substring(0,archivo.length-4);
    var extension=archivo.substring(archivo.length-3);
    
    //Realizo los controles antes de subir el archivo
    
    if(valorSeleccionado!=0){
        if(archivo=="" || archivo==null){
                alert("Debe elegir un archivo a subir.");
                return false;
            }
        if(extension!="pdf"){
                alert("El formato del documento debe ser pdf.");
                return false;
            }
//        if(isNaN(nombreArchivo)){
//                alert("El archivo debe tener un nombre numerico. (El numero de Boletin)");
//                return false;
//            }    
        return true;
    } else{
            alert("Debe seleccionar un tipo de documento");
            return false;}
    
}

// *****************************************************************************

//*******************************************************************************
// ************************ ALTA USUARIOS *************************************

function validarAltaUsuarios(){
    
    var fusuario=document.getElementById("fusuario");
    var fpass=document.getElementById("fpass");
    var fconfpass=document.getElementById("fconfpass");
    var fnivel=document.getElementById("fniveles");
    
      
    //Obtener el valor de la opciÃ³n que se ha seleccionado en el combo Nivel
    var indiceSeleccionado=fnivel.selectedIndex;
    var opcionSeleccionada=fnivel.options[indiceSeleccionado];
    var idnivel=opcionSeleccionada.value;
    


    //Obtener nombre y extensiÃ³n del archivo que se va a subir
//    var archivo=farchivo.value;
//    var nombreArchivo=archivo.substring(0,archivo.length-4);
//    var extension=archivo.substring(archivo.length-3);
    
    //Realizo los controles antes de subir el archivo
        if(fusuario.value=="" || fusuario.value==null){
                alert("Debe ingresar un nombre de usuario.");
                fusuario.focus();
                return false;
        }
        if(fpass.value=="" || fpass.value==null){
                alert("Debe ingresar una password.");
                fpass.focus();
                return false;
        }
        if(fconfpass.value=="" || fconfpass.value==null){
                alert("Debe confirmar la password.");
                fconfpass.focus();
                return false;
        }
        if(fpass.value!=fconfpass.value){
                alert("Las contrase\u00f1as ingresadas no coinciden. Por favor verifique.");
                fconfpass.focus();
                return false;
        }
        if(idnivel==0){
                alert("Debe definir un nivel para el usuario");
                return false;
            }
        
        return true;
    }
    


// *****************************************************************************
//*****************************************************************************
function controloTipoDoc(){
    //Obtener la referencia a la lista
    var lista=document.getElementById("ftipodocumento");
    //Con el indice y el array options, obtengo la opcion seleccionada
    var opcionSeleccionada=lista.options[lista.selectedIndex];
    //Obtener el valor y el texto de la opciÃ³n seleccionada
    var valorSeleccionado=opcionSeleccionada.value;
    ////////////////////////////////////////////////////////////////////////////
        if(valorSeleccionado == 0){
            alert("Debe elegir un tipo de documento para visualizar");

        } else {
                    this.submit();
                } 
    
}
//*************************************************************************
