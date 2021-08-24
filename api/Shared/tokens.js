const TOKENS = [
    "439257862852ca9432c025fee7bc18cc",
    "c1c29cea1b2f372186c45f13a164f31d",
    "e6d3df7e686cbc1d72d3bb226f6808b9",
    "05f952d22c05994b84147bc5841244d7",
    "6da0e988fc4f4c11446b68eee440e714",
    "745ca30961f76181c5d100b3b4bd902f", // level6
    "a9ad04871db8d352466b5e5b6f234fbe"  // level7
]

const getToken = level => TOKENS[level - 1]

const getMaxLevel = tokens => {
    let maxLevel = 1

    try {
        const tokensArray = JSON.parse(tokens)

        if (Array.isArray(tokensArray)) {
            let tokensMatch = true
            let x = 0

            while (x < tokensArray.length && tokensMatch) {
                tokensMatch = tokensArray[x] === TOKENS[x]
                x++
            }

            if (tokensMatch) {
                maxLevel = tokensArray.length + 1
            }
        }
    } catch (e) {}

    return maxLevel
}

module.exports = {
    getToken,
    getMaxLevel
}
