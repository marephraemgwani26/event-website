document.addEventListener('DOMContentLoaded', () => {



    /* --- Scroll Tracking (Performant rAF Loop) --- */
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');
    const navbar = document.getElementById('navbar');

    let isTicking = false;

    const onScroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        // Handle Progress Bar
        if (scrollProgress) {
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = Math.max(0, Math.min(100, (scrollTop / scrollHeight) * 100));
            scrollProgress.style.width = scrollPercentage + '%';
        }

        // Handle Back To Top
        if (backToTop) {
            if (scrollTop > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }

        // Handle Navbar
        if (navbar) {
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        isTicking = false;
    };

    window.addEventListener('scroll', () => {
        if (!isTicking) {
            window.requestAnimationFrame(onScroll);
            isTicking = true;
        }
    }, { passive: true });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* --- Particle Background (Vanilla JS) --- */
    const particlesContainer = document.getElementById('particles-container');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            let particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 8 + 2; // 2px to 10px
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.animationDuration = Math.random() * 5 + 5 + 's';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particlesContainer.appendChild(particle);
        }
    }

    /* --- Typing Effect --- */
    const typingText = document.getElementById('hero-typing-text');
    if (typingText) {
        const textToType = "With immense pride, Mar Ephraem College of Engineering and Technology welcomes you to GWANI 2026. Rooted in values and academic brilliance, our intercollegiate fest is a grand platform celebrating excellence beyond boundaries.";
        typingText.innerText = '';
        let i = 0;
        const speed = 25; // ms per char

        const typeWriter = () => {
            if (i < textToType.length) {
                typingText.innerHTML += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                typingText.classList.remove('typing-effect');
                // Automatically show the second paragraph after typing finishes by fading it in
                let p2 = document.getElementById('hero-sub-text');
                if (p2) {
                    p2.style.opacity = '1';
                }
            }
        };
        setTimeout(typeWriter, 1200);
    }

    /* --- Micro-interactions (Ripple & Tilt) --- */
    document.querySelectorAll('.btn-ripple').forEach(btn => {
        btn.addEventListener('click', function (e) {
            let ripple = document.createElement('span');
            ripple.classList.add('ripple-span');
            this.appendChild(ripple);
            let rect = this.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    document.querySelectorAll('.ug-card, .contact-card, .feature-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xVal = ((x / rect.width) - 0.5) * 15;
            const yVal = ((y / rect.height) - 0.5) * -15;
            card.style.transform = `perspective(1000px) rotateX(${yVal}deg) rotateY(${xVal}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.4s ease';
        });
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });

    /* --- Gallery Filters --- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                    setTimeout(() => item.style.opacity = '1', 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.classList.add('hide'), 400);
                }
            });
        });
    });

    /* --- Hamburger Menu Toggle Mobile --- */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    /* --- Fade-In / Scale-In Sequences on Load --- */
    setTimeout(() => {
        const animatedElements = document.querySelectorAll('.hero .fade-in, .hero .scale-in');
        animatedElements.forEach(el => {
            el.classList.add('appear');
        });
    }, 100);

    /* --- Intersection Observer for Scroll Animations --- */
    const observerOptions = {
        threshold: 0.15, // trigger slightly later when element is more visible
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-anim').forEach(el => {
        scrollObserver.observe(el);
    });

    /* --- Stat Counter Animation --- */
    const counterObserverOptions = {
        threshold: 0.5,
        rootMargin: "0px"
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counterNums = entry.target.querySelectorAll('.count-num');
                counterNums.forEach(counter => {
                    const target = +counter.getAttribute('data-val');
                    const duration = 2000; // ms
                    const increment = target / (duration / 20); // updates every 20ms

                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current);
                            setTimeout(updateCounter, 20);
                        } else {
                            counter.innerText = target;
                            entry.target.classList.add('glow-finish');
                        }
                    };
                    updateCounter();
                });
                observer.unobserve(entry.target);
            }
        });
    }, counterObserverOptions);

    const counterSection = document.getElementById('counter-section');
    if (counterSection) {
        counterObserver.observe(counterSection);
    }

    /* --- Smooth Scrolling --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return; // ignore pure '#' links

            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Ensure mobile menu closes on click as well
                if (hamburger && navLinks) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }

                window.scrollTo({
                    top: targetElement.offsetTop - 80, // slightly larger offset for sleekness
                    behavior: 'smooth'
                });
            }
        });
    });

    /* --- Countdown Timer --- */
    const updateCountdown = () => {
        // Set event date: 18th March 2026 09:00:00 AM (local time)
        const eventDate = new Date("March 18, 2026 09:00:00").getTime();
        const now = new Date().getTime();
        const distance = eventDate - now;

        const daysSpan = document.getElementById("days");
        const hoursSpan = document.getElementById("hours");
        const minsSpan = document.getElementById("mins");
        const secsSpan = document.getElementById("secs");

        if (distance < 0) {
            // Event has started / passed
            if (daysSpan) daysSpan.innerHTML = "00";
            if (hoursSpan) hoursSpan.innerHTML = "00";
            if (minsSpan) minsSpan.innerHTML = "00";
            if (secsSpan) secsSpan.innerHTML = "00";
            return;
        }

        // Time calculations for days, hours, minutes and seconds
        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        // Render with padding zeros if needed
        if (daysSpan) daysSpan.innerHTML = d < 10 ? "0" + d : d;
        if (hoursSpan) hoursSpan.innerHTML = h < 10 ? "0" + h : h;
        if (minsSpan) minsSpan.innerHTML = m < 10 ? "0" + m : m;
        if (secsSpan) secsSpan.innerHTML = s < 10 ? "0" + s : s;
    };

    // Initial call
    updateCountdown();
    // Update timer every second
    setInterval(updateCountdown, 1000);

    /* --- Rules Modal Data & Logic --- */
    const eventRules = {
        "General Quiz": [
            "Team size: 2 members.",
            "There is no restriction on the number of teams from each college.",
            "The detailed structure of the event will be announced at the time of the event.",
            "Use of electronic gadgets is strictly prohibited.",
            "Judges’ decision will be final and binding."
        ],
        "Treasure Hunt": [
            "Team size: 4 members.",
            "There is no restriction on the number of teams from each college.",
            "The detailed structure of the event will be announced at the time of the event.",
            "The event will take place within a designated area.",
            "Teams must solve clues and riddles to proceed to the next location.",
            "Judges’ decision will be final and binding."
        ],
        "Folk Dance Group": [
            "Team size: 8–12 members.",
            "There is no restriction on the number of teams from each college.",
            "Participants must perform a folk dance.",
            "Time limit: 4 minutes.",
            "The soundtrack must be submitted in MP3 format (on a pen drive) at the registration desk.",
            "Use of flammable objects or dangerous materials is strictly prohibited.",
            "Vulgarity, profanity, or obscenity is strictly prohibited.",
            "Judges’ decision will be final and binding."
        ],
        "Western Dance Group": [
            "Team size: 8–12 members.",
            "There is no restriction on the number of teams from each college.",
            "Time limit: 4 minutes.",
            "The soundtrack must be submitted in MP3 format (on a pen drive) at the registration desk.",
            "Use of flammable objects or dangerous materials is strictly prohibited.",
            "Vulgarity, profanity, or obscenity is strictly prohibited.",
            "Judges’ decision will be final and binding."
        ],
        "Poster Presentation": [
            "Team size: 2 members.",
            "There is no restriction on the number of teams from each college.",
            "Theme: Social Media as a Tool for Social Change",
            "Time limit: 1 hour for poster preparation.",
            "Each team will be given 1 minute for presentation.",
            "The presentation will be followed by a Question & Answer session.",
            "Participants must bring all required materials.",
            "The poster must be prepared only during the allotted time.",
            "Use of printed or pre-prepared materials is not permitted.",
            "White Chart will be provided.",
            "Judges’ decision will be final and binding."
        ],
        "Idea Pitching": [
            "Team size: 2 members.",
            "There is no restriction on the number of teams from each college.",
            "Time limit: 5 minutes.",
            "The presentation must be in PPT format.",
            "The PPT must be submitted on a pen drive at the registration desk.",
            "The idea should be original, feasible, innovative, and economically viable.",
            "A Question & Answer session will follow.",
            "Judges’ decision will be final and binding."
        ],
        "Group Song": [
            "Team size: 6–12 members.",
            "There is no restriction on the number of teams from each college.",
            "Time limit: 3 minutes.",
            "Song should be in Tamil/Malayalam.",
            "Use of instruments or karaoke is not permitted.",
            "Judges’ decision will be final and binding."
        ],
        "Mime": [
            "Each team consists of 6-12 members.",
            "Teams must perform a mime act within a time limit of 3-4 minutes.",
            "The team can act on any theme.",
            "The act can be based on a theme, story, or emotion.",
            "Teams are not allowed to use any dialogue or vocal sounds.",
            "Music and sound effects are allowed, submit the pen drive with music in MP3 format as one consolidated track. And handover the same at the time of registration itself."
        ],
        "Face Painting": [
            "Team size: 2 members (Artist and Model).",
            "There is no restriction on the number of teams from each college.",
            "Time limit: 45 minutes.",
            "Theme: Dual Shades - Two Contrasting Sides.",
            "Participants must bring paint, brushes, and other required materials.",
            "A short presentation session will follow.",
            "Judges’ decision will be final and binding."
        ],
        "Best Shot": [
            "Individual participation.",
            "There is no restriction on the number of participants from each college.",
            "Theme will be announced on the spot.",
            "Photographs must be taken during the event.",
            "Only smartphone photography is allowed.",
            "Editing is strictly prohibited.",
            "The number of rounds will depend on the number of participants.",
            "Judges’ decision will be final and binding."
        ],
        "Cook Without Fire": [
            "Team size: 2 members.",
            "There is no restriction on the number of teams from each college.",
            "Time limit: 1 hour.",
            "Use of fire, electrical appliances, or microwave ovens is not allowed.",
            "Participants must bring essential materials.",
            "Only pre-approved ingredients and utensils are allowed.",
            "Judges’ decision will be final and binding."
        ],
        "Paper Presentation": [
            "Team size: 2 members.",
            "There is no restriction on the number of teams from each college.",
            "The theme of the papers should be from the area of Arts, Science, Engineering and Management.",
            "The presentation should not exceed 5 minutes.",
            "The presentation should be in PPT.",
            "The PPT must be submitted on a pen drive at the registration desk.",
            "A Question & Answer session will follow.",
            "Judges’ decision will be final and binding."
        ],
        "Spot Games": [
            "Individual participation",
            "There is no restriction on the number of participants from each college.",
            "Games will be announced on the spot.",
            "Fair play and discipline must be maintained.",
            "Prizes will be distributed on spot.",
            "Judges’ decision will be final and binding"
        ],
        "Art from Waste": [
            "Team size: 2 members",
            "There is no restriction on the number of teams from each college.",
            "Time limit: 1 hour.",
            "Participants must bring their own recyclable or reusable materials.",
            "The working area must be kept clean after completion.",
            "Judges’ decision will be final and binding."
        ],
        "Bridal Parade": [
            "Team size: 2 members (Stylist and Model)",
            "There is no restriction on the number of teams from each college.",
            "Time limit: 1 hour for makeup and preparation, followed by a ramp walk with the stylist.",
            "A Question & Answer session will follow.",
            "Participants must arrange their own costume, makeup and accessories.",
            "Vulgarity, profanity, or obscenity is strictly prohibited.",
            "Judges’ decision will be final and binding."
        ],
        "Mehandhi Designing": [
            "Team size: 2 members (Artist and Model)",
            "There is no restriction on the number of teams from each college.",
            "Theme: Bridal Mehandi.",
            "Time limit: 1 hour.",
            "Participants must bring their own henna (Instant henna not permitted).",
            "Use of stencils is not permitted.",
            "Design should be done on both hands.",
            "Judges’ decision will be final and binding."
        ],
        "Master of Market": [
            "Team Size: 3 members.",
            "There is no restriction on the number of teams from each college.",
            "The detailed structure of the event will be announced on the day of the event.",
            "Participants must adhere to the time limit prescribed for the event.",
            "The use of mobile phones or any other unfair means is strictly prohibited unless expressly permitted by the judges.",
            "The event aims to test marketing knowledge, creativity, and analytical abilities.",
            "Judges’ decision will be final and binding"
        ],
        "Reels Making": [
            "Team size: 2 members",
            "There is no restriction on the number of teams from each college.",
            "The reel should cover the entire Gwani ’26 event and should be submitted within the given time.",
            "Reel Duration: Minimum 30 seconds and maximum 60 seconds.",
            "The reel must be in vertical format (9:16 ratio).",
            "Minimum resolution: 720p (HD preferred).",
            "The final video must be submitted in MP4 format only.",
            "No plagiarism or copied content will be accepted.",
            "Clear visuals and proper audio quality must be ensured.",
            "Inappropriate, offensive, or political content must be avoided.",
            "Judges’ decision will be final and binding."
        ],
        "Aaari Artistry": [
            "Individual Participation.",
            "There is no restriction on the number of participants from each college.",
            "Theme: Floral Fantasy",
            "Frame Size: 12 inches",
            "Time limit: 1 hour and 30 minutes.",
            "Participants must bring their own materials.",
            "Only hand embroidery is allowed.",
            "Designs must be original.",
            "Pre-made patterns or machine work are strictly prohibited.",
            "Participants must maintain cleanliness of the workspace.",
            "Judges’ decision will be final and binding."
        ],
        "Vegetable Carving": [
            "Team size: 2 members.",
            "There is no restriction on the number of teams from each college.",
            "Time limit: 1 hour.",
            "Only edible vegetables should be used.",
            "Pre-carved materials are strictly prohibited.",
            "Participants must bring all required tools and vegetables.",
            "Participants must maintain cleanliness of the workspace.",
            "Judges’ decision will be final and binding."
        ],
        "Fashion Show": [
            "Team size: 6–12 members.",
            "There is no restriction on the number of participants from each college.",
            "Costumes must be decent and appropriate.",
            "Audio files (music only) must be submitted in a pen drive at the registration desk.",
            "Use of flammable objects or dangerous materials is strictly prohibited.",
            "Vulgarity, profanity, or obscenity is strictly prohibited.",
            "A Question & Answer session will follow.",
            "Judges’ decision will be final and binding."
        ],
        "Floral Arrangement": [
            "Team size: 2 members.",
            "There is no restriction on the number of teams from each college.",
            "Participants must bring their own flowers and materials.",
            "Only fresh flowers should be used.",
            "Participants must maintain cleanliness of the workspace.",
            "Judges’ decision will be final and binding."
        ],
        "Pencil Sketch": [
            "Individual participation.",
            "There is no restriction on the number of participants from each college.",
            "Time limit: 1 hour.",
            "Theme will be announced on the spot.",
            "Only the chart will be provided.",
            "Pencils and basic sketching materials are allowed.",
            "Judges’ decision will be final and binding."
        ],
            "Best Manager": [
            "Individual event.",
            "There is no restriction on the number of participants from each college.",
            "The detailed structure of the event will be announced on the day of the event.",
            "Participants must be in formal attire.",
            "Each participant must carry two hard copies of their updated resume.",
            "The event evaluates managerial knowledge, analytical ability, and decision-making skills.",
            "Judges’ decision will be final and binding"
        ],
        "Business Plan": [
            "Team size: 3-4 members.",
            "There is no restriction on the number of teams from each college.",
            "Time limit: 4 minutes for presentation.",
            "A Question & Answer round will follow the presentation.",
            "The PPT must be submitted on a pen drive at the registration desk.",
            "Judges’ decision will be final and binding."
        ],
        "Business Quiz": [
            "Team size: 2 members.",
            "There is no restriction on the number of teams from each college.",
            "The detailed structure of the event will be announced on the day of the event.",
            "Use of electronic gadgets is strictly prohibited.",
            "Judges’ decision will be final and binding."
        ],
        "AD-ZAP": [
            "Team size: 5–8 members.",
            "There is no restriction on the number of teams from each college.",
            "Time limit: 3 minutes.",
            "The theme must be unique and innovative.",
            "A Question & Answer round will follow the performance.",
            "Use of flammable objects, weapons, or hazardous materials is strictly prohibited.",
            "Any form of vulgarity, profanity, or obscenity is strictly prohibited.",
            "Judges’ decision will be final and binding."
        ],
        "Corporate Show": [
            "Team size: 8–12 members.",
            "There is no restriction on the number of teams from each college.",
            "Time limit: 4 minutes.",
            "Audio files (music only) must be submitted in a pen drive at the registration desk.",
            "Participants must be dressed in corporate/business professional attire.",
            "Subtle professional props are permitted (e.g., laptop, file folder, notepad).",
            "A Question & Answer session will follow the performance.",
            "Judges’ decision will be final and binding."
        ],
        "Finance Game": [
            "Team size: 4 members.",
            "There is no restriction on the number of teams from each college.",
            "The detailed structure of the event will be announced on the day of the event.",
            "The event focuses on finance-based activities and problem-solving.",
            "Each team must bring a laptop and pen drive.",
            "Use of additional electronic devices is strictly prohibited.",
            "Judges’ decision will be final and binding."
        ],
        "General Guidelines": [
            "All participants must carry their valid college ID card.",
            "Registration for all events must be completed before the stipulated deadline.",
            "Participants should report to the respective venue 30 minutes prior to the event time.",
            "Any form of indiscipline or misbehavior will lead to immediate disqualification of the team/college.",
            "The judges' decisions are final and binding in all events.",
            "The organizing committee reserves the right to change or modify the rules at any time.",
            "Participants must take care of their personal belongings. The organizers will not be responsible for any loss."
        ],
        "PG Guidelines": [
            "All participants must carry their valid college ID card.",
            "Participants should report to the respective venue 30 minutes prior to the event time.",
            "Professional or formal dress code is mandatory for PG events unless specified otherwise in specific event rules.",
            "Any form of indiscipline or misbehavior will lead to immediate disqualification of the team/college.",
            "The judges' decisions are final and binding in all events.",
            "All presentations and documents must be original. Plagiarism will strictly lead to disqualification."
        ]
    };

    const rulesModal = document.getElementById("rules-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");
    const closeModalBtn = document.getElementById("close-modal");

    const openRulesModal = (eventName) => {
        modalTitle.innerText = eventName + " Rules";

        // Clear previous content
        modalBody.innerHTML = "";

        if (eventRules[eventName]) {
            const ul = document.createElement("ul");
            eventRules[eventName].forEach(rule => {
                const li = document.createElement("li");
                li.innerText = rule;
                ul.appendChild(li);
            });
            modalBody.appendChild(ul);
        } else {
            const p = document.createElement("p");
            p.innerText = "Detailed rules will be updated soon.";
            modalBody.appendChild(p);
        }

        rulesModal.classList.add("show");
        document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    closeModalBtn.addEventListener('click', () => {
        rulesModal.classList.remove("show");
        document.body.style.overflow = "";
    });

    // Close when clicking outside of modal content
    window.addEventListener('click', (event) => {
        if (event.target == rulesModal) {
            rulesModal.classList.remove("show");
            document.body.style.overflow = "";
        }
    });

    // Close on Escape key
    window.addEventListener('keydown', (event) => {
        if (event.key === "Escape" && rulesModal.classList.contains("show")) {
            rulesModal.classList.remove("show");
            document.body.style.overflow = "";
        }
    });

    /* --- Gallery Lightbox Logic & Navigation --- */
    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeLightboxBtn = document.getElementById("close-lightbox");
    const btnPrev = document.getElementById("lightbox-prev");
    const btnNext = document.getElementById("lightbox-next");

    let currentImageIndex = 0;

    // Gets currently visible images in gallery to allow navigation even when filtered
    const getVisibleGalleryImages = () => {
        const visibleItems = Array.from(document.querySelectorAll('.gallery-item:not(.hide) img'));
        return visibleItems.map(img => img.getAttribute('src'));
    };

    const openLightbox = (imageSrc) => {
        if (lightboxModal && lightboxImg) {
            lightboxImg.src = imageSrc;
            const images = getVisibleGalleryImages();
            currentImageIndex = images.indexOf(imageSrc);

            lightboxModal.classList.add("show");
            document.body.style.overflow = "hidden";
        }
    }

    const navigateLightbox = (direction) => {
        const images = getVisibleGalleryImages();
        if (images.length === 0) return;

        if (direction === 'next') {
            currentImageIndex = (currentImageIndex + 1) % images.length;
        } else {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        }
        lightboxImg.src = images[currentImageIndex];
    };

    if (btnPrev) btnPrev.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox('prev'); });
    if (btnNext) btnNext.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox('next'); });

    if (closeLightboxBtn) {
        closeLightboxBtn.addEventListener('click', () => {
            lightboxModal.classList.remove("show");
            document.body.style.overflow = "";
            setTimeout(() => { lightboxImg.src = ""; }, 300); // Clear after fade
        });
    }

    // Close when clicking outside of lightbox image
    window.addEventListener('click', (event) => {
        if (event.target == lightboxModal) {
            lightboxModal.classList.remove("show");
            document.body.style.overflow = "";
            setTimeout(() => { lightboxImg.src = ""; }, 300);
        }
    });

    // Share Escape key & arrow keys logic
    window.addEventListener('keydown', (event) => {
        if (lightboxModal && lightboxModal.classList.contains("show")) {
            if (event.key === "Escape") {
                lightboxModal.classList.remove("show");
                document.body.style.overflow = "";
                setTimeout(() => { lightboxImg.src = ""; }, 300);
            } else if (event.key === "ArrowRight") {
                navigateLightbox('next');
            } else if (event.key === "ArrowLeft") {
                navigateLightbox('prev');
            }
        }
    });

    /* --- Event Delegation for Modals --- */
    document.body.addEventListener('click', (e) => {
        // Rules Modal Trigger
        const rulesBtn = e.target.closest('[data-event-name]');
        if (rulesBtn) {
            const eventName = rulesBtn.dataset.eventName;
            if (eventName) {
                openRulesModal(eventName);
            }
        }

        // Lightbox Trigger
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            const img = galleryItem.querySelector('img');
            if (img && img.src) {
                openLightbox(img.src);
            }
        }
    });

});
