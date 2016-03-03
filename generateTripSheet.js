
function getFlights(doc){
	var jsonFlights = doc.getElementById('flightStuff').innerHTML;
	var request = { source: jsonFlights, action: "jsonTripSheet" };
	chrome.runtime.sendMessage(request);
}

// using GetFlightsForCurrentDuty JSON: 
(function() {
	// just place a div at top right
	var userIdElement = document.getElementById('userID');
	var userId = userIdElement.value;
	var div = document.createElement('div');
	div.id = 'flightStuff';
	div.style.position = 'absolute';
	div.style.visibility = "hidden";
	document.body.appendChild(div);
	
	//load script
	var scriptText = 
	
	//replace userID
	

	var s = document.createElement('script');
	var c = document.createTextNode("");
	s.appendChild(c);
	(document.head).appendChild(s);
	
	//alert('inserted self... giggity');

})();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if (request.action == "generateTripSheet"){
		getFlights(document);
	}
});

