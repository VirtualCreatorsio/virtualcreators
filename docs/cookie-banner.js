// Cookie Banner JavaScript - Dynamic Implementation
(function() {
    'use strict';
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
            // Initialize GTM consent mode with default denied state
            this.initializeConsentMode();
            
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
        initializeConsentMode: function() {
            // Initialize dataLayer if it doesn't exist
            window.dataLayer = window.dataLayer || [];
            
            // Set default consent state (denied) before GTM loads
            window.dataLayer.push({
                'event': 'consent_default',
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
            });
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
        },
        updateTranslations: function() {
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
            // If no consent cookie exists, show the banner
            if (!consent) {
                this.showBanner();
                return;
            }
            // If consent cookie exists but is empty or invalid, show the banner
            if (consent === 'null' || consent === '' || consent === 'undefined') {
                CookieManager.delete('cookie_consent');
                this.showBanner();
                return;
            }
            // Try to parse the consent cookie
            try {
                const parsedConsent = JSON.parse(consent);
                this.applyConsent(parsedConsent);
            } catch (e) {
                console.error('❌ Error parsing consent cookie:', e);
                CookieManager.delete('cookie_consent');
                this.showBanner();
            }
        },
        showBanner: function() {
            if (!this.banner) {
                console.error('❌ Cannot show banner - element not found');
                return;
            }
            
            // Use requestAnimationFrame to batch DOM operations and prevent forced reflows
            requestAnimationFrame(() => {
                // Batch all DOM style changes together
                this.banner.style.display = 'block';
                this.banner.style.visibility = 'visible';
                this.banner.style.opacity = '1';
                
                // Small delay to ensure smooth animation
                setTimeout(() => {
                    this.banner.classList.add('show');
                }, 100);
            });
        },
        hideBanner: function() {
            if (!this.banner) {
                console.error('❌ Cannot hide banner - element not found');
                return;
            }
            this.banner.classList.remove('show');
            setTimeout(() => {
                this.banner.style.display = 'none';
            }, 400);
        },
        openModal: function() {
            if (!this.modal) {
                console.error('❌ Cannot open modal - element not found');
                return;
            }
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
                return true;
            } catch (e) {
                console.error('❌ Error saving consent:', e);
                return false;
            }
        },
        applyConsent: function(consent) {
            // Apply analytics cookies based on consent
            if (consent.analytics) {
                this.loadAnalytics();
            } else {
                this.removeAnalyticsCookies();
            }
            
            // Update GTM consent mode based on user's choice
            if (typeof window.dataLayer !== 'undefined') {
                window.dataLayer.push({
                    'event': 'consent_update',
                    'analytics_storage': consent.analytics ? 'granted' : 'denied',
                    'ad_storage': consent.analytics ? 'granted' : 'denied',
                    'ad_user_data': consent.analytics ? 'granted' : 'denied',
                    'ad_personalization': consent.analytics ? 'granted' : 'denied'
                });
            }
        },
        loadAnalytics: function() {
            // Enable Google Analytics 4 via GTM dataLayer
            if (typeof window.dataLayer !== 'undefined') {
                // Set consent mode to granted for analytics
                window.dataLayer.push({
                    'event': 'consent_update',
                    'analytics_storage': 'granted',
                    'ad_storage': 'granted',
                    'ad_user_data': 'granted',
                    'ad_personalization': 'granted'
                });
                
                // Trigger GTM to reload with new consent settings
                window.dataLayer.push({
                    'event': 'gtm.js',
                    'gtm.start': new Date().getTime()
                });
            } else {
                console.warn('⚠️ GTM dataLayer not found - GTM may not be loaded yet');
            }
        },
        removeAnalyticsCookies: function() {
            // Disable Google Analytics 4 via GTM dataLayer
            if (typeof window.dataLayer !== 'undefined') {
                // Set consent mode to denied for analytics
                window.dataLayer.push({
                    'event': 'consent_update',
                    'analytics_storage': 'denied',
                    'ad_storage': 'denied',
                    'ad_user_data': 'denied',
                    'ad_personalization': 'denied'
                });
            }
            
            // Remove existing GA4 cookies
            const analyticsCookies = ['_ga', '_gid', '_gat', '_gtag', '_ga_', '_gcl_au', '_gcl_aw', '_gcl_dc'];
            analyticsCookies.forEach(cookie => {
                CookieManager.delete(cookie);
                // Also try to delete with domain variations
                CookieManager.delete(cookie, '.virtualcreators.io');
                CookieManager.delete(cookie, '.www.virtualcreators.io');
            });
        },
        // Debug function to clear all consent (for testing)
        clearConsent: function() {
            if (!CookieManager.cookiesEnabled) {
                sessionStorage.removeItem('cookie_consent');
            } else {
                CookieManager.delete('cookie_consent');
            }
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
        if (CookieConsent.banner) {
            CookieConsent.showBanner();
        } else {
            console.error('❌ Banner not available for test');
        }
    };
    // Initialize when DOM is ready
    function initializeCookieBanner() {
        CookieConsent.init();
    }
    // Multiple initialization methods to ensure it works
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeCookieBanner);
    } else {
        initializeCookieBanner();
    }
    // Fallback initialization
    window.addEventListener('load', function() {
        if (!window.CookieConsent.banner) {
            initializeCookieBanner();
        }
    });
    // Final fallback with timeout
    setTimeout(function() {
        if (!window.CookieConsent.banner) {
            initializeCookieBanner();
        }
    }, 2000);
})();
