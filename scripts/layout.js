(function() {
  'use strict';

  $(document).ready(function() {
    var $header = $('.site-header');

    $('#scroll-down').click(function() {
      var $target = $('#content');
      $('html, body').animate({
        scrollTop: $target.offset().top - $header.outerHeight()
      }, 650);
    });
  });
}());
