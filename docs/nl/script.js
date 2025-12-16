// Global Variables
let currentProject = 0
const mousePosition = { x: 0, y: 0 }
let isMobileDevice = false
let calendlyLoaded = false
// Removed: const currentLanguage = "en" // Declare currentLanguage variable

// Detect if we're in Dutch locale and set asset path prefix
const isDutchLocale = window.location.pathname.includes('/nl/')
const assetPathPrefix = isDutchLocale ? '../' : ''

// Performance optimization: Debounce function for scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Performance optimization: Throttle function for resize events
function throttle(func, limit) {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// PDF Portfolio Functions
// Project Data with enhanced video debugging
const projects = [
  {
    title: "Lumenix",
    category: "Online Shop",
    year: "2025",
    image: `${assetPathPrefix}assets/coming-soon.jpg`, // Make sure this matches your actual file
    video: `${assetPathPrefix}assets/Virtualcreators - Lumenix Web-Project.mp4`, // Desktop video
    mobileVideo: `${assetPathPrefix}assets/Virtualcreators - Lumenix Web-Project.mp4`, // Mobile video (using same file temporarily)
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
    review: {
      rating: 5,
      text: "lumenixReviewText",
      author: "lumenixReviewAuthor",
      company: "lumenixReviewCompany"
    }
  },
  {
    title: "TractionMovies",
    category: "Creative Agency",
    year: "2025",
    image: `${assetPathPrefix}assets/coming-soon.jpg`, // Make sure this matches your actual file
    video: `${assetPathPrefix}assets/Portfolio-coming-soon.mp4`, // Make sure this matches your actual file
    description: "tractionMoviesDescription",
    fullDescription: "tractionMoviesFullDescription",
    services: [
      { icon: "smartphone", label: "Mobile First Approach" },
      { icon: "palette", label: "UI/UX Design" },
      { icon: "code", label: "Web Development" },
      { icon: "zap", label: "Performance Optimization" },
    ],
    results: ["tractionMoviesResult1", "tractionMoviesResult2", "tractionMoviesResult3", "tractionMoviesResult4"],
    review: {
      rating: 5,
      text: "tractionMoviesReviewText",
      author: "tractionMoviesReviewAuthor",
      company: "tractionMoviesReviewCompany"
    }
  },
  {
    title: "LifeSciGrowth",
    category: "Coaching & Community",
    year: "2025",
    image: `${assetPathPrefix}assets/coming-soon.jpg`, // Make sure this matches your actual file
    video: `${assetPathPrefix}assets/Virtualcreators - Lifescigrowth Web-Project.mp4`, // Desktop video
    mobileVideo: `${assetPathPrefix}assets/Virtualcreators - Lifescigrowth Web-Project.mp4`, // Mobile video
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
    review: {
      rating: 5,
      text: "lifeSciGrowthReviewText",
      author: "lifeSciGrowthReviewAuthor",
      company: "lifeSciGrowthReviewCompany"
    }
  },
]

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Defer initialization to prevent forced reflows
  requestAnimationFrame(() => {
    initializeApp()
  })
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
  setupProjectCardModalLinks()
  setupScrollSpy()
  setupHeroGradientGlow()

  // Initialize Calendly with better error handling
  initializeCalendly()


  // Make updateModalTranslations available globally
  window.updateModalTranslations = updateModalTranslations

  // Add stacked scroll effect for cases
  stackedScrollCasesEffect()

  // Set min-height for perfect last card centering
  setStackedCasesMinHeight()
  window.addEventListener('resize', setStackedCasesMinHeight)
  
  // Initialize Spline background visibility
  initializeSplineBackground()
  
  // Initialize navigation link scramble effect
  setupNavLinkScramble()
}


// Enhanced Calendly initialization with multiple fallbacks
function initializeCalendly() {
  // Check if Calendly script is already loaded
  if (typeof window.Calendly !== "undefined") {
    calendlyLoaded = true
    return
  }

  // Method 1: Check if script tag exists and load if needed
  if (!document.querySelector('script[src*="calendly.com"]')) {
    loadCalendlyScript()
  }

  // Method 2: Polling check for Calendly availability
  let attempts = 0
  const maxAttempts = 50 // 10 seconds total

  const checkCalendly = () => {
    attempts++

    if (typeof window.Calendly !== "undefined") {
      calendlyLoaded = true
      return
    }

    if (attempts < maxAttempts) {
      setTimeout(checkCalendly, 200)
    } else {
      calendlyLoaded = false
    }
  }

  // Start checking
  setTimeout(checkCalendly, 100)
}

// Dynamically load Calendly script if not present
function loadCalendlyScript() {
  return new Promise((resolve, reject) => {
    // Load CSS first
    const cssLink = document.createElement("link")
    cssLink.href = "https://assets.calendly.com/assets/external/widget.css"
    cssLink.rel = "stylesheet"
    document.head.appendChild(cssLink)

    // Load JavaScript
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.type = "text/javascript"
    script.async = true

    script.onload = () => {
      calendlyLoaded = true
      resolve()
    }

    script.onerror = () => {
      calendlyLoaded = false
      reject(new Error("Failed to load Calendly script"))
    }

    document.head.appendChild(script)
  })
}

// Detect mobile device
// Cache for window dimensions to prevent forced reflows
let cachedWindowWidth = window.innerWidth
let cachedWindowHeight = window.innerHeight
let lastResizeTime = 0

function detectMobileDevice() {
  // Use cached width to prevent forced reflow
  isMobileDevice =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    cachedWindowWidth <= 768

  // Update on resize (throttled for performance with RAF)
  window.addEventListener("resize", throttle(() => {
    const now = Date.now()
    if (now - lastResizeTime < 16) return // Limit to 60fps
    lastResizeTime = now
    
    requestAnimationFrame(() => {
      cachedWindowWidth = window.innerWidth
      cachedWindowHeight = window.innerHeight
      isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        cachedWindowWidth <= 768
    })
  }, 250))
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

  // Setup Calendly button event listeners
  // document.querySelectorAll('[onclick*="openCalendlyPopup"]').forEach((button) => {
  //   button.addEventListener("click", (e) => {
  //     e.preventDefault()
  //     openCalendlyPopup()
  //   })
  // })

}

// Cursor Follower - Disabled to allow Spline's cursor follower to work
function setupCursorFollower() {
  const cursor = document.querySelector(".cursor-follower")
  if (!cursor) return

  // Hide the custom cursor follower completely to allow Spline's cursor follower to work
  cursor.style.display = "none"
}

// Mouse Effect for Hero Background and Blog Headers
function setupMouseEffect() {
  // Blog header mouse effect
  const blogHeader = document.querySelector(".blog-header")
  const blogHeaderBg = document.querySelector(".blog-header-bg")

  if (blogHeader && blogHeaderBg) {
    // Cache rect to prevent forced reflows
    let blogRect = null
    let lastBlogRectUpdate = 0
    
    const updateBlogRect = () => {
      const now = Date.now()
      if (now - lastBlogRectUpdate < 100) return // Update max every 100ms
      lastBlogRectUpdate = now
      blogRect = blogHeader.getBoundingClientRect()
    }
    
    // Initial rect
    requestAnimationFrame(updateBlogRect)
    
    blogHeader.addEventListener("mousemove", (e) => {
      if (!blogRect) updateBlogRect()
      
      const x = ((e.clientX - blogRect.left) / blogRect.width) * 100
      const y = ((e.clientY - blogRect.top) / blogRect.height) * 100

      blogHeaderBg.style.setProperty("--mouse-x", `${x}%`)
      blogHeaderBg.style.setProperty("--mouse-y", `${y}%`)
    })
    
    // Update rect on resize
    window.addEventListener("resize", throttle(updateBlogRect, 250))
  }

  // Blog post header mouse effect
  const blogPostHeader = document.querySelector(".blog-post-header")
  const blogPostHeaderBg = document.querySelector(".blog-post-header-bg")

  if (blogPostHeader && blogPostHeaderBg) {
    // Cache rect to prevent forced reflows
    let blogPostRect = null
    let lastBlogPostRectUpdate = 0
    
    const updateBlogPostRect = () => {
      const now = Date.now()
      if (now - lastBlogPostRectUpdate < 100) return // Update max every 100ms
      lastBlogPostRectUpdate = now
      blogPostRect = blogPostHeader.getBoundingClientRect()
    }
    
    // Initial rect
    requestAnimationFrame(updateBlogPostRect)
    
    blogPostHeader.addEventListener("mousemove", (e) => {
      if (!blogPostRect) updateBlogPostRect()
      
      const x = ((e.clientX - blogPostRect.left) / blogPostRect.width) * 100
      const y = ((e.clientY - blogPostRect.top) / blogPostRect.height) * 100

      blogPostHeaderBg.style.setProperty("--mouse-x", `${x}%`)
      blogPostHeaderBg.style.setProperty("--mouse-y", `${y}%`)
    })
    
    // Update rect on resize
    window.addEventListener("resize", throttle(updateBlogPostRect, 250))
  }
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
    return
  }

  const isActive = mobileNav.classList.contains("active")

  if (isActive) {
    mobileNav.classList.remove("active")
    hamburger.classList.remove("active")
    hamburger.setAttribute("aria-expanded", "false")
    document.body.style.overflow = "unset"
  } else {
    mobileNav.classList.add("active")
    hamburger.classList.add("active")
    hamburger.setAttribute("aria-expanded", "true")
    document.body.style.overflow = "hidden"
  }
}

function closeMobileMenu() {
  const mobileNav = document.getElementById("mobileNav")
  const hamburger = document.querySelector(".mobile-menu-btn")

  if (mobileNav && hamburger) {
    mobileNav.classList.remove("active")
    hamburger.classList.remove("active")
    hamburger.setAttribute("aria-expanded", "false")
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

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}

// Cache for section positions to prevent forced reflows
let sectionPositions = new Map()
let lastSectionUpdate = 0

function setupScrollSpy() {
  // Get all sections and navigation links
  const sections = document.querySelectorAll('section[id]')
  const navLinks = document.querySelectorAll('.nav-link')
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link')
  const backToTopBtn = document.querySelector('.back-to-top-btn')
  
  // Cache section positions to prevent forced reflows
  function updateSectionPositions() {
    const now = Date.now()
    if (now - lastSectionUpdate < 100) return // Update max every 100ms
    lastSectionUpdate = now
    
    // Defer DOM property reads to prevent forced reflows
    requestAnimationFrame(() => {
      sections.forEach(section => {
        const sectionId = section.getAttribute('id')
        sectionPositions.set(sectionId, {
          top: section.offsetTop,
          height: section.offsetHeight
        })
      })
    })
  }
  
  // Initial cache - defer to prevent forced reflows during initialization
  requestAnimationFrame(() => {
    updateSectionPositions()
  })
  
  // Function to update active navigation item
  function updateActiveNavItem(activeId) {
    // Remove active class from all navigation items except blog links
    navLinks.forEach(link => {
      const isBlogLink = link.getAttribute('data-translate') === 'blog' || link.textContent.trim() === 'Blog'
      if (!isBlogLink) {
        link.classList.remove('active')
      }
    })
    mobileNavLinks.forEach(link => {
      const isBlogLink = link.getAttribute('data-translate') === 'blog' || link.textContent.trim() === 'Blog'
      if (!isBlogLink) {
        link.classList.remove('active')
      }
    })
    
    // Add active class to current section's navigation items
    if (activeId) {
      const activeNavLink = document.querySelector(`.nav-link[href="#${activeId}"]`)
      const activeMobileNavLink = document.querySelector(`.mobile-nav-link[href="#${activeId}"]`)
      
      if (activeNavLink) {
        activeNavLink.classList.add('active')
      }
      if (activeMobileNavLink) {
        activeMobileNavLink.classList.add('active')
      }
    }
  }
  
  // Function to handle scroll events with RAF
  function handleScroll() {
    requestAnimationFrame(() => {
      const scrollPosition = window.scrollY + 100 // Add offset for better UX
      
      let currentSection = null
      
      // Update section positions if needed
      updateSectionPositions()
      
      // Find which section is currently in view using cached positions
      sections.forEach(section => {
        const sectionId = section.getAttribute('id')
        const position = sectionPositions.get(sectionId)
        
        if (position && scrollPosition >= position.top && scrollPosition < position.top + position.height) {
          currentSection = sectionId
        }
      })
    
    // Special handling for hero section (when at top of page)
    if (window.scrollY < 100) {
      currentSection = null // No section highlighted when at top
    }
    
    // Update active navigation item
    updateActiveNavItem(currentSection)
    
    // Show/hide back to top button
    if (backToTopBtn) {
      if (isMobileDevice) {
        // Check if we're on the homepage (has hero section)
        const heroSection = document.getElementById('hero')
        const isHomepage = !!heroSection
        
        if (isHomepage) {
          // On homepage mobile, only show when contact section is in view (original logic)
        const contactSection = document.getElementById('contact')
        if (contactSection) {
          const contactTop = contactSection.offsetTop
          const contactHeight = contactSection.offsetHeight
          const viewportHeight = window.innerHeight
          
          // Show button when contact section starts to come into view
          if (window.scrollY + viewportHeight >= contactTop) {
              backToTopBtn.classList.add('visible')
            } else {
              backToTopBtn.classList.remove('visible')
            }
          }
        } else {
          // On non-homepage mobile, show after scrolling 80% of page height
          const documentHeight = document.documentElement.scrollHeight
          const viewportHeight = window.innerHeight
          const scrollableHeight = documentHeight - viewportHeight
          const scrollPercentage = (window.scrollY / scrollableHeight) * 100
          
          if (scrollPercentage >= 80) {
            backToTopBtn.classList.add('visible')
          } else {
            backToTopBtn.classList.remove('visible')
          }
        }
      } else {
        // On desktop, show after scrolling 400px
        if (window.scrollY > 400) {
          backToTopBtn.classList.add('visible')
        } else {
          backToTopBtn.classList.remove('visible')
        }
      }
    }
    })
  }
  
  // Add scroll event listener with throttling for performance
  let isScrolling = false
  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        handleScroll()
        isScrolling = false
      })
      isScrolling = true
    }
  })
  
  // Run once on page load
  handleScroll()
}

// Enhanced Calendly Integration Function with multiple fallbacks
function openCalendlyPopup() {
  // Method 1: Try standard Calendly integration
  if (calendlyLoaded && typeof window.Calendly !== "undefined" && window.Calendly.initInlineWidget) {
    return openCalendlyInlineWidget()
  }

  // Method 2: Try Calendly popup widget
  if (calendlyLoaded && typeof window.Calendly !== "undefined" && window.Calendly.initPopupWidget) {
    return window.Calendly.initPopupWidget({
      url: "https://calendly.com/kjell-virtualcreators?primary_color=8b5cf6",
    })
  }

  // Method 3: Try to load Calendly and retry
  if (!calendlyLoaded) {
    loadCalendlyScript()
      .then(() => {
        setTimeout(() => openCalendlyPopup(), 500)
      })
      .catch(() => {
        openCalendlyFallback()
      })
    return
  }

  // Method 4: Fallback - open in new tab
  openCalendlyFallback()
}

// Original inline widget function
function openCalendlyInlineWidget() {
  // Create a subtle modal overlay
  const modalOverlay = document.createElement("div")
  modalOverlay.id = "calendly-modal-overlay"
  modalOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
  `

  // Create the Calendly container - elegant window size
  const calendlyContainer = document.createElement("div")
  calendlyContainer.id = "calendly-inline-widget"
  calendlyContainer.style.cssText = `
    width: 100%;
    max-width: 680px;
    height: 85vh;
    max-height: 700px;
    min-height: 600px;
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    transform: scale(0.95) translateY(20px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
  `

  // Create elegant header with calm purple accent
  const headerBar = document.createElement("div")
  headerBar.style.cssText = `
  height: 4px;
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
  width: 100%;
`

  // Create close button with modal-style design
  const closeButton = document.createElement("button")
  closeButton.innerHTML = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
`
  closeButton.style.cssText = `
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #f3f4f6;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
  transition: background-color 0.3s ease;
  color: #6b7280;
`
  closeButton.onmouseover = () => {
    closeButton.style.backgroundColor = "#e5e7eb"
  }
  closeButton.onmouseout = () => {
    closeButton.style.backgroundColor = "#f3f4f6"
  }

  // Create content container
  const contentContainer = document.createElement("div")
  contentContainer.style.cssText = `
  height: calc(100% - 4px);
  padding: 0;
  position: relative;
  overflow: hidden;
`

  // Close function with smooth animation
  const closeCalendly = () => {
    modalOverlay.style.opacity = "0"
    calendlyContainer.style.transform = "scale(0.95) translateY(20px)"
    setTimeout(() => {
      if (document.body.contains(modalOverlay)) {
        document.body.removeChild(modalOverlay)
      }
      document.body.style.overflow = "unset"
    }, 300)
  }

  closeButton.onclick = closeCalendly

  // Close on overlay click
  modalOverlay.onclick = (e) => {
    if (e.target === modalOverlay) {
      closeCalendly()
    }
  }

  // Close on escape key
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      closeCalendly()
      document.removeEventListener("keydown", handleEscape)
    }
  }
  document.addEventListener("keydown", handleEscape)

  // Assemble the modal
  calendlyContainer.appendChild(headerBar)
  calendlyContainer.appendChild(contentContainer)
  calendlyContainer.appendChild(closeButton)
  modalOverlay.appendChild(calendlyContainer)
  document.body.appendChild(modalOverlay)
  document.body.style.overflow = "hidden"

  // Smooth entrance animation
  setTimeout(() => {
    modalOverlay.style.opacity = "1"
    calendlyContainer.style.transform = "scale(1) translateY(0)"
  }, 10)

  // Initialize Calendly inline widget with better error handling
  try {
    window.Calendly.initInlineWidget({
      url:
        "https://calendly.com/kjell-virtualcreators?primary_color=8b5cf6&hide_gdpr_banner=1&embed_domain=" +
        window.location.hostname,
      parentElement: contentContainer,
      prefill: {},
      utm: {},
    })

    // Add subtle custom styling and ensure full width/height
    setTimeout(() => {
      addSubtleCalendlyStyles()
      // Ensure Calendly iframe fills the container completely
      const calendlyFrame = document.querySelector("#calendly-inline-widget iframe")
      if (calendlyFrame) {
        calendlyFrame.style.cssText = `
      width: 100% !important;
      height: 100% !important;
      border: none !important;
      margin: 0 !important;
      padding: 0 !important;
      display: block !important;
      background: white !important;
    `
      }
    }, 1000)
  } catch (error) {
    closeCalendly()
    openCalendlyFallback()
  }

  return false
}

// Fallback function for when Calendly fails to load
function openCalendlyFallback() {

  // Show a brief message to user
  const message = document.createElement("div")
  message.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, #ec4899, #8b5cf6);
    color: white;
    padding: 20px 30px;
    border-radius: 12px;
    z-index: 10000;
    text-align: center;
    font-size: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  `
  message.innerHTML = `
    <p>Opening scheduling in a new tab...</p>
  `
  document.body.appendChild(message)

  // Open Calendly in new tab
  window.open("https://calendly.com/kjell-virtualcreators", "_blank")

  // Remove message after 2 seconds
  setTimeout(() => {
    if (message.parentElement) {
      message.remove()
    }
  }, 2000)
}

// Function to add subtle custom styles to Calendly widget
function addSubtleCalendlyStyles() {
  const calendlyFrame = document.querySelector("#calendly-inline-widget iframe")
  if (calendlyFrame) {
    try {
      calendlyFrame.onload = () => {
        try {
          const frameDoc = calendlyFrame.contentDocument || calendlyFrame.contentWindow.document

          const customStyles = document.createElement("style")
          customStyles.textContent = `
            /* AGGRESSIVE padding/margin removal */
            * {
              margin: 0 !important;
              padding: 0 !important;
              box-sizing: border-box !important;
            }
            
            body, html {
              margin: 0 !important;
              padding: 0 !important;
              overflow-x: hidden !important;
              height: 100% !important;
              width: 100% !important;
            }
            
            /* Target all possible Calendly containers */
            [data-testid="event-type-page"],
            .calendly-popup-content,
            .calendly-inline-widget,
            .calendly-wrapper,
            .calendly-container,
            .calendly-content,
            .calendly-page,
            .calendly-event-type-page,
            .calendly-scheduling-page,
            .calendly-main-content,
            .calendly-page-wrapper,
            div[class*="calendly"],
            section[class*="calendly"] {
              margin: 0 !important;
              padding: 0 !important;
              border: none !important;
              width: 100% !important;
              max-width: none !important;
            }
            
            /* Force full width on main content areas */
            .calendly-popup-content,
            .calendly-main-content {
              width: 100% !important;
              max-width: none !important;
              padding: 15px !important;
              box-sizing: border-box !important;
              height: 100% !important;
            }
            
            /* Remove any wrapper margins */
            .calendly-page-wrapper,
            .calendly-scheduling-page {
              margin: 0 !important;
              padding: 0 !important;
              width: 100% !important;
              height: 100% !important;
            }
            
            /* Calm purple styling for primary buttons */
            button[data-testid="confirm-button"],
            button[type="submit"],
            .calendly-btn-primary {
              background: #8b5cf6 !important;
              border: none !important;
              transition: all 0.2s ease !important;
              border-radius: 8px !important;
            }
            
            button[data-testid="confirm-button"]:hover,
            button[type="submit"]:hover,
            .calendly-btn-primary:hover {
              background: #7c3aed !important;
              transform: translateY(-1px) !important;
              box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3) !important;
            }
            
            /* Subtle hover effects for time slots with calm purple */
            [data-testid="time-button"]:hover,
            .calendly-time-button:hover {
              background: rgba(139, 92, 246, 0.08) !important;
              border-color: rgba(139, 92, 246, 0.3) !important;
              transition: all 0.2s ease !important;
            }
            
            /* Selected time slot with calm purple */
            [data-testid="time-button"][aria-pressed="true"],
            .calendly-time-button.selected {
              background: #8b5cf6 !important;
              color: white !important;
              border-color: #8b5cf6 !important;
            }
            
            /* Calm purple focus states */
            input:focus,
            select:focus,
            textarea:focus {
              border-color: #8b5cf6 !important;
              box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1) !important;
              outline: none !important;
            }
            
            /* Style the calendar navigation with calm purple */
            button[data-testid="calendar-nav-button"]:hover {
              background: rgba(139, 92, 246, 0.1) !important;
            }
            
            /* Calendar date selection */
            [data-testid="calendar-date-button"]:hover {
              background: rgba(139, 92, 246, 0.1) !important;
            }
            
            [data-testid="calendar-date-button"][aria-pressed="true"] {
              background: #8b5cf6 !important;
              color: white !important;
            }
            
            /* Progress indicators and active states */
            .calendly-progress-bar,
            .calendly-step-indicator.active {
              background: #8b5cf6 !important;
            }
            
            /* Links and interactive text */
            a, .calendly-link {
              color: #8b5cf6 !important;
            }
            
            a:hover, .calendly-link:hover {
              color: #7c3aed !important;
            }
          `

          frameDoc.head.appendChild(customStyles)

          // Also try to directly manipulate the DOM
          setTimeout(() => {
            const allElements = frameDoc.querySelectorAll("*")
            allElements.forEach((el) => {
              if (el.style) {
                el.style.margin = "0"
                el.style.padding = "0"
              }
            })
          }, 500)
        } catch (e) {
          // Could not access iframe content for styling
        }
      }
    } catch (e) {
      // Could not style Calendly iframe
    }
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

  // Review Section
  let reviewHTML = ""
  if (project.review) {
    const stars = Array.from({ length: 5 }, (_, i) =>
      i < project.review.rating
        ? '<span class="star filled">&#9733;</span>'
        : '<span class="star">&#9734;</span>'
    ).join("")
    reviewHTML = `
      <div class="client-review-section">
        <h4>${window.t("clientReview")}</h4>
        <div class="review-section">
          <div class="review-stars">${stars}</div>
          <div class="review-text">"${window.t(project.review.text)}"</div>
          <div class="review-author">
            <span class="review-author-name">${window.t(project.review.author)}</span>, <span class="review-author-company">${getCompanyLink(project)}</span>
          </div>
        </div>
      </div>
    `
  }

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
                onerror="handleVideoError(this)"
            >
                <source src="${isMobileDevice && project.mobileVideo ? project.mobileVideo : project.video}" type="video/mp4">
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
            <div class="project-description-content">${window.t(project.fullDescription).replace(/\n\n/g, '</p><p>').replace(/^/, '<p>').replace(/$/, '</p>')}</div>
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
        ${reviewHTML}
    `
}

// Enhanced video error handling
function handleVideoError(videoElement) {

  // Show fallback image
  const container = videoElement.closest(".project-video-container")
  if (container) {
    videoElement.style.display = "none"

    // Create fallback message
    const fallback = document.createElement("div")
    fallback.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: #6b7280;
      font-size: 14px;
    `
    fallback.innerHTML = `
      <p>Video temporarily unavailable</p>
      <p style="font-size: 12px; margin-top: 8px;">Please check back later</p>
    `
    container.appendChild(fallback)
  }
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
    // Exit fullscreen error handled silently
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

// Track form load time for anti-spam protection
let formLoadTime = Date.now()

// Enhanced Form Handlers with Formspree Integration
function handleContactSubmit(event) {
  event.preventDefault()

  const form = event.target
  const submitButton = form.querySelector('button[type="submit"]')
  const buttonText = submitButton.querySelector(".btn-text")
  const buttonLoading = submitButton.querySelector(".btn-loading")

  // Check honeypot fields for spam protection
  const honeypotField = form.querySelector('input[name="website"]')
  const formspreeHoneypot = form.querySelector('input[name="_gotcha"]')
  
  if ((honeypotField && honeypotField.value.trim() !== '') || 
      (formspreeHoneypot && formspreeHoneypot.value.trim() !== '')) {
    // Spam detected - silently reject the submission
    console.log('🛡️ Spam submission blocked by honeypot field')
    
    // Show fake success message to confuse bots
    showFormMessage(window.t("thankYouMessage"), "success")
    form.reset()
    return false
  }

  // Check if form was submitted too quickly (likely a bot)
  const timeSinceLoad = Date.now() - formLoadTime
  if (timeSinceLoad < 3000) { // Less than 3 seconds
    console.log('🛡️ Spam submission blocked - too fast submission')
    
    // Show fake success message to confuse bots
    showFormMessage(window.t("thankYouMessage"), "success")
    form.reset()
    return false
  }

  // Rate limiting - prevent multiple submissions within 60 seconds
  const lastSubmissionTime = localStorage.getItem('lastFormSubmission')
  const currentTime = Date.now()
  if (lastSubmissionTime && (currentTime - parseInt(lastSubmissionTime)) < 60000) {
    console.log('🛡️ Rate limit exceeded - too many submissions')
    showFormMessage(window.t("rateLimitMessage"), "error")
    return false
  }

  // Update language field with current language
  const languageField = document.getElementById("formLanguage")
  if (languageField) {
    languageField.value = window.currentLanguage || "en"
  }

  // Show loading state
  if (buttonText && buttonLoading) {
    buttonText.style.display = "none"
    buttonLoading.style.display = "inline"
  }
  submitButton.disabled = true

  // Create FormData object
  const formData = new FormData(form)

  // Submit to Formspree
  fetch(form.action, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        // Success - record submission time for rate limiting
        localStorage.setItem('lastFormSubmission', currentTime.toString())
        showFormMessage(window.t("thankYouMessage"), "success")
        form.reset()
      } else {
        // Error from Formspree
        response.json().then((data) => {
          if (data.errors) {
            showFormMessage("There was an error with your submission. Please try again.", "error")
          } else {
            // Even on Formspree errors, we treat as success for UX
            localStorage.setItem('lastFormSubmission', currentTime.toString())
            showFormMessage(window.t("thankYouMessage"), "success")
            form.reset()
          }
        })
      }
    })
    .catch((error) => {
      console.error("Form submission error:", error)
      showFormMessage("There was an error sending your message. Please try again.", "error")
    })
    .finally(() => {
      // Reset button state
      if (buttonText && buttonLoading) {
        buttonText.style.display = "inline"
        buttonLoading.style.display = "none"
      }
      submitButton.disabled = false
    })
}

// Show form submission message
function showFormMessage(message, type) {
  // Remove any existing message
  const existingMessage = document.querySelector(".form-message")
  if (existingMessage) {
    existingMessage.remove()
  }

  // Create new message
  const messageDiv = document.createElement("div")
  messageDiv.className = `form-message form-message-${type}`
  messageDiv.style.cssText = `
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    text-align: center;
    font-size: 0.875rem;
    ${
      type === "success"
        ? "background-color: #f0fdf4; color: #166534; border: 1px solid #bbf7d0;"
        : "background-color: #fef2f2; color: #dc2626; border: 1px solid #fecaca;"
    }
  `
  messageDiv.textContent = message

  // Add message after the form
  const form = document.querySelector(".contact-form")
  if (form) {
    form.appendChild(messageDiv)

    // Auto-remove success messages after 5 seconds
    if (type === "success") {
      setTimeout(() => {
        if (messageDiv.parentElement) {
          messageDiv.remove()
        }
      }, 5000)
    }
  }
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

// Helper function to get the company website link for each project
function getCompanyLink(project) {
  let url = "#";
  switch (project.title) {
    case "Lumenix":
      url = "https://www.lumenix-beamers.nl";
      break;
    case "TractionMovies":
      url = "https://tractionmovies.com";
      break;
    case "LifeSciGrowth":
      url = "https://lifescigrowth.com";
      break;
    default:
      url = "#";
  }
  return `<a href="${url}" target="_blank" rel="noopener">${window.t(project.review.company)}</a>`;
}

// Smooth scroll polyfill for older browsers
if (!("scrollBehavior" in document.documentElement.style)) {
  const script = document.createElement("script")
  script.src = "https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js"
  document.head.appendChild(script)
}

// Enhanced video hover functionality for project tiles with error handling
function setupProjectTileVideos() {
  const projectImages = document.querySelectorAll(".project-image")

  projectImages.forEach((imageContainer, index) => {
    const video = document.createElement("video")
    video.className = "project-hover-video"
    video.muted = true
    video.loop = true
    video.playsInline = true
    video.preload = "none"

    const source = document.createElement("source")
    source.src = isMobileDevice && projects[index].mobileVideo ? projects[index].mobileVideo : projects[index].video
    source.type = "video/mp4"
    video.appendChild(source)

    // Add error handling for hover videos
    video.onerror = () => {
      video.style.display = "none"
    }

    imageContainer.insertBefore(video, imageContainer.firstChild)

    imageContainer.addEventListener("mouseenter", () => {
      if (video.style.display !== "none") {
        // Load video only when needed
        if (video.preload === "none") {
          video.preload = "metadata"
          video.load()
        }
        video.currentTime = 0
        video.play().catch((e) => {
          video.style.display = "none"
        })
        video.style.opacity = "1"
        imageContainer.querySelector(".project-img").style.opacity = "0"
      }
    })

    imageContainer.addEventListener("mouseleave", () => {
      if (video.style.display !== "none") {
        video.pause()
        video.currentTime = 0
        video.style.opacity = "0"
        imageContainer.querySelector(".project-img").style.opacity = "1"
      }
    })
  })
}

function setupProjectCardModalLinks() {
  const projectList = document.querySelector('.projects-list.stacked-scroll');
  if (!projectList) return;
  const items = Array.from(projectList.querySelectorAll('.project-item'));
  items.forEach((item, index) => {
    // Project Title
    const title = item.querySelector('.project-title');
    if (title) {
      title.style.cursor = 'pointer';
      title.addEventListener('click', (e) => {
        e.stopPropagation();
        openProjectModal(index);
      });
    }
    // Project Image
    const image = item.querySelector('.project-image');
    if (image) {
      image.addEventListener('click', (e) => {
        e.stopPropagation();
        openProjectModal(index);
      });
    }
    // View Project Button
    const btn = item.querySelector('.project-link');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openProjectModal(index);
      });
    }
  });
}

// Add stacked scroll effect for cases section
// Cache for stacked scroll effect to prevent forced reflows
let cachedViewportHeight = window.innerHeight
let cachedViewportWidth = window.innerWidth
let cachedCardHeight = 0
let cachedListTop = 0
let lastStackedUpdate = 0

function stackedScrollCasesEffect() {
  const list = document.querySelector('.projects-list.stacked-scroll')
  if (!list) return
  const items = Array.from(list.querySelectorAll('.stacked-scroll-item'))
  if (items.length < 2) return

  function animate() {
    const now = Date.now()
    if (now - lastStackedUpdate < 16) return // Limit to 60fps
    lastStackedUpdate = now
    
    requestAnimationFrame(() => {
      // Use cached dimensions to prevent forced reflows
      const viewportHeight = cachedViewportHeight
      const isMobile = cachedViewportWidth <= 1023
      const isSmallMobile = cachedViewportWidth <= 640
      const isVerySmallMobile = cachedViewportWidth <= 414 && cachedViewportHeight >= 800
    
    // Dynamic sticky offset based on screen size for better visibility
    let stickyOffset = 0
    if (isMobile) {
      if (isVerySmallMobile) {
        stickyOffset = 6 * 16 // 6rem for iPhone XR and similar
      } else if (isSmallMobile) {
        stickyOffset = 6.5 * 16 // 6.5rem for small mobile devices
      } else {
        stickyOffset = 7 * 16 // 7rem for regular mobile/tablet
      }
    }
      // Cache expensive calculations
      if (cachedCardHeight === 0) {
        cachedCardHeight = items[0].offsetHeight
      }
      if (cachedListTop === 0) {
        const listRect = list.getBoundingClientRect()
        cachedListTop = listRect.top + window.scrollY
      }
      
      const listTop = cachedListTop
      const cardHeight = cachedCardHeight
      const scrollY = window.scrollY
      // On mobile, center is lower to leave space for navbar
      const centerY = isMobile
        ? scrollY + stickyOffset + cardHeight / 2
        : scrollY + viewportHeight / 2

      // Z-index logic (different for mobile)
      if (isMobile) {
        // On mobile, always stack later cards above earlier ones
        items.forEach((item, i) => {
          item.style.zIndex = 100 + i;
        });
      } else {
        // Desktop/tablet: closest to center gets highest z-index
        const indexed = items.map((item, i) => {
          const cardTop = listTop + i * cardHeight
          const cardCenter = cardTop + cardHeight / 2
          const distToCenter = Math.abs(cardCenter - centerY)
          return { item, i, distToCenter }
        })
        indexed.sort((a, b) => a.distToCenter - b.distToCenter)
        indexed.forEach((entry, idx) => {
          entry.item.style.zIndex = 100 - idx
        })
      }

      // Transform/opacity logic
      items.forEach((item, i) => {
        const cardTop = listTop + i * cardHeight
        const cardCenter = cardTop + cardHeight / 2
        const distToCenter = cardCenter - centerY
        let isActive = Math.abs(distToCenter) < cardHeight / 2
        let isLast = i === items.length - 1
        let isFirst = i === 0
        if (isLast && distToCenter <= 0) {
          item.style.transform = 'translateY(-50%) scale(1)';
          item.style.opacity = 1;
        } else if (isFirst && distToCenter >= 0) {
          item.style.transform = 'translateY(-50%) scale(1)';
          item.style.opacity = 1;
        } else if (isActive) {
          item.style.transform = 'translateY(-50%) scale(1)';
          item.style.opacity = 1;
        } else if (distToCenter < 0) {
          item.style.transform = `translateY(-60%) scale(0.96)`;
          item.style.opacity = 1;
        } else {
          item.style.transform = `translateY(0%) scale(0.96)`;
          item.style.opacity = 1;
        }
      })
    })
  }
  window.addEventListener('scroll', throttle(animate, 16), { passive: true })
  window.addEventListener('resize', throttle(animate, 250))
  animate()
}

// Dynamically set min-height for stacked cases section
function setStackedCasesMinHeight() {
  const list = document.querySelector('.projects-list.stacked-3d')
  if (!list) return
  const items = list.querySelectorAll('.stacked-scroll-item')
  if (items.length === 0) return
  const cardHeight = items[0].offsetHeight
  // Subtract half a card height to reduce blank space after last card
  const minHeight = (items.length - 1) * cardHeight + window.innerHeight - 0.5 * cardHeight
  list.style.minHeight = minHeight + 'px'
}

// Make variables globally available for translations
window.projects = projects
window.currentProject = currentProject
window.generateProjectModalContent = generateProjectModalContent

// Hero Gradient Glow Fade Effect
function setupHeroGradientGlow() {
  const heroSection = document.querySelector('.hero')
  const gradientGlow = document.querySelector('.hero-gradient-glow')
  
  if (!heroSection || !gradientGlow) {
    return
  }
  
  function updateGradientGlow() {
    const heroRect = heroSection.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const scrollY = window.scrollY
    
    // Start fading immediately when user starts scrolling down
    // Fully fade when user has scrolled past a certain point (e.g., 200px)
    // This ensures the glow disappears before the next section appears
    const fadeStartPoint = 0 // Start fading immediately
    const fadeEndPoint = 300 // Fully faded after scrolling 300px
    
    let opacity = 1
    
    if (scrollY > fadeStartPoint) {
      // Calculate fade progress (0 = fully visible, 1 = fully faded)
      const fadeProgress = Math.min(1, (scrollY - fadeStartPoint) / (fadeEndPoint - fadeStartPoint))
      opacity = 1 - fadeProgress
    }
    
    // Ensure opacity is between 0 and 1
    opacity = Math.max(0, Math.min(1, opacity))
    
    gradientGlow.style.opacity = opacity
  }
  
  // Update on scroll with throttling
  let isScrolling = false
  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        updateGradientGlow()
        isScrolling = false
      })
      isScrolling = true
    }
  }, { passive: true })
  
  // Initial update
  updateGradientGlow()
}

// FAQ Toggle Function
function toggleFAQ(button) {
  const faqItem = button.closest('.faq-item')
  const isActive = faqItem.classList.contains('active')
  
  // Close all other FAQ items
  document.querySelectorAll('.faq-item').forEach(item => {
    if (item !== faqItem) {
      item.classList.remove('active')
    }
  })
  
  // Toggle current item
  if (isActive) {
    faqItem.classList.remove('active')
  } else {
    faqItem.classList.add('active')
  }
}

// Make functions globally available - CRITICAL for HTML onclick handlers
window.openCalendlyPopup = openCalendlyPopup
window.toggleMobileMenu = toggleMobileMenu
window.closeMobileMenu = closeMobileMenu
window.scrollToWork = scrollToWork
window.openProjectModal = openProjectModal
window.closeProjectModal = closeProjectModal
window.navigateProject = navigateProject
window.toggleVideoSound = toggleVideoSound
window.toggleVideoPlayback = toggleVideoPlayback
window.toggleFullscreen = toggleFullscreen
window.handleContactSubmit = handleContactSubmit
window.handleVideoError = handleVideoError
window.toggleFAQ = toggleFAQ

// Initialize Spline background visibility to prevent flash
function initializeSplineBackground() {
  const splineBackground = document.querySelector('.spline-background')
  if (!splineBackground) return
  
  // Function to show the Spline background
  function showSpline() {
    // Remove inline styles that might be blocking
    splineBackground.style.visibility = ''
    splineBackground.style.opacity = ''
    // Add loaded class to trigger CSS transition
    splineBackground.classList.add('loaded')
  }
  
  // Show after a delay to ensure CSS is loaded and page is stable
  // Longer delay helps prevent flash during language switches
  setTimeout(showSpline, 500)
  
  // Fallback: also show on window load in case the first attempt didn't work
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (!splineBackground.classList.contains('loaded')) {
        showSpline()
      }
    }, 300)
  }, { once: true })
}

// Navigation Link Scramble Effect
function setupNavLinkScramble() {
  const navLinks = document.querySelectorAll('.nav-link')
  const CYCLES_PER_LETTER = 2
  const SHUFFLE_TIME = 50
  const CHARS = "!@#$%^&*():{};|,.<>/?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  
  // Function to update original text for a link
  const updateLinkText = (link) => {
    const currentText = link.textContent.trim()
    if (currentText && currentText.length > 0) {
      link.dataset.originalText = currentText
    }
  }
  
  navLinks.forEach(link => {
    let intervalRef = null
    
    // Initialize original text
    updateLinkText(link)
    
    // Update original text when translations change
    const observer = new MutationObserver(() => {
      // Only update if not currently scrambling
      if (!intervalRef) {
        updateLinkText(link)
      }
    })
    observer.observe(link, { childList: true, characterData: true, subtree: true })
    
    const scramble = () => {
      // Stop any existing scramble
      if (intervalRef) {
        clearInterval(intervalRef)
        intervalRef = null
      }
      
      // Update original text before scrambling
      updateLinkText(link)
      
      let pos = 0
      const targetText = link.dataset.originalText || link.textContent.trim()
      
      if (!targetText || targetText.length === 0) return
      
      intervalRef = setInterval(() => {
        const scrambled = targetText.split('')
          .map((char, index) => {
            // Skip spaces
            if (char === ' ') return ' '
            
            // If we've passed this letter position, show the real char
            if (pos / CYCLES_PER_LETTER > index) {
              return char
            }
            
            // Otherwise show random char
            const randomCharIndex = Math.floor(Math.random() * CHARS.length)
            return CHARS[randomCharIndex]
          })
          .join('')
        
        link.textContent = scrambled
        pos++
        
        if (pos >= targetText.length * CYCLES_PER_LETTER) {
          stopScramble()
        }
      }, SHUFFLE_TIME)
    }
    
    const stopScramble = () => {
      if (intervalRef) {
        clearInterval(intervalRef)
        intervalRef = null
      }
      const targetText = link.dataset.originalText || link.textContent.trim()
      if (targetText) {
        link.textContent = targetText
      }
    }
    
    link.addEventListener('mouseenter', scramble)
    link.addEventListener('mouseleave', stopScramble)
  })
  
  // Re-initialize after translations update
  if (typeof window.updateTranslations === 'function') {
    const originalUpdateTranslations = window.updateTranslations
    window.updateTranslations = function() {
      originalUpdateTranslations()
      // Re-initialize scramble effect after translations update
      setTimeout(() => {
        navLinks.forEach(link => {
          updateLinkText(link)
        })
      }, 100)
    }
  }
}

