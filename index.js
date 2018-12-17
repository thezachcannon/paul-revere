var httpProxy = require("http-proxy");
var fs = require("fs");
const chalk = require('chalk');
const figlet = require('figlet')
let environment = process.env.NODE_ENV
let serversJson = fs.readFileSync("./environments/servers.json");
let servers = JSON.parse(serversJson);
let proxies = {};

console.clear();
console.log(chalk.cyan(figlet.textSync('Proxception', {
    font: 'Small',
    horizontalLayout: 'default',
    verticalLayout: 'default',
})))

console.log(chalk.yellow(`Pointed to ${environment.toUpperCase()}\n`))
initServers(servers)

function initServers(servers) {
  if (servers) {
    let serverNames = Object.keys(servers);
    serverNames.forEach(serverName => {
      if(servers[serverName].enabled){
        proxies[serverName] = httpProxy
        .createServer({
          ssl: {
            key: fs.readFileSync("./ssl/server.key", "utf8"),
            cert: fs.readFileSync("./ssl/server.crt", "utf8")
          },
          changeOrigin: true,
          target: servers[serverName][environment],
          secure: false
        })
        .listen(servers[serverName].port);
        console.log(`${chalk.cyan(serverName)} : ${chalk.greenBright('RUNNING')} ${chalk.magentaBright(`Port:${servers[serverName].port} => ${servers[serverName][environment]}`)}`)
      }
      else{
        console.log(`${chalk.blueBright(serverName)} : ${chalk.redBright('NOT ENABLED')}`)
      }
    });
  }
}
