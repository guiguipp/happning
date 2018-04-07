var userCity = $("#location").val().trim();

var dateFormat = "YYYYMMDD";

var start = moment().format(dateFormat);
var end = moment($("#date").val()).format(dateFormat);

console.log("start: ", start);
console.log("end: ", end);

var eventAPIKey = "SHMWgQLH9C3kfzc4";

var eventsURL = "http://api.eventful.com/json/events/search?date=" + start + "00-" + end + "00&page_size=10&location=" + userCity + "&within=10&app_key=" + eventAPIKey;


console.log(eventsURL)
$.ajax({
    url: eventsURL,
    method: "GET"
}).then(function (response) {
    console.log("Response: ", response);

    // const {event} = response.events;

    const responseJSON = JSON.parse(response);
    const event = responseJSON.events.event;
    console.log("#######event: ", event.length);

    for (let i = 0; i < event.length; i++) {

        const description = event[i].description ? event[i].description : "No Description Available.";

        console.log("description: ", description);

        const eventInfo = $("<tr>").addClass("event-list").html("<td><strong>" + event[i].title + "</strong></td><td>" + description +
            "</td><td>" + event[i].start_time + "</td>");

        $("#events").append(eventInfo);
    }
});





