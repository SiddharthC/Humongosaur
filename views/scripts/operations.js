//run button
/*$('#run_button').click(function(){

	var params = {
		query: jQuery('#input_query_box').val()
	};

	$.getJSON("/inputQuery", params, function(result){
		jQuery('#output_box').val() = result;
	});
});*/

function myFunction()
{
	document.getElementById("demo").innerHTML="Hello World";
	var params = {
		query: jQuery('#input_query_box').val()
	};

	$.getJSON("/inputQuery", params, function(result){
		jQuery('#output_box').val() = result;
	});
}
