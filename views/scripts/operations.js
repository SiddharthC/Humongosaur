$(document).ready(function(){
	jQuery('#query_result').val("");
	$('#run_button').click(function(){
//		jQuery('#query_result').val("");
		var params = {
			query: jQuery('#input_query_box').val()
		};
		$.getJSON("/inputQuery", params, function(result){
			jQuery('#query_result').val(result);
		});
	});
});
