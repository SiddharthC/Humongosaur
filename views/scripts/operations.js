$(document).ready(function(){
//run button
$("#run_button").click(function () {
	//$('#spn_url').html('<strong>' + "Bully Rules" + '</strong>');
	console.log("run button clicked");
	var params = {
		query: jQuery('#input_query_box').val()
	};

	$.getJSON("/inputQuery", params, function(result){
		jQuery('#output_box').val() = result;
	});
});
});
