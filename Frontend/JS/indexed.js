const token = localStorage.getItem('token')

async function saveToken(token) {
    const request = indexedDB.open("tokenDB", 1);

    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const store = db.createObjectStore("tokens", { keyPath: "id" });
        store.transaction.oncomplete = () => {
            const tokenStore = db.transaction("tokens", "readwrite").objectStore("tokens");
            tokenStore.add({ id: "jwt_token", token: token });
        };
    };

    request.onsuccess = (event) => {
        const db = event.target.result;
        const tokenStore = db.transaction("tokens", "readwrite").objectStore("tokens");
        tokenStore.put({ id: "jwt_token", token: token });
    };
}
saveToken(token)