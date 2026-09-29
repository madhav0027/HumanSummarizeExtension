
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: "ai-toolbox",
        title: "AI Toolbox",
        contexts: ["selection"]
    });
});


chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId !== "ai-toolbox") {
        return;
    }

    const selectedText = info.selectionText || "";

    await chrome.storage.local.set({
        selectedText: selectedText
    });

    if (tab?.id) {
        await chrome.sidePanel.open({
            windowId: tab.windowId
        });
    }
});
