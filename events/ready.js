const consoled = require("consoled.js")
const { ActivityType } = require("discord.js")
const { activity } = require("../config.json")
const bridge = require('../api/GameBridge');

module.exports = {
  config: {
    name: 'ready',
    once: true,
  },
  execute: async (client) => {
    let { getChannelHooks } = require('../index');
    var config = bridge.getConfig();
    var idChannels = config.data.idChannel
    consoled.cyan(`${client.user.username} está ativo em ${client.guilds.cache.size} servidor com o ping ${client.ws.ping + "ms"}!`)
    client.user.setStatus(activity.status)
    client.user.setActivity(activity.presence, { type: ActivityType.Custom, status: activity.status });

    consoled.gray("===== Canal(is) vinculado(s) ====");
    for (const idChannel of idChannels) {
      if (isNumeric(idChannel)) {
        if (client.channels.cache.get(idChannel)) {
          let channel = client.channels.cache.get(idChannel)
          if (getChannelHooks().indexOf(channel) > -1) {
            consoled.green(`Canal vinculado [${channel.guild.name}][${channel.name}][${idChannel}] reconhecido`)
          } else {
            getChannelHooks().push(channel);
            consoled.cyan(`Adicionando canal [${channel.guild.name}][${channel.name}][${idChannel}] para lista de canais vinculados`)
          }
        } else {
          consoled.red(`Canal Vinculado: [${idChannel}] invalido.`)
        }
      }
    }
    consoled.gray("=================================");

    try {
      if (getChannelHooks().length !== 0) {
        bridge.SendChatToDiscord(getChannelHooks());
      }
    } catch (error) {
      console.log(error)
    }
  }
}
function isNumeric(str) {
  if (typeof str != "string") return false
  return !isNaN(str) && !isNaN(parseFloat(str))
}