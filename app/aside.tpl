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