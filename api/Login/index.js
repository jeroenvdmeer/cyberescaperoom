const { getToken, getLevel } = require("../Shared/tokens.js")

const PASSWORDS = [
    "admin",
    "Welcome01!",
    "hdBue8ahA",
    "Summer2021@",
    "Secret",
    "Flamingo",
    "t[6n.>BQ4ayS9w)#B+U!a87z)-E6:{4ZJh+'frj@&\_]kxc='A_BGy.JnR/8U/@6"
]

const ERRORS = {
    INVALID_REQUEST: "Invalid request",
    INVALID_TOKENS: "Invalid tokens",
    INVALID_USERNAME: "Invalid username",
    INCORRECT_PASSWORD: "Incorrect password",
    LEVEL6: "User-provided password does not match stored password for user 'admin' (1c55b68e7477a0e0ff47c3b0ba23c0d6)"
}

module.exports = async (context, req) => {
    const result = {
        status: 500,
        body: ""
    }

    const { level, username, password } = req.body

    if (!isValidRequest(req)) {
        result.body = error(ERRORS.INVALID_REQUEST)
        return result
    }

    if (!isValidUsername(username)) {
        result.body = error(ERRORS.INVALID_USERNAME)
        return result
    }

    result.status = 200
    result.body = validate(level, password)

    return result
}

const isValidRequest = req => {
    if (req.body) {
        const level = (req.body.level && req.body.level > 0 && req.body.level < 8)
        const username = (req.body.username && req.body.username.length > 0)
        const password = (req.body.password && req.body.password.length > 0)
        const tokens = level && req.body.tokens
            && getLevel(req.body.tokens) === req.body.level

        return level && username && password && tokens
    }

    return false
}

const isValidUsername = username => username.toLowerCase() === "admin"

const validate = (level, password) => {
    const success = password === PASSWORDS[level - 1]
    const result = { success }

    if (success) {
        result["token"] = getToken(level)
    } else {
        result["error"] = ERRORS.INCORRECT_PASSWORD
    }

    if (level === 6 && success === false) {
        result["fullDetails"] = ERRORS.LEVEL6
    }

    return JSON.stringify(result)
}

const error = message => JSON.stringify({ error: message })
