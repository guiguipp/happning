$(document).ready(function() {

// 	console.log("ready")

// 	$(document).on("click", "#favorite-event", function() {
// 		console.log("click")
// 		$(this).text("favorite")

// 		$("#favorite-list").append("<tr><td><i class='material-icons'>favorite</td><td></td><td></td><td></td><td></td></tr>");
// 	})
// })

// var favoritelist;
var list = JSON.parse(localStorage.getItem("favoritelist"));

if (!Array.isArray(list)){
    list = [];
}

function putInModal() {
    $("#favorite-list").empty();
    var insideList = JSON.parse(localStorage.getItem("favoritelist"));
    if (!Array.isArray(insideList)){
        insideList = [];
    }
    for (var i = 0; i < insideList.length; i++) {
        var tr = $("<tr><td><i class='material-icons'>favorite</td><td></td><td></td><td></td><td></td></tr>").text(insideList[i]);
        var b = $("<button class ='delete'>").text("x").attr("data-index", i);
        tr.append(b);
        $("#favorite-list").append(tr);
    }
}

putInModal();

$(document).on("click", "button.delete", function(){
    var favoritelist = JSON.parse(localStorage.getItem("favoritelist"));
    var currentIndex = $(this).attr("data-index");


favoritelist.splice(currentIndex, 1);
list = favoritelist;

localStorage.setItem("favoritelist", JSON.stringify(favoritelist));

putInModal();

});

$(document).on("click", "#favorite-event", function() {
    $(this).text("favorite");
    event.preventDefault();

    var val = $("input[type='text']").val();
    $("input[type='text']").val("");

    list.push(val);
    localStorage.setItem("favoritelist", JSON.stringify(list));

    putInModal();
});

});
// function to grab the current location automatically
// $.ajax({
//     url: "https://geoip-db.com/jsonp",
//     jsonpCallback: "callback",
//     dataType: "jsonp",
//     success: function (location) {

//         $('#location').val(location.city);
//         console.log("location.city: " + location.city);
//     }
