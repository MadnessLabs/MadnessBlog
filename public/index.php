<!DOCTYPE HTML>
<html ng-app="app">
<!-- ADD TO HTML TAG TO MAKE OFFLINE APP manifest="the.appcache" -->
<head>

	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	<meta name="mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<!-- Standard Icon 
	<link rel="icon" sizes="228x228" href="./img/icons/icon.png">
	-->
	<!-- Apple Icons 
	<link rel="apple-touch-icon" href="./img/icons/icon.png">
	<link rel="apple-touch-icon" sizes="76x76" href="./img/icons/ios-small.png">
	<link rel="apple-touch-icon" sizes="120x120" href="./img/icons/ios-medium.png">
	<link rel="apple-touch-icon" sizes="152x152" href="./img/icons/ios-large.png">
	-->
	<!-- Microsoft Icons 
	<meta name="msapplication-square70x70logo" content="./img/icon/windows-small.png">
	<meta name="msapplication-square150x150logo" content="./img/icon/windows-medium.png">
	<meta name="msapplication-wide310x150logo" content="./img/icon/windows-wide.png">
	<meta name="msapplication-square310x310logo" content="./img/icon/windows-large.png">
	-->
	<title>Madness App</title>
	<link rel="stylesheet" href="./css/app.css" />

</head>
<body ng-controller="appCtrl">
	<?php include('html/header.html'); ?>

	<div class="content-area container-fluid" ng-view id="page-{{hash}}">
	    <div class="loader show">
	        <i class="fa fa-circle-o-notch fa-fw fa-spin"></i>
	    </div>
	</div>

	<?php include('html/footer.html'); ?>

	<script src="js/build.js" async></script>
</body>
</html>