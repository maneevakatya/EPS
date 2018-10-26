/*!
 * fastshell
 * Fiercely quick and opinionated front-ends
 * https://HosseinKarami.github.io/fastshell
 * @author Hossein Karami
 * @version 1.0.5
 * Copyright 2018. MIT licensed.
 */
$(document).ready(function() {

  window.sf = {};
  window.sf.form = ({
    init: function() {

      var _th = this;

      $('.request__input--phone').keydown(function(e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
          (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
          (e.keyCode >= 35 && e.keyCode <= 40)) {
          return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
          e.preventDefault();
        }
      });

      $('.request__input--phone').inputmask("+7 (999) 999 - 99 - 99", {
        placeholder: ' ',
        showMaskOnHover: false,
        showMaskOnFocus: false
      });

      $('.request__form').submit(function(e) {
        if (!_th.checkForm($(this))) {
          return false;
        }
      });
    },
    checkForm: function(form) {
      var checkResult = true;
      form.find('.warning').removeClass('warning');
      form.find('input, textarea, select').each(function() {
        if ($(this).data('req')) {
          switch ($(this).data('type')) {
            case 'mobile':
              if ($.trim($(this).val()).length < 22) {
                $(this).addClass('warning');
                checkResult = false;
              }
              break;
            default:
              if ($.trim($(this).val()) === '') {
                $(this).addClass('warning');
                checkResult = false;
              }
              break;
          }
        }
      });
      return checkResult;
    }
  }).init();


  window.sf.contacts = ({


    bindEvents: function() {

      var mapOptions = {
        scrollwheel: false,
        center: '',

        zoomControl: true,
        disableDefaultUI: true,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        },
        zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_TOP
        },
        streetViewControlOptions: {
          position: google.maps.ControlPosition.LEFT_BOTTOM
        },
      };
      mapOptions.center = new google.maps.LatLng(54.513845, 36.261215);
      var markerImage = new google.maps.MarkerImage('assets/img/map-pin.png',
        new google.maps.Size(101, 71),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 80));




      var directionsDisplay;
      var directionsService = new google.maps.DirectionsService();
      directionsDisplay = new google.maps.DirectionsRenderer();
      var h1 = new google.maps.LatLng(54.513845, 36.261215);
      var h2 = new google.maps.LatLng(54.793028, 38.266201);
      var map = new google.maps.Map(document.getElementById('contactsmap'), mapOptions);
      directionsDisplay.setMap(map);
      directionsDisplay.setOptions({
        suppressMarkers: true,
        preserveViewport: true
      });


      if ($(window).width() <= 900) {
        map.setZoom(7);
        mapOptions.center = new google.maps.LatLng(54.793028, 38.266201);
      } else if ($(window).width() <= 1200) {
        map.setZoom(8);
      } else if ($(window).width() <= 1550) {
        map.setZoom(8);
      } else {
        map.setZoom(9);
      }

      var marker = new google.maps.Marker({
        position: h2,
        map: map,
        icon: markerImage
      });

      var request = {
        origin: h1,
        destination: h2,
        travelMode: 'DRIVING',
        provideRouteAlternatives: true
      };



      $('.map__routes-btn').on('click', function(e) {
        var h1 = $(this).data('map');
        var centr = $(this).data('centr');
        var arr = centr.split(',');
        if ($(window).width() <= 900) {
            mapOptions.center = new google.maps.LatLng(54.793028, 38.266201);
        }
        else{
          mapOptions.center = new google.maps.LatLng(arr[0], arr[1]);
        }
        var map = new google.maps.Map(document.getElementById('contactsmap'), mapOptions);
        directionsDisplay.setMap(map);
        directionsDisplay.setOptions({
          suppressMarkers: true,
          preserveViewport: true
        });


        if ($(window).width() <= 900) {
          mapOptions.center = new google.maps.LatLng(54.793028, 38.266201);
          map.setZoom(9);
        } else if ($(window).width() <= 1200) {
          map.setZoom(8);
        } else if ($(window).width() <= 1550) {
          map.setZoom(8);
        } else {
          map.setZoom(9);
        }
        var marker = new google.maps.Marker({
          position: h2,
          map: map,
          icon: markerImage
        });
        var request = {
          origin: h1,
          destination: h2,
          travelMode: 'DRIVING'
        };

        directionsService.route(request, function(response, status) {
          if (status == 'OK') {
            var map = directionsDisplay.getMap();
            directionsDisplay.setDirections(response);
          }
        });

      });

    },

    init: function() {

      if ($('#contactsmap').length)
        this.bindEvents();
    }

  }).init();

  $(".nav__link").click(function(e) {
    e.preventDefault();
    var elementClick = $(this).attr("href");
    var destination = $(elementClick).offset().top;
    $("html, body").animate({
      scrollTop: destination - 50
    }, 1500);
    if ($(window).width() <= 1024) {
      $(".nav__list").slideToggle();
    }

  });

  $(".burger-menu").click(function() {
    $(".nav__list").slideToggle();
  });


  $('.slide').owlCarousel({
    nav: false,
    dots: true,
    margin: 50,
    autoWidth: true,
    navSpeed: 1500
  });

});
