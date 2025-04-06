document.addEventListener("DOMContentLoaded", function () {
    // ------------------------------
    // 1. Toggle Theme (Dark/Light Mode)
    // ------------------------------
    const toggleThemeButton = document.querySelector("#toggleTheme");
    let isDarkTheme = true;
  
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
        const href = link.getAttribute("href");
        // If link is a hash-only link, handle smooth scrolling
        if (href.startsWith("#")) {
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            event.preventDefault();
            targetElement.scrollIntoView({ behavior: "smooth" });
          }
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
          window.location.href = `graphics/graphics-${category}.html`;
        }
      });
    });
  
    // ------------------------------
    // 4. Floating Elements Animation (Optional)
    // ------------------------------
    const floatingElements = document.querySelectorAll(".floating-elements > div");
    floatingElements.forEach(element => {
      const randomDelay = Math.random() * 5;
      element.style.animationDelay = `${randomDelay}s`;
    });
  
    // ------------------------------
    // 5. Contact Form AJAX Submission
    // ------------------------------
    const contactForm = document.querySelector("#contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission
  
        const form = event.target;
        const formData = new FormData(form);
  
        // Send form data to Formspree using the fetch API
        fetch("https://formspree.io/f/mzzdvvob", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json"
          }
        })
        .then(response => {
          if (response.ok) {
            // On success, manually redirect to the thank-you page
            window.location.href = "https://anubhab521.github.io/Creative-Portfolio/thank-you.html";
          } else {
            response.json().then(data => {
              if (data.errors) {
                alert("Error: " + data.errors.map(error => error.message).join(", "));
              } else {
                alert("There was an error sending your message. Please try again later.");
              }
            });
          }
        })
        .catch(error => {
          console.error("Error:", error);
          alert("There was an error sending your message. Please try again later.");
        });
      });
    }
        // ------------------------------
    // 6. Double-Click Lightbox Popup for Posters
    // ------------------------------
    const posters = document.querySelectorAll(".double-click");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".lightbox .close");

    if (posters && lightbox && lightboxImg && closeBtn) {
      posters.forEach((img) => {
        let clickCount = 0;
        img.addEventListener("click", function () {
          clickCount++;
          setTimeout(() => {
            if (clickCount === 2) {
              lightbox.style.display = "block";
              lightboxImg.src = this.src;
            }
            clickCount = 0;
          }, 300);
        });
      });

      closeBtn.addEventListener("click", function () {
        lightbox.style.display = "none";
        lightboxImg.src = "";
      });

      window.addEventListener("click", function (e) {
        if (e.target === lightbox) {
          lightbox.style.display = "none";
          lightboxImg.src = "";
        }
      });
        // ------------------------------
  // 7. Disable Right-Click
  // ------------------------------
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  // ------------------------------
  // 8. Disable Screenshot/DevTool Keys
  // ------------------------------
  document.addEventListener("keydown", function (e) {
    if (
      e.key === "PrintScreen" || // PrtSc key
      (e.ctrlKey && e.key === "s") || // Ctrl+S
      (e.ctrlKey && e.shiftKey && e.key === "i") || // Ctrl+Shift+I
      e.key === "F12" || // F12
      (e.ctrlKey && e.key === "u") // Ctrl+U
    ) {
      e.preventDefault();
      alert("Screenshots and copying are disabled on this page.");
    }
  });

  // ------------------------------
  // 9. Prevent Dragging of Images/Videos
  // ------------------------------
  document.querySelectorAll("img, video").forEach((el) => {
    el.setAttribute("draggable", "false");
  });

  // ------------------------------
  // 10. Blur Screen if Dev Tools is Open
  // ------------------------------
  const blurDiv = document.createElement("div");
  blurDiv.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(20px);
    z-index: 9999;
    display: none;
  `;
  document.body.appendChild(blurDiv);

  function detectDevTools() {
    const widthThreshold = window.outerWidth - window.innerWidth > 100;
    const heightThreshold = window.outerHeight - window.innerHeight > 100;
    if (widthThreshold || heightThreshold) {
      blurDiv.style.display = "block";
    } else {
      blurDiv.style.display = "none";
    }
  }

  setInterval(detectDevTools, 1000);

    }
  });
  