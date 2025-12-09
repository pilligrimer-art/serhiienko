"use strict";

/**
 * Main Application Controller
 * Handles initialization, routing (state), UI hydration, and PWA registration.
 */

const CONFIG = {
    storageKeys: {
        theme: 'serhiienko_theme_v1',
        lang: 'serhiienko_lang_v1',
        intro: 'serhiienko_intro_v3'
    },
    defaultLang: 'en'
};

// =========================================
// 1. PWA Service Worker Registration
// =========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
           .then(reg => console.log(' Service Worker registered. Scope:', reg.scope))
           .catch(err => console.error(' Service Worker registration failed:', err));
    });
}

// =========================================
// 2. State Management & Initialization
// =========================================
let currentLangState = CONFIG.defaultLang;

function initApp() {
    // 2.1 Theme Initialization
    const savedTheme = localStorage.getItem(CONFIG.storageKeys.theme);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme |

| (systemPrefersDark? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', initialTheme);

    // 2.2 Language Initialization
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    const savedLang = localStorage.getItem(CONFIG.storageKeys.lang);
    
    // Priority: URL Param > LocalStorage > Default
    const langToLoad = langParam |

| savedLang |
| CONFIG.defaultLang;
    changeLanguage(langToLoad, false);

    // 2.3 Event Binding
    setupEventListeners();
    
    // 2.4 Animation Check
    checkIntroAnimation();
}

// =========================================
// 3. Localization Logic
// =========================================
function changeLanguage(lang, pushState = true) {
    // Fallback to default if lang not found
    if (!translations[lang]) lang = CONFIG.defaultLang;
    
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
// 4. Hydration Engine (View Layer)
// =========================================
function escapeHtml(text) {
    if (!text) return '';
    return String(text).replace(/[&<>"']/g, function(m) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
}

function hydrateContent(lang) {
    const d = translations[lang];

    // Meta Tags
    document.title = d.meta.title;
    document.querySelector('meta[name="description"]').setAttribute("content", d.meta.description);
    document.documentElement.lang = lang;

    // Header
    const avatarImg = document.getElementById('avatar');
    if (avatarImg.src!== d.header.avatarUrl) avatarImg.src = d.header.avatarUrl; // Prevent unnecessary refetch
    
    document.getElementById('typedName').textContent = d.header.name;
    
    // Titles Mapping
    const titlesHTML = d.header.titles.map((t, i) => {
        const style = i === 0? 'font-weight:700; color:var(--text-primary); margin-bottom:4px;' : '';
        return `<p style="${style}">${escapeHtml(t)}</p>`;
    }).join('');
    document.getElementById('headerTitles').innerHTML = titlesHTML;
    
    document.getElementById('headerLocation').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${escapeHtml(d.header.location)}`;

    // Action Buttons
    const tgBtn = document.getElementById('telegramBtn');
    tgBtn.href = d.links.telegram.url;
    tgBtn.querySelector('span').textContent = d.links.telegram.text;
    document.getElementById('vcardText').textContent = d.links.vcard;

    // Accordions Generation
    const container = document.getElementById('accordionContainer');
    let contentHTML = '';

    // Helper: Accordion Item Builder
    const buildAccordion = (id, icon, title, innerHTML) => `
        <div class="accordion-item">
            <button class="accordion-header" type="button" aria-expanded="false" aria-controls="${id}">
                <div><i class="${icon} accordion-icon"></i> <span>${escapeHtml(title)}</span></div>
                <i class="fas fa-chevron-down chevron"></i>
            </button>
            <div id="${id}" class="accordion-body" hidden>
                <div class="accordion-inner">${innerHTML}</div>
            </div>
        </div>`;

    // 4.1 Positions
    if (d.sections.pos) {
        const items = d.sections.pos.items.map(i => `
            <div class="list-item">
                <i class="${i.icon}"></i>
                <div>
                    <strong>${escapeHtml(i.title)}</strong><br>
                    <small style="opacity:0.8">${escapeHtml(i.desc)}</small>
                </div>
            </div>`).join('');
        contentHTML += buildAccordion('acc-pos', 'fas fa-briefcase', d.sections.pos.title, items);
    }

    // 4.2 About
    if (d.sections.about) {
        const items = d.sections.about.items.map(i => `<div class="list-item"><i class="${i.icon}"></i><span>${escapeHtml(i.text)}</span></div>`).join('');
        const tags = d.sections.about.tags? `<div class="tag-cloud">${d.sections.about.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>` : '';
        contentHTML += buildAccordion('acc-about', 'fas fa-user-circle', d.sections.about.title, items + tags);
    }

    // 4.3 Science
    if (d.sections.science) {
        const items = d.sections.science.items.map(i => `<div class="list-item"><i class="${i.icon}"></i><span>${escapeHtml(i.text)}</span></div>`).join('');
        let profiles = '';
        if (d.sections.science.profiles && d.sections.science.profiles.length) {
            profiles = `
                <div style="margin-top:16px; padding-top:12px; border-top:1px solid rgba(255,255,255,0.1)">
                    <p style="font-size:0.8rem; margin-bottom:8px; font-weight:600">${escapeHtml(d.sections.science.profilesTitle)}</p>
                    <div class="social-grid" style="margin-top:0">
                        ${d.sections.science.profiles.map(p => `
                            <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="social-card">
                                <i class="${p.icon}"></i><span>${escapeHtml(p.name)}</span>
                            </a>
                        `).join('')}
                    </div>
                </div>`;
        }
        contentHTML += buildAccordion('acc-sci', 'fas fa-brain', d.sections.science.title, items + profiles);
    }

    container.innerHTML = contentHTML;

    // Footer
    document.getElementById('connectTitle').textContent = d.links.connectTitle;
    document.getElementById('lblLinkedin').textContent = d.links.socials.linkedin;
    document.getElementById('lblFacebook').textContent = d.links.socials.facebook;
    document.getElementById('lblInsta').textContent = d.links.socials.instagram;
    document.getElementById('mainFooter').innerHTML = `${escapeHtml(d.footer.text)} <small style="opacity:0.5; margin-left:5px">${escapeHtml(d.footer.devName)}</small>`;
}

// =========================================
// 5. Interaction Handlers
// =========================================
function setupEventListeners() {
    // 5.1 Language Switching
    document.querySelectorAll('.lang-flag').forEach(btn => {
        btn.addEventListener('click', () => changeLanguage(btn.dataset.lang));
    });

    // 5.2 Theme Toggling
    document.getElementById('theme-toggle').addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark'? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem(CONFIG.storageKeys.theme, next);
        
        // Regenerate QR if visible (to match contrast)
        const qrSec = document.getElementById('qr-section');
        if (!qrSec.hidden) generateQR();
    });

    // 5.3 Accordion Delegation (Performance Optimization)
    document.getElementById('accordionContainer').addEventListener('click', (e) => {
        const btn = e.target.closest('.accordion-header');
        if (!btn) return;

        const item = btn.parentElement;
        const body = item.querySelector('.accordion-body');
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';

        // Accordion behavior: close others
        document.querySelectorAll('.accordion-item').forEach(acc => {
            if (acc!== item) {
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

    // 5.4 vCard Generation
    document.getElementById('vcardBtn').addEventListener('click', generateVCard);

    // 5.5 QR Code Toggle
    document.getElementById('qr-toggle').addEventListener('click', () => {
        const qrSec = document.getElementById('qr-section');
        qrSec.hidden =!qrSec.hidden;
        if (!qrSec.hidden) generateQR();
    });
}

function generateQR() {
    const qrDiv = document.getElementById('qrcode');
    qrDiv.innerHTML = ''; // Clear previous
    
    // Check if library loaded
    if (typeof QRCode === 'undefined') {
        qrDiv.textContent = 'Error: QR Library not loaded';
        return;
    }

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    new QRCode(qrDiv, {
        text: window.location.href,
        width: 128,
        height: 128,
        colorDark : isLight? "#000000" : "#0f172a",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}

function generateVCard() {
    const d = translations.vcard;
    // vCard 3.0 Standard
    const vCardData =.join("\r\n");

    const blob = new Blob(, { type: "text/vcard;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "contact.vcf";
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }, 100);
}

function checkIntroAnimation() {
    const hasPlayed = sessionStorage.getItem(CONFIG.storageKeys.intro);
    const container = document.querySelector('.profile-container');
    const nameTitle = document.getElementById('typedName');

    if (hasPlayed) {
        // Skip animation
        container.classList.remove('intro-active');
        nameTitle.style.borderRight = 'none';
        nameTitle.style.width = 'auto';
    } else {
        // Run animation logic (simplified via CSS classes in this structure)
        // Wait for CSS animations to finish roughly
        setTimeout(() => {
            container.classList.remove('intro-active');
            nameTitle.style.borderRight = 'none';
            sessionStorage.setItem(CONFIG.storageKeys.intro, 'true');
        }, 2200);
    }
}

// Boot the App
document.addEventListener('DOMContentLoaded', initApp);