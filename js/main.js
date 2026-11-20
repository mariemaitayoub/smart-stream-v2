import { channels, favorite, blacklist, deleteChannel } from "./services/api.js";
import { channelsList } from "./ui/sidebar.js";
import { saveSelectId, loadSelectId, saveActiveTab, loadActiveTab } from "./utils/storage.js";
import { showloading, hideloding } from "./ui/loading.js";
import { filtre } from './ui/filtre.js';
import { ajoutChaines } from "./events/listeners.js";

const searchInput = document.querySelector("#search-input");
const categorySelect = document.querySelector("#categorie-select");
const channelList = document.querySelector("#channels-list");

const playerLogo = document.querySelector('#player-logo');

let allChannels = [];
let selectedId = loadSelectId();
let currentTab = loadActiveTab();

function updateList() {
    const text = searchInput.value.trim().toLowerCase();
    let result = filtre(allChannels, text, categorySelect.value);

    if (currentTab === 'blacklist') {
        result = result.filter(channel => channel.isBlacklisted === true);
    } else {
        result = result.filter(channel => !channel.isBlacklisted);

        if (currentTab === 'favorites') {
            result = result.filter(channel => channel.isFavorite);
        }
    }

    channelsList(result, selectedId, selectChannel, currentTab);
}

function fillCategories() {
    const categories = [...new Set(allChannels.map((channel) => channel.category))];
    categories.forEach((category) => {
        categorySelect.innerHTML += `<option value="${category}">${category}</option>`;
    });
}

searchInput.addEventListener("input", updateList);
categorySelect.addEventListener("change", updateList);

const btnAll = document.querySelector('#btn-all');
const btnFav = document.querySelector('#btn-favorites');
const btnBlacklist = document.querySelector('#btn-blacklist');

function setActiveTab(tab) {
    currentTab = tab;
    saveActiveTab(tab);
    btnAll.className = tab === 'all' ? 'px-3 py-1 bg-red-600 text-white rounded-lg text-sm' : 'px-3 py-1 bg-gray-600 text-white rounded-lg text-sm';
    btnFav.className = tab === 'favorites' ? 'px-3 py-1 bg-red-600 text-white rounded-lg text-sm' : 'px-3 py-1 bg-gray-600 text-white rounded-lg text-sm';
    btnBlacklist.className = tab === 'blacklist' ? 'px-3 py-1 bg-red-600 text-white rounded-lg text-sm' : 'px-3 py-1 bg-gray-600 text-white rounded-lg text-sm';
    updateList();
}

btnAll.addEventListener('click', () => setActiveTab('all'));
btnFav.addEventListener('click', () => setActiveTab('favorites'));
btnBlacklist.addEventListener('click', () => setActiveTab('blacklist'));

channelList.addEventListener('click', async (e) => {
    const favBtn = e.target.closest('.fav');
    if (favBtn) {
        e.stopPropagation();
        const id = favBtn.dataset.id;
        const channel = allChannels.find(c => c.id == id);
        if (!channel) return;

        channel.isFavorite = !channel.isFavorite;
        favBtn.textContent = channel.isFavorite ? '★' : '☆';

        try {
            await favorite(channel.id, channel.isFavorite);
        } catch (error) {
            console.error("Erreur sauvegarde favori:", error);
            channel.isFavorite = !channel.isFavorite;
            favBtn.textContent = channel.isFavorite ? '★' : '☆';
        }
        return;
    }

    // 2. Clic sur le bouton Bloquer (🚫)
    const blockBtn = e.target.closest('.block-btn');
    if (blockBtn) {
        e.stopPropagation();
        const id = blockBtn.dataset.id;
        const channel = allChannels.find(c => c.id == id);
        if (!channel) return;

        channel.isBlacklisted = true;
        updateList();

        if (selectedId == id) {
            const available = allChannels.find(c => !c.isBlacklisted);
            if (available) selectChannel(available);
        }

        try {
            await blacklist(channel.id, true);
        } catch (error) {
            console.error("Erreur blocage chaîne:", error);
            channel.isBlacklisted = false;
            updateList();
        }
        return;
    }

    const restoreBtn = e.target.closest('.restore');
    if (restoreBtn) {
        e.stopPropagation();
        const id = restoreBtn.dataset.id;
        const channel = allChannels.find(c => c.id == id);
        if (!channel) return;

        channel.isBlacklisted = false;
        updateList();

        try {
            await blacklist(channel.id, false);
        } catch (error) {
            console.error("Erreur restauration chaîne:", error);
            channel.isBlacklisted = true;
            updateList();
        }
        return;
    }

    const deleteBtn = e.target.closest('.delete');
    if (deleteBtn) {
        e.stopPropagation();
        const id = deleteBtn.dataset.id;
        const channel = allChannels.find(c => c.id == id);
        if (!channel) return;

        const confirmation = confirm(`Voulez-vous vraiment supprimer définitivement la chaîne "${channel.name}" ?`);
        if (!confirmation) return;

        // Suppression locale
        allChannels = allChannels.filter(c => c.id != id);
        updateList();

        if (selectedId == id) {
            const available = allChannels.find(c => !c.isBlacklisted);
            if (available) selectChannel(available);
        }

        try {
            await deleteChannel(id);
        } catch (error) {
            console.error("Erreur suppression chaîne:", error);
            allChannels.push(channel);
            updateList();
        }
        return;
    }
});

function selectChannel(channel) {
    selectedId = channel.id;
    saveSelectId(channel.id);


    playerLogo.src = channel.logo;
    playerLogo.alt = channel.name;
    updateList();

}


async function fetchData() {
    try {
        showloading();
        allChannels = await channels();
        fillCategories();

        const initial = allChannels.find(c => c.id == selectedId && !c.isBlacklisted)
            || allChannels.find(c => !c.isBlacklisted)
            || allChannels[0];
        if (initial) {
            selectChannel(initial);
        } else {
            updateList();
        }

        setActiveTab(currentTab);

    } catch (error) {
        channelList.innerHTML = `<p class="text-red-400 text-center py-6">${error.message}</p>`;

    } finally {
        hideloding();
    }
}
ajoutChaines((nouvelleChaine) => {
    allChannels.push(nouvelleChaine);
    fillCategories();
    updateList();
});
fetchData();
//favorite("1", false);
















