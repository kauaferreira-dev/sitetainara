// ========================================
// INICIALIZAR AOS (Animações on Scroll) - OTIMIZADO
// ========================================
AOS.init({
  duration: 800,
  once: true,
  offset: 100,
  easing: "ease-out-cubic",
  disable: false,
  startEvent: "DOMContentLoaded",
  useClassNames: false,
  disableMutationObserver: false,
  debounceDelay: 50,
  throttleDelay: 99,
});

// ========================================
// OTIMIZADOR DE SCROLL GLOBAL (60-120FPS)
// ========================================
let ticking = false;
let lastScrollY = 0;
let lastScrollTime = 0;
let isMobile = window.innerWidth <= 768;

// Detecta redimensionamento
window.addEventListener("resize", () => {
  isMobile = window.innerWidth <= 768;
});

function optimizedScroll() {
  const now = performance.now();

  // Throttle para 60fps (16.67ms por frame)
  if (now - lastScrollTime < 16) {
    return;
  }

  lastScrollY = window.pageYOffset;
  lastScrollTime = now;

  // NAVBAR
  const navbar = document.getElementById("navbar");
  if (navbar) {
    if (lastScrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  // PARALLAX NO HERO (DESABILITADO NO MOBILE)
  if (!isMobile) {
    const heroBg = document.getElementById("heroBg");
    if (heroBg && lastScrollY < window.innerHeight) {
      heroBg.style.transform = `translate3d(0, ${lastScrollY * 0.5}px, 0)`;
    }
  }

  // BOTÃO VOLTAR AO TOPO
  const scrollTopBtn = document.getElementById("scrollTop");
  if (scrollTopBtn) {
    if (lastScrollY > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  }

  ticking = false;
}

// Event Listener com RequestAnimationFrame para 60-120fps
window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(optimizedScroll);
      ticking = true;
    }
  },
  { passive: true }
);

// ========================================
// MENU MOBILE (HAMBÚRGUER) - NOVO!
// ========================================
const menuToggle = document.querySelector('.menu-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

if (menuToggle && navbarMenu) {
  menuToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // Fecha o menu ao clicar em um link
  document.querySelectorAll('.navbar-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navbarMenu.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });

  // Fecha o menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navbarMenu.contains(e.target)) {
      navbarMenu.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });
}

// ========================================
// BOTÃO VOLTAR AO TOPO (SMOOTH)
// ========================================
const scrollTopBtn = document.getElementById("scrollTop");
if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ========================================
// PARTICLES.JS (OTIMIZADO PARA PERFORMANCE)
// ========================================
particlesJS("particles-js", {
  particles: {
    number: {
      value: isMobile ? 40 : 60,
      density: { enable: true, value_area: 1000 },
    },
    color: { value: "#E5A5B4" },
    shape: { type: "circle" },
    opacity: {
      value: 0.3,
      random: true,
      anim: {
        enable: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#E5A5B4",
      opacity: 0.2,
      width: 1,
    },
    move: {
      enable: true,
      speed: isMobile ? 1 : 1.5,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: !isMobile, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: { opacity: 0.5 },
      },
      push: { particles_nb: 3 },
    },
  },
  retina_detect: true,
});

// ========================================
// DEPOIMENTOS ROTATIVOS (OTIMIZADO)
// ========================================
const testimonials = [
  {
    text: "Simplesmente perfeito! A Tainara tem mãos de fada, minhas unhas ficaram lindas e duráveis. Super recomendo!",
    author: "Maria Silva ⭐⭐⭐⭐⭐",
  },
  {
    text: "Atendimento impecável e ambiente aconchegante. Me sinto sempre linda depois de cada visita!",
    author: "Ana Paula ⭐⭐⭐⭐⭐",
  },
  {
    text: "Profissionalismo e carinho em cada detalhe. O Ts Stilo é meu lugar favorito!",
    author: "Juliana Costa ⭐⭐⭐⭐⭐",
  },
  {
    text: "Amo demais! O cabelo fica perfeito e as unhas são impecáveis. Indico sempre!",
    author: "Camila Santos ⭐⭐⭐⭐⭐",
  },
];

let currentTestimonial = 0;

function updateTestimonial() {
  const testimonialEl = document.getElementById("testimonial");
  if (!testimonialEl) return;

  testimonialEl.style.opacity = "0";
  testimonialEl.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    testimonialEl.innerHTML = `
      <p>${testimonials[currentTestimonial].text}</p>
      <div class="testimonial-author">- ${testimonials[currentTestimonial].author}</div>
    `;

    void testimonialEl.offsetWidth;
    testimonialEl.style.opacity = "1";
  }, 500);
}

setInterval(updateTestimonial, 6000);

// ========================================
// FORMULÁRIO DE AGENDAMENTO (WhatsApp)
// ========================================
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const whatsapp = document.getElementById("whatsapp").value;
    const servico = document.getElementById("servico").value;
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;
    const mensagem = document.getElementById("mensagem").value;

    const servicoNomes = {
      unhas_gel: "Unhas em Gel",
      alongamento: "Alongamento Premium",
      nail_designer: "Nail Designer",
      manicure: "Manicure & Pedicure",
      cabelo: "Hair Designer",
      sobrancelha: "Design de Sobrancelhas",
    };

    const texto = `Olá! Gostaria de agendar um horário 💖\n\n*Nome:* ${nome}\n*Serviço:* ${
      servicoNomes[servico]
    }\n*Data:* ${data}\n*Horário:* ${hora}${
      mensagem ? `\n*Observações:* ${mensagem}` : ""
    }`;

    // ⚠️ MUDE O NÚMERO DO WHATSAPP AQUI! ⚠️
    const whatsappLink = `https://wa.me/5511999999999?text=${encodeURIComponent(
      texto
    )}`;

    window.open(whatsappLink, "_blank");

    const submitBtn = bookingForm.querySelector(".submit-button");
    if (submitBtn) {
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Abrindo WhatsApp...";
      submitBtn.style.background = "linear-gradient(135deg, #2ecc71, #27ae60)";

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = "";
      }, 2000);
    }
  });
}

// ========================================
// SCROLL SUAVE PARA ÂNCORAS (OTIMIZADO)
// ========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  });
});

// ========================================
// DEFINIR DATA MÍNIMA NO FORMULÁRIO
// ========================================
const dataInput = document.getElementById("data");
if (dataInput) {
  const today = new Date().toISOString().split("T")[0];
  dataInput.setAttribute("min", today);
}

// ========================================
// PERFORMANCE: LAZY LOADING PARA IMAGENS
// ========================================
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        img.classList.remove("lazy");
        observer.unobserve(img);
      }
    });
  });

  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach((img) => imageObserver.observe(img));
}

// ========================================
// PREVENÇÃO DE SCROLL JANK
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  if (!isMobile) {
    const animatedElements = document.querySelectorAll(
      ".service-card, .gallery-item, .cta-button"
    );
    animatedElements.forEach((el) => {
      el.style.willChange = "transform";
    });
  }
});
