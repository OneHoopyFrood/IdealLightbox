# IdealLightbox
A very simple lightbox jQuery plugin. Designed to be compact, adaptive, and simple to implement.

## Basic setup
Include the following files

	<link type="text/css" rel="stylesheet" href="css/IdealLightbox.css">
	<script type="text/javascript" src="js/IdealLightbox.js"></script>
	
Add a gallery of images. You have some freedom with structure if you make sure that you pass the proper jQuery selector to the "thumbnailSeletor:" option (see options below)

	<ul class="lightbox-thumbnails" data-caption="Image caption 1">
		<li>
			<a href="img/image1.jpg">
				<img src="img/image1-tn.jpg" alt="Caption 1"/>
			</a>
		</li>
		<li>
			<a href="img/image2.jpg" data-caption="Image caption 2">
				<img src="img/image2-tn.jpg" alt="Caption 2"/>
			</a>
		</li>
	</ul>
	
Add this to the bottom of your <body>

	<div id="IdealLightbox"></div>
	
And place this at the bottom of your page!

	$(function(){
	    $("#IdealLightbox").IdealLightbox(); 
	});
	
Done!

## Additional Options

You can also use these options

	$(function(){
		$("#IdealLightbox").IdealLightbox({
			animationSpeed: 330,
			animationStyle: "fade",
			thumbnailSeletor: ".lightbox-thumbnails a",
			adBox: false,
			navigation: true,
		}); 
	 });

 These are the defaults, they should be fairly self-explanatory. 
Currently the options for animationStyle are "fade" and "slide"