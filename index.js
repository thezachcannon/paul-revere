var httpProxy = require("http-proxy");
var fs = require("fs");

let environment = process.env.stage || "development";
let serversJson = fs.readFileSync("./environments/servers.json");
let servers = JSON.parse(serversJson);
let proxies = {};

initServers(servers);

function initServers(servers) {
  if (servers) {
    let serverNames = Object.keys(servers);
    serverNames.forEach(serverName => {
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
    });
  }
}
