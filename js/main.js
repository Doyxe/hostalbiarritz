document.addEventListener('DOMContentLoaded', () => {
  // MODAL DE IMÁGENES
  const images = document.querySelectorAll('.open-modal');
  const modalInner = document.getElementById('modalCarouselInner');
  const modalElement = document.getElementById('imageModal');
  const modal = modalElement ? new bootstrap.Modal(modalElement) : null;

  if (images.length && modalInner && modal) {
    images.forEach((img, index) => {
      img.addEventListener('click', () => {
        modalInner.innerHTML = '';
        images.forEach((el, i) => {
          const div = document.createElement('div');
          div.className = 'carousel-item' + (i === index ? ' active' : '');
          const image = document.createElement('img');
          image.src = el.src;
          image.className = 'd-block w-100 modal-img';
          image.alt = `Imagen ${i + 1}`;
          div.appendChild(image);
          modalInner.appendChild(div);
        });
        modal.show();
      });
    });
  }

  // CARRUSEL SCROLL
  const scrollContainer = document.querySelector('.habitaciones-scroll');
  document.getElementById('scrollLeft')?.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
  });
  document.getElementById('scrollRight')?.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
  });

  // BOTÓN DE SCROLL ARRIBA
  const scrollBtn = document.querySelector('.btn-scroll-up');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.style.display = 'flex';
    } else {
      scrollBtn.style.display = 'none';
    }
  });

  scrollBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // FORMULARIO CON FORMsubmit
  const form = document.getElementById("reservaForm");
  const alertBox = document.getElementById("form-alert");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(form);

      fetch("https://formsubmit.co/ajax/f5328e29da086beea2be9bb1341651ba", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
        .then(response => {
          if (response.ok) {
            alertBox.classList.remove("d-none");
            form.reset();
            setTimeout(() => {
              alertBox.classList.add("d-none");
            }, 5000);
          } else {
            alert("Hubo un error al enviar el mensaje.");
          }
        })
        .catch(error => {
          alert("No se pudo enviar el formulario. Intenta más tarde.");
        });
    });
  }

  // SISTEMA MULTILENGUAJE
  const langElements = document.querySelectorAll('[data-key]');
  const languageButton = document.getElementById('languageButton');
  const langOptions = document.querySelectorAll('.lang-option');

  function setLanguage(lang) {
    fetch('assets/lang/lang.json')
      .then(res => res.json())
      .then(data => {
        const tr = data[lang] || data['es'];

        langElements.forEach(el => {
          const key = el.getAttribute('data-key');
          if (tr[key]) el.textContent = tr[key];
        });

        const flag = lang === 'en' ? 'gb' : lang;
        if (languageButton) {
          languageButton.innerHTML = `
            <img id="selected-flag" src="assets/img/banderas/${flag}.png" width="20" class="me-2">
            ${lang.toUpperCase()}
          `;
        }

        langOptions.forEach(opt => {
          opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
        });

        localStorage.setItem('lang', lang);
      })
      .catch(err => console.error('Error cargando lang.json:', err));
  }

  const savedLang = localStorage.getItem('lang') || navigator.language.slice(0, 2);
const initialLang = ['es','en','de','it','zh'].includes(savedLang) ? savedLang : 'es';
  setLanguage(initialLang);

  langOptions.forEach(option => {
    option.addEventListener('click', e => {
      e.preventDefault();
      const newLang = option.getAttribute('data-lang');
      setLanguage(newLang);
    });
  });
});
