// 定义刷新间隔时间（以分钟为单位）
const REFRESH_INTERVAL_MINUTES = 0.1;
const SPECIFIC_URL = "https://www.google.com";

// 监听标签页更新事件
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // 检查标签页是否加载完成并且 URL 是否匹配
    if (changeInfo.status === 'complete' && tab.url.includes(SPECIFIC_URL)) {
        // 创建一个定期触发的闹钟，用于刷新该特定标签页
        chrome.alarms.create(`refreshTab_${tabId}`, { periodInMinutes: REFRESH_INTERVAL_MINUTES });
    }
});

// 监听标签页关闭事件
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    // 清除与关闭标签页相关的闹钟
    chrome.alarms.clear(`refreshTab_${tabId}`);
});

// 监听闹钟触发事件
chrome.alarms.onAlarm.addListener((alarm) => {
    const tabId = parseInt(alarm.name.split('_')[1], 10);
    if (alarm.name.startsWith('refreshTab_')) {
        // 刷新特定标签页
        chrome.tabs.reload(tabId);
    }
});