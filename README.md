# Equilíbrio Verde: O Desafio do Agro Sustentável

## 1. Objetivo do Projeto
O projeto **"Equilíbrio Verde"** é uma aplicação interativa em formato de jogo de simulação e gerenciamento de recursos desenvolvido estritamente com **HTML5, CSS3 e JavaScript**. O jogo aborda diretamente a temática: *“Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente”*.

O jogador gerencia uma propriedade agrícola enfrentando decisões práticas de manejo. O principal desafio é alavancar os rendimentos financeiros da fazenda preservando a estabilidade e a saúde ecológica do solo. A vitória só é conquistada ao atingir a meta econômica mantendo taxas seguras de sustentabilidade.

---

## 2. Tecnologias Utilizadas
*   **HTML5 Semântico:** Estrutura organizada e acessível, utilizando elementos como `<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<button>` e estruturas de acessibilidade (`aria-*`).
*   **CSS3 Avançado:** Estilização modular com variáveis nativas (`:root`), layouts responsivos construídos via **CSS Grid** e **Flexbox**, animações de transições suaves e recursos de Alto Contraste.
*   **JavaScript Nativo (ES6+):** Código assíncrono controlado por eventos, gerenciamento do estado da aplicação, manipulação rica e dinâmica do DOM e geração de áudio sintético usando a **Web Audio API**.

---

## 3. Detalhes de Implementação e Arquitetura

### I. Complexidade Técnica e Lógica
*   **State Management:** Toda a lógica reside em um objeto de estado unificado (`state`), o que previne comportamentos inesperados e garante consistência entre as variáveis do jogo (Capital, Sustentabilidade e Produtividade).
*   **Game Loop:** Um loop temporal acionado via `setInterval` simula o desgaste progressivo do ambiente agrícola (2% a cada 4 segundos), forçando o jogador a agir de forma ecologicamente proativa em vez de apenas acumular capital.
*   **DOM Dinâmico:** Atualização constante das barras de progresso (`aria-valuenow` e propriedades de largura inline) de maneira performática, alterando os valores na tela conforme as interações acontecem.

### II. Estrutura do Código e Legibilidade
*   O código JavaScript é estruturado com o uso do `"use strict"` para evitar más práticas.
*   Comentários claros dividem o script em seções lógicas: Seletores, Estado, Funções Auxiliares, Lógica de Negócios e Eventos.
*   O CSS foi programado utilizando variáveis, facilitando a troca instantânea do esquema de cores para Alto Contraste através de uma única classe no elemento principal (`body.high-contrast`).

### III. Recursos de Acessibilidade e Recursos Adicionais
*   **Teclas de Atalho:** O jogo pode ser completamente jogado pelo teclado através das teclas indicadas nos botões de manejo (`H`, `B`, `R`, `T` e `Q`).
*   **Controles de Fonte:** Botões de `A+` e `A-` alteram de forma fluida a escala de fontes do sistema via variáveis CSS.
*   **Alto Contraste:** Suporte otimizado para pessoas com baixa visão ou daltonismo por meio do botão de inversão de cores e paleta contrastante.
*   **Web Audio API:** Pequenos sinais sonoros de frequências diferentes são gerados dinamicamente para sinalizar acertos, falhas e operações financeiras bem-sucedidas ou bloqueadas por saldo.

---

## 4. Instruções de Execução

1. Crie um diretório de sua preferência no computador.
2. Salve os respectivos códigos fornecidos nos arquivos: `index.html`, `styles.css` e `script.js`.
3. Certifique-se de que os três arquivos estejam no mesmo diretório/pasta.
4. Abra o arquivo `index.html` em qualquer navegador web atual (Chrome, Firefox, Edge ou Safari).
