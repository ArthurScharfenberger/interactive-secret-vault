# https://interactive-secret-vault.vercel.app/

# Cofre Secreto Interativo

Interface interativa de um cofre secreto desenvolvida com **HTML, CSS e JavaScript**, criada como atividade prática para trabalhar manipulação do DOM, eventos de clique, validação de senha, efeitos visuais e interação com o usuário.

O projeto simula um cofre digital onde o usuário precisa digitar um código de 4 dígitos usando um teclado numérico na própria tela. Caso erre 3 vezes, o cofre é bloqueado temporariamente por segurança.

## Preview

Projeto com tema escuro, efeitos neon, animações de clique, bloqueio visual com sirene e animação de sucesso com dinheiro e porquinho.

## Funcionalidades

- Interface centralizada e responsiva
- Teclado numérico interativo
- Código de acesso com 4 dígitos
- Validação de senha com JavaScript
- Mensagens de feedback para o usuário
- Efeitos visuais ao clicar nos botões
- Animação de erro ao digitar senha incorreta
- Sistema de tentativas
- Bloqueio automático após 3 erros
- Contagem regressiva de 15 segundos
- Tela de bloqueio com efeito de sirene
- Animação de sucesso ao abrir o cofre
- Animação de dinheiro e porquinho
- Efeitos sonoros criados com JavaScript

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript

## Estrutura de Pastas

```txt
cofre-secreto-interativo/
├── index.html
├── style.css
└── script.js
```

## Como Executar o Projeto

1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario/cofre-secreto-interativo.git
```

2. Acesse a pasta do projeto:

```bash
cd cofre-secreto-interativo
```

3. Abra o arquivo `index.html` no navegador.

Também é possível executar usando a extensão **Live Server** no VS Code.

## Senha do Cofre

A senha padrão do projeto está definida no arquivo `script.js`:

```js
const correctCode = "2026";
```

Para alterar a senha, basta trocar o valor por outro código de 4 dígitos:

```js
const correctCode = "1234";
```

## Regras de Funcionamento

- O usuário deve montar o código clicando nos botões numéricos.
- O código precisa ter exatamente 4 dígitos.
- Se o código estiver incompleto, uma mensagem de aviso é exibida.
- Se o código estiver errado, uma mensagem de erro aparece.
- Após 3 erros, o cofre é bloqueado por 15 segundos.
- Se o código estiver correto, o cofre é destravado com animações de sucesso.

## Objetivo da Atividade

O objetivo deste projeto é praticar:

- Estruturação de uma interface com HTML
- Estilização moderna com CSS
- Manipulação de elementos com JavaScript
- Eventos de clique
- Validação de dados
- Controle de estado da interface
- Uso de animações e efeitos visuais

## Melhorias Implementadas

Além dos requisitos básicos da atividade, foram adicionadas melhorias para deixar o projeto mais interativo:

- Nova paleta de cores
- Visual mais moderno
- Efeitos neon
- Sons interativos
- Bloqueio por tentativas
- Contagem regressiva
- Animação de dinheiro
- Animação de porquinho
- Tela de alerta para bloqueio

## Autor

Desenvolvido por **Arthur Scharfenberger**.
