$(document).ready(function () {

console.log("Hello")
        
    //Datepicker
    $('.datepicker').datepicker({
        format: "mm/dd/yyyy",
        autoclose: true
    });

    //Current Date with Moment.js
    var currentDate = moment ();
        console.log("Current Date: " + currentDate.format("L"));

    //Current Location Weather Function
    function currentWeather () {
        
        // Here we run our AJAX for Geo Location
        $.ajax({
            url: "https://geoip-db.com/jsonp",
            jsonpCallback: "callback",
            dataType: "jsonp",
            success: function (location) {
                console.log("Current Location: " + location.city);

                // This is our API key
                var weatherAPIKey = "166a433c57516f51dfab1f7edaed8413";
    
                //City Input
                var userCity = location.city;
            
                // Here we are building the URL we need to query the database
                var weatherURL =    "https://api.openweathermap.org/data/2.5/weather?q=" +
                                    userCity + "&units=imperial&appid=" + weatherAPIKey;
    
                // Here we run our AJAX call to the OpenWeatherMap API 
                $.ajax ({
                    url: weatherURL,
                    method: "GET"
                })
                
                // We store all of the retrieved data inside of an object called "response"
                .then (function(response) {
                    console.log(response);
                    console.log(response.name);
                    console.log(Math.floor(response.main.temp) + "° F");
                    console.log(response.weather[0].description);
                    console.log(response.weather[0].icon);

                    var userWeatherCity = response.name;
                    var userWeatherTemp = (Math.floor(response.main.temp) + "° F");
                    var userWeatherDescription = response.weather[0].description;
                    var userWeatherDiv = $("<div>");

                    $("#location-weather").append(userWeatherDiv);
                    userWeatherDiv.append(userWeatherCity);
                    userWeatherDiv.append(userWeatherTemp);
                    userWeatherDiv.append(userWeatherDescription);

        
                });
            }

        });

    };

    currentWeather();

    //Modal
    $('.modal').modal();
    
    //Forecast
    $("#search").on("click", function() {
    
        event.preventDefault();
    
        // This is our API key
        var weatherAPIKey = "166a433c57516f51dfab1f7edaed8413";
    
        //City Input
        var userCity = $("#location").val().trim(); //Will Be Used In Final Version
        var userCity = "Minneapolis";
    
        //Days of Weather Needed
        var days = ""; //Will Be Used In Final Version
        var days = 6
            
        // Here we are building the URL we need to query the database
        var weatherURL =    "https://api.openweathermap.org/data/2.5/forecast/daily?q=" +
                            userCity + "&units=imperial&appid=" + weatherAPIKey + "&cnt=" + days;
    
        // Here we run our AJAX call to the OpenWeatherMap API 
        $.ajax ({
        url: weatherURL,
        method: "GET"
        })
                
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
        // Log the queryURL
        console.log("weatherURL: " + weatherURL);
        // Log the resulting object
        console.log(response);
        console.log("================================");
        
        var results = response.list;

            for (var i = 0; i < results.length; i++) {

                var city = response.city.name
                var date = results[i].dt;
                var dateNew = moment.unix(date).format('L');
                var temp = Math.floor(results[i].temp.max);
                var sky = results[i].weather[0].description;
                var image = "http://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png"

                console.log(dateNew);
                console.log(city);
                console.log(image);
                console.log(sky);
                console.log(temp + "° F");
                console.log("================================");

                //Append Weather Info To Table
                $("#weather-table > tbody").append("<tr><td>" + "<img src=" + image + ">" + "</img>"  + "</td><td>" + dateNew + "</td><td>" + city + "</td><td>" + sky + "</td><td>" + "High of " + temp + "° F" + "</td></tr>")
            }

            //Date Picked
            var pickedDate = $('.datepicker').val();
                console.log("Date Picked: " + pickedDate);               
        });

    });
    
})