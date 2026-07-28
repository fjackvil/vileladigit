/* ==========================================================================
   PORTFÓLIO — projetos de Power BI
   ==========================================================================

   Para ADICIONAR um novo projeto, copie um bloco { ... } inteiro (incluindo
   a vírgula depois dele), cole antes do "];" no final, e edite os campos:

   - title / titleEn      → nome do projeto (PT e EN)
   - description / descriptionEn → uma frase curta explicando o dashboard
   - embedUrl              → o link do <iframe> que o Power BI te dá quando
                              você usa "Arquivo > Inserir relatório > Publicar
                              na web (público)" dentro do Power BI Service.
                              Copie SOMENTE o que vem depois de src=" e antes
                              das aspas finais. Esse mesmo link é usado tanto
                              para a miniatura (preview ao vivo do dashboard
                              no card) quanto para o modal que abre em tela
                              cheia ao clicar.

   Para REMOVER um projeto, apague o bloco { ... } correspondente (e a
   vírgula que sobrar, se for o último item da lista).

   Exemplo de onde tirar o link (dentro do código <iframe> que o Power BI
   fornece):
     <iframe ... src="https://app.powerbi.com/view?r=XXXXXXXX" ...></iframe>
                          ^-- é isso aqui que entra em "embedUrl"
   ========================================================================== */

const portfolioItems = [
  {
    title: "HPN Dashboard — Imperium Solutions",
    titleEn: "HPN Dashboard — Imperium Solutions",
    description: "Dashboard de acompanhamento de indicadores da Imperium Solutions.",
    descriptionEn: "Indicator-tracking dashboard built for Imperium Solutions.",
    embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiM2UyYTk1YmQtYWE1NS00MDUxLThmMDctNmE3NDQ0ODY4NGQ3IiwidCI6IjAxOGUzMGI2LTcxZWMtNGQzOS1hZTJjLTE5NDk4YmFjMWNjNiJ9"
  }

  /* ----- Cole novos projetos abaixo, seguindo o mesmo modelo ----- 
  ,{
    title: "Nome do projeto",
    titleEn: "Project name",
    description: "Descrição curta em português.",
    descriptionEn: "Short description in English.",
    embedUrl: "https://app.powerbi.com/view?r=SEU_LINK_AQUI"
  }
  */
];
