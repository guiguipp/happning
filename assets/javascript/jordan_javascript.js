$(document).ready(function() {

	console.log("ready")

// 	$(document).on("click", "#favorite-event", function() {
// 		console.log("click")
// 		$(this).text("favorite")

// 		$(".favorite-row").clone().appendTo("#favorite-list")
// 	})
// })

    // var favoritelist;
    // var list;

    // if (!Array.isArray(list)){
    //     list = [];
    // }

    // function putInModal() {
    //     $("#favorite-list").empty();
    //     var insideList = JSON.parse(localStorage.getItem(favoritelist));
    //     if (!Array.isArray(insideList)){
    //         insideList = [];
    //     }
    //     for (var i = 0; i < insideList.length; i++) {
    //         var tr = $("<tr>").text(insideList[i]);
    //         var b = $("<button class ='delete'>").text("x").attr("data-index", i);
    //         $("#favorite-list").append("<tr><td><i class='material-icons'>not_interested</td><td></td><td></td><td></td><td></td></tr>");
    //     }
    // }

    // putInModal();

    // // favoritelist.splice(currentIndex, 1);
    // list = favoritelist;

    // localStorage.setItem("favoritelist", JSON.stringify(favoritelist));

    // putInModal();

    var trArray = [];

    $(document).on("click", "#favorite-event", function() {

        console.log("click");

        $(this).text("favorite");

        $("#favorite-list").empty()

        // $("#event-list tr").each(function() {
        //     var tr = $(this).text()
        //     var tdArray = [];
        //     $(this).find('td').each(function () {
        //         var td = $(this).text();
        //         tdArray.push();
        //     });

        //     trArray.push(tdArray)
        // })

        $(".favorite-row").clone().appendTo("#favorite-list")
    //     // var val = $("#favorite-item").val();
    //     // $("input[type='text']").val("");

    //     // list.push(val);
    //     // localStorage.setItem(favoritelist, JSON.stringify(list));

    //     // putInModal();
    });
});

//will delete lin
//$("#favorite-list").append(this)

// function to grab the current location automatically
// $.ajax({
//     url: "https://geoip-db.com/jsonp",
//     jsonpCallback: "callback",
//     dataType: "jsonp",
//     success: function (location) {

//         $('#location').val(location.city);
//         console.log("location.city: " + location.city);
//     }
