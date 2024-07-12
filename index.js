const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const consoled = require("consoled.js");

// Essas intents provavelmente nem vão ser usada, altere como preferir.
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});
const { token } = require("./config.json");
client.login(token)
    .catch(err => consoled.bright.red(`Verifique se o TOKEN e INTENTS estão corretas.\n ${err}`) && process.exit(1))

const eventFiles = fs.readdirSync("./events/").filter(file => file.endsWith(".js"))
eventFiles.forEach(event => {
    const ev = require(`./events/${event}`)
    if (ev.config.once) {
        client.once(ev.config.name, (...args) => ev.execute(...args, client))
    }
    else {
        client.on(ev.config.name, (...args) => ev.execute(...args, client))
    }
});

consoled.green(`${eventFiles.length} ${eventFiles.length > 1 ? "eventos" : "evento"} encontrados.`);
consoled.bright.cyan("Serviço inicializado com sucesso.");
