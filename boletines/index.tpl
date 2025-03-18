<!--
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

	<title>Consulta de boletines</title>

	<link rel="stylesheet" type="text/css" href="css/tcal.css" />

    <LINK REL="stylesheet"# type="text/css" href="css/bestilo.css" />

    <meta http-equiv="Expires" content="0">
    <meta http-equiv="Last-Modified" content="0">
    <meta http-equiv="Cache-Control" content="no-cache, mustrevalidate">
    <meta http-equiv="Pragma" content="no-cache">

    <meta charset="utf-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="author" content="Wilson Arriola" />

    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

    
    <link rel="stylesheet" href="css/bootstrap.min.css">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">

    <link rel="stylesheet" href="css/AdminLTE.css">

    <link rel="stylesheet" href="css/default.css">

    <link rel="stylesheet" href="css/skins/skin-blue.min.css">

-->
	<link rel="stylesheet" type="text/css" href="boletines/css/tcal.css" />

    <LINK REL="stylesheet"# type="text/css" href="boletines/css/bestilo.css" />
    
	<script type="text/javascript" src="boletines/scripts/tcal.js"></script>

	<script type="text/javascript" src="boletines/scripts/tcal1.js"></script>

    <script type="text/javascript" src="boletines/scripts/script.js"></script>

    <script type="text/javascript" src="boletines/scripts/controlget.js"></script>


<!--
    <link rel="icon" href="http://wilsonarriola.byethost6.com/app/img/logos/wda.png" type="image/gif" sizes="32x32" /> 
</head>
-->

<body leftmargin="0" topmargin="0" onLoad="controlGET()">


    <!-- Content Header (Page header) -->

    <section class="content-header">

      <h1>

        BOD

        <small>Busqueda de Boletines de Montevideo y Canelones</small>

      </h1>

    </section>



    <!-- Main content -->



    <section class="content">

		<form name="fvalida" action="#">
		<input id="p" name="p" type="hidden" value="1">

        <!-- Botones -->

        <div class="row">

			<!-- BOD montevideo -->        

            <div class="col-md-3">

                <div class="box box-primary box-solid">

                    <div class="box-header with-border">

                        <h3 class="box-title">Buscar en Montevideo por número</h3>

                    </div><!-- /.box-header -->



                    <div class="box-body">

                        <div class="form_group">

							<div id="contenedorBODN">

                        	</div>

                        </div>

                    </div>





                    <div class="box-body">

                        <div class="form-group">

                            <label for="numbod">Número</label>

                            <input type="text" class="form-control" placeholder="Ingrese un número..." name="numbod" id="numbod" /> 

                        </div>

                    </div><!-- /.box-body -->

                    

                </div><!-- /.box -->

            </div>

            

			<!-- BOD canelones -->        

            <div class="col-md-3">

                <div class="box box-info box-solid">

                    <div class="box-header with-border">

                        <h3 class="box-title">Buscar en Canelones por número</h3>

                    </div><!-- /.box-header -->



                    <div class="box-body">

                        <div class="form_group">

                            <div id="contenedorBODC">

                            </div>

                        </div>

                    </div>

                    

                    <div class="box-body">

                        <div class="form-group">

                            <label for="numbodcan">Número</label>

                            <input type="text" class="form-control" placeholder="Ingrese un número..." name="numbodcan" id="numbodcan" /> 

                        </div>

                    </div><!-- /.box-body -->

                </div><!-- /.box -->

            </div>



			<!-- BOD montevideo por fecha -->        

            <div class="col-md-3">

                <div class="box box-success box-solid">

                    <div class="box-header with-border">

                        <h3 class="box-title">Buscar en Montevideo por fecha</h3>

                    </div><!-- /.box-header -->



                    <div class="box-body">

                        <div class="form_group">

                            <div id="contenedorBODMF">

                            </div>

                        </div>

                    </div>

                    

                    <div class="box-body">

                        <div class="form-group">

                            <label for="numbodcan">Fecha BOD Mvdeo.</label>

                            <!-- <div><input type="text" name="date" class="tcal" value="" /></div> -->

                            <input type="text" name="date" class="tcal form-control" value="" placeholder="Ingrese una fecha..." />

                        </div>

                    </div><!-- /.box-body -->

                </div><!-- /.box -->

            </div>

            

			<!-- BOD montevideo por fecha -->        

            <div class="col-md-3">

                <div class="box box-warning box-solid">

                    <div class="box-header with-border">

                        <h3 class="box-title">Buscar en Canelones por fecha</h3>

                    </div><!-- /.box-header -->



                    <div class="box-body">

                        <div class="form_group">

                            <div id="contenedorBODCF">

                            </div>

                        </div>

                    </div>

                    

                    <div class="box-body">

                        <div class="form-group">

                            <label for="numbodcan">Fecha BOD Can.</label>

                            <!-- <div><input type="text" name="date" class="tcal" value="" /></div> -->

                            <input type="text" name="date1" class="tcal form-control" value="" placeholder="Ingrese una fecha..." />

                        </div>

                    </div><!-- /.box-body -->

                </div><!-- /.box -->

            </div>

            

        	<div class="col-md-12">

                <div class="box box-info">

                    <div class="box-footer">

                    	<input type="button" class="btn btn-default" name="Cancelar" value="Cancelar" onClick="location.href='inicio.php?p=1'" id="enviar" />

                        <button type="submit" class="btn btn-info pull-right" name="enviar" id="enviar" value="Enviar" onclick="valida_envia()">Enviar</button>

                    </div>

                </div>

            </div>

        </div>
        
        </form>

        <section class="content">
          <!-- START ACCORDION & CAROUSEL-->
        <!-- /.row -->
          <!-- END ACCORDION & CAROUSEL-->
        </section>

        

        

        <div class="row">
			<div class="col-md-12">
		        <div class="pie"><br />Diseñado por Wilson Denis Arriola para División de Sistema de Información. Última actualización 07/12/20.</div>
			</div>
        </div>

	</section>


</body>

<!--
</html>
-->