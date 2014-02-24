$(document).ready(function(){
	$('#run_button').click(function(){
		var params = {
			query: jQuery('#input_query_box').val()
		};
		$.getJSON("/inputQuery", params, function(result){
			jQuery('#query_result').text(result);
		});
	});
});
