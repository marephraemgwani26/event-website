document.addEventListener('DOMContentLoaded', () => {

    /* --- Preloader --- */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 800); // 800ms initial delay for aesthetics
        });
    }

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
            "Each team consists of two members.",
            "Any number of entries from a college will be allowed.",
            "Preliminary round will be there for elimination. Only 6 teams will be selected for Final Round.",
            "Rules will be specific, and will be disclosed before the event starts.",
            "Electronic gadgets are strictly prohibited.",
            "Quiz master’s decision will be final."
        ],
        "Treasure Hunt": [
            "Teams consist of 3-5 members.",
            "The treasure hunt will take place within a designated area.",
            "Teams must solve clues and riddles to reach the next location.",
            "Each clue solved will lead to the next one, ultimately revealing the treasure's location.",
            "Teams must return to the starting point with the treasure to win."
        ],
        "Folk Dance Group": [
            "Each team consists of 6-12 members.",
            "Teams must perform a traditional folk dance from any culture.",
            "The performance should be 3-4 minutes long, exceeding the time will lead to disqualification.",
            "The soundtrack should be handed over in mp3 format in a pen-drive at the time of registration.",
            "Each participant must carry their college ID for verification purposes."
        ],
        "Western Dance Group": [
            "Each team should have a minimum of 6 and a maximum of 10 dancers (a minimum of 4 dancers should be on stage at all times).",
            "Any number of teams from a college is permitted.",
            "The performance time limited to 3 minutes. Exceeding the maximum time limit will lead to disqualification and the music will be stopped immediately.",
            "The participants may use any song(s) in their performance.",
            "Use of flammable objects, weapons, vermilion (gulaal) or any item that poses a possibility of danger to the audience or surroundings is strictly prohibited.",
            "Any form of vulgarity, profanity and/or obscenity will lead to immediate disqualification.",
            "Each team must submit the pen drive with music in MP3 format as one consolidated track and handover the same at the time of registration itself."
        ],
        "Poster Presentation": [
            "The team should consist of 2 members.",
            "Any number of entries from a college will be allowed.",
            "Only chart will be provided from the college. All other stationary items should be brought by the participants.",
            "The theme of the poster presentation is Global Humanitarian Issues.",
            "30 minutes time will be given for poster making. One minute will be given for presentation of the poster.",
            "Q&A session will be followed."
        ],
        "Idea Pitching": [
            "Team consists of 2 members.",
            "Each team will have 5 minutes to present their innovative idea in PPT.",
            "Ideas should be original, feasible, innovative and economically viable.",
            "A panel of judges will evaluate the ideas.",
            "Question and Answer session will be conducted."
        ],
        "Group Song": [
            "Each team consists of 4-8 members.",
            "Teams must perform a song of their choice within a time limit of 4 minutes.",
            "Songs can be from any language.",
            "Instruments are not allowed."
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
            "There should be two participants in a team.",
            "The theme for the face painting is GO GREEN.",
            "Participants will have 45 minutes to complete the face painting.",
            "Participants must bring their own materials.",
            "The face painting should be original and creative."
        ],
        "Best Shot": [
            "Each participant should submit 3 photographs.",
            "The theme for the competition will be announced on the spot.",
            "Photographs must be taken on the spot during the event.",
            "Only photographs taken with a smartphone or camera are allowed.",
            "Editing of photographs is not allowed."
        ],
        "Cook Without Fire": [
            "Two participants in a team.",
            "Participants must prepare a dish without using fire, electrical appliances, or microwave.",
            "Participants should bring the essential materials.",
            "Only per-approved ingredients and utensils are allowed.",
            "Participants will be given 45 minutes to prepare and present their dish."
        ],
        "Paper Presentation": [
            "Each participant can present only one paper.",
            "There should be two participants in a team",
            "The theme of the papers should be from the area of Arts, Science, Engineering and Management.",
            "The presentation should not exceed 5 minutes.",
            "The presentation should be in PPT"
        ],
        "Spot Games": [
            "The game will be played on a designated spot.",
            "The participant who registered for any other event also can participate.",
            "Individual and group games will be conducted.",
            "Participants will be given a task or challenge to complete on the spot.",
            "The task may involve physical or mental activities.",
            "Participants will have a limited time to complete the task.",
            "In case of a tie, a tiebreaker round will be held.",
            "Participants must follow all instructions and rules to participate."
        ],
        "Art from Waste": [
            "It is a team event (2-3 members per team).",
            "Any number of entries from a college will be allowed.",
            "Participants must create a useful or decorative item using waste / recyclable materials.",
            "The theme will be announced prior to the event / on the spot (as decided by the organizers).",
            "Time limit for the competition is 60–90 minutes.",
            "Participants must bring their own waste materials and necessary tools.",
            "Only waste and recyclable materials should be used. No decorative items will be allowed",
            "Pre-prepared or partially completed models are strictly prohibited.",
            "Use of hazardous materials, sharp objects without safety, flammable substances or items causing inconvenience is strictly prohibited.",
            "Participants must keep their workspace clean during and after the event."
        ],
        "Bridal Parade": [
            "It is an individual competition (Only the model & stylist will participate).",
            "Any number of entries from a college will be allowed.",
            "The theme can be Traditional, Contemporary, Cultural or Fusion Bridal.",
            "Time limit for each participant is 3 minutes. Exceeding the time limit will lead to negative marks.",
            "Participants must arrange their own costume, makeup and accessories.",
            "The soundtrack should be handed over in MP3 format in a pen drive at the time of registration.",
            "Use of flammable objects, weapons or any item that poses a possibility of danger to the audience or surroundings is strictly prohibited.",
            "Participants must carry their college ID card for verification purposes.",
            "Participants are required to report 30 minutes before the event.",
            "A short introduction about the bridal theme (maximum 1 minute) should be given during the presentation.",
            "Judges’ decision will be final and binding."
        ],
        "Mehandhi Designing": [
            "Participation is limited to 2 members per team.",
            "The theme will be given on the spot and must be followed strictly.",
            "The time limit must be strictly adhered to.",
            "Only natural mehendi (henna) cones are permitted.",
            "Judging will be based on neatness, creativity, detailing, and overall finishing.",
            "Pre-drawn outlines or stickers are not allowed.",
            "Participants must bring their own materials.",
            "The judges’ decision will be final."
        ],
        "Master of Market": [
            "Participation can be Individual / Team (Maximum 2–3 members)",
            "The event will consist of multiple rounds testing marketing knowledge, creativity, and analytical skills.",
            "Topics or tasks will be announced on the spot",
            "Participants must follow the time limit for each round.",
            "Use of mobile phones or unfair means is strictly prohibited.",
            "All ideas and presentations must be original",
            "Judges’ decision will be final and binding"
        ],
        "Reels Making": [
            "Participation can be Individual or Team (Maximum 2–3 members)",
            "The theme will be announced on the spot",
            "Reel making time will be 30 minutes, followed by 1 hour for editing",
            "Reels should be minimum 30 seconds and maximum 60 seconds",
            "Reel must be in vertical format (9:16 ratio)",
            "Minimum resolution should be 720p (HD preferred)",
            "The final video must be submitted in MP4 format only",
            "Ensure clear visuals and proper audio quality (if voice or music is used).",
            "Content must be original",
            "No plagiarism or copied content will be accepted.",
            "Avoid inappropriate, offensive, or political content"
        ],
        "Aaari Artistry": [
            "It is an individual event.",
            "Any number of entries from a college will be allowed.",
            "Participants must create an Aari embroidery design based on the given theme.",
            "The theme will be announced prior to the event / on the spot (as decided by the organizers).",
            "Time limit for the competition is 60–90 minutes.",
            "Participants must bring their own materials (Aari needle, frame, threads, beads, sequins, fabric, etc.).",
            "Only hand embroidery is allowed. Use of machines is strictly prohibited.",
            "Designs must be original. Any copied or pre-prepared work will lead to disqualification.",
            "Participants must complete the work within the allotted time.",
            "Participants must carry their college ID card for verification purposes.",
            "Judges’ decision will be final and binding."
        ],
        "Vegetable Carving": [
            "Participation is limited to 2 members per team.",
            "Theme will be given on the spot and must be followed.",
            "The time limit must be strictly adhered to.",
            "Participants must bring their own vegetables and carving tools.",
            "Only edible vegetables should be used.",
            "Judging will be based on creativity, detailing, presentation, and neatness.",
            "Pre-carved materials are not allowed.",
            "The judges’ decision will be final."
        ],
        "Fashion Show": [
            "Participation is strictly individual.",
            "Theme: Traditional Attire (must be followed strictly).",
            "Time limit for the ramp walk must be adhered to.",
            "Costumes should be decent and appropriate.",
            "Participants must arrange their own costumes, props, and music.",
            "Judging will be based on confidence, creativity, presentation, and overall appearance.",
            "Judges’ decision will be final."
        ],
        "Floral Arrangement": [
            "Participation is individual.",
            "Theme will be given on the spot and must be followed strictly.",
            "The time limit must be adhered to.",
            "Participants must bring their own flowers and materials.",
            "Only fresh flowers should be used.",
            "Judging will be based on creativity, color combination, neatness, and overall presentation.",
            "The judges’ decision will be final."
        ],
        "Pencil Sketch": [
            "Participation is individual.",
            "Theme will be given on the spot and must be followed strictly.",
            "The time limit must be adhered to.",
            "Only pencils and basic sketching materials are allowed.",
            "Participants must bring their own materials.",
            "Judging will be based on creativity, shading, neatness, and overall presentation.",
            "Judges’ decision will be final."
        ],
        "Mr & Mrs Gwani '26": [
            "It is an individual event.",
            "Any number of entries from a college will be allowed.",
            "There are three rounds and the rules for each round will be disclosed on the spot.",
            "It is the responsibility of the participants to clear the doubts before the event commences.",
            "There will be elimination in each round."
        ],
        "Best Manager": [
            "It is an individual event.",
            "All the participants are expected to be in formal attire.",
            "There can be any number of participants from a college.",
            "The event will be conducted in 4 rounds which tests the participant’s managerial knowledge and skills.",
            "Each participant should carry two hard copies of their updated resume."
        ],
        "Business Plan": [
            "Team based competition with 2 to 4 members.",
            "Any number of entries from a college will be allowed.",
            "Time limit for PPT Presentation is 4 minutes."
        ],
        "Business Quiz": [
            "Each team consists of two members.",
            "Any number of entries from a college will be allowed.",
            "Preliminary round will be there for elimination. Only 6 teams will be selected for Final Round.",
            "Rules will be specific and disclosed before the event starts. Electronic gadgets are strictly prohibited.",
            "Quiz master’s decision will be final."
        ],
        "AD-ZAP": [
            "Team based competition with 5-10 members.",
            "The theme should be unique and innovative.",
            "Use of flammable objects, weapons, vermilion (gulaal) or any item that poses a possibility of danger to the audience or surroundings is strictly prohibited.",
            "Any form of vulgarity, profanity and/or obscenity will lead to immediate disqualification.",
            "Any number of teams can participate from a college.",
            "Time Limit is 3 minutes."
        ],
        "Corporate Show": [
            "Each team must have 8 to 12 members.",
            "Two teams from a college are permitted.",
            "The time limit for the show is limited to 5 minutes only.",
            "Each team should bring their audio file (music only) in pen drive and handover it at the time of registration itself.",
            "Participating team is responsible for Technical issues of the audio files.",
            "Question and Answer session will be there after the performance."
        ],
        "Finance Game": [
            "This event revolves around finance.",
            "Any number of team can participate from a college.",
            "Team size: 3 to 4 members.",
            "There will be 3 rounds in this event.",
            "Participating team is required to bring a laptop.",
            "The use of other electronic devices are strictly forbidden.",
            "Teams found engaging in malpractices will be disqualified from the competition."
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

    window.openRulesModal = function (eventName) {
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
    };

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

    window.openLightbox = function (imageSrc) {
        if (lightboxModal && lightboxImg) {
            lightboxImg.src = imageSrc;
            const images = getVisibleGalleryImages();
            currentImageIndex = images.indexOf(imageSrc);

            lightboxModal.classList.add("show");
            document.body.style.overflow = "hidden";
        }
    };

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

});
