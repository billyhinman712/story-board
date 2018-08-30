$(document).ready(function(){
	console.log('jquery is working');

    $('select').formSelect();

    $('.delete-btn').click(function(e){
		e.preventDefault();
		var url = $(this).attr('href');

		$.ajax({
			url: url,
			method: 'DELETE'
		}).done(function(res){
			// console.log('success', res);
			window.location = '/profile/articles';
		}).fail(function(err){
			console.log('error', err);
		});
	});

	$('.edit-form').submit(function(e){
		e.preventDefault();
		console.log('about to submit edit request');
		console.log($(this).attr('action'), $(this).serialize())

		// $.ajax({
		// 	url: $(this).attr('action'),
		// 	method: 'PUT',
		// 	data: $(this).serialize()
		// }).done(function(res){
		// 	console.log('success', res);
		// }).fail(function(err){
		// 	console.log('error', err);
		// });
	});
});