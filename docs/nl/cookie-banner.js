// Cookie Banner JavaScript - Dynamic Implementation
(function() {
    'use strict';

    console.log('🍪 Cookie Banner Script Loading...');

    // Cookie utility functions
    const CookieManager = {
        cookiesEnabled: true, // Track if cookies work

        set: function(name, value, days) {
            if (!this.cookiesEnabled) {
                return false;
            }
            try {
                const expires = new Date();
                expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
                document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
                return true;
            } catch (e) {
                return false;
            }
        },

        get: function(name) {
            if (!this.cookiesEnabled) {
                return null;
            }
            try {
                const nameEQ = name + "=";
                const ca = document.cookie.split(';');
                for (let i = 0; i < ca.length; i++) {
                    let c = ca[i].trim();
                    if (c.indexOf(nameEQ) === 0) {
                        const value = decodeURIComponent(c.substring(nameEQ.length, c.length));
                        return value;
                    }
                }
                return null;
            } catch (e) {
                return null;
            }
        },

        delete: function(name) {
            if (!this.cookiesEnabled) {
                return false;
            }
            try {
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
                return true;
            } catch (e) {
                return false;
            }
        },

        exists: function(name) {
            return this.get(name) !== null;
        }
    };

    // Cookie consent manager
    const CookieConsent = {
        init: function() {
            console.log('🚀 Initializing Cookie Banner...');
            console.log('📄 Document ready state:', document.readyState);
            console.log('🌐 Current URL:', window.location.href);
            
            // Test if cookies are supported
            const cookieSupport = this.testCookieSupport();
            if (!cookieSupport) {
                CookieManager.cookiesEnabled = false;
                // Continue anyway to show the banner
            }
            
            // Create banner elements
            this.createBanner();
            
            // Check if we need to show the banner
            this.checkConsent();
        },

        testCookieSupport: function() {
            try {
                CookieManager.set('test_cookie', 'test', 1);
                const testResult = CookieManager.get('test_cookie');
                CookieManager.delete('test_cookie');
                const isSupported = testResult === 'test';
                return isSupported;
            } catch (e) {
                return false;
            }
        },

        createBanner: function() {
            console.log('🏗️ Creating banner HTML...');
            
            // Create banner HTML with translation attributes
            const bannerHTML = `
                <div class="cookie-banner" id="cookieBanner" style="display: none;">
                    <div class="cookie-banner-content">
                        <div class="cookie-banner-text">
                            <h4 class="cookie-banner-title" data-translate="cookieBannerTitle">We use cookies to enhance your experience</h4>
                            <p class="cookie-banner-description" data-translate="cookieBannerDescription">This website uses cookies to improve your browsing experience and analyze site traffic. By continuing to use our site, you consent to our use of cookies.</p>
                        </div>
                        <div class="cookie-banner-actions">
                            <button class="btn btn-ghost btn-small" onclick="CookieConsent.openModal()" data-translate="cookieManageBtn">Manage Cookies</button>
                            <button class="btn btn-primary btn-small" onclick="CookieConsent.acceptAll()" data-translate="cookieAcceptBtn">Accept All</button>
                        </div>
                    </div>
                </div>

                <div class="cookie-modal" id="cookieModal" style="display: none;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title" data-translate="cookieSettingsTitle">Cookie Settings</h3>
                            <button class="modal-close" onclick="CookieConsent.closeModal()">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M18 6L6 18"/>
                                    <path d="M6 6L18 18"/>
                                </svg>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="cookie-category">
                                <div class="cookie-category-header">
                                    <h4 data-translate="cookieEssentialTitle">Essential Cookies</h4>
                                    <div class="cookie-toggle">
                                        <input type="checkbox" id="essential-cookies" checked disabled>
                                        <label for="essential-cookies" class="toggle-label">
                                            <span class="toggle-switch"></span>
                                        </label>
                                    </div>
                                </div>
                                <p class="cookie-category-description" data-translate="cookieEssentialDescription">These cookies are necessary for the website to function and cannot be disabled.</p>
                            </div>
                            <div class="cookie-category">
                                <div class="cookie-category-header">
                                    <h4 data-translate="cookieAnalyticsTitle">Analytics Cookies</h4>
                                    <div class="cookie-toggle">
                                        <input type="checkbox" id="analytics-cookies">
                                        <label for="analytics-cookies" class="toggle-label">
                                            <span class="toggle-switch"></span>
                                        </label>
                                    </div>
                                </div>
                                <p class="cookie-category-description" data-translate="cookieAnalyticsDescription">These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-ghost" onclick="CookieConsent.rejectNonEssential()" data-translate="cookieRejectBtn">Reject Non-Essential</button>
                            <button class="btn btn-primary" onclick="CookieConsent.savePreferences()" data-translate="cookieSaveBtn">Save Preferences</button>
                        </div>
                    </div>
                </div>
            `;

            // Insert banner into body
            try {
                document.body.insertAdjacentHTML('afterbegin', bannerHTML);
                console.log('✅ Banner HTML inserted into body');
            } catch (e) {
                console.error('❌ Failed to insert banner HTML:', e);
                return;
            }
            
            // Get references
            this.banner = document.getElementById('cookieBanner');
            this.modal = document.getElementById('cookieModal');
            
            if (!this.banner) {
                console.error('❌ Could not find banner element after creation');
                return;
            }
            
            if (!this.modal) {
                console.error('❌ Could not find modal element after creation');
                return;
            }
            
            // Bind modal backdrop click
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
            
            // Update translations if translation system is available
            if (typeof window.t === 'function') {
                this.updateTranslations();
            }
            
            console.log('✅ Cookie banner HTML created and inserted');
            console.log('🎯 Banner element:', this.banner);
            console.log('🎯 Modal element:', this.modal);
        },

        updateTranslations: function() {
            console.log('🌐 Updating cookie banner translations...');
            
            // Update all elements with data-translate attributes in the cookie banner
            const cookieBanner = document.getElementById('cookieBanner');
            const cookieModal = document.getElementById('cookieModal');
            
            [cookieBanner, cookieModal].forEach(container => {
                if (container) {
                    container.querySelectorAll("[data-translate]").forEach((element) => {
                        const key = element.getAttribute("data-translate");
                        if (typeof window.t === 'function') {
                            const translation = window.t(key);
                            if (translation && translation !== key) {
                                element.textContent = translation;
                            }
                        }
                    });
                }
            });
        },

        checkConsent: function() {
            let consent = null;
            
            // If cookies are disabled, use sessionStorage as fallback
            if (!CookieManager.cookiesEnabled) {
                try {
                    const sessionConsent = sessionStorage.getItem('cookie_consent');
                    if (sessionConsent) {
                        const parsedConsent = JSON.parse(sessionConsent);
                        this.applyConsent(parsedConsent);
                        return; // Don't show banner
                    }
                } catch (e) {
                    console.error('❌ Error reading sessionStorage:', e);
                }
                this.showBanner();
                return;
            }

            consent = CookieManager.get('cookie_consent');
            console.log('🔍 Checking consent:', consent);
            
            // If no consent cookie exists, show the banner
            if (!consent) {
                console.log('📣 No consent cookie found, showing banner');
                this.showBanner();
                return;
            }

            // If consent cookie exists but is empty or invalid, show the banner
            if (consent === 'null' || consent === '' || consent === 'undefined') {
                console.log('⚠️ Invalid consent cookie found, showing banner');
                CookieManager.delete('cookie_consent');
                this.showBanner();
                return;
            }

            // Try to parse the consent cookie
            try {
                const parsedConsent = JSON.parse(consent);
                console.log('✅ Valid consent found:', parsedConsent);
                this.applyConsent(parsedConsent);
            } catch (e) {
                console.error('❌ Error parsing consent cookie:', e);
                console.log('🔧 Clearing invalid consent cookie and showing banner');
                CookieManager.delete('cookie_consent');
                this.showBanner();
            }
        },

        showBanner: function() {
            if (!this.banner) {
                console.error('❌ Cannot show banner - element not found');
                return;
            }
            
            console.log('🎉 Showing cookie banner');
            console.log('📐 Banner current styles:', {
                display: this.banner.style.display,
                visibility: getComputedStyle(this.banner).visibility,
                opacity: getComputedStyle(this.banner).opacity,
                transform: getComputedStyle(this.banner).transform
            });
            
            this.banner.style.display = 'block';
            
            // Small delay to ensure smooth animation
            setTimeout(() => {
                this.banner.classList.add('show');
                console.log('✨ Banner show class added');
                console.log('📐 Banner updated styles:', {
                    display: this.banner.style.display,
                    visibility: getComputedStyle(this.banner).visibility,
                    opacity: getComputedStyle(this.banner).opacity,
                    transform: getComputedStyle(this.banner).transform
                });
            }, 100);
        },

        hideBanner: function() {
            if (!this.banner) {
                console.error('❌ Cannot hide banner - element not found');
                return;
            }
            
            console.log('👋 Hiding cookie banner');
            this.banner.classList.remove('show');
            setTimeout(() => {
                this.banner.style.display = 'none';
                console.log('✅ Banner hidden');
            }, 400);
        },

        openModal: function() {
            if (!this.modal) {
                console.error('❌ Cannot open modal - element not found');
                return;
            }
            
            console.log('🔓 Opening cookie modal');
            this.modal.style.display = 'flex';
            setTimeout(() => {
                this.modal.classList.add('show');
            }, 10);
            document.body.style.overflow = 'hidden';
        },

        closeModal: function() {
            if (!this.modal) {
                console.error('❌ Cannot close modal - element not found');
                return;
            }
            
            console.log('🔒 Closing cookie modal');
            this.modal.classList.remove('show');
            setTimeout(() => {
                this.modal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        },

        acceptAll: function() {
            const consent = {
                essential: true,
                analytics: true,
                timestamp: new Date().toISOString()
            };
            
            console.log('✅ Accepting all cookies:', consent);
            if (this.saveConsent(consent)) {
                this.applyConsent(consent);
                this.hideBanner();
            }
        },

        rejectNonEssential: function() {
            const consent = {
                essential: true,
                analytics: false,
                timestamp: new Date().toISOString()
            };
            
            console.log('❌ Rejecting non-essential cookies:', consent);
            if (this.saveConsent(consent)) {
                this.applyConsent(consent);
                this.closeModal();
                this.hideBanner();
            }
        },

        savePreferences: function() {
            const analyticsCheckbox = document.getElementById('analytics-cookies');
            
            const consent = {
                essential: true,
                analytics: analyticsCheckbox ? analyticsCheckbox.checked : false,
                timestamp: new Date().toISOString()
            };
            
            console.log('💾 Saving preferences:', consent);
            if (this.saveConsent(consent)) {
                this.applyConsent(consent);
                this.closeModal();
                this.hideBanner();
            }
        },

        saveConsent: function(consent) {
            try {
                const consentString = JSON.stringify(consent);
                
                // If cookies are disabled, use sessionStorage as fallback
                if (!CookieManager.cookiesEnabled) {
                    sessionStorage.setItem('cookie_consent', consentString);
                    return true;
                }

                // Normal cookie saving
                const saved = CookieManager.set('cookie_consent', consentString, 365);
                
                if (!saved) {
                    console.error('❌ Failed to save cookie consent');
                    return false;
                }
                
                // Verify the cookie was saved
                const verification = CookieManager.get('cookie_consent');
                if (!verification) {
                    console.error('❌ Cookie consent verification failed');
                    return false;
                }
                
                console.log('✅ Cookie consent saved successfully');
                return true;
            } catch (e) {
                console.error('❌ Error saving consent:', e);
                return false;
            }
        },

        applyConsent: function(consent) {
            console.log('⚙️ Applying consent:', consent);
            
            // Apply analytics cookies
            if (consent.analytics) {
                this.loadAnalytics();
            } else {
                this.removeAnalyticsCookies();
            }
        },

        loadAnalytics: function() {
            console.log('📊 Analytics cookies accepted - loading analytics');
            // Add your analytics code here (Google Analytics, etc.)
        },

        removeAnalyticsCookies: function() {
            const analyticsCookies = ['_ga', '_gid', '_gat', '_gtag'];
            analyticsCookies.forEach(cookie => {
                CookieManager.delete(cookie);
            });
            console.log('🧹 Analytics cookies removed');
        },

        // Debug function to clear all consent (for testing)
        clearConsent: function() {
            if (!CookieManager.cookiesEnabled) {
                sessionStorage.removeItem('cookie_consent');
            } else {
                CookieManager.delete('cookie_consent');
            }
            console.log('🗑️ Cookie consent cleared');
            this.checkConsent();
        }
    };

    // Make CookieConsent globally available
    window.CookieConsent = CookieConsent;

    // Make updateTranslations function globally accessible for language switching
    window.updateCookieBannerTranslations = function() {
        if (CookieConsent.updateTranslations) {
            CookieConsent.updateTranslations();
        }
    };

    // Debug function
    window.clearCookieConsent = function() {
        CookieConsent.clearConsent();
    };

    // Force show banner for testing
    window.testShowBanner = function() {
        console.log('🧪 TEST: Force showing banner');
        if (CookieConsent.banner) {
            CookieConsent.showBanner();
        } else {
            console.error('❌ Banner not available for test');
        }
    };

    // Initialize when DOM is ready
    function initializeCookieBanner() {
        console.log('🎬 Initializing Cookie Banner - DOM Ready');
        CookieConsent.init();
    }

    // Multiple initialization methods to ensure it works
    if (document.readyState === 'loading') {
        console.log('📋 Document still loading, adding DOMContentLoaded listener');
        document.addEventListener('DOMContentLoaded', initializeCookieBanner);
    } else {
        console.log('📋 Document already ready, initializing immediately');
        initializeCookieBanner();
    }

    // Fallback initialization
    window.addEventListener('load', function() {
        if (!window.CookieConsent.banner) {
            console.log('🔄 Fallback initialization triggered');
            initializeCookieBanner();
        } else {
            console.log('✅ Cookie banner already initialized');
        }
    });

    // Final fallback with timeout
    setTimeout(function() {
        if (!window.CookieConsent.banner) {
            console.log('⏰ Timeout fallback initialization triggered');
            initializeCookieBanner();
        }
    }, 2000);

    console.log('🍪 Cookie Banner Script Loaded');

})(); 