
$(document).ready(function(){
    $('.datepicker').datepicker();
  });

var dateFormat = "YYYYMMDD"; 

$("#search").on("click", function (event) {
    event.preventDefault();
    
    var today = moment();
    var dateEntered = moment($("#date").val().trim());
    
    var reformattedToday = moment(today).format(dateFormat);
    var reformattedDateEntered = moment(dateEntered).format(dateFormat);
    
    // add 00 because that's how the API wants us to structure the date in our query
    var fromDate = reformattedToday + "00"; 
    var toDate = reformattedDateEntered + "00";


var userCity = $("#location").val().trim();
console.log("userCity:", userCity);


var eventAPIKey = "R2SmVPVrHGFhKdGX";
var eventsURL = "http://api.eventful.com/json/events/search?...&date=" + fromDate + "-" + toDate + "&page_size=10&location=" + userCity + "&app_key=" + eventAPIKey;

// output format to JSON see: http://api.eventful.com/docs/formats 


$.ajax({
    url: eventsURL,
    method: "GET"
    }).then(function (response) {
        var responseJSON = JSON.parse(response)
        console.log("eventsURL: ", eventsURL);

        const { event } = responseJSON.events;

        for (var i = 0; i < event.length; i++) {
            const description = event[i].description ? event[i].description : "Not Available";
            const start_time = event[i].start_time ? event[i].start_time: "No time info";
            const venue_name = event[i].venue_name ? event[i].venue_name: "No place info";
            
            const eventInfo = $("<tr>").addClass("event-list").html("<td><strong>" + event[i].title + "</strong></td><td>" + description + "</td><td> " + 
            start_time + "<br>" + venue_name + "</td>");
    
            $("#events").append(eventInfo);
        }
    });
});
