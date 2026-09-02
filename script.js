/* =====================================================
   EngiCalc 2.0
   Dashboard JavaScript
===================================================== */


/* =====================================================
   CALCULATOR ROUTES
===================================================== */

const calculatorPages = {

    matrix:
        "calculators/matrix.html",

    vector:
        "calculators/vector.html",

    complex:
        "calculators/complex.html",

    ohms:
        "calculators/ohms-law.html",

    kirchhoff:
        "calculators/kirchhoff.html",

    projectile:
        "calculators/projectile.html",

    converter:
        "calculators/unit-converter.html",

    statistics:
        "calculators/statistics.html",

    constants:
        "reference/constants.html"
};


/* =====================================================
   PAGE LOAD
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initTheme();

        updateToolCount();

        setupScrollEffects();

        setupActiveNavigation();

        setupSearch();

    }
);


/* =====================================================
   OPEN CALCULATOR
===================================================== */

function openTool(tool) {

    const page =
        calculatorPages[tool];

    if (!page) {

        console.error(
            "Calculator not found:",
            tool
        );

        return;
    }

    window.location.href = page;
}


/* =====================================================
   THEME
===================================================== */

function initTheme() {

    const savedTheme =
        localStorage.getItem(
            "engicalc-theme"
        );

    if (savedTheme === "light") {

        document.body.classList.add(
            "light-mode"
        );

    }

    updateThemeIcons();
}


function toggleTheme() {

    document.body.classList.toggle(
        "light-mode"
    );

    const lightMode =
        document.body.classList.contains(
            "light-mode"
        );

    localStorage.setItem(
        "engicalc-theme",
        lightMode
            ? "light"
            : "dark"
    );

    updateThemeIcons();
}


function updateThemeIcons() {

    const lightMode =
        document.body.classList.contains(
            "light-mode"
        );

    const icon =
        lightMode
            ? "☀️"
            : "🌙";


    const desktopButton =
        document.getElementById(
            "themeToggle"
        );

    const mobileButton =
        document.getElementById(
            "mobileThemeToggle"
        );

    const bottomIcon =
        document.getElementById(
            "bottomThemeIcon"
        );


    if (desktopButton) {

        desktopButton.textContent =
            icon;
    }


    if (mobileButton) {

        mobileButton.textContent =
            icon;
    }


    if (bottomIcon) {

        bottomIcon.textContent =
            icon;
    }

}


/* =====================================================
   TOOL COUNT
===================================================== */

function updateToolCount() {

    const count =
        Object.keys(
            calculatorPages
        ).length;

    document
        .querySelectorAll(
            ".tool-count"
        )
        .forEach(
            element => {
                element.textContent =
                    count;
            }
        );

}


/* =====================================================
   SEARCH
===================================================== */

function setupSearch() {

    const input =
        document.getElementById(
            "toolSearch"
        );

    if (!input) return;

    input.addEventListener(
        "input",
        searchTools
    );
}


function searchTools() {

    const input =
        document.getElementById(
            "toolSearch"
        );

    if (!input) return;


    const query =
        input.value
            .toLowerCase()
            .trim();


    const cards =
        document.querySelectorAll(
            ".tool-card"
        );


    let visibleCount = 0;


    cards.forEach(
        card => {

            const text =
                card.textContent
                    .toLowerCase();


            if (
                text.includes(query)
            ) {

                card.style.display =
                    "";

                visibleCount++;

            } else {

                card.style.display =
                    "none";

            }

        }
    );


    const noResults =
        document.getElementById(
            "noResults"
        );


    if (noResults) {

        noResults.style.display =
            visibleCount === 0
                ? "block"
                : "none";
    }

}


/* =====================================================
   SMOOTH SCROLL
===================================================== */

function scrollToTools() {

    const section =
        document.getElementById(
            "calculators"
        );

    if (!section) return;

    section.scrollIntoView({
        behavior: "smooth"
    });

}


/* =====================================================
   BACK TO TOP
===================================================== */

function backToTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =====================================================
   HEADER SCROLL EFFECT
===================================================== */

function setupScrollEffects() {

    const header =
        document.querySelector(
            ".top-header"
        );

    if (!header) return;


    function checkScroll() {

        if (window.scrollY > 20) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        checkScroll
    );

    checkScroll();
}


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

function setupActiveNavigation() {

    const links =
        document.querySelectorAll(
            ".nav-link, .bottom-nav-item"
        );


    links.forEach(
        link => {

            link.addEventListener(
                "click",
                function () {

                    links.forEach(
                        item => {
                            item.classList.remove(
                                "active"
                            );
                        }
                    );

                    this.classList.add(
                        "active"
                    );

                }
            );

        }
    );


    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    if (!sections.length) return;


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const id =
                                entry.target.id;


                            links.forEach(
                                link => {

                                    const href =
                                        link.getAttribute(
                                            "href"
                                        );


                                    if (
                                        href ===
                                        "#" + id
                                    ) {

                                        links.forEach(
                                            item => {
                                                item.classList.remove(
                                                    "active"
                                                );
                                            }
                                        );

                                        link.classList.add(
                                            "active"
                                        );

                                    }

                                }
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.45
            }
        );


    sections.forEach(
        section => {
            observer.observe(
                section
            );
        }
    );

}


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key ===
            "Escape"
        ) {

            const search =
                document.getElementById(
                    "toolSearch"
                );

            if (search) {

                search.value = "";

                searchTools();

            }

        }

    }
);


/* =====================================================
   BUTTON TOUCH FEEDBACK
===================================================== */

document.addEventListener(
    "touchstart",
    function (event) {

        const button =
            event.target.closest(
                "button"
            );

        if (!button) return;

        button.style.transform =
            "scale(0.98)";

    },
    {
        passive: true
    }
);


document.addEventListener(
    "touchend",
    function (event) {

        const button =
            event.target.closest(
                "button"
            );

        if (!button) return;

        setTimeout(
            function () {

                button.style.transform =
                    "";

            },
            100
        );

    },
    {
        passive: true
    }
);
