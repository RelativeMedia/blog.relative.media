/**
 * Main JS file for Boo behaviours
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){

      //load up highlightjs
      hljs.initHighlightingOnLoad();

        // On the home page, move the blog icon inside the header
        // for better relative/absolute positioning.

        //$("#blog-logo").prependTo("#site-head-content");
        $(window).scroll(function() {
            if ($(".navbar").offset().top >= 80) {
                $(".navbar-fixed-top").addClass("top-nav-collapse");
                $("#logo").attr("src", "/img/logo_dark_165x50.png");
            } else {
                $(".navbar-fixed-top").removeClass("top-nav-collapse");
                $("#logo").attr("src", "/img/logo_light_165x50.png");
            }
        });
    });

}(jQuery));
