// Adiciona classe active ao link da navegação atual
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('show');
            document.body.classList.toggle('menu-open');
        });
    }

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('show');
            document.body.classList.remove('menu-open');
        });
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

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação de fade-in para elementos quando entram na viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elementos para animar - NÃO definir opacidade 0 aqui
    document.querySelectorAll('.content-box, .hero, .section').forEach(el => {
        // Adiciona a classe fade-in imediatamente para garantir que o conteúdo seja visível
        el.classList.add('fade-in');
        observer.observe(el);
    });

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

    // Formulário de contato
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aqui você pode adicionar a lógica para enviar o formulário
            // Por exemplo, usando fetch para enviar para um backend
            
            // Exemplo de validação básica
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name && email && subject && message) {
                // Simulação de envio
                alert('Mensagem enviada com sucesso!');
                contactForm.reset();
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }

    // Galeria de fotos
    const galeriaItems = document.querySelectorAll('.galeria-item');
    const modal = document.createElement('div');
    modal.className = 'modal';
    document.body.appendChild(modal);

    galeriaItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const descricao = item.querySelector('.galeria-overlay p').textContent;
            
            modal.innerHTML = `
                <div class="modal-content">
                    <img src="${img.src}" alt="${img.alt}">
                    <p>${descricao}</p>
                    <button class="modal-close">&times;</button>
                </div>
            `;
            
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            const closeBtn = modal.querySelector('.modal-close');
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                    document.body.style.overflow = '';
                }
            });
        });
    });

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

    // Controle dos dias da programação
    const diaHeaders = document.querySelectorAll('.dia-header');
    
    diaHeaders.forEach(header => {
        header.addEventListener('click', function() {
            console.log('Clicou no cabeçalho do dia');
            const diaProgramacao = this.closest('.dia-programacao');
            const content = diaProgramacao.querySelector('.dia-content');
            const icon = this.querySelector('.toggle-icon');
            
            // Toggle da classe collapsed no header
            this.classList.toggle('collapsed');
            
            // Toggle da classe active no content
            content.classList.toggle('active');
            
            // Atualiza o ícone
            if (this.classList.contains('collapsed')) {
                icon.textContent = '▼';
            } else {
                icon.textContent = '▲';
            }
            
            console.log('Estado do conteúdo:', content.classList.contains('active') ? 'Ativo' : 'Inativo');
        });
    });

    // Expande o primeiro dia por padrão
    const primeiroDia = document.querySelector('.dia-programacao');
    if (primeiroDia) {
        const header = primeiroDia.querySelector('.dia-header');
        const content = primeiroDia.querySelector('.dia-content');
        const icon = header.querySelector('.toggle-icon');
        
        header.classList.remove('collapsed');
        content.classList.add('active');
        icon.textContent = '▲';
    }

    // Controle dos botões de período
    const manhaBtn = document.querySelector('[data-periodo="manha"]');
    const tardeBtn = document.querySelector('[data-periodo="tarde"]');
    const manhaContent = document.getElementById('manha');
    const tardeContent = document.getElementById('tarde');

    function switchPeriodo(periodo) {
        if (periodo === 'manha') {
            manhaBtn.classList.add('active');
            tardeBtn.classList.remove('active');
            manhaContent.style.display = 'block';
            tardeContent.style.display = 'none';
        } else {
            tardeBtn.classList.add('active');
            manhaBtn.classList.remove('active');
            tardeContent.style.display = 'block';
            manhaContent.style.display = 'none';
        }
    }

    manhaBtn.addEventListener('click', () => switchPeriodo('manha'));
    tardeBtn.addEventListener('click', () => switchPeriodo('tarde'));

    // Inicializar com o período da manhã
    switchPeriodo('manha');
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