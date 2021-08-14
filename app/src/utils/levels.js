const levels = {
    en: [
            {
                intro: "Lets start easy. What's the first combination any hacker would try?",
                hints: [
                    "You can see the username already in the placeholder text when you leave the Username field empty, so you're already halfway there!",
                    "Don't think too hard. If you already know the username (admin), what could be a logical guess for the password?",
                    "Have you tried entering the same password as the username?"
                ],
                success: "Good job! Trying the combination admin/admin is standard check any hacker would start with. This is because many software and devices are shipped with 'admin' as the default value for both the username and the password. Many times administrators forget to change these default values after installation, leaving the system open to unauthorised access."
            },
            {
                intro: "Lets get technical. ",
                hints: [

                ],
                success: "Top!"
            },
            {
                intro: <img src="/level3/banana.gif" alt="Banana" />,
                success: "Top!"
            },
            {
                intro: "",
                success: "Top!",
                password: "hdBue8ahA"
            },
            {
                intro: "",
                success: "Top!"
            },
            {
                intro: "",
                success: "Top!"
            }
    ]
}

const getLevel = (language, level) => {
    if (levels[language] !== undefined) {
        return levels[language][level - 1]
    }

    return null
}

export default getLevel
