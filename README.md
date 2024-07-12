**Feel free to translate, collaborate, or fork the code as long as you adhere to the current license.
The project is maintained in Portuguese for ease of use, but English support can be provided if there is interest from someone for the service.
<br>
 Make sure to take a look at [TO-DO List](TO-DO.md).**

**Ultima versão testada e funcionando:**
<br>
``"consoled.js": "^1.0.4"``<br>
``"discord.js": "^14.14.1"``<br>
``"dotenv": "^16.4.5"``<br>
``"fs": "^0.0.1-security"``<br>
Caso não consiga em uma versão mais atualizada, tente usar essas versões no ``package.json``

Algumas práticas e estruturamento de código vão mudar conforme o aprimoramento do serviço, sugiro verificar commits antigos para entender o processo de criação do serviço.

Um Bot para o discord feito em Node.js, com a função de ler **logs** de um servidor de Don't Starve Together e posta em um ou mais canal do Discord para ter registros do que os jogadores fazem, dizem, entre outras coisas relacionadas e não relacionadas aos jogadores.

Atualmente só Windows é suportado, se deseja utilizar linux, por favor troque a shell do ChildProccess para uma shell padrão do linux, nesse caso o comando "tail" que é utilizado no ChildProcces que está disponivel no Windows via GitBash, provavelmente já estara integrado no terminal padrão do Linux.
Esse serviço tem a intenção de **reforçar a segurança** de seu servidor, por isso, recomendo o uso do mod ``Wolly Logger Reborn`` está na Workshop do Don't Starve Together.

Manual de instalações em [INSTRUCTIONS](https://github.com/Pryzinho/WilsonLog/blob/main/INSTRUCTIONS.md).
