const api = async data => {
    return await fetch("http://localhost:7071/api/login", {
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