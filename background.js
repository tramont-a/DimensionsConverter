// Listen for extension icon click
chrome.action.onClicked.addListener((tab) => {
  // Send message to content script to show the manual conversion panel
  chrome.tabs.sendMessage(tab.id, {
    type: 'SHOW_MANUAL_CONVERTER'
  }).catch((error) => {
    console.log('Content script not ready on this tab');
  });
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'SHOW_CONVERSION') {
    // Store conversion data and activate the floating panel on the current tab
    chrome.tabs.sendMessage(sender.tab.id, {
      type: 'DISPLAY_PANEL',
      data: request.data
    });
  }
  sendResponse({});
});
