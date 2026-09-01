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
        const textToType = "Mar Ephraem College warmly welcomes you to <b>Gwani 2.0</b>, a <b>National Level Techno Management Fest</b> — celebrating excellence beyond boundaries.";
        typingText.innerHTML = '';
        let i = 0;
        const speed = 25; // ms per char

        const typeWriter = () => {
            if (i < textToType.length) {
                if (textToType.charAt(i) === '<') {
                    while (i < textToType.length && textToType.charAt(i) !== '>') {
                        i++;
                    }
                }
                typingText.innerHTML = textToType.substring(0, i + 1);
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
        // Set event date: 9th September 2026 09:00:00 AM (local time)
        const eventDate = new Date("September 9, 2026 09:00:00").getTime();
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

    /* --- Rules Modal Data & Logic --- */    /* --- Rules Modal Data & Logic --- */
    const eventRules = {
        /* PG EVENTS */
        "Best Manager": [
            "This is an individual event.",
            "There is no restriction on the number of participants from each college.",
            "The detailed structure and rounds of the event will be announced on the day of the event.",
            "Participants must be dressed in formal attire.",
            "Each participant must carry two hard copies of their updated résumé.",
            "The event will evaluate participants’ managerial knowledge, analytical ability, decision-making skills, and overall managerial aptitude.",
            "The decision of the judges shall be final and binding."
        ],
        "Business Plan": [
            "Team Size: 3–4 members.",
            "There is no restriction on the number of teams participating from each college.",
            "Presentation Time Limit: 4 minutes.",
            "A Question-and-Answer (Q&A) session will follow the presentation.",
            "The presentation must be submitted in PPT format on a pen drive at the registration desk.",
            "The judges’ decision shall be final and binding."
        ],
        "Business Quiz": [
            "Team Size: 2 members.",
            "There is no restriction on the number of teams participating from each college.",
            "The detailed structure and rules of the event will be announced on the day of the event.",
            "The use of mobile phones, electronic gadgets, or any other external assistance is strictly prohibited.",
            "Participants must follow all instructions given by the quiz coordinators and judges.",
            "The judges’ decision shall be final and binding."
        ],
        "AD-ZAP": [
            "Team Size: 5–8 members.",
            "There is no restriction on the number of teams participating from each college.",
            "Time Limit: 3 minutes.",
            "The advertisement must be unique, creative, and innovative.",
            "A Question-and-Answer (Q&A) session will follow the performance.",
            "The use of flammable objects, weapons, or hazardous materials is strictly prohibited.",
            "Any form of vulgarity, profanity, obscenity, or inappropriate content is strictly prohibited.",
            "Participants may select any product of their choice and prepare the advertisement in advance.",
            "The judges’ decision shall be final and binding."
        ],
        "Corporate Show": [
            "Team Size: 8–12 members.",
            "There is no restriction on the number of teams participating from each college.",
            "Time Limit: 4 minutes.",
            "Audio files containing music only must be submitted on a pen drive at the registration desk.",
            "Simple and professional props are permitted, such as laptops, file folders, and notepads.",
            "A Question-and-Answer (Q&A) session will follow the performance.",
            "The judges’ decision shall be final and binding."
        ],
        "Finance Game": [
            "Team Size: 4 members.",
            "There is no restriction on the number of teams participating from each college.",
            "The detailed structure and rules of the event will be announced on the day of the event.",
            "The event will focus on finance-related activities, analytical thinking, and problem-solving skills.",
            "The use of mobile phones, calculators, or other electronic devices is strictly prohibited, unless expressly permitted by the event coordinators or judges.",
            "The judges’ decision shall be final and binding."
        ],
        "Master of Market": [
            "Team Size: 3 members.",
            "There is no restriction on the number of teams participating from each college.",
            "The detailed structure and rules of the event will be announced on the day of the event.",
            "Participants must strictly adhere to the time limits prescribed for each round.",
            "The use of mobile phones, electronic devices, or any other unfair means is strictly prohibited, unless expressly permitted by the judges.",
            "The event is designed to assess participants’ marketing knowledge, creativity, analytical thinking, and decision-making skills.",
            "The judges’ decision shall be final and binding."
        ],

        /* UG EVENTS */
        "General Quiz": [
            "Team Size: 2 members.",
            "There is no restriction on the number of teams participating from each college.",
            "The detailed structure and rules of the event will be announced on the day of the event.",
            "The use of mobile phones, electronic gadgets, or any other external assistance is strictly prohibited.",
            "The judges’ decision shall be final and binding."
        ],
        "Treasure Hunt": [
            "Team Size: 4 members.",
            "There is no restriction on the number of teams participating from each college.",
            "The detailed structure and rules of the event will be announced on the day of the event.",
            "The event will be conducted within a designated area.",
            "Teams must solve clues and riddles to proceed to the next location.",
            "The judges’ decision shall be final and binding."
        ],
        "Folk Dance Group": [
            "Team Size: 8–12 members.",
            "There is no restriction on the number of teams participating from each college.",
            "Participants must perform a folk dance.",
            "Time Limit: 4 minutes.",
            "The soundtrack must be submitted in MP3 format on a pen drive at the registration desk.",
            "The use of flammable objects, dangerous materials, or hazardous props is strictly prohibited.",
            "Any form of vulgarity, profanity, obscenity, or inappropriate content is strictly prohibited.",
            "The judges’ decision shall be final and binding."
        ],
        "Poster Presentation": [
            "Team Size: 2 members.",
            "There is no restriction on the number of teams participating from each college.",
            "Theme: AI in Digital Marketing",
            "Time Limit: 1 hour for poster preparation.",
            "Each team will be given 1 minute for the presentation.",
            "A Question-and-Answer (Q&A) session will follow the presentation.",
            "Participants must bring all the required materials.",
            "The poster must be prepared only during the allotted time.",
            "The use of printed or pre-prepared materials is strictly prohibited.",
            "White chart paper will be provided.",
            "The judges’ decision shall be final and binding."
        ],
        "Idea Pitching": [
            "Team Size: 2 members.",
            "There is no restriction on the number of teams participating from each college.",
            "Time Limit: 5 minutes.",
            "The presentation must be prepared in PPT format.",
            "The PPT must be submitted on a pen drive at the registration desk.",
            "The proposed idea should be original, feasible, innovative, and economically viable.",
            "A Question-and-Answer (Q&A) session will follow the presentation.",
            "The judges’ decision shall be final and binding."
        ],
        "Face Painting": [
            "Team Size: 2 members (Artist and Model).",
            "There is no restriction on the number of teams participating from each college.",
            "Time Limit: 45 minutes.",
            "Theme: Dual Shades – Two Contrasting Sides",
            "Participants must bring their own paints, brushes, and other required materials.",
            "A short presentation will follow the completion of the artwork.",
            "Participants are responsible for arranging all the materials required for the event.",
            "The judges’ decision shall be final and binding."
        ],
        "Best Shot": [
            "Individual Participation.",
            "There is no restriction on the number of participants from each college.",
            "The theme will be announced on the spot.",
            "Photographs must be captured during the event.",
            "Only smartphone photography is permitted.",
            "Editing or post-processing of photographs is strictly prohibited.",
            "The number of rounds will depend on the number of participants.",
            "The judges’ decision shall be final and binding."
        ],
        "Cook Without Fire": [
            "Team Size: 2 members.",
            "There is no restriction on the number of teams participating from each college.",
            "Time Limit: 1 hour.",
            "The use of fire, electrical appliances, or microwave ovens is strictly prohibited.",
            "Participants must bring all essential materials required for the preparation.",
            "Only pre-approved ingredients and utensils are permitted.",
            "The judges’ decision shall be final and binding."
        ],
        "Paper Presentation": [
            "Team Size: 2 members.",
            "There is no restriction on the number of teams participating from each college.",
            "The paper must be based on a topic related to Arts, Science, Engineering, or Management.",
            "Presentation Time Limit: 5 minutes.",
            "The presentation must be in PPT format.",
            "The PPT must be submitted on a pen drive at the registration desk.",
            "A Question-and-Answer (Q&A) session will follow the presentation.",
            "The judges’ decision shall be final and binding."
        ],
        "Art from Waste": [
            "Team Size: 2 members.",
            "There is no restriction on the number of teams participating from each college.",
            "Time Limit: 1 hour.",
            "Participants must bring their own recyclable or reusable materials.",
            "The working area must be kept clean and tidy throughout the event and after completion.",
            "The judges’ decision shall be final and binding."
        ],
        "Bridal Parade": [
            "Team Size: 2 members (Stylist and Model).",
            "There is no restriction on the number of teams participating from each college.",
            "Time Limit: 1 hour for makeup and preparation, followed by a ramp walk with the stylist.",
            "A Question-and-Answer (Q&A) session will follow the ramp walk.",
            "Participants must arrange their own costume, makeup, accessories, and other required materials.",
            "Any form of vulgarity, profanity, obscenity, or inappropriate content is strictly prohibited.",
            "The judges’ decision shall be final and binding."
        ],
        "Mehandhi Designing": [
            "Team Size: 2 members (Artist and Model).",
            "There is no restriction on the number of teams participating from each college.",
            "Theme: Bridal Mehendi",
            "Time Limit: 1 hour.",
            "Participants must bring their own henna. Instant henna is not permitted.",
            "The use of stencils is strictly prohibited.",
            "The design should be done on both hands.",
            "The judges’ decision shall be final and binding."
        ],
        "Mehendi Designing": [
            "Team Size: 2 members (Artist and Model).",
            "There is no restriction on the number of teams participating from each college.",
            "Theme: Bridal Mehendi",
            "Time Limit: 1 hour.",
            "Participants must bring their own henna. Instant henna is not permitted.",
            "The use of stencils is strictly prohibited.",
            "The design should be done on both hands.",
            "The judges’ decision shall be final and binding."
        ],
        "Reels Making": [
            "Team Size: 2–3 members.",
            "There is no restriction on the number of teams participating from each college.",
            "The reel must cover the GWANI ’26 2.O event and must be submitted within the prescribed time.",
            "Reel Duration: Minimum 30 seconds and maximum 60 seconds.",
            "The reel must be in vertical format (9:16 aspect ratio).",
            "Minimum Resolution: 720p (HD preferred).",
            "The final video must be submitted in MP4 format only.",
            "Plagiarized or copied content will not be accepted.",
            "Participants must ensure clear visuals and good audio quality.",
            "Inappropriate, offensive, or political content is strictly prohibited.",
            "The judges’ decision shall be final and binding."
        ],
        "Fashion Show": [
            "Team Size: 6–12 members.",
            "There is no restriction on the number of participants from each college.",
            "Costumes must be decent, appropriate, and suitable for an academic event.",
            "Audio files containing music only must be submitted on a pen drive at the registration desk.",
            "The use of flammable objects, dangerous materials, or hazardous props is strictly prohibited.",
            "Any form of vulgarity, profanity, obscenity, or inappropriate content is strictly prohibited.",
            "A Question-and-Answer (Q&A) session will follow the performance.",
            "The judges’ decision shall be final and binding."
        ],
        "Pencil Sketch": [
            "Individual Participation.",
            "There is no restriction on the number of participants from each college.",
            "Time Limit: 1 hour.",
            "The theme will be announced on the spot.",
            "Chart paper will be provided.",
            "Participants may bring their own pencils and basic sketching materials.",
            "The judges’ decision shall be final and binding."
        ],

        /* COMMON EVENTS / OPEN TO BOTH */
        "Western Dance Group": [
            "Team Size: 8–12 members.",
            "There is no restriction on the number of teams participating from each college.",
            "Time Limit: Maximum of 4 minutes.",
            "The soundtrack must be submitted in MP3 format on a pen drive at the registration desk.",
            "Any form of vulgarity, profanity, obscenity, or inappropriate content is strictly prohibited.",
            "The judges’ decision shall be final and binding."
        ],
        "Western Dance": [
            "Team Size: 8–12 members.",
            "There is no restriction on the number of teams participating from each college.",
            "Time Limit: Maximum of 4 minutes.",
            "The soundtrack must be submitted in MP3 format on a pen drive at the registration desk.",
            "Any form of vulgarity, profanity, obscenity, or inappropriate content is strictly prohibited.",
            "The judges’ decision shall be final and binding."
        ],
        "Solo Dance": [
            "Individual Participation.",
            "There is no restriction on the number of participants from each college.",
            "Time Limit: Maximum of 3 minutes.",
            "The soundtrack must be submitted in MP3 format on a pen drive at the registration desk.",
            "Any form of vulgarity, profanity, obscenity, or inappropriate content is strictly prohibited.",
            "The judges’ decision shall be final and binding."
        ],
        "Group Song": [
            "Team Size: 6–12 members.",
            "There is no restriction on the number of teams participating from each college.",
            "Time Limit: 3 minutes.",
            "Songs must be performed in Tamil or Malayalam.",
            "The use of musical instruments or karaoke tracks is not permitted.",
            "Participants must adhere strictly to the prescribed time limit.",
            "The judges’ decision shall be final and binding."
        ],
        "Spot Games": [
            "Individual Participation.",
            "Participants who register only for the Spot Game must pay the prescribed registration fee.",
            "Participants who have already registered for any other event may participate in the Spot Game without paying an additional registration fee.",
            "There is no restriction on the number of participants from each college.",
            "The games will be announced on the spot.",
            "Participants must maintain fair play, discipline, and sportsmanship throughout the event.",
            "Prizes will be distributed on the spot to the winners.",
            "The judges’ decision shall be final and binding."
        ],


        /* GENERAL & COMMON GUIDELINES */
        "General Guidelines": [
            "1. Registration will commence at 8:30 AM and close sharply at 10:30 AM. No late registrations will be entertained.",
            "2. All events will commence from 11:00 AM onwards.",
            "3. The Valedictory Function will commence at 4:00 PM, and college buses will depart from the campus at 5:00 PM.",
            "4. Participants must report to their respective event venues on time. Late arrival may result in disqualification.",
            "5. Participants must strictly adhere to the time limits prescribed for their respective events.",
            "6. College buses will operate on the regular routes. Participants from other colleges may also avail themselves of the college bus facility.",
            "7. A participating certificate will be provided to all participants who take part in the event.",
            "8. All participants must provide the full address of their college, including the PIN code, during registration.",
            "9. A valid College ID card is mandatory for event registration and must be carried at all times.",
            "10. Any form of malpractice, misconduct, or use of unfair means will result in immediate disqualification.",
            "11. Vulgarity, profanity, obscenity, or any form of inappropriate behaviour will result in immediate disqualification.",
            "12. Participants are responsible for bringing all necessary materials, equipment, tools, laptops, costumes, and other technical requirements required for their respective events.",
            "13. Participants are responsible for the safety of their personal belongings. The organisers will not be held responsible for any loss or damage.",
            "14. Lunch will be provided for all registered participants.",
            "15. The decision of the judges will be final and binding in all events. No further queries or appeals regarding the judges’ decision will be entertained.",
            "16. A participant may participate in only one event, except for the Spot Game.",
            "17. Participants who have registered for any event may participate in the Spot Game. No cash prize will be awarded for the Spot Game; gifts will be presented to the winners on the spot.",
            "18. Western Dance and Group Song are common events for both UG and PG students. 50% of the marks scored by the team will be considered for the UG Overall Championship, and the remaining 50% will be considered for the PG Overall Championship.",
            "19. Solo Dance is a common event for both UG and PG students. The marks obtained by the UG winner will be considered for the UG Overall Championship Trophy, while the marks obtained by the PG winner will be considered for the PG Overall Championship Trophy."
        ],
        "PG Guidelines": [
            "1. Registration will commence at 8:30 AM and close sharply at 10:30 AM. No late registrations will be entertained.",
            "2. All events will commence from 11:00 AM onwards.",
            "3. Professional or formal dress code is mandatory for PG events unless specified otherwise.",
            "4. The Valedictory Function will commence at 4:00 PM, and college buses will depart from campus at 5:00 PM.",
            "5. Participants must report to their respective event venues on time.",
            "6. A valid College ID card is mandatory for event registration and must be carried at all times.",
            "7. Participants must provide full college address including PIN code during registration.",
            "8. Lunch will be provided for all registered participants.",
            "9. The decision of the judges will be final and binding in all events.",
            "10. Plagiarism or misconduct will result in immediate disqualification.",
            "11. Western Dance & Group Song: 50% marks for UG Overall Championship and 50% marks for PG Overall Championship.",
            "12. Solo Dance: Marks obtained by PG winner will count towards the PG Overall Championship Trophy."
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
