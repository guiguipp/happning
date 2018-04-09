// function adapted from "Javascript & JQuery. Interactive front-end web development
var geolocation;
var userCity;
var msg = "Sorry, we were unable to set your location automatically";
    
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
            return userCity;
        });
    }
    function fail() {        
        getUserCity();
    }

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