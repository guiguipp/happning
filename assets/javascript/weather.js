// global variables
const weatherAPIKey = "166a433c57516f51dfab1f7edaed8413";
const weatherArray = [];

$(document).ready(function () {
    console.log("Hello")
    //Datepicker
    $('.datepicker').datepicker({
        format: "mm/dd/yyyy",
        autoclose: true
    });

    //Current Date with Moment.js
    var currentDate = moment();
    console.log("Current Date: ", currentDate.format("L"));

    //Current Location Weather Function
    function currentWeather() {
        // Here we run our AJAX for Geo Location
        $.ajax({
            url: "https://geoip-db.com/jsonp",
            jsonpCallback: "callback",
            dataType: "jsonp",
            success: function (location) {
                console.log("Current Location: " + location.city);
                
                //City Input
                var userCity = location.city;
                // Here we are building the URL we need to query the database
                var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
                    userCity + "&units=imperial&appid=" + weatherAPIKey;
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
            }
        });
    };
    currentWeather();

    //Modal
    $('.modal').modal();

    //Forecast
    $("#search").on("click", function () {
        event.preventDefault();
        //City Input
        var userCity = $("#location").val().trim(); //Will Be Used In Final Version
        console.log("userCity: ", userCity);
       
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
            
            var today = moment().format(dateFormat);
            var dateEntered = moment($("#date").val()).format(dateFormat);
            var days = moment(dateEntered).diff(moment(today), 'days'); 
            
            var weatherURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" +
                userCity + "&units=imperial&appid=" + weatherAPIKey + "&cnt=" + (days + 1);
            // Here we run our AJAX call to the OpenWeatherMap API 
            $.ajax({
                url: weatherURL,
                method: "GET"
            })
                // We store all of the retrieved data inside of an object called "response"
                .then(function (response) {
                    // Log the queryURL
                    console.log("Forecast weatherURL: " + weatherURL);
                    // Log the resulting object
                    console.log("================================");
                    let results = response.list;
                    for (let i = 0; i < results.length; i++) {
                        var unixDate = results[i].dt;

                    function weatherDay(city, dateNew, tempHigh, tempLow, sky, image) {
                        this.city = city;
                        this.dateNew = dateNew;
                        this.tempHigh = tempHigh;
                        this.tempLow = tempLow;
                        this.sky = sky;
                        this.image = image;
                        weatherArray.push(this);
                    }
                    
                    let wF = new weatherDay(
                        response.city.name,
                        moment.unix(unixDate).format('L'),
                        Math.round(results[i].temp.max),
                        Math.round(results[i].temp.min),
                        results[i].weather[0].description,
                        "http://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png'>")
                    }
                    
                    let last = weatherArray.length-1;
                    let day = weatherArray[last];
                    
                    const tRow = "<tr class='weather_result'>";
                    const tTag = "<td>";
                    const tImg = "<img src='";
                    const tTemp = "° F";
                    const tHighTemp = "<td>High: ";
                    const tLowTemp = "/Low: ";
                    
                    let wRow = `${tRow} ${tTag} ${tImg} ${day.image} ${tTag} ${day.dateNew} ${tTag} ${day.city} ${tTag} ${day.sky} ${tHighTemp}${day.tempHigh} ${tTemp} ${tLowTemp}${day.tempLow}${tTemp}`;
                    console.log(wRow);
                    $("#weather-table>").append(wRow);
                });
        });
    })