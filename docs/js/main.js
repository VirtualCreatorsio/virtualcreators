window.addEventListener('load', () => {
    // Wait for the full animation sequence to complete
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        const content = document.querySelector('.content');
        
        // Hide preloader
        preloader.classList.add('fade-out');
        
        // Show content
        content.classList.add('show');
        
        // Remove preloader from DOM after animation
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 700);
    }, 2000); // Animation sequence takes 2.5s + 0.5s for fade-out
}); 

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".menu-items a");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

    // Mobile menu functionality
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuIcon = document.querySelector('.menu-icon');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        mobileMenu.classList.toggle('active');
        
        // Update menu icon
        if (isMenuOpen) {
            menuIcon.innerHTML = '<path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>';
        } else {
            menuIcon.innerHTML = '<path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>';
        }
    }

    mobileMenuButton.addEventListener('click', toggleMenu);

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !e.target.closest('.mobile-menu') && !e.target.closest('.mobile-menu-button')) {
            toggleMenu();
        }
        
    });

    document.querySelectorAll('.accordion-header').forEach(button => {
        button.addEventListener('click', () => {
          const body = button.nextElementSibling;
          const isActive = button.classList.contains('active');
      
          // Close all
          document.querySelectorAll('.accordion-header').forEach(btn => btn.classList.remove('active'));
          document.querySelectorAll('.accordion-body').forEach(panel => panel.style.display = 'none');
      
          // Toggle current
          if (!isActive) {
            button.classList.add('active');
            body.style.display = 'block';
          }
        });
      });  

    // Language selector functionality
    const languageButtons = document.querySelectorAll('.language-selector button, .mobile-language-selector button');
    
    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons in both selectors
            languageButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button and its corresponding button in the other menu
            const lang = button.textContent;
            languageButtons.forEach(btn => {
                if (btn.textContent === lang) {
                    btn.classList.add('active');
                }
            });
        });
    });   
    
    //about me text tracker
    gsap.registerPlugin(ScrollTrigger);

    const textElement = document.getElementById("animated-text");
    const originalHTML = textElement.innerHTML;
    textElement.innerHTML = ""; // Clear the container
    
    const spans = [];
    
    // Go through the nodes instead of just using .textContent
    Array.from(new DOMParser().parseFromString(`<div>${originalHTML}</div>`, 'text/html').body.firstChild.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        // Split normal text into spans
        node.textContent.split("").forEach(char => {
          const span = document.createElement("span");
          span.textContent = char;
          textElement.appendChild(span);
          spans.push(span);
        });
      } else {
        // Append <br> or other elements as-is
        textElement.appendChild(node.cloneNode(true));
      }
    });
    
    // Scroll animation
    ScrollTrigger.create({
      trigger: textElement,
      start: "top center",
      end: "bottom center",
      scrub: true,
      onUpdate: self => {
        const progress = self.progress;
        const indexToHighlight = Math.floor(progress * spans.length);
    
        spans.forEach((span, i) => {
          span.style.color = i <= indexToHighlight ? "#fff" : "#444";
        });
      }
    });    

    // Reviews Slider
    const reviews = [
        {
            rating: '★★★★★',
            text: 'This is a mock-up review and will be replaced shortly 1',
            author: 'Kjell de Ruiter',
            position: 'Founder Virtual Creators'
        },
        {
            rating: '★★★★★',
            text: 'This is a mock-up review and will be replaced shortly 2',
            author: 'Kjell de Ruiter',
            position: 'Founder Virtual Creators'
        },
        {
            rating: '★★★★★',
            text: 'This is a mock-up review and will be replaced shortly 3',
            author: 'Kjell de Ruiter',
            position: 'Founder Virtual Creators'
        },
        {
            rating: '★★★★★',
            text: 'This is a mock-up review and will be replaced shortly 4',
            author: 'Kjell de Ruiter',
            position: 'Founder Virtual Creators'
        }
    ];

    let currentIndex = 0;
    let reviewsPerView = window.innerWidth >= 768 ? 3 : 1;

    const reviewTrack = document.querySelector('.review-track');

    function renderReviews() {
        reviewTrack.classList.add('fade-out');
        setTimeout(() => {
            reviewTrack.innerHTML = '';

            for (let i = 0; i < reviewsPerView; i++) {
                const reviewIndex = (currentIndex + i) % reviews.length;
                const review = reviews[reviewIndex];

                const card = document.createElement('div');
                card.classList.add('glass-effect', 'review-card');
                card.innerHTML = `
                    <div class="review-content">
                        <div class="review-rating">${review.rating}</div>
                        <p class="review-text">${review.text}</p>
                        <div class="review-author">
                            <strong>${review.author}</strong>
                            <span>${review.position}</span>
                        </div>
                    </div>
                `;
                reviewTrack.appendChild(card);
            }

            reviewTrack.classList.remove('fade-out');
        }, 200);
    }

    function updateViewCount() {
        const newCount = window.innerWidth >= 768 ? 3 : 1;
        if (newCount !== reviewsPerView) {
            reviewsPerView = newCount;
            currentIndex = 0;
            renderReviews();
        }
    }

    window.addEventListener('resize', updateViewCount);

    document.querySelector('.prev-review')?.addEventListener('click', () => {
        currentIndex = (currentIndex - reviewsPerView + reviews.length) % reviews.length;
        renderReviews();
    });

    document.querySelector('.next-review')?.addEventListener('click', () => {
        currentIndex = (currentIndex + reviewsPerView) % reviews.length;
        renderReviews();
    });

    // Initial render
    renderReviews();


    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all sections and cards
    document.querySelectorAll('section, .glass-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (isMenuOpen) {
                    toggleMenu();
                }
            }
        });
    });

    // Back to top functionality
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Cases Slider Initialization
    function initCasesSlider() {
        const slider = document.querySelector('#cases .slider');
        const slides = document.querySelectorAll('#cases .slide');
        const dotsContainer = document.querySelector('#cases .dots');
        
        if (!slider || !slides.length || !dotsContainer) {
            console.error('Required elements not found for cases slider');
            return;
        }

        const slidesToShow = window.innerWidth <= 768 ? 1 : 3;
        const totalSlides = slides.length;
        let currentTranslate = 0;
        const slideWidth = 100 / slidesToShow;
        let isPaused = false;
        let animationInterval;
        let touchStartX = 0;
        let touchEndX = 0;
        let isDragging = false;

        // Clone first slides and append to end for seamless loop
        const slidesToClone = Math.min(slidesToShow, slides.length);
        for (let i = 0; i < slidesToClone; i++) {
            const clone = slides[i].cloneNode(true);
            slider.appendChild(clone);
        }

        // Create dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentTranslate = -(i * slideWidth);
                slider.style.transform = `translateX(${currentTranslate}%)`;
                updateDots();
            });
            dotsContainer.appendChild(dot);
        }

        function updateDots() {
            const progress = Math.abs(currentTranslate / slideWidth);
            const activeIndex = Math.floor(progress) % totalSlides;
            document.querySelectorAll('#cases .dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });
        }

        function moveSlider() {
            if (!isPaused && !isDragging) {
                currentTranslate -= 0.15;
                
                if (Math.abs(currentTranslate) >= totalSlides * slideWidth) {
                    currentTranslate = 0;
                }
                
                slider.style.transform = `translateX(${currentTranslate}%)`;
                updateDots();
            }

        }

        function startAnimation() {
            isPaused = false;
            if (animationInterval) {
                clearInterval(animationInterval);
            }
            animationInterval = setInterval(moveSlider, 16);
        }

        function stopAnimation() {
            isPaused = true;
            if (animationInterval) {
                clearInterval(animationInterval);
                animationInterval = null;
            }
        }

        // Touch event handlers
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            isDragging = true;
            stopAnimation();
        });

        slider.addEventListener('touchmove', (e) => {
            if (isDragging) {
                touchEndX = e.touches[0].clientX;
                const diff = touchEndX - touchStartX;
                currentTranslate += (diff / slider.offsetWidth) * 100;
                slider.style.transform = `translateX(${currentTranslate}%)`;
                touchStartX = touchEndX;
            }
        });

        slider.addEventListener('touchend', () => {
            if (isDragging) {
                const diff = touchEndX - touchStartX;
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        currentTranslate = Math.min(0, currentTranslate + slideWidth);
                    } else {
                        currentTranslate = Math.max(-(totalSlides - 1) * slideWidth, currentTranslate - slideWidth);
                    }

                }
                slider.style.transform = `translateX(${currentTranslate}%)`;
                updateDots();
                isDragging = false;
                startAnimation();
            }
        });

        slider.addEventListener('touchcancel', () => {
            if (isDragging) {
                isDragging = false;
                startAnimation();
            }
        });

        // Desktop hover handlers
        slider.addEventListener('mouseenter', stopAnimation);
        slider.addEventListener('mouseleave', startAnimation);

        // Start animation
        startAnimation();
    }
    // WhatsApp Chat Bubble Checkmarks Animation
const bubble = document.getElementById('chat-bubble');
    const checkmarks = document.getElementById('checkmarks');
    const closeBtn = document.getElementById('close-bubble');
    const whatsappButton = document.querySelector('.whatsapp-button');

    let dismissed = false;

    const createCheck = (color = '#999') =>
        `<svg viewBox="0 0 512 512" width="16" height="16">
            <path fill="${color}" d="M165.9 251.7c-7.4-7.4-19.3-7.4-26.6 0l-16.5 16.5c-7.4 7.4-7.4 19.3 0 26.6l89.6 89.6c7.4 7.4 19.3 7.4 26.6 0l204.1-204.1c7.4-7.4 7.4-19.3 0-26.6l-16.5-16.5c-7.4-7.4-19.3-7.4-26.6 0L230.2 341.4l-64.3-64.3z"/>
        </svg>`;

    const showBubble = () => {
        if (!bubble.classList.contains('visible')) {
            bubble.classList.add('visible');

            checkmarks.innerHTML = createCheck('#999');

            setTimeout(() => {
                checkmarks.innerHTML = createCheck('#999') + createCheck('#999');
                setTimeout(() => {
                    checkmarks.innerHTML = createCheck('#34b7f1') + createCheck('#34b7f1');
                }, 500);
            }, 500);
        }
    };

    const bubbleObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !dismissed) {
                setTimeout(showBubble, 9000);
            }
        });
    });

    bubbleObserver.observe(document.getElementById('whatsapp-widget'));

    closeBtn.addEventListener('click', () => {
        bubble.classList.remove('visible');
        dismissed = true;
    });

    whatsappButton.addEventListener('mouseenter', () => {
        if (dismissed) {
            dismissed = false;
            showBubble();
        }
    });
    // Initialize cases slider when DOM is loaded
    initCasesSlider();
}); 

// Modal logic
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalClose = document.querySelector('.modal-close');

let isPaused = false;
let animationInterval;

// Use event delegation for all future .slide-button clicks
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('slide-button')) {
    e.preventDefault();

    const titleElement = e.target.closest('.slide-content')?.querySelector('.slide-title');
    if (titleElement) {
      modalTitle.innerHTML = titleElement.innerHTML;
      modal.style.display = 'flex';

      // Pause slider
      isPaused = true;
      clearInterval(animationInterval);
    }
  }

  // Close if click outside modal content
  if (e.target === modal) {
    modal.style.display = 'none';
    resumeSlider();
  }
});

// Close modal on "X"
modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
  resumeSlider();
});
const modalVideo = document.getElementById('modalVideo');
const modalDescription = document.getElementById('modalDescription');
const modalFeatures = document.getElementById('modalFeatures');
const modalImage = document.getElementById('modalImage');
const modalInfo = document.getElementById('modalInfo');
const relatedProjectsContainer = document.getElementById('relatedProjects');

// Example project data
const projectData = {
  'LifeSciGrowth': {
    video: 'assets/Portfolio-coming-soon.mp4',
    description: `<p>LifeSciGrowth is a full-service life science brand. We developed a tailored website including SEO optimization, interactive components, and custom CMS integration for scalability.</p>`,
    features: [
      { title: "Webdesign", description: "Tailor-made layout and animations for a sleek and engaging site." },
      { title: "Development", description: "Fully responsive build with seamless performance across devices." },
      { title: "SEO & Speed", description: "Optimized for Google and lightning-fast loading times." }
    ],
    img:'assets/test-mock-up.jpg', 
    info: '<p>all extra project information, custom goals, problem statement and more should go here to convince clients</p>',
    related: ['TractionMovies', 'De Ruiter Construction']
  },
  'TractionMovies': {
    video: 'assets/Portfolio-coming-soon.mp4',
    description: `<p>Custom video portfolio platform for showcasing trailers and media work. Emphasis on dark UI, lazy loading, and performance on mobile devices.</p>`,
    features: [
      { title: "Webdesign", description: "Tailor-made layout and animations for a sleek and engaging site." },
      { title: "Development", description: "Fully responsive build with seamless performance across devices." },
      { title: "SEO & Speed", description: "Optimized for Google and lightning-fast loading times." }
    ],
    img:'assets/test-mock-up.jpg', 
    info: '<p>all extra project information, custom goals, problem statement and more should go here to convince clients</p>',
    related: ['LifeSciGrowth', 'Virtual Creators']
  },
  'De Ruiter Construction': {
    video: 'assets/Portfolio-coming-soon.mp4',
    description: `<p>Responsive design for a premium construction company. Features include gallery, lead generation forms, and CMS-backed project updates.</p>`,
    features: [
      { title: "Webdesign", description: "Tailor-made layout and animations for a sleek and engaging site." },
      { title: "SEO & Speed", description: "Optimized for Google and lightning-fast loading times." }
    ],
    img:'assets/test-mock-up.jpg', 
    info: '<p>all extra project information, custom goals, problem statement and more should go here to convince clients</p>',
    related: ['LifeSciGrowth', 'TractionMovies']
  },
  'Virtual Creators': {
    video: 'assets/Portfolio-coming-soon.mp4',
    description: `<p>A placeholder project to showcase the flexibility of our layout and modal system.</p>`,
    features: [
      { title: "Webdesign", description: "Tailor-made layout and animations for a sleek and engaging site." },
      { title: "Development", description: "Fully responsive build with seamless performance across devices." }
    ],
    img:'assets/test-mock-up.jpg', 
    info: '<p>all extra project information, custom goals, problem statement and more should go here to convince clients</p>',
    related: ['LifeSciGrowth', 'TractionMovies']
  }
};

function openModal(projectName) {
  const project = projectData[projectName];
  if (!project) return;

  modalTitle.innerHTML = projectName;
  modalVideo.src = project.video;
  modalDescription.innerHTML = project.description;
  modalImage.src = project.img;
  modalInfo.innerHTML = project.info;

  // Add related features
  modalFeatures.innerHTML = '';
  project.features.forEach(feature => {
    const block = document.createElement('div');
    block.className = 'feature-block';
    block.innerHTML = `<h4>${feature.title}</h4><p>${feature.description}</p>`;
    modalFeatures.appendChild(block);
  });

  // Add related projects
  relatedProjectsContainer.innerHTML = '';
  project.related.forEach(name => {
    const tile = document.createElement('div');
    tile.className = 'related-tile border-gradient';
    tile.innerHTML = `<div class="related-tile-title">${name}</div>`;
    tile.addEventListener('click', () => {
      openModal(name);
    });
    relatedProjectsContainer.appendChild(tile);
  });
    // ✅ Scroll to top of modal content
    const modalContent = document.querySelector('.modal-content'); // Update selector if needed
    if (modalContent) {
      modalContent.scrollTo({ top: 0, behavior: 'smooth' });
    }

  modal.style.display = 'flex';
  isPaused = true;
  clearInterval(animationInterval);
}
//new button effect checker gradient glow
const startGradientAnimation = (element) => {
  let angle = 0;
  const rotateGradient = () => {
    if (!document.body.contains(element)) return; // stop if element was removed
    angle = (angle + 1) % 360;
    element.style.setProperty("--gradient-angle", `${angle}deg`);
    requestAnimationFrame(rotateGradient);
  };
  rotateGradient();
};

const seenElements = new WeakSet();

const observer = new MutationObserver(() => {
  document.querySelectorAll(".border-gradient").forEach((element) => {
    if (!seenElements.has(element)) {
      seenElements.add(element);
      startGradientAnimation(element);
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });

// Updated event delegation
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('slide-button')) {
    e.preventDefault();
    const title = e.target.closest('.slide-content')?.querySelector('.slide-title')?.innerText.split('\n')[0];
    if (title) openModal(title);
  }

  if (e.target === modal) {
    closeModal();
  }
});

modalClose.addEventListener('click', closeModal);

function closeModal() {
  modal.style.display = 'none';
  modalVideo.src = '';
  resumeSlider();
}

function resumeSlider() {
  isPaused = false;
  clearInterval(animationInterval);
  animationInterval = setInterval(moveSlider, 16);
}

// form functionality
    const form = document.getElementById("contact-form");
    const successMsg = document.getElementById("success-msg");
    const errorMsg = document.getElementById("error-msg");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      successMsg.style.display = "none";
      errorMsg.style.display = "none";

      const formData = new FormData(form);

      try {
        const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
          method: "POST",
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          form.reset();
          successMsg.style.display = "block";
        } else {
          throw new Error("Network error");
        }
      } catch (err) {
        errorMsg.style.display = "block";
      }
    });

