// Global Variables
let currentProject = 0
const mousePosition = { x: 0, y: 0 }
let isMobileDevice = false

// Project Data
const projects = [
  {
    title: "Lumenix-beamers",
    category: "Online Shop",
    year: "2025",
    image: "assets/coming-soon.jpg",
    video: "assets/Portfolio-coming-soon.mp4",
    description: "lumenixDescription",
    fullDescription: "lumenixFullDescription",
    services: [
      { icon: "code", label: "Web Development" },
      { icon: "palette", label: "UI/UX Design" },
      { icon: "search", label: "SEO Optimization" },
      { icon: "bar-chart", label: "Brand Identity" },
      { icon: "zap", label: "Performance Optimization" },
    ],
    results: ["lumenixResult1", "lumenixResult2", "lumenixResult3", "lumenixResult4"],
  },
  {
    title: "TractionMovies",
    category: "Creative Agency",
    year: "2025",
    image: "assets/coming-soon.jpg",
    video: "assets/Portfolio-coming-soon.mp4",
    description: "tractionMoviesDescription",
    fullDescription: "tractionMoviesFullDescription",
    services: [
      { icon: "smartphone", label: "Mobile First Approach" },
      { icon: "palette", label: "UI/UX Design" },
      { icon: "code", label: "Backend Development" },
      { icon: "zap", label: "Performance Optimization" },
    ],
    results: ["tractionMoviesResult1", "tractionMoviesResult2", "tractionMoviesResult3", "tractionMoviesResult4"],
  },
  {
    title: "LifeSciGrowth",
    category: "Coaching & Community",
    year: "2025",
    image: "assets/coming-soon.jpg",
    video: "assets/Portfolio-coming-soon.mp4",
    description: "lifeSciGrowthDescription",
    fullDescription: "lifeSciGrowthFullDescription",
    services: [
      { icon: "palette", label: "UI/UX Design" },
      { icon: "code", label: "Web Development" },
      { icon: "zap", label: "Interactive Design" },
      { icon: "search", label: "SEO Strategy" },
      { icon: "bar-chart", label: "Brand Identity" },
    ],
    results: ["lifeSciGrowthResult1", "lifeSciGrowthResult2", "lifeSciGrowthResult3", "lifeSciGrowthResult4"],
  },
]

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

// Initialize Application
function initializeApp() {
  detectMobileDevice()
  setupEventListeners()
  setupScrollAnimations()
  setupCursorFollower()
  setupMouseEffect()
  setupMobileMenuClickOutside()
  setupMobileMenuResize()
  setupProjectTileVideos()

  // Make updateModalTranslations available globally
  window.updateModalTranslations = updateModalTranslations
}

// Detect mobile device
function detectMobileDevice() {
  isMobileDevice =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth <= 768

  // Update on resize
  window.addEventListener("resize", () => {
    isMobileDevice =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth <= 768
  })
}

// Event Listeners
function setupEventListeners() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Close modals when clicking outside
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      closeProjectModal()
    }
  })

  // Keyboard navigation for modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProjectModal()
    }

    if (document.getElementById("projectModal").classList.contains("active")) {
      if (e.key === "ArrowLeft") {
        navigateProject("prev")
      } else if (e.key === "ArrowRight") {
        navigateProject("next")
      }
    }
  })
}

// Cursor Follower
function setupCursorFollower() {
  const cursor = document.querySelector(".cursor-follower")
  if (!cursor) return

  document.addEventListener("mousemove", (e) => {
    mousePosition.x = e.clientX
    mousePosition.y = e.clientY

    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"
  })

  // Scale cursor on scroll
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY
    const scale = scrollY > 100 ? 0.5 : 1
    cursor.style.transform = `translate(-50%, -50%) scale(${scale})`
  })
}

// Mouse Effect for Hero Background
function setupMouseEffect() {
  const heroSection = document.querySelector(".hero")
  const heroBg = document.querySelector(".hero-bg")

  if (!heroSection || !heroBg) return

  heroSection.addEventListener("mousemove", (e) => {
    const rect = heroSection.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    heroBg.style.setProperty("--mouse-x", `${x}%`)
    heroBg.style.setProperty("--mouse-y", `${y}%`)
  })
}

// Scroll Animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Observe all fade-in sections
  document.querySelectorAll(".fade-in-section").forEach((section) => {
    observer.observe(section)
  })
}

// Navigation Functions
function toggleMobileMenu() {
  const mobileNav = document.getElementById("mobileNav")
  const hamburger = document.querySelector(".mobile-menu-btn")

  if (!mobileNav || !hamburger) {
    console.log("Mobile menu elements not found")
    return
  }

  const isActive = mobileNav.classList.contains("active")

  if (isActive) {
    mobileNav.classList.remove("active")
    hamburger.classList.remove("active")
    document.body.style.overflow = "unset"
  } else {
    mobileNav.classList.add("active")
    hamburger.classList.add("active")
    document.body.style.overflow = "hidden"
  }
}

function closeMobileMenu() {
  const mobileNav = document.getElementById("mobileNav")
  const hamburger = document.querySelector(".mobile-menu-btn")

  if (mobileNav && hamburger) {
    mobileNav.classList.remove("active")
    hamburger.classList.remove("active")
    document.body.style.overflow = "unset"
  }
}

// Close mobile menu when clicking outside
function setupMobileMenuClickOutside() {
  document.addEventListener("click", (e) => {
    const mobileNav = document.getElementById("mobileNav")
    const hamburger = document.querySelector(".mobile-menu-btn")
    const isClickInsideNav = mobileNav && mobileNav.contains(e.target)
    const isClickOnHamburger = hamburger && hamburger.contains(e.target)

    if (mobileNav && mobileNav.classList.contains("active") && !isClickInsideNav && !isClickOnHamburger) {
      closeMobileMenu()
    }
  })
}

// Close mobile menu on window resize if it gets too large
function setupMobileMenuResize() {
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      closeMobileMenu()
    }
  })
}

function scrollToWork() {
  const workSection = document.getElementById("work")
  if (workSection) {
    workSection.scrollIntoView({ behavior: "smooth" })
  }
}

// Project Modal Functions
function openProjectModal(index) {
  currentProject = index
  const modal = document.getElementById("projectModal")
  const project = projects[index]

  // Block page scrolling
  document.body.style.overflow = "hidden"
  document.documentElement.style.overflow = "hidden"

  // Update modal content
  document.getElementById("modalTitle").textContent = project.title
  document.getElementById("modalSubtitle").textContent =
    `${window.t(project.category.toLowerCase().replace(/\s+/g, "").replace("&", ""))} • ${project.year}`
  document.getElementById("navIndicator").textContent = `${index + 1} of ${projects.length}`

  // Generate modal body content
  const modalBody = document.getElementById("modalBody")
  modalBody.innerHTML = generateProjectModalContent(project)

  // Show modal
  modal.classList.add("active")

  // Scroll modal to top
  scrollModalToTop()
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal")
  modal.classList.remove("active")

  // Restore page scrolling
  document.body.style.overflow = "unset"
  document.documentElement.style.overflow = "unset"

  // Exit fullscreen if active
  if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) {
    exitFullscreen()
  }
}

function navigateProject(direction) {
  const totalProjects = projects.length
  let newIndex

  if (direction === "next") {
    newIndex = currentProject === totalProjects - 1 ? 0 : currentProject + 1
  } else {
    newIndex = currentProject === 0 ? totalProjects - 1 : currentProject - 1
  }

  // Update current project index
  currentProject = newIndex
  const project = projects[newIndex]

  // Update modal content
  document.getElementById("modalTitle").textContent = project.title
  document.getElementById("modalSubtitle").textContent =
    `${window.t(project.category.toLowerCase().replace(/\s+/g, "").replace("&", ""))} • ${project.year}`
  document.getElementById("navIndicator").textContent = `${newIndex + 1} of ${projects.length}`

  // Generate new modal body content
  const modalBody = document.getElementById("modalBody")
  modalBody.innerHTML = generateProjectModalContent(project)

  // Scroll modal to top for clear navigation
  scrollModalToTop()
}

// Function to scroll modal body to top
function scrollModalToTop() {
  const modalBody = document.getElementById("modalBody")
  if (modalBody) {
    modalBody.scrollTop = 0
  }
}

function generateProjectModalContent(project) {
  const servicesHTML = project.services
    .map(
      (service) => `
        <div class="service-badge">
            <div class="service-badge-icon">
                ${getIconSVG(service.icon)}
            </div>
            <span class="service-badge-label">${window.t(service.label.toLowerCase().replace(/\s+/g, "").replace("/", "").replace("-", ""))}</span>
        </div>
    `,
    )
    .join("")

  const resultsHTML = project.results
    .map(
      (result) => `
        <div class="result-item">
            <div class="result-dot"></div>
            <span class="result-text">${window.t(result)}</span>
        </div>
    `,
    )
    .join("")

  return `
        <div class="project-video-container">
            <video 
                id="modalVideo" 
                class="project-video" 
                autoplay 
                muted 
                loop 
                playsinline
                poster="${project.image}"
                ${isMobileDevice ? "controls" : ""}
            >
                <source src="${project.video}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            ${
              !isMobileDevice
                ? `
            <div class="video-controls">
                <button class="sound-toggle" onclick="toggleVideoSound()" id="soundToggle" aria-label="${window.t("unmuteVideo")}">
                    <svg class="sound-off-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polygon points="11,5 6,9 2,9 2,15 6,15 11,19 11,5"/>
                        <line x1="23" y1="9" x2="17" y2="15"/>
                        <line x1="17" y1="9" x2="23" y2="15"/>
                    </svg>
                    <svg class="sound-on-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="display: none;">
                        <polygon points="11,5 6,9 2,9 2,15 6,15 11,19 11,5"/>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                    </svg>
                </button>
                <button class="play-pause-toggle" onclick="toggleVideoPlayback()" id="playPauseToggle" aria-label="${window.t("pauseVideo")}">
                    <svg class="pause-icon" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16"/>
                        <rect x="14" y="4" width="4" height="16"/>
                    </svg>
                    <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor" style="display: none;">
                        <polygon points="5,3 19,12 5,21"/>
                    </svg>
                </button>
                <button class="fullscreen-toggle" onclick="toggleFullscreen()" id="fullscreenToggle" aria-label="${window.t("enterFullscreen")}">
                    <svg class="fullscreen-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/>
                    </svg>
                </button>
            </div>
            `
                : `
            <div class="video-controls mobile-video-controls">
                <button class="fullscreen-toggle mobile-fullscreen-btn" onclick="toggleFullscreen()" id="fullscreenToggle" aria-label="${window.t("enterFullscreen")}">
                    <svg class="fullscreen-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/>
                    </svg>
                </button>
            </div>
            `
            }
        </div>
        
        <div class="project-overview">
            <h4>${window.t("projectOverview")}</h4>
            <p>${window.t(project.fullDescription)}</p>
        </div>
        
        <div class="services-provided">
            <h4>${window.t("servicesProvided")}</h4>
            <div class="services-grid-modal">
                ${servicesHTML}
            </div>
        </div>
        
        <div class="results-section">
            <h4>${window.t("resultsImpact")}</h4>
            <div class="results-grid">
                ${resultsHTML}
            </div>
        </div>
    `
}

// Video control functions
function toggleVideoSound() {
  const video = document.getElementById("modalVideo")
  const soundToggle = document.getElementById("soundToggle")

  if (!video || !soundToggle) return

  const soundOffIcon = soundToggle.querySelector(".sound-off-icon")
  const soundOnIcon = soundToggle.querySelector(".sound-on-icon")

  if (video.muted) {
    video.muted = false
    soundOffIcon.style.display = "none"
    soundOnIcon.style.display = "block"
    soundToggle.setAttribute("aria-label", window.t("muteVideo"))
  } else {
    video.muted = true
    soundOffIcon.style.display = "block"
    soundOnIcon.style.display = "none"
    soundToggle.setAttribute("aria-label", window.t("unmuteVideo"))
  }
}

function toggleVideoPlayback() {
  const video = document.getElementById("modalVideo")
  const playPauseToggle = document.getElementById("playPauseToggle")

  if (!video || !playPauseToggle) return

  const pauseIcon = playPauseToggle.querySelector(".pause-icon")
  const playIcon = playPauseToggle.querySelector(".play-icon")

  if (video.paused) {
    video.play()
    pauseIcon.style.display = "block"
    playIcon.style.display = "none"
    playPauseToggle.setAttribute("aria-label", window.t("pauseVideo"))
  } else {
    video.pause()
    pauseIcon.style.display = "none"
    playIcon.style.display = "block"
    playPauseToggle.setAttribute("aria-label", window.t("playVideo"))
  }
}

// Enhanced fullscreen functionality with mobile support
function toggleFullscreen() {
  const video = document.getElementById("modalVideo")
  const fullscreenBtn = document.getElementById("fullscreenToggle")

  if (!video || !fullscreenBtn) return

  // Check if already in fullscreen
  const isInFullscreen =
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement

  if (!isInFullscreen) {
    enterFullscreen(video, fullscreenBtn)
  } else {
    exitFullscreen(fullscreenBtn)
  }
}

function enterFullscreen(video, fullscreenBtn) {
  try {
    // For mobile devices, especially iOS
    if (isMobileDevice) {
      // iOS Safari specific fullscreen
      if (video.webkitEnterFullscreen && typeof video.webkitEnterFullscreen === "function") {
        video.webkitEnterFullscreen()
        updateFullscreenButton(fullscreenBtn, true)
        return
      }

      // For other mobile browsers that support requestFullscreen on video
      if (video.requestFullscreen) {
        video
          .requestFullscreen()
          .then(() => {
            updateFullscreenButton(fullscreenBtn, true)
          })
          .catch(handleFullscreenError)
        return
      }

      // Fallback for mobile: try container fullscreen
      const container = video.closest(".project-video-container")
      if (container && container.requestFullscreen) {
        container
          .requestFullscreen()
          .then(() => {
            updateFullscreenButton(fullscreenBtn, true)
          })
          .catch(handleFullscreenError)
        return
      }

      // Last resort: show message
      showFullscreenMessage()
      return
    }

    // Desktop fullscreen
    if (video.requestFullscreen) {
      video
        .requestFullscreen()
        .then(() => {
          updateFullscreenButton(fullscreenBtn, true)
        })
        .catch(handleFullscreenError)
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen()
      updateFullscreenButton(fullscreenBtn, true)
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen()
      updateFullscreenButton(fullscreenBtn, true)
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen()
      updateFullscreenButton(fullscreenBtn, true)
    } else {
      showFullscreenMessage()
    }
  } catch (error) {
    console.log("Fullscreen error:", error)
    handleFullscreenError(error)
  }
}

function exitFullscreen(fullscreenBtn) {
  try {
    if (document.exitFullscreen) {
      document.exitFullscreen().then(() => {
        updateFullscreenButton(fullscreenBtn, false)
      })
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
      updateFullscreenButton(fullscreenBtn, false)
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
      updateFullscreenButton(fullscreenBtn, false)
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
      updateFullscreenButton(fullscreenBtn, false)
    }
  } catch (error) {
    console.log("Exit fullscreen error:", error)
  }
}

function updateFullscreenButton(fullscreenBtn, isFullscreen) {
  if (!fullscreenBtn) return

  if (isFullscreen) {
    fullscreenBtn.innerHTML = `
      <svg class="fullscreen-exit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M16 21h3a2 2 0 0 1 2-2v-3"/>
      </svg>
    `
    fullscreenBtn.setAttribute("aria-label", window.t("exitFullscreen"))
  } else {
    fullscreenBtn.innerHTML = `
      <svg class="fullscreen-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/>
      </svg>
    `
    fullscreenBtn.setAttribute("aria-label", window.t("enterFullscreen"))
  }
}

function handleFullscreenError(error) {
  console.log("Fullscreen failed:", error)
  showFullscreenMessage()
}

function showFullscreenMessage() {
  // Create a temporary message for users
  const message = document.createElement("div")
  message.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 20px;
    border-radius: 8px;
    z-index: 10000;
    text-align: center;
    max-width: 300px;
    font-size: 14px;
  `
  message.innerHTML = `
    <p>${window.t("fullscreenNotSupported")}</p>
    <p>${window.t("rotateDevice")}</p>
    <button onclick="this.parentElement.remove()" style="margin-top: 10px; padding: 8px 16px; background: #8b5cf6; color: white; border: none; border-radius: 4px; cursor: pointer;">${window.t("ok")}</button>
  `
  document.body.appendChild(message)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (message.parentElement) {
      message.remove()
    }
  }, 5000)
}

// Add fullscreen event listeners
document.addEventListener("fullscreenchange", handleFullscreenChange)
document.addEventListener("webkitfullscreenchange", handleFullscreenChange)
document.addEventListener("mozfullscreenchange", handleFullscreenChange)
document.addEventListener("MSFullscreenChange", handleFullscreenChange)

function handleFullscreenChange() {
  const fullscreenBtn = document.getElementById("fullscreenToggle")
  const isInFullscreen =
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement

  if (fullscreenBtn) {
    updateFullscreenButton(fullscreenBtn, !!isInFullscreen)
  }
}

// Booking Modal Functions
function openBookingModal() {
  window.open("https://calendly.com/kjell-virtualcreators/30min", "_blank")
}

// Form Handlers
function handleContactSubmit(event) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const data = Object.fromEntries(formData)

  console.log("Contact form submitted:", data)
  alert(window.t("thankYouMessage"))

  event.target.reset()
}

// Update modal content when language changes
function updateModalTranslations() {
  const modal = document.getElementById("projectModal")
  if (modal && modal.classList.contains("active")) {
    // Re-generate modal content with new translations
    const project = projects[currentProject]
    document.getElementById("modalSubtitle").textContent =
      `${window.t(project.category.toLowerCase().replace(/\s+/g, "").replace("&", ""))} • ${project.year}`

    const modalBody = document.getElementById("modalBody")
    modalBody.innerHTML = generateProjectModalContent(project)
  }
}

// Utility Functions
function getIconSVG(iconName) {
  const icons = {
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg>',
    palette:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
    search:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',
    "bar-chart":
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
    zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/></svg>',
    smartphone:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
  }

  return icons[iconName] || icons["code"]
}

// Smooth scroll polyfill for older browsers
if (!("scrollBehavior" in document.documentElement.style)) {
  const script = document.createElement("script")
  script.src = "https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js"
  document.head.appendChild(script)
}

// Add video hover functionality for project tiles
function setupProjectTileVideos() {
  const projectImages = document.querySelectorAll(".project-image")

  projectImages.forEach((imageContainer, index) => {
    const video = document.createElement("video")
    video.className = "project-hover-video"
    video.muted = true
    video.loop = true
    video.playsInline = true
    video.preload = "metadata"

    const source = document.createElement("source")
    source.src = projects[index].video
    source.type = "video/mp4"
    video.appendChild(source)

    imageContainer.insertBefore(video, imageContainer.firstChild)

    imageContainer.addEventListener("mouseenter", () => {
      video.currentTime = 0
      video.play().catch((e) => console.log("Video play failed:", e))
      video.style.opacity = "1"
      imageContainer.querySelector(".project-img").style.opacity = "0"
    })

    imageContainer.addEventListener("mouseleave", () => {
      video.pause()
      video.currentTime = 0
      video.style.opacity = "0"
      imageContainer.querySelector(".project-img").style.opacity = "1"
    })
  })
}

// Make variables globally available for translations
window.projects = projects
window.currentProject = currentProject
window.generateProjectModalContent = generateProjectModalContent
