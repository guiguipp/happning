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
});
$(document).ajaxError(function(){
    M.toast({html: 'Sorry, we were unable to find information for this request. Please double check your search criteria and try again!'})
  });
