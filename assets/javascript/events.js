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

$("#location").on("click", function () {
    $("#location").val("");
});

$('#from').datepicker();
$("#to").datepicker();
$("#search").on("click", function (event) {
    
    event.preventDefault();
    var dateFormat = "yyyymmdd",
    from = $("#from")
        .datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 3
        })
        .on("change", function () {
            to.datepicker("option", "minDate", getDate(this));
        }),
    to = $("#to").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3
    })
        .on("change", function () {
            from.datepicker("option", "maxDate", getDate(this));
        });
    function getDate(element) {
        var date;
        try {
            date = $.datepicker.parseDate(dateFormat, element.value);
        } catch (error) {
            date = null;
        }
        return date;
    }
});
// moment js
var days = moment(to).diff(moment(from), 'days');  // 3

// Eventful api
var eventAPPKey = "8K4g8J4q2z2RFfZf";
var eventsURL = "http://api.eventful.com/rest/events/search?...&date=" + from + "-" + to + "&page_size=10&location=" + userCity + "&within=" + radius + "&api_key=" + eventAPIKey;
$.ajax({
    url: eventsURL,
    method: "GET"
}).then(function (response) {
    var responseJSON = JSON.parse(response)
    console.log("eventsURL: ", eventsURL);
    const { event } = responseJSON.events;
    for (var i = 0; i < event.length; i++) {
        const description = event[i].description ? event[i].description : "No Description Available.";
        const venueAddress = event[i].venue_address ? event[i].venue_address : "No Address Available.";
        const eventInfo = $("<tr>").html("<td><strong>" + event[i].title + "</strong></td><td>" + description + "</td><td> " + event[i].venue_name + "</td><td> " + venueAddress + "</td><td> " + event[i].start_time + "</td>**********************<br>");
        const eventInfo = $("<div>").html("<div><p><strong>" + event[i].title + "</strong></p><p>" + description + "</p><p>By: " + event[i].venue_name + "</p><p>Where: " + venueAddress + "</p><p>Starting at: " + event[i].start_time + "</p></div>**********************<br>");
        $("#well-section").append(eventInfo);
    }
});
