/* ==========================================================
   ACHADOS TEKVO
   ========================================================== */
(function () {
  'use strict';

  var semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Ano no rodapé ---------- */
  var ano = document.getElementById('year');
  if (ano) ano.textContent = new Date().getFullYear();

  /* ---------- Contador de membros ---------- */
  var contador = document.querySelector('.counter');

  function contar(el) {
    var alvo = parseInt(el.dataset.count, 10) || 0;

    if (semAnimacao) {
      el.textContent = alvo.toLocaleString('pt-BR');
      return;
    }

    var duracao = 1500;
    var inicio = null;

    function passo(agora) {
      if (inicio === null) inicio = agora;
      var p = Math.min((agora - inicio) / duracao, 1);
      var suave = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = Math.round(alvo * suave).toLocaleString('pt-BR');
      if (p < 1) requestAnimationFrame(passo);
    }

    requestAnimationFrame(passo);
  }

  if (contador) {
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entradas, o) {
        entradas.forEach(function (e) {
          if (!e.isIntersecting) return;
          contar(e.target);
          o.unobserve(e.target);
        });
      }, { threshold: 0.5 });
      obs.observe(contador);
    } else {
      contar(contador);
    }
  }

  /* ---------- Analytics (dispara se GA4 / Pixel estiverem na página) ---------- */
  document.querySelectorAll('[data-cta]').forEach(function (botao) {
    botao.addEventListener('click', function () {
      var origem = botao.dataset.cta;
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'entrar_grupo', { origem: origem });
      }
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead', { origem: origem });
      }
    });
  });
})();
