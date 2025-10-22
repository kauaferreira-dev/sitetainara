// ========================================
// INICIALIZAR AOS (Animações on Scroll) - OTIMIZADO
// ========================================
AOS.init({
  duration: 800,
  once: true,
  offset: 100,
  easing: 'ease-out-cubic',
  disable: false,
  startEvent: 'DOMContentLoaded',
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

  // PARALLAX NO HERO (só executa se estiver visível)
  const heroBg = document.getElementById("heroBg");
  if (heroBg && lastScrollY < window.innerHeight) {
    // Usa transform3d para aceleração de GPU
    heroBg.style.transform = `translate3d(0, ${lastScrollY * 0.5}px, 0)`;
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
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(optimizedScroll);
    ticking = true;
  }
}, { passive: true });

// ========================================
// BOTÃO VOLTAR AO TOPO (SMOOTH)
// ========================================
const scrollTopBtn = document.getElementById("scrollTop");
if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ 
      top: 0, 
      behavior: "smooth" 
    });
  });
}

// ========================================
// PARTICLES.JS (OTIMIZADO PARA PERFORMANCE)
// ========================================
particlesJS("particles-js", {
  particles: {
    number: {
      value: 60, // Reduzido de 80 para melhor performance
      density: { enable: true, value_area: 1000 },
    },
    color: { value: "#E5A5B4" }, // Rose Gold atualizado
    shape: { type: "circle" },
    opacity: { 
      value: 0.3, 
      random: true,
      anim: {
        enable: false // Desabilita animação de opacidade para performance
      }
    },
    size: { 
      value: 3, 
      random: true,
      anim: {
        enable: false // Desabilita animação de tamanho
      }
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
      speed: 1.5, // Reduzido para melhor performance
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
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: { opacity: 0.5 },
      },
      push: { particles_nb: 3 }, // Reduzido de 4
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
    text: "Profissionalismo e carinho em cada detalhe. O Studio Tainara Sousa é meu lugar favorito!",
    author: "Juliana Costa ⭐⭐⭐⭐⭐",
  },
  {
    text: "Amo demais! As unhas ficam perfeitas e o atendimento é sensacional. Indico sempre!",
    author: "Camila Santos ⭐⭐⭐⭐⭐",
  },
];

let currentTestimonial = 0;

function updateTestimonial() {
  const testimonialEl = document.getElementById("testimonial");
  if (!testimonialEl) return;
  
  // Usa transição CSS em vez de setTimeout para melhor performance
  testimonialEl.style.opacity = "0";
  testimonialEl.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    testimonialEl.innerHTML = `
      <p>${testimonials[currentTestimonial].text}</p>
      <div class="testimonial-author">- ${testimonials[currentTestimonial].author}</div>
    `;
    
    // Force reflow para garantir transição suave
    void testimonialEl.offsetWidth;
    testimonialEl.style.opacity = "1";
  }, 500);
}

// Trocar depoimento a cada 6 segundos
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
      unhas: "Unhas em Gel",
      alongamento: "Alongamento Premium",
      nailart: "Nail Art Exclusiva",
    };

    const texto = `Olá! Gostaria de agendar um horário 💖\n\n*Nome:* ${nome}\n*Serviço:* ${
      servicoNomes[servico]
    }\n*Data:* ${data}\n*Horário:* ${hora}${
      mensagem ? `\n*Observações:* ${mensagem}` : ""
    }`;

    // ⚠️ MUDE O NÚMERO DO WHATSAPP AQUI! ⚠️
    const whatsappLink = `https://wa.me/5511999999999?text=${encodeURIComponent(texto)}`;

    window.open(whatsappLink, "_blank");
    
    // Feedback visual melhor
    const submitBtn = bookingForm.querySelector('.submit-button');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Abrindo WhatsApp...";
    submitBtn.style.background = "linear-gradient(135deg, #2ecc71, #27ae60)";
    
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.background = "";
    }, 2000);
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
      // Scroll suave nativo otimizado
      target.scrollIntoView({ 
        behavior: "smooth", 
        block: "start",
        inline: "nearest" 
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
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach(img => imageObserver.observe(img));
}

// ========================================
// PREVENÇÃO DE SCROLL JANK
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  // Force hardware acceleration em elementos animados
  const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .cta-button');
  animatedElements.forEach(el => {
    el.style.willChange = 'transform';
  });
});

// ========================================
// DEBUG: MONITOR DE FPS (REMOVER EM PRODUÇÃO)
// ========================================
/*
let lastTime = performance.now();
let frames = 0;
function measureFPS() {
  const now = performance.now();
  frames++;
  if (now >= lastTime + 1000) {
    console.log(`FPS: ${Math.round((frames * 1000) / (now - lastTime))}`);
    frames = 0;
    lastTime = now;
  }
  requestAnimationFrame(measureFPS);
}
requestAnimationFrame(measureFPS);
*/
