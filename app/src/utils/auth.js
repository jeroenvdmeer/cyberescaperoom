import { useState, useEffect, createContext, useContext } from "react"
import { loginApi } from "../utils/api"
import useLocalstorage from "./localstorage"

// https://reactrouter.com/web/example/auth-workflow
// https://usehooks.com/useAuth/

const useProvideAuth = () => {
    const [maxLevel, setMaxLevel] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const localstorage = useLocalstorage()

    useEffect(() => {
        const getMaxLevel = async () => {
            const max = await localstorage.getMaxLevel()
            setMaxLevel(max)
            setIsLoading(false)
        }
        getMaxLevel()
    }, [localstorage])

    const login = (username, password, level) =>
        loginApi({ username, password, level, tokens: localstorage.getTokens() })
        .then(response => response.json())
        .then(json => {
            json.success && localstorage.update(level, json.token)
            setMaxLevel(level + 1)
            return json
        })

    return { maxLevel, login, isLoading }
}

const authContext = createContext()

export const AuthProvider = ({ children }) => {
    const auth = useProvideAuth()

    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => useContext(authContext)
