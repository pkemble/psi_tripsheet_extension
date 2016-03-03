$(function() {
	var d = GetFlightsForCurrentDuty(userId, function(){
		$('#flightStuff').html(d.responseText);
	});
	var jsonFlights = JSON.parse(d.responseText);
	if(jsonFlights.Flights.count > 0){
		
	}
});