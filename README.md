# Cofre Secreto Interativo

Deploy do projeto:  
https://interactive-secret-vault.vercel.app/

Interface interativa de um **cofre secreto** desenvolvida com **HTML, CSS e JavaScript**, criada como atividade prática para trabalhar manipulação do DOM, eventos de clique, validação de senha, efeitos visuais, interações com o usuário, acessibilidade pelo teclado e lógica de progressão.

O projeto simula um cofre digital onde o usuário precisa digitar um código de 4 dígitos usando o teclado numérico da própria tela, o teclado físico do computador ou o teclado numérico do celular. Caso erre 3 vezes, o cofre é bloqueado temporariamente por segurança.

Além da validação da senha, o projeto também possui um sistema de **enigmas em etapas**, permitindo que o usuário descubra a senha caso não saiba o código.

---

## Preview

Projeto com tema escuro, efeitos neon, animações de clique, porta de cofre animada, bloqueio visual com sirene, chuva de dinheiro, animações de sucesso e sistema de recuperação de senha por enigmas.

---

## Como Jogar

1. Abra o projeto no navegador.
2. Digite a senha de 4 dígitos usando:
   - os botões numéricos da tela;
   - o teclado físico do computador;
   - ou o teclado numérico do celular.
3. Clique em **Destravar Cofre** ou pressione **Enter**.
4. Se a senha estiver correta, o cofre será aberto com animações de sucesso.
5. Se a senha estiver errada, uma tentativa será marcada.
6. Após 3 erros, o cofre será bloqueado por 15 segundos.
7. Caso não saiba a senha, clique em **Não sabe a senha?** para iniciar o desafio dos enigmas.
8. Resolva os enigmas em sequência.
9. Após resolver todos, use o enigma final para descobrir a senha.
10. Volte ao cofre e destrave.

---

## Senha Padrão

A senha padrão do cofre é:

```txt
2026
```

Ela está definida no arquivo `script.js`:

```js
const correctCode = "2026";
```

Para alterar a senha, basta trocar o valor por outro código de 4 dígitos:

```js
const correctCode = "1234";
```

---

## Controles

### Teclado da Tela

- Clique nos números para montar a senha.
- Clique em **Destravar Cofre** para validar o código.

### Teclado do Computador

```txt
0-9        Digita números no cofre
Enter      Tenta destravar o cofre
Backspace  Remove o último número digitado
Esc        Limpa o código digitado
```

### Celular

- Ao tocar na interface, o teclado numérico do celular pode ser ativado.
- Os números digitados no teclado do celular aparecem no visor do cofre.

---

## Sistema de Tentativas

O usuário possui 3 tentativas para acertar a senha.

As tentativas são representadas por 3 marcações com `X`.

```txt
X X X
```

Inicialmente, os `X` ficam cinzas.  
A cada erro, um `X` fica vermelho.

Após 3 erros:

- o cofre é bloqueado;
- a tela exibe um alerta visual;
- uma sirene vermelha começa a piscar;
- uma contagem regressiva de 15 segundos é iniciada;
- os botões ficam desativados até o tempo acabar.

---

## Sistema de Enigmas

O projeto possui uma opção chamada:

```txt
Não sabe a senha?
```

Ao clicar nela, o usuário abre um sistema de recuperação de senha baseado em enigmas.

O sistema funciona em etapas:

1. O primeiro enigma é exibido.
2. O usuário digita a resposta.
3. Se estiver correta, aparece o botão para avançar.
4. O próximo enigma é liberado.
5. O processo se repete até o quarto enigma.
6. Depois dos 4 enigmas resolvidos, o enigma final é exibido.
7. O enigma final leva o usuário a entender que deve juntar as respostas na ordem em que apareceram.
8. O resultado final forma a senha do cofre.

A ideia é que o usuário descubra a senha sem que ela seja entregue diretamente.

---

## Animações e Interações

O projeto possui várias animações e efeitos visuais:

- efeito neon no layout;
- fundo animado;
- animação nos botões ao clicar;
- visor do código com feedback visual;
- animação de erro ao errar a senha;
- porta do cofre abrindo ao acertar;
- animação de dinheiro saindo do cofre;
- animação de porquinho de dinheiro;
- chuva de dinheiro após abrir o cofre;
- tela de bloqueio com sirene;
- botão de reiniciar após o sucesso.

---

## Sistema de Som

O projeto possui sons criados com JavaScript para:

- digitação dos números;
- tentativa de abertura;
- erro de senha;
- bloqueio do cofre;
- sucesso ao destravar;
- reinício do cofre.

Também existe um botão para ativar ou desativar o som.

Quando o som está ativo, o ícone aparece como volume normal.  
Quando está desativado, o ícone muda para volume com `X` e fica vermelho.

### Música de Sucesso

O projeto está preparado para tocar uma música ao abrir o cofre.

Por questões de direitos autorais, o arquivo de música não acompanha o projeto.

Para ativar a música, adicione um arquivo local com este caminho:

```txt
assets/happy-nation.mp3
```

Quando o cofre for aberto, a música será tocada em loop até o usuário clicar em **Reiniciar Cofre**.

---

## Funcionalidades

- Interface centralizada e responsiva
- Tema escuro com visual neon
- Teclado numérico interativo
- Suporte ao teclado físico do computador
- Suporte ao teclado numérico do celular
- Código de acesso com 4 dígitos
- Validação de senha com JavaScript
- Mensagens de feedback para o usuário
- Efeitos visuais ao clicar nos botões
- Animação de erro ao digitar senha incorreta
- Sistema de tentativas com indicadores visuais
- Bloqueio automático após 3 erros
- Contagem regressiva de 15 segundos
- Tela de bloqueio com efeito de sirene
- Botão para ativar/desativar som
- Porta do cofre com animação de abertura
- Animação de dinheiro ao abrir o cofre
- Animação de porquinho de dinheiro
- Chuva de dinheiro após sucesso
- Música opcional ao abrir o cofre
- Botão para reiniciar o cofre
- Sistema de enigmas para descobrir a senha
- Modal interativo para recuperação da senha
- Progressão por etapas nos enigmas
- Design responsivo para diferentes dispositivos

---

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- Font Awesome

---

## Estrutura de Pastas

```txt
cofre-secreto-interativo/
├── index.html
├── style.css
├── script.js
└── assets/
    └── happy-nation.mp3
```

Observação: o arquivo `happy-nation.mp3` é opcional e deve ser adicionado manualmente caso queira ativar a música de sucesso.

---

## Como Executar o Projeto

### Opção 1: Abrir diretamente no navegador

1. Baixe ou clone o repositório.
2. Abra a pasta do projeto.
3. Clique duas vezes no arquivo `index.html`.

### Opção 2: Usar o Live Server no VS Code

1. Abra o projeto no VS Code.
2. Instale a extensão **Live Server**, caso ainda não tenha.
3. Clique com o botão direito no arquivo `index.html`.
4. Selecione **Open with Live Server**.

### Opção 3: Clonar o repositório

```bash
git clone https://github.com/seu-usuario/cofre-secreto-interativo.git
```

Depois acesse a pasta:

```bash
cd cofre-secreto-interativo
```

E abra o arquivo `index.html`.

---

## Regras de Funcionamento

- O usuário deve montar um código de 4 dígitos.
- O código pode ser digitado pelos botões da tela, teclado físico ou teclado do celular.
- O código precisa ter exatamente 4 dígitos para ser validado.
- Se o código estiver incompleto, uma mensagem de aviso é exibida.
- Se o código estiver errado, uma tentativa é marcada.
- Após 3 erros, o cofre é bloqueado por 15 segundos.
- Se o código estiver correto, o cofre é destravado com animações de sucesso.
- Após abrir o cofre, o usuário pode clicar em **Reiniciar Cofre** para jogar novamente.
- Caso não saiba a senha, o usuário pode resolver os enigmas para descobri-la.

---

## Objetivo da Atividade

O objetivo deste projeto é praticar:

- estruturação de interface com HTML;
- estilização moderna com CSS;
- manipulação do DOM com JavaScript;
- eventos de clique;
- eventos de teclado;
- validação de dados;
- controle de estado da interface;
- responsividade;
- acessibilidade básica;
- uso de animações;
- criação de feedback visual;
- organização de código em arquivos separados.

---

## Melhorias Implementadas

Além dos requisitos básicos da atividade, foram adicionadas várias melhorias:

- nova paleta de cores;
- visual mais moderno;
- ícones com Font Awesome;
- efeitos neon;
- sons interativos;
- botão para ativar/desativar som;
- suporte ao teclado físico;
- suporte ao teclado numérico do celular;
- bloqueio por tentativas;
- contagem regressiva;
- tela de alerta para bloqueio;
- indicador visual de erros;
- animação real da porta do cofre;
- animação de dinheiro;
- animação de porquinho;
- chuva de dinheiro contínua após o sucesso;
- música opcional de sucesso;
- botão para reiniciar;
- sistema de enigmas;
- progressão por etapas nos enigmas;
- enigma final para descobrir a senha;
- responsividade melhorada para diferentes tamanhos de tela.

---

## Autor

Desenvolvido por **Arthur Scharfenberger**.
