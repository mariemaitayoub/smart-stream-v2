export function saveSelectId(id) {
    const key = 'seleChannelId';
    localStorage.setItem(key, id);
}
export function loadSelectId() {
    const key = 'seleChannelId';
    return localStorage.getItem(key);
}

export function saveActiveTab(tab) {
    localStorage.setItem('activeTab', tab);
}

export function loadActiveTab() {
    return localStorage.getItem('activeTab') || 'all';
}
