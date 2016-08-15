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

  $(document).on('click', '#contact', function (e) {
    e.preventDefault();
    $('.modal').addClass('active');
  });

  $(document).on('click', '[data-action=close-modal]', function (e) {
    e.preventDefault();
    $('.modal').removeClass('active');
  });
}());
