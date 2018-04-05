$(document).ready(function() {

	console.log("ready")

	$(document).on("click", "#favorite-event", function() {
		console.log("click")
		$(this).text("favorite")

		$("#favorite-list").append("<tr><td><i class='material-icons'>favorite</td><td></td><td></td><td></td><td></td></tr>");
	})
})

