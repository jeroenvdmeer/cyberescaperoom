const api = async data => {
    const URL = process.env.REACT_APP_API
        ? process.env.REACT_APP_API
        : "/api/login"

    return await fetch(URL, {
        method: "post",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}

export default api