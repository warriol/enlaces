/*
* Se encaga de codifica la contraseña antes de enviar el formulario
* paa ello creamos un campo nuevo oculto al cual le asignamos la contraseña ya cifrada
* el campo contraseña del formulario es cambiado por su value por otro, paa que la contraseña no sea enviada sin cifrar
*/
function formhash(form, password) {
   //Crea una entrada de elemento nuevo, esta estará fuera del campo de contraseña con algoritmo hash.
   var p = document.createElement("input");
   //Agrega el elemento nuevo a nuestro formulario.
   form.appendChild(p);
   p.name = "p";
   p.type = "hidden"
   p.value = hex_sha512(password.value);
   //Asegúrate de que la contraseña en texto simple no sea enviada.
// password.value = "";
	if (password.value != ""){
		password.value = 'llllvaciollll';
		form.submit();
	};
   //Finalmente envía el formulario.
// form.submit();
}
//