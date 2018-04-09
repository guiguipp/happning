// this actually goes into the frontend.js, but it isn't completely working yet, so stored as a different file

$(".shazam").hide();
var favRow;
var userCity;
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


$(document).ready(function() {

    console.log("ready")

    var list = JSON.parse(localStorage.getItem("favoritelist"));
console.log("FAVORITES" + list);

    $("#favorite-list").empty();
    //event handler on heart icon when events are generated
    
    $(document).on("click", "#favorite-event", function() {
       console.log("THIS" + this.parent());
        //copies event row
        var favIcon = $(this).parent();
        favRow = $(this).parent().siblings();
        var heartStatus = $(this).attr("heart");
        
        list.push(favRow);
        console.log("LIST" + list)
        localStorage.setItem("favoritelist", JSON.stringify(list));

        //appends to favorites list
        if (heartStatus === "empty") {

            $(this).text("favorite"); 

            console.log("FAVROW" + favRow);

            $(this).attr("heart", "full")

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
        
        var insideList = JSON.parse(localStorage.getItem("favoritelist"));
        if (!Array.isArray(insideList)) {
            insideList = [];
          }
          for (var i = 0; i < insideList.length; i++) {
            var tr = $("<tr>").text(insideList[i]);
            $("#favorite-list").append(tr);
          
        }
        
        });
        // putInModal()
        $(document).on("click", "empty", function() {
            var favoritelist = JSON.parse(localStorage.getItem("favorite"));
            var currentIndex = $(this).attr("data-index");
            favoritelist.splice(currentIndex, 1);
            list = favoritelist;
      
            // localStorage.setItem("favorite", JSON.stringify(favoritelist));
      
            // putInModal();
            console.log("LIST" + list)
    });
    

    // putInModal();
});