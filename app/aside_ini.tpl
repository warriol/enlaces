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


                  <b>Perfil | </b> 
                  <span>
                    <a href="#" onclick="cargarUsu(u3);"data-tooltip="Mensajes."><span class="icon-bubbles iconogrande sombra"></span></a>
                  </span>
                  <span>
                    <a href="#" data-tooltip="Noticias."><span class="icon-bell iconogrande sombra"></span></a>
                  </span>
                  <span>
                    <a href="./logout.php" data-tooltip="Salir">
                      <span class="icon-exit iconogrande sombra"></span>
                    </a>
                  </span>


              </div><!-- /.login-logo -->

              <div class="login-box-body">

                <div id="login-box-msg">
                  Bienvenido: <?php echo $_SESSION['privilegio'].' - '.$_SESSION['mid_usuarios_nombrereal']; ?>
                </div>


                              <p class="login-box-msg"><span class="icon-user-4 "></span> Perfil de usuario... '<?php echo $_SESSION['username']; ?>'</p>

                              <p class="login-box-msg">Datos Personales</p>

                              <form id="form_enliena" method="post">

                              <div class="form-group has-feedback">
                                <span>Cambiar Nombre Real</span>
                                <input type="hidden" id="_id" name="_id" value=" <?php echo $_SESSION['user_id']; ?> " />
                              </div>
                              <div class="form-group has-feedback">
                                <input id="_nom" name="_nom" value=" <?php echo $_SESSION['mid_usuarios_nombrereal']; ?> " />
                              </div>
                              <div class="form-group has-feedback">
                                <input class="btn_linea" value="Enviar" onclick="modificar_n_real(this.form);" />
                              </div>

                              </form>

                              <p><span class="negrita">Correo activado:</span>
                                <?php
                                  if($_SESSION['activado_correo'] == 0){ $resp .= 'No';}else{ $resp .= 'Si';}
                                  echo $resp;
                                ?>
                              </p>
                              <p><span class="negrita">Correo asociado:</span> <?php echo $correo; ?></p>
                              <p><span class="negrita">Fecha de registro:</span> <?php echo $freg; ?></p>

                              <hr>
                                                            
                              <!-- p class="login-box-msg">Cambiar contraseña</p>

                              <form id="form1" action="" method="post">
                                
                                <input type="hidden" id="_i" name="_i" value=" <?php echo $_SESSION['user_id']; ?> " />
                                <div class="form-group has-feedback">
                                  <span>Contraseña actual: </span>
                                  <input type="text" id="_a" name="_a" placeholder="actual" required autofocus />
                                </div>
                                <div class="form-group has-feedback">
                                  <span>Contraseña Nueva: </span>
                                  <input type="text" id="_n" name="_n" placeholder="nueva" required />
                                </div>
                                <div class="form-group has-feedback">
                                  <span>Repetir Contraseña: </span>
                                  <input type="text" id="_r" name="_r" placeholder="repetir" required />
                                </div>
                                <div class="form-group has-feedback">
                                  <input class="btn_linea" value="Enviar" onclick="modificar_pass(this.form);" />
                                </div>

                              </form -->


                              
                              <!-- <aside>Cambiar contraseña</aside> -->



              </div><!-- /.login-box-body -->

            </div><!-- /.login-box -->



          </div><!-- /.tab-pane -->

        </div>