
/* =========================================
   PORTFOLIO - COMPLETE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* ==========================
       LOADER
    ========================== */

    const loader = document.getElementById("loader");

    if (loader) {

        setTimeout(() => {

            loader.style.opacity = "0";

            setTimeout(() => {
                loader.style.display = "none";
            }, 600);

        }, 1200);

    }


    /* ==========================
       TYPING EFFECT
    ========================== */

    const typingElement = document.getElementById("typing");

    const words = [
        "Tech Enthusiast",
        "Innovative Solution Builder"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        if (!typingElement) return;

        const currentWord = words[wordIndex];

        if (!deleting) {

            typingElement.textContent =
                currentWord.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === currentWord.length) {

                deleting = true;

                setTimeout(typeEffect, 1500);

                return;
            }

        } else {

            typingElement.textContent =
                currentWord.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {

                deleting = false;

                wordIndex++;

                if (wordIndex >= words.length) {
                    wordIndex = 0;
                }

            }

        }

        setTimeout(typeEffect, deleting ? 60 : 120);

    }

    if (typingElement) {
        typeEffect();
    }


    /* ==========================
       ACTIVE NAVIGATION LINKS
    ========================== */

    const sections = document.querySelectorAll("section");

    const navLinks = document.querySelectorAll(".navbar a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }

        });

    });


    /* ==========================
       HEADER SCROLL EFFECT
    ========================== */

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if (!header) return;

        if (window.scrollY > 80) {

            header.style.background = "rgba(0,0,0,.85)";

            header.style.boxShadow =
                "0 10px 25px rgba(0,0,0,.25)";

        } else {

            header.style.background = "rgba(0,0,0,.15)";

            header.style.boxShadow = "none";

        }

    });


    /* ==========================
       BACK TO TOP BUTTON
    ========================== */

    const topBtn = document.getElementById("topBtn");

    if (topBtn) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {
                topBtn.style.display = "block";
            } else {
                topBtn.style.display = "none";
            }

        });

        topBtn.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* ==========================
       COUNTER ANIMATION
    ========================== */

    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {

        counter.innerText = "0";

        const updateCounter = () => {

            const target = +counter.getAttribute("data-target");

            const current = +counter.innerText;

            const increment = target / 120;

            if (current < target) {

                counter.innerText = `${Math.ceil(current + increment)}`;

                setTimeout(updateCounter, 20);

            } else {

                counter.innerText = target;

            }

        };

        updateCounter();

    });


    /* ==========================
       EMAILJS CONTACT FORM
    ========================== */

    if (typeof emailjs !== "undefined") {

        emailjs.init("yuJ5I90PQOKAPSmWx");

    }

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", function (e) {

            e.preventDefault();

            if (typeof emailjs === "undefined") {

                alert("Email service is currently unavailable.");

                return;
            }

            emailjs.sendForm(

                "service_hcptht9",
                "template_8rc0298",
                this

            )

            .then(() => {

                alert("Message sent successfully!");

                contactForm.reset();

            })

            .catch(error => {

                console.error(error);

                alert("Failed to send message.");

            });

        });

    }


    /* ==========================
       CIRCULAR THEME TOGGLE
    ========================== */

    const themeToggle = document.getElementById("themeToggle");

    const sunIcon = `
        <svg viewBox="0 0 24 24" class="theme-icon">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.42 1.42"></path>
            <path d="m17.65 17.65 1.42 1.42"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m4.93 19.07 1.42-1.42"></path>
            <path d="m17.65 6.35 1.42-1.42"></path>
        </svg>
    `;

    const moonIcon = `
        <svg viewBox="0 0 24 24" class="theme-icon">
            <path d="M20.9 13A9 9 0 0 1 11 3.1
            9 9 0 1 0 20.9 13Z"></path>
        </svg>
    `;

    function setTheme(isDark) {

        document.body.classList.toggle("dark-theme", isDark);

        if (!themeToggle) return;

        themeToggle.innerHTML = isDark ? moonIcon : sunIcon;

        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );

        localStorage.setItem("theme", isDark ? "dark" : "light");

    }

    const savedTheme = localStorage.getItem("theme");

    setTheme(savedTheme === "dark");

    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            const isDark =
                !document.body.classList.contains("dark-theme");

            setTheme(isDark);

        });

    }


    /* =========================================
       ADVANCED SCROLL REVEAL ANIMATION
    ========================================= */

    const revealElements = document.querySelectorAll(`
        .section-title,
        .hero-content,
        .hero-image,
        .about-image,
        .about-text,
        .timeline-item,
        .education-card,
        .skill-category,
        .skill-box,
        .cert-card,
        .project-card,
        #contactForm,
        footer
    `);

    revealElements.forEach((element, index) => {

        element.classList.add("scroll-reveal");

        if (
            element.matches(
                ".hero-content, .about-text, .timeline-item"
            )
        ) {

            element.classList.add("from-left");

        }

        else if (
            element.matches(".hero-image, .about-image")
        ) {

            element.classList.add("from-right");

        }

        else if (
            element.matches(
                ".education-card, .skill-box, .skill-category, .cert-card, .project-card"
            )
        ) {

            element.classList.add("from-bottom");

            element.style.setProperty(
                "--reveal-delay",
                `${(index % 4) * 100}ms`
            );

        }

        else {

            element.classList.add("from-bottom");

        }

    });


    const observerOptions = {

        threshold: 0.12,

        rootMargin: "0px 0px -40px 0px"

    };


    const revealObserver = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                } else {

                    entry.target.classList.remove("is-visible");

                }

            });

        },

        observerOptions

    );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =========================================
       CERTIFICATION & PROJECT CAROUSEL
    ========================================= */

    const carousels = document.querySelectorAll("[data-carousel]");

    carousels.forEach(carousel => {

        const track = carousel.querySelector(".carousel-track");

        if (!track) return;

        const slides = Array.from(track.children);

        const prevBtn = carousel.querySelector("[data-prev]");

        const nextBtn = carousel.querySelector("[data-next]");

        const dotsContainer = carousel.querySelector(".carousel-dots");

        const controls = carousel.querySelector(".carousel-controls");

        let currentIndex = 0;

        let visibleSlides = 1;

        let maxIndex = 0;

        let startX = 0;

        let endX = 0;


        if (slides.length <= 1) {

            if (controls) {
                controls.style.display = "none";
            }

            return;

        }


        /* GET VISIBLE SLIDES */

        function getVisibleSlides() {

            if (carousel.classList.contains("project-carousel")) {
                return 1;
            }

            if (window.innerWidth <= 600) {
                return 1;
            }

            if (window.innerWidth <= 900) {
                return 2;
            }

            return 3;

        }


        /* UPDATE CAROUSEL */

        function updateCarousel() {

            visibleSlides = getVisibleSlides();

            maxIndex = Math.max(0, slides.length - visibleSlides);

            currentIndex = Math.min(currentIndex, maxIndex);

            const slideOffset =
                slides[currentIndex].offsetLeft - slides[0].offsetLeft;

            track.style.transform =
                `translate3d(-${slideOffset}px, 0, 0)`;

            if (prevBtn) {
                prevBtn.disabled = currentIndex === 0;
            }

            if (nextBtn) {
                nextBtn.disabled = currentIndex >= maxIndex;
            }

            updateDots();

        }


        /* CREATE DOTS */

        function createDots() {

            if (!dotsContainer) return;

            dotsContainer.innerHTML = "";

            const totalDots =
                Math.max(1, slides.length - visibleSlides + 1);

            for (let i = 0; i < totalDots; i++) {

                const dot = document.createElement("button");

                dot.type = "button";

                dot.classList.add("carousel-dot");

                dot.setAttribute(
                    "aria-label",
                    `Go to slide ${i + 1}`
                );

                dot.addEventListener("click", () => {

                    currentIndex = i;

                    updateCarousel();

                });

                dotsContainer.appendChild(dot);

            }

            updateDots();

        }


        /* UPDATE DOTS */

        function updateDots() {

            if (!dotsContainer) return;

            const dots =
                dotsContainer.querySelectorAll(".carousel-dot");

            dots.forEach((dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === currentIndex
                );

                dot.setAttribute(
                    "aria-current",
                    index === currentIndex ? "true" : "false"
                );

            });

        }


        /* NEXT BUTTON */

        if (nextBtn) {

            nextBtn.addEventListener("click", () => {

                if (currentIndex < maxIndex) {

                    currentIndex++;

                    updateCarousel();

                }

            });

        }


        /* PREVIOUS BUTTON */

        if (prevBtn) {

            prevBtn.addEventListener("click", () => {

                if (currentIndex > 0) {

                    currentIndex--;

                    updateCarousel();

                }

            });

        }


        /* TOUCH SWIPE */

        track.addEventListener("touchstart", e => {

            startX = e.touches[0].clientX;

        }, { passive: true });


        track.addEventListener("touchend", e => {

            endX = e.changedTouches[0].clientX;

            const difference = startX - endX;

            if (Math.abs(difference) > 50) {

                if (difference > 0 && currentIndex < maxIndex) {

                    currentIndex++;

                }

                else if (difference < 0 && currentIndex > 0) {

                    currentIndex--;

                }

                updateCarousel();

            }

        }, { passive: true });


        /* RESPONSIVE UPDATE */

        let resizeTimeout;

        window.addEventListener("resize", () => {

            clearTimeout(resizeTimeout);

            resizeTimeout = setTimeout(() => {

                visibleSlides = getVisibleSlides();

                createDots();

                updateCarousel();

            }, 150);

        });


        /* INITIALIZE */

        visibleSlides = getVisibleSlides();

        createDots();

        updateCarousel();

    });


});
