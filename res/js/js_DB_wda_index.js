/*
*         FUNCION PARA TRABAJAR CON INDEXEDDB
*         WILSON DENIS ARRIOLA - 2015
*         warriol@gmail.com
*         INDEX.HTML
*/
if(window.sessionStorage){console.log("soportaSessionStorage ...  [ok]");soportaSessionStorage=true;}else{soportaSessionStorage=false;console.log("soportaSessionStorage ...  [err]");throw new Error('Tu Browser no soporta LocalStorage!');}


function indexedWda(sSS) {
  /**
  *         VERIFICO LAS OPCIONES DEL NAVEGADOR Q USA EL USUARIO
  */
  var explorador;
  explorador = '[JavaScript Activado: ' + navigator.javaEnabled() + ' ] '; /* JAVASCRIPT */
  explorador += '[idioma: ' + navigator.language + ' ] '; /* IDIOMA */
  explorador += '[verision: ' + navigator.appVersion + '] '; /* VERSION */
  explorador += "[Nombre: " + navigator.appName + " ] [Codigo:  " + navigator.appCodeName + " ] "; /* NOMBE */
  explorador += "[Cookies Activadas: " + navigator.cookieEnabled + ' ]'; /* COOKIES */
  explorador += '[viene de: ' + document.referrer + ' ]';

  document.getElementById("demo").innerHTML = explorador;
  /**
  *         NECESARIOS
  */
  window.indexedDB      = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.OIndexedDB;
  window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || window.OIDBTransaction;
  window.IDBKeyRange    = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
  /*
  *         CONSTANTES
  */
  const DB_NAME               = 'arriola_DB';
  const DB_VERSION            = 1;                /* no usar numeros decimales */
  const DB_STORE_USUARIOS     = 'usuarios';
  const DB_STORE_PROBLEMAS    = 'problemas';
  const DB_STORE_PROTOCOLO    = 'protocolo';
  const DB_STORE_CODIGOPENAL  = 'codigopenal';
  /*
  *         VARIABLES
  */
  var db;                                         /* variable para guardar la conexion a la DB */
  var dentroFuera           = 1;
  var consoleLogWda         = true;
  var consoleErrorWda       = true;
  var soportaSessionStorage = sSS;
  var modoDebug             = false;
  var obj                   = {
                                usuario: "Wilson",
                                clave: "admin",
                                permiso: 4,
                                correo: "warrio@gmail.com",
                                nombre: "Wilson",
                                apellido: "Arriola",
								sesion: 0
  };
  /* Json para sessinoStorage */
  var usuarioJSON           = {
                                key:      0,
                                usuario:  "invitado",
                                nombre:   "Invitado",
                                iniciado: false,
                                permiso:  0,
                                sesion:   0
  };

  /* le doy formato al objeto JSON */
  var usuarioAGuardar = JSON.stringify(usuarioJSON);
  /* creo una variables para el usuarios logeado */
  var usuarioGuardado;
  var permisoUsuario =  {
                          1: "NO ACTIVADO",
                          2: "USUARIO",
                          3: "ADMINISTRADOR",
                          4: "SUPER USUARIO"
                        }

  /* ETIQUETAS */
  var tagIdIniciarSesion  = $('#iniciarSesion');
  var tagIdContenedor     = $('#contendor');
  var pub_msg             = $('#pub-msg');
  var pub_list            = $('#pub-list');

  // HTML
  var htmlInv = 
    '  <form id="formulario_registro">' +
    '    <div id="colVertical">' +
    '     <ul><li>' +
    '       <input type="text" id="usr" name="usr" placeholder="Usuario" required/>' +
    '       <input type="password" id="pass" name="pass" placeholder="pass" required/>' +
    '     </li><li>' +
    '       <button id="enviar_frm_inicio" type="button">Enviar</button>' +
    '     </li></ul>' +
    '    </div>' +
    '    <div id="etiqueta">' +
    '       <span>Iniciar Sesión</span>' +
    '    </div>' +
    '  </form>';  
    var inicioDebug =
    '<h1>Creación de base de datos y sesion con IndexedDB</h1>' +
    '    <div class="note">' +
    '       <p>Funcionando y probado para:</p>' +
    '       <div id="compat"></div>' +
    '    </div>';
  /*
  *         AVISO COMPATIBILIDAD
  */
  var COMPAT_ENVS = [
                    ['Firefox',       ">= 16.0"],
                    ['Google Chrome', ">= 24.0 (Necesitas Google Chrome Canary), No soporta Blob storage"]
                    ];
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

  /*
  *         FUNCIONES
  */
  /*
  *         ABRIR LA DB
  */
  this.openDb = function openDb() {
    // log
    if (consoleLogWda) console.log("[Abriendo openDB --->" + DB_NAME + " - " + DB_VERSION);

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
  /*
  *         MENSAJES DE ERROR O DE EXTITO
  */
  function displayActionSuccess(msg) {
    msg = typeof msg != 'undefined' ? "Exito: " + msg : "Success";
    $('#msg').html('<span class="action-success">' + msg + '</span>');
    // log
    if (consoleLogWda) console.log(msg);
  }
  function displayActionFailure(msg) {
    msg = typeof msg != 'undefined' ? "Error: " + msg : "Failure";
    $('#msg').html('<span class="action-failure">' + msg + '</span>');
    // log
    if (consoleLogWda) console.log(msg);
  }
  /*
  *         CONTROLADOR DE EVENTOS DE BOTONES
  */
  this.addEventListeners = function addEventListeners() {
    //log
    if (consoleLogWda) console.log("addEventListeners... [ok]");
    // resetar formularios
    $('#usuarios-form-reset').click(function(evt) {
      // log
      if (consoleLogWda) console.log("usuarios-form-reset");
    });
    // Listar usuarios
    var search_button = $('#search-list-button');
    search_button.click(function(evt) {
      // log
      if (consoleLogWda) console.log("search-list-button... [ok]");
      mostrarListaUsuarios();
    });
    // Ordenar por nombre
    var ordenar_p_nombre = $('#ordenar_por_nombre');
    ordenar_p_nombre.click(function(evt){
      loadAllByName();
    });
    // Boton inicio de sesion
    $('#enviar_frm_inicio').click(function(evt) {
      // log
      if (consoleLogWda) console.log("enviar_frm_inicio: ");
      // Cifrado de la contraseña
      iniciarSesion();
    });
    // Boton cerrar de sesion
    $('#btn_cerrarsesion').click(function(evt) {
      // log
      if (consoleLogWda) console.log("btn_cerrarsesion: ");
      // Cifrado de la contraseña
      sessionStorage.clear();
      location.reload(true);
    });
  }
  /*
  *         INICIAR SESION
  */
  function iniciarSesion(){
    // log
    // if (consoleLogWda) console.log("Inicio de Sesion.");
	$('#msg').empty();
    
    var nombreUsuario = document.getElementById("usr");
    var nom = nombreUsuario.value;
    var input_pass = document.getElementById("pass");
    var pass = input_pass.value; // CryptoJS.SHA1(input_pass.value);
    // valido formulario
    if (!nom || !pass) {
      displayActionFailure("Debe completar los dos campos, son obligatorios.");
      return;
    }

    // log
    // if (consoleLogWda) console.log("Inicio de Sesion: " + pass + ' - ' + nombreUsuario.value);
    if (consoleLogWda) console.log("iniciarSesion: Abriendo ...");

    var db;
    var request = indexedDB.open(DB_NAME);
      request.onerror = function(event) {
        // log error
        if (consoleErrorWda) console.error("iniciarSesion:", "Al abrir la DB. -> " + this.error);
      };
      request.onsuccess = function(event) {
        db = this.result;

        var tx = db.transaction(DB_STORE_USUARIOS, 'readonly');
        store = tx.objectStore(DB_STORE_USUARIOS);

        var req;
        req = store.count();
          req.onsuccess = function(evt) {
            /* log */
            if (consoleLogWda) console.log("Total de usuarios: " + this.result);
            /* total de usuarios */
            if (this.result == 0){
              /* log */
              if (consoleLogWda) console.log("No hay usuario, crear uno.");
            }
          };

        if (consoleLogWda) console.log("iniciarSesion: Abriendo ..." + store);

        var index = store.index("por_usuario");
        index.openCursor().onsuccess = function (e) {
          var result = e.target.result;
          // log
          //if (consoleLogWda) console.log("Inicio de Sesion: " +  result );

          if (result) {
            // busco en la base de datos
            // log
            //if (consoleLogWda) console.log("Inicio de Sesion: " + result.value.usuario + ' - ' + result.value.clave);
            if(result.value.usuario == nom){
              // COINCIDEN EL USUARIO
                // log
                // if (consoleLogWda) console.log("Inicio de Sesion: COMPARO EL CIFRADO: " + result.value.clave + ' - ' + pass);
              if(result.value.clave == pass){
                // COINCIDE LA CONTRASEÑA
                // log
                if (consoleLogWda) console.log("Inicio de Sesion: USUARIO LOGEADO: "); // + result.value.clave + ' - ' + nombreUsuario.value);
                // CREAR SESSIONSTORAGE

                usuarioJSON = {
                    key: result.value.id,
                    usuario: result.value.usuario,
                    nombre: result.value.nombre,
                    iniciado: true,
                    permiso: result.value.permiso,
                    sesion: result.value.sesion
                };
                usuarioAGuardar = JSON.stringify(usuarioJSON);
                sessionStorage.setItem("usuario", usuarioAGuardar);
                // obtengo el objeto de la key (usuario) y lo coloco en la variable (usuarioguardado)
                usuarioGuardado = sessionStorage.getItem("usuario");
                // parseo la variable (usuarioguarado) y la convierto en objeto JSON
                usuarioGuardado = JSON.parse(usuarioGuardado);
                if (consoleLogWda) console.log("Inicio de Sesion: USUARIO: " + usuarioGuardado.key + ' - ultima vez: ' +  result.value.fecha); // + result.value.clave + ' - ' + nombreUsuario.value);

                db.close();
				
                usuarioLogeado();
                return false;
              }else{
                if (consoleLogWda) console.log("Inicio de Sesion: CONTRASEÑA INCORRECTA");
                db.close();
                return false;
              }
            }
            result.continue();
          }else{
            if (consoleLogWda) console.log("Inicio de Sesion: NO EXISTE EL USUARIO.");
		displayActionFailure("Usuario/Contraseña incorrectos.");
          }
        };
        if (consoleLogWda) console.log("iniciarSesion: Cierro DB..."); //, cursor);
        db.close();
      };
  }
  /*
  * CREAR ADMINISTRADOR
  */
  this.crearAdmin = function crearAdmin(){
    /* log */
    if (consoleLogWda) console.log("crarAdmin: Se creará usuario por consola si la cantidad de usuarios es 0......");

    var db;
    /* log */
    if (consoleLogWda) console.log("crarAdmin - Abriendo ...");
    var request = indexedDB.open(DB_NAME);
      request.onerror = function(event) {
        /* log error */
        if (consoleErrorWda) console.error("Error crearAdmin:", "Al abrir la DB. -> " + this.error);
      };
      request.onsuccess = function(event) {
        db    = this.result;
        var tx  = db.transaction(DB_STORE_USUARIOS, 'readwrite');
        store   = tx.objectStore(DB_STORE_USUARIOS);

        var req1;
        req1 = store.count();
          req1.onsuccess = function(evt) {
            /* log */
            if (consoleLogWda) console.log("crearAdmin: Total de usuarios: " + this.result);
            /* total de usuarios */
            if (this.result == 0){
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
                  if (consoleLogWda) console.log("crearAdmin: Insersion de crearAdmin en DB .......  [ok]");
                };
                req.onerror = function() {
                  /* log error */
                  if (consoleErrorWda) console.error("Error al crearAdmin: ", this.error);
                  displayActionFailure(this.error);
                };
              /* log */
              if (consoleLogWda) console.log("crearAdmin - Cerrando ...");
              db.close();
            }else{
              /* log */
              if (consoleLogWda) console.log("crearAdmin - ERROR: ya existe usuarios....  [error]");
              db.close();
            }
          };

      };
  }
  /*
  *         COMPROBAR SESION
  */
  this.comprobarSesion = function comprobarSesion() {
    // si se soporta sessionStorage...
    if (soportaSessionStorage){
      usuarioGuardado = sessionStorage.getItem("usuario");
      // se inicio sesion?
      if (usuarioGuardado == null){
        if (consoleLogWda) console.log("Sesion NO iniciada!");
        // -> CREO LA VARIABLES DE SESION CON EL OBJETO JSON PARA INVITADO
          // guardo en session el objeto JSON (usuarioaguardar) con la key (usuario)
          sessionStorage.setItem("usuario", usuarioAGuardar);
          // obtengo el objeto de la key (usuario) y lo coloco en la variable (usuarioguardado)
          usuarioGuardado = sessionStorage.getItem("usuario");
          // parseo la variable (usuarioguarado) y la convierto en objeto JSON
          usuarioGuardado = JSON.parse(usuarioGuardado);
          // ya puedo leer lo guardado
        if (consoleLogWda) console.log("Sesion iniciada --> INVITADO");
        //document.getElementById('sesion').innerHTML = "Hola " + usuarioGuardado.usuario;
        // FORMULARIO DE INICIOS DE SESION
        tagIdIniciarSesion.empty();
        var tagsHTML = $(htmlInv);
        tagIdIniciarSesion.append(tagsHTML);
      }else{
        usuarioGuardado = JSON.parse(usuarioGuardado);
        // es usuario LOGEADO o INVITADO
        if (usuarioGuardado.iniciado == true){
          // LOGEADO
          if (consoleLogWda) console.log("Hay sesion iniciada: LOGEADO");
          // -> MUESTRO MENSAJE DE VIENVENIDA DEPENDIENDO DEL USUARIO QUE INICIO
          usuarioLogeado();
        }else{
          // INVITADO
          if (consoleLogWda) console.log("Hay sesion iniciada: INVITADO. Inicido:[" + usuarioGuardado.iniciado + "].");
          //document.getElementById('sesion').innerHTML = "Hola " + usuarioGuardado.usuario;
          // -> MUESTRO EL FORMULARIO PARA INICIAR SESION
          // FORMULARIO DE INICIOS DE SESION
          tagIdIniciarSesion.empty();
          var tagsHTML = $(htmlInv);
          tagIdIniciarSesion.append(tagsHTML);
        }
      }
      if (consoleLogWda) console.log("frmInicioSesion.... [ok]");
    }else{
      if (consoleLogWda) console.log("No funciona sesionStorage, lamentablemente no se puede iniciar sesion si su navegador no cuesrta con esta característica, se recomienda actualizar su navegador.");
    }
  }
  /*
  *         LOGEAR USUARIO
  */
  function usuarioLogeado(){
    /*
    * PERMISOS
    * 1 - NO ACTIVADO
    * 2 - USUARIO
    * 3 - ADMINITRADOR
    * 4 - SUPER USUARIO
    */
    var permiso = permisoUsuario[usuarioGuardado.permiso]; 
    if (consoleLogWda) console.log("permiso de usuario: " + permiso);
    // res = actualizarFechaSesion();
    
    var redireccion;

    if (usuarioGuardado.permiso == 1){
      window.location="./noactivado.html";
    }else if (usuarioGuardado.permiso == 2){
      window.location="./usuario.html";
    }else if (usuarioGuardado.permiso == 3){
      window.location="./admin.html";
    }else if (usuarioGuardado.permiso == 4){
      window.location="./susu.html";
    }else{
      redireccion = "error, base de datos corrupta, permiso incorrecto. ";
    }

    tagIdContenedor.empty();
    var tagsHTML = $('<p>Se direccionaría hacia: ' + redireccion + '</p>');
    tagIdContenedor.append(tagsHTML);
    return false;
  }
} // CIRRO LA CLASE

/*
*         INICIO
*/
var miClase = new indexedWda(soportaSessionStorage);
miClase.openDb();
miClase.comprobarSesion();
miClase.addEventListeners();
//