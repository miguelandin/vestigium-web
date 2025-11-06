/* =========================================
   Scroll suave para navegación
========================================= */
document.querySelectorAll('a[data-nav]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id && id.startsWith('#')) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* =========================================
   Newsletter (demo)
========================================= */
const form = document.getElementById('newsletter');
const msg  = document.getElementById('msg');

if (form && msg) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = form.querySelector('input[type="email"]')?.value.trim() || '';
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    msg.textContent = ok
      ? '¡Gracias! Te contactamos con la demo.'
      : 'Escribe un email válido :)';

    msg.style.color = ok ? '#9be49b' : '#ffb3b3';

    if (ok) form.reset();
  });
}

/* =========================================
   FAQ (datos → DOM)
========================================= */
const faqs = [
  {
    q: '¿Qué diferencia a Vestigium?',
    a: 'Integramos calendario y tareas con rachas y grupos nativos. Todo sin hacks, con vistas flexibles y foco en adherencia.'
  },
  {
    q: '¿Puedo usarlo en privado?',
    a: 'Sí. Todo es privado por defecto. Puedes compartir solo con tus grupos cuando quieras.'
  },
  {
    q: '¿Qué incluye cada plan?',
    a: 'Gratis: básico; Plus (0,99€): vistas completas, recordatorios y estadísticas; Pro (9,99€): automatizaciones, informes y soporte prioritario.'
  },
  {
    q: '¿Tendré mis datos si me voy?',
    a: 'Sí. Ofrecemos exportación y borrado. Tu información es tuya.'
  }
];

const faqList = document.getElementById('faqList');

if (faqList) {
  faqs.forEach((item, i) => {
    const details = document.createElement('details');
    if (i === 0) details.open = true;

    const summary = document.createElement('summary');
    summary.textContent = item.q;

    const p = document.createElement('p');
    p.textContent = item.a;

    details.appendChild(summary);
    details.appendChild(p);

    faqList.appendChild(details);
  });
}

/* =========================================
   Menú activo al hacer scroll (opcional)
========================================= */
const sections = document.querySelectorAll('section[id]');
const menuLinks = [...document.querySelectorAll('.menu a[data-nav]')];

const onScroll = () => {
  const y = window.scrollY + 100;
  let current = null;

  sections.forEach((s) => {
    const top = s.offsetTop;
    const bottom = top + s.offsetHeight;
    if (y >= top && y < bottom) current = `#${s.id}`;
  });

  menuLinks.forEach((l) => {
    l.classList.toggle('active', l.getAttribute('href') === current);
  });
};

document.addEventListener('scroll', onScroll);
onScroll();
