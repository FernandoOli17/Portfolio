// Smooth scrolling para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 157, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animação de entrada para as seções
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.5s ease-out';
    observer.observe(section);
});

// Efeito de digitação para o código
function typeWriter(element, text, speed = 30) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar efeito de digitação aos elementos de código
document.querySelectorAll('.code-effect pre').forEach(element => {
    const originalText = element.textContent;
    element.textContent = '';
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter(element, originalText);
                observer.unobserve(element);
            }
        });
    });
    
    observer.observe(element);
});

// Efeito de hover para os cards
document.querySelectorAll('.experience-card, .skill-category').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 8px 30px rgba(0, 255, 157, 0.1)';
        card.style.borderColor = 'rgba(0, 255, 157, 0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        card.style.borderColor = 'rgba(0, 255, 157, 0.1)';
    });
});

// Efeito de cursor de código
const cursor = document.createElement('div');
cursor.className = 'code-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Adicionar estilo para o cursor
const style = document.createElement('style');
style.textContent = `
    .code-cursor {
        width: 20px;
        height: 20px;
        background: rgba(0, 255, 157, 0.2);
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s, background 0.3s;
        mix-blend-mode: difference;
    }
    
    a:hover ~ .code-cursor,
    button:hover ~ .code-cursor {
        width: 40px;
        height: 40px;
        background: rgba(0, 255, 157, 0.1);
    }
`;
document.head.appendChild(style);

// Efeito de partículas no fundo
const particlesContainer = document.createElement('div');
particlesContainer.className = 'particles';
document.body.appendChild(particlesContainer);

for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particlesContainer.appendChild(particle);
    
    // Posição aleatória
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + 'vh';
    
    // Tamanho aleatório
    const size = Math.random() * 3 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Animação aleatória
    particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
    particle.style.animationDelay = (Math.random() * 5) + 's';
}

// Adicionar estilo para as partículas
const particlesStyle = document.createElement('style');
particlesStyle.textContent = `
    .particles {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    }
    
    .particle {
        position: absolute;
        background: var(--primary-color);
        border-radius: 50%;
        opacity: 0.3;
        animation: float linear infinite;
    }
    
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        50% {
            opacity: 0.3;
        }
        100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particlesStyle);

// Adicione no início do arquivo
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Função para alternar o menu
    function toggleMenu() {
        navLinks.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    // Evento de clique no botão do menu
    menuToggle.addEventListener('click', toggleMenu);

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            toggleMenu();
        }
    });

    // Prevenir scroll quando o menu está aberto
    navLinks.addEventListener('touchmove', (e) => {
        if (navLinks.classList.contains('active')) {
            e.preventDefault();
        }
    }, { passive: false });
});