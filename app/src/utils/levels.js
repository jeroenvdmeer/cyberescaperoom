const levels = {
    nl: [
            {
                intro: "Welkom! We beginnen makkelijk.",
                hints: [

                ],
                success: "Top!"
            },
            {
                intro: "Check broncode.",
                hints: [

                ],
                success: "Top!"
            },
            {
                intro: <img src="/level3/banana.gif" alt="Banana" />,
                success: "Top!"
            }
    ]
}

const getLevel = (language, level) => {
    return levels[language][level - 1]
}

export default getLevel
