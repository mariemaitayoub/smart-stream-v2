export async function channels() {
    try {
        const resp = await fetch(`https://6af2462f42c6561ced392786.mockapi.io/channels/channels`);
        const response = await resp.json();
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export async function favorite(id, isFavorite) {
    const resp = await fetch(`https://6af2462f42c6561ced392786.mockapi.io/channels/channels/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ isFavorite: isFavorite })
    });
    return await resp.json();
}

export async function blacklist(id, isBlacklisted) {
    const resp = await fetch(`https://6af2462f42c6561ced392786.mockapi.io/channels/channels/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ isBlacklisted: isBlacklisted })
    });
    return await resp.json();
}

export async function deleteChannel(id) {
    const resp = await fetch(`https://6af2462f42c6561ced392786.mockapi.io/channels/channels/${id}`, {
        method: "DELETE"
    });
    return await resp.json();
}

export async function ajouterChaine(chaine) {
    const resp = await fetch(`https://6af2462f42c6561ced392786.mockapi.io/channels/channels`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chaine)
    });
    if (!resp.ok) {
        throw new Error("Error serveur");
    }
    return await resp.json();
}
