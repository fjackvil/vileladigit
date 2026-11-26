# Farma Xperiun · site do projeto (Olist Squad)

Site estático do Data Challenge Xperiun (Fase 2): dashboard em Power BI incorporado, visão geral do projeto, documentação técnica e apresentação executiva.

**Não precisa de build, banco ou servidor especial:** é só HTML, CSS e imagens. Todos os links são relativos, então o site funciona na raiz do domínio (`vileladigit.com.br/`) ou numa subpasta (`vileladigit.com.br/farma-xperiun/`).

## Páginas

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Início: o projeto, a equipe, os números principais, o **Power BI incorporado**, as 6 perguntas respondidas e os downloads |
| `dashboard.html` | O dashboard do Power BI em tela cheia |
| `visao-geral.html` | Visão geral do projeto: desafio, Datacast, base, SQL, dashboard, considerações, entregas e cronograma |
| `documentacao.html` | Documentação técnica completa, com link para o PDF |
| `apresentacao.html` | Visualizador dos 6 slides (setas, teclado, miniaturas e notas), com downloads em PowerPoint e PDF |

Downloads em `assets/`: `docs/DOCUMENTACAO_TECNICA.pdf`, `apresentacao/Apresentacao_Farma_Xperiun.pptx` e `.pdf`. O arquivo `.pbix` não é publicado no site.

## Como publicar

1. Copie **o conteúdo desta pasta** para o repositório ou para a pasta do site, por exemplo `farma-xperiun/` dentro do projeto do vileladigit.com.br.
2. Faça o commit e o push:
   ```bash
   git add .
   git commit -m "Projeto Farma Xperiun: dashboard, documentação e apresentação"
   git push
   ```
3. Abra `https://vileladigit.com.br/farma-xperiun/` (ou o caminho que você escolheu) e confira o Power BI carregando no Início.

**Pré-visualizar no computador antes de subir:** dentro desta pasta, rode `python -m http.server 8000` e abra http://localhost:8000. Abrindo o `index.html` direto do disco, o Power BI pode não carregar.

## Ajustes possíveis

- **Endereço público:** as prévias de link (WhatsApp, LinkedIn) usam `https://vileladigit.com.br/farma-xperiun/`, nas tags `og:url` e `og:image` de cada página. Se publicar noutro caminho, troque esse endereço nos 5 arquivos `.html` (ou em `URL_SITE` no gerador, que fica em `projeto/05_site/gerar_site.py` na pasta do desafio, e gere de novo).
- **Link do Power BI:** se o relatório for republicado com outro link, troque o endereço `app.powerbi.com/view?r=…` nas páginas.
- **O relatório no Power BI é público** (Publicar na Web): qualquer pessoa com o link vê os dados. Se você desativar a publicação no Power BI, o painel some do site.
- O arquivo `.nojekyll` só importa se o site for servido pelo GitHub Pages: ele evita que o Jekyll ignore arquivos. Em outro servidor, ele não faz nada.

## Como foi gerado

O site é gerado por `projeto/05_site/gerar_site.py`, na pasta do desafio, a partir da documentação, da apresentação e do documento de visão geral. As imagens dos slides, o PDF e as notas vêm de `projeto/05_site/exportar_slides.ps1`, que usa o PowerPoint. Se algo mudar no projeto, rode os dois e substitua esta pasta.
