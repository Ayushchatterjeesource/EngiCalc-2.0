// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
let isDark = true;

const savedTheme = localStorage.getItem('engicalc_theme');
if (savedTheme === 'light') {
    isDark = false;
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', function() {
    isDark = !isDark;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('engicalc_theme', isDark ? 'dark' : 'light');
});

console.log('🔬 EngiCalc 2.0 Loaded!');
