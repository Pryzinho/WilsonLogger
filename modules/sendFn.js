const { spawn } = require('node:child_process');
module.exports = {
    getConfig: function () {
        return require("../config.json");
    },
    getLogPath: function () {
        return this.getConfig().data.pathFile.logPath;
    },
    getGitBashPath: function(){
        return this.getConfig().data.pathFile.gitBash;
    },
    // So deve ser chamado uma única vez já que em teoria cria algo tipo um runnable.
    SendChatToDiscord: function (channelHooks) {
        let ls = spawn('tail', [`-f "${this.getLogPath()}"`], {shell: this.getGitBashPath() });
        ls.on('error', (err) => {
            console.error('Erro ao criar o processo:', err);
        });
        ls.stdout.on('data', (data) => {
            let rows = data.toString().split('\n');
            rows.forEach(row => {
                if (row.trim() !== '' && row.trim() !== ' ') {
                    // Manda pro discord em formato de linha.
                    channelHooks.forEach(channelHook => {
                        channelHook.send("``" + row + "``");
                    });
                }
            });
        });

    },
}