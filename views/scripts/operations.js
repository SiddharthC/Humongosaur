//run button
$('#run_button').click(function(){
	console.log("Run button clicked....");
	var params = {
		query: jQuery('#input_query_box').val()
	};

	$.getJSON("/inputQuery", params, function(result){
		jQuery('#output_box').val() = result;
	});
});
