/* =========================================
   MUHAMMAD ISMAIL - PORTFOLIO
   Terminal typing, reveals, counters, nav, form
   ========================================= */

(() => {
    "use strict";

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));



    /* ---------- Footer year ---------- */

    const yearEl = document.getElementById("year");

    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }



    /* ---------- Header scroll state ---------- */

    const header = document.getElementById("site-header");

    const updateHeader = () => {
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 24);
        }
    };

    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();



    /* ---------- Mobile navigation ---------- */

    const menuButton = document.getElementById("menu-button");
    const navigation = document.getElementById("navigation");

    if (menuButton && navigation) {
        const closeMenu = () => {
            navigation.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation");
        };

        menuButton.addEventListener("click", () => {
            const isOpen = navigation.classList.toggle("open");
            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );
        });

        navigation.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });
    }



    /* ---------- Terminal typing sequence ---------- */

    const typeText = async (el, text, speed = 55) => {
        for (const char of text) {
            el.textContent += char;
            await sleep(speed);
        }
    };

    const runTerminal = async () => {
        const cmd1 = document.getElementById("typed-cmd-1");
        const cursor1 = document.getElementById("cursor-1");
        const whoamiOut = document.getElementById("whoami-out");
        const cmd2 = document.getElementById("typed-cmd-2");
        const cursor2 = document.getElementById("cursor-2");
        const devObject = document.getElementById("dev-object");
        const cursorEnd = document.getElementById("cursor-end");

        if (!cmd1 || !cmd2) {
            return;
        }

        // Reduced motion: show everything instantly.
        if (prefersReducedMotion) {
            cmd1.textContent = "whoami";
            whoamiOut.classList.remove("term-hidden");
            cmd2.textContent = "cat developer.js";
            devObject.classList.remove("term-hidden");
            cursor1.style.display = "none";
            cursorEnd.classList.remove("term-hidden");
            return;
        }

        await sleep(500);

        await typeText(cmd1, "whoami", 70);
        await sleep(350);
        cursor1.style.display = "none";
        whoamiOut.classList.remove("term-hidden");

        await sleep(650);

        cursor2.classList.remove("term-hidden");
        await typeText(cmd2, "cat developer.js", 55);
        await sleep(400);
        cursor2.classList.add("term-hidden");
        devObject.classList.remove("term-hidden");

        await sleep(900);
        cursorEnd.classList.remove("term-hidden");
    };

    // Start the terminal once it scrolls into view (or immediately if visible).
    const terminalBody = document.getElementById("terminal-body");
    let terminalStarted = false;

    const startTerminal = () => {
        if (terminalStarted) {
            return;
        }
        terminalStarted = true;
        runTerminal();
    };

    if (terminalBody && "IntersectionObserver" in window) {
        const termObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        startTerminal();
                        termObserver.disconnect();
                    }
                });
            },
            { threshold: 0.25 }
        );
        termObserver.observe(terminalBody);
    } else {
        startTerminal();
    }



    /* ---------- Scroll reveal ---------- */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window && !prefersReducedMotion) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const delay = Number(entry.target.dataset.delay || 0);
                        setTimeout(() => {
                            entry.target.classList.add("visible");
                        }, delay);
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -6% 0px",
            }
        );

        revealElements.forEach((el) => revealObserver.observe(el));
    } else {
        revealElements.forEach((el) => el.classList.add("visible"));
    }



    /* ---------- Stat count-up ---------- */

    const animateCount = (el) => {
        const target = Number(el.dataset.count || 0);
        const pad = Number(el.dataset.pad || 0);
        const duration = 1100;
        const start = performance.now();

        const format = (value) => {
            const rounded = Math.round(value).toString();
            return pad > 0 ? rounded.padStart(pad, "0") : rounded;
        };

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            // Ease out cubic.
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = format(target * eased);

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                el.textContent = format(target);
            }
        };

        requestAnimationFrame(tick);
    };

    const counters = document.querySelectorAll("[data-count]");

    if ("IntersectionObserver" in window && !prefersReducedMotion) {
        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCount(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.6 }
        );

        counters.forEach((el) => counterObserver.observe(el));
    } else {
        counters.forEach((el) => {
            const pad = Number(el.dataset.pad || 0);
            const value = Number(el.dataset.count || 0).toString();
            el.textContent = pad > 0 ? value.padStart(pad, "0") : value;
        });
    }



    /* ---------- Contact form (Netlify) ---------- */

    const form = document.getElementById("contact-form");
    const submitButton = document.getElementById("submit-button");
    const formStatus = document.getElementById("form-status");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const buttonLabel = submitButton
                ? submitButton.querySelector(".button-label")
                : null;
            const originalLabel = buttonLabel ? buttonLabel.textContent : "";

            if (submitButton) {
                submitButton.disabled = true;
            }

            if (buttonLabel) {
                buttonLabel.textContent = "Sending...";
            }

            if (formStatus) {
                formStatus.textContent = "";
                formStatus.className = "";
            }

            try {
                const formData = new FormData(form);
                const body = new URLSearchParams(formData).toString();

                const response = await fetch("/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body,
                });

                if (!response.ok) {
                    throw new Error("Form submission failed");
                }

                if (formStatus) {
                    formStatus.textContent =
                        "Message sent. I'll get back to you soon.";
                    formStatus.classList.add("success");
                }

                form.reset();
            } catch (error) {
                if (formStatus) {
                    formStatus.textContent =
                        "Something went wrong. Please email me directly instead.";
                    formStatus.classList.add("error");
                }
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                }

                if (buttonLabel) {
                    buttonLabel.textContent = originalLabel;
                }
            }
        });
    }
})();
