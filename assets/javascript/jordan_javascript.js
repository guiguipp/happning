$(document).ready(function() {

	console.log("ready")

	$(document).on("click", "#favorite-event", function() {
		console.log("click")
		$(this).text("favorite")

		$("#favorite-list").append("<tr><td><i class='material-icons'>favorite</td><td></td><td></td><td></td><td></td></tr>");
	})
})


// function to grab the current location automatically
$.ajax({
    url: "https://geoip-db.com/jsonp",
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: function (location) {

        // $('#location').val(location.city);
        console.log("location.city: " + location.city);
    }
});