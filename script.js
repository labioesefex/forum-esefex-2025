// Adiciona classe active ao link da navegação atual
document.addEventListener('DOMContentLoaded', function() {
    // Lazy loading de imagens
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Menu mobile otimizado
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('show');
            body.classList.toggle('menu-open');
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('show');
                body.classList.remove('menu-open');
            }
        });
    }

    // Smooth scroll otimizado
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Fechar menu mobile após clicar
                if (navLinks.classList.contains('show')) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('show');
                    body.classList.remove('menu-open');
                }
            }
        });
    });

    // Animação de fade-in otimizada
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        fadeObserver.observe(el);
    });

    // Botão voltar ao topo
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Destacar link atual no menu
    const sections = document.querySelectorAll('section');
    const navLinksMenu = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinksMenu.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Adicionar classe para menu mobile
    const menuButton = document.createElement('button');
    menuButton.classList.add('menu-toggle');
    menuButton.innerHTML = '☰';
    document.querySelector('nav').prepend(menuButton);

    menuButton.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('show');
    });

    // Fechar menu ao clicar em um link (mobile)
    navLinksMenu.forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.remove('show');
        });
    });

    // Formulário de contato com validação melhorada
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validação básica
            if (!data.name || !data.email || !data.subject || !data.message) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            // Validação de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Por favor, insira um email válido.');
                return;
            }

            try {
                // Simulação de envio
                await new Promise(resolve => setTimeout(resolve, 1000));
                alert('Mensagem enviada com sucesso!');
                this.reset();
            } catch (error) {
                alert('Erro ao enviar mensagem. Por favor, tente novamente.');
            }
        });
    }

    // Galeria de fotos otimizada
    const galeriaItems = document.querySelectorAll('.galeria-item');
    const modal = document.createElement('div');
    modal.className = 'modal';
    document.body.appendChild(modal);

    galeriaItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const descricao = item.querySelector('.galeria-overlay p')?.textContent || '';
            
            modal.innerHTML = `
                <div class="modal-content">
                    <img src="${img.src}" alt="${img.alt}" loading="lazy">
                    <p>${descricao}</p>
                    <button class="modal-close" aria-label="Fechar">&times;</button>
                </div>
            `;
            
            modal.classList.add('show');
            body.style.overflow = 'hidden';
            
            const closeBtn = modal.querySelector('.modal-close');
            closeBtn.addEventListener('click', closeModal);
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });

            // Fechar com tecla ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    closeModal();
                }
            });
        });
    });

    function closeModal() {
        modal.classList.remove('show');
        body.style.overflow = '';
    }

    // Funções para a programação
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Adiciona efeito de hover com tooltip
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const time = this.querySelector('.time').textContent;
            const title = this.querySelector('strong')?.textContent || '';
            
            // Cria tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.innerHTML = `
                <div class="tooltip-content">
                    <strong>${time}</strong>
                    <p>${title}</p>
                </div>
            `;
            
            this.appendChild(tooltip);
        });
        
        item.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
    
    // Adiciona animação de scroll suave para links dos palestrantes
    document.querySelectorAll('.timeline-item a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Adiciona destaque temporário ao palestrante
                targetElement.classList.add('highlight');
                setTimeout(() => {
                    targetElement.classList.remove('highlight');
                }, 2000);
            }
        });
    });

    // Programação com melhor performance
    const diaHeaders = document.querySelectorAll('.dia-header');
    
    diaHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const diaProgramacao = this.closest('.dia-programacao');
            const content = diaProgramacao.querySelector('.dia-content');
            const icon = this.querySelector('.toggle-icon');
            
            // Toggle da classe collapsed no header
            this.classList.toggle('collapsed');
            
            // Toggle da classe active no conteúdo
            content.classList.toggle('active');
            
            // Ajuste do ícone
            if (content.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Seletor de período otimizado
    const periodoBtns = document.querySelectorAll('.periodo-btn');
    const periodos = document.querySelectorAll('.periodo');

    periodoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const periodo = btn.dataset.periodo;
            
            periodoBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            periodos.forEach(p => {
                p.style.display = p.id === periodo ? 'block' : 'none';
            });
        });
    });
});

// Função auxiliar para verificar se elemento está na viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===== Toggle Currículo Palestrantes =====
document.addEventListener('DOMContentLoaded', () => {
    const palestrantes = document.querySelectorAll('.palestrante');

    palestrantes.forEach(palestrante => {
        const infoElement = palestrante.querySelector('.palestrante-info');
        const curriculoElement = palestrante.querySelector('.palestrante-curriculo');

        if (infoElement && curriculoElement) {
            infoElement.addEventListener('click', () => {
                // Alterna a classe 'visible' no currículo
                curriculoElement.classList.toggle('visible');
                // Adiciona/remove uma classe no info para feedback visual (opcional)
                infoElement.classList.toggle('active');
            });
        }
    });
}); 