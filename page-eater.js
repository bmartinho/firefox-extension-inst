function eatPageReceiver(request, sender, sendResponse) {
    window.location.href = 'https://www.instagram.com/miguel.deus/feed';
    
    window.onload = function() { console.log('loaded');}

    const sending = browser.runtime.sendMessage({
        greeting: "Greeting from the content script",
      });
      sending.then(handleResponse, handleError);
  }

  function handleResponse(message) {
    console.log(`Message from the background script: ${message.response}`);
  }
  
  function handleError(error) {
    console.log(`Error: ${error}`);
  }
  

  browser.runtime.onMessage.addListener(eatPageReceiver);
  