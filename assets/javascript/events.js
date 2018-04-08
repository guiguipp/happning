// global variables
const eventsArray = [];
const favIcon = "favorite";
const unFavIcon = "favorite_border";

let timeStamp = Math.floor(Date.now() / 1000)
console.log("timeStamp: " , timeStamp)

// This is the time format the event API is requesting  
const dateFormat = "YYYYMMDD"; 

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
            var description = e.description ? e.description : "No Description yet. Come check later! \n";

            // This is an object constructor to create each event retrieved from the API as an object
            function EventDisplayed(id, icon, favIcon, heartStatus, title, description, location, start, end, duration) {
                this.id = id;
                this.icon = icon;
                this.favIcon = favIcon;
                this.heartStatus = heartStatus;
                this.title = title;
                this.description = description;
                this.location = location
                this.start = start;
                this.end = end;
                this.duration = duration;
                eventsArray.push(this);
            }

            // and this is how objects can be dynamically created with properties of the constructor and elements of the API + the "for loop"
            var newEvent = new EventDisplayed(
                "id='" + e.id + "'>",
                "<td class='icon'> <i heart='empty' class='material-icons' id='favorite-event'>" + unFavIcon + "</i>",
                "favorite",
                "empty",
                e.title,
                description,
                e.venue_address + " in " + e.city_name,
                moment(e.start_time).format("M/DD H:mm A"),
                moment(e.stop_time).format("M/DD H:mm A"),
                e.all_day
            )
            // those are variable to add html tags dynamically
                var eInfo = "<tr class='event'"; 
                var idTag = "<td id='obj-"; 
                var eTitle = "<td class='event-title'>"
                var eDescription = "<td class ='event-description'>"
                var tdDate = "<td class='date'>"
                var eDate
                if (e.all_day === "0") 
                    {
                        eDate = moment(e.start_time).format("M/DD H:mm A");
                    } 
                else if (e.all_day === "1")
                    {
                        eDate = "All day"; 
                    } 
                else {
                    eDate = "Time not specified :( "; 
                    }; 
                
                // Creating the row with the attributes of the object + the HTML tags
                // add ${newEvent.location} for location
                var eRow = `${eInfo} ${newEvent.id} ${newEvent.icon} ${eTitle} ${newEvent.title} ${eDescription} ${newEvent.description} ${tdDate} ${eDate}`;
                console.log(eRow);

            $("#events").append(eRow);
        }
    });   
});
$(document).on("click", ".material-icons", function (){
    getId = ($(this).attr("heart"))
    console.log(getId);
});

