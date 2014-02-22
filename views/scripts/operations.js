//run button
$('#run_button').click(function(){
	var params = {
		query: jQuery('#input_query_box').val()
	};

	$.getJSON("/inputQuery", params, function(result){
		jQuery('#output_box').val() = result;
	});
});
