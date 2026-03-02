// Data for Events
const ugEvents = [
    "General Quiz", "Treasure Hunt", "Folk Dance Group", "Western Dance Group",
    "Poster Presentation", "Idea Pitching", "Group Song", "Mime", "Face Painting",
    "Best Shot", "Cook Without Fire", "Paper Presentation", "Spot Games",
    "Art from Waste", "Bridal Parade", "Mehandhi Designing", "Master of Market",
    "Reels Making", "Aaari Artistry", "Vegetable Carving", "Fashion Show",
    "Floral Arrangement", "Pencil Sketch", "Mr & Mrs Gwani '26"
];

const pgEvents = [
    "Best Manager", "Business Plan", "Business Quiz", "AD-ZAP", "Corporate Show",
    "Western Dance Group", "Finance Game", "Master of Market"
];

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Navbar Scrolled & Active Links ---
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // --- 2. Mobile Menu Toggle ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinksContainer = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navLinksContainer.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });

    // --- 3. Scroll Reveal Animation via IntersectionObserver ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Numbers Counter Animation trigger
                if (entry.target.classList.contains('about-stats')) {
                     const counters = entry.target.querySelectorAll('.counter');
                     counters.forEach(counter => {
                         const target = +counter.getAttribute('data-target');
                         const inc = target / 40; 
                         let count = 0;
                         const updateCount = () => {
                             count += inc;
                             if (count < target) {
                                 counter.innerText = Math.ceil(count);
                                 setTimeout(updateCount, 40);
                             } else {
                                 counter.innerText = target;
                             }
                         };
                         updateCount();
                     });
                     obs.unobserve(entry.target); // only animate counts once
                }
                obs.unobserve(entry.target); // only fade in once for static elements
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

    // --- 4. Dynamic Events Filtering ---
    const eventsGrid = document.getElementById('events-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Random styling icons 
    const icons = ['fa-laptop-code', 'fa-brain', 'fa-paint-brush', 'fa-music', 'fa-camera', 'fa-chart-line', 'fa-bullseye', 'fa-lightbulb', 'fa-shapes', 'fa-magic', 'fa-crown', 'fa-users'];

    function renderEvents(category) {
        eventsGrid.innerHTML = '';
        const list = category === 'ug' ? ugEvents : pgEvents;
        
        list.forEach((event, index) => {
            const randomIcon = icons[index % icons.length];
            const card = document.createElement('div');
            // remove hidden & add fade-in so it behaves smoothly dynamically 
            card.className = 'event-card glass-card hidden'; 
            card.innerHTML = `
                <div class="event-icon"><i class="fas ${randomIcon}"></i></div>
                <h3 class="event-title">${event}</h3>
                <span class="event-category">${category.toUpperCase()} EVENT</span>
            `;
            eventsGrid.appendChild(card);
            
            // Re-observe dynamic cards
            setTimeout(() => {
                observer.observe(card);
            }, 50 * index); // cascading delay
        });
    }

    // Initialize with UG events
    renderEvents('ug');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderEvents(btn.getAttribute('data-filter'));
        });
    });

    // --- 5. Registration Dynamic Dropdown ---
    const catSelect = document.getElementById('category');
    const eventSelect = document.getElementById('event-select');

    catSelect.addEventListener('change', (e) => {
        eventSelect.innerHTML = '<option value="" disabled selected>Select an Event</option>';
        eventSelect.disabled = false;
        
        const list = e.target.value === 'ug' ? ugEvents : pgEvents;
        list.forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            eventSelect.appendChild(option);
        });
    });

    // --- 6. Form Submission Mock ---
    const regForm = document.getElementById('registration-form');
    const formMsg = document.getElementById('form-message');

    regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = regForm.querySelector('.btn-submit span');
        const icon = regForm.querySelector('.btn-submit i');
        
        btn.innerText = "Registering...";
        icon.className = "fas fa-spinner fa-spin";
        
        setTimeout(() => {
            formMsg.textContent = "Registration Successful! See you at GWANI '26!";
            formMsg.className = "form-message success";
            formMsg.style.display = "block";
            
            regForm.reset();
            eventSelect.innerHTML = '<option value="" disabled selected>Please select a category first</option>';
            eventSelect.disabled = true;
            
            btn.innerText = "Submit Registration";
            icon.className = "fas fa-paper-plane";
            
            setTimeout(() => {
                formMsg.style.display = 'none';
            }, 6000);
        }, 1500);
    });

    // --- 7. FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            // Toggle current if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});
