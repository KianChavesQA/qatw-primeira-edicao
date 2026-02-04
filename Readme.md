# QA Tech Week - Primeira Edição

Bem-vindo ao repositório do **QA Tech Week - Primeira Edição**! Este repositório contém o projeto de Pipeline de testes E2E desenvolvido sob a mentoria de Fernando Papito. O foco do projeto é a automação de uma aplicação bancária (Paybank), explorando desafios reais de infraestrutura e arquitetura de software.

## 📌 Pré-requisitos

Antes de começar, certifique-se de ter os seguintes softwares instalados em seu sistema:

- [Git for Windows](https://gitforwindows.org/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js (versão LTS)](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Jenkins](https://www.jenkins.io/)
- [Allure Framework](https://docs.qameta.io/allure/)

## 🐋 Guia de Instalação do Docker

- [Windows](https://dev.to/papitofernando/instalando-o-docker-no-windows-10-home-ou-professional-com-wsl-2-26m3)
- [MacOS](https://docs.docker.com/desktop/setup/install/mac-install/)
- [Linux Ubuntu](https://docs.docker.com/engine/install/ubuntu/)

## 📺 Suporte para Configuração do Ambiente

Para um guia em vídeo completo sobre a configuração do ambiente, assista:

- [Playlist de Configuração do Ambiente](https://youtu.be/2oppKD3nYHg?list=PLn2i8I7W73iq2QYJCet6ysRl3SkqLfXZd)

## 🚀 Configuração do Ambiente

### Configuração do Arquivo Hosts

É necessário adicionar as entradas do arquivo `hosts` (disponível em `utils/hosts`) ao arquivo de hosts do seu sistema:

**Windows:**

1. Abra o Bloco de Notas como Administrador
2. Abra o arquivo: `C:\Windows\System32\drivers\etc\hosts`
3. Copie o conteúdo do arquivo `utils/hosts` deste repositório
4. Cole as entradas ao final do arquivo de hosts do sistema
5. Salve as alterações

**Linux/MacOS:**

1. Abra um terminal
2. Edite o arquivo: `sudo nano /etc/hosts`
3. Copie o conteúdo do arquivo `utils/hosts` deste repositório
4. Cole as entradas ao final do arquivo
5. Salve as alterações (Ctrl+X, Y, Enter)

### Clonando o Repositório

1. Faça um Fork do projeto
2. Clone este repositório:
   ```sh
   git clone git@github.com:seu-usuario/qatw-primeira-edicao.git
   cd qatw-primeira-edicao
   ```

## 🐳 Subindo o Ambiente com Docker Compose

O projeto utiliza Docker Compose e uma imagem customizada do Playwright com JDK para gerenciar os serviços necessários.

### Imagem Playwright com JDK

A imagem Docker customizada está disponível no [Docker Hub](https://hub.docker.com/):
```
docker pull kianchaves/playwright:latest
```

1. Certifique-se de que o Docker Desktop está em execução
2. No terminal, execute:
   ```sh
   docker-compose up -d
   ```
3. Para verificar se os contêineres estão rodando:
   ```sh
   docker ps
   ```
4. Para parar os serviços:
   ```sh
   docker-compose down
   ```

## 🧪 Executando os Testes com Playwright

1. Instale as dependências do Playwright:
   ```sh
   npx playwright install
   ```
2. Para rodar os testes localmente:
   ```sh
   npx playwright test
   ```
3. Para visualizar o relatório dos testes após a execução:
   ```sh
   npx playwright show-report
   ```
4. Para rodar os testes em modo UI:
   ```sh
   npx playwright test --ui
   ```

## 📊 Relatórios com Allure

Os testes geram relatórios automáticos com Allure:

1. Instale o Allure:
   ```sh
   npm install --save-dev @playwright/test allure-playwright
   ```
2. Execute os testes e gere o relatório:
   ```sh
   npx playwright test
   allure generate allure-results -o allure-report
   allure open allure-report
   ```

## 🔄 Integração com Jenkins (DevOps)

Este projeto está configurado para CI/CD com Jenkins:

1. Configure um novo Job no Jenkins
2. Configure o repositório Git como source
3. Adicione os seguintes passos na build:
   ```sh
   docker-compose up -d
   npx playwright install
   npx playwright test
   allure generate allure-results -o allure-report
   ```
4. Configure o Jenkins para publicar os relatórios Allure
5. Configure webhooks Git para triggerar builds automaticamente

## 📄 Licença

Este projeto está sob a licença MIT.
