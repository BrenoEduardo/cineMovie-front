# Mvp-thinkAI

MVP cineMovie em angular e nodejs

## Demonstração

Acesse a [demo ao vivo](https://cine-movie-front.vercel.app) para experimentar o projeto.
Usuário admin => admin@admin.com
Senha admin => admin

Usuário cliente => client@client.com
Senha cliente => client

## Visão Geral

Este projeto foi desenvolvido com o intuito de demonstrar minhas habilidades em Angular, Node.js e MongoDB. Ele consiste em um mvp de filmes, onde na parte do cliente
você pode filtra-los por genêro, atores, diretos ou o proprio nome do filme, logo a baixo tem um carrosel de filmes em ordem de:

Diretores em comum
Atores em comum
Genero em comum

Isso tudo limitado a 10 filmes

## Back-end

O repositório do back end por ser encontrado [aqui](https://github.com/BrenoEduardo/cineMovie-back). Lá tem outra informações no readme.MD sobre a integração

## Como Rodar

Para executar o projeto localmente, siga os passos abaixo:

1. Clone o repositório para sua máquina local:

    ```bash
    git clone https://github.com/BrenoEduardo/cineMovie-front.git
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Execute o projeto localmente.:

    ```bash
    npm run start
    ```
4. Execute o projeto apontando para prod.:

    ```bash
    npm run star:prod
    ```
## Decisões sobre o projeto

Utilizei Angular e node por conta de estar mais familiarizado, e como o prazo 11/03/2024, creio que seria as tecnlogias que eu mais iria conseguir 
desenvolver funcionalidades, tive alguns blocks com firebase e a parte do carrosel, porém pesquisando bastante consegui resolver.
O carrosel eu queria ter feito ele mais fluido, porém não quis gastar muito tempo nele, dito que tinha outras funcionalidades importantes para
ser desenvolvidas
Fiz autenticação com rotas, para ver se o usuario e admin ou não, autenticação jwt, sempre que cada requisição e feita ele passa por um interceptor
que verificar se o usuario esta logado, e se o usuario logado pode fazer aquele tipo de requisição, autenticação por rotas, verificando se aquele tipo
de usuario pode ir para aquele rota, creio que a parte de segurança ficou boa.
Fiz um soft delete para os usuario, que no caso eles inativam o usuario e nao deletam, caso queiram reativar a conta, basta clicar para editar o usuario
O que eu pequei nesse projeto foi, na minha visão, o layout, creio que poderia ter feito melhor, porém fiquei focado nas funcionalidades que não coloquei
a devida atenção nisso

Melhorias que eu faria nesse projeto: Layout, creio que existe layouts melhores, a parte do carrosel, tentei fazer algo mais fluido, a parte do filtro por
diretor, genero e ator, fiz ele na parte do front por ter mais facilidade de manipular arrays(quando trabalhei apenas com front os back-end não mandava os dados
filtrados, aprendi muito na marra a fazer filtro no front e peguei facilidade), porém o certo era ter feito no back-end

Caso não tenham gostado do projeto e eu não seja selecionado para o preenchimento da vaga, só peço que me deem alguns feedback sobre o que eu poderia ter feito
de melhor nesse projeto, tirando obviamente as melhorias que coloquei a cima

Desde já agradeço vocês da thinkAI, aprendi bastante coisa desenvolvendo isso
