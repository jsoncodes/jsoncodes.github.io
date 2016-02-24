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
  });
}());
