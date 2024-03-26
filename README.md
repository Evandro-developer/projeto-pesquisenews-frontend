### [English Version](#pesquisenews-frontend-project)
---
# Projeto PesquiseNews Frontend
Este projeto é a parte frontend do aplicativo [PesquiseNews](https://pesquisenews.com.br), uma solução completa para buscar e gerenciar notícias em tempo real com uso de IA.

## Design Pixel Perfeito: Precisão e Estética no [PesquiseNews](https://pesquisenews.com.br)
Adotamos o **"Pixel Perfect Design"** para garantir que cada elemento da interface corresponda exatamente aos nossos padrões de design. Isso inclui fidelidade aos mockups e o uso de tecnologia de ponta para traduzir precisão visual em realidade digital. O resultado é uma experiência de usuário fluida e visualmente agradável.

## Suporte Multilíngue Avançado no [PesquiseNews](https://pesquisenews.com.br)
- **Integração Inovadora da API [NEWSAPI](https://newsapi.org) com a API da [OpenAI](https://platform.openai.com/api-keys)**: Ampliamos as funcionalidades do [PesquiseNews](https://pesquisenews.com.br) com integração inovadora à [NEWSAPI](https://newsapi.org) e implementação de tecnologia de IA com [OpenAI](https://platform.openai.com/api-keys), para tradução e resumo de conteúdo, sincronizando as preferências de idioma dos usuários com as buscas de notícias.
- **Flexibilidade Global**: Nosso sistema suporta a adição de novos idiomas de forma ágil, além de permitir a personalização de conteúdo através da criação de coleções de artigos salvos.
- **Experiência de Usuário Aprimorada**: Acesso a notícias em várias línguas aumenta a acessibilidade e engajamento.

## Conectando Frontend e Backend no [PesquiseNews](https://pesquisenews.com.br)
Para uma visão completa da arquitetura do [PesquiseNews](https://pesquisenews.com.br), além das funcionalidades do frontend, explore também os bastidores do sistema. Visite o [código fonte do projeto-pesquisenews-backend](https://github.com/Evandro-developer/projeto-pesquisenews-backend) para entender como integramos frontend e backend para uma solução de notícias robusta e eficiente.

## Descrição das Rotas da Aplicação
### Main
- **Função**: É a página principal do aplicativo onde os usuários podem realizar pesquisas e visualizar os resultados das notícias.
- **Componentes**:
  - SearchForm: Permite aos usuários pesquisar notícias usando critérios específicos. Equipado com validação de formulário e mensagens de erro, ele oferece uma experiência de pesquisa intuitiva e eficaz.
  - NewsCardList: Lista de cartões de notícias baseada nos resultados da pesquisa.
  - Preload: Exibe o status de carregamento ou erros.
Experiência do Usuário: Uma interface interativa e responsiva que facilita as pesquisas dos usuários e a visualização das últimas notícias.

### SavedNews
- **Função**: Rota onde os usuários visualizam e gerenciam as notícias que salvaram.
- **Componentes**:
  - SavedNewsHeader: Cabeçalho específico para notícias salvas.
  - NewsCardList: Lista de cartões de notícias salvas pelo usuário.
Experiência do Usuário: Permite que usuários logados acessem e gerenciem suas notícias favoritas, melhorando a personalização e a retenção do usuário.

### ViewNews
- **Função**: Permite aos usuários visualizar detalhes de uma notícia específica, seja ela pesquisada ou salva. Agora, com funcionalidades avançadas de IA, os usuários podem não apenas ler o conteúdo completo, mas também acessar resumos inteligentes em múltiplos idiomas.
- **Componentes**:
  - ViewNewsHeader: Exibe informações detalhadas, como título, descrição e elementos essenciais da notícia. Inclui um link para o artigo completo e opções para traduzir ou resumir o conteúdo.
  - ViewNewsArticleOverviews: Mostra um resumo inicial do conteúdo da notícia, permitindo aos usuários terem uma compreensão rápida do tema abordado. Oferece aos usuários a capacidade de traduzir o artigo completo para diversos idiomas (DE, EN, ES, FR, IT, PT) e gerar um resumo conciso do conteúdo no idioma de preferência. Permite aos usuários clicar em imagens associadas ao artigo para uma visualização ampliada, através do componente ImagePopup.
  - ViewNewsSummaries: Novo componente que apresenta resumos gerados por IA do conteúdo da notícia em diferentes idiomas selecionáveis pelo usuário
  (DE, EN, ES, FR, IT, PT). Facilita a compreensão rápida do conteúdo para leitores multilíngues.
 Experiência do Usuário: Oferece um design intuitivo e informativo, com acesso direto às fontes de notícias. Com a adição de tradução e resumo por IA, os usuários desfrutam de uma experiência de leitura personalizada e enriquecida, capaz de ultrapassar barreiras linguísticas e sintetizar conteúdos de forma inteligente.

### SignIn e SignUp
- **Função**: Autenticação e registro de usuários.
Experiência do Usuário: Projetadas para serem intuitivas e seguras, estas rotas facilitam o processo de login e cadastro.

### Descrição do Componente Navigation e Footer
- **Presentes em todas as rotas**. O componente **Navigation** é vital para a experiência do usuário oferecendo controle sobre a navegação, gestão de idioma e autenticação. **Footer** é um componente funcional e estilizada, contendo links para navegação interna e externa, além de ícones de redes sociais.

## Sumário:
1. [Descrição do Projeto](#descrição-do-projeto)
2. [Funcionalidades](#funcionalidades)
3. [Suporte Multilíngue Avançado](#suporte-multilíngue-avançado-no-pesquisenews)
4. [Validação em Tempo Real de Campos (UX)](#validação-em-tempo-real-de-campos-ux)
5. [Tecnologias Utilizadas](#tecnologias-utilizadas)
6. [Responsividade (UX)](#responsividade-ux)
7. [Estrutura de Pastas](#estrutura-de-pastas)
8. [Instalação e Execução](#instalação-e-execução)
9. [Configuração Automatizada dos Ambientes de Desenvolvimento e Produção (DX)](#configuração-automatizada-dos-ambientes-de-desenvolvimento-e-produção-dx)
10. [Desenvolvido por](#desenvolvido-por)
11. [Código-Fonte](#código-fonte)
12. [Licença](#licença)
13. [Agradecimentos](#agradecimentos)

## Novas Funcionalidades
### Resumos Multilíngues
Agora, os usuários podem selecionar resumos de notícias em 6 idiomas diferentes, proporcionando uma experiência mais inclusiva e personalizada. Isso é possível graças à integração com a API [OpenAI](https://platform.openai.com/api-keys) no backend.

### Cache Avançado para Performance
Melhoramos a navegação com um sistema de cache que reduz os tempos de espera. Conteúdos e resumos acessados anteriormente são carregados instantaneamente, graças ao armazenamento inteligente.

### Como Usar
Acesso Imediato a Conteúdo e Resumos
Usuários podem facilmente acessar e alternar entre idiomas para resumos de notícias através de um interface simplificada. A experiência de leitura é otimizada pelo sistema de cache, que fornece carregamento rápido de conteúdo já visitado.

### Início Rápido
A experiência aprimorada já está disponível na interface do usuário, sem necessidade de configuração adicional. Desfrute de acesso instantâneo e multilíngue a notícias com tempos de carregamento reduzidos.

## Descrição do Projeto
O [PesquiseNews](https://pesquisenews.com.br) é uma plataforma moderna e inovadora, que agora revoluciona o acesso a notícias globais combinada com Inteligência Artificial. Nossa plataforma permite a busca, leitura e o resumo de notícias em vários idiomas, incluindo DE, EN, ES, FR, IT, e PT, oferecendo uma experiência de usuário dinâmica, interativa e personalizada.

## Funcionalidades
- **Pesquisa de Notícias em Tempo Real**: Os usuários podem pesquisar notícias de fontes confiáveis usando palavras-chave.
- **Visualização de Notícias**: Os resultados da pesquisa são exibidos de forma organizada para fácil leitura.
- **Leitura e Resumo com IA**: Revolucionamos a maneira como as notícias são consumidas:
  - Resumo Inteligente: Com a tecnologia de IA, os usuários podem obter resumos precisos dos artigos, facilitando a compreensão rápida do conteúdo em múltiplos idiomas (DE, EN, ES, FR, IT, PT).
  - Personalização de Leitura: A tecnologia permite traduzir e resumir qualquer artigo para o idioma de preferência do usuário, garantindo uma experiência informativa personalizada e acessível globalmente.
  - Gerenciamento de Artigos e Resumos: Além de salvar artigos em listas de favoritos, os usuários autenticados podem gerenciar resumos criados pela IA, organizando suas leituras preferidas de forma ainda mais eficaz.
- **Gerenciamento de Artigos**: Os usuários autenticados podem salvar artigos em suas listas de favoritos.
- **Autenticação de Usuários**: Os usuários podem se registrar e fazer login para acessar recursos adicionais.
- **Proteção de Rotas**: Algumas funcionalidades são protegidas e só podem ser acessadas por usuários autenticados.
- **Design Pixel Perfeito**: Precisão e Estética no [PesquiseNews](https://pesquisenews.com.br). No [PesquiseNews](https://pesquisenews.com.br), a fidelidade visual é primordial. Adotamos o **"Pixel Perfect Design"** para assegurar que cada elemento da interface corresponda exatamente aos nossos rigorosos padrões de design.
  - **Fidelidade aos Mockups**: Cada detalhe, desde cores até espaçamentos, é meticulosamente alinhado com os designs originais.

## Suporte Multilíngue Avançado no [PesquiseNews](https://pesquisenews.com.br)
- **Integração Inovadora com [NEWSAPI](https://newsapi.org)**
No [PesquiseNews](https://pesquisenews.com.br), adotamos uma abordagem centrada no usuário para fornecer notícias globais em múltiplos idiomas. Integrando a versátil [NEWSAPI](https://newsapi.org), sincronizamos as preferências de idioma dos usuários com as buscas de notícias, garantindo conteúdo relevante e acessível em sua língua nativa.

### Funcionalidades e Flexibilidade
- **Suporte Expansível a Novos Idiomas**: Facilidade para incluir idiomas adicionais, apenas formatando arquivos JSON específicos.
- **Sincronização com a [NEWSAPI](https://newsapi.org)**: As buscas refletem o idioma escolhido, proporcionando resultados de notícias relevantes.
- **Armazenamento Inteligente de Dados**: Nossa API robusta armazena o idioma junto com cada notícia, enriquecendo a experiência do usuário.

### Impacto e Benefícios
- **Experiência de Usuário Aprimorada**: Acesso a notícias em várias línguas aumenta a acessibilidade e o engajamento.
- **Flexibilidade Global**: Os usuários têm a liberdade de escolher e mudar idiomas, adaptando o aplicativo às suas preferências.
- **Escalabilidade Internacional**: A possibilidade de adicionar novos idiomas torna o [PesquiseNews](https://pesquisenews.com.br) uma plataforma de notícias verdadeiramente global.

## Responsividade (UX)
O [PesquiseNews](https://pesquisenews.com.br) é projetado para oferecer uma experiência de usuário consistente em diferentes faixas de resolução:
- **Dispositivos móveis (320px a 584px)**: O aplicativo é otimizado para smartphones e dispositivos móveis, proporcionando uma experiência de usuário intuitiva e fácil de usar em telas menores.
- **Dispositivos móveis (585px a 768px)**: Continuando a otimização para smartphones e dispositivos móveis, essa faixa de resolução oferece uma experiência de usuário suave em telas um pouco maiores.
- **Tablets (769px a 1440px)**: Em tablets, o [PesquiseNews](https://pesquisenews.com.br) mantém a usabilidade e a disposição dos elementos para garantir uma experiência confortável de navegação.
- **Desktops e laptops (769px a 1440px)**: Para telas maiores, o aplicativo aproveita o espaço adicional para exibir mais informações, mantendo a navegabilidade e o design coesos.

## Validação em Tempo Real de Campos (UX)
No [PesquiseNews](https://pesquisenews.com.br), nos esforçamos para tornar a experiência de nossos usuários o mais intuitiva e livre de erros possível. Uma maneira pela qual alcançamos isso é através da validação em tempo real de campos de preenchimento em várias partes do aplicativo.

## Tecnologias Utilizadas
- **React**: Uma biblioteca JavaScript para construção de interfaces de usuário.
- **React Router**: Gerenciamento de rotas para aplicativos de página única.
- **ESLint**: Ferramenta de linting para garantir a qualidade do código JavaScript.
- **Vite**: Um bundler e servidor de desenvolvimento rápido para aplicativos web.
- Outras dependências do projeto (verifique o arquivo `package.json` para detalhes).

## Estrutura de Pastas
A estrutura de pastas do projeto é organizada da seguinte forma:
- `src/`: Contém o código-fonte do frontend:
  - `blocks/`: Contém arquivos CSS específicos para cada componente.
  - `components/`: Componentes reutilizáveis.
  - `contexts/`: Contextos para gerenciamento de estado global.
  - `fonts/`: Contém as fontes tipográficas usadas no projeto.
  - `helpers/`: Funções auxiliares para lógica específica ou complexa.
  - `hooks/`: Hooks personalizados para aprimorar a lógica de componentes e reutilizar funcionalidades.
  - `images/:` Armazena todas as imagens utilizadas no aplicativo.
  - `locales/`: Arquivos de localização para suporte a múltiplos idiomas.
  - `utils/`: Funções e utilitários genéricos.
  - `index.js`: Ponto de entrada do aplicativo.
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
**Formação**: Atualmente cursando Ciência de Dados e um Boot Camp em Análise de Dados.
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
This project is the frontend part of the [PesquiseNews](https://pesquisenews.com.br) application, a comprehensive solution for searching and managing news in real time with the use of AI.

## Pixel Perfect Design: Precision and Aesthetics at [PesquiseNews](https://pesquisenews.com.br)
We adopted the **"Pixel Perfect Design"** to ensure that every interface element exactly matches our design standards. This includes fidelity to mockups and the use of cutting-edge technology to translate visual precision into digital reality. The result is a fluid and visually pleasing user experience.

## Advanced Multilingual Support on [PesquiseNews](https://pesquisenews.com.br)
- **Innovative Integration of [NEWSAPI](https://newsapi.org) with [OpenAI](https://platform.openai.com/api-keys) API**: We have expanded the functionalities of [PesquiseNews](https://pesquisenews.com.br) with innovative integration to [NEWSAPI](https://newsapi.org) and the implementation of AI technology with [OpenAI](https://platform.openai.com/api-keys), for content translation and summarization, syncing user language preferences with news searches.
- **Global Flexibility**: Our system supports the addition of new languages swiftly, in addition to allowing content customization through the creation of saved article collections.
- **Enhanced User Experience**: Access to news in multiple languages increases accessibility and engagement.

## Connecting Frontend and Backend at [PesquiseNews](https://pesquisenews.com.br)
For a complete view of the [PesquiseNews](https://pesquisenews.com.br) architecture, beyond frontend functionalities, delve into the system's inner workings. Visit the PesquiseNews-backend project source code to understand how we integrated the frontend and backend for a robust and efficient news solution.

## Application Routes Description
### Main
- **Function**: The main page of the application where users can conduct searches and view news results.
- **Components**:
  - SearchForm: Allows users to search for news using specific criteria. Equipped with form validation and error messages, it offers an intuitive and effective search experience.
  - NewsCardList: A list of news cards based on the search results.
  - Preload: Displays loading status or errors.
User Experience: An interactive and responsive interface that makes it easy for users to conduct searches and view the latest news.

### SavedNews
- **Function**: A route where users view and manage the news they have saved.
- **Components**:
  - SavedNewsHeader: A specific header for saved news.
  - NewsCardList: A list of news cards saved by the user.
User Experience: Allows logged-in users to access and manage their favorite news, enhancing personalization and user retention.

### ViewNews
- **Function**: Allows users to view details of a specific news piece, whether searched for or saved. Now, with advanced AI functionalities, users can not only read the full content but also access smart summaries in multiple languages.
- **Components**:
  - ViewNewsHeader: Displays detailed information, such as title, description, and essential elements of the news. Includes a link to the full article and options to translate or summarize the content.
  - ViewNewsArticleOverviews: Shows an initial summary of the news content, allowing users to quickly grasp the topic covered. Offers users the ability to translate the full article into various languages (DE, EN, ES, FR, IT, PT) and generate a concise summary of the content in the preferred language. Allows users to click on images associated with the article for an enlarged view, through the ImagePopup component.
  - ViewNewsSummaries: A new component that presents AI-generated summaries of the news content in different languages selectable by the user
  (DE, EN, ES, FR, IT, PT). Facilitates quick understanding of the content for multilingual readers.
User Experience: Offers an intuitive and informative design, with direct access to news sources. With the addition of translation and summarization by AI, users enjoy a personalized and enriched reading experience, capable of overcoming language barriers and synthesizing content intelligently.

### **SignIn and SignUp**
- **Function**: User authentication and registration.
User Experience: Designed to be intuitive and secure, these routes facilitate the login and registration process.

### Description of Navigation and Footer Components
- **Present in all routes**. The **Navigation** component is vital for user experience, offering control over navigation, language management, and authentication. The **Footer** is a functional and stylized component, containing links for internal and external navigation, as well as social media icons.

## Summary:
1. [Project Description](#project-description)
2. [Functionalities](#functionalities)
3. [Advanced Multilingual Support](#advanced-multilingual-support-at-pesquisenews)
4. [Responsiveness (UX)](#responsiveness-ux)
5. [Code Componentization](#code-componentization)
6. [Used Technologies](#used-technologies)
7. [Folder Structure](#folder-structure)
8. [Installation and Execution](#installation-and-execution)
9. [Automated Configuration of Development and Production Environments (DX)](#automated-configuration-of-development-and-production-environments-dx)
10. [Developed by](#developed-by)
11. [Source Code](#source-code)
12. [License](#license)
13. [Acknowledgments](#acknowledgments)

## New Features
### Multilingual Summaries
Users can now select news summaries in 6 different languages, offering a more inclusive and personalized experience. This is made possible through integration with the OpenAI API on the backend.

### Advanced Cache for Performance
We've enhanced navigation with a caching system that reduces wait times. Previously accessed contents and summaries are loaded instantly, thanks to smart storage.

### How to Use
Instant Access to Content and Summaries
Users can easily access and switch between languages for news summaries through a simplified interface. The reading experience is optimized by the cache system, which provides quick loading of previously visited content.

### Quick Start
The enhanced experience is already available on the user interface, with no additional setup required. Enjoy instant and multilingual access to news with reduced loading times.

## Project Description
[PesquiseNews](https://pesquisenews.com.br) is a modern and innovative platform that now revolutionizes access to global news combined with Artificial Intelligence. Our platform enables the search, reading, and summarization of news in several languages, including DE, EN, ES, FR, IT, and PT, offering a dynamic, interactive, and personalized user experience.

## Functionalities
- **Real-Time News Search**: Users can search for news from reliable sources using keywords.
- **News Viewing**: Search results are displayed in an organized manner for easy reading.
- **AI-Powered Reading and Summarization**: We've revolutionized the way news is consumed:
  - Smart Summaries: With AI technology, users can obtain precise summaries of articles, facilitating quick understanding of the content in multiple languages (DE, EN, ES, FR, IT, PT).
  - Reading Customization: The technology enables translating and summarizing any article into the user's preferred language, ensuring a personalized and globally accessible informative experience.
  - Article and Summary Management: Beyond saving articles to favorite lists, authenticated users can manage summaries created by AI, organizing their preferred readings even more effectively.
- **Article Management**: Authenticated users can save articles to their favorites lists.
- **User Authentication**: Users can register and log in to access additional features.
- **Route Protection**: Some functionalities are protected and can only be accessed by authenticated users.
- **Pixel Perfect Design**: Precision and Aesthetics at [PesquiseNews](https://pesquisenews.com.br). At [PesquiseNews](https://pesquisenews.com.br), visual fidelity is paramount. We adopted the "**Pixel Perfect Desig**n" to ensure that each interface element precisely matches our rigorous design standards.
  - **Fidelity to Mockups**: Every detail, from colors to spacings, is meticulously aligned with the original designs.

## Advanced Multilingual Support at [PesquiseNews](https://pesquisenews.com.br)
- **Innovative Integration with [NEWSAPI](https://newsapi.org)**
At [PesquiseNews](https://pesquisenews.com.br), we adopt a user-centric approach to provide global news in multiple languages. By integrating the versatile [NEWSAPI](https://newsapi.org), we synchronize users' language preferences with news searches, ensuring relevant and accessible content in their native language.

### Functionalities and Flexibility
- **Expandable Support for New Languages**: Ease of including additional languages by simply formatting specific JSON files.
- **Synchronization with [NEWSAPI](https://newsapi.org)**: Searches reflect the chosen language, providing relevant news results.
- **Intelligent Data Storage**: Our robust API stores the language along with each news item, enriching the user experience.

### Impact and Benefits
- **Enhanced User Experience**: Access to news in multiple languages increases accessibility and engagement.
- **Global Flexibility**: Users have the freedom to choose and switch languages, tailoring the app to their preferences.
- **International Scalability**: The ability to add new languages makes [PesquiseNews](https://pesquisenews.com.br) a truly global news platform.

## Responsiveness (UX)
[PesquiseNews](https://pesquisenews.com.br) is designed to offer a consistent user experience across different resolution ranges:
- **Mobile Devices (320px to 584px)**: The app is optimized for smartphones and mobile devices, providing an intuitive and user-friendly experience on smaller screens.
- **Mobile Devices (585px to 768px)**: Continuing optimization for smartphones and mobile devices, this resolution range offers a smooth user experience on slightly larger screens.
- **Tablets (769px to 1440px)**: On tablets, [PesquiseNews](https://pesquisenews.com.br) maintains usability and element layout to ensure a comfortable browsing experience.
- **Desktops and Laptops (769px to 1440px)**: For larger screens, the app takes advantage of the additional space to display more information while maintaining navigability and cohesive design.

## Real-Time Field Validation (UX)
At [PesquiseNews](https://pesquisenews.com.br), we strive to make our users' experience as intuitive and error-free as possible. One way we achieve this is through real-time field validation in various parts of the app.

## Used Technologies
- **React**: A JavaScript library for building user interfaces.
- **React Router**: Route management for single-page applications.
- **ESLint**: Linting tool to ensure JavaScript code quality.
- **Vite**: A fast bundler and development server for web applications.
- Other project dependencies (check the `package.json` file for details).

## Folder Structure
The project's folder structure is organized as follows:
- `src/`: Contains the frontend source code:
  - `blocks/`: Contains specific CSS files for each component.
  - `components/`: Reusable components.
  - `contexts/`: Contexts for global state management.
  - `fonts/`: Holds the typographic fonts used in the project.
  - `helpers/`: Auxiliary functions for specific or complex logic.
  - `hooks/`: Features custom hooks to enhance component logic and facilitate functionality reuse across the application.
  - `images/`: Stores all images used in the app.
  - `locales/`: Localization files for multi-language support.
  - `utils/`: Generic functions and utilities.
  - `index.js`: Entry point of the application.
- Other directories and configuration files.

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
**Profession**: Full-Stack Web Developer.
**Expertise**: Proficiency in **Node.js**, **Express.js**, query optimization in **MongoDB**, and **React**.
**Education**: Currently pursuing Data Science and a Boot Camp in Data Analysis.
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

