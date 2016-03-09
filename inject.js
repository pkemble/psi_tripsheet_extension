$(function() {
	var d = GetFlightsForCurrentDuty(userId, function(){
		$('#flightStuff').html(d.responseText);
	});
	var jsonFlights = JSON.parse(d.responseText);
	if(jsonFlights.Flights.count > 0){
		$.each(jsonFlights.Flights, function(){
			var fId = this.FlightId;
			$('#flightStuff').append("<div id='" + fId + ">" +  this.FlightId + '</div>');
		});
	};
});