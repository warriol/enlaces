<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="author" content="Wilson Arriola" />
    <title>Enlaces | Wilson Arriola</title>
    <link rel="shortcut icon" href="res/img/ico.ico">

    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">


    <!-- Theme style-->
    <link rel="stylesheet" href="res/css/AdminLTE.css">
    <link rel="stylesheet" href="res/css/default.css">
    <link rel="stylesheet" href="res/css/skins/skin-blue.min.css">
    <link rel="stylesheet" href="res/css/style.css" />
    <link rel="stylesheet" href="res/css/etiqueta.css" />
    <link rel="stylesheet" href="res/css/iconos.css" />
    <link rel="stylesheet" href="res/css/formulario.css" />
    <link rel="stylesheet" href="res/css/nav.css" />
    <link rel="stylesheet" href="res/css/tabs.css" />
    <link rel="stylesheet" href="res/css/nav.css" />
    <link rel="stylesheet" href="res/css/tablas.css" />
    <link rel="stylesheet" href="res/css/popup.css" />
    <link rel="stylesheet" type="text/css" href="res/css/jquery-ui-1.7.2.custom.css" />

</head>
<body class="hold-transition skin-blue sidebar-mini sidebar-collapse">
<div class="wrapper">
    <!-- Main Header -->
    <header class="main-header">
        <!-- Logo -->
        <a href="#" class="logo">
            <!-- mini logo for sidebar mini 50x50 pixels -->
            <span class="logo-mini"><b>WD</b>A</span>
            <!-- logo for regular state and mobile devices -->
            <span class="logo-lg"><b>enlaces</b>WDA</span>
        </a>
        <!-- Header Navbar -->
        <nav class="navbar navbar-static-top" role="navigation">
            <!-- Sidebar toggle button-->
            <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                <span class="sr-only">Botón de navegación</span>
            </a>
            <!-- Navbar Right Menu -->
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <!-- Messages: style can be found in dropdown.less-->
                    <!-- User Account Menu -->
                    <!-- Control Sidebar Toggle Button -->
                    <li>
                        <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    <!-----------------------------------------------------------------------------
    ------------------------------------------------------------------------------- SECCIONA LATERAL --->
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">
        <section>
            <!-----------------------------------------------------------------------------
            ------------------------------------------------------------------------------- SECCION DE MENU LATERAL --->
            <!-- Sidebar Menu -->
            <ul class="sidebar-menu">
                <li class="header">MENÚ</li>
                <!-- Optionally, you can add icons to the links -->
               <li class="active" ><a href="#"><i class="fa fa-bug"></i> <span>Covid</span></a></li>
            </ul><!-- /.sidebar-menu -->
        </section>
        <!-- /.sidebar -->
    </aside>
    <!-----------------------------------------------------------------------------
    ------------------------------------------------------------------------------- SECCION DE PAGINA PRINCIPAL - MENU HORIZONTAL --->
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>
                COVID
                <small>Distribución de personas afectadas por fepartamento.</small>
            </h1>
        </section>
        <!-----------------------------------------------------------------------------
        ------------------------------------------------------------------------------- SECCION DE PAGINA PRINCIPAL - CUERPO --->
        <!-- Main content -->
        <section class="content">
            <!-- Your Page Content Here -->
            <!-- Main row -->
            <div class="row">
                <!-- GRUPO GUIA TELEFONO -->
                <div class="col-md-12">
                    <div class="box box-info contenedor">
                        <div class="box-header with-border">
                            <h3 class="box-title">COVID-19 en Uruguay</h3>
                        </div><!-- /.box-header -->
                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <iframe name="telefonos" src="https://coronavirusuy.maps.arcgis.com/apps/opsdashboard/index.html#/98155a4390b644308c453e5b20b2516e" frameborder="0" width="100%" height="680px">
                                    </iframe>
                                </div><!-- /.col -->
                            </div><!-- /.row -->
                        </div><!-- /.box-body -->
                    </div><!-- /.box -->
                </div>
                <!-- GRUPO GUIA TELEFONO-->
            </div>
            <!-- Main row -->
        </section><!-- /.content -->
    </div><!-- /.content-wrapper -->
    <!-----------------------------------------------------------------------------
    ------------------------------------------------------------------------------- PIE DE PÁGINA --->
    <!-- Main Footer -->
    <footer class="main-footer">
        <!-- To the right -->
        <div class="pull-right hidden-xs">
            <a href="http://wilsonarriola.webs.nf/">Wilson Denis ARRIOLA</a>
        </div>
        <!-- Default to the left -->
        <strong>Copyright &copy; 2020.</strong>
    </footer>
    <!-----------------------------------------------------------------------------
    ------------------------------------------------------------------------------- FORMULARIO DE INICIO DE SESION --->
    <!-- Control Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
        <!-- Create the tabs -->
        <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
            <li class="active"><a href="#control-sidebar-home-tab" data-toggle="tab"><i class="fa fa-user"></i></a></li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
            <!-- Home tab content -->
            <div class="tab-pane active" id="control-sidebar-home-tab">
                <div class="login-box">
                    <div class="login-logo">
                        <a href="#"><b>enlaces | </b>WDA</a>
                    </div><!-- /.login-logo -->
                    <div class="login-box-body">
                        <p class="login-box-msg">iniciar sesion</p>
                        <script>
                            // MIDenuncia
                            console.log("Usuario: usuario@prueba.com");
                            console.log("Pass: Ab12356790");
                            console.log("Yo grande soy el admin ;-)");
                        </script>
                        <form action="index.php" method="post" name="login_form" id="iniciosesion" />
                        <div class="form-group has-feedback">
                            <input id="usuario" name="email" type="email" class="form-control" placeholder="ejemplo@correo.com" required />
                            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                        </div>
                        <div class="form-group has-feedback">
                            <input id="password" name="password" type="password" class="form-control" placeholder="Contraseña" required />
                            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                        </div>
                        <div class="row">
                            <div class="col-xs-8">
                            </div><!-- /.col -->
                            <div class="col-xs-4">
                                <input type="submit" class="btn btn-primary btn-block btn-flat" value="Iniciar" onclick="formhash(this.form, this.form.password);" />
                            </div><!-- /.col -->
                        </div>
                        </form>
                    </div><!-- /.login-box-body -->
                </div><!-- /.login-box -->
            </div><!-- /.tab-pane -->
        </div>
    </aside><!-- /.control-sidebar -->
    <!-- Add the sidebar's background. This div must be placed
         immediately after the control sidebar -->
    <div class="control-sidebar-bg"></div>
</div>
<!-- ./wrapper -->

<!-- REQUIRED JS SCRIPTS -->
<!-- jQuery 2.1.4 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js" integrity="sha512-AFwxAkWdvxRd9qhYYp1qbeRZj6/iTNmJ2GFwcxsMOzwwTaRwz2a/2TX225Ebcj3whXte1WGQb38cXE5j7ZQw3g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<!-- Bootstrap 3.3.5 -->
<script src="res/js/bootstrap.min.js"></script>
<!-- AdminLTE App -->
<script src="res/js/app.min.js"></script>
<script type="text/javascript" src="res/js_utiles/sha512.js"></script>
<script type="text/javascript" src="res/js_utiles/forms.js"></script>
</body>
</html>