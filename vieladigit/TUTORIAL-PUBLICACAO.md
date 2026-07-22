# Como publicar o site vieladigit.com.br — passo a passo para iniciantes

Você já tem o **domínio** (`vieladigit.com.br`) registrado. Isso é só o "endereço".
Para o site aparecer quando alguém digitar esse endereço, você ainda precisa de:

1. **Hospedagem (hosting)** — o "terreno" onde os arquivos do site ficam guardados e são servidos para quem visita.
2. **Apontamento do domínio** para essa hospedagem (DNS).
3. **Upload dos arquivos** do site para dentro da hospedagem.

Abaixo está o caminho mais simples, pensado para quem nunca fez isso.

---

## Passo 0 — Você já tem hospedagem?

Seu domínio `vieladigit.com.br` está registrado no **GoDaddy**. Isso só garante o endereço —
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
  selecione `vieladigit.com.br`. Isso evita todo o Passo 2 (apontamento de DNS), pois fica
  tudo dentro da mesma conta.

**Opção B — Hospedagem em outro provedor** (Hostinger, HostGator, KingHost, Locaweb etc.):
- Contrate o plano básico.
- Quando perguntarem sobre domínio, escolha **"já tenho um domínio"** e informe
  `vieladigit.com.br` — não registre um domínio novo, ele já existe na GoDaddy.
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
3. Encontre `vieladigit.com.br` na lista de domínios e clique nos três pontinhos (**...**) ao
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
3. Entre na pasta **`public_html`** — é dentro dela que o site precisa ficar (é essa pasta que corresponde ao endereço `vieladigit.com.br`).
4. Se já existir algum arquivo padrão (como `index.html` de boas-vindas do provedor), pode apagá-lo.
5. Clique em **"Carregar" / "Upload"** e envie o arquivo **`vieladigit-site.zip`** (o zip com todos os arquivos do site, que está junto com este tutorial).
6. Depois do upload, clique com o botão direito no arquivo `.zip` dentro do Gerenciador de Arquivos e escolha **"Extrair" / "Extract"**.
7. Confira se, depois de extrair, os seguintes itens aparecem **diretamente dentro de `public_html`** (e não dentro de uma subpasta chamada `vieladigit`):
   ```
   public_html/
     index.html
     css/style.css
     js/script.js
     js/translations.js
     js/portfolio.js
     assets/fernando-vilela.jpg
   ```
   Se tudo caiu dentro de uma subpasta (ex: `public_html/vieladigit/index.html`), **mova** todo o conteúdo de dentro dela para a raiz de `public_html` (selecione tudo, "Mover", e mande para `public_html`), e depois apague a subpasta vazia.
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

1. Abra o navegador e acesse **`https://vieladigit.com.br`**.
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
2. Selecione o domínio `vieladigit.com.br` e clique em **"Executar AutoSSL" / "Run AutoSSL"**.
3. Aguarde alguns minutos. A maioria dos provedores brasileiros já ativa isso automaticamente e de graça.
4. Depois de ativo, teste novamente acessando `https://vieladigit.com.br`.

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
