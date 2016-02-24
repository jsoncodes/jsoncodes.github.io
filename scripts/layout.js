(function() {
  'use strict';

  $(document).ready(function() {
    var $header = $('.site-header');

    if ($('.hero').length === 0) {
      $header.addClass('solid');
    } else {
      $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        $header.toggleClass('solid', scroll >= 60);
      });
    }

    $('#scroll-down').click(function() {
      var $target = $('#content');
      $('html, body').animate({
        scrollTop: $target.offset().top - $header.outerHeight()
      }, 650);
    });
  });
}());
