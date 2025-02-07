// ------------------------------
// 1. Toggle Theme (Dark/Light Mode)
// ------------------------------
const toggleThemeButton = document.querySelector("#toggleTheme");
let isDarkTheme = true;

// Check if localStorage is supported and get the saved theme.
if (window.localStorage) {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.remove("dark-theme");
        isDarkTheme = false;
    }
}

if (toggleThemeButton) {
    toggleThemeButton.addEventListener("click", () => {
        isDarkTheme = !isDarkTheme;
        if (isDarkTheme) {
            document.body.classList.add("dark-theme");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark-theme");
            localStorage.setItem("theme", "light");
        }
    });
}

// ------------------------------
// 2. Smooth Scrolling for Navigation
// ------------------------------
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        // Remove the leading '#' from the href attribute value.
        const targetId = link.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// ------------------------------
// 3. Portfolio Buttons: Navigate to Individual Pages
// ------------------------------
const categoryButtons = document.querySelectorAll(".category-buttons button");
categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.getAttribute("data-category");
        if (category) {
            // Redirect to the corresponding category page.
            window.location.href = `graphics/graphics-${category}.html`;
        }
    });
});

// ------------------------------
// 4. Floating Elements Animation (Optional)
// ------------------------------
const floatingElements = document.querySelectorAll(".floating-elements > div");
floatingElements.forEach(element => {
    const randomDelay = Math.random() * 5; // Random animation delay in seconds.
    element.style.animationDelay = `${randomDelay}s`;
});
