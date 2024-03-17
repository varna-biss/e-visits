$(function () {
   	
    $('.slider').slick({
        arrows: false,
        fade: true,
        autoplay: 200,
        dots: true
    });

	$('.header-btn').on('click', function(){
		$('.menu').addClass('active');
	})
	$('.close-btn').on('click', function(){
		$('.menu').removeClass('active');
	});
	$('.header-menu').on('click', function(){
		$('.menu').removeClass('active');
	});




	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});
	
});

	