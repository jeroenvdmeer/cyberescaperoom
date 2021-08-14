const PASSWORDS = [
    "admin",
    "Welkom01!",
    "Zomer2021@",
    "hdBue8ahA",
    "Secret",
    "Flamingo"
]

const ERRORS = {
    INVALID_REQUEST: "Invalid request",
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

        return level && username && password
    }

    return false
}

const isValidUsername = username => username.toLowerCase() === "admin"

const validate = (level, password) => {
    const success = password === PASSWORDS[level - 1]
    const result = { success }

    if (success === false) {
        result["error"] = ERRORS.INCORRECT_PASSWORD
    }

    if (level === 6 && success === false) {
        result["fullDetails"] = ERRORS.LEVEL6
    }

    return JSON.stringify(result)
}

const error = message => JSON.stringify({ error: message })
