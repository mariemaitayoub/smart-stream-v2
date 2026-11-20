import { ajouterChaine } from "../services/api.js";

export function ajoutChaines(success) {
    const modal = document.querySelector("#formulaire");
    const open = document.querySelector("#open");
    const closeBtn = document.querySelector("#btn-close");
    const form = document.querySelector("form");
    const error = document.querySelector("#error") || document.querySelector("#erreur");

    open.addEventListener('click', (e) => {
        if (error) error.textContent = "";
        modal.showModal();
    });

    closeBtn.addEventListener('click', (e) => {
        modal.close();
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const num = document.querySelector("#num").value.trim();
        const name = document.querySelector("#name").value.trim();
        const category = document.querySelector("#category").value.trim();
        const image = document.querySelector("#image").value.trim() || "https://placehold.co/100x60?text=" + name;

        if (!num || !name) {
            error.textContent = "Le numéro et le nom sont obligatoires !";
            return;
        }
        error.textContent = "";

        const chaine = {
            channelNumber: num,
            name: name,
            category: category || "GENERALISTE",
            logo: image,
            previewImage: image,
            isFavorite: false,
            isBlacklisted: false
        };

        try {
            const nouvelleChaine = await ajouterChaine(chaine);
            if (nouvelleChaine) {
                if (success) {
                    success(nouvelleChaine);
                }
                form.reset();
                modal.close();
            }
        } catch (err) {
            error.textContent = "Erreur lors de l'ajout de la chaîne";
        }
    });
}
