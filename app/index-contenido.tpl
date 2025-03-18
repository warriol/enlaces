<!DOCTYPE html>
<html>
  <head>
    <?php
      include('app/header.tpl');
    ?>
    <script type="text/javascript" src="res/js_utiles/funciones_usr.js"></script>
  </head>

  <body class="hold-transition skin-blue sidebar-mini sidebar-collapse">
    <div class="wrapper">
      <!-- Main Header -->
      <header class="main-header">
        <?php
          include('app/header-nav.tpl');
        ?>
      </header>

      <!-----------------------------------------------------------------------------

      ------------------------------------------------------------------------------- SECCIONA LATERAL --->
      <!-- Left side column. contains the logo and sidebar -->
      <aside class="main-sidebar">
        <section>
          <!-----------------------------------------------------------------------------
          ------------------------------------------------------------------------------- SECCION DE MENU LATERAL --->
          <?php
            include('app/enlaces-menu.tpl');
          ?>
        </section>
        <!-- /.sidebar -->
      </aside>

      <!-----------------------------------------------------------------------------
      ------------------------------------------------------------------------------- SECCION DE PAGINA PRINCIPAL - MENU HORIZONTAL --->

      <!-- Content Wrapper. Contains page content -->

      <div class="content-wrapper">

          <?php
            switch ($p) {
              case 0:
                include('app/enlaces-contenido.tpl');
                break;
              case 1:
                include('app/boletines-contenido.tpl');
                break;
              case 2:
                include('app/covid-contenido.tpl');
                break;
              case 3:
                include('app/anterior-contenido.tpl');
                break;
              default:
                include('app/enlaces-contenido.tpl');
            }
          ?>

      </div><!-- /.content-wrapper -->


      <!-----------------------------------------------------------------------------

      ------------------------------------------------------------------------------- PIE DE PÁGINA --->

      <!-- Main Footer -->

      <footer class="main-footer">

        <?php
          include('app/footer.tpl');
        ?>

      </footer>

      <!-----------------------------------------------------------------------------

      ------------------------------------------------------------------------------- FORMULARIO DE INICIO DE SESION --->

      <!-- Control Sidebar -->

      <aside class="control-sidebar control-sidebar-dark">

        <?php
          include('app/aside_ini.tpl');
        ?>

      </aside><!-- /.control-sidebar -->

      <!-- Add the sidebar's background. This div must be placed

           immediately after the control sidebar -->

      <div class="control-sidebar-bg"></div>

    </div><!-- ./wrapper -->



    <!-- REQUIRED JS SCRIPTS -->



    <!-- jQuery 2.1.4 -->

    <script src="res/plugins/jQuery/jQuery-2.1.4.min.js"></script>

    <!-- Bootstrap 3.3.5 -->

    <script src="res/js/bootstrap.min.js"></script>

    <!-- AdminLTE App -->

    <script src="res/js/app.min.js"></script>

    <script type="text/javascript" src="res/js_utiles/sha512.js"></script>
    <script type="text/javascript" src="res/js_utiles/forms.js"></script>


    <!-- Optionally, you can add Slimscroll and FastClick plugins.

         Both of these plugins are recommended to enhance the

         user experience. Slimscroll is required when using the

         fixed layout. -->

  </body>

</html>

