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
        // Get the href value (e.g., "index.html#about" or "#about")
        const href = link.getAttribute("href");
        
        // Check if the link is a hash-only link (starts with "#")
        if (href.startsWith("#")) {
            // Remove the leading '#' to get the id
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                event.preventDefault(); // Prevent default if the target exists
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
            // If targetElement does not exist on the current page,
            // do nothing so the browser can navigate to the link’s URL normally.
        }
        // For links that are full URLs (e.g., "index.html#about" on thank-you.html),
        // let the default navigation occur.
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
