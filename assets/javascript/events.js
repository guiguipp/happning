


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

// By default (upon load) show the name stored in localStorage using "localStorage.getItem"
// $(".jumbotron").text(localStorage.getItem("city"));


$("#from").datepicker();
$("#to").datepicker();


// When users click "save-name"
$("#search").on("click", function (event) {
    // This line prevents the page from refreshing when a user hits "enter".
    event.preventDefault();



    var dateFormat = "YYYYMMDD",
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


    
console.log("FROMDATEGOESHERE##############");
console.log( moment($(from).val()).format(dateFormat) );


var start = moment($(from).val()).format(dateFormat);
var end = moment($(to).val()).format(dateFormat);

// moment js
var days = moment($(to).val()).diff(moment($(from).val()), 'days');  // 3

console.log("daysinfogoeshere##############")
console.log(days)


// Clear the HTML from the jumbotron
// $(".jumbotron").html("");

// Grab the user input
var userCity = $("#location").val().trim();
var radius = $("#radius").val().trim();


console.log("userCity:", userCity);

// initialize the input values
$("#location").val("");
$("#radius").val("10 mi");
$("#from").val("");
$("#to").val("");

// Weather api
// from Dan!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Eventful api
var eventAPPKey = "8K4g8J4q2z2RFfZf";
console.log("*******************");
console.log(from);
console.log(to);


var eventsURL = "http://api.eventful.com/rest/events/search?...&date=" + start + "-" + end + "&page_size=10&location=" + userCity + "&within=" + radius + "&api_key=" + eventAPIKey;

console.log("startdategoeshere$$$$$$$");
console.log(start);

console.log("eventsURLgoeshere$$$$$$$$$$$$$$$$$$$$$$$");
console.log(eventsURL);


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

        // const eventInfo = $("<div>").html("<div><p><strong>" + event[i].title + "</strong></p><p>" + description + "</p><p>By: " + event[i].venue_name + "</p><p>Where: " + venueAddress + "</p><p>Starting at: " + event[i].start_time + "</p></div>**********************<br>");
        $("#well-section").append(eventInfo);
    }
    //       // Log the data in the console as well
    console.log(responseJSON.events.event[0].title);
    console.log(responseJSON.events.event[0].description);
    console.log(responseJSON.events.event[0].venue_name);
    console.log(responseJSON.events.event[0].venueAddress);
    console.log(responseJSON.events.event[0].start_time);




});



});



