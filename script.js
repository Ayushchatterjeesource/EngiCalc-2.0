/* =========================================
   EngiCalc 2.0
   Dashboard JavaScript
========================================= */


/* THEME */

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("engicalc-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
}


themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    const darkMode =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "engicalc-theme",
        darkMode ? "dark" : "light"
    );

    themeToggle.textContent =
        darkMode ? "☀️" : "🌙";

});


/* SCROLL TO TOOLS */

function scrollToTools() {

    const tools = document.getElementById("tools");

    if (tools) {
        tools.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

}


/* HOME */

function goHome() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* TOOL MODAL */

const modal =
    document.getElementById("toolModal");

const modalTitle =
    document.getElementById("modalTitle");


function openTool(toolName) {

    modalTitle.textContent = toolName;

    modal.classList.add("show");

    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

}


function showComingSoon(name) {

    modalTitle.textContent = name;

    modal.classList.add("show");

    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

}


function closeModal() {

    modal.classList.remove("show");

    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}


/* CLOSE WHEN CLICKING OUTSIDE */

modal.addEventListener("click", function (event) {

    if (event.target === modal) {
        closeModal();
    }

});


/* ESCAPE KEY */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeModal();
    }

});


/* ACTIVE MOBILE NAV */

const navItems =
    document.querySelectorAll(".nav-item");


navItems.forEach(function (item) {

    item.addEventListener("click", function () {

        navItems.forEach(function (nav) {
            nav.classList.remove("active");
        });

        item.classList.add("active");

    });

});


/* UPDATE TOOL COUNT */

const toolCount =
    document.getElementById("toolCount");

const totalTools =
    document.querySelectorAll(".tool-card").length;

if (toolCount) {
    toolCount.textContent = totalTools;
}


/* PAGE READY */

console.log(
    "EngiCalc 2.0 Dashboard loaded successfully."
);
