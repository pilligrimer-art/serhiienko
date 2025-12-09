/**
 * Global Data Repository for Prof. Dr. Olena Serhiienko's Profile.
 * This file serves as the Content Management System (CMS) for the static site.
 * 
 * Architecture:
 * - Keys (en, ua, de, ru) correspond to ISO language codes.
 * - Structure strictly mimics the UI component hierarchy.
 */

const translations = {
    en: {
        meta: {
            title: "Prof. Dr. Olena Serhiienko - Academic Profile",
            description: "Official academic profile of Prof. Dr. Olena Serhiienko, Doctor of Economics, Professor at UkrSURT."
        },
        header: {
            name: "Olena Serhiienko",
            titles:,
            location: "Kharkiv, Ukraine",
            avatarUrl: "assets/images/photo.png"
        },
        links: {
            telegram: { url: "https://t.me/yourusername", text: "Telegram" },
            vcard: "Save Contact",
            connectTitle: "Connect with me",
            socials: { linkedin: "LinkedIn", facebook: "Facebook", instagram: "Instagram" }
        },
        sections: {
            pos: {
                title: "Positions & Experience",
                items:
            },
            about: {
                title: "About Me",
                items:,
                tags:
            },
            science: {
                title: "Scientific Activity",
                items:,
                profilesTitle: "Scientific Profiles",
                profiles:
            }
        },
        vcard: {
            fn: "Olena Serhiienko",
            n: "Serhiienko;Olena;;Prof. Dr.;",
            title: "Doctor of Economics, Professor",
            org: "Ukrainian State University of Railway Transport",
            email: "serhiienko@uttt.com.ua",
            location_work: "Kharkiv, Ukraine",
            note: "Department of Economics and Management"
        },
        footer: {
            text: "© 2025 Prof. Dr. Olena Serhiienko.",
            devName: "Dev by P.S."
        }
    },
    
    // Ukrainian Localization
    ua: {
        meta: { 
            title: "Проф. Д-р Олена Сергієнко - Академічний профіль", 
            description: "Офіційний профіль доктора економічних наук, професора Олени Сергієнко." 
        },
        header: {
            name: "Олена Сергієнко",
            titles: [
                "Доктор економічних наук, Професор",
                "Кафедра економіки та управління",
                "Український державний університет залізничного транспорту"
            ],
            location: "Харків, Україна",
            avatarUrl: "assets/images/photo.png"
        },
        links: {
            telegram: { url: "#", text: "Телеграм" },
            vcard: "Зберегти контакт",
            connectTitle: "Зв'язатися зі мною",
            socials: { linkedin: "LinkedIn", facebook: "Facebook", instagram: "Instagram" }
        },
        sections: {
            pos: {
                title: "Посади та досвід",
                items: [
                    { icon: "fas fa-university", title: "Професор", desc: "Кафедра економіки та управління, УкрДУЗТ (2015 - Тепер)" },
                    { icon: "fas fa-chalkboard-teacher", title: "Доцент", desc: "Кафедра економіки та управління (2011 - 2015)" }
                ]
            },
            about: {
                title: "Про мене",
                items: [
                    { icon: "fas fa-quote-left", text: "Спеціаліст у галузі економіки транспорту та сталого менеджменту. Мої дослідження зосереджені на ефективності логістики та цифровій трансформації." }
                ],
                tags: ["Економіка", "Менеджмент", "Логістика", "Вища освіта"]
            },
            science: {
                title: "Наукова діяльність",
                items: [
                    { icon: "fas fa-book", text: "Автор понад 150 наукових праць." },
                    { icon: "fas fa-users", text: "Член Спеціалізованої вченої ради Д 64.820.05." }
                ],
                profilesTitle: "Наукові профілі",
                profiles:
            }
        },
        vcard: {
            fn: "Олена Сергієнко",
            n: "Сергієнко;Олена;;Проф. Д-р;",
            title: "Професор, Доктор економічних наук",
            org: "УкрДУЗТ",
            email: "serhiienko@uttt.com.ua",
            location_work: "Харків, Україна",
            note: "Кафедра економіки та управління"
        },
        footer: {
            text: "© 2025 Олена Сергієнко.",
            devName: "Розробка P.S."
        }
    },

    // German Localization (Stub for brevity, implies full structure)
    de: {
        meta: { title: "Prof. Dr. Olena Serhiienko", description: "Akademisches Profil..." },
        header: {
            name: "Olena Serhiienko",
            titles:,
            location: "Charkiw, Ukraine",
            avatarUrl: "assets/images/photo.png"
        },
        links: { telegram: { url: "#", text: "Telegram" }, vcard: "Kontakt speichern", connectTitle: "Verbinden", socials: { linkedin: "LinkedIn", facebook: "Facebook", instagram: "Instagram" } },
        sections: {
            pos: { title: "Berufserfahrung", items: },
            about: { title: "Über mich", items:, tags: },
            science: { title: "Wissenschaft", items: [{ icon: "fas fa-book", text: "Autorin von über 150 Publikationen." }], profilesTitle: "Profile", profiles: }
        },
        vcard: { fn: "Olena Serhiienko", n: "Serhiienko;Olena;;Prof. Dr.;", title: "Professorin", org: "UkrSURT", email: "email@example.com", location_work: "Charkiw", note: "" },
        footer: { text: "© 2025 Olena Serhiienko.", devName: "Entwickelt von P.S." }
    },

    // Russian Localization
    ru: {
        meta: { title: "Проф. Д-р Елена Сергиенко", description: "Официальный профиль..." },
        header: {
            name: "Елена Сергиенко",
            titles: ["Доктор экономических наук, Профессор", "Кафедра экономики и управления", "УкрГУЖТ"],
            location: "Харьков, Украина",
            avatarUrl: "assets/images/photo.png"
        },
        links: { telegram: { url: "#", text: "Телеграм" }, vcard: "Сохранить", connectTitle: "Связаться", socials: { linkedin: "LinkedIn", facebook: "Facebook", instagram: "Instagram" } },
        sections: {
            pos: { title: "Должности", items: [{ icon: "fas fa-university", title: "Профессор", desc: "Кафедра экономики (2015 - Наст. время)" }] },
            about: { title: "Обо мне", items: [{ icon: "fas fa-quote-left", text: "Специалист в области экономики транспорта." }], tags: ["Экономика", "Менеджмент"] },
            science: { title: "Научная деятельность", items: [{ icon: "fas fa-book", text: "Автор более 150 работ." }], profilesTitle: "Профили", profiles: }
        },
        vcard: { fn: "Елена Сергиенко", n: "Сергиенко;Елена;;Проф.;", title: "Профессор", org: "УкрГУЖТ", email: "email@example.com", location_work: "Харьков", note: "" },
        footer: { text: "© 2025 Елена Сергиенко.", devName: "Разработка P.S." }
    }
};