var Module = (function() {

	var init = function() {
		console.log('module init');

		$('#btn-submit').on('click', function(e) {
			e.preventDefault();
			$('.overlay').addClass('hidden');
			$('video').addClass('hidden');
			$('#app.hidden').fadeIn(1000).removeClass('hidden');

		});

		
		
		// nav controls
		$('.menu-button').on('click', function(){
		    $(".menu-open").toggleClass('menu-open-active');
		    $(".menu-item-settings").toggleClass('active');
		    $(".menu-item-episodes").toggleClass('active');
		    $(".menu-item-rewind").toggleClass('active');
		    $(".menu-item-volume").toggleClass('active');

		    if ($(".menu-open").hasClass('menu-open-active')) {
		    	$("#slider").css({width: 50 + '%' });
		    } else {
		    	$("#slider").css({width: 75 + '%' });
		    }

		    if ($('.episodes').hasClass('episodes-active')) {
		        $('.episodes').removeClass('episodes-active');
		    }      
		});

		$('.menu-item-episodes').on('click', function() {
		    $('.episodes').toggleClass('episodes-active');
		}); 

		$('.escape-button').on('click', function() {
		    $(this).parent().addClass('dispnone');
		});

		$('#shazam-logo').on('click', function() {
		    $('.shazam').toggleClass('shazam-active');
		    $('.music-panel').toggleClass('music-panel-active');
		    $('.soundwave-bg').toggleClass('soundwave-active');
		    $('.soundwave-bg-1').toggleClass('soundwave-active-1');
		    $('.soundwave-bg-2').toggleClass('soundwave-active-2');
		    $('.soundwave-bg-3').toggleClass('soundwave-active-3');
		    
		    if (!$('.panel-trivia').hasClass('dispnone')) {
		        $('.panel').addClass('dispnone');
		    } 

		});

		$('.signin').on('click', function() {
		  $('.overlay').toggleClass('active');
		  $('.signin').toggleClass('active');
		  $('.logo').toggleClass('active');
		  $('signinform-field').removeClass('focus');
		  $('input').val('');
		  return false;
		});

		$('input').focus(function() {
		    $(this).parent().addClass('focus');
		}).blur(function() {
		    if ($(this).val() == '') {
		        $(this).parent().removeClass('focus');
		    }
		    if ($('#form-email').val() != '' && $('#form-password').val() != '') {
		        $('#btn-submit').addClass('active');
		    } else {
		        $('#btn-submit').removeClass('active');
		    }
		});
		
	};

	return {
		init: init
	}
}());


$(document).ready(function() {
    Module.init();


    // variables
    var body = $("body"),
    	panel1 = $('#panel1'),
    	panel2 = $('#panel2'),
    	panel3 = $('#panel3'),
    	shazam = $('#shazam-logo'),
    	tl,
    	paused_before_drag;


    //create timeline (00:01:11:00) length of SS video
    function buildTimeline() {
    	tl = new TimelineMax({onUpdate:updateSlider, delay:0});
    	window.timeline = tl;

    	

    	tl.add( TweenMax.fromTo(panel1, 1, {left: -1024, opacity: 0}, {left:0, opacity: 1}), "panel1+=0.5" )
    					.fromTo($('.content-container h1'), 2, {opacity: 0}, {opacity:1}, "panel1+=0.6")
    					.fromTo($('.fisk-img'), 2, {opacity: 0}, {opacity:1}, "panel1+=0.7")
    					.staggerFrom($('.content-info ul li'), 2, {opacity: 0}, "panel1")
    					.fromTo($('.read-more-button'), 2, {opacity: 0}, {opacity:1}, "panel1+=0.7");

    	tl.add( TweenMax.fromTo(panel2, 1, {left: -1024, opacity: 0}, {left:0, opacity: 1}), "panel2+=0.5" )
    					.fromTo($('.content-container h1'), 2, {opacity: 0}, {opacity:1}, "panel2+=0.6")
    					.fromTo($('.behindscene-img'), 2, {opacity: 0}, {opacity:1}, "panel2+=0.7")
    					.from($('.content-info p'), 2, {opacity: 0}, "panel2");				
    	

    	tl.add( TweenMax.fromTo(panel3, 1, {left: -1024, opacity: 0}, {left:0, opacity: 1}), "panel3+=0.5" )
    					.fromTo($('.content-container h1'), 2, {opacity: 0}, {opacity:1}, "panel3+=0.6")
    					.fromTo($('.trivia-img-1'), 1, {opacity: 0, rotation:-180}, {opacity:1, rotation:0}, "panel3+=0")
    					.fromTo($('.trivia-img-2'), 1, {opacity: 0, rotation:-180}, {opacity:1, rotation:0}, "panel3+=0.2")
    					.fromTo($('.trivia-img-3'), 1, {opacity: 0, rotation:-180}, {opacity:1, rotation:0}, "panel3+=0.4")
    					.fromTo($('.trivia-img-4'), 1, {opacity: 0, rotation:-180}, {opacity:1, rotation:0}, "panel3+=0.6");

    	tl.add( TweenMax.fromTo(shazam, 1, {right: -48, top: -51,  opacity: 0, rotation: -180}, {right: 13, top: 26, opacity: 1, rotation: 0}), "shazam+=0.5" );

    	tl.call(function() {
    		$(".shazam").addClass("shazam-active");
    	}, null, null, "shazam+=0.9");		
    						



    	// var total = tl.totalDuration(); //gets total duration
    	// 		  	tl.totalDuration(71); //sets the total duration
    	
    }

    $('.trivia-img-1').on('click', function() {
    	$('.trivia-img-1 div').addClass('trivia-check')
    });

    $('.trivia-img-2').on('click', function() {
    	$('.trivia-img-2 div').addClass('exit-popup')
    });

    $('.trivia-img-3').on('click', function() {
    	$('.trivia-img-3 div').addClass('exit-popup')
    });

    $('.trivia-img-4').on('click', function() {
    	$('.trivia-img-4 div').addClass('exit-popup')
    });




    // --- jQueryUI Controls --- //

    $("#slider").slider({
      range: false,
      min: 0,
      max: 1,
      step:0.001,
      start: function( event, ui) {
      	paused_before_drag = tl.paused();
        tl.pause();
      },
      slide: function ( event, ui ) {
      	//adjust the timeline's progress() based on slider value
        tl.progress( ui.value);
      	console.log("slider progress changed!", ui.value)
      },
      stop: function( event, ui ) {
      	if (paused_before_drag) {
      		// leave paused
      	} else {
      		tl.play();
      	}
      } 
    });

    function updateSlider() {
      $("#slider").slider("value", tl.progress());
    } 

    // play / pause

    $("#playPause").click(function(){
      console.log("play/pause clicked");
      if( $(this).hasClass("playing")){
        $(this).removeClass("playing");
        // TweenLite.to(tl, 0, {timeScale:1});
        tl.pause();
      } else {
        $(this).addClass("playing");
        // TweenLite.to(tl, 0, {timeScale:0});
        tl.play();
      }
    });

    buildTimeline();
    tl.progress(0).pause();










    $('.parallax-header').parallax({imageSrc: './assets/img/context-img.png'});
    $('.parallax-footer').parallax({imageSrc: './assets/img/context-img2.jpg'});
    $('.parallax-main').parallax({imageSrc: './assets/img/screen.jpg'});




});