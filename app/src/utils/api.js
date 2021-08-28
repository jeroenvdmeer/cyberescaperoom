const api = (url, data) => {
    const URL = Number(window.location.port) === 3000
        ? `//${window.location.hostname}:7071${url}`
        : url

    return fetch(URL, {
        method: "post",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}

export const loginApi = data => api("/api/login", data)

export const tokensApi = data => api("/api/tokens", data)
