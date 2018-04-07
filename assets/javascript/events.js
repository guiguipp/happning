// $("#date").datepicker().format("YYYY MM DD");
// $("#to").datepicker();
$(document).ready(function(){
    $('.datepicker').datepicker();
  });

// THis is the time format the API is requesting  
var dateFormat = "YYYYMMDD"; 

$("#search").on("click", function (event) {
    event.preventDefault();
    
    /* This is the format of the date we got from the date picker
    We need to specify its format, or moment.js is freaking out
    (because it thinks we are converting a random string, and falls
    back to regular js */
    var dateEntered = moment($("#date").val(),"mmm dd yyyy");
    var nextDay = moment(dateEntered).add(1, 'day');
    
    var reformattedDate = moment(dateEntered).format(dateFormat);
    var reformattedNextDay = moment(nextDay).format(dateFormat);
    console.log("reformattedDate: " + reformattedDate);
    console.log("reformattedNextDay: " + reformattedNextDay);
    
    // add 00 because that's how the API wants us to structure the date in our query
    var fromDate = reformattedDate + "00"; 
    var toDate = reformattedNextDay + "00" 
    console.log("fromDate: " + fromDate);
    console.log("toDate: " + toDate);


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
            var e = event[i];
            var description = e.description ? e.description : "No Description yet. Come check later!";

            // This is an object constructor to create each event retrieved from the API as an object
            function EventDisplayed(id, icon, title, description, start) {
                this.id = id;
                this.icon = icon;
                this.title = title;
                this.description = description;
                this.start = start;
            }

            // and this is how objects can be dynamically created with properties of the constructor and elements of the API + the "for loop"
            var newEvent = new EventDisplayed(
                "<td id='obj-" + i + ">",
                "<td class='icon'> <i class='material-icons' id='icon" + i + "'>" + "favorite_border" + "</i>",
                e.title,
                description,
                e.start_time,
            )
            // those are variable to add html tags dynamically
                var eInfo = "<tr class='event'>"; 
                var idTag = "<td id='obj-"; 
                // var iconTag = "<td class='icon'> <i class='material-icons'>" + newEvent.icon
                var eEmphasis = "<td class='title'><strong>"
                var eDescription = "<td class ='description'>"
                var eDate = "<td class='date'>"
                
                // and here I create the row with the attributes of the object + the HTML tags
                var eRow = `${eInfo} ${newEvent.id} ${newEvent.icon} ${eEmphasis} ${newEvent.title} ${eDescription} ${newEvent.description} ${eDate} ${newEvent.start}`;
                console.log(eRow);
            
                $("#event-list").append(eRow);

                // the goal is to be able to #1 have an id for each event #2 have the icon as an attribute (that can then be changed)
        }
    });
});
$(document).on("click", ".material-icons", function (){
    getId = ($(this).attr("id"))
    console.log(getId);
});
