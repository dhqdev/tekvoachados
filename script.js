/* ==========================================================
   ACHADOS TEKVO — interações da landing
   ========================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Ano no rodapé ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Reveal ao rolar ---------- */
  var revealables = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window) || reduceMotion) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealables.forEach(function (el) { revealObserver.observe(el); });

    // rede de segurança: nada fica invisível se o observer não disparar
    setTimeout(function () {
      revealables.forEach(function (el) { el.classList.add('is-in'); });
    }, 3000);
  }

  /* ---------- Contador de membros ---------- */
  var counter = document.querySelector('.counter');

  function formatBR(n) {
    return n.toLocaleString('pt-BR');
  }

  function runCounter(el) {
    var target = parseInt(el.dataset.count, 10) || 0;

    if (reduceMotion) {
      el.textContent = formatBR(target);
      return;
    }

    var duration = 1600;
    var start = null;

    function step(now) {
      if (start === null) start = now;
      var progress = Math.min((now - start) / duration, 1);
      // easeOutExpo
      var eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      el.textContent = formatBR(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  if (counter) {
    if ('IntersectionObserver' in window) {
      var countObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          runCounter(entry.target);
          obs.unobserve(entry.target);
        });
      }, { threshold: 0.5 });
      countObserver.observe(counter);
    } else {
      runCounter(counter);
    }
  }

  /* ---------- CTA fixo no mobile ---------- */
  var sticky = document.querySelector('.cta-sticky');
  var firstCta = document.querySelector('.cta[data-cta="topo"]');

  if (sticky && firstCta && 'IntersectionObserver' in window) {
    var stickyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        // aparece quando o CTA do topo sai da tela
        sticky.classList.toggle('is-visible', !entry.isIntersecting);
      });
    }, { threshold: 0 });
    stickyObserver.observe(firstCta);
  }

  /* ---------- Ponto de integração para analytics ----------
     Descomente/adapte quando plugar GA4, Meta Pixel etc.
  --------------------------------------------------------- */
  document.querySelectorAll('[data-cta]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var origem = btn.dataset.cta;
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'entrar_grupo', { origem: origem });
      }
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead', { origem: origem });
      }
    });
  });
})();
