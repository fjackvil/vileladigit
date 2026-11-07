# vileladigit.com.br

Site de Fernando Vilela (consultoria em Business Intelligence e Power BI) e área do cliente.
Publicado pelo **GitHub Pages** a partir da branch `main` (domínio no arquivo `CNAME`).

Site 100% estático: HTML, CSS e JavaScript, sem build e sem instalar nada.
A área do cliente usa o **Supabase** (login e banco). A estrutura do banco, as regras
de segurança e a documentação interna ficam no repositório privado `fjackvil/vileladigit-supabase`,
que é o ponto de partida para continuar o trabalho (`CLAUDE.md` e `COMO-CONTINUAR.md`).

> Este repositório é **público**. Nunca coloque aqui dados de cliente, senhas ou a chave secreta do Supabase.

## Onde está cada coisa

| Arquivo / pasta | O que é |
|---|---|
| `index.html` | Página principal (estrutura das seções) |
| `js/translations.js` | **Todos os textos do site**, em português (`pt`) e inglês (`en`) |
| `js/portfolio.js` | Dashboards do portfólio (`portfolioItems`) e empresas atendidas (`clientItems`) |
| `js/script.js` | Tema claro/escuro, idioma, menu, portfólio |
| `css/style.css` | Visual do site principal |
| `assets/` | Imagens (foto de perfil; logos de clientes em `assets/clientes/`) |
| `login.html`, `alterar-senha.html`, `area-cliente.html`, `pagina.html` | Telas do cliente (em inglês) |
| `admin.html`, `admin-projetos.html`, `admin-editor.html` | Painel admin (em português) |
| `js/area-comum.js`, `js/supabase-config.js`, `css/area.css` | Código comum da área do cliente e conexão com o Supabase (só a chave **pública**) |
| `modelos/proposta.html` | Modelo das propostas (visual e cálculos; os dados vêm do banco) |
| `CNAME` | Domínio `vileladigit.com.br` do GitHub Pages |

## Tarefas comuns

- **Trocar um texto:** edite `js/translations.js`, nos dois blocos (`pt` e `en`). Mudar só o
  `index.html` não tem efeito, porque o texto é substituído pelo do arquivo de traduções ao carregar.
- **Adicionar um dashboard:** copie um bloco em `portfolioItems` (`js/portfolio.js`). As instruções estão no próprio arquivo.
- **Adicionar uma empresa atendida:** inclua `{ name: "Empresa", logo: "" }` em `clientItems`.
  Para mostrar a logo, salve o arquivo em `assets/clientes/` (de preferência `.svg` ou `.png` com fundo
  transparente) e preencha `logo: "assets/clientes/arquivo.svg"`.
- **Trocar a foto:** substitua `assets/fernando-vilela.jpg` mantendo o nome.

## Testar no computador antes de publicar

Abra um terminal na pasta do repositório e rode um servidor local na **porta 5500**
(a função de usuários do Supabase só aceita `vileladigit.com.br` e `localhost:5500`):

- Linux / Mac / Windows com Python: `python3 -m http.server 5500` (no Windows pode ser `py -m http.server 5500`)
- Windows sem Python: peça ao Claude o servidor em PowerShell (HttpListener), como já foi feito antes.

Depois abra `http://localhost:5500` no navegador. Para parar, `Ctrl+C` no terminal.

## Publicar

1. Faça as alterações em uma branch e abra um pull request, ou faça commit direto na `main`.
2. Quando a mudança chega na `main`, o GitHub Pages publica sozinho em cerca de 1 minuto.
3. Confira em `https://vileladigit.com.br` (use `Ctrl+F5` para não ver a versão em cache).

O passo a passo de domínio, DNS e hospedagem está em `PUBLICACAO.md`, no repositório privado `vileladigit-supabase`.
