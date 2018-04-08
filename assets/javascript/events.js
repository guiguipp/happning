// global variables
const eventsArray = [];
const favIcon = "favorite";
const unFavIcon = "favorite_border";

let timeStamp = Math.floor(Date.now() / 1000)
console.log("timeStamp: " , timeStamp)

// THis is the time format the event API is requesting  
const dateFormat = "YYYYMMDD"; 

$(document).ready(function(){
    $('.datepicker').datepicker();
  });

// Functions triggered on event search

$("#search").on("click", function (event) {
    event.preventDefault();

    var userCity = $("#location").val().trim();
    console.log("userCity:", userCity);

    var today = moment();
    var dateEntered = moment($("#date").val().trim());
    
    var reformattedToday = moment(today).format(dateFormat);
    var reformattedDateEntered = moment(dateEntered).format(dateFormat);
    
    // add 00 because that's how the API wants us to structure the date in our query
    var fromDate = reformattedDateEntered + "00"; 
    var toDate = reformattedDateEntered + "00";

var eventAPIKey = "R2SmVPVrHGFhKdGX";
var eventsURL = "http://api.eventful.com/json/events/search?...&date=" + fromDate + "-" + toDate + "&page_size=10&location=" +
 userCity + "&app_key=" + eventAPIKey;

// output format to JSON see: http://api.eventful.com/docs/formats 

$.ajax({
    url: eventsURL,
    method: "GET"
    }).then(function (response) {
        var responseJSON = JSON.parse(response)
        console.log("eventsURL: ", eventsURL);

        const { event } = responseJSON.events;

        for (var i = 0; i < event.length; i++) {

            var e = event[i];
            var description = e.description ? e.description : "No Description yet. Come check later!";

            // This is an object constructor to create each event retrieved from the API as an object
            function EventDisplayed(id, icon, favIcon, heartStatus, title, description, start) {
                this.id = id;
                this.icon = icon;
                this.favIcon = favIcon;
                this.heartStatus = heartStatus;
                this.title = title;
                this.description = description;
                this.start = start;
                eventsArray.push(this);
            }

            // and this is how objects can be dynamically created with properties of the constructor and elements of the API + the "for loop"
            var newEvent = new EventDisplayed(
                "id='" + e.id + "'>",
                "<td class='icon'> <i heart='empty' class='material-icons' id='favorite-event' value='save'>" + unFavIcon + "</i>",
                "favorite",
                "empty",
                e.title,
                description,
                moment(e.start_time).format("M/DD H:mm A"),
            )
            // those are variable to add html tags dynamically
                var eInfo = "<tr class='event'"; 
                var idTag = "<td id='obj-"; 
                // var iconTag = "<td class='icon'> <i class='material-icons'>" + newEvent.icon
                var eTitle = "<td class='event-title'>"
                var eDescription = "<td class ='event-description'>"
                var eDate = "<td class='date'>"
                
                // and here I create the row with the attributes of the object + the HTML tags
                var eRow = `${eInfo} ${newEvent.id} ${newEvent.icon} ${eTitle} ${newEvent.title} ${eDescription} ${newEvent.description} ${eDate} ${newEvent.start}`;
                console.log(eRow);

            // Youngmi's code breaking:   
            // const description = event[i].description ? event[i].description : "Not Available";
            // const start_time = event[i].start_time ? event[i].start_time: "No time info";
            // const venue_name = event[i].venue_name ? event[i].venue_name: "No place info";

            
            // const eventInfo = $("<tr>").addClass("event-list material-icons").attr({id:"favorite-event", heart:"empty"}).html("<td><strong>" + event[i].title + "</strong></td><td>" + description + 
            // "</td><td> " + start_time + "<br>" + venue_name + "</td>");


            $("#events").append(eRow);
        }
    });
});

$(document).on("click", ".material-icons", function (){
    getId = ($(this).attr("heart"))
    console.log(getId);
});
