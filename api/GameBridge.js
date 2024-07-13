const { spawn } = require('node:child_process');
const consoled = require("consoled.js");
module.exports = {
    /**
    * JSON com as configurações do serviço.
    * @returns {JSON}
    */
    getConfig: function () {
        return require("../config.json");
    },
    /*
     Em um sistema Windows, eu só consegui pensar em utilizar um tail interno do GitBash.
     Por favor leia mais sobre ChildProcess pra entender o motivo de utilização do tail e gitbash.
    */
    getGitBashPath: function () {
        return this.getConfig().data.gitBash;
    },
    // Só deve ser chamado uma única vez por servidor.
    /**
     * 
     * @param {JSON} server JSON contendo o servidor atual, propiedades: {name, logPath, channelsId }
     * @param {TextChannel[]} channelHooks Lista de DiscordChannel.
     */
    SendChatToDiscord: function (server, channelHooks) {
        let logPath = String(server.logPath);
        if (!logPath || logPath.trim() == '' || logPath.trim() == ' ') {
            console.error(`Server ${server.name}: logPath está vazio ou não existe.`);
            return;
        }
        // Comando "tail" originalmente do Linux, nesse caso é um usado uma shell customizada que possui o tail (GitBash)
        // É provavel que tenha uma opção melhor de shell ou comando.
        let readerProcess = spawn('tail', [`-f "${server.logPath}"`], { shell: this.getGitBashPath() });
        consoled.cyan(`${server.name}: Escutando todas as mensagens...`);
        readerProcess.on('error', (err) => {
            console.error('Erro ao criar o processo: ', err);
        });
        readerProcess.stdout.on('data', (data) => {
            let rows = data.toString().split('\n');
            rows.forEach(row => {
                // Verifica se é uma linha de fato válida e com conteúdo.
                if (row.trim() !== '' && row.trim() !== ' ') {
                    // Itera com todos os canais do discord vinculados ao servidor e manda a linha da log pro canal.
                    // channelHook é um DiscordChannel.
                    channelHooks.forEach(channelHook => {
                        /* 
                        Manda a mensagem entre `` impedindo o Discord de formatar os KUID que terminam com _ para itálico
                        (Exemplo: KU_ABC123_).
                        */
                        channelHook.send(`\`${row}\``);
                        // Outra alternativa: channelHook.send("``" + row + "``");
                    });
                }
            });
        });

    },
}