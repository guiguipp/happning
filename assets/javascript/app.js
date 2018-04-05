$(document).ready(function () {

console.log("Hello")
    
    //Datepicker
    $('.datepicker').datepicker({
        format: "mm/dd/yyyy",
        autoclose: true
    });

    //Modal
    $('.modal').modal();

    //5 Day Forecast
    $("#search").on("click", function() {

        event.preventDefault();

        // This is our API key
        var weatherAPIKey = "166a433c57516f51dfab1f7edaed8413";

        //City Input
        var userCity = $("#location").val().trim();
        
        // Here we are building the URL we need to query the database
        var weatherURL =        "https://api.openweathermap.org/data/2.5/forecast?q=" +
                                userCity + "&units=imperial&appid=" + weatherAPIKey;

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
                var date = results[i].dt_txt;
                var temp = Math.floor(results[i].main.temp);
                var sky = results[i].weather[0].main;
                var image = results[i].weather[0].icon

                console.log(city);
                console.log(date);
                console.log(temp + "° F");
                console.log(sky);
                console.log(image);
                console.log("================================");

                var weatherDiv = $("<div>");
                var weatherImage = $("<img>");
                var weatherCity = $("<p>").text(city);
                var weatherDay = $("<p>").text("Date: " + date);
                var weatherSky = $("<p>").text("Sky: " + sky)
                var weatherTemp = $("<p>").text("Temperature: " + temp + "° F");

                weatherImage.attr("src", "http://openweathermap.org/img/w/" + image + ".png")
                    
                $("#description").append(weatherDiv);
                weatherDiv.append(weatherCity);
                weatherDiv.append(weatherDay);
                weatherDiv.append(weatherSky);
                weatherDiv.append(weatherTemp);
                weatherDiv.append(weatherImage);
            }

            //Current Date with Moment.js
            var currentDate = moment ();
                console.log("Current Date: " + currentDate.format("ll"));

            //Date Picked
            var pickedDate = $('.datepicker').val();
                console.log("Date Picked: " + pickedDate);         
        });
    });

    //1 Day Forecast
    $("#weather").on("click", function() {

        event.preventDefault();

        // This is our API key
        var weatherAPIKey = "166a433c57516f51dfab1f7edaed8413";

        //City Input
        var userCity = $("#location").val().trim();

        // Here we are building the URL we need to query the database(Current Day)
        var weatherURLShort =    "https://api.openweathermap.org/data/2.5/weather?q=" +
                                userCity + "&units=imperial&appid=" + weatherAPIKey;
            
        // Here we run our AJAX call to the OpenWeatherMap API
        $.ajax ({
        url: weatherURLShort,
        method: "GET"
        })
                
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
            // Log the queryURL
            console.log("weatherURL: " + weatherURLShort);
            // Log the resulting object
            console.log(response);
            console.log("================================");
                
            var results = response.main;

            var city = response.name
                console.log("city: " + city);
              
            var temp = Math.floor(results.temp);
                console.log("temp: " + temp + "° F");

            var weather = response.weather;

            for (var i = 0; i < weather.length; i++) {

                var description = weather[i].main;
                    console.log("desc: " + description);

                var image = weather[i].icon;
                    console.log(image);

                var weatherDiv = $("<div>");
                var weatherImage = $("<img>");
                var weatherCity = $("<p>").text(city);
                    
                weatherImage.attr("src", "http://openweathermap.org/img/w/" + image + ".png")

                $("#description").append(weatherDiv);
                    
                weatherDiv.append(weatherImage);
            }

                weatherDiv.append(weatherCity);

                var weatherTemp = $("<p>").text("Temperature: " + temp + "° F");
                weatherDiv.append(weatherTemp);   
        });
    });

    //16 Day Forecast
    $("#weather16").on("click", function() {

        event.preventDefault();

        // This is our API key
        var weatherAPIKey = "166a433c57516f51dfab1f7edaed8413";

        var userCity = $("#location").val().trim();

        // Here we are building the URL we need to query the database(Current Day)
        var weatherURLLong =    "https://api.openweathermap.org/data/2.5/forecast?q=" +
                                    userCity + "&units=imperial&appid=" + weatherAPIKey + "&cnt=16";

        // Here we run our AJAX call to the OpenWeatherMap API
        $.ajax ({
        url: weatherURLLong,
        method: "GET"
        })
                
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
            // Log the queryURL
            console.log("weatherURL: " + weatherURLLong);
            // Log the resulting object
            console.log(response);
            console.log("================================");
            
            var results = response.list;

            for (var i = 0; i < results.length; i++) {

                var city = response.city.name
                var date = results[i].dt_txt;
                var temp = Math.floor(results[i].main.temp);
                var sky = results[i].weather[0].main;
                var image = results[i].weather[0].icon

                console.log(city);
                console.log(date);
                console.log(temp + "° F");
                console.log(sky);
                console.log(image);
                console.log("================================");

                var weatherDiv = $("<div>");
                var weatherImage = $("<img>");
                var weatherCity = $("<p>").text(city);
                var weatherDay = $("<p>").text("Date: " + date);
                var weatherSky = $("<p>").text("Sky: " + sky)
                var weatherTemp = $("<p>").text("Temperature: " + temp + "° F");

                weatherImage.attr("src", "http://openweathermap.org/img/w/" + image + ".png")
                    
                $("#description").append(weatherDiv);
                weatherDiv.append(weatherCity);
                weatherDiv.append(weatherDay);
                weatherDiv.append(weatherSky);
                weatherDiv.append(weatherTemp);
                weatherDiv.append(weatherImage);
            }

        });
    });

})