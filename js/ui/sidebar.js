
export function channelsList(channels, selectedId, onSelect, currentTab = 'all') {
    const channelList = document.querySelector("#channels-list");
    channelList.innerHTML = ``;

    if (channels.length === 0) {
        let emptyMsg = "Aucune chaîne trouvée.";
        if (currentTab === 'blacklist') emptyMsg = "Aucune chaîne dans la liste noire.";
        if (currentTab === 'favorites') emptyMsg = "Aucun favori pour le moment.";
        channelList.innerHTML = `<p class="text-gray-400 text-center py-8 text-sm">${emptyMsg}</p>`;
        return;
    }

    channels.forEach(element => {
        const star = element.isFavorite ? '★' : '☆';
        const card = document.createElement("div");
        card.className = 'card';
        card.style.cursor = 'pointer';
        card.style.border =
            element.id === selectedId ? '2px solid #dc2626' : "2px solid transparent";

        
        const actions = currentTab === 'blacklist'
            ? `
            <div class="flex items-center gap-2">
                <button class="restore px-2 py-1 bg-green-600 hover:bg-green-500 text-white rounded text-xs" data-id="${element.id}">Restaurer</button>
                <button class="delete px-2 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-xs" data-id="${element.id}" title="Supprimer définitivement">🗑️</button>
            </div>
            `
            : `
            <div class="flex items-center gap-2">
                <button class='fav text-yellow-400 text-xl' data-id="${element.id}">${star}</button>
                <button class='block-btn text-lg hover:opacity-80' data-id="${element.id}" title="Cacher cette chaîne">🚫</button>
            </div>
            `;

        card.innerHTML = `
        <div class="flex items-center justify-between p-3 border-y border-gray-800">
            <div class="flex items-center gap-3">
                <img src="${element.previewImage}" class="w-24 h-14 object-cover" alt="${element.name}" />
                <div>
                    <p class="text-sm text-gray-400">${element.channelNumber}</p>
                    <p class="text-lg font-bold text-gray-300">${element.name}</p>
                </div>
            </div>
            ${actions}
        </div>
        `;

        card.addEventListener('click', (e) => {
            if (e.target.closest('.fav') || e.target.closest('.block-btn') || e.target.closest('.restore') || e.target.closest('.delete')) {
                return;
            }
            onSelect(element);
        });

        channelList.appendChild(card);
    });
}