"use strict";

/**
 * Main Application Controller
 * Handles initialization, routing (state), UI hydration, and PWA registration.
 * 
 * Security: All user-facing content is sanitized via escapeHtml() and sanitizeIcon()
 * Performance: Event delegation for accordions, lazy QR generation
 */

const CONFIG = {
    storageKeys: {
        theme: 'serhiienko_theme_v1',
        lang: 'serhiienko_lang_v1',
        intro: 'serhiienko_intro_v3'
    },
    defaultLang: 'en',
    socialLinks: {
        linkedin: 'https://www.linkedin.com/in/olenaserhiienko/',
        facebook: 'https://www.facebook.com/serhiienkoo',
        instagram: 'https://www.instagram.com/helenkaser/'
    }
};

// =========================================
// 1. PWA Service Worker Registration
// =========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('✅ Service Worker registered. Scope:', reg.scope))
            .catch(err => console.error('❌ Service Worker registration failed:', err));
    });
}

// =========================================
// 2. Security Utilities
// =========================================

/**
 * Escapes HTML special characters to prevent XSS attacks
 * @param {string} text - Raw text input
 * @returns {string} - Escaped HTML-safe string
 */
function escapeHtml(text) {
    if (!text) return '';
    return String(text).replace(/[&<>"']/g, function(m) {
        return { 
            '&': '&amp;', 
            '<': '&lt;', 
            '>': '&gt;', 
            '"': '&quot;', 
            "'": '&#039;' 
        }[m];
    });
}

/**
 * Validates and sanitizes Font Awesome icon classes
 * Prevents XSS via malicious CSS class injection
 * @param {string} icon - Font Awesome class string (e.g., "fas fa-home")
 * @returns {string} - Sanitized icon class or fallback
 */
function sanitizeIcon(icon) {
    if (!icon || typeof icon !== 'string') {
        console.warn('⚠️ Invalid icon:', icon);
        return 'fas fa-question';
    }
    
    // Whitelist: Only allow standard Font Awesome patterns
    const allowedPattern = /^(fas|fab|far)\s+fa-[\w-]+$/;
    
    if (!allowedPattern.test(icon)) {
        console.warn('⚠️ Blocked suspicious icon class:', icon);
        return 'fas fa-question';
    }
    
    return escapeHtml(icon);
}

// =========================================
// 3. State Management & Initialization
// =========================================
let currentLangState = CONFIG.defaultLang;

function initApp() {
    // 3.1 Validate translations loaded
    if (typeof translations === 'undefined') {
        console.error('❌ Critical Error: translations object not found!');
        document.body.innerHTML = '<div style="color:white; text-align:center; margin-top:50px; padding:20px;">Error: Data file (data.js) failed to load. Please refresh the page.</div>';
        return;
    }

    // 3.2 Theme Initialization
    const savedTheme = localStorage.getItem(CONFIG.storageKeys.theme);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', initialTheme);

    // 3.3 Language Initialization
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    const savedLang = localStorage.getItem(CONFIG.storageKeys.lang);
    
    // Priority: URL Param > LocalStorage > Default
    const langToLoad = langParam || savedLang || CONFIG.defaultLang;
    changeLanguage(langToLoad, false);

    // 3.4 Event Binding
    setupEventListeners();
    
    // 3.5 Animation Check
    checkIntroAnimation();
}

// =========================================
// 4. Localization Logic
// =========================================
function changeLanguage(lang, pushState = true) {
    // Fallback to default if lang not found
    if (!translations[lang]) {
        console.warn('⚠️ Language not found:', lang, '- falling back to', CONFIG.defaultLang);
        lang = CONFIG.defaultLang;
    }
    
    currentLangState = lang;
    localStorage.setItem(CONFIG.storageKeys.lang, lang);

    // Update UI Toggles
    document.querySelectorAll('.lang-flag').forEach(btn => {
        const isActive = btn.dataset.lang === lang;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive);
    });

    // Update URL without reload
    if (pushState) {
        const url = new URL(window.location);
        url.searchParams.set('lang', lang);
        window.history.pushState({}, '', url);
    }

    hydrateContent(lang);
}

// =========================================
// 5. Hydration Engine (View Layer)
// =========================================
function hydrateContent(lang) {
    const d = translations[lang];
    
    if (!d) {
        console.error('❌ Translation data missing for language:', lang);
        return;
    }

    // 5.1 Meta Tags
    document.title = escapeHtml(d.meta.title);
    document.querySelector('meta[name="description"]').setAttribute("content", escapeHtml(d.meta.description));
    document.documentElement.lang = lang === 'ua' ? 'uk' : lang; // ISO 639-1 correction

    // 5.2 Header
    const avatarImg = document.getElementById('avatar');
    if (avatarImg.src !== d.header.avatarUrl) {
        avatarImg.src = d.header.avatarUrl;
    }
    avatarImg.alt = escapeHtml(d.header.name);
    
    document.getElementById('typedName').textContent = d.header.name; // textContent is XSS-safe
    
    // 5.3 Titles Mapping
    const titlesHTML = d.header.titles.map((t, i) => {
        const style = i === 0 ? 'font-weight:700; color:var(--text-primary); margin-bottom:4px;' : '';
        return `<p style="${style}">${escapeHtml(t)}</p>`;
    }).join('');
    document.getElementById('headerTitles').innerHTML = titlesHTML;
    
    document.getElementById('headerLocation').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${escapeHtml(d.header.location)}`;

    // 5.4 Action Buttons
    const tgBtn = document.getElementById('telegramBtn');
    tgBtn.href = d.links.telegram.url;
    tgBtn.querySelector('span').textContent = d.links.telegram.text;
    document.getElementById('vcardText').textContent = d.links.vcard;

    // 5.5 Accordions Generation
    const container = document.getElementById('accordionContainer');
    let contentHTML = '';

    // Helper: Accordion Item Builder
    const buildAccordion = (id, icon, title, innerHTML) => `
        <div class="accordion-item">
            <button class="accordion-header" type="button" aria-expanded="false" aria-controls="${id}">
                <div><i class="${sanitizeIcon(icon)} accordion-icon"></i> <span>${escapeHtml(title)}</span></div>
                <i class="fas fa-chevron-down chevron"></i>
            </button>
            <div id="${id}" class="accordion-body" hidden>
                <div class="accordion-inner">${innerHTML}</div>
            </div>
        </div>`;

    // 5.5.1 Positions Section
    if (d.sections.pos) {
        const items = d.sections.pos.items.map(i => `
            <div class="list-item">
                <i class="${sanitizeIcon(i.icon)}"></i>
                <div>
                    <strong>${escapeHtml(i.title)}</strong><br>
                    <small style="opacity:0.8">${escapeHtml(i.desc)}</small>
                </div>
            </div>`).join('');
        contentHTML += buildAccordion('acc-pos', 'fas fa-briefcase', d.sections.pos.title, items);
    }

    // 5.5.2 About Section
    if (d.sections.about) {
        const items = d.sections.about.items.map(i => `
            <div class="list-item">
                <i class="${sanitizeIcon(i.icon)}"></i>
                <span>${escapeHtml(i.text)}</span>
            </div>`).join('');
        
        const tags = d.sections.about.tags ? `
            <div class="tag-cloud">
                ${d.sections.about.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
            </div>` : '';
        
        contentHTML += buildAccordion('acc-about', 'fas fa-user-circle', d.sections.about.title, items + tags);
    }

    // 5.5.3 Science Section
    if (d.sections.science) {
        const items = d.sections.science.items.map(i => `
            <div class="list-item">
                <i class="${sanitizeIcon(i.icon)}"></i>
                <span>${escapeHtml(i.text)}</span>
            </div>`).join('');
        
        let profiles = '';
        if (d.sections.science.profiles && d.sections.science.profiles.length) {
            profiles = `
                <div style="margin-top:16px; padding-top:12px; border-top:1px solid rgba(255,255,255,0.1)">
                    <p style="font-size:0.8rem; margin-bottom:8px; font-weight:600">${escapeHtml(d.sections.science.profilesTitle)}</p>
                    <div class="social-grid" style="margin-top:0">
                        ${d.sections.science.profiles.map(p => `
                            <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="social-card">
                                <i class="${sanitizeIcon(p.icon)}"></i>
                                <span>${escapeHtml(p.name)}</span>
                            </a>
                        `).join('')}
                    </div>
                </div>`;
        }
        contentHTML += buildAccordion('acc-sci', 'fas fa-brain', d.sections.science.title, items + profiles);
    }

    container.innerHTML = contentHTML;

    // 5.6 Footer Social Links
    document.getElementById('connectTitle').textContent = d.links.connectTitle;
    document.getElementById('lblLinkedin').textContent = d.links.socials.linkedin;
    document.getElementById('lblFacebook').textContent = d.links.socials.facebook;
    document.getElementById('lblInsta').textContent = d.links.socials.instagram;
    
    // Use CONFIG for consistency
    document.getElementById('footerLinkedin').href = CONFIG.socialLinks.linkedin;
    document.getElementById('footerFacebook').href = CONFIG.socialLinks.facebook;
    document.getElementById('footerInsta').href = CONFIG.socialLinks.instagram;
    
    document.getElementById('mainFooter').innerHTML = `
        ${escapeHtml(d.footer.text)} 
        <small style="opacity:0.5; margin-left:5px">${escapeHtml(d.footer.devName)}</small>`;
}

// =========================================
// 6. Interaction Handlers
// =========================================
function setupEventListeners() {
    // 6.1 Language Switching
    document.querySelectorAll('.lang-flag').forEach(btn => {
        btn.addEventListener('click', () => changeLanguage(btn.dataset.lang));
    });

    // 6.2 Theme Toggling
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem(CONFIG.storageKeys.theme, next);
            
            // Regenerate QR if visible (to match contrast)
            const qrSec = document.getElementById('qr-section');
            if (qrSec && !qrSec.hidden) generateQR();
        });
    }

    // 6.3 Accordion Delegation (Performance Optimization)
    document.getElementById('accordionContainer').addEventListener('click', (e) => {
        const btn = e.target.closest('.accordion-header');
        if (!btn) return;

        const item = btn.parentElement;
        const body = item.querySelector('.accordion-body');
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';

        // Accordion behavior: close others
        document.querySelectorAll('.accordion-item').forEach(acc => {
            if (acc !== item) {
                acc.classList.remove('active');
                acc.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                const accBody = acc.querySelector('.accordion-body');
                accBody.hidden = true;
                accBody.style.maxHeight = null;
            }
        });

        if (isExpanded) {
            item.classList.remove('active');
            btn.setAttribute('aria-expanded', 'false');
            body.hidden = true;
            body.style.maxHeight = null;
        } else {
            item.classList.add('active');
            btn.setAttribute('aria-expanded', 'true');
            body.hidden = false;
            // Force reflow for transition
            void body.offsetWidth; 
            body.style.maxHeight = body.scrollHeight + "px";
        }
    });

    // 6.4 vCard Generation
    document.getElementById('vcardBtn').addEventListener('click', generateVCard);

    // 6.5 QR Code Toggle
    const qrToggle = document.getElementById('qr-toggle');
    if (qrToggle) {
        qrToggle.addEventListener('click', () => {
            const qrSec = document.getElementById('qr-section');
            if (qrSec) {
                qrSec.hidden = !qrSec.hidden;
                if (!qrSec.hidden) generateQR();
            }
        });
    }
}

// =========================================
// 7. QR Code Generator
// =========================================
function generateQR() {
    const qrDiv = document.getElementById('qrcode');
    if (!qrDiv) return;
    
    qrDiv.innerHTML = ''; // Clear previous
    
    // Check if library loaded
    if (typeof QRCode === 'undefined') {
        qrDiv.innerHTML = '<p style="color:red;">Error: QR Library not loaded</p>';
        console.error('❌ QRCode library not found. Make sure qrcode.min.js is loaded.');
        return;
    }

    try {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        new QRCode(qrDiv, {
            text: window.location.href,
            width: 128,
            height: 128,
            colorDark: isLight ? "#000000" : "#0f172a",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    } catch (error) {
        console.error('❌ QR Code generation failed:', error);
        qrDiv.innerHTML = '<p style="color:red;">Failed to generate QR code</p>';
    }
}

// =========================================
// 8. vCard Generator
// =========================================
function generateVCard() {
    try {
        const v = translations[currentLangState].vcard;
        
        if (!v) {
            console.error('❌ vCard data not found for language:', currentLangState);
            alert('Error: Contact data not available');
            return;
        }
        
        // vCard 3.0 Standard
        const vCardData = [
            "BEGIN:VCARD",
            "VERSION:3.0",
            `FN:${v.fn}`,
            `N:${v.n}`,
            `TITLE:${v.title}`,
            `ORG:${v.org}`,
            `EMAIL:${v.email}`,
            `ADR;WORK:;;${v.location_work};;;`,
            `URL:${window.location.origin}`,
            `PHOTO;VALUE=URI:${window.location.origin}/${translations[currentLangState].header.avatarUrl}`,
            `NOTE:${v.note}`,
            "END:VCARD"
        ].join("\r\n");

        // Create downloadable blob
        const blob = new Blob(["\uFEFF" + vCardData], { type: "text/vcard;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "contact.vcf";
        link.style.display = "none";
        
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        }, 100);
    } catch (error) {
        console.error('❌ vCard generation failed:', error);
        alert('Error generating vCard. Please try again.');
    }
}

// =========================================
// 9. Intro Animation Control
// =========================================
function checkIntroAnimation() {
    const hasPlayed = sessionStorage.getItem(CONFIG.storageKeys.intro);
    const container = document.querySelector('.profile-container');
    const nameTitle = document.getElementById('typedName');

    if (!container || !nameTitle) return;

    if (hasPlayed) {
        // Skip animation - show immediately
        container.classList.remove('intro-active');
        nameTitle.style.borderRight = 'none';
        nameTitle.style.width = 'auto';
        
        // Show all fade-in elements
        document.querySelectorAll('.fade-in-element').forEach(el => {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
        });
    } else {
        // Run animation - CSS handles the visual effect
        setTimeout(() => {
            container.classList.remove('intro-active');
            nameTitle.style.borderRight = 'none';
            
            // Fade in other elements
            document.querySelectorAll('.fade-in-element').forEach(el => {
                el.style.opacity = '1';
                el.style.visibility = 'visible';
            });
            
            sessionStorage.setItem(CONFIG.storageKeys.intro, 'true');
        }, 2200); // Match CSS animation duration
    }
}

// =========================================
// 10. Boot the Application
// =========================================
document.addEventListener('DOMContentLoaded', initApp);