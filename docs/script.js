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
    video: `${assetPathPrefix}assets/Portfolio-coming-soon.mp4`, // Desktop video
    mobileVideo: `${assetPathPrefix}assets/Portfolio-coming-soon.mp4`, // Mobile video
    scrollVideo: `${assetPathPrefix}assets/scroll-vid Lumenix.mp4`, // Page scroll video
    scrollVideoBackground: `${assetPathPrefix}assets/Lumenix-scroll.webp`, // Background image for scroll video (case pages)
    modalScrollVideoBackground: `${assetPathPrefix}assets/Lumenix-scroll.webp`, // Background image for scroll video (modal)
    images: [
      { src: `${assetPathPrefix}assets/Lumenix-Hero-sectie.png`, alt: "Lumenix Hero Section" },
      { src: `${assetPathPrefix}assets/Lumenix-Promo-sectie.png`, alt: "Lumenix Promo Section" },
      { src: `${assetPathPrefix}assets/Lumenix-category-page.png`, alt: "Lumenix Category Page" },
      { src: `${assetPathPrefix}assets/Lumenix-lifestyle carousel.png`, alt: "Lumenix Lifestyle Carousel" },
      { src: `${assetPathPrefix}assets/Lumenix-checkout.png`, alt: "Lumenix Checkout" },
    ],
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
    title: "Deltastudios",
    category: "Branding Agency",
    year: "2025",
    image: `${assetPathPrefix}assets/coming-soon.jpg`, // Make sure this matches your actual file
    video: `${assetPathPrefix}assets/Portfolio-coming-soon.mp4`, // Make sure this matches your actual file
    scrollVideo: `${assetPathPrefix}assets/Delta-scroll-vid.mp4`, // Page scroll video
    scrollVideoBackground: `${assetPathPrefix}assets/Delta-scroll background.png`, // Background image for scroll video (case pages)
    modalScrollVideoBackground: `${assetPathPrefix}assets/Delta-scroll background.png`, // Background image for scroll video (modal)
    images: [
      { src: `${assetPathPrefix}assets/Deltastudios portfolio case.png`, alt: "Deltastudios Portfolio Case" },
      { src: `${assetPathPrefix}assets/Deltastudios-services.png`, alt: "Deltastudios Services" },
      { src: `${assetPathPrefix}assets/Deltastudios portfolio case - werksectie.png`, alt: "Deltastudios Work Section" },
      { src: `${assetPathPrefix}assets/Deltastudios portfolio case - cases-pop-up.png`, alt: "Deltastudios Cases Pop-up" },
      { src: `${assetPathPrefix}assets/Deltastudios portfolio case - scroll-reveal .png`, alt: "Deltastudios Scroll Reveal" },
    ],
    description: "deltastudiosDescription",
    fullDescription: "deltastudiosFullDescription",
    services: [
      { icon: "smartphone", label: "Mobile First Approach" },
      { icon: "palette", label: "UI/UX Design" },
      { icon: "code", label: "Web Development" },
      { icon: "zap", label: "Performance Optimization" },
    ],
    results: ["deltastudiosResult1", "deltastudiosResult2", "deltastudiosResult3", "deltastudiosResult4"],
    review: {
      rating: 5,
      text: "deltastudiosReviewText",
      author: "deltastudiosReviewAuthor",
      company: "deltastudiosReviewCompany"
    }
  },
  {
    title: "RobustRise",
    category: "Online Shop",
    year: "2025",
    image: `${assetPathPrefix}assets/coming-soon.jpg`, // Make sure this matches your actual file
    video: `${assetPathPrefix}assets/Portfolio-coming-soon.mp4`, // Desktop video
    mobileVideo: `${assetPathPrefix}assets/Portfolio-coming-soon.mp4`, // Mobile video
    scrollVideo: `${assetPathPrefix}assets/scroll-vid-RobustRise.mp4`, // Page scroll video
    scrollVideoBackground: `${assetPathPrefix}assets/Robustrise-scroll.webp`, // Background image for scroll video (case pages)
    modalScrollVideoBackground: `${assetPathPrefix}assets/Robustrise-scroll.webp`, // Background image for scroll video (modal)
    images: [
      { src: `${assetPathPrefix}assets/RobustRise Hero-sectie.png`, alt: "RobustRise Hero Section" },
      { src: `${assetPathPrefix}assets/RobustRise-carousel-switcher.png`, alt: "RobustRise Carousel Switcher" },
      { src: `${assetPathPrefix}assets/RobustRise-over-ons.png`, alt: "RobustRise Over Ons" },
      { src: `${assetPathPrefix}assets/RobustRise-Blog.png`, alt: "RobustRise Blog" },
      { src: `${assetPathPrefix}assets/RobustRise-custom-cart.png`, alt: "RobustRise Custom Cart" },
    ],
    description: "lifeSciGrowthDescription",
    fullDescription: "lifeSciGrowthFullDescription",
    services: [
      { icon: "code", label: "Web Development" },
      { icon: "palette", label: "UI/UX Design" },
      { icon: "search", label: "SEO Optimization" },
      { icon: "bar-chart", label: "Brand Identity" },
      { icon: "zap", label: "Performance Optimization" },
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
    // URL hash functionality removed - no longer handling project URL hash on page load
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
  
  // Set correct PDF iframe source on page load
  // Initialize logo ticker animation
  initializeLogoTicker()
  
  // Initialize Spline background visibility
  initializeSplineBackground()
  
  // Initialize navigation link scramble effect
  setupNavLinkScramble()
  
  // Initialize FAQ background mask
  setTimeout(() => {
    updateFAQBackgroundMask()
  }, 200)
  
  // Update FAQ mask on window resize
  let resizeTimeout
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      updateFAQBackgroundMask()
    }, 150)
  })
  
  // Initialize services cards
  initializeServicesCards()
  
  // Initialize rotating gradient borders
  initializeRotatingGradients()
}

// Initialize Rotating Gradient Borders
function initializeRotatingGradients() {
  const elements = document.querySelectorAll(".border-gradient");
  
  elements.forEach((element) => {
    let angle = 0;
    const rotateGradient = () => {
      angle = (angle + 1) % 360;
      element.style.setProperty("--gradient-angle", `${angle}deg`);
      requestAnimationFrame(rotateGradient);
    };
    rotateGradient();
  });
}

// Initialize Services Cards Expand/Collapse
function initializeServicesCards() {
  const serviceCards = document.querySelectorAll('.service-card')
  
  if (serviceCards.length === 0) return
  
  // Set first card as active by default
  if (serviceCards.length > 0) {
    serviceCards[0].classList.add('active')
  }
  
  serviceCards.forEach((card) => {
    // Set icon from data attribute
    const iconName = card.getAttribute('data-icon')
    const iconElement = card.querySelector('.service-card-icon')
    if (iconElement && iconName) {
      iconElement.innerHTML = getIconSVG(iconName)
    }
    
    // Click handler
    card.addEventListener('click', () => {
      // Remove active class from all cards
      serviceCards.forEach((c) => c.classList.remove('active'))
      // Add active class to clicked card
      card.classList.add('active')
    })
    
    // Hover handler for desktop (only if not active)
    if (!isMobileDevice) {
      card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('active')) {
          // Remove active from all
          serviceCards.forEach((c) => c.classList.remove('active'))
          // Add active to hovered
          card.classList.add('active')
        }
      })
    }
  })
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
      url: "https://calendly.com/kjell-virtualcreators/45min-discovery-call?primary_color=8b5cf6",
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
    background-color: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  `

  // Create the Calendly container - match cases modal size
  const calendlyContainer = document.createElement("div")
  calendlyContainer.id = "calendly-inline-widget"
  calendlyContainer.style.cssText = `
    width: 100%;
    max-width: 64rem;
    max-height: 90vh;
    height: 90vh;
    background: #1f1f1f;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);
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
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
  transition: all 0.3s ease;
  color: #9ca3af;
`
  closeButton.onmouseover = () => {
    closeButton.style.backgroundColor = "rgba(255, 255, 255, 0.15)"
    closeButton.style.borderColor = "rgba(255, 255, 255, 0.2)"
    closeButton.style.color = "#ffffff"
  }
  closeButton.onmouseout = () => {
    closeButton.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
    closeButton.style.borderColor = "rgba(255, 255, 255, 0.1)"
    closeButton.style.color = "#9ca3af"
  }

  // Create content container
  const contentContainer = document.createElement("div")
  contentContainer.style.cssText = `
  height: calc(100% - 4px);
  width: 100%;
  padding: 0;
  margin: 0;
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
        "https://calendly.com/kjell-virtualcreators/45min-discovery-call?primary_color=8b5cf6&hide_gdpr_banner=1&embed_domain=" +
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
      background: #1f1f1f !important;
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
  window.open("https://calendly.com/kjell-virtualcreators/45min-discovery-call", "_blank")

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
              background: #1f1f1f !important;
              color: #ffffff !important;
            }
            
            /* Dark theme for Calendly content */
            body, html, div, section, article, main {
              background: #1f1f1f !important;
              color: #ffffff !important;
            }
            
            /* Text colors */
            h1, h2, h3, h4, h5, h6, p, span, a, label, button, input, textarea, select {
              color: #ffffff !important;
            }
            
            /* Input fields dark theme */
            input, textarea, select {
              background: rgba(255, 255, 255, 0.05) !important;
              border: 1px solid rgba(255, 255, 255, 0.1) !important;
              color: #ffffff !important;
            }
            
            input:focus, textarea:focus, select:focus {
              background: rgba(255, 255, 255, 0.08) !important;
              border-color: rgba(139, 92, 246, 0.5) !important;
            }
            
            /* Buttons dark theme */
            button {
              background: linear-gradient(to right, #ec4899, #8b5cf6) !important;
              color: #ffffff !important;
              border: none !important;
            }
            
            button:hover {
              background: linear-gradient(to right, #db2777, #7c3aed) !important;
            }
            
            /* Links */
            a {
              color: #8b5cf6 !important;
            }
            
            a:hover {
              color: #a78bfa !important;
            }
            
            /* Force full width on main content areas */
            .calendly-popup-content,
            .calendly-main-content {
              width: 100% !important;
              max-width: none !important;
              padding: 0 !important;
              margin: 0 !important;
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
              min-height: 100% !important;
            }
            
            /* Remove all padding from Calendly containers */
            [class*="calendly"] {
              padding: 0 !important;
              margin: 0 !important;
            }
            
            /* Ensure body and html have no padding */
            body, html {
              padding: 0 !important;
              margin: 0 !important;
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

// Project slug mapping for SEO-friendly URLs
const projectSlugs = {
  0: "lumenix",
  1: "deltastudios",
  2: "robustrise"
}

// Project slug to index mapping (reverse lookup)
const slugToIndex = {
  "lumenix": 0,
  "deltastudios": 1,
  "robustrise": 2
}

// Cache for fetched project pages
const projectPageCache = new Map()

// Project Modal Functions
async function openProjectModal(index) {
  currentProject = index
  const modal = document.getElementById("projectModal")
  const project = projects[index]
  const projectSlug = projectSlugs[index]

  // Block page scrolling
  document.body.style.overflow = "hidden"
  document.documentElement.style.overflow = "hidden"

  // Update modal header
  document.getElementById("modalTitle").innerHTML = `${project.title} <span style="font-style: italic; font-weight: 300; opacity: 0.7; font-size: 0.67em;">CASE</span>`
  document.getElementById("navIndicator").textContent = `${index + 1} of ${projects.length}`

  const modalBody = document.getElementById("modalBody")
  
  // Show loading state
  modalBody.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; min-height: 400px; flex-direction: column; gap: 1rem;">
      <div style="width: 40px; height: 40px; border: 3px solid rgba(139, 92, 246, 0.3); border-top-color: #8b5cf6; border-radius: 50%; animation: spin 1s linear infinite;"></div>
      <p style="color: #6b7280; font-size: 0.875rem;">Loading project...</p>
    </div>
    <style>
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    </style>
  `
  
  // Show modal immediately with loading state
  modal.classList.add("active")
  
  // URL hash functionality removed - no longer updating URL for modals

  try {
    // Check cache first
    let projectHTML = projectPageCache.get(projectSlug)
    
    if (!projectHTML) {
      // Determine path prefix based on current location
      // Handle both local file:// and http(s):// protocols
      const isLocalFile = window.location.protocol === 'file:'
      const isDutchPath = window.location.pathname.includes('/nl/')
      
      let pathPrefix = ''
      if (isDutchPath) {
        pathPrefix = isLocalFile ? '../' : '../'
      } else {
        pathPrefix = isLocalFile ? '' : ''
      }
      
      const projectPath = `${pathPrefix}projects/${projectSlug}.html`
      
      // Fetch project page
      const response = await fetch(projectPath)
      
      if (!response.ok) {
        throw new Error(`Failed to load project page: ${response.status}`)
      }
      
      const fullHTML = await response.text()
      
      // Parse HTML and extract project content
      const parser = new DOMParser()
      const doc = parser.parseFromString(fullHTML, 'text/html')
      // Look for .case-content first (main content wrapper), fallback to .project-content
      let projectContent = doc.querySelector('.case-content')
      
      if (!projectContent) {
        projectContent = doc.querySelector('.project-content')
      }
      
      if (!projectContent) {
        throw new Error('Project content not found in HTML')
      }
      
      projectHTML = projectContent.innerHTML
      
      // Cache the content
      projectPageCache.set(projectSlug, projectHTML)
    }
    
    // Inject fetched content
    modalBody.innerHTML = projectHTML
    
    // Apply translations to the fetched content
    if (typeof window.updateTranslations === 'function') {
      window.updateTranslations()
    }
    
    // Replace case page background images with modal-specific backgrounds
    if (project.modalScrollVideoBackground) {
      const scrollVideoElements = modalBody.querySelectorAll('.case-inline-scroll-video')
      scrollVideoElements.forEach(element => {
        element.style.backgroundImage = `url('${project.modalScrollVideoBackground}')`
      })
    }
    
    // Scroll modal to top
    scrollModalToTop()
    
    // Initialize modal animations and text reveal
    setTimeout(() => {
      setupModalScrollListener()
      initializeModalTextReveal()
      initializeModalSectionAnimations()
      initializeGallerySliders()
      
      // Re-initialize video controls if needed
      if (typeof setupModalVideoControls === 'function') {
        setupModalVideoControls()
      }
    }, 100)
    
  } catch (error) {
    console.warn('Failed to load project page, falling back to JS-generated content:', error)
    
    // Fallback to JS-generated content
    modalBody.innerHTML = generateProjectModalContent(project)
    
    // Scroll modal to top
    scrollModalToTop()
    
    // Initialize modal animations and text reveal
    setTimeout(() => {
      setupModalScrollListener()
      initializeModalTextReveal()
      initializeModalSectionAnimations()
      initializeGallerySliders()
    }, 100)
  }
}

// Update URL hash for shareable project links
function updateProjectURL(slug) {
  if (history.pushState) {
    const newURL = `${window.location.pathname}#project=${slug}`
    window.history.pushState({ project: slug }, '', newURL)
  }
}

// Handle URL hash on page load
function handleProjectURLHash() {
  const hash = window.location.hash
  if (hash && hash.startsWith('#project=')) {
    const slug = hash.replace('#project=', '')
    const index = slugToIndex[slug]
    if (index !== undefined) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        openProjectModal(index)
      }, 300)
    }
  }
}

// URL hash functionality removed - no longer handling browser back/forward buttons for modals
// window.addEventListener('popstate', (e) => {
//   if (e.state && e.state.project) {
//     const index = slugToIndex[e.state.project]
//     if (index !== undefined) {
//       openProjectModal(index)
//     }
//   } else {
//     closeProjectModal()
//   }
// })

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
  
  // URL hash functionality removed - no longer clearing URL hash
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
  document.getElementById("modalTitle").innerHTML = `${project.title} <span style="font-style: italic; font-weight: 300; opacity: 0.7; font-size: 0.67em;">CASE</span>`
  document.getElementById("navIndicator").textContent = `${newIndex + 1} of ${projects.length}`

  // Generate new modal body content
  const modalBody = document.getElementById("modalBody")
  modalBody.innerHTML = generateProjectModalContent(project)

  // Scroll modal to top for clear navigation
  scrollModalToTop()
  
  // Re-initialize modal animations and text reveal
  setTimeout(() => {
    setupModalScrollListener()
    initializeModalTextReveal()
    initializeModalSectionAnimations()
    initializeGallerySliders()
  }, 100)
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
        <span class="project-badge">${window.t(service.label.toLowerCase().replace(/\s+/g, "").replace("/", "").replace("-", ""))}</span>
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
        <!-- Modal Hero Section -->
        <div class="modal-header-section">
            <div class="modal-meta">
                <span>${window.t(project.category.toLowerCase().replace(/\s+/g, "").replace("&", "")) || project.category}</span>
                <span>•</span>
                <span>${project.year}</span>
            </div>
            <h1 class="modal-hero-title">
                ${project.title} <span class="modal-hero-suffix">CASE</span>
            </h1>
            <p class="modal-hero-description">
                ${(() => {
                    // Get the full description and extract the first sentence/paragraph to match case page
                    const fullDesc = window.t(project.fullDescription) || project.fullDescription;
                    // Split by newlines and get first paragraph, or split by sentence if no paragraphs
                    const firstParagraph = fullDesc.split('\n\n')[0] || fullDesc.split('.')[0] + '.';
                    return firstParagraph.trim();
                })()}
            </p>
            
            <!-- Deliverables Section -->
            <div class="modal-deliverables-inline">
                <h3 class="modal-section-title">${window.t("deliverables") || "Deliverables"}</h3>
                <div class="project-badges">
                    ${servicesHTML}
                </div>
            </div>
        </div>
        
        <!-- Project Overview / The Solution -->
        <div class="modal-solution modal-section-fade">
            <div class="solution-content">
                <div class="project-description-content">
                    ${(() => {
                        // Split the description into paragraphs
                        const descriptionText = window.t(project.fullDescription);
                        const paragraphs = descriptionText.split(/\n\n+/).filter(p => p.trim());
                        
                        // If we have paragraphs and a scroll video, show video first, then all paragraphs together
                        if (paragraphs.length > 0 && project.scrollVideo) {
                            const allParagraphs = paragraphs.map(p => `<p class="text-tracking">${p.trim()}</p>`).join('');
                            
                            const backgroundImage = project.modalScrollVideoBackground ? `style="background-image: url('${project.modalScrollVideoBackground}');"` : '';
                            return `
                                <div class="inline-scroll-video" ${backgroundImage}>
                                    <div class="scroll-video-wrapper">
                                        <div class="scroll-video-container">
                                            <video 
                                                class="scroll-video" 
                                                autoplay 
                                                muted 
                                                loop 
                                                playsinline
                                                controls
                                            >
                                                <source src="${project.scrollVideo}" type="video/mp4">
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    </div>
                                </div>
                                ${allParagraphs}
                            `;
                        } else {
                            // No scroll video or no paragraphs, just render normally with text-tracking class
                            const paraText = descriptionText.replace(/\n\n/g, '</p><p class="text-tracking">').replace(/^/, '<p class="text-tracking">').replace(/$/, '</p>');
                            return paraText;
                        }
                    })()}
                </div>
            </div>
        </div>
        
        ${project.images && project.images.length > 0 ? `
        <!-- Image Gallery Section -->
        <div class="modal-gallery modal-section-fade">
            <h3 class="modal-section-title">${window.t("projectGallery") || "Project Gallery"}</h3>
            <div class="gallery-slider-container">
                <button class="gallery-slider-btn gallery-slider-prev" onclick="event.stopPropagation(); slideGallery(this, 'prev');" aria-label="Previous image">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M15 18l-6-6 6-6"/>
                    </svg>
                </button>
                <div class="gallery-slider">
                    <div class="gallery-slider-track">
                        ${project.images.map((img, index) => `
                            <div class="gallery-slide" data-slide-index="${index}">
                                <div class="gallery-item" onclick="event.stopPropagation(); openGalleryLightbox(${index});" data-gallery-index="${index}">
                                    <img src="${img.src}" alt="${img.alt || project.title + ' Screenshot ' + (index + 1)}" loading="lazy">
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <button class="gallery-slider-btn gallery-slider-next" onclick="event.stopPropagation(); slideGallery(this, 'next');" aria-label="Next image">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
                <div class="gallery-slider-dots">
                    ${project.images.map((img, index) => `
                        <button class="gallery-dot ${index === 0 ? 'active' : ''}" onclick="event.stopPropagation(); goToSlide(this, ${index});" aria-label="Go to slide ${index + 1}"></button>
                    `).join('')}
                </div>
            </div>
        </div>
        ` : ''}
        
        <!-- Results & Impact Section -->
        <div class="modal-results modal-section-fade">
            <h3 class="modal-section-title">${window.t("resultsImpact")}</h3>
            <div class="results-grid">
                ${resultsHTML}
            </div>
        </div>
        
        ${reviewHTML ? `<div class="modal-section-fade">${reviewHTML}</div>` : ''}
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
    // Show fake success message to confuse bots
    showFormMessage(window.t("thankYouMessage"), "success")
    form.reset()
    return false
  }

  // Check if form was submitted too quickly (likely a bot)
  const timeSinceLoad = Date.now() - formLoadTime
  if (timeSinceLoad < 3000) { // Less than 3 seconds
    // Show fake success message to confuse bots
    showFormMessage(window.t("thankYouMessage"), "success")
    form.reset()
    return false
  }

  // Rate limiting - prevent multiple submissions within 60 seconds
  const lastSubmissionTime = localStorage.getItem('lastFormSubmission')
  const currentTime = Date.now()
  if (lastSubmissionTime && (currentTime - parseInt(lastSubmissionTime)) < 60000) {
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

// Toggle service badge (accordion behavior for all screen sizes)
function toggleServiceBadge(index) {
  const badges = document.querySelectorAll('.service-badge');
  const clickedBadge = document.querySelector(`.service-badge[data-service-index="${index}"]`);
  
  if (!clickedBadge) return;
  
  // If clicking the same badge, toggle it
  if (clickedBadge.classList.contains('active')) {
    clickedBadge.classList.remove('active');
  } else {
    // Remove active from all badges
    badges.forEach(badge => badge.classList.remove('active'));
    // Add active to clicked badge
    clickedBadge.classList.add('active');
  }
}

// Make function globally available
window.toggleServiceBadge = toggleServiceBadge;

// Helper function to get the company website link for each project
function getCompanyLink(project) {
  let url = "#";
  switch (project.title) {
    case "Lumenix":
      url = "https://www.lumenix-beamers.nl";
      break;
    case "Deltastudios":
      url = "https://deltastudios.nl";
      break;
    case "RobustRise":
      url = "https://robustrise.nl";
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
      // Hover video effect disabled - cards stay static
      // if (video.style.display !== "none") {
      //   // Load video only when needed
      //   if (video.preload === "none") {
      //     video.preload = "metadata"
      //     video.load()
      //   }
      //   video.currentTime = 0
      //   video.play().catch((e) => {
      //     video.style.display = "none"
      //   })
      //   video.style.opacity = "1"
      //   imageContainer.querySelector(".project-img").style.opacity = "0"
      // }
    })

    imageContainer.addEventListener("mouseleave", () => {
      // Hover video effect disabled - cards stay static
      // if (video.style.display !== "none") {
      //   video.pause()
      //   video.currentTime = 0
      //   video.style.opacity = "0"
      //   imageContainer.querySelector(".project-img").style.opacity = "1"
      // }
    })
  })
}

function setupProjectCardModalLinks() {
  const projectList = document.querySelector('.projects-list.stacked-scroll');
  if (!projectList) return;
  const items = Array.from(projectList.querySelectorAll('.project-item'));
  items.forEach((item, index) => {
    // Make entire project card clickable
    item.addEventListener('click', (e) => {
      // Only open modal if click is not on a button or link that has its own action
      const clickedElement = e.target;
      const isButton = clickedElement.tagName === 'BUTTON' || clickedElement.closest('button');
      const isLink = clickedElement.tagName === 'A' || clickedElement.closest('a');
      
      // If clicking on a button or link, let it handle its own click
      if (!isButton && !isLink) {
        openProjectModal(index);
      }
    });
    
    // Project Title - keep for backwards compatibility
    const title = item.querySelector('.project-title');
    if (title) {
      title.style.cursor = 'pointer';
      title.addEventListener('click', (e) => {
        e.stopPropagation();
        openProjectModal(index);
      });
    }
    // Project Image - keep for backwards compatibility
    const image = item.querySelector('.project-image');
    if (image) {
      image.addEventListener('click', (e) => {
        e.stopPropagation();
        openProjectModal(index);
      });
    }
    // View Project Button - keep for backwards compatibility
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

// Logo Ticker Animation
function initializeLogoTicker() {
  const track = document.querySelector('.logo-ticker-track')
  if (!track) return
  
  // Get all logo items
  const items = track.querySelectorAll('.logo-ticker-item')
  if (items.length < 10) return // Need at least 10 items (5 + 5 duplicates)
  
  // Wait for images to load
  const images = track.querySelectorAll('img')
  let imagesLoaded = 0
  const totalImages = images.length
  
  if (totalImages === 0) {
    calculateAndSetAnimation()
    return
  }
  
  const checkImagesLoaded = () => {
    imagesLoaded++
    if (imagesLoaded === totalImages) {
      // Small delay to ensure layout is complete
      setTimeout(calculateAndSetAnimation, 100)
    }
  }
  
  images.forEach(img => {
    if (img.complete) {
      checkImagesLoaded()
    } else {
      img.addEventListener('load', checkImagesLoaded)
      img.addEventListener('error', checkImagesLoaded)
    }
  })
  
  function calculateAndSetAnimation() {
    // Get computed gap value
    const computedStyle = window.getComputedStyle(track)
    const gapValue = computedStyle.gap || computedStyle.columnGap || '5rem'
    const gapInPx = parseFloat(gapValue) * (gapValue.includes('rem') ? 16 : 1)
    
    // Calculate the width of the first set (5 logos)
    let firstSetWidth = 0
    for (let i = 0; i < 5; i++) {
      firstSetWidth += items[i].offsetWidth
    }
    
    // Add gaps (4 gaps between 5 items)
    const totalGapWidth = 4 * gapInPx
    const totalFirstSetWidth = firstSetWidth + totalGapWidth
    
    // Remove existing style if any
    const existingStyle = document.getElementById('logo-ticker-animation')
    if (existingStyle) {
      existingStyle.remove()
    }
    
    // Set the animation to move exactly the width of the first set
    const style = document.createElement('style')
    style.id = 'logo-ticker-animation'
    style.textContent = `
      @keyframes logoTicker {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-${totalFirstSetWidth}px);
        }
      }
    `
    document.head.appendChild(style)
  }
  
  // Initial calculation
  calculateAndSetAnimation()
  
  // Update on resize
  let resizeTimeout
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      calculateAndSetAnimation()
    }, 250)
  })
}

// Hero Gradient Glow Fade Effect
function setupHeroGradientGlow() {
  // Check for both .hero (homepage) and .about-hero (about page)
  const heroSection = document.querySelector('.hero') || document.querySelector('.about-hero')
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
  
  // Update mask after toggle (in case item expanded/contracted)
  setTimeout(updateFAQBackgroundMask, 100)
}

// Create mask for FAQ section background to show 3D effect only through FAQ items
function updateFAQBackgroundMask() {
  const faqSection = document.querySelector('.faq')
  if (!faqSection) return
  
  const faqItems = faqSection.querySelectorAll('.faq-item')
  if (faqItems.length === 0) return
  
  const faqRect = faqSection.getBoundingClientRect()
  const sectionHeight = faqRect.height
  const sectionWidth = faqRect.width
  
  // Build mask with radial gradients for each FAQ item
  const maskGradients = []
  
  faqItems.forEach((item) => {
    const itemRect = item.getBoundingClientRect()
    const relativeTop = ((itemRect.top - faqRect.top) / sectionHeight) * 100
    const relativeLeft = ((itemRect.left - faqRect.left) / sectionWidth) * 100
    const itemWidth = (itemRect.width / sectionWidth) * 100
    const itemHeight = (itemRect.height / sectionHeight) * 100
    
    // Create radial gradient centered on the FAQ item
    // Make it slightly larger than the item to account for borders/rounded corners
    const gradientSize = Math.max(itemWidth, itemHeight) * 1.2
    maskGradients.push(
      `radial-gradient(ellipse ${gradientSize}% ${gradientSize * 0.3}% at ${relativeLeft + itemWidth / 2}% ${relativeTop + itemHeight / 2}%, transparent 0%, transparent 48%, black 52%)`
    )
  })
  
  // Add base gradient to keep left side and gaps dark
  maskGradients.push('linear-gradient(to right, black 0%, black 45%, black 100%)')
  
  // Apply mask to ::before pseudo-element
  const maskValue = maskGradients.join(', ')
  faqSection.style.setProperty('--faq-mask', maskValue)
}

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
window.updateFAQBackgroundMask = updateFAQBackgroundMask
window.openGalleryLightbox = openGalleryLightbox
window.closeGalleryLightbox = closeGalleryLightbox
window.navigateGalleryImage = navigateGalleryImage
window.slideGallery = slideGallery
window.goToSlide = goToSlide

// Gallery Lightbox Functionality
let currentGalleryImages = []
let currentGalleryIndex = 0
let currentGalleryTitle = ''

function openGalleryLightbox(index) {
  // Get all gallery images from the current project modal or case page
  const modalBody = document.getElementById('modalBody')
  const caseContent = document.querySelector('.case-content')
  const container = modalBody || caseContent
  
  if (!container) {
    return
  }
  
  const galleryItems = container.querySelectorAll('.gallery-item')
  if (galleryItems.length === 0) {
    return
  }
  
  // Extract image data
  currentGalleryImages = Array.from(galleryItems).map(item => {
    const img = item.querySelector('img')
    return {
      src: img.src,
      alt: img.alt
    }
  })
  
  currentGalleryIndex = parseInt(index) || 0
  currentGalleryTitle = ''
  
  // Create or get lightbox
  let lightbox = document.getElementById('galleryLightbox')
  if (!lightbox) {
    lightbox = createGalleryLightbox()
    document.body.appendChild(lightbox)
  }
  
  // Update lightbox content
  updateGalleryLightbox()
  
  // Show lightbox
  lightbox.classList.add('active')
  document.body.style.overflow = 'hidden'
  
  // Add keyboard listeners
  document.addEventListener('keydown', handleGalleryKeyboard)
}

function createGalleryLightbox() {
  const lightbox = document.createElement('div')
  lightbox.id = 'galleryLightbox'
  lightbox.className = 'gallery-lightbox'
  lightbox.innerHTML = `
    <div class="gallery-lightbox-overlay" onclick="closeGalleryLightbox()"></div>
    <div class="gallery-lightbox-content">
      <button class="gallery-lightbox-close" onclick="closeGalleryLightbox()" aria-label="Close gallery">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      <button class="gallery-lightbox-prev" onclick="navigateGalleryImage('prev')" aria-label="Previous image">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="15,18 9,12 15,6"/>
        </svg>
      </button>
      <button class="gallery-lightbox-next" onclick="navigateGalleryImage('next')" aria-label="Next image">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="9,18 15,12 9,6"/>
        </svg>
      </button>
      <div class="gallery-lightbox-image-container">
        <img class="gallery-lightbox-image" src="" alt="">
      </div>
      <div class="gallery-lightbox-counter">
        <span class="gallery-lightbox-current">1</span> / <span class="gallery-lightbox-total">1</span>
      </div>
    </div>
  `
  return lightbox
}

function updateGalleryLightbox() {
  if (currentGalleryImages.length === 0) return
  
  const lightbox = document.getElementById('galleryLightbox')
  if (!lightbox) return
  
  const img = lightbox.querySelector('.gallery-lightbox-image')
  const current = lightbox.querySelector('.gallery-lightbox-current')
  const total = lightbox.querySelector('.gallery-lightbox-total')
  const prevBtn = lightbox.querySelector('.gallery-lightbox-prev')
  const nextBtn = lightbox.querySelector('.gallery-lightbox-next')
  
  if (img && currentGalleryImages[currentGalleryIndex]) {
    img.src = currentGalleryImages[currentGalleryIndex].src
    img.alt = currentGalleryImages[currentGalleryIndex].alt
    
    // Fade in effect
    img.style.opacity = '0'
    setTimeout(() => {
      img.style.opacity = '1'
    }, 50)
  }
  
  if (current) {
    current.textContent = currentGalleryIndex + 1
  }
  
  if (total) {
    total.textContent = currentGalleryImages.length
  }
  
  // Update button visibility
  if (prevBtn) {
    prevBtn.style.display = currentGalleryImages.length > 1 ? 'flex' : 'none'
  }
  if (nextBtn) {
    nextBtn.style.display = currentGalleryImages.length > 1 ? 'flex' : 'none'
  }
}

function navigateGalleryImage(direction) {
  if (currentGalleryImages.length === 0) return
  
  if (direction === 'next') {
    currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryImages.length
  } else if (direction === 'prev') {
    currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length
  }
  
  updateGalleryLightbox()
}

function closeGalleryLightbox() {
  const lightbox = document.getElementById('galleryLightbox')
  if (lightbox) {
    lightbox.classList.remove('active')
    document.body.style.overflow = ''
  }
  
  // Remove keyboard listeners
  document.removeEventListener('keydown', handleGalleryKeyboard)
}

function handleGalleryKeyboard(e) {
  if (e.key === 'Escape') {
    closeGalleryLightbox()
  } else if (e.key === 'ArrowLeft') {
    navigateGalleryImage('prev')
  } else if (e.key === 'ArrowRight') {
    navigateGalleryImage('next')
  }
}

// Gallery Slider Functionality
function slideGallery(button, direction) {
  const container = button.closest('.gallery-slider-container')
  if (!container) return
  
  const track = container.querySelector('.gallery-slider-track')
  const slides = container.querySelectorAll('.gallery-slide')
  const dots = container.querySelectorAll('.gallery-dot')
  
  if (!track || slides.length === 0) return
  
  const currentSlide = container.dataset.currentSlide || 0
  let newSlide = parseInt(currentSlide)
  
  if (direction === 'next') {
    newSlide = (newSlide + 1) % slides.length
  } else if (direction === 'prev') {
    newSlide = (newSlide - 1 + slides.length) % slides.length
  }
  
  // Update track position
  track.style.transform = `translateX(-${newSlide * 100}%)`
  container.dataset.currentSlide = newSlide
  
  // Update active dot
  dots.forEach((dot, index) => {
    if (index === newSlide) {
      dot.classList.add('active')
    } else {
      dot.classList.remove('active')
    }
  })
}

function goToSlide(button, slideIndex) {
  const container = button.closest('.gallery-slider-container')
  if (!container) return
  
  const track = container.querySelector('.gallery-slider-track')
  const slides = container.querySelectorAll('.gallery-slide')
  const dots = container.querySelectorAll('.gallery-dot')
  
  if (!track || slides.length === 0 || slideIndex < 0 || slideIndex >= slides.length) return
  
  // Update track position
  track.style.transform = `translateX(-${slideIndex * 100}%)`
  container.dataset.currentSlide = slideIndex
  
  // Update active dot
  dots.forEach((dot, index) => {
    if (index === slideIndex) {
      dot.classList.add('active')
    } else {
      dot.classList.remove('active')
    }
  })
}

// Initialize gallery sliders on page load
function initializeGallerySliders() {
  const sliders = document.querySelectorAll('.gallery-slider-container')
  sliders.forEach(container => {
    // Set initial slide to 0
    const currentSlide = parseInt(container.dataset.currentSlide) || 0
    container.dataset.currentSlide = currentSlide
    const track = container.querySelector('.gallery-slider-track')
    const slides = container.querySelectorAll('.gallery-slide')
    const dots = container.querySelectorAll('.gallery-dot')
    
    if (track && slides.length > 0) {
      // Ensure track is properly positioned
      track.style.transform = `translateX(-${currentSlide * 100}%)`
      
      // Update active dot
      dots.forEach((dot, index) => {
        if (index === currentSlide) {
          dot.classList.add('active')
        } else {
          dot.classList.remove('active')
        }
      })
    }
  })
}

// Modal Text Reveal Functionality - Aligned with about page
function convertToLetterSpans(element, text) {
  const letterSpans = text.split('').map(char => {
    if (char === ' ') {
      return ' '
    }
    return `<span class="letter-tracking">${char}</span>`
  }).join('')
  
  element.innerHTML = letterSpans
  
  const letters = element.querySelectorAll('.letter-tracking')
  
  // Set initial styles directly on each letter
  letters.forEach(letter => {
    letter.style.color = '#9ca3af'
    letter.style.opacity = '1'
  })
  
  // Store reference to element and its letters
  element._letters = letters
  element._totalLetters = letters.length
  
  return letters.length
}

function initializeModalTextReveal() {
  const modalBody = document.getElementById('modalBody')
  if (!modalBody) return
  
  const textRevealElements = modalBody.querySelectorAll('.text-tracking')
  
  textRevealElements.forEach(element => {
    // Check if already initialized
    if (element.dataset.revealInitialized === 'true') {
      return
    }
    
    const text = element.textContent.trim()
    if (text && text.length > 0) {
      convertToLetterSpans(element, text)
      element.dataset.revealInitialized = 'true'
    }
  })
  
  // Update reveal on scroll
  updateModalTextReveal()
}

function updateModalTextReveal() {
  const modalBody = document.getElementById('modalBody')
  if (!modalBody) return
  
  const textRevealElements = modalBody.querySelectorAll('.text-tracking')
  
  if (textRevealElements.length === 0) return
  
  // Calculate total letters across all elements
  let totalLetters = 0
  let allLetters = []
  
  textRevealElements.forEach((element) => {
    if (element._letters) {
      allLetters = allLetters.concat(Array.from(element._letters))
      totalLetters += element._totalLetters
    }
  })
  
  if (totalLetters === 0) return
  
  // Use the first element to calculate scroll progress for the entire section
  const firstElement = textRevealElements[0]
  const firstElementRect = firstElement.getBoundingClientRect()
  const modalBodyRect = modalBody.getBoundingClientRect()
  const viewportHeight = modalBody.clientHeight
  
  // Calculate overall progress through the text section (same logic as about page)
  let overallProgress = 0
  
  // Check if first element top is less than viewport threshold (80% of viewport height)
  // This matches the about page logic: rect.top < windowHeight * 0.8
  const viewportThreshold = viewportHeight * 0.8
  const elementTopRelative = firstElementRect.top - modalBodyRect.top
  
  if (elementTopRelative < viewportThreshold) {
    // Calculate progress based on scroll through the entire text section
    const lastElement = textRevealElements[textRevealElements.length - 1]
    const lastElementRect = lastElement.getBoundingClientRect()
    const sectionHeight = lastElementRect.bottom - firstElementRect.top
    
    // Same calculation as about page: (windowHeight * 0.8 - rect.top) / (sectionHeight + windowHeight * 0.4)
    overallProgress = Math.min(1, (viewportThreshold - elementTopRelative) / (sectionHeight + viewportHeight * 0.4))
  }
  
  // Calculate how many letters to show across all elements
  const lettersToShow = Math.floor(overallProgress * totalLetters)
  
  // Apply the effect sequentially across all letters
  allLetters.forEach((letter, globalIndex) => {
    if (globalIndex < lettersToShow) {
      // Letter is revealed - make it white for readability
      letter.style.color = '#ffffff'
      letter.style.opacity = '1'
    } else {
      // Letter is not revealed - keep it grey
      letter.style.color = '#9ca3af'
      letter.style.opacity = '1'
    }
  })
}

// Modal Section Fade-in Animations
function initializeModalSectionAnimations() {
  const modalBody = document.getElementById('modalBody')
  if (!modalBody) return
  
  const sections = modalBody.querySelectorAll('.modal-section-fade')
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0)'
      }
    })
  }, {
    threshold: 0.1,
    root: modalBody
  })
  
  sections.forEach(section => {
    section.style.opacity = '0'
    section.style.transform = 'translateY(20px)'
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
    observer.observe(section)
  })
}

// Set up scroll listener for text reveal (will be attached when modal opens)
let modalScrollTimeout
function setupModalScrollListener() {
  const modalBody = document.getElementById('modalBody')
  if (modalBody) {
    // Remove existing listener if any
    modalBody.removeEventListener('scroll', handleModalScroll)
    // Add new listener
    modalBody.addEventListener('scroll', handleModalScroll)
  }
}

function handleModalScroll() {
  clearTimeout(modalScrollTimeout)
  modalScrollTimeout = setTimeout(() => {
    updateModalTextReveal()
  }, 10)
}

// Case Page Text Reveal Functionality - Similar to modal
function convertToLetterSpansCasePage(element, text) {
  const letterSpans = text.split('').map(char => {
    if (char === ' ') {
      return ' '
    }
    return `<span class="letter-tracking">${char}</span>`
  }).join('')
  
  element.innerHTML = letterSpans
  
  const letters = element.querySelectorAll('.letter-tracking')
  
  // Set initial styles directly on each letter
  letters.forEach(letter => {
    letter.style.color = '#9ca3af'
    letter.style.opacity = '1'
  })
  
  // Store reference to element and its letters
  element._letters = letters
  element._totalLetters = letters.length
  
  return letters.length
}

function initializeCasePageTextReveal() {
  const caseContent = document.querySelector('.case-content')
  if (!caseContent) return
  
  // Get all text-tracking elements, then filter out those in the header/hero section
  const allTextElements = caseContent.querySelectorAll('.text-tracking')
  
  // Filter to exclude any elements inside .case-header (hero section)
  const textRevealElements = Array.from(allTextElements).filter(element => {
    return !element.closest('.case-header')
  })
  
  textRevealElements.forEach(element => {
    // Check if already initialized
    if (element.dataset.revealInitialized === 'true') {
      return
    }
    
    const text = element.textContent.trim()
    if (text && text.length > 0) {
      convertToLetterSpansCasePage(element, text)
      element.dataset.revealInitialized = 'true'
    }
  })
  
  // Update reveal on scroll
  updateCasePageTextReveal()
}

function updateCasePageTextReveal() {
  const caseContent = document.querySelector('.case-content')
  if (!caseContent) return
  
  // Get all text-tracking elements, then filter out those in the header/hero section
  const allTextElements = caseContent.querySelectorAll('.text-tracking')
  
  // Filter to exclude any elements inside .case-header (hero section)
  const textRevealElements = Array.from(allTextElements).filter(element => {
    return !element.closest('.case-header')
  })
  
  if (textRevealElements.length === 0) return
  
  // Calculate total letters across all elements
  let totalLetters = 0
  let allLetters = []
  
  textRevealElements.forEach((element) => {
    if (element._letters) {
      allLetters = allLetters.concat(Array.from(element._letters))
      totalLetters += element._totalLetters
    }
  })
  
  if (totalLetters === 0) return
  
  // Use the first element to calculate scroll progress for the entire section
  const firstElement = textRevealElements[0]
  const firstElementRect = firstElement.getBoundingClientRect()
  const windowHeight = window.innerHeight
  
  // Calculate overall progress through the text section
  let overallProgress = 0
  
  // Check if first element top is less than viewport threshold (80% of viewport height)
  const viewportThreshold = windowHeight * 0.8
  
  if (firstElementRect.top < viewportThreshold) {
    // Calculate progress based on scroll through the entire text section
    const lastElement = textRevealElements[textRevealElements.length - 1]
    const lastElementRect = lastElement.getBoundingClientRect()
    const sectionHeight = lastElementRect.bottom - firstElementRect.top
    
    // Calculate progress: (windowHeight * 0.8 - rect.top) / (sectionHeight + windowHeight * 0.4)
    overallProgress = Math.min(1, (viewportThreshold - firstElementRect.top) / (sectionHeight + windowHeight * 0.4))
  }
  
  // Calculate how many letters to show across all elements
  const lettersToShow = Math.floor(overallProgress * totalLetters)
  
  // Apply the effect sequentially across all letters
  allLetters.forEach((letter, globalIndex) => {
    if (globalIndex < lettersToShow) {
      // Letter is revealed - make it white for readability
      letter.style.color = '#ffffff'
      letter.style.opacity = '1'
    } else {
      // Letter is not revealed - keep it grey
      letter.style.color = '#9ca3af'
      letter.style.opacity = '1'
    }
  })
}

// Set up scroll listener for case page text reveal
let casePageScrollTimeout
function setupCasePageScrollListener() {
  // Remove existing listener if any
  window.removeEventListener('scroll', handleCasePageScroll)
  // Add new listener
  window.addEventListener('scroll', handleCasePageScroll)
}

function handleCasePageScroll() {
  clearTimeout(casePageScrollTimeout)
  casePageScrollTimeout = setTimeout(() => {
    updateCasePageTextReveal()
  }, 10)
}

// Initialize case page text reveal on page load
document.addEventListener('DOMContentLoaded', () => {
  const caseContent = document.querySelector('.case-content')
  if (caseContent) {
    // Initialize text reveal
    setTimeout(() => {
      initializeCasePageTextReveal()
      setupCasePageScrollListener()
      initializeGallerySliders()
    }, 100)
  }
  // Initialize gallery sliders for modal and case pages
  initializeGallerySliders()
})

