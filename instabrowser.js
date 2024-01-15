browser.contextMenus.create({
    id: "eat-page",
    title: "Eat this page",
  });
  
  function messageTab(tabs) {
    browser.tabs.sendMessage(tabs[0].id, {
      replacement: "Message from the extension!",
    });
  }
  
  function onExecuted(result) {
    let querying = browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    querying.then(messageTab);
  }
  
  browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "eat-page") {
      let executing = browser.tabs.executeScript({
        file: "page-eater.js",
      });
      executing.then(onExecuted);
    }
  });

  function handleMessage(request, sender, sendResponse ) {
    console.log(`A content script sent a message: ${request.greeting}`);
    sendResponse({response: 'My answer'});
  }

  browser.runtime.onMessage.addListener(handleMessage);


  