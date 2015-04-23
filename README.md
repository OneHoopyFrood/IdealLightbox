# IdealLightbox
A very simple lightbox jQuery plugin. Designed to be compact, adaptive, and simple to implement.

[Live Demo](http://colepanike.github.io/IdealLightbox/demo/demo.html)

## Features
IdealLightbox includes several features which can be configured in the options parameter.

- Two transition options - fade or slide
- Ad inclusion - The ad displays to the right of the displayed image, and is indicated via the *data-ad-dt* attribute.
- Direct Linking - Put a value in the *data-directLink* attribute of the clickable element to include a hash url to that image, it will automatically pull up when the page is loaded with that tag.
- Infinite navigation - The Lightbox can be rotated from within the display, loops to the first image when the end is reached.

## Basic setup
Include the following files

```html
<link type="text/css" rel="stylesheet" href="css/IdealLightbox.css">
<script type="text/javascript" src="js/IdealLightbox.js"></script>
```

Add a gallery of images. You have some freedom with structure if you make sure that you pass the proper jQuery selector to the "thumbnailSeletor:" option (see options below)

```html
<ul class="lightbox-thumbnails">
	<li>
		<a href="img/image1.jpg" data-caption="Image caption 1" data-ad-dt="ads/ad1.gif" data-directLink="Image1">
			<img src="img/image1-tn.jpg" alt="Caption 1"/>
		</a>
	</li>
	<li>
		<a href="img/image2.jpg" data-caption="Image caption 2" data-ad-dt="ads/ad2.gif" data-directLink="Image2">
			<img src="img/image2-tn.jpg" alt="Caption 2"/>
		</a>
	</li>
</ul>
```

Add this to the bottom of your <body>

```html
<div id="IdealLightbox"></div>
```

And place this at the bottom of your page!

```js
$(function(){
    $("#IdealLightbox").IdealLightbox(); 
});
```

Done!

## Additional Options

You can also use these options

```js
$(function(){
	$("#IdealLightbox").IdealLightbox({
		animationSpeed: 330,
		animationStyle: "fade",
		thumbnailSeletor: ".lightbox-thumbnails a",
		adBox: false,
		navigation: true,
	}); 
 });
```

 These are the defaults, they should be fairly self-explanatory. 
Currently the options for animationStyle are "fade" and "slide"
