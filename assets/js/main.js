document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var links = document.querySelector('nav.links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      q.closest('.faq-item').classList.toggle('open');
    });
  });

  // Nedtrekkene i hovedmenyen. «Borettslag & sameie» er en lenke og ikke en
  // knapp, fordi den skal gå rett til /borettslag/ — men i mobilmenyen, der
  // nedtrekket er eneste vei til undersidene, skal første trykk åpne det.
  // Andre trykk følger lenken.
  var mobil = window.matchMedia('(max-width: 900px)');

  document.querySelectorAll('.nav-drop-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      var parent = trigger.closest('.nav-dropdown');
      if (!parent) { return; }

      var erLenke = trigger.tagName === 'A' && trigger.getAttribute('href');
      if (erLenke && mobil.matches && !parent.classList.contains('open')) {
        e.preventDefault();
      }
      parent.classList.toggle('open');
    });
  });
});
