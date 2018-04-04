$(document).ready(function() {

	$('#date').datepicker({
		format: "dd/mm/yyyy",
	}).on('change', function() {
		$('.datepicker').close()
	});
	  
	  
	  var pickedDate = $("input")

	  console.log(pickedDate);
})