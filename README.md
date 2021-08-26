# Cyber escape room
The objective of this project is to provide a playful introduction to web application vulnerabilities in the [OWASP Top 10](https://owasp.org/www-project-top-ten/) while relying only on developer tools offered by modern web browsers. This makes the cyber escape room accessible for anyone who is interested web application vulnerabilities without the need to use specialized tools, such as intercepting proxies.

## Demo
The cyber escape room can be taken for a test drive on https://escape.jero.net/.

## Technical background
This application is designed to run on [Azure Static Web Apps](https://azure.microsoft.com/en-us/services/app-service/static/). The front-end application is available in the `/app` folder and is bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The API is available in the `/api` folder and available as an [Azure Functions](https://azure.microsoft.com/en-us/services/functions/) app. When navigating in your computer's command line interface to the two folders and running `yarn start` will start the front-end and API.