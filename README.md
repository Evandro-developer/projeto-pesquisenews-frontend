# Projeto PesquiseNews Frontend

Este projeto é a parte frontend do aplicativo [PesquiseNews](https://pesquisenews.com.br), que oferece uma solução completa para buscar e gerenciar notícias em tempo real.

## Explore o [PesquiseNews](https://pesquisenews.com.br)

O [PesquiseNews](https://pesquisenews.com.br) é uma plataforma moderna que oferece a você acesso em tempo real a notícias de fontes confiáveis. Abaixo, você encontrará informações sobre o frontend, suas funcionalidades e como configurá-lo.

Para obter informações sobre o backend do [PesquiseNews](https://pesquisenews.com.br), consulte o [código fonte do projeto-pesquisenews-backend](https://github.com/Evandro-developer/projeto-pesquisenews-backend).

## Sumário:
1. [Descrição do Projeto](#descrição-do-projeto)
2. [Funcionalidades](#funcionalidades)
3. [Responsividade (UX)](#responsividade-(ux))
4. [Validação em Tempo Real de Campos (UX)](#validação-em-tempo-real-de-campos-(ux))
5. [Suavidade na Abertura e Fechamento dos Popups (UX)](#suavidade-na-abertura-e-fechamento-dos-popups-(ux))
6. [Componentização do Código](#componentização-do-código)
7. [Tecnologias Utilizadas](#tecnologias-utilizadas)
8. [Estrutura de Pastas](#estrutura-de-pastas)
9. [Instalação e Execução](#instalação-e-execução)
10. [Configuração](#configuração)
11. [Desenvolvido por](#desenvolvido-por)
12. [Código-Fonte](#código-fonte)
13. [Licença](#licença)
14. [Agradecimentos](#agradecimentos)

## Descrição do Projeto

O frontend do [PesquiseNews](https://pesquisenews.com.br) é a interface do usuário que o permite pesquisar e visualizar notícias em tempo real. Ele se integra ao backend para fornecer uma experiência completa. Este frontend foi desenvolvido com tecnologias modernas para criar uma experiência de usuário agradável e intuitiva.

## Funcionalidades

- Pesquisa de Notícias em Tempo Real: Os usuários podem pesquisar notícias de fontes confiáveis usando palavras-chave.
- Visualização de Notícias: Os resultados da pesquisa são exibidos de forma organizada para fácil leitura.
- Gerenciamento de Artigos: Os usuários autenticados podem salvar artigos em suas listas de favoritos.
- Autenticação de Usuários: Os usuários podem se registrar e fazer login para acessar recursos adicionais.
- Proteção de Rotas: Algumas funcionalidades são protegidas e só podem ser acessadas por usuários autenticados.

## Responsividade (UX)

O [PesquiseNews](https://pesquisenews.com.br) é projetado para oferecer uma experiência de usuário consistente em diferentes faixas de resolução:

- **Dispositivos móveis (320px a 584px)**: O aplicativo é otimizado para smartphones e dispositivos móveis, proporcionando uma experiência de usuário intuitiva e fácil de usar em telas menores.

- **Dispositivos móveis (585px a 768px)**: Continuando a otimização para smartphones e dispositivos móveis, essa faixa de resolução oferece uma experiência de usuário suave em telas um pouco maiores.

- **Tablets (769px a 1440px)**: Em tablets, o [PesquiseNews](https://pesquisenews.com.br) mantém a usabilidade e a disposição dos elementos para garantir uma experiência confortável de navegação.

- **Desktops e laptops (769px a 1440px)**: Para telas maiores, o aplicativo aproveita o espaço adicional para exibir mais informações, mantendo a navegabilidade e o design coesos.

Independentemente do dispositivo que você está usando, o [PesquiseNews](https://pesquisenews.com.br) é projetado para fornecer acesso fácil às notícias em tempo real e garantir que você possa desfrutar de todas as funcionalidades de maneira eficiente.

O [PesquiseNews](https://pesquisenews.com.br) está comprometido em manter a responsividade do aplicativo e garantir uma experiência de usuário excepcional em todas as resoluções de tela.

## Validação em Tempo Real de Campos (UX)

No [PesquiseNews](https://pesquisenews.com.br), nos esforçamos para tornar a experiência de nossos usuários o mais intuitiva e livre de erros possível. Uma maneira pela qual alcançamos isso é através da validação em tempo real de campos de preenchimento em várias partes do aplicativo.

### Cadastro e Login

#### Campos Obrigatórios

Ao realizar o cadastro ou fazer login, os campos obrigatórios, como nome de usuário, senha e endereço de e-mail, são validados à medida que o usuário os preenche. Isso significa que, se o usuário deixar um campo em branco ou inserir informações inválidas, ele receberá feedback imediato na forma de mensagens de erro claras e contextualmente relevantes. Isso ajuda a evitar que o usuário prossiga com informações incorretas e reduz os erros de entrada.

### Pesquisa e Inserção de Dados

#### Pesquisa em Tempo Real

Durante a pesquisa de notícias ou a inserção de dados em qualquer parte do aplicativo, a validação em tempo real é aplicada para garantir que os critérios de pesquisa ou os dados inseridos sejam válidos e relevantes. À medida que o usuário digita palavras-chave ou informações, o sistema fornece sugestões ou verificações para ajudar o usuário a refinar sua consulta ou inserção de dados.

### Feedback Amigável

Entendemos que a validação em tempo real pode ser uma ferramenta poderosa, mas também garantimos que o feedback fornecido seja amigável e informativo. Nossas mensagens de erro são projetadas para orientar o usuário na correção do problema e continuar com a tarefa de forma tranquila.

Valorizamos a importância de tornar a interação com o [PesquiseNews](https://pesquisenews.com.br) o mais suave possível e acreditamos que a validação em tempo real dos campos de preenchimento é uma maneira eficaz de alcançar esse objetivo.

## Suavidade na Abertura e Fechamento dos Popups (UX)

No [PesquiseNews](https://pesquisenews.com.br), valorizamos a experiência do usuário em todos os aspectos do design. Uma parte essencial disso é a suavidade na abertura e fechamento dos popups, que desempenha um papel crucial na interação dos usuários com nosso aplicativo.

### Abertura Suave

Quando os usuários interagem com elementos que acionam popups, como detalhes de uma notícia ou opções de configuração, garantimos que a transição para o popup seja suave e não abrupta. Isso é alcançado através de animações cuidadosamente projetadas que proporcionam uma transição visualmente agradável, criando uma sensação de continuidade e controle.

### Fechamento Amigável

Tão importante quanto a abertura é o fechamento dos popups. Quando os usuários decidem fechar um popup, a transição é projetada para ser natural e intuitiva. Os elementos de fechamento são facilmente acessíveis, e as animações são usadas para guiar o usuário de volta à tela principal de forma amigável.

No [PesquiseNews](https://pesquisenews.com.br), acreditamos que os detalhes fazem a diferença, e a suavidade na interação com popups é apenas um exemplo de como nos esforçamos para criar um ambiente amigável e intuitivo para todos os nossos usuários.

## Componentização do Código

No [PesquiseNews](https://pesquisenews.com.br), adotamos uma abordagem de componentização rigorosa no desenvolvimento do frontend. Isso significa que o código do aplicativo é dividido em componentes reutilizáveis e independentes, o que traz vários benefícios, incluindo:

### Modularidade

Cada funcionalidade do aplicativo é representada por um ou mais componentes. Essa abordagem permite que desenvolvedores trabalhem em partes específicas do aplicativo sem afetar outras partes. Isso facilita a manutenção e o desenvolvimento contínuo.

### Reutilização de Código

Os componentes são projetados para serem reutilizáveis. Isso significa que, sempre que uma funcionalidade semelhante for necessária em diferentes partes do aplicativo, podemos simplesmente reutilizar o componente correspondente. Isso economiza tempo e reduz a duplicação de código.

### Legibilidade e Organização

A componentização torna o código mais legível e organizado. Cada componente representa uma unidade lógica clara do aplicativo, tornando mais fácil entender o fluxo de dados e interações.

### Testabilidade

Componentes independentes são mais fáceis de testar. Podemos escrever testes unitários para cada componente separadamente, garantindo que eles funcionem conforme o esperado.

### Manutenção Simplificada

Quando surgem atualizações ou correções, a componentização facilita a localização e a modificação das partes relevantes do código, reduzindo o risco de introduzir problemas em outras áreas do aplicativo.

Em resumo, a componentização desempenha um papel fundamental em tornar o [PesquiseNews](https://pesquisenews.com.br) um projeto organizado, flexível e escalável. Através dessa abordagem, buscamos manter nosso código limpo, eficiente e pronto para futuros desenvolvimentos.

## Tecnologias Utilizadas

- ⚛️ **React**: Uma biblioteca JavaScript para construção de interfaces de usuário.
- 🚦 **React Router**: Gerenciamento de rotas para aplicativos de página única.
- 🚫 **ESLint**: Ferramenta de linting para garantir a qualidade do código JavaScript.
- 🚀 **Vite**: Um bundler e servidor de desenvolvimento rápido para aplicativos web.
- Outras dependências do projeto (verifique o arquivo `package.json` para detalhes).

## Estrutura de Pastas

A estrutura de pastas do projeto é organizada da seguinte forma:

- `src/`: Contém o código-fonte do frontend.
  - `components/`: Componentes reutilizáveis.
  - `contexts/`: Contextos para gerenciamento de estado global.
  - `utils/`: Funções e utilitários auxiliares.
  - `App.js`: Ponto de entrada do aplicativo.
- Outros diretórios e arquivos de configuração.

## Instalação e Execução

Para executar o frontend em seu ambiente de desenvolvimento, siga estas etapas:

1. Clone o repositório do frontend.
2. Navegue até a pasta raiz do projeto.
3. Execute `npm install` para instalar as dependências.
4. Execute `npm run dev` para iniciar o servidor de desenvolvimento.

O frontend estará disponível em [PesquiseNews](https://pesquisenews.com.br).

## Configuração

O frontend do [PesquiseNews](https://pesquisenews.com.br) pode ser configurado para se comunicar com o backend. Certifique-se de configurar as variáveis de ambiente adequadas, como a URL do backend, conforme necessário.

## Desenvolvido por:

### **Evandro M Oliveira**
**Profissão**: Desenvolvedor Web.
**Especialidade**: Domínio em **Node.js**, **Express.js**, otimização de consultas em **MongoDB** e **React**.
**Formação**: Atualmente cursando Ciência de Dados e um Boot Camp em Análise de Dados. Também aprofundando conhecimentos em Design de UI/UX.
**Contribuição ao projeto**: Desenvolvimento do front-end e back-end e hospedagem na **Google Cloud**.

### [**Tripleten**](https://tripleten.com/pt-bra/)
**Contribuição ao projeto**: Design e experiência do usuário. Você pode visualizar o design fornecido pela [**Tripleten**](https://tripleten.com/pt-bra/) [aqui](https://www.figma.com/file/pjv6Im0hLJ0Rny2zSYZXQ3/Seu-projeto-final-pt?type=design&mode=design).

## Código-Fonte:
Acesse o [repositório do projeto](https://github.com/Evandro-developer/projeto-pesquisenews-frontend) no GitHub para consultar o código-fonte completo e pode ser encontrado em nosso repositório no GitHub. Sinta-se à vontade para explorá-lo, fazer fork e contribuir com melhorias ou correções.

Se você estiver interessado em contribuir ou simplesmente quiser dar uma olhada, fique à vontade para visitar o repositório. Qualquer feedback ou contribuição é muito apreciado.

## Licença:
Este projeto é open source e está licenciado sob a Licença MIT. Isso significa que você é livre para usar, copiar, modificar e distribuir o projeto, desde que forneça os devidos créditos aos autores originais e siga os termos da licença.

O licenciamento sob a Licença MIT é uma maneira de permitir que outros desenvolvedores usem e contribuam para o projeto, enquanto também protege os direitos dos autores originais. Se você decidir usar ou modificar este projeto, lembre-se de incluir a licença original e dar crédito aos autores.

A Licença MIT é uma licença permissiva, o que significa que ela não coloca muitas restrições sobre como você pode usar ou redistribuir o software. No entanto, ela vem com uma isenção de responsabilidade importante, que basicamente diz que o software é fornecido "como está", sem qualquer tipo de garantia.

## Agradecimentos:
Agradecemos por acompanhar o desenvolvimento deste projeto, aos coordenadores, tutores e revisores da [Tripleten](https://tripleten.com/pt-bra/) por me guiarem durante este curso. Também gostaria de agradecer a toda a comunidade de desenvolvimento por fornecer recursos e ferramentas valiosos que facilitaram minha jornada de aprendizado.

Um agradecimento especial a todos que contribuíram para este projeto, seja por meio de código, design, testes ou simplesmente dando feedback. Cada contribuição fez a diferença e ajudou a moldar este projeto no que ele é hoje.

Além disso, gostaria de agradecer à comunidade de desenvolvedores e aos muitos recursos online que tornaram possível aprender e implementar as várias tecnologias e bibliotecas usadas neste projeto. A jornada de aprendizado nunca termina, e sou grato por todas as oportunidades de aprendizado que surgiram ao longo do caminho.

Finalmente, obrigado a você, leitor, por se interessar e gastar seu tempo aprendendo sobre o projeto PesquiseNews. Esperamos que você ache o projeto útil e talvez até seja inspirado a criar algo semelhante ou a contribuir para este projeto. Juntos, podemos continuar a expandir e melhorar o mundo do desenvolvimento web.

Obrigado por seu interesse no [PesquiseNews](https://pesquisenews.com.br).

