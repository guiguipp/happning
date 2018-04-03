$("document").ready(function() {

	$(document).ready(function(){
	$('#date').datepicker({
		onSelect: function() {
			var dateObject = $(this).datepicker("getDate")
		}

		console.log(dateObject)
  	});

  	var pickedDate = $('#date').val()

  	console.log(pickedDate)
})