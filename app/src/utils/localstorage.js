import { tokensApi } from "./api" 

const KEY = "tokens"
const NO_TOKENS = "[]"

export const getTokens = () => localStorage.getItem(KEY)

export const getLevelFromLocalStorage = async () => {
    const tokens = localStorage.getItem(KEY)
    let level = 1

    await tokensApi({ tokens })
    .then(response => response.json())
    .then(json => level = json.level)
    .catch(e => clearLocalStorage())

    return level
}

export const updateLocalStorage = token => {
    const currentTokens = localStorage.getItem(KEY)

    try {
        const tokens = JSON.parse(currentTokens)
        
        if (Array.isArray(tokens)) {
            tokens.push(token)
            localStorage.setItem(KEY, JSON.stringify(tokens))

        } else {
            clearLocalStorage()
        }

    } catch (e) {
        clearLocalStorage()
    }
}

export const clearLocalStorage = () => localStorage.setItem(KEY, NO_TOKENS)
