$(document).ready(function() {

	$('#date').datepicker();
	$('.modal').modal();
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