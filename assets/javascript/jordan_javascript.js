$(document).ready(function() {

	console.log("ready")

	$(document).on("click", "#add-to-favorites", function() {
		console.log("click")
		$(this).text("favorite")

		// $("#favorite-list").empty();

		$("#favorite-list").append("<tr><td><i class='material-icons favorited-event' data-class='heart-full'>favorite</td><td></td><td></td><td></td><td></td></tr>");
	})

	$(document).on("click", ".favorited-event", function() {
		var heartStatus = $(this).attr("data-class");

		if (heartStatus === "heart-full") {
			$("favorite-list").append("");
		}
	})
})


// function to grab the current location automatically
$.ajax({
    url: "https://geoip-db.com/jsonp",
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: function (location) {

        $('#location').val(location.city);
        console.log("location.city: " + location.city);
    }
});