/**
 * Global Data Repository for Prof. Dr. Olena Serhiienko's Profile.
 * This file serves as the Content Management System (CMS) for the static site.
 * * Architecture:
 * - Keys (en, ua, de, ru) correspond to ISO language codes.
 * - Structure strictly mimics the UI component hierarchy.
 */

export const translations = {
    en: {
        meta: {
            title: "Prof. Dr. Olena Serhiienko - Academic Profile",
            description: "Official academic profile of Prof. Dr. Olena Serhiienko, Doctor of Economics, Professor at NTU KhPI."
        },
        header: {
            name: "Olena Serhiienko",
            titles: [
                "Doctor of Economics | Professor",
                "Department of Business, Trade and Logistics",
                "National Technical University 'Kharkiv Polytechnic Institute'"
            ],
            location: "Münster, Germany / Kharkiv, Ukraine",
            avatarUrl: "assets/images/photo.png"
        },
        links: {
            telegram: { url: "https://t.me/HelenSerhiienko", text: "Telegram" },
            vcard: "Save Contact",
            connectTitle: "Connect with me",
            socials: { linkedin: "LinkedIn", facebook: "Facebook", instagram: "Instagram" }
        },
        sections: {
            pos: {
                title: "Key Positions",
                items: [
                    { 
                        icon: "fas fa-university", 
                        title: "Professor at NTU KhPI", 
                        desc: "Professor at the Dept. of Business, Trade & Logistics. PhD Program Guarantor."
                    },
                    { 
                        icon: "fas fa-heartbeat", 
                        title: "CEO HealthHelper", 
                        desc: "Methodology for blood velocity & BP measurement (Mobile Device, IoT). Mission: Improving health monitoring efficiency."
                    },
                    { 
                        icon: "fas fa-globe-europe", 
                        title: "VP Three Seas Initiative (Ukraine)", 
                        desc: "Vice-President of the international platform «THREE SEAS INITIATIVE-UKRAINE»."
                    },
                    { 
                        icon: "fas fa-plane-departure", 
                        title: "Ambassador MWR Life", 
                        desc: "Ambassador of the international travelers club."
                    },
                    { 
                        icon: "fas fa-users", 
                        title: "Co-Founder ProSMARTBiz", 
                        desc: "Public activity & NGO."
                    },
                    { 
                        icon: "fas fa-rocket", 
                        title: "Co-Founder UTTT LLC", 
                        desc: "Co-Founder of Ukrainian Technology Transfer Team (UTTT LLC)."
                    }
                ]
            },
            about: {
                title: "About Me",
                items: [
                    { 
                        icon: "fas fa-chess-knight", 
                        text: "Strategic Architect. Expert in personal & business strategies for leaders and Forbes-listed teams." 
                    },
                    { 
                        icon: "fas fa-chart-line", 
                        text: "Strategic business consulting, analytics, forecasting, scientific project expertise." 
                    },
                    { 
                        icon: "fas fa-bullhorn", 
                        text: "Strategic PR — creating intellectual weight and reputation through international publications." 
                    }
                ],
                tags: ["Strategic Consulting", "PR & Reputation", "MedTech", "Data Science"]
            },
            science: {
                title: "Scientific Expertise",
                items: [
                    { icon: "fas fa-check-circle", text: "Over 25 years of experience in higher education" },
                    { icon: "fas fa-check-circle", text: "Scientific school, supervisor of dissertation research" },
                    { icon: "fas fa-check-circle", text: "Author of 350+ scientific publications and monographs" },
                    { icon: "fas fa-check-circle", text: "Over 100 presentations at international conferences" }
                ],
                profilesTitle: "Academic Profiles",
                profiles: [
                    { icon: "fas fa-graduation-cap", name: "Scholar", url: "https://scholar.google.com.ua/citations?user=khohzfEAAAAJ" },
                    { icon: "fab fa-orcid", name: "ORCID", url: "https://orcid.org/0000-0002-9796-9218" },
                    { icon: "fas fa-layer-group", name: "Scopus", url: "https://www.scopus.com/authid/detail.uri?authorId=57219245125" }
                ]
            }
        },
        vcard: {
            fn: "Dr. Olena Serhiienko",
            n: "Serhiienko;Olena;;Dr.;Prof.",
            title: "Doctor of Science (Economics), Professor, CEO HealthHelper",
            org: "NTU KhPI;HealthHelper",
            email: "serhelenka@gmail.com",
            location_work: "Münster, Germany / Kharkiv, Ukraine",
            note: "Doctor of Economics, Professor. Strategic Architect. CEO HealthHelper. VP Three Seas Initiative Ukraine."
        },
        footer: {
            text: "© 2025 Olena Serhiienko. Designed by",
            devName: "@psamm"
        }
    },
    
    // Ukrainian Localization
    ua: {
        meta: { 
            title: "Проф. д.е.н., Олена Сергієнко - Академічний профіль", 
            description: "Офіційний профіль доктора економічних наук, професора Олени Сергієнко." 
        },
        header: {
            name: "Олена Сергієнко",
            titles: [
                "Доктор економічних наук | Професор",
                "Кафедра «Підприємництво, торгівля та логістика»",
                "Національний технічний університет «ХПІ»"
            ],
            location: "Мюнстер, Німеччина / Харків, Україна",
            avatarUrl: "assets/images/photo.png"
        },
        links: {
            telegram: { url: "https://t.me/HelenSerhiienko", text: "Телеграм" },
            vcard: "Зберегти контакт",
            connectTitle: "Зв'яжіться зі мною",
            socials: { linkedin: "LinkedIn", facebook: "Facebook", instagram: "Instagram" }
        },
        sections: {
            pos: {
                title: "Ключові позиції",
                items: [
                    { icon: "fas fa-university", title: "Професор НТУ ХПІ", desc: "Професор кафедри «Підприємництво, торгівля та логістика», НТУ «ХПІ». Гарант PhD програми." },
                    { icon: "fas fa-heartbeat", title: "CEO HealthHelper", desc: "Методологія вимірювання швидкості крові та АТ (Mobile Device, IoT). Місія – підвищення ефективності моніторингу здоров'я." },
                    { icon: "fas fa-globe-europe", title: "Віце-президент 3SI (Україна)", desc: "Віце-президент міжнародної платформи «THREE SEAS INITIATIVE-UKRAINE»." },
                    { icon: "fas fa-plane-departure", title: "Амбасадор MWR Life", desc: "Амбасадор міжнародного клубу мандрівників." },
                    { icon: "fas fa-users", title: "Співзасновник ProSMARTBiz", desc: "Громадська діяльність." },
                    { icon: "fas fa-rocket", title: "Співзасновник UTTT LLC", desc: "Співзасновник Ukrainian Technology Transfer Team (UTTT LLC)." }
                ]
            },
            about: {
                title: "Про мене",
                items: [
                    { icon: "fas fa-chess-knight", text: "Стратег-архітектор. Експерт з особистих та бізнес-стратегій для лідерів та команд зі списку Forbes." },
                    { icon: "fas fa-chart-line", text: "Стратегічний бізнес-консалтинг, аналітика, прогнозування, наукова експертиза проектів." },
                    { icon: "fas fa-bullhorn", text: "Стратегічний PR — створення інтелектуальної ваги та репутації через публікації у міжнародних виданнях." }
                ],
                tags: ["Стратегічний консалтинг", "PR & Репутація", "MedTech", "Data Science"]
            },
            science: {
                title: "Наукова експертиза",
                items: [
                    { icon: "fas fa-check-circle", text: "Більше 25 років досвіду роботи у вищій школі" },
                    { icon: "fas fa-check-circle", text: "Наукова школа, керівник дисертаційних досліджень" },
                    { icon: "fas fa-check-circle", text: "Автор понад 350 науково-методичних та міжнародних публікацій, монографій" },
                    { icon: "fas fa-check-circle", text: "Більше 100 виступів на міжнародних конференціях" }
                ],
                profilesTitle: "Академічні профілі",
                profiles: [
                    { icon: "fas fa-graduation-cap", name: "Scholar", url: "https://scholar.google.com.ua/citations?user=khohzfEAAAAJ" },
                    { icon: "fab fa-orcid", name: "ORCID", url: "https://orcid.org/0000-0002-9796-9218" },
                    { icon: "fas fa-layer-group", name: "Scopus", url: "https://www.scopus.com/authid/detail.uri?authorId=57219245125" }
                ]
            }
        },
        vcard: {
            fn: "Dr. Olena Serhiienko",
            n: "Serhiienko;Olena;Andriianovna;Dr.;Prof.",
            title: "Доктор економічних наук, Професор, Економіст-аналітик, CEO HealthHelper",
            org: "НТУ ХПІ;HealthHelper",
            email: "serhelenka@gmail.com",
            location_work: "Мюнстер, Німеччина / Харків, Україна",
            note: "Доктор економічних наук, Професор. Стратег-архітектор. Експерт з особистих та бізнес-стратегій. CEO HealthHelper. Віце-президент Ініціативи трьох морів України."
        },
        footer: {
            text: "© 2025 Олена Сергієнко. Розроблено",
            devName: "@psamm"
        }
    },

    // German Localization
    de: {
        meta: { 
            title: "Prof. Dr. Olena Serhiienko - Akademisches Profil", 
            description: "Offizielles akademisches Profil von Prof. Dr. Olena Serhiienko, Doktor der Wirtschaftswissenschaften." 
        },
        header: {
            name: "Olena Serhiienko",
            titles: [
                "Doktor der Wirtschaftswissenschaften | Professorin",
                "Lehrstuhl für Unternehmertum, Handel & Logistik",
                "Nationale Technische Universität 'Charkiw Polytechnisches Institut'"
            ],
            location: "Münster, Deutschland / Charkiw, Ukraine",
            avatarUrl: "assets/images/photo.png"
        },
        links: { 
            telegram: { url: "https://t.me/HelenSerhiienko", text: "Telegram" }, 
            vcard: "Kontakt speichern", 
            connectTitle: "Kontaktieren Sie mich", 
            socials: { linkedin: "LinkedIn", facebook: "Facebook", instagram: "Instagram" } 
        },
        sections: {
            pos: { 
                title: "Schlüsselpositionen", 
                items: [
                    { icon: "fas fa-university", title: "Professorin an der NTU 'ChPI'", desc: "Professorin am Lehrstuhl für Unternehmertum, Handel & Logistik. Garantin des PhD-Programms." },
                    { icon: "fas fa-heartbeat", title: "CEO HealthHelper", desc: "Methodik zur Messung der Blutgeschwindigkeit & BP (Mobile Device, IoT)." }
                ]
            },
            about: { 
                title: "Über mich", 
                items: [
                    { icon: "fas fa-chess-knight", text: "Strategie-Architektin. Expertin für persönliche & Geschäftsstrategien für Führungskräfte und Forbes-Teams." }
                ], 
                tags: ["Strategische Beratung", "PR & Reputation", "MedTech", "Data Science"] 
            },
            science: { 
                title: "Wissenschaftliche Expertise", 
                items: [
                    { icon: "fas fa-book", text: "Autorin von über 350 Publikationen." }
                ], 
                profilesTitle: "Akademische Profile", 
                profiles: [
                    { icon: "fas fa-graduation-cap", name: "Scholar", url: "https://scholar.google.com.ua/citations?user=khohzfEAAAAJ" },
                    { icon: "fab fa-orcid", name: "ORCID", url: "https://orcid.org/0000-0002-9796-9218" }
                ]
            }
        },
        vcard: { 
            fn: "Dr. Olena Serhiienko", 
            n: "Serhiienko;Olena;;Dr.;Prof.", 
            title: "Doktor der Wirtschaftswissenschaften, Professorin, CEO HealthHelper", 
            org: "NTU KhPI;HealthHelper", 
            email: "serhelenka@gmail.com", 
            location_work: "Münster, Deutschland / Charkiw, Ukraine", 
            note: "Doktor der Wirtschaftswissenschaften. Strategie-Architektin. CEO HealthHelper. VP Drei-Meere-Initiative UA." 
        },
        footer: { 
            text: "© 2025 Olena Serhiienko. Entwickelt von", 
            devName: "@psamm" 
        }
    },

    // Russian Localization
    ru: {
        meta: { 
            title: "Проф. д.э.н., Елена Сергиенко - Академический профиль", 
            description: "Официальный профиль доктора экономических наук, профессора Елены Сергиенко." 
        },
        header: {
            name: "Елена Сергиенко",
            titles: [
                "Доктор экономических наук | Профессор",
                "Кафедра «Предпринимательство, торговля и логистика»",
                "Национальный технический университет «ХПИ»"
            ],
            location: "Мюнстер, Германия / Харьков, Украина",
            avatarUrl: "assets/images/photo.png"
        },
        links: { 
            telegram: { url: "https://t.me/HelenSerhiienko", text: "Телеграм" }, 
            vcard: "Сохранить контакт", 
            connectTitle: "Свяжитесь со мной", 
            socials: { linkedin: "LinkedIn", facebook: "Facebook", instagram: "Instagram" } 
        },
        sections: {
            pos: { 
                title: "Ключевые позиции", 
                items: [
                    { icon: "fas fa-university", title: "Профессор НТУ ХПИ", desc: "Профессор кафедры «Предпринимательство, торговля и логистика», НТУ «ХПИ». Гарант PhD программы." }
                ]
            },
            about: { 
                title: "Обо мне", 
                items: [
                    { icon: "fas fa-chess-knight", text: "Стратег-архитектор. Эксперт по личным и бизнес-стратегиям для лидеров и команд из списка Forbes." }
                ], 
                tags: ["Стратегический консалтинг", "PR & Репутация", "MedTech", "Data Science"] 
            },
            science: { 
                title: "Научная экспертиза", 
                items: [
                    { icon: "fas fa-book", text: "Автор более 350 работ." }
                ], 
                profilesTitle: "Академические профили", 
                profiles: [
                    { icon: "fas fa-graduation-cap", name: "Scholar", url: "https://scholar.google.com.ua/citations?user=khohzfEAAAAJ" }
                ]
            }
        },
        vcard: { 
            fn: "Dr. Olena Serhiienko", 
            n: "Serhiienko;Olena;;Dr.;Prof.", 
            title: "Доктор экономических наук, Профессор, CEO HealthHelper", 
            org: "НТУ ХПИ;HealthHelper", 
            email: "serhelenka@gmail.com", 
            location_work: "Мюнстер, Германия / Харьков, Украина", 
            note: "Доктор экономических наук, Профессор. Стратег-архитектор. CEO HealthHelper. Вице-президент Инициативы трех морей (Украина)." 
        },
        footer: { 
            text: "© 2025 Елена Сергиенко. Разработано", 
            devName: "@psamm" 
        }
    }
};