# Cyber escape room
The objective of this project is to provide a playful introduction to web application vulnerabilities in the [OWASP Top 10](https://owasp.org/www-project-top-ten/) while relying only on developer tools offered by modern web browsers. This makes the cyber escape room accessible for anyone who is interested web application vulnerabilities without the need to use specialized tools, such as intercepting proxies.

## Vulnerabilities
The cyber escape room contains several challenges that trigger users to exploit vulnerabilities in both the front-end web application and the backend APIs. As each challenge can be solved using developer tools of modern web browsers, the challenges rely heavily on using clues found in the front-end code and API responses. After completing all levels, users have experienced exploiting vulnerabilities in the following categories:

* [A2:2017-Broken Authentication](https://owasp.org/www-project-top-ten/2017/A2_2017-Broken_Authentication)
* [A3:2017-Sensitive Data Exposure](https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure)
* [A5:2017-Broken Access Control](https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control)
* [A6:2017-Security Misconfiguration](https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration)
* [A8:2017-Insecure Deserialization](https://owasp.org/www-project-top-ten/2017/A8_2017-Insecure_Deserialization)

## Demo
The cyber escape room can be taken for a test drive on https://escape.jero.net/.

## Technical background
This application is designed to run on [Azure Static Web Apps](https://azure.microsoft.com/en-us/services/app-service/static/). The front-end application is available in the `/app` folder and is bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and built using [Chakra UI](https://chakra-ui.com/). The API is available in the `/api` folder and available as an [Azure Functions](https://azure.microsoft.com/en-us/services/functions/) app.

## Running locally
First, ensure your development environment has [git](https://git-scm.com/downloads) installed and is setup to meet [the requirements for running a Create React App project](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) by installing [Node with npm](https://nodejs.org/).

Next, as this application is built for Azure Static Web Apps, it's best to install the [Azure Static Web Apps CLI](https://github.com/Azure/static-web-apps-cli) together with [Azure Functions Core Tools](https://github.com/Azure/static-web-apps-cli#serve-both-the-static-app-and-api):

```bash
npm install -g @azure/static-web-apps-cli
npm install -g azure-functions-core-tools@3 --unsafe-perm true
```

Now that your development environment is setup, create a local copy of the code and run the development server:

```bash
# Create a local copy of the code in the folder "cyberescaperoom":
git clone https://github.com/jeroenvdmeer/cyberescaperoom.git

# Initiate the Azure Functions app to create a local.settings.json file:
func init ./api --worker-runtime node

# Run the development servers:
swa start http://localhost:3000 --run "yarn start" --app-location ./app --api ./api
```

*Note:* Once the development servers have started, the development server running on http://localhost:3000 will likely be opened automatically in your web browser. Use this server for your tests instead of http://localhost:4280. The latter server emulates Azure Static Web Apps and loads the Content Security Policy (CSP) configured in `/app/staticwebapp.config.json`. This CSP designed to protect the production builds which run both the front-end and the API on the same host on port 443. As your development environment will run the API on a different port than your front-end, your web browser will fail to call the API when using http://localhost:4280. The development server running on http://localhost:3000 is unaware of the CSP, so use this for your tests.