import { channels } from "./services/api.js";
import { channelsList } from "./ui/sidebar.js";
import { saveSelectId, loadSelectId } from "./utils/storage.js";
import {showloading,hideloding} from "./ui/loading.js";
import { filtre } from './ui/filtre.js';

import { fav } from "./events/listeners.js";

const searchInput = document.querySelector("#search-input");
const categorySelect = document.querySelector("#categorie-select");
const channelList = document.querySelector("#channels-list");

const playerLogo = document.querySelector('#player-logo');



        let allChannels = [];
        let selectedId = loadSelectId();


        function updateList() {
            const text = searchInput.value.trim().toLowerCase();
            const result = filtre(allChannels, text, categorySelect.value);
            channelsList(result, selectedId, selectChannel);

        }
        function fillCategories() {
            const categories = [...new Set(allChannels.map((channel) => channel.category))];
            categories.forEach((category) => {
                categorySelect.innerHTML += `<option value="${category}">${category}</option>`;
            });
        }


            searchInput.addEventListener("input", updateList);
            categorySelect.addEventListener("change", updateList);

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
                    updateList();

                } catch (error) {
                    channelList.innerHTML = `<p class="text-red-400 text-center py-6">${error.message}</p>`;

                }finally{
                    hideloding();
                }
            }

            fetchData();
    fav();    
















