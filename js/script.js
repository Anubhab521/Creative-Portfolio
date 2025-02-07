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

// ------------------------------
// 5. Initialize EmailJS
// ------------------------------
// IMPORTANT: Ensure you have included the EmailJS library in your HTML:
// <script type="text/javascript" src="https://cdn.emailjs.com/dist/email.min.js"></script>
emailjs.init("Im9hfTlAnxi7RhEfp"); // Replace with your actual EmailJS User ID

// ------------------------------
// 6. Contact Form Submission (Email Sending)
// ------------------------------
const contactForm = document.querySelector("#contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Gather values from the form fields.
        const name = document.querySelector("input[name='name']").value;
        const email = document.querySelector("input[name='email']").value;
        const message = document.querySelector("textarea[name='message']").value;

        if (name && email && message) {
            // Prepare the template parameters to send via EmailJS.
            const templateParams = {
                from_name: name,
                from_email: email,
                message: message,
            };

            // Optionally, disable the submit button and show a loading message.
            const submitButton = contactForm.querySelector("button[type='submit']");
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";

            // Use EmailJS to send the email.
            emailjs.send("service_wlfvgtk", "template_r5c9aco", templateParams)
                .then((response) => {
                    alert("Your message has been sent successfully!");
                    submitButton.disabled = false;
                    submitButton.textContent = "Send Message";
                    contactForm.reset(); // Reset the form fields after a successful submission.
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
