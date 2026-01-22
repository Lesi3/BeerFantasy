// js/res.js
let TEXTS = {};

function loadLanguage(lang = "es") {
    if (lang === "es") {
        TEXTS = TEXT_ES;
    }
    // futuro: else if ("en") ...

    applyTexts();
}

function applyTexts() {
    document.querySelectorAll("[data-res]").forEach(el => {
        const key = el.getAttribute("data-res");
        if (TEXTS[key]) {
            el.innerText = TEXTS[key];
        }
    });
}
