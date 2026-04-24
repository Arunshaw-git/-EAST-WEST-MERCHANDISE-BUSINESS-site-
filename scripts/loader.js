document.addEventListener("DOMContentLoaded", () => {
    const components = [
        { id: "header-container", url: "components/header.html" },
        { id: "hero-container", url: "components/hero.html" },
        { id: "services-container", url: "components/services.html" },
        { id: "about-container", url: "components/about.html" },
        { id: "portfolio-container", url: "components/portfolio.html" },
        { id: "cta-container", url: "components/cta.html" },
        { id: "footer-container", url: "components/footer.html" }
    ];

    const loadComponent = async (id, url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to load ${url}`);
            const html = await response.text();
            document.getElementById(id).innerHTML = html;
        } catch (error) {
            console.error(error);
        }
    };

    const initCarousel = () => {
        const slides = document.querySelectorAll('.carousel-slide');
        const heroTitle = document.getElementById('hero-title');
        const heroSubtitle = document.getElementById('hero-subtitle');
        const dots = document.querySelectorAll('.hero-dot');
        if (slides.length === 0 || !heroTitle || !heroSubtitle) return;

        const content = [
            {
                title: "FROM FITTING TO FABRICATION, <br />WE REALIZE YOUR VISION.",
                subtitle: "INTEGRATED SOLUTIONS FOR INTERIORS, STRUCTURAL WORK, AND MERCHANDISE."
            },
            {
                title: "EXQUISITE INTERIORS, <br />DESIGNED FOR EXCELLENCE.",
                subtitle: "CRAFTING SPACES THAT INSPIRE PRODUCTIVITY AND ELEGANCE."
            },
            {
                title: "BOLD BRANDING, <br />UNMISSABLE PRESENCE.",
                subtitle: "PREMIUM SIGNAGE SOLUTIONS THAT DEFINE YOUR CORPORATE IDENTITY."
            },
            {
                title: "ENGINEERING STRENGTH, <br />BUILDING THE FUTURE.",
                subtitle: "PRECISION METAL FABRICATION AND ROBUST STRUCTURAL SYSTEMS."
            },
            {
                title: "KITCHEN & <br />ELECTRIC SYSTEMS.",
                subtitle: "PREMIUM COMMERCIAL KITCHEN EQUIPMENTS AND INTEGRATED ELECTRICAL INFRASTRUCTURE."
            }
        ];

        let currentSlide = 0;
        let autoRotate;

        const updateDots = (index) => {
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('bg-white', 'border-white', 'active-dot');
                    dot.classList.remove('bg-transparent', 'border-white/60');
                } else {
                    dot.classList.remove('bg-white', 'border-white', 'active-dot');
                    dot.classList.add('bg-transparent', 'border-white/60');
                }
            });
        };

        const updateContent = (index) => {
            heroTitle.style.opacity = '0';
            heroSubtitle.style.opacity = '0';
            heroTitle.style.transform = 'translateY(20px)';

            setTimeout(() => {
                heroTitle.innerHTML = content[index].title;
                heroSubtitle.innerHTML = content[index].subtitle;
                heroTitle.style.opacity = '1';
                heroSubtitle.style.opacity = '0.9';
                heroTitle.style.transform = 'translateY(0)';
            }, 700);
        };

        const goToSlide = (index) => {
            if (index === currentSlide) return;
            slides[currentSlide].classList.remove('opacity-100');
            slides[currentSlide].classList.add('opacity-0');
            currentSlide = index;
            slides[currentSlide].classList.remove('opacity-0');
            slides[currentSlide].classList.add('opacity-100');
            updateContent(currentSlide);
            updateDots(currentSlide);
        };

        const nextSlide = () => {
            goToSlide((currentSlide + 1) % slides.length);
        };

        // Dot click handlers
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const target = parseInt(dot.getAttribute('data-slide'));
                goToSlide(target);
                // Reset auto-rotation timer
                clearInterval(autoRotate);
                autoRotate = setInterval(nextSlide, 5000);
            });
        });

        autoRotate = setInterval(nextSlide, 5000);
    };

    // Load all components then initialize scripts
    Promise.all(components.map(comp => loadComponent(comp.id, comp.url)))
        .then(() => {
            initCarousel();
        });
});
