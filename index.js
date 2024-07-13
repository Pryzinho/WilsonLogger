const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const consoled = require("consoled.js");
require("dotenv").config();

// Essas intents provavelmente nem vão ser usada, altere como preferir.
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});
client.login(process.env.TOKEN)
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
consoled.bright.cyan("Inicializando serviços...");
