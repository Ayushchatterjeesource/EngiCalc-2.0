/* =========================================================
   EngiCalc 2.0
   Dashboard JavaScript
   Calculate. Solve. Understand.
========================================================= */


/* =========================================================
   CALCULATOR ROUTES
========================================================= */

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


/* =========================================================
   SCIENTIFIC CALCULATOR STATE
========================================================= */

let scientificExpression = "";

let scientificAngleMode = "DEG";


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initTheme();

        updateToolCount();

        setupScrollEffects();

        setupActiveNavigation();

        setupSearch();

        setupKeyboardCalculator();

    }
);


/* =========================================================
   OPEN ENGINEERING CALCULATOR
========================================================= */

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

    /*
       Use relative URL so it works correctly
       on GitHub Pages.
    */

    window.location.href = page;

}


/* =========================================================
   THEME
========================================================= */

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

    if (desktopButton) {

        desktopButton.textContent =
            icon;

    }


    const mobileButton =
        document.getElementById(
            "mobileThemeToggle"
        );

    if (mobileButton) {

        mobileButton.textContent =
            icon;

    }


    const bottomIcon =
        document.getElementById(
            "bottomThemeIcon"
        );

    if (bottomIcon) {

        bottomIcon.textContent =
            icon;

    }

}


/* =========================================================
   TOOL COUNT
========================================================= */

function updateToolCount() {

    /*
       9 external calculators
       + 1 scientific calculator
       = 10
    */

    const count =
        Object.keys(
            calculatorPages
        ).length + 1;


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


/* =========================================================
   SEARCH
========================================================= */

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


/* =========================================================
   SCROLL TO TOOLS
========================================================= */

function scrollToTools() {

    /*
       FIXED:
       HTML uses id="tools"
       not id="calculators".
    */

    const section =
        document.getElementById(
            "tools"
        );


    if (!section) return;


    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

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
   HEADER SCROLL EFFECT
========================================================= */

function setupScrollEffects() {

    /*
       HTML uses <header>
       instead of .top-header.
    */

    const header =
        document.querySelector(
            "header"
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


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function setupActiveNavigation() {

    const links =
        document.querySelectorAll(
            ".nav-link, .bottom-nav a"
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
                            !entry.isIntersecting
                        ) {

                            return;

                        }


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
                );

            },

            {
                threshold: 0.35
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


/* =========================================================
   SCIENTIFIC CALCULATOR
========================================================= */


/*
   Open calculator
*/

function openScientificCalculator() {

    const calculator =
        document.getElementById(
            "scientificCalculator"
        );


    if (!calculator) {

        console.error(
            "Scientific calculator section not found."
        );

        return;

    }


    calculator.classList.add(
        "scientific-open"
    );


    scientificClear();


    setTimeout(
        function () {

            calculator.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });

        },
        50
    );

}


/*
   Close calculator
*/

function closeScientificCalculator() {

    const calculator =
        document.getElementById(
            "scientificCalculator"
        );


    if (!calculator) return;


    calculator.classList.remove(
        "scientific-open"
    );


    const tools =
        document.getElementById(
            "tools"
        );


    if (tools) {

        tools.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }

}


/* =========================================================
   DISPLAY UPDATE
========================================================= */

function updateScientificDisplay() {

    const display =
        document.getElementById(
            "scientificDisplay"
        );


    const expression =
        document.getElementById(
            "scientificExpression"
        );


    if (!display) return;


    if (
        scientificExpression === ""
    ) {

        display.textContent =
            "0";

    } else {

        display.textContent =
            scientificExpression;

    }


    if (expression) {

        expression.textContent =
            scientificExpression;

    }

}


/* =========================================================
   INSERT
========================================================= */

function scientificInsert(value) {

    /*
       If previous result was shown,
       start a new expression when typing
       a number or function.
    */

    if (
        scientificExpression === "Error"
    ) {

        scientificExpression = "";

    }


    scientificExpression += value;


    updateScientificDisplay();

}


/* =========================================================
   CLEAR
========================================================= */

function scientificClear() {

    scientificExpression = "";

    updateScientificDisplay();

}


/* =========================================================
   BACKSPACE
========================================================= */

function scientificBackspace() {

    if (
        scientificExpression.length === 0
    ) {

        return;

    }


    /*
       Remove complete function names
       when appropriate.
    */

    const functions = [
        "sin(",
        "cos(",
        "tan(",
        "log(",
        "ln(",
        "√("
    ];


    for (
        const fn of functions
    ) {

        if (
            scientificExpression.endsWith(
                fn
            )
        ) {

            scientificExpression =
                scientificExpression.slice(
                    0,
                    -fn.length
                );

            updateScientificDisplay();

            return;

        }

    }


    scientificExpression =
        scientificExpression.slice(
            0,
            -1
        );


    updateScientificDisplay();

}


/* =========================================================
   SQUARE
========================================================= */

function scientificSquare() {

    if (
        scientificExpression === "" ||
        scientificExpression === "Error"
    ) {

        return;

    }


    scientificExpression += "²";


    updateScientificDisplay();

}


/* =========================================================
   ANGLE MODE
========================================================= */

function setAngleMode(mode) {

    if (
        mode !== "DEG" &&
        mode !== "RAD"
    ) {

        return;

    }


    scientificAngleMode = mode;


    const degreeButton =
        document.getElementById(
            "degreeMode"
        );


    const radianButton =
        document.getElementById(
            "radianMode"
        );


    if (degreeButton) {

        degreeButton.classList.toggle(
            "active",
            mode === "DEG"
        );

    }


    if (radianButton) {

        radianButton.classList.toggle(
            "active",
            mode === "RAD"
        );

    }

}


/* =========================================================
   SCIENTIFIC CALCULATION
========================================================= */

function scientificCalculate() {

    if (
        !scientificExpression ||
        scientificExpression === "Error"
    ) {

        return;

    }


    const originalExpression =
        scientificExpression;


    try {

        let expression =
            scientificExpression;


        /*
           Replace display symbols
        */

        expression =
            expression
                .replaceAll(
                    "×",
                    "*"
                )
                .replaceAll(
                    "÷",
                    "/"
                )
                .replaceAll(
                    "−",
                    "-"
                )
                .replaceAll(
                    "²",
                    "**2"
                );


        /*
           Pi
        */

        expression =
            expression.replaceAll(
                "π",
                "Math.PI"
            );


        /*
           Euler's number
        */

        expression =
            expression.replace(
                /\be\b/g,
                "Math.E"
            );


        /*
           Square root
        */

        expression =
            expression.replaceAll(
                "√",
                "Math.sqrt"
            );


        /*
           Natural logarithm
        */

        expression =
            expression.replaceAll(
                "ln",
                "Math.log"
            );


        /*
           Base-10 logarithm
        */

        expression =
            expression.replaceAll(
                "log",
                "Math.log10"
            );


        /*
           Trigonometric functions
        */

        if (
            scientificAngleMode === "DEG"
        ) {

            expression =
                expression.replaceAll(
                    "sin",
                    "Math.sin"
                );

            expression =
                expression.replaceAll(
                    "cos",
                    "Math.cos"
                );

            expression =
                expression.replaceAll(
                    "tan",
                    "Math.tan"
                );

            /*
               Convert degrees to radians.

               We insert a helper wrapper around
               Math.sin/cos/tan calls below.
            */

            expression =
                convertDegreeTrigFunctions(
                    expression
                );

        } else {

            expression =
                expression.replaceAll(
                    "sin",
                    "Math.sin"
                );

            expression =
                expression.replaceAll(
                    "cos",
                    "Math.cos"
                );

            expression =
                expression.replaceAll(
                    "tan",
                    "Math.tan"
                );

        }


        /*
           Security validation.

           Only mathematical characters and
           allowed Math functions are accepted.
        */

        const allowed =
            /^[0-9+\-*/().,\sA-Za-z_]+$/;


        if (
            !allowed.test(expression)
        ) {

            throw new Error(
                "Invalid expression"
            );

        }


        /*
           Block unwanted JavaScript access.
        */

        const blockedWords = [

            "constructor",
            "prototype",
            "window",
            "document",
            "globalThis",
            "Function",
            "eval",
            "fetch",
            "localStorage",
            "sessionStorage"

        ];


        const lowerExpression =
            expression.toLowerCase();


        for (
            const word of blockedWords
        ) {

            if (
                lowerExpression.includes(
                    word.toLowerCase()
                )
            ) {

                throw new Error(
                    "Invalid expression"
                );

            }

        }


        /*
           Evaluate mathematical expression.
        */

        const result =
            Function(
                '"use strict"; return (' +
                expression +
                ')'
            )();


        if (
            typeof result !== "number" ||
            !Number.isFinite(result)
        ) {

            throw new Error(
                "Invalid result"
            );

        }


        /*
           Clean floating point noise.
        */

        const cleanedResult =
            Math.abs(result) < 1e-12
                ? 0
                : result;


        scientificExpression =
            formatScientificResult(
                cleanedResult
            );


        const expressionElement =
            document.getElementById(
                "scientificExpression"
            );


        if (expressionElement) {

            expressionElement.textContent =
                originalExpression + " =";

        }


        updateScientificDisplay();

    } catch (error) {

        console.error(
            "Scientific calculator error:",
            error
        );


        scientificExpression =
            "Error";


        updateScientificDisplay();

    }

}


/* =========================================================
   DEGREE TRIGONOMETRY
========================================================= */

function convertDegreeTrigFunctions(
    expression
) {

    /*
       Convert:

       Math.sin(x)
       Math.cos(x)
       Math.tan(x)

       into:

       Math.sin(x * Math.PI / 180)
       etc.

       This parser handles normal calculator
       function calls with balanced parentheses.
    */

    expression =
        replaceTrigCalls(
            expression,
            "Math.sin"
        );


    expression =
        replaceTrigCalls(
            expression,
            "Math.cos"
        );


    expression =
        replaceTrigCalls(
            expression,
            "Math.tan"
        );


    return expression;

}


/* =========================================================
   REPLACE TRIG CALLS
========================================================= */

function replaceTrigCalls(
    expression,
    functionName
) {

    let result = "";

    let index = 0;


    while (index < expression.length) {

        const position =
            expression.indexOf(
                functionName + "(",
                index
            );


        if (position === -1) {

            result +=
                expression.slice(
                    index
                );

            break;

        }


        result +=
            expression.slice(
                index,
                position
            );


        const openIndex =
            position +
            functionName.length;


        let depth = 0;

        let closeIndex = -1;


        for (
            let i = openIndex;
            i < expression.length;
            i++
        ) {

            const character =
                expression[i];


            if (
                character === "("
            ) {

                depth++;

            } else if (
                character === ")"
            ) {

                depth--;

                if (
                    depth === 0
                ) {

                    closeIndex = i;

                    break;

                }

            }

        }


        if (
            closeIndex === -1
        ) {

            result +=
                expression.slice(
                    position
                );

            break;

        }


        const inner =
            expression.slice(
                openIndex + 1,
                closeIndex
            );


        result +=
            functionName +
            "(" +
            "(" +
            inner +
            ")" +
            "*Math.PI/180" +
            ")";


        index =
            closeIndex + 1;

    }


    return result;

}


/* =========================================================
   RESULT FORMAT
========================================================= */

function formatScientificResult(
    value
) {

    if (
        Number.isInteger(value)
    ) {

        return String(value);

    }


    /*
       Avoid very long floating values.
    */

    const rounded =
        Number(
            value.toPrecision(12)
        );


    return String(
        rounded
    );

}


/* =========================================================
   KEYBOARD SUPPORT
========================================================= */

function setupKeyboardCalculator() {

    document.addEventListener(
        "keydown",
        function (event) {

            const calculator =
                document.getElementById(
                    "scientificCalculator"
                );


            /*
               Only handle calculator keyboard
               when calculator is open.
            */

            if (
                !calculator ||
                !calculator.classList.contains(
                    "scientific-open"
                )
            ) {

                return;

            }


            /*
               Number keys
            */

            if (
                /^[0-9]$/.test(
                    event.key
                )
            ) {

                scientificInsert(
                    event.key
                );

                return;

            }


            /*
               Decimal
            */

            if (
                event.key === "."
            ) {

                scientificInsert(
                    "."
                );

                return;

            }


            /*
               Operators
            */

            const operators = {

                "+": "+",

                "-": "−",

                "*": "×",

                "/": "÷"

            };


            if (
                operators[
                    event.key
                ]
            ) {

                scientificInsert(
                    operators[
                        event.key
                    ]
                );

                event.preventDefault();

                return;

            }


            /*
               Parentheses
            */

            if (
                event.key === "(" ||
                event.key === ")"
            ) {

                scientificInsert(
                    event.key
                );

                return;

            }


            /*
               Enter = calculate
            */

            if (
                event.key === "Enter" ||
                event.key === "="
            ) {

                scientificCalculate();

                event.preventDefault();

                return;

            }


            /*
               Backspace
            */

            if (
                event.key === "Backspace"
            ) {

                scientificBackspace();

                event.preventDefault();

                return;

            }


            /*
               Escape
            */

            if (
                event.key === "Escape"
            ) {

                closeScientificCalculator();

                return;

            }

        }
    );

}


/* =========================================================
   ESCAPE SEARCH
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        /*
           Do not interfere with scientific
           calculator Escape handling.
        */

        if (
            event.key !== "Escape"
        ) {

            return;

        }


        const calculator =
            document.getElementById(
                "scientificCalculator"
            );


        if (
            calculator &&
            calculator.classList.contains(
                "scientific-open"
            )
        ) {

            return;

        }


        const search =
            document.getElementById(
                "toolSearch"
            );


        if (search) {

            search.value = "";

            searchTools();

        }

    }
);


/* =========================================================
   BUTTON TOUCH FEEDBACK
========================================================= */

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
