"use strict";

const lastActiveTabInfo = new Map();

const getAdjacentTab = (tabs, index) => {
  const rightTab = tabs[index];
  const leftTab = tabs[index - 1];

  return rightTab || leftTab;
};

const updateLastActiveTabInfo = async (tab) => {
  const tabs = await browser.tabs.query({
    windowId: tab.windowId,
    cookieStoreId: tab.cookieStoreId,
  });
  const index = tabs.findIndex((t) => t.id === tab.id);
  lastActiveTabInfo.set(tab.windowId, {
    index,
    cookieStoreId: tab.cookieStoreId,
  });
};

browser.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await browser.tabs.get(activeInfo.tabId);
  await updateLastActiveTabInfo(tab);
});

browser.tabs.onMoved.addListener(async (tabId, moveInfo) => {
  const tab = await browser.tabs.get(tabId);
  await updateLastActiveTabInfo(tab);
});

browser.tabs.onRemoved.addListener(async (tabId, removeInfo) => {
  if (!removeInfo.isWindowClosing) {
    const windowId = removeInfo.windowId;
    const lastTabInfo = lastActiveTabInfo.get(windowId);

    if (lastTabInfo) {
      const tabs = await browser.tabs.query({
        windowId,
        cookieStoreId: lastTabInfo.cookieStoreId,
      });
      const adjacentTab = getAdjacentTab(tabs, lastTabInfo.index);
      if (adjacentTab) {
        await browser.tabs.update(adjacentTab.id, { active: true });
      }
    }
  }
});
