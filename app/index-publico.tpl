<!DOCTYPE html>

<html>

  <head>

    <?php

      include('app/header.tpl');
    ?>

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

          <?php
            // para el acceso publico solo se muestra el mapa covid*********************************************************************
            include('app/covid-contenido.tpl');
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
          include('app/aside.tpl');
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

