// ========================================
// INICIALIZAR AOS (Animações on Scroll)
// ========================================
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

// ========================================
// NAVBAR TRANSPARENTE -> SÓLIDO NO SCROLL
// ========================================
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ========================================
// PARALLAX NO HERO
// ========================================
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroBg = document.getElementById("heroBg");
  if (heroBg) {
    heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// ========================================
// BOTÃO VOLTAR AO TOPO
// ========================================
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ========================================
// PARTICLES.JS (Partículas Conectadas)
// ========================================
particlesJS("particles-js", {
  particles: {
    number: {
      value: 80,
      density: { enable: true, value_area: 800 },
    },
    color: { value: "#B76E79" }, // Rose Gold
    shape: { type: "circle" },
    opacity: { value: 0.3, random: true },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#B76E79",
      opacity: 0.2,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
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
    text: "Profissionalismo e carinho em cada detalhe. O Studio Tainara Sousa é meu lugar favorito!",
    author: "Juliana Costa ⭐⭐⭐⭐⭐",
  },
  {
    text: "Amo demais! As unhas ficam perfeitas e a consultoria de moda é sensacional. Indico sempre!",
    author: "Camila Santos ⭐⭐⭐⭐⭐",
  },
];

let currentTestimonial = 0;

function updateTestimonial() {
  const testimonialEl = document.getElementById("testimonial");
  testimonialEl.style.opacity = "0";

  setTimeout(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    testimonialEl.innerHTML = `
      <p>${testimonials[currentTestimonial].text}</p>
      <div class="testimonial-author">- ${testimonials[currentTestimonial].author}</div>
    `;
    testimonialEl.style.opacity = "1";
  }, 500);
}

// Trocar depoimento a cada 6 segundos
setInterval(updateTestimonial, 6000);

// ========================================
// FORMULÁRIO DE AGENDAMENTO (WhatsApp)
// ========================================
document.getElementById("bookingForm").addEventListener("submit", function (e) {
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
    moda: "Consultoria de Moda",
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
  alert("Redirecionando para o WhatsApp! 💕");
});

// ========================================
// SCROLL SUAVE PARA ÂNCORAS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ========================================
// DEFINIR DATA MÍNIMA NO FORMULÁRIO
// ========================================
const today = new Date().toISOString().split("T")[0];
document.getElementById("data").setAttribute("min", today);
