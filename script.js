// ========================================
// INICIALIZAR AOS ULTRA SMOOTH 120FPS
// ========================================
AOS.init({
  duration: 600,
  once: true,
  offset: 50,
  easing: "ease-out-quad",
  disable: false,
  startEvent: "DOMContentLoaded",
  useClassNames: false,
  disableMutationObserver: false,
  debounceDelay: 0,
  throttleDelay: 16,
  anchorPlacement: "top-bottom",
  mirror: false,
});

// ========================================
// OTIMIZADOR DE SCROLL 120FPS
// ========================================
let ticking = false;
let lastScrollY = 0;
let lastScrollTime = 0;
let isMobile = window.innerWidth <= 768;

window.addEventListener("resize", () => {
  isMobile = window.innerWidth <= 768;
});

function optimizedScroll() {
  const now = performance.now();

  // 120FPS = 8.33ms por frame
  if (now - lastScrollTime < 8.33) {
    return;
  }

  lastScrollY = window.pageYOffset;
  lastScrollTime = now;

  // NAVBAR
  const navbar = document.getElementById("navbar");
  if (navbar) {
    if (lastScrollY > 50) {
      navbar.classList.add("scrolled");
      navbar.style.transform = "translate3d(0, 0, 0)";
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  // PARALLAX NO HERO (DESABILITADO NO MOBILE)
  if (!isMobile) {
    const heroBg = document.getElementById("heroBg");
    if (heroBg && lastScrollY < window.innerHeight) {
      requestAnimationFrame(() => {
        heroBg.style.transform = `translate3d(0, ${lastScrollY * 0.5}px, 0)`;
      });
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
// MENU MOBILE (HAMBÚRGUER)
// ========================================
const menuToggle = document.querySelector(".menu-toggle");
const navbarMenu = document.querySelector(".navbar-menu");

if (menuToggle && navbarMenu) {
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navbarMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  // Fecha o menu ao clicar em um link
  document.querySelectorAll(".navbar-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      navbarMenu.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });

  // Fecha o menu ao clicar fora
  document.addEventListener("click", (e) => {
    if (!menuToggle.contains(e.target) && !navbarMenu.contains(e.target)) {
      navbarMenu.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });
}

// ========================================
// BOTÃO VOLTAR AO TOPO
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
      value: isMobile ? 35 : 55,
      density: { enable: true, value_area: 1200 },
    },
    color: {
      value: ["#E5A5B4", "#D4AF37", "#F2C6D3", "#C67B8F"],
    },
    shape: {
      type: ["circle", "edge"],
      stroke: {
        width: 0,
        color: "#E5A5B4",
      },
    },
    opacity: {
      value: 0.45,
      random: true,
      anim: {
        enable: true,
        speed: 0.6,
        opacity_min: 0.15,
        sync: false,
      },
    },
    size: {
      value: 4.5,
      random: true,
      anim: {
        enable: true,
        speed: 2.5,
        size_min: 1.5,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 190,
      color: "#E5A5B4",
      opacity: 0.4,
      width: 1.8,
      shadow: {
        enable: true,
        color: "#E5A5B4",
        blur: 6,
      },
    },
    move: {
      enable: true,
      speed: isMobile ? 0.9 : 1.3,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: true,
        rotateX: 650,
        rotateY: 1300,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: !isMobile,
        mode: ["grab", "bubble"],
      },
      onclick: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 220,
        line_linked: {
          opacity: 0.85,
        },
      },
      bubble: {
        distance: 220,
        size: 9,
        duration: 2.5,
        opacity: 0.9,
        speed: 3,
      },
      repulse: {
        distance: 180,
        duration: 0.5,
      },
      push: { particles_nb: 4 },
    },
  },
  retina_detect: true,
});

// ========================================
// DEPOIMENTOS ROTATIVOS
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
      cabelo: "Hair Salon",
    };

    const texto = `Olá! Gostaria de agendar um horário 💖\n\n*Nome:* ${nome}\n*Serviço:* ${
      servicoNomes[servico]
    }\n*Data:* ${data}\n*Horário:* ${hora}${
      mensagem ? `\n*Observações:* ${mensagem}` : ""
    }`;

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
// SCROLL SUAVE PARA ÂNCORAS
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
// FIX IMAGENS DA GALERIA (SEM LAZY LOADING)
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  // REMOVE lazy loading e força visibilidade
  const fixGalleryImages = () => {
    document.querySelectorAll(".gallery-item img").forEach((img) => {
      img.style.opacity = "1";
      img.style.visibility = "visible";
      img.removeAttribute("loading"); // Remove lazy
    });
  };

  // Executa imediatamente
  fixGalleryImages();

  // Executa depois de 100ms
  setTimeout(fixGalleryImages, 100);

  // Executa depois de 500ms (garantia)
  setTimeout(fixGalleryImages, 500);
});

// ========================================
// HARDWARE ACCELERATION
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
