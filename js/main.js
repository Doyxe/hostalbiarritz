document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.open-modal');
  const modalInner = document.getElementById('modalCarouselInner');
  const modalElement = document.getElementById('imageModal');
  const modal = new bootstrap.Modal(modalElement);

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
      scrollBtn.style.display = 'block';
    } else {
      scrollBtn.style.display = 'none';
    }
  });

  scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ENVÍO DE FORMULARIO CON FORMsubmit (sin redirección)
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
});
