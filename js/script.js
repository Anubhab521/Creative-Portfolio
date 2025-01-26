// Toggle Theme (Dark/Light Mode)
const toggleThemeButton = document.querySelector("#toggleTheme");
let isDarkTheme = true;

// Check if the browser supports localStorage
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

// Smooth Scrolling for Navigation
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Portfolio Buttons: Navigate to Individual Pages
const categoryButtons = document.querySelectorAll(".category-buttons button");
categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.getAttribute("data-category");
        if (category) {
            // Redirect to the corresponding category page
            window.location.href = `graphics/graphics-${category}.html`;
        }
    });
});

// Floating Elements Animation (Optional, Enhancing Interactivity)
const floatingElements = document.querySelectorAll(".floating-elements > div");
floatingElements.forEach(element => {
    const randomDelay = Math.random() * 5; // Random animation delay
    element.style.animationDelay = `${randomDelay}s`;
});

// Initialize EmailJS
emailjs.init("Cmz2KyFVlIvPJ1pXk");

// Contact Form Submission
const contactForm = document.querySelector("#contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the default form submission

        const name = document.querySelector("input[name='name']").value;
        const email = document.querySelector("input[name='email']").value;
        const message = document.querySelector("textarea[name='message']").value;

        if (name && email && message) {
            // Use EmailJS to send the email
            const templateParams = {
                from_name: name,
                from_email: email,
                message: message,
            };

            // Optional: Disable the button and show a loading state
            const submitButton = contactForm.querySelector("button[type='submit']");
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";

            emailjs.send("service_lvbjt2f", "template_r5c9aco", templateParams)
                .then((response) => {
                    alert("Your message has been sent successfully!");
                    submitButton.disabled = false;
                    submitButton.textContent = "Send Message";
                    contactForm.reset(); // Reset form after successful submission
                }, (error) => {
                    alert("There was an error sending your message. Please try again later.");
                    submitButton.disabled = false;
                    submitButton.textContent = "Send Message";
                });
        } else {
            alert("Please fill out all fields before sending.");
        }
    });
}


