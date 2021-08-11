module.exports = async (context, req) => {
    const result = {
        status: 500,
        body: ""
    }

    if (!isValidRequest(req)) {
        result.body = error("Invalid request")
    }

    try {
        const { level, username, password } = req.body
        let validator = null

        switch (level) {
            case 1: validator = validateLevel1; break
            case 2: validator = validateLevel2; break
            case 3: validator = validateLevel3; break
        }

        if (validator !== null) {
            const success = validator(
                username.toLowerCase(),
                password
            )

            result.status = 200
            result.body = JSON.stringify({ success })
        }
    }
    catch (e) {
        result.body = error(e)
    }

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

const error = message => JSON.stringify({ error: message })

const validateLevel1 = (username, password) => {
    return username === "admin" && password === "admin"
}

const validateLevel2 = (username, password) => {
    return username === "admin" && password === "Welkom01!"
}

const validateLevel3 = (username, password) => {
    return username === "admin" && password === "Zomer2021@"
}
