window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        const content = document.querySelector('.content');
        
        preloader.classList.add('fade-out');
        content.classList.add('show');
        
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 700);
    }, 2000);
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
        
        if (isMenuOpen) {
            menuIcon.innerHTML = '<path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>';
        } else {
            menuIcon.innerHTML = '<path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>';
        }
    }

    mobileMenuButton.addEventListener('click', toggleMenu);

    document.addEventListener('click', (e) => {
        if (isMenuOpen && !e.target.closest('.mobile-menu') && !e.target.closest('.mobile-menu-button')) {
            toggleMenu();
        }
    });

    document.querySelectorAll('.accordion-header').forEach(button => {
        button.addEventListener('click', () => {
            const body = button.nextElementSibling;
            const isActive = button.classList.contains('active');
      
            document.querySelectorAll('.accordion-header').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.accordion-body').forEach(panel => panel.style.display = 'none');
      
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
            languageButtons.forEach(btn => btn.classList.remove('active'));
            
            const lang = button.textContent;
            languageButtons.forEach(btn => {
                if (btn.textContent === lang) {
                    btn.classList.add('active');
                }
            });
        });
    });   
    
    // About me text tracker
    gsap.registerPlugin(ScrollTrigger);

    const textElement = document.getElementById("animated-text");
    const originalHTML = textElement.innerHTML;
    textElement.innerHTML = "";
    
    const spans = [];
    
    Array.from(new DOMParser().parseFromString(`<div>${originalHTML}</div>`, 'text/html').body.firstChild.childNodes).forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent.split("").forEach(char => {
                const span = document.createElement("span");
                span.textContent = char;
                textElement.appendChild(span);
                spans.push(span);
            });
        } else {
            textElement.appendChild(node.cloneNode(true));
        }
    });
    
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

    // Services data
    const services = [
        {
            id: 1,
            title: "Web Development",
            description: "Custom-developed websites build on your prevered CMS platform — with clean, scalable code, custom components, and full responsiveness across all devices.",
            icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg>`,
            features: ["Shopify, WordPress, Elementor & WooCommerce", "Custom Development with JS, CSS & HTML", "Responsive Layouts (Desktop, Tablet, Mobile)", "Clean, Scalable Codebase with CMS Flexibility"],
            colorClass: "purple",
        },
        {
            id: 2,
            title: "UI/UX Design",
            description: "User-centered design that balances visual appeal and usability for seamless digital experiences across all platforms.",
            icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
            features: ["User Research", "Custom Design Systems", "Wireframes & Interactive Prototypes", "Usability Testing & Feedback"],
            colorClass: "pink",
        },
        {
            id: 3,
            title: "Website Maintenance",
            description: "Ongoing support to keep your website secure, updated, and performing at its best with proactive monitoring.",
            icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
            features: ["Security Updates", "Performance Monitoring", "Content Updates", "Technical Support", "Plugin & Theme Updates"],
            colorClass: "violet",
        },
        {
            id: 4,
            title: "Mobile Development",
            description: "Ensure your site performs flawlessly on mobile and tablet devices with fast loading, touch-optimized interactions, and clear layouts.",
            icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>`,
            features: ["Responsive Adjustments for All Devices", "Speed Optimization for Mobile", "Mobile-First Design Enhancements", "Interactive Mobile Features"],
            colorClass: "indigo",
        },
        {
            id: 5,
            title: "SEO Optimization",
            description: "Strategic SEO implementation to improve search rankings and drive qualified organic traffic to your website.",
            icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
            features: ["Technical & On-Page SEO Implementation", "Targeted Keyword Research & Content Structuring", "Link Building", "Google Analytics & Search Console Integration"],
            colorClass: "cyan",
        },
        {
            id: 6,
            title: "Performance Optimization",
            description: "Speed optimization and technical improvements for better user experience, conversions, and search rankings.",
            icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>`,
            features: ["Core Web Vitals", "Image Optimization", "Caching Strategy", "CDN Setup"],
            colorClass: "emerald",
        },
    ];

    // Services functionality
    let currentServicesSlide = 0;
    let hoveredService = null;

    const mobileCarousel = document.getElementById('services-mobile-carousel');
    const desktopGrid = document.getElementById('services-desktop-grid');
    const dotsContainer = document.getElementById('services-dots-container');
    const prevBtn = document.getElementById('services-prev-btn');
    const nextBtn = document.getElementById('services-next-btn');

    function createServiceCard(service, isMobile = false) {
        const featuresHTML = service.features.map(feature => `
            <div class="feature-item">
                <div class="feature-dot"></div>
                ${feature}
            </div>
        `).join('');

        return `
            <div class="service-card ${service.colorClass}" data-service-id="${service.id}">
                <div class="service-icon">
                    ${service.icon}
                </div>
                <div class="service-content">
                    <h3 class="service-title">${service.title}</h3>
                    <p class="service-description">${service.description}</p>
                    <div class="service-features">
                        ${featuresHTML}
                    </div>
                </div>
            </div>
        `;
    }

    function createServicesDots() {
        const dotsHTML = services.map((_, index) => `
            <div class="services-dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></div>
        `).join('');
        dotsContainer.innerHTML = dotsHTML;

        document.querySelectorAll('.services-dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideIndex = parseInt(e.target.dataset.slide);
                scrollToServicesSlide(slideIndex);
            });
        });
    }

    function scrollToServicesSlide(index) {
        const cardWidth = mobileCarousel.scrollWidth / services.length;
        mobileCarousel.scrollTo({
            left: cardWidth * index,
            behavior: 'smooth'
        });
        currentServicesSlide = index;
        updateServicesDots();
    }

    function updateServicesDots() {
        document.querySelectorAll('.services-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentServicesSlide);
        });
    }

    function nextServicesSlide() {
        const next = currentServicesSlide === services.length - 1 ? 0 : currentServicesSlide + 1;
        scrollToServicesSlide(next);
    }

    function prevServicesSlide() {
        const prev = currentServicesSlide === 0 ? services.length - 1 : currentServicesSlide - 1;
        scrollToServicesSlide(prev);
    }

    function handleServicesCarouselScroll() {
        const cardWidth = mobileCarousel.scrollWidth / services.length;
        const newSlide = Math.round(mobileCarousel.scrollLeft / cardWidth);
        if (newSlide !== currentServicesSlide) {
            currentServicesSlide = newSlide;
            updateServicesDots();
        }
    }

    function addServicesHoverEffects() {
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                hoveredService = parseInt(card.dataset.serviceId);
            });

            card.addEventListener('mouseleave', () => {
                hoveredService = null;
            });

            card.addEventListener('touchstart', () => {
                hoveredService = parseInt(card.dataset.serviceId);
            });

            card.addEventListener('touchend', () => {
                setTimeout(() => {
                    hoveredService = null;
                }, 300);
            });
        });
    }

    function initServices() {
        if (!mobileCarousel || !desktopGrid || !dotsContainer) return;

        const mobileCardsHTML = services.map(service => createServiceCard(service, true)).join('');
        mobileCarousel.innerHTML = mobileCardsHTML;

        const desktopCardsHTML = services.map(service => createServiceCard(service, false)).join('');
        desktopGrid.innerHTML = desktopCardsHTML;

        createServicesDots();

        if (prevBtn) prevBtn.addEventListener('click', prevServicesSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextServicesSlide);
        if (mobileCarousel) mobileCarousel.addEventListener('scroll', handleServicesCarouselScroll);

        addServicesHoverEffects();

        // Touch gestures for mobile carousel
        let startX = 0;
        let scrollLeft = 0;

        mobileCarousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - mobileCarousel.offsetLeft;
            scrollLeft = mobileCarousel.scrollLeft;
        });

        mobileCarousel.addEventListener('touchmove', (e) => {
            if (!startX) return;
            e.preventDefault();
            const x = e.touches[0].pageX - mobileCarousel.offsetLeft;
            const walk = (x - startX) * 2;
            mobileCarousel.scrollLeft = scrollLeft - walk;
        });

        mobileCarousel.addEventListener('touchend', () => {
            startX = 0;
            setTimeout(() => {
                const cardWidth = mobileCarousel.scrollWidth / services.length;
                const newSlide = Math.round(mobileCarousel.scrollLeft / cardWidth);
                scrollToServicesSlide(newSlide);
            }, 100);
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (window.innerWidth < 768) {
                if (e.key === 'ArrowLeft') {
                    prevServicesSlide();
                } else if (e.key === 'ArrowRight') {
                    nextServicesSlide();
                }
            }
        });
    }

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

    window.addEventListener('resize', () => {
        updateViewCount();
        if (window.innerWidth >= 768) {
            mobileCarousel.scrollLeft = 0;
            currentServicesSlide = 0;
            updateServicesDots();
        }
    });

    document.querySelector('.prev-review')?.addEventListener('click', () => {
        currentIndex = (currentIndex - reviewsPerView + reviews.length) % reviews.length;
        renderReviews();
    });

    document.querySelector('.next-review')?.addEventListener('click', () => {
        currentIndex = (currentIndex + reviewsPerView) % reviews.length;
        renderReviews();
    });

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

        const slidesToClone = Math.min(slidesToShow, slides.length);
        for (let i = 0; i < slidesToClone; i++) {
            const clone = slides[i].cloneNode(true);
            slider.appendChild(clone);
        }

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

        slider.addEventListener('mouseenter', stopAnimation);
        slider.addEventListener('mouseleave', startAnimation);

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
        bubble.classList.add('closed')
        dismissed = true;
    });

    whatsappButton.addEventListener('mouseenter', () => {
        if (dismissed) {
            dismissed = false;
            showBubble(); 
            bubble.classList.remove('closed'); 
            bubble.classList.add('visible');
        }
    });

    // Initialize services and cases sliders
    initServices();
    initCasesSlider();
}); 

// Modal logic
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalClose = document.querySelector('.modal-close');

let isPaused = false;
let animationInterval;

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('slide-button')) {
        e.preventDefault();

        const titleElement = e.target.closest('.slide-content')?.querySelector('.slide-title');
        if (titleElement) {
            modalTitle.innerHTML = titleElement.innerHTML;
            modal.style.display = 'flex';
            document.body.classList.add("modal-open");

            isPaused = true;
            clearInterval(animationInterval);
        }
    }

    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.classList.remove("modal-open");
        resumeSlider();
    }
});

modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.classList.remove("modal-open");
    resumeSlider();
});

const modalVideo = document.getElementById('modalVideo');
const modalDescription = document.getElementById('modalDescription');
const modalFeatures = document.getElementById('modalFeatures');
const modalImage = document.getElementById('modalImage');
const modalInfo = document.getElementById('modalInfo');
const relatedProjectsContainer = document.getElementById('relatedProjects');

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

    modalFeatures.innerHTML = '';
    project.features.forEach(feature => {
        const block = document.createElement('div');
        block.className = 'feature-block';
        block.innerHTML = `<h4>${feature.title}</h4><p>${feature.description}</p>`;
        modalFeatures.appendChild(block);
    });

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

    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.scrollTo({ top: 0, behavior: 'smooth' });
    }

    modal.style.display = 'flex';
    document.body.classList.add("modal-open");
    isPaused = true;
    clearInterval(animationInterval);
}

const startGradientAnimation = (element) => {
    let angle = 0;
    const rotateGradient = () => {
        if (!document.body.contains(element)) return;
        angle = (angle + 1) % 360;
        element.style.setProperty("--gradient-angle", `${angle}deg`);
        requestAnimationFrame(rotateGradient);
    };
    rotateGradient();
};

const seenElements = new WeakSet();

const gradientObserver = new MutationObserver(() => {
    document.querySelectorAll(".border-gradient").forEach((element) => {
        if (!seenElements.has(element)) {
            seenElements.add(element);
            startGradientAnimation(element);
        }
    });
});

gradientObserver.observe(document.body, { childList: true, subtree: true });

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
    document.body.classList.remove("modal-open");
    modalVideo.src = '';
    resumeSlider();
}

function resumeSlider() {
    isPaused = false;
    clearInterval(animationInterval);
    animationInterval = setInterval(moveSlider, 16);
}

// Form functionality
const form = document.getElementById("contact-form");
const successMsg = document.getElementById("success-msg");
const errorMsg = document.getElementById("error-msg");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    successMsg.style.display = "none";
    errorMsg.style.display = "none";

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
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
            errorMsg.style.display = "block";
        }
    } catch (error) {
        errorMsg.style.display = "block";
    }
});