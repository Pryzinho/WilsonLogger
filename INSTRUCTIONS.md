**Instalação de Dependências**
1. Instale o [Node.js](https://nodejs.org)
2. Tenha certeza que o [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) está intalado junto com o [Node.js](https://nodejs.org).
3. Dentro da pasta do Bot(pasta principal do projeto onde está localizado o ``index.js``) usando um terminal(Pode ser o cmd.exe do Windows ou então o terminal interno do Visual Studio Code) instale as dependências:
4. npm i discord.js
5. npm i fs
6. npm i dotenv
7. npm i consoled.js (Você pode trocar o consoled.js pelo ``console.log()`` padrão, desde que altere o código onde ele está inserido, a mudança será somente estetica no console do host).

**Configuração do Bot**
1. Altere o nome do arquivo ``.env.example`` para ``.env``.
2. Abra o arquivo ``.env``.
3. Edite o valor ``TOKEN`` para o token do seu bot gerado pela [Discord Developers](https://discord.com/developers/applications)
4. Abra o arquivo ``config.json``
<br>
**Se você não tem interesse em usar o Multi-Shard, deixe apenas o servidor "1".**
<br>
**Para cada servidor que você tiver faça:**
3. Altere ``channelsId`` para o ID do canal em que o bot deve mandar as mensagens da log. Multiplos canais são suportados.
4. Altere ``logPath`` para o caminho que o arquivo de log do seu servidor está localizado.
<br>
**Se o servidor estiver sendo hospedado em Windows:**
5. Baixe o git-bash e tenha certeza que o comando "tail" veio junto com ele.
Opcionalmente você pode baixar outro shell que tenha o comando "tail" e colocar no ``gitBash``. Sugestão: procure por Windows Subsystem for Linux(WSL) no Google.
7. Troque na config.json o valor de ``gitBash`` pelo caminho em que a bin do bash está instalado, normalmente o que está la já funciona.
<br>
**Se o servidor estive sendo hospedado em Linux:**
5. Troque a opção ``shell`` do ChildProcces para um shell padrão do Linux no arquivo ``sendFn.js``, veja a [Documentação](https://nodejs.org/api/child_process.html#child_processspawncommand-args-options).
   
