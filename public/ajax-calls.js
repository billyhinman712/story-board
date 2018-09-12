$(document).ready(function(){
	console.log('jquery is working');

    $('select').formSelect();

    $("#generator").click(function(){

		$.ajax({
			url:"https://talaikis.com/api/quotes/random/",
			method:"GET",
		}).done(function(response){
			console.log("success", response);
			$("#quote").text("\"" + response.quote + "\"");
			$("#title").text(response.author + " on " + response.cat);
			$("#quote").css("font-style", "italic");
		}).fail(function(err){
			console.log("error", err);
		});
	});//end of api call

    $('.delete-btn').click(function(e){
		e.preventDefault();
		var url = $(this).attr('href');
		console.log("HREF: ", url);
		$.ajax({
			url: url,
			method: 'DELETE'
		}).done(function(res){
			console.log('success', res);
			window.location = '/profile/articles';
		}).fail(function(err){
			console.log('error', err);
		});
	});//end of delete ajax

	$('.edit-form').submit(function(e){
		e.preventDefault();
		console.log('about to submit edit request');
		console.log($(this).attr('action'), $(this).serialize())

		$.ajax({
			url: $(this).attr('action'),
			method: 'PUT',
			data: $(this).serialize()
		}).done(function(res){
			console.log('success', res);
		}).fail(function(err){
			console.log('error', err);
		});
	});
});