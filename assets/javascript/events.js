// $("#from").datepicker();
// $("#to").datepicker();

var dateFormat = "YYYYMMDD"; 

$("#search").on("click", function (event) {
    event.preventDefault();
    // console.log("Entered date: " + $("#date").val())
    var dateEntered = $("#date").val();
    var nextDay = moment(dateEntered).add(1, 'day');
    console.log("nextDay before reformatting:" + nextDay);
    
    var reformattedDate = moment(dateEntered).format(dateFormat);
    var reformattedNextDay = moment(nextDay).format(dateFormat);
    // console.log("reformattedDate: " + reformattedDate);
    var fromDate = reformattedDate + "00"; 
    var toDate = reformattedNextDay + "00" 
    console.log("fromDate: " + fromDate);
    console.log("toDate: " + toDate);


var userCity = $("#location").val().trim();


console.log("userCity:", userCity);


// $("#location").val("");
// $("#from").val("");
// $("#to").val("");


var eventAPIKey = "R2SmVPVrHGFhKdGX"; //R2SmVPVrHGFhKdGX.
var eventsURL = "http://api.eventful.com/json/events/search?...&date=" + fromDate + "-" + toDate + "&page_size=10&location=" + userCity + "&app_key=" + eventAPIKey;
// console.log("eventsURL: " , eventsURL);

// output format to JSON: http://api.eventful.com/docs/formats 


$.ajax({
    url: eventsURL,
    method: "GET"
}).then(function (response) {
    var responseJSON = JSON.parse(response)

    console.log("eventsURL: ", eventsURL);

    const { event } = responseJSON.events;

    for (var i = 0; i < event.length; i++) {
        const description = event[i].description ? event[i].description : "No Description yet. Come check later!";
        // const venueAddress = event[i].venue_address ? event[i].venue_address : "No Address Available.";

        const eventInfo = $("<tr>").html("<td class='place for heart'></td> <td class='title'> <strong>" + event[i].title + "</strong></td><td class='description'>" + description + "</td><td class='date'>" + event[i].start_time) 
        // event[i].venue_name + "</td><iframe width='600' height='450' frameborder='0' style='border:0' src='https://www.google.com/maps/embed/v1/place?key=AIzaSyDwCKEyy5bmqNtKpj_zaIYN8QL-DSE0DAc&q=" + 
        // response.events.venue_name + " allowfullscreen'></iframe><td>" + event[i].start_time + "</td>**********************<br>");
        // 
        //  <th>Event Title</th>
        // <th>Event Description</th>
        // <th>Date</th>
        // <th>Time</th>

        $("#event-list").append(eventInfo);
    }

});



});

