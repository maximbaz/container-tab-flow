"use strict";

const lastActiveTabInfo = new Map();

const getContainerTabs = (windowId, cookieStoreId) =>
  browser.tabs.query({ windowId, cookieStoreId });

browser.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await browser.tabs.get(activeInfo.tabId);
  const tabs = await getContainerTabs(tab.windowId, tab.cookieStoreId);

  lastActiveTabInfo.set(tab.windowId, {
    index: tabs.findIndex((t) => t.id === tab.id),
    cookieStoreId: tab.cookieStoreId,
  });
});

browser.tabs.onRemoved.addListener(async (tabId, removeInfo) => {
  const last = lastActiveTabInfo.get(removeInfo.windowId);
  if (removeInfo.isWindowClosing || !last) {
    return;
  }

  const tabs = await getContainerTabs(removeInfo.windowId, last.cookieStoreId);
  const adjacentTab = [0, 1, -1].map(offset => tabs[last.index + offset])
                                .find(tab => tab && tab.id !== tabId);
  if (adjacentTab) {
    await browser.tabs.update(adjacentTab.id, { active: true });
  }
});
