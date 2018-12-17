# Proxception

## How to run
1. npm install in root directory
1. You will need local certificates to make it run in https mode. I used [this](https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec) article for reference.
1. Once you have your certificate, create a ssl folder in the root of directory and place in the server.crt and server.key.
1. Include a servers.json in the environments folder. An example file is included in the repository.
1. In the nodemon.json file include the environment you are wanting to point to.
1. npm run startServers