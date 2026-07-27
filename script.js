// JavaScript Logic for Ayntharasan I Portfolio

document.addEventListener('DOMContentLoaded', () => {
    initCursorGlow();
    initThemeToggle();
    initTerminal();
    initStackFilters();
    initCommandPalette();
    initCounterObserver();
    initModals();
});

/* ==========================================================================
   1. AMBIENT CURSOR GLOW
   ========================================================================== */
function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow) return;

    window.addEventListener('mousemove', (e) => {
        glow.style.setProperty('--mouse-x', `${e.clientX}px`);
        glow.style.setProperty('--mouse-y', `${e.clientY}px`);
    });
}

/* ==========================================================================
   2. DARK / LIGHT THEME TOGGLE
   ========================================================================== */
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const htmlEl = document.documentElement;

    const storedTheme = localStorage.getItem('ayntharasan-portfolio-theme') || 'dark';
    setTheme(storedTheme);

    themeBtn?.addEventListener('click', () => {
        const currentTheme = htmlEl.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        if (theme === 'dark') {
            htmlEl.classList.add('dark');
            htmlEl.classList.remove('light');
            sunIcon?.classList.remove('hidden');
            moonIcon?.classList.add('hidden');
        } else {
            htmlEl.classList.add('light');
            htmlEl.classList.remove('dark');
            sunIcon?.classList.add('hidden');
            moonIcon?.classList.remove('hidden');
        }
        localStorage.setItem('ayntharasan-portfolio-theme', theme);
    }
}

/* ==========================================================================
   3. INTERACTIVE TERMINAL SHELL WITH AUTO-TYPE DEMO
   ========================================================================== */
function initTerminal() {
    const form = document.getElementById('terminal-form');
    const input = document.getElementById('terminal-input');
    const outputContainer = document.getElementById('terminal-output-container');
    const terminalLog = document.getElementById('terminal-log');
    const terminalBox = document.getElementById('terminal-box');

    // Focus input on clicking anywhere in terminal box
    terminalBox?.addEventListener('click', () => {
        input?.focus();
    });

    const commands = {
        'help': `Available commands:
  • <span class="text-accent">whoami</span>          - Print bio & career summary
  • <span class="text-accent">skills</span>          - List Python, Django, REST API, & database skills
  • <span class="text-accent">projects</span>        - View backend projects (Book System, Attendance, E-Commerce API)
  • <span class="text-accent">internship</span>      - View Codveda Python Internship details
  • <span class="text-accent">education</span>       - Show degree (B.Tech IT - 75%), HSC (81%), & SSLC details
  • <span class="text-accent">certifications</span>  - Show Python Intern certification
  • <span class="text-accent">contact</span>         - Display email, phone & social handles
  • <span class="text-accent">theme</span>           - Toggle dark & light mode
  • <span class="text-accent">clear</span>           - Clear terminal output
  • <span class="text-accent">sudo</span>            - Admin privileges? Try it!`,

        'whoami': `<strong class="text-foreground">Ayntharasan I</strong> — Backend Developer with a B.Tech degree in Information Technology from University College Of Engineering Villupuram (75%).
Specialized in Python, Django, Django REST Framework, REST APIs, MySQL, and MongoDB.`,

        'about': `<strong class="text-foreground">Ayntharasan I</strong> — Backend Developer with a B.Tech degree in Information Technology from University College Of Engineering Villupuram (75%).
Specialized in Python, Django, Django REST Framework, REST APIs, MySQL, and MongoDB.`,

        'skills': `<strong class="text-foreground">Technical Skill Set:</strong>
  • <span class="text-accent">Programming:</span> Python, JavaScript (Basic)
  • <span class="text-accent">Backend:</span> Django, Django REST Framework (DRF), REST APIs
  • <span class="text-accent">Frontend Basics:</span> HTML5, CSS3, Bootstrap
  • <span class="text-accent">Databases:</span> MySQL, MongoDB
  • <span class="text-accent">Tools & Platforms:</span> Git, GitHub, VS Code, Postman`,

        'tools': `<strong class="text-foreground">Technical Skill Set:</strong>
  • <span class="text-accent">Programming:</span> Python, JavaScript (Basic)
  • <span class="text-accent">Backend:</span> Django, Django REST Framework (DRF), REST APIs
  • <span class="text-accent">Frontend Basics:</span> HTML5, CSS3, Bootstrap
  • <span class="text-accent">Databases:</span> MySQL, MongoDB
  • <span class="text-accent">Tools & Platforms:</span> Git, GitHub, VS Code, Postman`,

        'projects': `<strong class="text-foreground">Featured Projects:</strong>
  1. <span class="text-accent font-bold">Book Management System</span>
     Django & DRF API with CRUD operations, JWT authentication, image upload & pagination.
  2. <span class="text-accent font-bold">Student Attendance Management System</span>
     Django, MySQL & Bootstrap tracker with role-based admin/teacher access & CSV export.
  3. <span class="text-accent font-bold">E-Commerce Backend API</span>
     Scalable Django REST Framework API with JWT auth, cart system, order workflows & query optimization.`,

        'internship': `<strong class="text-foreground">Internship Experience:</strong>
  • <span class="text-accent font-bold">Python Intern @ Codveda</span>
    Worked with Python fundamentals, algorithmic exercises, OOP application logic, and development workflows.`,

        'education': `<strong class="text-foreground">Education Details:</strong>
  • <span class="text-accent font-bold">B.Tech Information Technology (2023–2027)</span>
    University College Of Engineering Villupuram (Score: 75%)
  • <span class="text-accent font-bold">HSC (2022–2023)</span>
    Gandhi Memorial Higher Sec School, Thiruvennainallur (Score: 81%)
  • <span class="text-accent font-bold">SSLC (2020–2021)</span>
    Bonne Nehru Higher Sec School, Thiruvennainallur`,

        'certifications': `<strong class="text-foreground">Certifications & Training:</strong>
  1. <span class="text-accent font-bold">Python Intern Certification</span> — Codveda`,

        'certs': `<strong class="text-foreground">Certifications & Training:</strong>
  1. <span class="text-accent font-bold">Python Intern Certification</span> — Codveda`,

        'contact': `<strong class="text-foreground">Contact & Social Links:</strong>
  • <span class="text-accent">Email:</span> ayntharasana2003@gmail.com
  • <span class="text-accent">Phone:</span> +91 8754681979
  • <span class="text-accent">Location:</span> Villupuram, Tamil Nadu
  • <span class="text-accent">GitHub:</span> github.com/ayntharasan
  • <span class="text-accent">LinkedIn:</span> linkedin.com/in/ayntharasan`,

        'sudo': `<span class="text-rose-400">Permission denied:</span> Nice try! You are not in the sudoers file. This incident will be reported to Ayntharasan. 😉`,

        'socials': `GitHub: github.com/ayntharasan
LinkedIn: linkedin.com/in/ayntharasan`
    };

    function runCmd(rawCmd) {
        if (!rawCmd) return;
        const cmd = rawCmd.trim().toLowerCase();
        
        const cmdEntry = document.createElement('div');
        cmdEntry.className = 'mt-2 text-foreground';
        cmdEntry.innerHTML = `<span class="text-accent font-bold">visitor@ayntharasan.dev:~$</span> ${escapeHTML(rawCmd)}`;
        outputContainer.appendChild(cmdEntry);

        if (cmd === 'clear' || cmd === 'cls') {
            outputContainer.innerHTML = '';
        } else if (cmd === 'theme') {
            document.getElementById('theme-toggle-btn')?.click();
            const output = document.createElement('div');
            output.className = 'text-accent mt-1';
            output.textContent = `Theme switched successfully.`;
            outputContainer.appendChild(output);
        } else if (commands[cmd]) {
            const output = document.createElement('div');
            output.className = 'text-foreground-muted mt-1 whitespace-pre-wrap';
            output.innerHTML = commands[cmd];
            outputContainer.appendChild(output);
        } else {
            const output = document.createElement('div');
            output.className = 'text-rose-400 mt-1';
            output.innerHTML = `command not found: <span class="font-bold">${escapeHTML(rawCmd)}</span>. Type <span class="text-accent font-bold">'help'</span> for available commands.`;
            outputContainer.appendChild(output);
        }

        if (input) input.value = '';
        if (terminalLog) terminalLog.scrollTop = terminalLog.scrollHeight;
    }

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        runCmd(input.value);
    });

    document.querySelectorAll('.term-quick-cmd').forEach(btn => {
        btn.addEventListener('click', () => {
            runCmd(btn.textContent);
        });
    });

    // Auto-Type Welcome Demo
    setTimeout(() => {
        if (input && input.value === '') {
            const demoCmd = 'whoami';
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < demoCmd.length) {
                    input.value += demoCmd.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                    setTimeout(() => {
                        if (input.value === 'whoami') {
                            runCmd('whoami');
                        }
                    }, 600);
                }
            }, 120);
        }
    }, 1000);

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
}

/* ==========================================================================
   4. TECH STACK FILTERING
   ========================================================================== */
function initStackFilters() {
    const filterBtns = document.querySelectorAll('.stack-filter-btn');
    const stackCards = document.querySelectorAll('.stack-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');

            filterBtns.forEach(b => {
                b.classList.remove('active-filter', 'border-accent', 'bg-accent/10', 'text-accent', 'font-semibold');
                b.classList.add('border-border', 'bg-surface', 'text-foreground-muted');
            });

            btn.classList.add('active-filter', 'border-accent', 'bg-accent/10', 'text-accent', 'font-semibold');
            btn.classList.remove('border-border', 'bg-surface', 'text-foreground-muted');

            stackCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat === category) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

/* ==========================================================================
   5. COMMAND PALETTE (⌘K / CTRL+K)
   ========================================================================== */
function initCommandPalette() {
    const cmdBtn = document.getElementById('cmd-palette-btn');
    const modal = document.getElementById('cmd-modal');
    const closeBtn = document.getElementById('cmd-close-btn');
    const input = document.getElementById('cmd-input');
    const list = document.getElementById('cmd-list');

    const options = [
        { label: 'Go to Home', section: '#home', type: 'Navigation' },
        { label: 'Go to About Me', section: '#about', type: 'Navigation' },
        { label: 'Go to Tech Stack', section: '#stack', type: 'Navigation' },
        { label: 'Go to Featured Projects', section: '#projects', type: 'Navigation' },
        { label: 'Go to Internship Experience', section: '#experience', type: 'Navigation' },
        { label: 'Go to Education', section: '#education', type: 'Navigation' },
        { label: 'Go to Certifications', section: '#certifications', type: 'Navigation' },
        { label: 'Go to Contact', section: '#contact', type: 'Navigation' },
        { label: 'Visit GitHub Profile', url: 'https://github.com/ayntharasan', type: 'Social' },
        { label: 'Visit LinkedIn Profile', url: 'https://linkedin.com/in/ayntharasan', type: 'Social' },
        { label: 'Send Email to Ayntharasan I', url: 'mailto:ayntharasana2003@gmail.com', type: 'Contact' }
    ];

    window.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            openModal();
        }
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    cmdBtn?.addEventListener('click', openModal);
    closeBtn?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    function openModal() {
        modal?.classList.remove('hidden');
        modal?.classList.add('flex');
        input?.focus();
        renderList('');
    }

    function closeModal() {
        modal?.classList.add('hidden');
        modal?.classList.remove('flex');
        if (input) input.value = '';
    }

    input?.addEventListener('input', (e) => {
        renderList(e.target.value.toLowerCase());
    });

    function renderList(query) {
        if (!list) return;
        list.innerHTML = '';

        const filtered = options.filter(opt => opt.label.toLowerCase().includes(query));

        if (filtered.length === 0) {
            list.innerHTML = `<div class="p-3 text-center text-foreground-muted">No matching results found.</div>`;
            return;
        }

        filtered.forEach(opt => {
            const item = document.createElement('button');
            item.type = 'button';
            item.className = 'w-full flex items-center justify-between p-3 rounded hover:bg-background/80 hover:text-accent text-foreground text-left transition-colors font-mono text-xs cursor-pointer';
            item.innerHTML = `
                <span>${opt.label}</span>
                <span class="text-[10px] text-foreground-muted uppercase border border-border px-1.5 py-0.5 rounded">${opt.type}</span>
            `;

            item.addEventListener('click', () => {
                closeModal();
                if (opt.section) {
                    document.querySelector(opt.section)?.scrollIntoView({ behavior: 'smooth' });
                } else if (opt.url) {
                    window.open(opt.url, '_blank');
                }
            });

            list.appendChild(item);
        });
    }
}

/* ==========================================================================
   6. STAT COUNTERS ANIMATION
   ========================================================================== */
function initCounterObserver() {
    const counters = document.querySelectorAll('.counter');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target') || '0', 10);
                    let count = 0;
                    const speed = Math.max(1, Math.floor(target / 20));

                    const updateCount = () => {
                        count += speed;
                        if (count < target) {
                            counter.innerText = count;
                            setTimeout(updateCount, 40);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
            }
        });
    }, { threshold: 0.5 });

    const aboutSection = document.getElementById('about');
    if (aboutSection) observer.observe(aboutSection);
}

/* ==========================================================================
   7. MODALS MANAGEMENT & CONTACT FORM
   ========================================================================== */
function initModals() {
    // Story Modal
    const storyTrigger = document.getElementById('story-modal-trigger');
    const storyModal = document.getElementById('story-modal');
    const storyClose = document.getElementById('story-close-btn');

    storyTrigger?.addEventListener('click', () => {
        storyModal?.classList.remove('hidden');
        storyModal?.classList.add('flex');
    });

    storyClose?.addEventListener('click', () => {
        storyModal?.classList.add('hidden');
        storyModal?.classList.remove('flex');
    });

    storyModal?.addEventListener('click', (e) => {
        if (e.target === storyModal) {
            storyModal.classList.add('hidden');
            storyModal.classList.remove('flex');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuBtn?.addEventListener('click', () => {
        mobileMenu?.classList.toggle('hidden');
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu?.classList.add('hidden');
        });
    });

    // Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    const contactStatus = document.getElementById('contact-status');

    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (contactStatus) {
            contactStatus.textContent = '✓ Message prepared! Opening email client...';
            contactStatus.classList.remove('hidden');
            
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const msg = document.getElementById('contact-message').value;

            setTimeout(() => {
                window.location.href = `mailto:ayntharasana2003@gmail.com?subject=Portfolio%20Contact%20from%20${encodeURIComponent(name)}&body=From:%20${encodeURIComponent(name)}%20(${encodeURIComponent(email)})%0A%0A${encodeURIComponent(msg)}`;
                contactForm.reset();
            }, 600);
        }
    });
}
