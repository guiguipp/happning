$(document).ready(function () {
console.log("Hello")
    $('.datepicker').datepicker({
        format: "mm/dd/yyyy",
        autoclose: true
    });

    $('.modal').modal();

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



$("#location").on("click", function () {
    $("#location").val("");
});

// By default (upon load) show the name stored in localStorage using "localStorage.getItem"
// $(".jumbotron").text(localStorage.getItem("city"));

// When users click "save-name"
$("#search").on("click", function (event) {
    // This line prevents the page from refreshing when a user hits "enter".
    event.preventDefault();


    // Clear the HTML from the jumbotron
    // $(".jumbotron").html("");

    // Grab the user input
    var userCity = $("#location").val().trim();
    var radius = $("#radius").val().trim();
    var time = $("#time").val().trim();

    console.log("userCity:", userCity);

    // initialize the input values
    $("#location").val("");
    $("#radius").val("10 mi");
    $("#time").val("");

    // This is our API key
    var weatherAPIKey = "166a433c57516f51dfab1f7edaed8413";

    // Here we are building the URL we need to query the database
    var weatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" +
        userCity + "&units=imperial&appid=" + weatherAPIKey;

console.log(weatherURL)
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: weatherURL,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {
        
            // Log the queryURL
            // console.log("weatherURL: ", weatherURL);

            // // Log the resulting object
            // console.log(response);




            // // Clear absolutely everything stored in localStorage using localStorage.clear()
            // localStorage.clear();

            // // Store the userCity into localStorage using "localStorage.setItem"
            // localStorage.setItem("city", userCity);


            // console.log("userCity: " + userCity);
            // console.log("radius: " + radius);

            // And display that city for the user using "localStorage.getItem"
            // $(".jumbotron").text(localStorage.getItem("city"));


            console.log("******************");
            console.log("response", response);




            // var results = response.list;

            // for (var i = 0; i < results.length; i++) {

            //     var city = response.city.name
            //     var date = results[i].dt_txt;
            //     var temp = Math.floor(results[i].main.temp);
            //     var sky = results[i].weather[0].main;
            //     var image = results[i].weather[0].icon

            //     console.log(city);
            //     console.log(date);
            //     console.log(temp + "° F");
            //     console.log(sky);
            //     console.log(image);

            //     var weatherDiv = $("<div>");
            //     var weatherImage = $("<img>");
            //     var weatherCity = $("<p>").text(city);
            //     var weatherDay = $("<p>").text("Date: " + date);
            //     var weatherSky = $("<p>").text("Sky: " + sky)
            //     var weatherTemp = $("<p>").text("Temperature: " + temp + "° F");

            //     weatherImage.attr("src", "http://openweathermap.org/img/w/" + image + ".png")

            //     $("#weatherInfo").append(weatherDiv);
            //     weatherDiv.append(weatherCity);
            //     weatherDiv.append(weatherDay);
            //     weatherDiv.append(weatherSky);
            //     weatherDiv.append(weatherTemp);
            //     weatherDiv.append(weatherImage);
            // }
console.log("LOOK HERE!!!")
console.log(response.list)
console.log("0000000000000000000000000000")
            const results = response.list;

            //grab the 1st 3hr weatherInfo
            const weatherDiv = $("<div>").html("<div><p><strong>" + response.city.name + "</strong></p><br><p>Date: " + results[0].dt_txt + "</p><p>Temperature: " + Math.round(results[0].main.temp) + " ° F</p><p>Sky: " + results[0].weather[0].main + "</p><p><img src='http://openweathermap.org/img/w/" + results[0].weather[0].icon + ".png'></p></div>****************************<br>");

            //     console.log("******************");
            //     console.log("weatherDiv: ", weatherDiv);

            //     $("#weatherInfo").append(weatherDiv);
             
            // for (var j = 0; j < results.length; j++) {
            //     console.log("******************");
            //     console.log("results[0].dt_txt", results[0].dt_txt);
            //     console.log("Temperature: ", Math.round(results[0].main.temp));

            //     const weatherDiv = $("<div>").html("<div><p><strong>" + response.city.name + "</strong></p><br><p>Date: " + results[j].dt_txt + "</p><p>Temperature: " + Math.round(results[j].main.temp) + " ° F</p><p>Sky: " + results[j].weather[0].main + "</p><p><img src='http://openweathermap.org/img/w/" + results[j].weather[0].icon + ".png'></p></div>****************************<br>");

            //     console.log("******************");
            //     console.log("weatherDiv: ", weatherDiv);

             $("#weatherInfo").append(weatherDiv);

            // }

        });