/**
 * Main JS file for Boo behaviours
 */

/*globals jQuery, document */
(function ($) {
  $(document).ready(function(){
    hljs.initHighlightingOnLoad();
    $('.scrollup').click(function () {
      $("html, body").animate({
        scrollTop: 0
      }, 600);
      return false;
    });
    $(window).scroll(function() {
      if ($(".navbar").offset().top >= 80) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
        $("#logo").attr("src", "/img/logo_dark_165x50.png");
      } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
        $("#logo").attr("src", "/img/logo_light_165x50.png");
      }

      if ($(this).scrollTop() > 100) {
        $('.scrollup').fadeIn();
      } else {
        $('.scrollup').fadeOut();
      }
    });
  });
}(jQuery));
