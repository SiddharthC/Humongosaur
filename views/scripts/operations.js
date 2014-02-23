$(document).ready(function(){
	$('#run_button').click(function(){
		console.log("Run button clicked....");
		var params = {
			query: jQuery('#input_query_box').val()
		};
	
		$.getJSON("/inputQuery", params, function(result){
			console.log("In call back");
			//console.log("result: " +  JSON.stringify(result));
			console.log("result non stringified: " + result);
			//console.log("stdout: " + JSON.stringify(result.stdout));
			//console.log("stdout: non stringified: " + result.stdout);
			jQuery('#query_result').text(result);
		});
	});
});
