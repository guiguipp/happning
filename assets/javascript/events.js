

$.ajax({
    url: "https://geoip-db.com/jsonp",
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: function (location) {

        $('#location').val(location.city);
        console.log("location.city: " + location.city);
    }
});



$(".submit").on("click", function () {
    $("#location").val("");
});


$("#from").datepicker();
$("#to").datepicker();



$("#search").on("click", function (event) {
    
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


var start = moment($(from).val()).format(dateFormat);
var end = moment($(to).val()).format(dateFormat);

var days = moment($(to).val()).diff(moment($(from).val()), 'days');


var userCity = $("#location").val().trim();
var radius = $("#radius").val().trim();


console.log("userCity:", userCity);


$("#location").val("");
$("#radius").val("10 mi");
$("#from").val("");
$("#to").val("");



// ***********************************************************
// Weather Part

// var weatherAPIKey = "166a433c57516f51dfab1f7edaed8413";

// var weatherURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" +
//     userCity + "&cnt=" + days + "&units=imperial&appid=" + weatherAPIKey;


// $.ajax({
//     url: weatherURL,
//     method: "GET"
// }).then(function (response) {
//         console.log(response);

//         const results = response.list;

//         results.forEach(function(result) {
//             const weatherDiv = $("<div>").html("<p><strong>" + response.city.name + "</strong></p><br><p>Low: " + Math.round(results.temp.min) + " F </p><p>High: " + Math.round(results.temp.max) + " F </p><p>Sky: " + 
//             results.weather[0].description + "</p><p><img src='http://openweathermap.org/img/w/" + results.weather[0].icon + ".png'></p>")
//         $("#weather-out").append(weatherDiv);
//     });


// ***********************************************************



var eventAPPKey = "8K4g8J4q2z2RFfZf";
var eventsURL = "http://api.eventful.com/rest/events/search?...&date=" + start + "00-" + end + "00&page_size=10&location=" + userCity + "&within=" + radius + "&api_key=" + eventAPIKey;

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

        const eventInfo = $("<tr>").html("<td><strong>" + event[i].title + "</strong></td><td>" + description + "</td><td> " + 
        event[i].venue_name + "</td><iframe width='600' height='450' frameborder='0' style='border:0' src='https://www.google.com/maps/embed/v1/place?key=AIzaSyDwCKEyy5bmqNtKpj_zaIYN8QL-DSE0DAc&q=" + 
        response.events.venue_name + " allowfullscreen'></iframe><td>" + event[i].start_time + "</td>**********************<br>");

        $("#event-favorites").append(eventInfo);
    }

});



});

