          <!-- Sidebar Menu -->

          <ul class="sidebar-menu">

            <li class="header">MENÚ</li>

            <!-- Optionally, you can add icons to the links: $_SESSION['id_pag'] -->

            <?php
            	if ( !isset($p) )
            		$p = 0;
            ?>

            <li <?php if ($p == 0 || $p > 3) { echo 'class="active"'; } ?> ><a href="?p=0"><i class="fa fa-link"></i> <span>Enlaces</span></a></li>

            <li <?php if ($p == 1) { echo 'class="active"'; } ?> ><a href="?p=1"><i class="fa fa-book"></i> <span>Boletines</span></a></li>

            <li <?php if ($p == 2) { echo 'class="active"'; } ?> ><a href="?p=2"><i class="fa fa-bug"></i> <span>Covid</span></a></li>

            <li <?php if ($p == 3) { echo 'class="active"'; } ?> ><a href="?p=3"><i class="fa fa-share"></i> <span>Versión anterior</span></a></li>


          </ul><!-- /.sidebar-menu -->