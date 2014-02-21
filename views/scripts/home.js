$(document).ready(function() {

	var logoutHandler = function(){
		var LOGOUT_URL = "/logout";

		$.ajax(LOGOUT_URL, {
			type: "POST"
		}).done(function(){
			window.location = "/login";
		});
	};

	/* All event handler assignments go in here */
	var assignEventHandlers = function(){
		$("#logout_link").click(logoutHandler);
	};

	assignEventHandlers();
});