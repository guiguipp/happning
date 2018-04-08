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

    $(document).on("click", ".event-list", function() {

        var favIcon = $(this).parent()
        var favRow = $(this).parent().siblings();

        // $(this).text("favorite");

        // $("#favorite-list").empty()

        // var favTable = new Array();

        // $("#event-list tr").each(function(row, tr) {
        //     favTable[row]={
        //         "eventTitle" : $(tr).find("td:eq(0)").text(),
        //         "eventDiscription" : $(tr).find("td:eq(1)").text(),
        //         "eventDateTime" : $(tr).find("td:eq(2)").text()
        //     }
        //     });

        // // console.log(favTable)
        //     favTable.shift();
        // })

        console.log(favRow)
        var row = $("<tr>");
        favIcon.clone().appendTo(row)
        favRow.clone().appendTo(row)
        row.appendTo("#favorite-list");
        // $("#favorite-list").html("<tr>")
    });
    //     // var val = $("#favorite-item").val();
    //     // $("input[type='text']").val("");

    //     // list.push(val);
    //     // localStorage.setItem(favoritelist, JSON.stringify(list));

    //     // putInModal();
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
