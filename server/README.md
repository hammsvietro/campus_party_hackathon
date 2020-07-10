# NUTRE - Backend

Nesse diretório se encontra o código do backend da aplicação, desenvolvido com Node.JS utilizando Express como framework web, Knex como query builder e sqlite3 como banco de dados.

## Instalação e execução
Após fazer o download ou clonar esse repositório, navegue até este diretório com o terminal de sua escolha.

Instale as dependências do projeto com ```npm install``` ou ```yarn install```.

Para saber em que porta e onde está rodando o Express depende de um arquivo ```.env``` configurado manualmente. Para fazer isso, basta criar uma cópia do arquivo ```sample.env``` e completar a penúltima linha ```SV_PORT=<port>``` com o número da porta que o servidor irá ouvir. O padrão é ```3333```. Já a última linha deve ser completada com ```SV_ADDRESS=localhost``` para rodá-lo em sua máquina local.

Após isso, apenas rode um ```npm start```, ```yarn start``` ou ainda execute o arquivo ```server.js``` diretamente usando o ```node```.

## Arquitetura e Uso
O servidor do Express utiliza-se das rotas definidas no arquivo ```routes.js``` para decidir para onde irá cada requisição, baseado em sua URL. Para cada uma, uma diferente função de *callback* dos controladores é invocada. São dois controladores, ```EstablishmentController.js``` e ```NgoController.js```, que se encontram na pasta ```controllers```.<br><br>
Por exemplo, quando o usuário cria uma solicitação para a aplicação usando a rota ```/ngo/3``` o Express chama a função de ```ngoController.get``` do ```ngoController```. Esta recebe como parâmetro a requisição e usa o ```id``` dos parâmetros da *query* para buscar no banco de dados (usando o *Knex*) a ONG com aquela ```id```. Após isso, a função usa o objeto resposta também recebido como parâmetro para responder para o front-end os dados referentes àquela ONG.<br><br>
As outras rotas funcionam de forma semelhante. Para testagem das mesmas recomenda-se utilizar o software *Insomnia*, que foi o utilizado durante o desenvolvimento dessa aplicação.