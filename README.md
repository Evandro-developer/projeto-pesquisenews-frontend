### [English Version](#pesquisenews-frontend-project)
---

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
10. [Configuração Automatizada dos Ambientes de Desenvolvimento e Produção (DX)](#configuração-automatizada-dos-ambientes-de-desenvolvimento-e-produção-(DX))
11. [Desenvolvido por](#desenvolvido-por)
12. [Código-Fonte](#código-fonte)
13. [Licença](#licença)
14. [Agradecimentos](#agradecimentos)

## Descrição do Projeto
O frontend do [PesquiseNews](https://pesquisenews.com.br) é a interface do usuário que o permite pesquisar e visualizar notícias em tempo real. Ele se integra ao backend para fornecer uma experiência completa. Este frontend foi desenvolvido com tecnologias modernas para criar uma experiência de usuário agradável e intuitiva.

## Funcionalidades
- **Pesquisa de Notícias em Tempo Real**: Os usuários podem pesquisar notícias de fontes confiáveis usando palavras-chave.
- **Visualização de Notícias**: Os resultados da pesquisa são exibidos de forma organizada para fácil leitura.
- **Gerenciamento de Artigos**: Os usuários autenticados podem salvar artigos em suas listas de favoritos.
- **Autenticação de Usuários**: Os usuários podem se registrar e fazer login para acessar recursos adicionais.
- **Proteção de Rotas**: Algumas funcionalidades são protegidas e só podem ser acessadas por usuários autenticados.

## Responsividade (UX)
O [PesquiseNews](https://pesquisenews.com.br) é projetado para oferecer uma experiência de usuário consistente em diferentes faixas de resolução:
- **Dispositivos móveis (320px a 584px)**: O aplicativo é otimizado para smartphones e dispositivos móveis, proporcionando uma experiência de usuário intuitiva e fácil de usar em telas menores.
- **Dispositivos móveis (585px a 768px)**: Continuando a otimização para smartphones e dispositivos móveis, essa faixa de resolução oferece uma experiência de usuário suave em telas um pouco maiores.
- **Tablets (769px a 1440px)**: Em tablets, o [PesquiseNews](https://pesquisenews.com.br) mantém a usabilidade e a disposição dos elementos para garantir uma experiência confortável de navegação.
- **Desktops e laptops (769px a 1440px)**: Para telas maiores, o aplicativo aproveita o espaço adicional para exibir mais informações, mantendo a navegabilidade e o design coesos.

## Validação em Tempo Real de Campos (UX)
No [PesquiseNews](https://pesquisenews.com.br), nos esforçamos para tornar a experiência de nossos usuários o mais intuitiva e livre de erros possível. Uma maneira pela qual alcançamos isso é através da validação em tempo real de campos de preenchimento em várias partes do aplicativo.

### Cadastro e Login
#### Campos Obrigatórios
Ao realizar o cadastro ou fazer login, os campos obrigatórios, como nome de usuário, senha e endereço de e-mail, são validados à medida que o usuário os preenche. Isso significa que, se o usuário deixar um campo em branco ou inserir informações inválidas, ele receberá feedback imediato na forma de mensagens de erro claras e contextualmente relevantes. Isso ajuda a evitar que o usuário prossiga com informações incorretas e reduz os erros de entrada.

### Pesquisa e Inserção de Dados
#### Pesquisa em Tempo Real
Durante a pesquisa de notícias ou a inserção de dados em qualquer parte do aplicativo, a validação em tempo real é aplicada para garantir que os critérios de pesquisa ou os dados inseridos sejam válidos e relevantes.

### Feedback Amigável
Nossas mensagens de erro são projetadas para orientar o usuário na correção do problema e continuar com a tarefa de forma tranquila.

## Suavidade na Abertura e Fechamento dos Popups (UX)
No [PesquiseNews](https://pesquisenews.com.br), valorizamos a experiência do usuário em todos os aspectos do design. Uma parte essencial disso é a suavidade na abertura e fechamento dos popups, que desempenha um papel crucial na interação dos usuários com nosso aplicativo.

### Abertura Suave
Quando os usuários interagem com elementos que acionam popups, como detalhes de uma notícia ou opções de configuração, garantimos que a transição para o popup seja suave e não abrupta. Isso é alcançado através de animações cuidadosamente projetadas que proporcionam uma transição visualmente agradável, criando uma sensação de continuidade e controle.

### Fechamento Amigável
Tão importante quanto a abertura é o fechamento dos popups. Quando os usuários decidem fechar um popup, a transição é projetada para ser natural e intuitiva. Os elementos de fechamento são facilmente acessíveis, e as animações são usadas para guiar o usuário de volta à tela principal de forma amigável.

## Componentização do Código
Um projeto organizado, flexível e escalável. No [PesquiseNews](https://pesquisenews.com.br), adotamos uma abordagem de componentização rigorosa no desenvolvimento do frontend. Isso significa que o código do aplicativo é dividido em componentes reutilizáveis e independentes, o que traz vários benefícios, incluindo:

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

## Tecnologias Utilizadas
- **React**: Uma biblioteca JavaScript para construção de interfaces de usuário.
- **React Router**: Gerenciamento de rotas para aplicativos de página única.
- **ESLint**: Ferramenta de linting para garantir a qualidade do código JavaScript.
- **Vite**: Um bundler e servidor de desenvolvimento rápido para aplicativos web.
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

## Configuração Automatizada dos Ambientes de Desenvolvimento e Produção (DX)
- **Experiência Aprimorada do Desenvolvedor (DX)**: O frontend do PesquiseNews aprimora a experiência do desenvolvedor com a configuração automatizada do ambiente.
- **Identificação Automática do Ambiente**: Utilizando **isProduction**, o sistema identifica automaticamente se está em um ambiente de produção ou desenvolvimento.
- **Alternância de URLs**: As URLs do backend são alteradas automaticamente conforme o ambiente identificado.
- **Gestão Eficiente de Headers**: Através de **getHeaders**, os headers de autenticação são gerenciados de forma eficiente.
- **Configuração Automática de CORS**: O sistema está configurado para lidar automaticamente com os cabeçalhos **CORS**, adaptando-se ao ambiente de execução.
- **Adaptação Dinâmica para Ambientes Diversos**: A configuração dinâmica adapta as políticas de **CORS** para ambientes de desenvolvimento e produção.
- **Segurança e Melhores Práticas**: As solicitações são gerenciadas de forma segura e conforme as melhores práticas.
- **Fluxo de Trabalho Ágil e Ininterrupto**: A abordagem utilizada permite um fluxo de trabalho mais ágil e sem interrupções.
- **Foco na Criação e Aprimoramento de Funcionalidades**: Os desenvolvedores podem concentrar-se na criação e aprimoramento das funcionalidades.
- **Otimização do Processo de Desenvolvimento**: O processo é otimizado, tornando-o mais eficiente e menos propenso a erros comuns relacionados a **CORS**.

## Desenvolvido por:
### **Evandro M Oliveira**
**Profissão**: Desenvolvedor Web Full-Stack.
**Especialidade**: Domínio em **Node.js**, **Express.js**, otimização de consultas em **MongoDB** e **React**.
**Formação**: Atualmente cursando Ciência de Dados e um Boot Camp em Análise de Dados. Também aprofundando conhecimentos em Design de UI/UX.
**Contribuição ao projeto**: Desenvolvimento do front-end e back-end e hospedagem na **Google Cloud**.

### [**Tripleten**](https://tripleten.com/pt-bra/)
**Contribuição ao projeto**: Design e experiência do usuário. Você pode visualizar o design fornecido pela [**Tripleten**](https://tripleten.com/pt-bra/) [aqui](https://www.figma.com/file/pjv6Im0hLJ0Rny2zSYZXQ3/Seu-projeto-final-pt?type=design&mode=design).

## Código-Fonte:
Acesse o [repositório do projeto](https://github.com/Evandro-developer/projeto-pesquisenews-frontend) no GitHub para consultar o código-fonte completo e pode ser encontrado em nosso repositório no GitHub. Sinta-se à vontade para explorá-lo, fazer fork e contribuir com melhorias ou correções.

## Licença:
Este projeto é open source e está licenciado sob a Licença MIT. Isso significa que você é livre para usar, copiar, modificar e distribuir o projeto, desde que forneça os devidos créditos aos autores originais e siga os termos da licença.

## Agradecimentos:
Agradecemos por acompanhar o desenvolvimento deste projeto, aos coordenadores, tutores e revisores da [Tripleten](https://tripleten.com/pt-bra/) por me guiarem durante este curso. Também gostaria de agradecer a toda a comunidade de desenvolvimento por fornecer recursos e ferramentas valiosos que facilitaram minha jornada de aprendizado.

Além disso, gostaria de agradecer à comunidade de desenvolvedores e aos muitos recursos online que tornaram possível aprender e implementar as várias tecnologias e bibliotecas usadas neste projeto. A jornada de aprendizado nunca termina, e sou grato por todas as oportunidades de aprendizado que surgiram ao longo do caminho.

Finalmente, obrigado a você, leitor, por se interessar e gastar seu tempo aprendendo sobre o projeto PesquiseNews. Esperamos que você ache o projeto útil e talvez até seja inspirado a criar algo semelhante ou a contribuir para este projeto. Juntos, podemos continuar a expandir e melhorar o mundo do desenvolvimento web.

Obrigado por seu interesse no [PesquiseNews](https://pesquisenews.com.br).

---

### [Versão em Portuguës](#projeto-pesquisenews-frontend)
---

# PesquiseNews Frontend Project
This project is the frontend part of the [PesquiseNews](https://pesquisenews.com.br) app, offering a complete solution for searching and managing news in real-time.

## Explore [PesquiseNews](https://pesquisenews.com.br)
[PesquiseNews](https://pesquisenews.com.br) is a modern platform that offers you real-time access to news from reliable sources. Below, you will find information about the frontend, its functionalities, and how to configure it.
For information on the backend of [PesquiseNews](https://pesquisenews.com.br), see the [project-pesquisenews-backend source code](https://github.com/Evandro-developer/projeto-pesquisenews-backend).

## Summary:
1. [Project Description](#project-description)
2. [Functionalities](#functionalities)
3. [Responsiveness (UX)](#responsiveness-(ux))
4. [Real-Time Field Validation (UX)](#real-time-field-validation-(ux))
5. [Smoothness in Opening and Closing Popups (UX)](#smoothness-in-opening-and-closing-popups-(ux))
6. [Code Componentization](#code-componentization)
7. [Used Technologies](#used-technologies)
8. [Folder Structure](#folder-structure)
9. [Installation and Execution](#installation-and-execution)
10. [Automated Configuration of Development and Production Environments (DX)](#automated-configuration-of-development-and-production-environments-(dx))
11. [Developed by](#developed-by)
12. [Source Code](#source-code)
13. [License](#license)
14. [Acknowledgments](#acknowledgments)

## Project Description
The frontend of [PesquiseNews](https://pesquisenews.com.br) is the user interface that allows you to search and view news in real-time. It integrates with the backend to provide a complete experience. This frontend was developed with modern technologies to create a pleasant and intuitive user experience.

## Functionalities
- **Real-Time News Search**: Users can search for news from reliable sources using keywords.
- **News Viewing**: Search results are displayed in an organized manner for easy reading.
- **Article Management**: Authenticated users can save articles to their favorites lists.
- **User Authentication**: Users can register and log in to access additional features.
- **Route Protection**: Some functionalities are protected and can only be accessed by authenticated users.

## Responsiveness (UX)
[PesquiseNews](https://pesquisenews.com.br) is designed to offer a consistent user experience across different resolution ranges:
- **Mobile Devices (320px to 584px)**: The app is optimized for smartphones and mobile devices, providing an intuitive and user-friendly experience on smaller screens.
- **Mobile Devices (585px to 768px)**: Continuing optimization for smartphones and mobile devices, this resolution range offers a smooth user experience on slightly larger screens.
- **Tablets (769px to 1440px)**: On tablets, [PesquiseNews](https://pesquisenews.com.br) maintains usability and element layout to ensure a comfortable browsing experience.
- **Desktops and Laptops (769px to 1440px)**: For larger screens, the app takes advantage of the additional space to display more information while maintaining navigability and cohesive design.

## Real-Time Field Validation (UX)
At [PesquiseNews](https://pesquisenews.com.br), we strive to make our users' experience as intuitive and error-free as possible. One way we achieve this is through real-time field validation in various parts of the app.

### Registration and Login
#### Mandatory Fields
When registering or logging in, mandatory fields such as username, password, and email address are validated as the user fills them out. This means if the user leaves a field blank or enters invalid information, they will receive immediate feedback in the form of clear and contextually relevant error messages. This helps prevent the user from proceeding with incorrect information and reduces input errors.

### Search and Data Entry
#### Real-Time Search
During the news search or data entry in any part of the app, real-time validation is applied to ensure that search criteria or entered data are valid and relevant.

### Friendly Feedback
Our error messages are designed to guide the user in correcting the problem and continuing with the task smoothly.

## Smoothness in Opening and Closing Popups (UX)
At [PesquiseNews](https://pesquisenews.com.br), we value the user experience in every aspect of design. An essential part of this is the smoothness in opening and closing popups, which plays a crucial role in user interaction with our app.

### Smooth Opening
When users interact with elements that trigger popups, such as news details or configuration options , we ensure the transition to the popup is smooth and not abrupt. This is achieved through carefully designed animations that provide a visually pleasing transition, creating a sense of continuity and control.

### Friendly Closing
As important as the opening, the closing of popups is designed to be natural and intuitive. The closing elements are easily accessible, and animations are used to guide the user back to the main screen in a friendly manner.

## Code Componentization
An organized, flexible, and scalable project. At [PesquiseNews](https://pesquisenews.com.br), we adopt a rigorous componentization approach in frontend development. This means the app's code is divided into reusable and independent components, bringing several benefits, including:

### Modularity
Each functionality of the app is represented by one or more components. This approach allows developers to work on specific parts of the app without affecting others. It facilitates maintenance and ongoing development.

### Code Reusability
Components are designed to be reusable. This means that whenever similar functionality is needed in different parts of the app, we can simply reuse the corresponding component. This saves time and reduces code duplication.

### Readability and Organization
Componentization makes the code more readable and organized. Each component represents a clear logical unit of the app, making it easier to understand the data flow and interactions.

### Testability
Independent components are easier to test. We can write unit tests for each component separately, ensuring they function as expected.

### Simplified Maintenance
When updates or fixes are needed, componentization makes it easier to locate and modify relevant parts of the code, reducing the risk of introducing issues in other areas of the app.

## Used Technologies
- **React**: A JavaScript library for building user interfaces.
- **React Router**: Route management for single-page applications.
- **ESLint**: Linting tool to ensure JavaScript code quality.
- **Vite**: A fast bundler and development server for web applications.
- Other project dependencies (check the `package.json` file for details).

## Folder Structure
The project's folder structure is organized as follows:
- `src/`: Contains the frontend source code.
  - `components/`: Reusable components.
  - `contexts/`: Contexts for global state management.
  - `utils/`: Helper functions and utilities.
  - `App.js`: The entry point of the application.
- Other configuration directories and files.

## Installation and Execution
To run the frontend in your development environment, follow these steps:
1. Clone the frontend repository.
2. Navigate to the project's root folder.
3. Run `npm install` to install dependencies.
4. Run `npm run dev` to start the development server.

## Automated Configuration of Development and Production Environments (DX)
- **Enhanced Developer Experience (DX)**: The PesquiseNews frontend enhances the developer experience with automated environment configuration.
- **Automatic Environment Identification**: Using **isProduction**, the system automatically identifies whether it is in a production or development environment.
- **URL Switching**: Backend URLs are automatically altered based on the identified environment.
- **Efficient Headers Management**: Through **getHeaders**, authentication headers are efficiently managed.
- **Automatic CORS Configuration**: The system is configured to automatically handle **CORS** headers, adapting to the execution environment.
- **Dynamic Adaptation for Various Environments**: Dynamic configuration adapts **CORS** policies for development and production environments.
- **Security and Best Practices**: Requests are managed safely and according to best practices.
- **Agile and Uninterrupted Workflow**: The adopted approach allows for a more agile and uninterrupted workflow.
- **Focus on Creating and Enhancing Features**: Developers can focus on creating and enhancing features.
- **Optimization of Development Process**: The process is optimized, making it more efficient and less prone to common errors related to **CORS**.

## Developed by:
### **Evandro M Oliveira**
**Profession**: Web Developer.
**Expertise**: Proficiency in **Node.js**, **Express.js**, query optimization in **MongoDB**, and **React**.
**Education**: Currently pursuing Data Science and a Boot Camp in Data Analysis. Also deepening knowledge in UI/UX Design.
**Contribution to the project**: Development of the frontend and backend and hosting on **Google Cloud**.

### [**Tripleten**](https://tripleten.com/pt-bra/)
**Contribution to the project**: Design and user experience. You can view the design provided by [**Tripleten**](https://tripleten.com/pt-bra/) [here](https://www.figma.com/file/pjv6Im0hLJ0Rny2zSYZXQ3/Seu-projeto-final-pt?type=design&mode=design).

## Source Code:
Access the [project repository](https://github.com/Evandro-developer/projeto-pesquisenews-frontend) on GitHub to consult the complete source code. Feel free to explore it, fork it, and contribute improvements or corrections.

## License:
This project is open source and licensed under the MIT License. This means you are free to use, copy, modify, and distribute the project, as long as you provide proper credits to the original authors and follow the license terms.

## Acknowledgments:
We thank you for following the development of this project, to the coordinators, tutors, and reviewers at [Tripleten](https://tripleten.com/pt-bra/) for guiding me through this course. I would also like to thank the entire development community for providing valuable resources and tools that facilitated my learning journey.

Additionally, I would like to thank the developer community and the many online resources that made it possible to learn and implement the various technologies and libraries used in this project. The learning journey never ends, and I am grateful for all the learning opportunities that have arisen along the way.

Finally, thank you, the reader, for your interest and for taking the time to learn about the PesquiseNews project. We hope you find the project useful and perhaps even be inspired to create something similar or contribute to this project. Together, we can continue to expand and improve the world of web development.

Thank you for your interest in [PesquiseNews](https://pesquisenews.com.br).

---

