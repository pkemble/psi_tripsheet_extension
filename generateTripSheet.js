
function getFlights(doc){
	var trips = doc.getElementById('tripSheetInfo').textContent;
	var flights = doc.getElementById('tripSheetFlight').textContent;
	var request = { trips: trips, flights: flights, action: "jsonTripSheet" };
	chrome.runtime.sendMessage(request);
}

// using GetFlightsForCurrentDuty JSON: 
(function() {
	// just place a div at top right
	var userIdElement = document.getElementById('userID');
	var userId = userIdElement.value;
	var tsDiv = document.createElement('div');
	tsDiv.id = 'tripSheetInfo';
	tsDiv.style.position = 'absolute';
	tsDiv.style.visibility = 'hidden';
	document.body.appendChild(tsDiv);
	
	var tsDivFlight = document.createElement('div');
	tsDivFlight.id = 'tripSheetFlight';
	tsDivFlight.style.position = 'absolute';
	tsDivFlight.style.visibility = 'hidden';
	document.body.appendChild(tsDivFlight);
	
	//load script
	// var chrome.runtime.getUrl('inject.js');
	// var scriptText = 
//	var injectScript = "$(function() { var d = GetFlightsForCurrentDuty(userId, function(){ $('#flightStuff').html(d.responseText);	});	var jsonFlights = JSON.parse(d.responseText); if(jsonFlights.Flights.count > 0){ $.each(jsonFlights.Flights, function(){ var fId = this.FlightId; $('#flightStuff').append\"<div id='\" + fId + \">\" +  this.FlightId + '</div>');	});};});";

	var injectScript = "$(function() { \n" + 
		"	var d = GetFlightsForCurrentDuty("+ userId +", function(){ \n" +
		"		$('#tripSheetInfo').html(d.responseText); \n" +
		"		var jsonFlights = JSON.parse(d.responseText); \n" +
		"		if(jsonFlights.Flights.length > 0){ \n" +
		"			$.each(jsonFlights.Flights, function(){ \n" +
		"				var fId = this.FlightID; \n" +
		"				var f = GetFlightLog(fId, function(){ \n" +
		"					$('#tripSheetFlight').append('[' + f.responseText.replace('<none>','none') + ']'); \n" +
		" 				}); \n" +
		"			}); \n" +
		"		} \n" +
		"	}); \n" +
		"}); \n";
	var s = document.createElement('script');
	var c = document.createTextNode(injectScript);
	s.appendChild(c);
	(document.head).appendChild(s);
	
	//alert('inserted self... giggity');

})();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if (request.action == "generateTripSheet"){
		getFlights(document);
	}
});


