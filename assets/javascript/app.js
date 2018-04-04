$(document).ready(function () {
console.log("Hello")
    $('#date').datepicker();

    $("#search").on("click", function() {
        event.preventDefault();
        // This is our API key
        var weatherAPIKey = "166a433c57516f51dfab1f7edaed8413";

        var userCity = $("#location").val().trim();
        var userCity = "minneapolis";
        // Here we are building the URL we need to query the database

        //16-Day Forecast
        var weatherURLLong =    "https://api.openweathermap.org/data/2.5/forecast?q=" +
                                userCity + "&units=imperial&appid=" + weatherAPIKey + "&cnt=16";
        //1-Day Forecast
        var weatherURLShort =   "https://api.openweathermap.org/data/2.5/weather?q=" +
                                userCity + "&units=imperial&appid=" + weatherAPIKey;
        //5-Day Forecast
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


            var currentDate = moment ();
                console.log("Current Date: " + currentDate.format("ll"));

            var pickedDate = $('.datepicker').val();
                console.log("Date Picked: " + pickedDate);

            // var pickedDate2 = JSON.stringify(pickedDate);
            // console.log(pickedDate2);
            
            // var daysAway = moment(pickedDate).fromNow();
            //     console.log(daysAway);

            // var formattedPickedDate = moment(pickedDate).format("l");
                // console.log(formattedPickedDate);
                
            // var diffDate = moment(pickedDate).fromNow('minutes');
                // console.log(diffDate);
            
        });
    });
})