chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab){
	if (tab.url == 'https://log.planesense.com/astroweb/' || tab.url == 'https://log.planesense.com/ASTROWeb/') {
		chrome.pageAction.show(tabId);
		//chrome.tabs.executeScript(tab.id, {file: "generateTripSheet.js"});
	}
});

chrome.pageAction.onClicked.addListener(function(tab) {
	chrome.tabs.sendMessage(tab.id, {action: "generateTripSheet"});
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.action == "jsonTripSheet")
      var jsonFlights = request.source;
      
      //open up the tripsheet template
      chrome.tabs.create({url: "tripsheet.html"}, function(tab){
      	var id = tab.id;
      });
      
  });
