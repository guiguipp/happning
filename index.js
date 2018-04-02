// $('.demo').fireworks({
//   sound: true, // sound effect
//   opacity: 0.9,
//   width: '100%',
//   height: '100%'
// });

// $("body").animate({opacity: 0}, 3000, function(){
//     $(this).css({'background-image': "url('https://i1.wp.com/captiontool.com/wp-content/uploads/2018/02/Captions-For-Event.jpg?resize=768%2C341&ssl=1')"})
//                .animate({opacity: 1},{duration: 3000});
//  });

	
$.ajax({
    url: "https://geoip-db.com/jsonp",
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: function( location ) {
       
        $('#your-city').val(location.city);
        console.log("location.city: " + location.city);
    }
});     



var userCity ="";

$("#your-city").on("click", function() {
$("#your-city").val("");
});

// By default (upon load) show the name stored in localStorage using "localStorage.getItem"
// $(".jumbotron").text(localStorage.getItem("city"));

// When users click "save-name"
$("#save-city").on("click", function(event) {
// This line prevents the page from refreshing when a user hits "enter".
event.preventDefault();


// Clear the HTML from the jumbotron
$(".jumbotron").html("");

// Grab the user input
userCity = $("#your-city").val().trim();
radius = $("#radius").val().trim();


// initialize the input values
$("#your-city").val("");
$("#radius").val("10");

// This is our API key
var weatherAPIKey = "166a433c57516f51dfab1f7edaed8413";

// Here we are building the URL we need to query the database
var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
userCity + "&units=imperial&appid=" + weatherAPIKey;


// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
url: weatherURL,
method: "GET"
})
// We store all of the retrieved data inside of an object called "response"
.then(function(response) {

// Log the queryURL
console.log("weatherURL: " + weatherURL);

// Log the resulting object
console.log(response);




// Clear absolutely everything stored in localStorage using localStorage.clear()
localStorage.clear();

// Store the userCity into localStorage using "localStorage.setItem"
localStorage.setItem("city", userCity);


console.log("userCity: " + userCity);
console.log("radius: " + radius);

// And display that city for the user using "localStorage.getItem"
// $(".jumbotron").text(localStorage.getItem("city"));

$(".jumbotron").html("<h2>" + response.name + "</h2><br><h4>Temperature: " + Math.round(response.main.temp) + " F </h4><h4>Humidity: " + response.main.humidity + " % </h4><h4>Wind Speed: " + Math.round(response.wind.speed) + " m/s </h4><h4>Condition: " + response.weather[0].description + "</h4><h4><img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png'></h4>");


// Log the data in the console as well
console.log("userCity: " + response.name);
console.log("Wind Speed: " + response.wind.speed);
console.log("Humidity: " + response.main.humidity);
console.log("Temperature (F): " + response.main.temp);
console.log("Details: " + response.weather[0].description);
console.log("Icon_Number: " + response.weather[0].icon);
});

// Eventful api
var eventAPPKey = "8K4g8J4q2z2RFfZf";
// var page_size = 10;
var eventsURL = "http://api.eventful.com/json/events/search?date=today&page_size=10&location=" + userCity + "&within=" + radius + "&app_key=" + eventAPPKey;

// Meetup Api
// var eventAPIKey = "46151b4431f28d6e5f33668147529";
// var eventsURL = "https://api.meetup.com1/find/groups2?zip=11211&radius=1&category=253&order=members4";

// Here we run our AJAX call to the Eventful API
$.ajax({
url: eventsURL,
method: "GET"
})
// We store all of the retrieved data inside of an object called "response"
.then(function(response) {
    var responseJSON = JSON.parse(response)
// Log the queryURL
console.log("eventsURL: " + eventsURL);

// Log the resulting object
console.log("***********************************")
console.log(typeof responseJSON)
console.log("***********************************")
console.log(responseJSON);
console.log("This is .events.event[0].title:")
console.log(responseJSON.events.event[0].title);
// console.log("Event: " + responseJSON.events.event + " OR Event[0]: " + responseJSON.events.event[0]);

$("#well-section").html("<h1>" + responseJSON.events.event[0].title + "</h1><br><h3>" + responseJSON.events.event[0].description + "</h3><br><h3>By " + responseJSON.events.event[0].venue_name + "</h3><br><h3>" + responseJSON.events.event[0].start_time + "</h3><br><h3> ~ " + responseJSON.events.event[0].stop_time + "</h3><br><h4>" + responseJSON.events.event[0].url);

//       // Log the data in the console as well
console.log(responseJSON.events.event[0].title);
console.log(responseJSON.events.event[0].description);
console.log(responseJSON.events.event[0].venue_name);
console.log(responseJSON.events.event[0].start_time);
console.log(responseJSON.events.event[0].stop_time);
console.log(responseJSON.events[0].event.url);

  });

});

// Meetup API
// APP key: 46151b4431f28d6e5f33668147529


// Eventful API Authentication (api_key needed, but no OAuth needed; outdoor category exists!)
// api_key: http://api.eventful.com/docs/auth
// api_key: 8K4g8J4q2z2RFfZf
// parameters: http://api.eventful.com/docs/events/search



// Eventbrite API Authentication (api_key & OAuth needed)
// Ref: https://www.eventbrite.com/developer/v3/api_overview/authentication/#ebapi-oauth-token-flow
// APP NAME: Group3		
// KEYS: 33EV54ISFBIHKJNZHQ
// Client secret: RIHQBFLXFSN5BO6X2WC56N5WP7FIUAIINJGYIW3NADUSKQWUWI
// Your personal OAuth token: EK4PGCYQL5OFOX6QYAX6
// Anonymous access OAuth token: PF5UH4TWVTSWZ7ZEUJAI





