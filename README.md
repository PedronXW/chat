# IXCSOFT - TESTE

Desenvolvedor: Pedro de Almeida Natali

Vaga: Desenvolvedor FullStack NodeJS

## Enunciado

O objetivo do teste é construir uma aplicação web (NodeJS Express). O
sistema deve conter uma tela de login (front em ReactJS/NextJS) para que
os usuários cadastrados acessem a aplicação (o sistema deve possuir a
funcionalidade de cadastro de usuários). A funcionalidade macro da
aplicação web deverá ser um Chat, onde deve ser possibilitada a troca de
mensagens entre os usuários cadastrados (clients) em tempo real (utilize
socket.io). Ou seja, um usuário logado poderá conversar com qualquer
outro usuário cadastrado. Se dois usuários estiverem logados ao mesmo
tempo, as mensagens devem ser exibidas em tempo real, bem como a
entrada (login) de novos usuários na plataforma (manter a lista de usuários
atualizada).

Outra funcionalidade relevante seria manter o status (online e offline) dos
usuários visíveis e atualizados em tempo real conforme as ações de login
e logout dos mesmos. Além disso, seria interessante possuir algum
formato de notificação (também em tempo real) para auxiliar o usuário na
informação/visualização de novas mensagens recebidas e/ou não lidas.

A plataforma deve realizar o armazenamento das mensagens em banco de
dados para garantir a durabilidade das informações (banco MongoDB).

Um ponto extra seria utilizar a biblioteca cluster (nativa) para rodar a
aplicação Node em cluster (nível de processo). Outro ponto, seria fazer a
utilização de Docker para rodar a aplicação.

O projeto deve ser entregue no gitlab ou github, contendo um arquivo de
Readme com as informações/documentações necessárias

## Descrição Técnica 

O Projeto consiste em duas aplicações complementares, uma backend e outra frontend, ambas escritas em NodeJS.

Todo o sistema é gerenciado pelo arquivo docker-compose.yml na raiz do projeto, nele todos os ambientes node são criados.

### Backend

A aplicação backend utiliza o framework Express para tornar possível e gerenciar a interação HTTP entre ambas as aplicações, 
outro serviço utilizado para comunicação entre os sistemas é a biblioteca Socket.IO, que implementa um serviço de websocket e torna possível a comunicação em tempo real, 
utilizada para a troca de mensagens instantâneas entre os usuários.

Outra ferramenta utilizada foi o MongoDB, com a finalidade de armazenar os dados, tanto de contas dos usuários quanto manter as mensagens trocadas por eles.

O projeto é implementado utilizado alguns design patterns, tais quais S.O.L.I.D, e clean architecture, além de ser modelado utilizando técnicas de DDD e TDD.

Os testes foram desenvolvidos utilizando a biblioteca Jest.

### Frontend

A aplicação frontend foi escrita utilizando a biblioteca React, conjuntamente com a biblioteca de estilização TailwindCSS.

Ela emprega o uso de ContextAPI para gerenciamento dos dados de Usuários, Mensagens e Socket.

Para implementação dos formulários utiliza-se a biblioteca react-hook-form, assim como a biblioteca zod para validação e criação de tipagem para os dados.

As notificações são empregadas utilizando a biblioteca notistack.


## Inicializando as aplicações

Para inicializar as aplicações é necessário entrar na pasta de cada uma das aplicações e instalar as dependencias utilizando npm: "npm i"

Após a instalação das dependências retorne à página raiz do projeto e inicie os containers com: "docker compose up -d" ou "docker-compose up -d" dependendo da versão que você utiliza.

### Backend

Com os containers iniciados entramos em cada um, no caso do backend o comando é "docker compose exec ixcsoft-back sh".

Dentro do ambiente das aplicações podemos interagir de diversas formas, no caso do backend, o comando "npm run test" executa todos os testes existentes no projeto, para executar a aplicação em desenvolvimento o comando é "npm run start:dev", já para buildar o projeto é "npm run build" e para startar em produção "npm run start".

### Frontend

No caso do frontend o comando para entrar no container é "docker compose exec ixcsoft-front sh"

Dentro do ambiente de podemos usar o comando "npm run dev" para subir a aplicação.


## Descrição Visual do Frontend

### Tela Login

A primeira página disponível ao entrar na aplicação é a página de login, nela é possível passar para a tela de cadastro, assim como, quando os campos de email e senha forem preenchidos com dados válidos entrar na aplicação.

### Tela Cadastro

Para realizar o cadastro na aplicação três dados são necessários, nome, email e senha. Para o nome a validação exige somente que tenha mais do que dois caracteres, no caso do email, que seja um email válido e no caso da senha que tenha mais do que 6 caracteres.

### Tela Home

No canto esquerdo da tela encontra-se a lista dos usuários, nela encontramos o nome, o id e o status de cada usuário cadastrado, o status é representado pelo circulo no canto direito da lista, quando o usuário está online ela estará verde e quando estiver offline estará vermelha.

Já no canto direito está o chat da aplicação, onde está visivel as mensagens enviadas e recebidas.