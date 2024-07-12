const consoled = require("consoled.js")
const bridge = require('../api/GameBridge');

module.exports = {
  config: {
    name: 'ready',
    once: true,
  },
  execute: async (client) => {
    var config = bridge.getConfig();
    consoled.cyan(`${client.user.username} está ativo em ${client.guilds.cache.size} servidor com o ping ${client.ws.ping + "ms"}!`);
    client.user.setStatus('online');

    Object.values(config.data.servers).forEach(server => {
      let channelsHook = [];
      server.channelsId.forEach(channelId => {
        if (isNumeric(channelId)) {
          if (client.channels.cache.get(channelId)) {
            let discordChannel = client.channels.cache.get(channelId);
            if (!(channelsHook.indexOf(discordChannel) > -1)) {
              channelsHook.push(discordChannel);
            }
            consoled.white(`Server ${server.name}: Canal vinculado - ${discordChannel.name}(${discordChannel.guild.name}).`);
          } else {
            consoled.red(`Server ${server.name}: O canal vinculado "${channelId}" não existe.`);
          }
        }
      });
      if (channelsHook.length !== 0) {
        bridge.SendChatToDiscord(server, channelsHook);
        return;
      }
      consoled.red(`O servidor "${server.name}" não tem nenhum Canal válido.`);
    });
  }
}
function isNumeric(str) {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}