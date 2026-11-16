
export function channelsList(channels, selectedId, onSelect) {
    const channelList = document.querySelector("#channels-list");
    channelList.innerHTML = ``;

    channels.forEach(element => {
        const card = document.createElement("div");
        card.className = 'card';
        card.style.cursor = 'pointer';
        card.style.border =
            element.id === selectedId ? '2px solid #dc2626' : "2px solid transparent";
        card.innerHTML = `
    <div class="flex items-center justify-between p-3 ">
    <div class="flex items-center  gap-3 border-y border-gray-800 p-3">
    <img src="${element.previewImage}" class="w-24 h-14" alt="${element.name}" />
    <div>
    <p class="text-sm text-gray-400">${element.channelNumber}</p>
    <p class="text-lg font-bold text-gray-300">${element.name}</p>
   </div>
   </div>
   <button  class='fav text-yellow-400 text-xl'>☆</button>
   </div>
    `;
        card.addEventListener('click', () => {

            onSelect(element);
        });
        // fav(card);
        channelList.appendChild(card);
    });
}