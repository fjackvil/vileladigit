# Como publicar o site vileladigit.com.br — passo a passo para iniciantes

Você já tem o **domínio** (`vileladigit.com.br`) registrado no GoDaddy. Isso é só o "endereço".
Para o site aparecer quando alguém digitar esse endereço, você precisa de um lugar para guardar
os arquivos (hospedagem) e apontar o domínio para lá.

Existem dois caminhos possíveis — escolha um:

- **Parte A — GitHub Pages (gratuito para sempre)**: recomendado para o seu caso, já que o site
  é só HTML/CSS/JS. Não precisa contratar nenhuma hospedagem paga.
- **Parte B — Hospedagem tradicional paga** (GoDaddy, Hostinger, HostGator etc., com cPanel):
  caminho mais tradicional, útil se no futuro você quiser e-mail profissional (`voce@vileladigit.com.br`)
  ou recursos que exigem servidor próprio.

Se estiver em dúvida, vá de **Parte A** — é grátis, funciona muito bem para este site, e dá para
migrar para hospedagem paga depois se precisar.

---

# Parte A — Opção gratuita: GitHub Pages

O GitHub Pages é um serviço **gratuito para sempre** do GitHub (empresa da Microsoft) para
hospedar sites estáticos como o seu. Você não paga nada por isso — só o domínio, que você já tem.

## A.1 — Criar uma conta no GitHub

1. Acesse [github.com](https://github.com) e clique em **"Sign up"**.
2. Crie a conta com seu e-mail (`fjackvil@gmail.com`), um nome de usuário e uma senha.
3. Confirme o e-mail que o GitHub enviar.

## A.2 — Criar o repositório do site

1. Já logado, clique no **"+"** no canto superior direito → **"New repository"**.
2. Em **"Repository name"**, coloque exatamente: `vileladigit.com.br` (pode ser outro nome,
   mas esse já deixa claro para que serve).
3. Marque a opção **"Public"** (repositórios do GitHub Pages gratuitos precisam ser públicos).
4. Clique em **"Create repository"**.

## A.3 — Enviar os arquivos do site

1. Dentro do repositório recém-criado, clique em **"Add file" → "Upload files"**.
2. Extraia o `vileladigit-site.zip` no seu computador (clique com o botão direito → "Extrair tudo").
3. Abra a pasta extraída (`vileladigit`) e arraste **o conteúdo de dentro dela** — não a pasta
   em si — para a área de upload do GitHub:
   ```
   index.html
   css/
   js/
   assets/
   TUTORIAL-PUBLICACAO.md
   ```
4. Role para baixo e clique em **"Commit changes"** (pode deixar a mensagem padrão).

## A.4 — Ativar o GitHub Pages

1. No repositório, clique em **"Settings"** (aba no topo).
2. No menu à esquerda, clique em **"Pages"**.
3. Em **"Build and deployment" → "Branch"**, selecione **`main`** e a pasta **`/ (root)`**, depois
   clique em **"Save"**.
4. Aguarde 1-2 minutos. O GitHub vai mostrar um link parecido com
   `https://seu-usuario.github.io/vileladigit.com.br/` — clicando nele o site já deve abrir
   (ainda no endereço do GitHub, não no seu domínio).

## A.5 — Conectar seu domínio (vileladigit.com.br)

1. Ainda na tela **Settings → Pages**, em **"Custom domain"**, digite `vileladigit.com.br` e
   clique em **"Save"**. Isso cria automaticamente um arquivo chamado `CNAME` no seu repositório.
2. Agora vá para o painel da **GoDaddy** ([dcc.godaddy.com](https://dcc.godaddy.com)) → encontre
   `vileladigit.com.br` → **"Gerenciar DNS" / "Manage DNS"**.
3. Adicione (ou edite) os seguintes registros:

   | Tipo | Nome | Valor / Aponta para | TTL |
   |---|---|---|---|
   | A | @ | 185.199.108.153 | 1 hora (padrão) |
   | A | @ | 185.199.109.153 | 1 hora (padrão) |
   | A | @ | 185.199.110.153 | 1 hora (padrão) |
   | A | @ | 185.199.111.153 | 1 hora (padrão) |
   | CNAME | www | seu-usuario.github.io | 1 hora (padrão) |

   > No campo **"Nome"**, `@` representa o domínio raiz (`vileladigit.com.br` sem nada na frente).
   > Se já existir algum registro **A** apontando para outro lugar (ex: o "parking" padrão da
   > GoDaddy), edite-o em vez de criar um novo, para não ter dois registros conflitando.
4. Salve. A propagação pode levar de alguns minutos até 24h.
5. Volte em **Settings → Pages** no GitHub: quando o domínio for reconhecido, aparecerá uma
   marca de verificação verde e a opção **"Enforce HTTPS"** — marque essa caixa para ativar o
   cadeado de segurança (pode demorar algumas horas para ficar disponível na primeira vez).

Pronto — `https://vileladigit.com.br` estará no ar, de graça, hospedado pelo GitHub.

## Como manter tudo sincronizado — GitHub Desktop (recomendado)

Você perguntou como fazer para que **qualquer alteração no site** seja atualizada direto no
GitHub. A forma mais fácil e sem usar linha de comando é o **GitHub Desktop** — um programa
gratuito com botões (nada de comandos digitados). Ele conecta uma pasta do seu computador
diretamente ao repositório do GitHub: você edita os arquivos normalmente nessa pasta, e depois
clica em um botão para enviar ("Push") as mudanças. O site atualiza sozinho em 1-2 minutos.

### 1. Instalar e conectar sua conta

1. Baixe em [desktop.github.com](https://desktop.github.com) e instale.
2. Abra o programa e clique em **"Sign in to GitHub.com"** — entre com a mesma conta que você
   já usa (a que criou o repositório `vileladigit.com.br`).

### 2. Clonar (baixar) o repositório para o seu computador

"Clonar" é só o termo técnico para "baixar uma cópia sincronizada".

1. No GitHub Desktop, vá em **File → Clone Repository**.
2. Na aba **"GitHub.com"**, procure e selecione `vileladigit.com.br` na lista (é o repositório
   que você já criou e subiu os arquivos).
3. Escolha uma pasta no seu computador para guardar essa cópia (ex: `Documentos\vileladigit`) e
   clique em **"Clone"**.
4. Pronto — agora existe uma pasta no seu PC com todos os arquivos do site (`index.html`, `css/`,
   `js/`, `assets/`), ligada ao GitHub.

### 3. Editar os arquivos normalmente

- Abra os arquivos dessa pasta clonada com qualquer editor (Bloco de Notas, Word para copiar o
  texto, ou o **VS Code**, que é gratuito e mais confortável para editar HTML/CSS/JS).
- Faça as alterações que quiser: trocar texto no `index.html`, trocar a foto em `assets/`,
  adicionar um projeto novo em `js/portfolio.js`, etc.
- Salve o(s) arquivo(s) normalmente (Ctrl+S), como salvaria qualquer documento.

### 4. Enviar as mudanças para o GitHub (commit + push)

1. Volte para o **GitHub Desktop** — ele detecta sozinho quais arquivos você mudou e mostra
   uma lista em **"Changes"**, com o que foi adicionado/removido destacado.
2. No campo **"Summary"** (canto inferior esquerdo), escreva uma frase curta descrevendo a
   mudança — ex: *"Atualiza foto de perfil"* ou *"Adiciona novo projeto no portfólio"*.
3. Clique no botão azul **"Commit to main"**.
4. Clique em **"Push origin"** no topo (esse botão envia a mudança para o GitHub de verdade).
5. Em 1-2 minutos, `https://vileladigit.com.br` já mostra a versão atualizada.

A partir daqui, toda vez que quiser mudar algo é só repetir os passos 3 e 4: **editar → Commit →
Push**. Não precisa repetir a instalação nem o clone.

> Dica: se você mexer nos arquivos em mais de um computador, antes de editar clique em
> **"Fetch origin"** (ou "Pull origin") no GitHub Desktop para garantir que está com a versão
> mais recente antes de começar a editar.

---

# Parte B — Opção paga: Hospedagem tradicional (cPanel)

Use este caminho se preferir uma hospedagem tradicional (por exemplo, para ter e-mail
profissional `voce@vileladigit.com.br`, o que o GitHub Pages não oferece).

---

## Passo 0 — Você já tem hospedagem?

Seu domínio `vileladigit.com.br` está registrado no **GoDaddy**. Isso só garante o endereço —
os arquivos do site precisam morar em uma **hospedagem** (que pode ser a própria GoDaddy ou
outro provedor).

- Se você **nunca contratou um plano de hospedagem** em lugar nenhum, vá para o **Passo 1**.
- Se você já tem hospedagem contratada (na própria GoDaddy ou em outro provedor como
  Hostinger, HostGator, KingHost, Locaweb), pule para o **Passo 2**.

---

## Passo 1 — Contratar uma hospedagem (se ainda não tiver)

Qualquer plano de hospedagem compartilhada "básico" ou "iniciante" serve perfeitamente para
este site, pois ele é só HTML/CSS/JS (não precisa de banco de dados nem de PHP).

Você tem duas opções:

**Opção A — Hospedagem na própria GoDaddy** (mais simples, já vem "conectada" ao domínio):
- Acesse [godaddy.com](https://www.godaddy.com), faça login, e contrate um plano de
  **"Hospedagem de Sites" / "Web Hosting"**.
- Ao contratar, a GoDaddy geralmente já pergunta se você quer usar um domínio que já possui —
  selecione `vileladigit.com.br`. Isso evita todo o Passo 2 (apontamento de DNS), pois fica
  tudo dentro da mesma conta.

**Opção B — Hospedagem em outro provedor** (Hostinger, HostGator, KingHost, Locaweb etc.):
- Contrate o plano básico.
- Quando perguntarem sobre domínio, escolha **"já tenho um domínio"** e informe
  `vileladigit.com.br` — não registre um domínio novo, ele já existe na GoDaddy.
- Você precisará apontar o DNS depois (Passo 2).

Guarde o e-mail com os dados de acesso ao **painel de controle** (cPanel ou painel próprio do
provedor, com link, usuário e senha).

---

## Passo 2 — Apontar o domínio da GoDaddy para a hospedagem (DNS)

Pule este passo **somente** se você contratou hospedagem na própria GoDaddy e ligou o domínio
direto na hora da compra (Opção A do Passo 1).

Se a hospedagem é de **outro provedor**, você precisa trocar os nameservers no painel da GoDaddy:

1. No painel da sua **hospedagem** (o provedor novo), procure por "Nameservers" ou "DNS" —
   normalmente aparecem dois ou três endereços parecidos com:
   ```
   ns1.provedor.com.br
   ns2.provedor.com.br
   ```
2. Acesse [dcc.godaddy.com](https://dcc.godaddy.com) (ou faça login em godaddy.com e clique em
   **"Meus Produtos" / "My Products"**).
3. Encontre `vileladigit.com.br` na lista de domínios e clique nos três pontinhos (**...**) ao
   lado dele, depois em **"Gerenciar DNS" / "Manage DNS"**.
4. Procure a seção **"Nameservers"** e clique em **"Alterar" / "Change"**.
5. Selecione **"Personalizado" / "I'll use my own nameservers"** e cole os nameservers que a
   sua hospedagem informou (normalmente 2, às vezes mais).
6. Salve. A propagação pode levar de **algumas horas até 24h** (em casos raros, até 48h). É
   normal o site não abrir de imediato depois dessa troca.

> Alternativa (sem trocar nameservers): se preferir manter o DNS na GoDaddy e só apontar o
> site, na mesma tela de **"Gerenciar DNS"** você pode, em vez de trocar nameservers, editar os
> registros **A** e **CNAME** com o IP/endereço que a hospedagem fornecer. A hospedagem contratada
> sempre informa qual dos dois métodos (nameservers ou registro A) ela recomenda — siga a
> orientação dela.

---

## Passo 3 — Acessar o gerenciador de arquivos (cPanel) ou usar FTP

A maioria das hospedagens compartilhadas usa o **cPanel**, um painel com ícones.

### Opção A — Gerenciador de Arquivos do cPanel (mais fácil, recomendado)

1. Acesse o cPanel (link e login enviados pelo seu provedor).
2. Procure o ícone **"Gerenciador de Arquivos"** (File Manager).
3. Entre na pasta **`public_html`** — é dentro dela que o site precisa ficar (é essa pasta que corresponde ao endereço `vileladigit.com.br`).
4. Se já existir algum arquivo padrão (como `index.html` de boas-vindas do provedor), pode apagá-lo.
5. Clique em **"Carregar" / "Upload"** e envie o arquivo **`vileladigit-site.zip`** (o zip com todos os arquivos do site, que está junto com este tutorial).
6. Depois do upload, clique com o botão direito no arquivo `.zip` dentro do Gerenciador de Arquivos e escolha **"Extrair" / "Extract"**.
7. Confira se, depois de extrair, os seguintes itens aparecem **diretamente dentro de `public_html`** (e não dentro de uma subpasta chamada `vileladigit`):
   ```
   public_html/
     index.html
     css/style.css
     js/script.js
     js/translations.js
     js/portfolio.js
     assets/fernando-vilela.jpg
   ```
   Se tudo caiu dentro de uma subpasta (ex: `public_html/vileladigit/index.html`), **mova** todo o conteúdo de dentro dela para a raiz de `public_html` (selecione tudo, "Mover", e mande para `public_html`), e depois apague a subpasta vazia.
8. Pode apagar o arquivo `.zip` depois de extrair (opcional).

### Opção B — Envio por FTP (alternativa)

Se preferir usar um programa de FTP como o **FileZilla** (gratuito):

1. Baixe e instale o FileZilla (filezilla-project.org).
2. No seu provedor de hospedagem, pegue os dados de **FTP**: host/servidor, usuário, senha e porta (geralmente 21).
3. No FileZilla, digite esses dados no topo e clique em **"Conexão rápida"**.
4. No painel da direita (servidor remoto), entre na pasta `public_html`.
5. No painel da esquerda (seu computador), navegue até a pasta onde você extraiu os arquivos do site no seu PC.
6. Selecione todos os arquivos e pastas (`index.html`, `css`, `js`, `assets`, `TUTORIAL-PUBLICACAO.md`) e arraste para dentro de `public_html` no painel da direita.
7. Aguarde o envio terminar (barra de progresso na parte de baixo).

---

## Passo 4 — Testar o site

1. Abra o navegador e acesse **`https://vileladigit.com.br`**.
2. Se aparecer o site, ótimo! Teste:
   - O botão de **modo claro/escuro** no topo.
   - O botão **PT/EN** de idioma.
   - O botão de **WhatsApp** na seção de contato (deve abrir uma conversa com o número `+55 31 98227-8121`).
   - O site em um celular (redimensione a janela do navegador ou abra pelo próprio celular).
3. Se aparecer erro de "site não encontrado" ou a página antiga do provedor, aguarde algumas horas — provavelmente é o DNS ainda propagando (Passo 2).

---

## Passo 5 — Ativar o certificado de segurança (HTTPS / cadeado)

Para o navegador mostrar o cadeado de segurança (`https://`), é preciso ativar um certificado SSL:

1. No cPanel, procure por **"SSL/TLS Status"** ou **"AutoSSL"** (às vezes chamado de "Let's Encrypt").
2. Selecione o domínio `vileladigit.com.br` e clique em **"Executar AutoSSL" / "Run AutoSSL"**.
3. Aguarde alguns minutos. A maioria dos provedores brasileiros já ativa isso automaticamente e de graça.
4. Depois de ativo, teste novamente acessando `https://vileladigit.com.br`.

---

## Como atualizar o site no futuro

Sempre que quiser trocar um texto ou a foto:

- **Trocar a foto**: substitua o arquivo `assets/fernando-vilela.jpg` por uma nova imagem **com o mesmo nome** (ou ajuste o `src` da tag `<img>` no `index.html`, na seção `hero-visual`).
- **Trocar textos em português**: edite diretamente o `index.html`.
- **Trocar textos em inglês**: edite o arquivo `js/translations.js`, dentro do bloco `en: { ... }`.
- **Adicionar/remover projetos do Portfólio (Power BI)**: edite **apenas** o arquivo
  `js/portfolio.js` — não precisa mexer no HTML. Dentro dele há instruções e um exemplo de como
  copiar o link do `<iframe>` que o Power BI Service gera (menu **Arquivo → Inserir relatório →
  Publicar na web (público)**, dentro do relatório no app.powerbi.com). Cada projeto vira
  automaticamente um card na seção "Portfólio", que abre o relatório embutido ao clicar.
- **Informar a instituição do MBA em andamento**: no arquivo `js/translations.js`, procure pela
  chave `edu0_school` (nos blocos `pt` e `en`) e troque `"(informe a instituição)"` pelo nome
  real da instituição.
- Depois de editar no seu computador, envie os arquivos novamente pelo Gerenciador de Arquivos ou FTP, substituindo os antigos.

---

## Problemas comuns

| Sintoma | Causa provável | Solução |
|---|---|---|
| Site não abre, erro "não encontrado" | DNS ainda propagando | Aguardar até 24-48h após o Passo 2 |
| Aparece a página padrão do provedor | Arquivos não estão na pasta `public_html` (raiz) | Conferir Passo 3, item 7 |
| Site abre sem estilo (sem cores/fontes) | Pastas `css` ou `js` não foram enviadas corretamente | Reenviar mantendo a mesma estrutura de pastas |
| Foto não aparece | Nome do arquivo diferente do esperado | Confirmar que o arquivo se chama exatamente `fernando-vilela.jpg` dentro de `assets/` |
| Sem cadeado / "não seguro" | SSL não ativado | Repetir Passo 5 |

Qualquer dúvida no processo, me chame de novo aqui que eu te ajudo a revisar o que está acontecendo.
