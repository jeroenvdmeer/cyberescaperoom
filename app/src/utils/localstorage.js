import { tokensApi } from "./api" 

const KEY = "tokens"
const STARTING_LEVEL = 1
const NO_TOKENS = "[]"

const getTokens = () => localStorage.getItem(KEY)

const getMaxLevel = async () => {
    const tokens = localStorage.getItem(KEY)

    if (tokens) {
        return await tokensApi({ tokens })
        .then(response => response.json())
        .then(json => json.level)
        .catch(e => clear())
    }

    return STARTING_LEVEL
}

const update = (level, token) => {
    const currentTokens = localStorage.getItem(KEY)

    try {
        let tokens = JSON.parse(currentTokens)
        
        if (!Array.isArray(tokens)) {
            clear()
            update(level, token)
            return null
        }

        tokens[level - 1] = token
        localStorage.setItem(KEY, JSON.stringify(tokens))

    } catch (e) {
        clear()
        update(token)
    }
}

const clear = () => localStorage.setItem(KEY, NO_TOKENS)

const useLocalstorage = () => {
    return { getTokens, getMaxLevel, update, clear }
}

export default useLocalstorage
