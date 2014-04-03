/******************************************************
******************* IdealLightbox.js *******************
******************************************************/
(function( $ ) {
    $.fn.exists = function () {
        return this.length !== 0;
    };
    $.fn.IdealLightbox = function( options ) {

        var settings = $.extend({
            // Defaults
            animationSpeed: 330,
            animationStyle: "fade",
            thumbnailSeletor: ".lightbox-thumbnails a",
            adBox: false,
            navigation: true,
            playButton: false, /*Experimental, not fully functional*/
            rotateInterval: 5000
        }, options);

        // Inject our structure, either with or without the adBox
        var structure;
        if (settings.adBox)
            structure = "<div class='content'><div class='col'><span class='close'>&#10006;</span><div class='caption'></div><div class='image'><img src=''/></div></div><div class='col'><div class='ad'><img src=''></div></div></div>";
        else
            structure = "<div class='content'><div class='full'><span class='close'>&#10006;</span><div class='caption'></div><div class='image'><img src=''/></div></div></div>";
        this.html(structure);

        // Get our ducks in a line:
        var $lightbox = this;
        var $imgContainer = $lightbox.find(".image");
        var $img = $imgContainer.find("img");
        var $caption = $lightbox.find(".caption");
        var $rightNav = null;
        var $leftNav = null;
        var $playBtn = null;
        var timeout;


        // Add the navigation buttons
        if (settings.navigation) {
            $lightbox.find(".col:first-child").append("<span class='chevron left'>&lsaquo;</span>");
            $lightbox.find(".col:first-child").append("<span class='chevron right'>&rsaquo;</span>");
            $rightNav = $lightbox.find(".chevron.right");
            $leftNav = $lightbox.find(".chevron.left");
        }

        // Add the Play Button
        if(settings.playButton){
            $imgContainer.append("<div class='play'><span class='iPlay'></span><span class='iPause'></span></div>");
            $playBtn = $lightbox.find(".play");
        }

        // Display the lightbox based on the animation options
        function toggleLightbox(){
            if (settings.animationStyle === "fade")
                $lightbox.fadeToggle(settings.animationSpeed);
            else if (settings.animationStyle === "slide")
                $lightbox.fadeToggle(settings.animationSpeed);
            else
                throw settings.animationStyle + " is not a valid lightbox animation.";
        }

        // Main function, changes the image and caption
        function changeImage(imgHref, imgCaption) {
            // Set the image source to the href value:
            $img.attr("src", imgHref);
            // Set the caption:
            if ( typeof imgCaption !== "undefined" )
                $caption.html(imgCaption);
            else
                $caption.html("&nbsp;");
        }

        // ------------------------------------------------------//
        // Event handleing
        // ------------------------------------------------------//
        // Thumnail click:
        $(settings.thumbnailSeletor).click(function(e) {
            // Stop the link click:
            e.preventDefault();

            // Get the image from the href and the caption from the data-caption attribute
            changeImage($(this).attr('href'), $(this).attr('data-caption'), $(this).attr('data-ad-dt'))

            //Show the lightbox
            toggleLightbox();

            // Set the height of the image, must be done after lightbox is shown.
            // Unfortuantely, this must be done each time, to adapt to the caption
            // length
            if($(window).width() > 900){
                $imgContainer.height(($(window).height() - $caption.outerHeight()));
            }
            else {
                $imgContainer.height($img.height());
            }
//            var centerNav = (($imgContainer.height()/2) - ($rightNav.height()/2)) + "px";
//            $rightNav.css("top", centerNav);
//            $leftNav.css("top", centerNav);

        });

        // Navigation click:
        function rotateImage(direction) {
            var $curImg = $(settings.thumbnailSeletor).filter( settings.thumbnailSeletor + "[href='" + $img.attr('src') + "']" );
            var $showImg;
            if (direction === "right" || typeof direction === "undefined") {
                $showImg = $curImg.parent().next().find("a");
                if(!$showImg.exists())
                    $showImg = $(settings.thumbnailSeletor).first();
            }
            else {
                $showImg = $($curImg).parent().prev().find("a");
                if(!$showImg.exists())
                    $showImg = $(settings.thumbnailSeletor).last();
            }
            changeImage($showImg.attr('href'), $showImg.attr('data-caption'));
        }
        if (settings.navigation) {
            $rightNav.click(function () {
                rotateImage("right");
            });
            $leftNav.click(function () {
                rotateImage("left");
            });
        }

        // Play Button
        if(settings.playButton){
            var playState = 1;
            function autoRotate(){
                timeout = setTimeout(function () {
                    rotateImage();
                    clearTimeout(timeout);
                    autoRotate();
                }, settings.rotateInterval);
            }
            $playBtn.click(function () {
                // Switch stop and play
                if (playState === 1) {
                    $playBtn.html("<span style='font-size: 60px !important; bottom: .8em; left: .8em'>&#9632;</span>");
                    playState = 0;
                    // Start the rotation
                    autoRotate();
                }
                else {
                    $playBtn.html("<span>&#9658;</span>");
                    clearTimeout(timeout);
                    playState = 1;
                }
            });
        }

        //Close options ( click/tap X or hit ESC key )
        this.find('.close').click(function() {
            clearTimeout(timeout);
            toggleLightbox();
        });
        $(document).on('keydown', function(e) {
            if (e.keyCode === 27 && $lightbox.is(":visible")) { // ESC
                toggleLightbox();
            }
            else if (e.keyCode === 37 && $lightbox.is(":visible")) { //LEFT ARROW
                rotateImage("left");
            }
            else if (e.keyCode === 39 && $lightbox.is(":visible")) { //RIGHT ARROW
                rotateImage("right");
            }
        });

        return this;
    }
}( jQuery ));