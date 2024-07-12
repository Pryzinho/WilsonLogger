const { spawn } = require('node:child_process');
module.exports = {
    /*
    JSON com as configurações do serviço.
    */
    getConfig: function () {
        return require("../config.json");
    },
    /*
    Local em que o arquivo de log do servidor está localizado.
    */
    getLogPath: function () {
        return this.getConfig().data.pathFile.logPath;
    },
    /*
     Em um sistema Windows, eu só consegui pensar em utilizar um tail interno do GitBash.
     Por favor leia mais sobre ChildProcess pra entender o motivo de utilização do tail e gitbash.
    */
    getGitBashPath: function(){
        return this.getConfig().data.pathFile.gitBash;
    },
    // Só deve ser chamado uma única vez.
    SendChatToDiscord: function (channelHooks) {
        let ls = spawn('tail', [`-f "${this.getLogPath()}"`], {shell: this.getGitBashPath() });
        ls.on('error', (err) => {
            console.error('Erro ao criar o processo: ', err);
        });
        ls.stdout.on('data', (data) => {
            let rows = data.toString().split('\n');
            rows.forEach(row => {
                // Verifica se é uma linha de fato válida e com conteúdo.
                if (row.trim() !== '' && row.trim() !== ' ') {
                    // Itera com todos os canais do discord vincuados e manda a linha da log pro estudo.
                    // channelHook é um DiscordChannel.
                    channelHooks.forEach(channelHook => {
                        /* 
                        Manda a mensagem entre `` impedindo o Discord de formatar os KUID
                        para itálico. (Exemplo: KU_ABC123_)
                        */
                        channelHook.send("``" + row + "``");
                    });
                }
            });
        });

    },
}