// Espera o DOM carregar completamente
document.addEventListener("DOMContentLoaded", () => {
  // Novo efeito de cursor - mais suave e profissional
  const createCursorEffect = () => {
    // Remover os elementos antigos do cursor se existirem
    const oldCursor = document.querySelector(".cursor-dot")
    const oldCursorOutline = document.querySelector(".cursor-outline")

    if (oldCursor) oldCursor.remove()
    if (oldCursorOutline) oldCursorOutline.remove()

    // Criar novo container para o efeito de cursor
    const cursorEffect = document.createElement("div")
    cursorEffect.className = "cursor-effect"
    document.body.appendChild(cursorEffect)

    // Criar o cursor principal
    const cursor = document.createElement("div")
    cursor.className = "cursor"
    cursorEffect.appendChild(cursor)

    // Criar o rastro do cursor
    const cursorTrail = document.createElement("div")
    cursorTrail.className = "cursor-trail"
    cursorEffect.appendChild(cursorTrail)

    // Variáveis para animação suave
    let cursorX = 0
    let cursorY = 0
    let trailX = 0
    let trailY = 0

    // Função para atualizar a posição do cursor com animação suave
    const updateCursorPosition = () => {
      // Atualiza a posição do cursor principal com animação suave
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`

      // Atualiza a posição do rastro com um pequeno atraso
      trailX += (cursorX - trailX) * 0.2
      trailY += (cursorY - trailY) * 0.2
      cursorTrail.style.transform = `translate(${trailX}px, ${trailY}px)`

      requestAnimationFrame(updateCursorPosition)
    }

    // Iniciar a animação
    updateCursorPosition()

    // Atualizar as coordenadas do cursor quando o mouse se move
    document.addEventListener("mousemove", (e) => {
      cursorX = e.clientX
      cursorY = e.clientY
    })

    // Efeito hover para links e botões
    const interactiveElements = document.querySelectorAll(
      "a, button, .menu-toggle, .project-card, .skill-item, .social-links a",
    )

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursor.style.width = "0"
        cursor.style.height = "0"
        cursor.style.opacity = "0"
        cursorTrail.style.width = "50px"
        cursorTrail.style.height = "50px"
        cursorTrail.style.borderWidth = "3px"
        cursorTrail.style.opacity = "0.8"
      })

      element.addEventListener("mouseleave", () => {
        cursor.style.width = "8px"
        cursor.style.height = "8px"
        cursor.style.opacity = "1"
        cursorTrail.style.width = "24px"
        cursorTrail.style.height = "24px"
        cursorTrail.style.borderWidth = "2px"
        cursorTrail.style.opacity = "0.5"
      })
    })
  }
  // Detectar se é dispositivo móvel
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 768

  // Só criar o efeito de cursor em dispositivos não móveis
  if (!isMobile) {
    createCursorEffect()
  }

  // Melhorar o menu mobile
  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")
  const body = document.body

  // Criar botão de fechar menu
  const createCloseButton = () => {
    // Verificar se já existe
    if (document.querySelector(".menu-close")) return

    const closeButton = document.createElement("div")
    closeButton.className = "menu-close"
    closeButton.innerHTML = '<i class="fas fa-times"></i>'
    closeButton.addEventListener("click", toggleMenu)
    navLinks.appendChild(closeButton)
  }

  // Função para alternar o menu com animação
  function toggleMenu() {
    if (!navLinks.classList.contains("active")) {
      createCloseButton()
      navLinks.classList.add("active")
      body.style.overflow = "hidden"

      // Animar itens do menu
      const menuItems = navLinks.querySelectorAll("a")
      menuItems.forEach((item, index) => {
        item.style.opacity = "0"
        item.style.transform = "translateY(10px)"

        setTimeout(
          () => {
            item.style.transition = "all 0.3s ease"
            item.style.opacity = "1"
            item.style.transform = "translateY(0)"
          },
          100 + index * 50,
        )
      })
    } else {
      navLinks.classList.remove("active")
      body.style.overflow = ""
    }
  }

  // Evento de clique no botão do menu
  menuToggle.addEventListener("click", toggleMenu)

  // Fechar menu ao clicar em um link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        toggleMenu()
      }
    })
  })

  // Fechar menu ao clicar fora
  document.addEventListener("click", (e) => {
    if (navLinks.classList.contains("active") && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      toggleMenu()
    }
  })

  // Criar o efeito de cursor
  //createCursorEffect()

  // Menu mobile
  //const menuToggle = document.querySelector(".menu-toggle")
  //const navLinks = document.querySelector(".nav-links")
  //const body = document.body

  // Função para alternar o menu
  //function toggleMenu() {
  //  navLinks.classList.toggle("active")
  //  body.style.overflow = navLinks.classList.contains("active") ? "hidden" : ""
  //}

  // Evento de clique no botão do menu
  //menuToggle.addEventListener("click", toggleMenu)

  // Fechar menu ao clicar em um link
  //document.querySelectorAll(".nav-links a").forEach((link) => {
  //  link.addEventListener("click", () => {
  //    if (navLinks.classList.contains("active")) {
  //      toggleMenu()
  //    }
  //  })
  //})

  // Smooth scrolling para links de navegação
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = "rgba(15, 23, 42, 0.98)"
      navbar.style.boxShadow = "0 2px 20px rgba(58, 134, 255, 0.1)"
    } else {
      navbar.style.backgroundColor = "rgba(15, 23, 42, 0.95)"
      navbar.style.boxShadow = "none"
    }
  })

  // Animação de entrada para as seções
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
        observer.unobserve(entry.target) // Parar de observar após animar
      }
    })
  }, observerOptions)

  document.querySelectorAll(".section, .experience-card, .skill-category, .project-card").forEach((element) => {
    element.classList.add("fade-in")
    observer.observe(element)
  })

  // Aplicar efeito de digitação aos elementos de código
  document.querySelectorAll(".code-effect pre").forEach((element) => {
    const originalText = element.innerHTML
    element.textContent = ""

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          element.innerHTML = originalText
          observer.unobserve(element)
        }
      })
    })

    observer.observe(element)
  })

  // Animação das barras de progresso de habilidades
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBars = entry.target.querySelectorAll(".skill-progress")
          progressBars.forEach((bar) => {
            const width = bar.style.width
            bar.style.width = "0%"

            // Pequeno atraso para garantir que a animação seja visível
            setTimeout(() => {
              bar.style.width = width
            }, 100)
          })
          skillObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  document.querySelectorAll(".skills-list").forEach((skillList) => {
    skillObserver.observe(skillList)
  })

  // Melhorar o efeito de partículas para ser responsivo
  function createParticles(maxParticles = 100) {
    // Remover partículas existentes
    const existingContainer = document.querySelector(".particles-container")
    if (existingContainer) existingContainer.remove()

    const particlesContainer = document.createElement("div")
    particlesContainer.className = "particles-container"
    document.body.appendChild(particlesContainer)

    // Número de partículas baseado no tamanho da tela
    const screenSize = window.innerWidth * window.innerHeight
    const particleCount = Math.min(Math.floor(screenSize / 15000), maxParticles)

    for (let i = 0; i < particleCount; i++) {
      createParticle(particlesContainer)
    }

    // Atualizar partículas quando a janela for redimensionada
    window.addEventListener("resize", () => {
      // Limitar a frequência de atualização
      if (window.particleResizeTimeout) {
        clearTimeout(window.particleResizeTimeout)
      }

      window.particleResizeTimeout = setTimeout(() => {
        createParticles(maxParticles)
      }, 300)
    })
  }

  // Efeito de partículas no fundo
  //const createParticles = () => {
  //  const particlesContainer = document.createElement("div")
  //  particlesContainer.className = "particles-container"
  //  document.body.appendChild(particlesContainer)

  // Número de partículas baseado no tamanho da tela
  //  const particleCount = Math.min(window.innerWidth / 10, 100)

  //  for (let i = 0; i < particleCount; i++) {
  //    createParticle(particlesContainer)
  //  }
  //}

  //const createParticle = (container) => {
  //  const particle = document.createElement("div")
  //  particle.className = "particle"
  //  container.appendChild(particle)

  // Configurações aleatórias para cada partícula
  //  const size = Math.random() * 3 + 1
  //  const posX = Math.random() * window.innerWidth
  //  const posY = Math.random() * window.innerHeight
  //  const speedX = Math.random() * 0.5 - 0.25
  //  const speedY = Math.random() * 0.5 - 0.25
  //  const opacity = Math.random() * 0.3 + 0.1

  // Aplicar estilos
  //  particle.style.width = `${size}px`
  //  particle.style.height = `${size}px`
  //  particle.style.left = `${posX}px`
  //  particle.style.top = `${posY}px`
  //  particle.style.opacity = opacity

  // Animar a partícula
  //  let x = posX
  //  let y = posY

  //  const animateParticle = () => {
  //    x += speedX
  //    y += speedY

  // Verificar limites da tela
  //    if (x < 0 || x > window.innerWidth) {
  //      x = posX
  //    }

  //    if (y < 0 || y > window.innerHeight) {
  //      y = posY
  //    }

  //    particle.style.left = `${x}px`
  //    particle.style.top = `${y}px`

  //    requestAnimationFrame(animateParticle)
  //  }

  //  animateParticle()
  //}

  // Ativar o efeito de partículas
  //createParticles()

  // Criar o efeito de partículas com menos partículas em dispositivos de menor desempenho
  if (!isMobile) {
    createParticles(isMobile ? 20 : 100)
  }

  // Otimizar animações para dispositivos móveis
  const optimizeForMobile = () => {
    if (isMobile) {
      // Reduzir a quantidade de animações em dispositivos móveis
      document.querySelectorAll(".fade-in").forEach((el) => {
        el.style.transition = "opacity 0.4s ease-out, transform 0.4s ease-out"
      })

      // Melhorar o desempenho das barras de progresso
      document.querySelectorAll(".skill-progress").forEach((bar) => {
        bar.style.transition = "width 0.5s ease-out"
      })
    }
  }

  optimizeForMobile()

  // Detectar orientação da tela e ajustar layout
  const handleOrientationChange = () => {
    const isLandscape = window.innerWidth > window.innerHeight
    const heroContent = document.querySelector(".hero-content")

    if (isMobile && isLandscape) {
      heroContent.style.flexDirection = "row"
      heroContent.style.flexWrap = "wrap"
      heroContent.style.alignItems = "center"
    } else {
      heroContent.style.flexDirection = ""
      heroContent.style.flexWrap = ""
      heroContent.style.alignItems = ""
    }
  }

  window.addEventListener("resize", handleOrientationChange)
  window.addEventListener("orientationchange", handleOrientationChange)

  // Executar na inicialização
  handleOrientationChange()
})

// Modificar a função createParticle para melhor desempenho em mobile
const createParticle = (container) => {
  const particle = document.createElement("div")
  particle.className = "particle"
  container.appendChild(particle)

  // Configurações aleatórias para cada partícula
  const size = Math.random() * 2 + 1 // Tamanho menor para melhor desempenho
  const posX = Math.random() * window.innerWidth
  const posY = Math.random() * window.innerHeight

  // Velocidade mais lenta em dispositivos móveis
  const isMobile = window.innerWidth < 768
  const speedFactor = isMobile ? 0.3 : 1
  const speedX = (Math.random() * 0.5 - 0.25) * speedFactor
  const speedY = (Math.random() * 0.5 - 0.25) * speedFactor

  const opacity = Math.random() * 0.2 + 0.1

  // Aplicar estilos
  particle.style.width = `${size}px`
  particle.style.height = `${size}px`
  particle.style.left = `${posX}px`
  particle.style.top = `${posY}px`
  particle.style.opacity = opacity

  // Animar a partícula
  let x = posX
  let y = posY

  // Usar requestAnimationFrame com limitação de taxa para dispositivos móveis
  let lastTime = 0
  const fps = isMobile ? 30 : 60 // Menor FPS em dispositivos móveis
  const fpsInterval = 1000 / fps

  const animateParticle = (timestamp) => {
    // Limitar a taxa de quadros
    if (timestamp - lastTime < fpsInterval) {
      requestAnimationFrame(animateParticle)
      return
    }

    lastTime = timestamp

    x += speedX
    y += speedY

    // Verificar limites da tela
    if (x < 0 || x > window.innerWidth) {
      x = posX
    }

    if (y < 0 || y > window.innerHeight) {
      y = posY
    }

    particle.style.transform = `translate(${x - posX}px, ${y - posY}px)`

    requestAnimationFrame(animateParticle)
  }

  requestAnimationFrame(animateParticle)
}
