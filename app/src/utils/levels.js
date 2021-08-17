const LEVELS = {
    en: [
            { // Level 1
                intro: "Lets start easy. What's the first combination any hacker would try?",
                hints: [
                    "You can see the username already in the placeholder text when you leave the Username field empty, so you're already halfway there!",
                    "Don't think too hard. If you already know the username (admin), what could be a logical guess for the password?",
                    "Have you tried entering the same password as the username?"
                ],
                success: "Good job! Trying the combination admin/admin is standard check any hacker would start with. This is because many software and devices are shipped with 'admin' as the default value for both the username and the password. Many times administrators forget to change these default values after installation, leaving the system open to unauthorised access."
            },
            { // Level 2
                intro: "Lets get technical. Front-ends of web applications consist of HTML, CSS and JavaScript code. Your web browser has developer tools available to inspect this code. Can you find a hint to the password of this level?",
                hints: [
                    "To open the developer tools of your browser, hit the keyboard shortcut Ctrl + Shift + i (Cmd + Shift + i if you're on macOS).",
                    "The HTML code is a good place to start looking.",
                    "The Elements tab of your web browser's developer tools shows you the HTML code."
                ],
                success: "Awesome! Although it's very unlikely you'll find passwords hidden in HTML code, inspecting front-end code (especially the JavaScript) is likely to provide clues of potential weaknesses and backdoors."
            },
            { // Level 3
                intro: "What other clues can you find in the frontend code?",
                hints: [
                    "In the previous level you found a clue in the HTML code. Have you tried searching the JavaScript code?",
                    "The Network tab of the developer tools has a very powerful Search function to search in all frontend code. You might need to refresh the page before the search works.",
                    "The magnifying glass opens the search function in the Network tab. Try to think of some clever keywords to search for. And carefully analyze the results."
                ],
                success: "Winning! Although finding clues in HTML code is rare, finding clues or even passwords and API keys in JavaScript code is actually not very uncommon. The combination of the developer tools and some creativity can get you a long way.",
                password: "hdBue8ahA"
            },
            { // Level 4
                intro: <img src="/level4/banana.gif" alt="Banana" />,
                hints: [
                    "Have you inspected all parts of the banana?",
                    "Try opening the image in a seperate tab and look for clues.",
                    "Have you tried playing around with the URL of the image?"
                ],
                success: "Super! It's not uncommon to find files and folders unprotected. Just because there's no link pointing to that location, does not mean no one can find it. Guessing common filenames and cleverly using search engines can get you a long way."
            },
            { // Level 5
                intro: "Lets turn our focus to the API. Sometimes it can give us some clues as well.",
                hints: [
                    "Have you noticed anything different in the error messages?",
                    "That weird text between parenthesis look a bit weird. What could it mean?",
                    "If you see anything you want to know more about, where would you look?"
                ],
                success: "Very good! That weird text was actually a hash. An MD5 hash to be precise. MD5 is an old algorithm that unfortunately is still used to 'protect' passwords. But as you found out, it can be easy to find the original values of MD5 hashes."
            },
            { // Level 6
                intro: "Again, lets take a look at the API. Can you find some clues now?",
                hints: [
                    "In the previous level we saw the full details of the error message on our screen. Could it be some information is filtered?",
                    "The Network tab shows all the requests made frontend to the API. Have you inspected all requests already?",
                    "POST requests are sent to 'login' endpoint every time you login. Have you inpected the response carefully?"
                ],
                success: "Boom! It's not uncommon for APIs to share many details. Although they might not all appear on your screen, when you know your way with your web browser's developer tools, you can learn a lot about the API and its backend."
            },
            {// Level 7
                intro: "The grand finale! The password for this level is very strong. Can you find another way to login?",
                hints: [
                    "Only one hint this time. Have you figured out how each time you refresh the page you don't get redirected to level 1?"
                ],
                success: "Top!"
            }
    ]
}

const getLevelTexts = (language, level) => {
    if (LEVELS[language] !== undefined) {
        return LEVELS[language][level - 1]
    }

    return null
}

export default getLevelTexts
