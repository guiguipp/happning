$(".shazam").hide();

$(document).ready(function() {
    //event handler on heart icon when events are generated
    $(document).on("click", "#favorite-event", function() {

        //copies event row
        var favIcon = $(this).parent();
        var favRow = $(this).parent().siblings();
        var heartStatus = $(this).attr("heart");

        //appends to favorites list
        if (heartStatus === "empty") {

            $(this).text("favorite"); 

            console.log(favRow)

            $(this).attr("heart", "full")

            $('#fav-icon').addClass("pulse")

            var row = $("<tr>");
            favIcon.clone().appendTo(row)
            favRow.clone().appendTo(row)
            row.appendTo("#favorite-list");
        
        // removes from favorites list
        } else if (heartStatus === "full") {

            $(this).attr("heart", "empty")

            $(this).text("favorite_border")

            favIcon.replaceWith("")
            favRow.replaceWith("")
        }
    });
    console.log(`If you are seeing this message: "No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access." your access to the APIs we are using is probably blocked by Chrome. To circumvent this, you can download this extension: https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc/related?hl=en to browse the site locally`)
    //Datepicker
    $('.datepicker').datepicker({
        format: "mm/dd/yyyy",
        autoclose: true
    });

    //Current Date with Moment.js
    var currentDate = moment();
    // console.log("Current Date: ", currentDate.format("L"));

    //Current Location Weather Function
    function currentWeather() {
        getGeolocation();
        // Here we run our AJAX for Geo Location
        $.ajax({
            url: "https://geoip-db.com/json",
            method: "GET"
            })
            .then(function (response) {
                var responseJSON = JSON.parse(response)
                userCity = responseJSON.city;
        
             // Here we are building the URL we need to query the database
                var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&units=imperial&appid=" + weatherAPIKey;
                // Here we run our AJAX call to the OpenWeatherMap API 
                $.ajax({
                    url: weatherURL,
                    method: "GET"
                })
                    // We store all of the retrieved data inside of an object called "response"
                    .then(function (response) {
                        var userWeatherCity = response.name;
                        var userWeatherTemp = (Math.floor(response.main.temp) + "° F");
                        var userWeatherDescription = response.weather[0].description;
                        var userWeatherDiv = $("<div>");
                        $("#location-weather").append(userWeatherDiv);
                        userWeatherDiv.append("<div>" + userWeatherCity + "</div>");
                        userWeatherDiv.append("<div>" + userWeatherTemp + "</div>");
                        userWeatherDiv.append("<div>" + userWeatherDescription + "</div>");    
                    });
                });    
            };

});
$(document).ajaxError(function(){
    M.toast({html: 'Sorry, we were unable to find information for this request. Please double check your search criteria and try again!'})
  });
// global variables 
const eventsArray = [];
const favorIcon = "favorite";
const unfavorIcon = "favorite_border";

getUserCity()

// This is the time format the event API is requesting  
const dateFormat = "YYYYMMDD"; 

// Functions triggered on event search
$("#search").on("click", function (event) {
    event.preventDefault();
    $(".shazam").show();
    $(".placeholder").hide();
    
    if ($("#location").val().trim() !== "") {
        userCity = $("#location").val().trim();
    }
    var dateEntered;
    var today = moment();
    
    if ($("#date").val() !== "") {
        dateEntered = moment($("#date").val().trim());
    }
    else dateEntered = moment(today).format(dateFormat);
    
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
        // console.log("eventsURL: ", eventsURL);

        const { event } = responseJSON.events;

        for (var i = 0; i < event.length; i++) {

            var e = event[i];
            var description = e.description ? e.description : "No Description yet. Come check later! \n";

            // This is an object constructor to create each event retrieved from the API as an object
            function EventDisplayed(id, icon, favorIcon, heartStatus, title, description, location, start, end, duration) {
                this.id = id;
                this.icon = icon;
                this.favorIcon = favorIcon;
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
                "<td class='icon'> <i heart='empty' class='material-icons' id='favorite-event' value='save'>" + unfavorIcon + "</i>",
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
                var eTitle = "<td class='event-name'>"
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
                    eDate = "Time not specified \n:( "; 
                    }; 
                
                // Creating the row with the attributes of the object + the HTML tags
                // add ${newEvent.location} for location
                var eRow = `${eInfo} ${newEvent.id} ${newEvent.icon} ${eTitle} ${newEvent.title} ${eDescription} ${newEvent.description} ${tdDate} ${eDate}`;
                // console.log(eRow);

            $("#events").append(eRow);
        }
    })
});
$(document).on("click", ".material-icons", function (){
    getId = ($(this).attr("heart"))
    // console.log(getId);
});

// function adapted from "Javascript & JQuery. Interactive front-end web development
var geolocation;
var userCity;
var msg = "Sorry, we were unable to set your location automatically";

function getGeolocation(){
    if (Modernizr.geolocation) {
        navigator.geolocation.getCurrentPosition(success, fail);
        console.log("function running");
        
    } else {
        M.toast({html: 'Sorry, we were unable to find information for this request. Please double check your search criteria and try again!'})
    }

    function success(position) {
        console.log("get it");
        
        let gps = position.coords
        let lat = gps.latitude
        let long = gps.longitude
        console.log(long);
        let reverseLocURL =  "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + lat + "&lon=" + long
        console.log("url: " + reverseLocURL)
        $.ajax({
            url: reverseLocURL,
            method: "GET"
        }).then(function (response) {
            userCity = response.address.city;
            currentWeather();
            return userCity;
        });
    }
    function fail() {        
        getUserCity();
    }
}
getGeolocation()

function getUserCity(){
$.ajax({
    url: "https://geoip-db.com/json",
    method: "GET"
    })
    .then(function (response) {
        var responseJSON = JSON.parse(response)
        userCity = responseJSON.city;
        return userCity;
    });
}

// global variables
const weatherAPIKey = "166a433c57516f51dfab1f7edaed8413";
const weatherArray = [];
let wRow;
let wHead;

$(".modal").modal();

// getUserCity();

// $(document).ready(function () {
    
currentWeather();
    

    //Forecast
    $("#search").on("click", function () {
        event.preventDefault();

        //If City Input (if not, stays defined by geolocation API)       
        if ($("#location").val().trim() !== "") {
            userCity = $("#location").val().trim();
        }
       
        //Days of Weather Needed
        $("#date").datepicker();
            var dateFormat = "YYYYMMDD",

                date = $("#date").datepicker({
                    defaultDate: "+1w",
                    changeMonth: true,
                    numberOfMonths: 3
                })
                    .on("change", function () {

                        date.datepicker("option", "maxDate", getDate(this));
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
            
            today = moment().format(dateFormat);
            // console.log(today);
            
            if ($("#date").val() === "") {
                dateEntered = moment(today).format(dateFormat);
                // console.log("Because nothing entered: " + dateEntered)
            }
            else {
                dateEntered = moment($("#date").val()).format(dateFormat);
                // console.log("Because something entered: " + dateEntered)
            }
            // var to get number of days from now to end of period queried
            var days = moment(dateEntered).diff(moment(today), 'days');
            
            var weatherURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" +
                userCity + "&units=imperial&appid=" + weatherAPIKey + "&cnt=" + (days + 1);

            if (days >= 16) {
                wHead = "No weather data available for the date selected at the moment. Please check again later!";
                $("#weather-header").empty("").append(wHead);
                $("#weather-table").empty("")
            } 
            else {                        

            $.ajax({
                url: weatherURL,
                method: "GET"
            }).then(function (response) {
                    // Log the queryURL
                    // console.log("Forecast weatherURL: " + weatherURL);
                    // console.log("================================");
                    let results = response.list;
                    for (let i = 0; i < results.length; i++) {
                        var unixDate = results[i].dt;

                        // object constructor for weather data from the API
                        // objects are pushed in an array
                        function weatherDay(city, dateNew, tempHigh, tempLow, sky, image) {
                            this.city = city;
                            this.dateNew = dateNew;
                            this.tempHigh = tempHigh;
                            this.tempLow = tempLow;
                            this.sky = sky;
                            this.image = image;
                            weatherArray.push(this);
                            }
                        // objects populate with data from the API
                        let wF = new weatherDay(
                            response.city.name,
                            moment.unix(unixDate).format('L'),
                            Math.round(results[i].temp.max),
                            Math.round(results[i].temp.min),
                            results[i].weather[0].description,
                            "http://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png'>")
                        }
                        // shortcut to get the last element of the array
                        let last = weatherArray.length-1;
                        let day = weatherArray[last];
                    
                        // elements to help display on html
                        const tRow = "<tr class='weather_result'>";
                        const tTag = "<td>";
                        const tImg = "<img src='";
                        const tTemp = "°F";
                        const tHighTemp = "<td>High: ";
                        const tLowTemp = " / Low: ";
                                           
                        wHead = "";
                        wRow = `${tRow}${tTag}${tImg}${day.image}${tTag}${day.dateNew}${tTag}${day.city}${tTag}${day.sky}${tHighTemp}${day.tempHigh}${tTemp}${tLowTemp}${day.tempLow}${tTemp}`;
                        // }
                        $("#weather-header").html("<tr> <th class= 'not-empty'>  </th> <th>Date</th> <th>City</th> <th>Sky</th> <th>Temperature</th>");
                        $("#weather-table").empty("").append(wRow);
                        // console.log(wRow);
                });
            }
        });
    // })