$(document).ready(function () {

console.log("Hello")
        
    //Datepicker
    $('.datepicker').datepicker({
        format: "mm/dd/yyyy",
        autoclose: true
    });
    
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
        var days = 3
            
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
                var sky = results[i].weather[0].main;
                var image = results[i].weather[0].icon

                console.log(dateNew);
                console.log(city);
                console.log(image);
                console.log(sky);
                console.log(temp + "° F");
                console.log("================================");

                var weatherDiv = $("<div>");
                var weatherImage = $("<img>");
                var weatherCity = $("<p>").text(city);
                var weatherDate = $("<p>").text("Date: " + dateNew);
                var weatherSky = $("<p>").text("Sky: " + sky)
                var weatherTemp = $("<p>").text("Temperature: " + temp + "° F");

                weatherImage.attr("src", "http://openweathermap.org/img/w/" + image + ".png")
                    
                $(".weather-output").append(weatherDiv);
                weatherDiv.append(weatherDate);
                weatherDiv.append(weatherCity);
                weatherDiv.append(weatherImage);
                weatherDiv.append(weatherSky);
                weatherDiv.append(weatherTemp);    
            }

            //Current Date with Moment.js
            var currentDate = moment ();
                console.log("Current Date: " + currentDate.format("L"));

            //Date Picked
            var pickedDate = $('.datepicker').val();
                console.log("Date Picked: " + pickedDate);         
        });
    });
    
})