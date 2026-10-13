/* ==========================================================================
   ÁREA DO CLIENTE — funções compartilhadas por todas as telas
   (conexão com o Supabase, verificação de login, tema, mensagens).

   Lembrete: as verificações aqui servem para NAVEGAÇÃO (levar cada pessoa
   para a tela certa). A proteção real dos dados está nas regras do banco
   (RLS). Mesmo que alguém altere este arquivo, o banco não entrega nada
   que a pessoa não tenha direito de ver.
   ========================================================================== */

(function () {
  "use strict";

  const cfg = window.SUPABASE_CONFIG;
  const sb = window.supabase.createClient(cfg.url, cfg.chavePublica);

  /* ------------------------------ Tema claro / escuro ------------------------------ */
  // Usa a mesma preferência salva pelo site principal.
  const root = document.documentElement;

  function aplicarTema(tema) {
    root.setAttribute("data-theme", tema);
    try { localStorage.setItem("vieladigit-theme", tema); } catch (e) {}
  }

  let temaSalvo = null;
  try { temaSalvo = localStorage.getItem("vieladigit-theme"); } catch (e) {}
  aplicarTema(temaSalvo || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

  document.addEventListener("DOMContentLoaded", () => {
    const botaoTema = document.getElementById("themeToggle");
    if (botaoTema) {
      botaoTema.addEventListener("click", () => {
        aplicarTema(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
      });
    }
    const botaoSair = document.getElementById("botaoSair");
    if (botaoSair) botaoSair.addEventListener("click", sair);
    const ano = document.getElementById("year");
    if (ano) ano.textContent = new Date().getFullYear();
  });

  /* ------------------------------ Login e perfil ------------------------------ */

  // Lê o perfil de quem está logado (ou null se ninguém estiver).
  async function obterPerfil() {
    const { data: { session } } = await sb.auth.getSession();
    if (!session) return null;

    const { data, error } = await sb
      .from("perfis")
      .select("id, nome, email, papel, ativo, super_admin, deve_trocar_senha")
      .eq("id", session.user.id)
      .single();

    if (error || !data) return null;
    return data;
  }

  // Para qual tela cada pessoa deve ir depois do login.
  function destinoPorPerfil(perfil) {
    if (perfil.deve_trocar_senha) return "alterar-senha.html";
    return perfil.papel === "admin" ? "admin.html" : "area-cliente.html";
  }

  // Usada no início de cada tela protegida.
  // opcoes.papel = "admin"  → só admin entra
  // opcoes.permitirTrocaPendente = true → usada só na tela de alterar senha
  async function exigirAcesso(opcoes = {}) {
    const perfil = await obterPerfil();

    if (!perfil) {
      await sb.auth.signOut();
      location.replace("login.html");
      return null;
    }
    if (!perfil.ativo) {
      await sb.auth.signOut();
      location.replace("login.html?motivo=inativo");
      return null;
    }
    if (perfil.deve_trocar_senha && !opcoes.permitirTrocaPendente) {
      location.replace("alterar-senha.html");
      return null;
    }
    if (opcoes.papel === "admin" && perfil.papel !== "admin") {
      location.replace("area-cliente.html");
      return null;
    }

    preencherCabecalho(perfil);
    document.body.classList.remove("carregando");
    return perfil;
  }

  function preencherCabecalho(perfil) {
    const nome = document.getElementById("usuarioNome");
    const papel = document.getElementById("usuarioPapel");
    if (nome) nome.textContent = perfil.nome || perfil.email;
    if (papel) papel.textContent = perfil.papel === "admin" ? "Admin" : "Cliente";
  }

  async function sair() {
    await sb.auth.signOut();
    location.replace("login.html");
  }

  /* ------------------------------ Painel admin ------------------------------ */

  // Chama a Edge Function "admin-usuarios" (criar, inativar, reativar, redefinir senha).
  async function chamarAdmin(corpo) {
    const { data, error } = await sb.functions.invoke("admin-usuarios", { body: corpo });
    if (error) {
      let mensagem = error.message;
      try {
        const detalhe = await error.context.json();
        if (detalhe && detalhe.erro) mensagem = detalhe.erro;
      } catch (e) {}
      throw new Error(traduzirErro(mensagem));
    }
    return data;
  }

  /* ------------------------------ Utilidades ------------------------------ */

  // Traduz as mensagens de erro mais comuns do Supabase.
  function traduzirErro(msg) {
    const m = String(msg || "");
    if (/invalid login credentials/i.test(m)) return "E-mail ou senha incorretos.";
    if (/banned/i.test(m)) return "Seu acesso está inativo. Fale com o administrador.";
    if (/email not confirmed/i.test(m)) return "E-mail ainda não confirmado. Fale com o administrador.";
    if (/should be different/i.test(m)) return "A nova senha precisa ser diferente da senha atual.";
    if (/at least \d+ characters|password should be/i.test(m)) return "A senha é fraca ou curta demais. Use pelo menos 8 caracteres.";
    if (/already (been )?registered|already exists/i.test(m)) return "Já existe um usuário com este e-mail.";
    if (/rate limit|too many/i.test(m)) return "Muitas tentativas seguidas. Aguarde alguns minutos e tente de novo.";
    if (/failed to fetch|network/i.test(m)) return "Sem conexão com o servidor. Verifique sua internet.";
    return m;
  }

  // Mostra uma mensagem em um elemento .aviso (tipo: "erro", "ok" ou "info").
  function aviso(elemento, mensagem, tipo = "erro") {
    if (!elemento) return;
    elemento.className = "aviso aviso-" + tipo + (mensagem ? " mostrar" : "");
    elemento.textContent = mensagem || "";
  }

  // Evita que textos digitados (nomes, e-mails) virem código na página.
  function escapar(texto) {
    return String(texto ?? "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  // Gera uma senha aleatória forte (sem caracteres que se confundem, como l/1/O/0).
  function gerarSenha(tamanho = 12) {
    const letras = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%*";
    const valores = new Uint32Array(tamanho);
    crypto.getRandomValues(valores);
    return Array.from(valores, (v) => letras[v % letras.length]).join("");
  }

  function formatarData(valor) {
    if (!valor) return "—";
    return new Date(valor).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
  }

  // Desativa um botão enquanto uma ação está em andamento.
  async function comBotaoOcupado(botao, textoOcupado, acao) {
    const textoOriginal = botao.textContent;
    botao.disabled = true;
    botao.textContent = textoOcupado;
    try {
      return await acao();
    } finally {
      botao.disabled = false;
      botao.textContent = textoOriginal;
    }
  }

  window.Area = {
    sb, obterPerfil, destinoPorPerfil, exigirAcesso, sair, chamarAdmin,
    traduzirErro, aviso, escapar, gerarSenha, formatarData, comBotaoOcupado,
  };
})();
