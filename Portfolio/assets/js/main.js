(() => {
    "use strict";


    // =====================================
    // ELEMENTS
    // =====================================

    const body =
        document.body;

    const header =
        document.getElementById(
            "site-header"
        );

    const menuButton =
        document.getElementById(
            "menu-button"
        );

    const navigation =
        document.getElementById(
            "navigation"
        );

    const contactForm =
        document.getElementById(
            "contact-form"
        );

    const submitButton =
        document.getElementById(
            "submit-button"
        );

    const buttonLabel =
        submitButton?.querySelector(
            ".button-label"
        );

    const formStatus =
        document.getElementById(
            "form-status"
        );

    const year =
        document.getElementById(
            "year"
        );



    // =====================================
    // CURRENT YEAR
    // =====================================

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }



    // =====================================
    // HEADER SCROLL EFFECT
    // =====================================

    function updateHeader() {

        if (!header) return;

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


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );



    // =====================================
    // MOBILE MENU
    // =====================================

    function closeMenu() {

        if (
            !menuButton ||
            !navigation
        ) {
            return;
        }


        menuButton.classList.remove(
            "active"
        );

        navigation.classList.remove(
            "is-open"
        );

        body.classList.remove(
            "menu-open"
        );

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.setAttribute(
            "aria-label",
            "Open navigation"
        );

    }



    if (
        menuButton &&
        navigation
    ) {

        menuButton.addEventListener(
            "click",
            () => {

                const menuIsOpen =
                    navigation.classList.contains(
                        "is-open"
                    );


                if (menuIsOpen) {

                    closeMenu();

                } else {

                    menuButton.classList.add(
                        "active"
                    );

                    navigation.classList.add(
                        "is-open"
                    );

                    body.classList.add(
                        "menu-open"
                    );

                    menuButton.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                    menuButton.setAttribute(
                        "aria-label",
                        "Close navigation"
                    );

                }

            }
        );



        const navigationLinks =
            navigation.querySelectorAll(
                "a"
            );


        navigationLinks.forEach(
            link => {

                link.addEventListener(
                    "click",
                    closeMenu
                );

            }
        );



        window.addEventListener(
            "keydown",
            event => {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeMenu();

                }

            }
        );



        window.addEventListener(
            "resize",
            () => {

                if (
                    window.innerWidth >
                    760
                ) {

                    closeMenu();

                }

            }
        );

    }



    // =====================================
    // SCROLL REVEAL ANIMATIONS
    // =====================================

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    revealElements.forEach(
        element => {

            const delay =
                element.dataset.delay;


            if (delay) {

                element.style.setProperty(
                    "--delay",
                    `${delay}ms`
                );

            }

        }
    );



    if (
        "IntersectionObserver"
        in window
    ) {

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


                            entry.target.classList.add(
                                "is-visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },

                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -40px"
                }

            );


        revealElements.forEach(
            element => {

                observer.observe(
                    element
                );

            }
        );


    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "is-visible"
                );

            }
        );

    }



    // =====================================
    // NETLIFY CONTACT FORM
    // =====================================

    if (
        contactForm &&
        submitButton &&
        formStatus
    ) {

        contactForm.addEventListener(
            "submit",

            async event => {

                event.preventDefault();


                // Disable button while sending

                submitButton.disabled =
                    true;


                if (buttonLabel) {

                    buttonLabel.textContent =
                        "Sending...";

                }


                formStatus.textContent =
                    "";

                formStatus.classList.remove(
                    "error"
                );


                try {

                    const formData =
                        new FormData(
                            contactForm
                        );


                    const response =
                        await fetch(

                            "/",

                            {
                                method:
                                    "POST",

                                headers: {

                                    "Content-Type":
                                        "application/x-www-form-urlencoded"

                                },

                                body:
                                    new URLSearchParams(
                                        formData
                                    ).toString()

                            }

                        );


                    if (
                        !response.ok
                    ) {

                        throw new Error(
                            `Submission failed: ${response.status}`
                        );

                    }


                    // Reset form

                    contactForm.reset();


                    // Success message

                    formStatus.textContent =
                        "Message sent successfully! I'll get back to you soon.";


                } catch (error) {

                    console.error(
                        "Contact form error:",
                        error
                    );


                    formStatus.textContent =
                        "Unable to send your message right now. Please try again or email me directly.";


                    formStatus.classList.add(
                        "error"
                    );


                } finally {

                    submitButton.disabled =
                        false;


                    if (buttonLabel) {

                        buttonLabel.textContent =
                            "Send message";

                    }

                }

            }

        );

    }

})();