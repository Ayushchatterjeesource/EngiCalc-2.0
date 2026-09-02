/* =========================================================
   EngiCalc 2.0
   Dashboard JavaScript
   Calculate. Solve. Understand.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    updateToolCount();
    setupNavigation();
    setupScrollEffects();
});


/* =========================================================
   CALCULATOR PAGE ROUTES
========================================================= */

const calculatorPages = {
    matrix: "calculators/matrix.html",
    vector: "calculators/vector.html",
    complex: "calculators/complex.html",
    ohms: "calculators/ohms-law.html",
    kirchhoff: "calculators/kirchhoff.html",
    projectile: "calculators/projectile.html",
    converter: "calculators/unit-converter.html",
    statistics: "calculators/statistics.html",
    constants: "reference/constants.html"
};


/* =========================================================
   OPEN TOOL
========================================================= */

function openTool(tool) {

    if (!tool) return;

    const page = calculatorPages[tool];

    if (page) {
        window.location.href = page;
        return;
    }

    console.warn("Calculator page not found:", tool);
}


/* =========================================================
   THEME SYSTEM
========================================================= */

function initTheme() {

    const savedTheme = localStorage.getItem("engicalc-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }

    updateThemeButton();
}


function toggleTheme() {

    document.body.classList.toggle("light-mode");

    const isLight =
        document.body.classList.contains("light-mode");

    localStorage.setItem(
        "engicalc-theme",
        isLight ? "light" : "dark"
    );

    updateThemeButton();
}


function updateThemeButton() {

    const buttons = document.querySelectorAll(
        "#themeToggle, .theme-toggle"
    );

    const isLight =
        document.body.classList.contains("light-mode");

    buttons.forEach(button => {

        button.innerHTML = isLight
            ? "☀️"
            : "🌙";

        button.setAttribute(
            "aria-label",
            isLight
                ? "Switch to dark mode"
                : "Switch to light mode"
        );
    });
}


/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {

    const navLinks =
        document.querySelectorAll(
            ".nav-link, .bottom-nav a"
        );

    navLinks.forEach(link => {

        link.addEventListener("click", function () {

            navLinks.forEach(item => {
                item.classList.remove("active");
            });

            this.classList.add("active");
        });

    });
}


/* =========================================================
   SCROLL EFFECTS
========================================================= */

function setupScrollEffects() {

    const header =
        document.querySelector("header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });
}


/* =========================================================
   TOOL COUNT
========================================================= */

function updateToolCount() {

    const count =
        Object.keys(calculatorPages).length;

    const elements =
        document.querySelectorAll(
            ".tool-count, #toolCount"
        );

    elements.forEach(element => {
        element.textContent = count;
    });
}


/* =========================================================
   DASHBOARD SEARCH
========================================================= */

function searchTools() {

    const input =
        document.getElementById("toolSearch");

    if (!input) return;

    const query =
        input.value.toLowerCase().trim();

    const cards =
        document.querySelectorAll(
            ".tool-card"
        );

    cards.forEach(card => {

        const text =
            card.textContent.toLowerCase();

        card.style.display =
            text.includes(query)
                ? ""
                : "none";
    });
}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

function scrollToTools() {

    const section =
        document.getElementById("tools");

    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });

    }
}


/* =========================================================
   BACK TO TOP
========================================================= */

function backToTop() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   PREVENT DOUBLE CLICK
========================================================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".tool-card button"
            );

        if (!button) return;

        button.classList.add("clicked");

        setTimeout(() => {
            button.classList.remove("clicked");
        }, 300);

    }
);


/* =========================================================
   GLOBAL ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            const modal =
                document.querySelector(".modal");

            if (modal) {
                modal.classList.remove("show");
            }

        }

    }
);
