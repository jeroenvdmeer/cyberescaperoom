const { getMaxLevel } = require("../Shared/tokens")

module.exports = async (context, req) => {
    const result = {
        status: 500,
        body: ""
    }

    const { tokens } = req.body

    if (tokens !== undefined) {
        const level = Number(getMaxLevel(tokens))

        if (level > 0) {
            result.status = 200
            result.body = JSON.stringify({ level })
        }
    }

    return result
}
