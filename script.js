const SAFE_EXTERNAL_PROTOCOLS = new Set(['http:', 'https:', 'mailto:']);

const applySafeLinkAttributes = (link) => {
    if (!link || !link.href) {
        return;
    }

    try {
        const url = new URL(link.href, window.location.href);
        const isAllowed = SAFE_EXTERNAL_PROTOCOLS.has(url.protocol);

        if (!isAllowed) {
            link.addEventListener('click', (event) => event.preventDefault(), { once: true });
            return;
        }

        const relTokens = new Set((link.rel || '').split(/\s+/).filter(Boolean));
        ['noopener', 'noreferrer'].forEach((token) => relTokens.add(token));
        link.rel = Array.from(relTokens).join(' ');
        link.referrerPolicy = 'no-referrer';
    } catch {
        link.addEventListener('click', (event) => event.preventDefault(), { once: true });
    }
};

document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    applySafeLinkAttributes(link);
});

document.querySelectorAll('a[href^="http"], a[href^="https"], a[href^="mailto:"]').forEach((link) => {
    applySafeLinkAttributes(link);
});

document.body.classList.add('js-enabled');

const revealSelectors = [
    '.hero-grid',
    '.section-head',
    '.card',
    '.galeria .item',
    '.skills-grid .skill',
    '.contact-list .contact-item',
    '.footer-wrap'
];

const revealTargets = document.querySelectorAll(revealSelectors.join(', '));

revealTargets.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${Math.min(index * 30, 150)}ms`);
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.18,
    rootMargin: '0px 0px -8% 0px'
});

revealTargets.forEach((element) => {
    revealObserver.observe(element);
});

const contactOverlay = document.createElement('div');
contactOverlay.className = 'contact-overlay';
contactOverlay.innerHTML = `
    <div class="contact-message-card" role="dialog" aria-modal="true" aria-labelledby="contact-card-title">
        <button class="contact-close" type="button" aria-label="Fechar">×</button>
        <h3 id="contact-card-title" class="contact-card-title"></h3>
        <p class="contact-card-text"></p>
        <div class="contact-card-actions"></div>
    </div>
`;

document.body.appendChild(contactOverlay);

const closeContactCard = () => {
    contactOverlay.classList.remove('is-open');
};

const openContactCard = (title, text, actions) => {
    contactOverlay.querySelector('.contact-card-title').textContent = title;
    contactOverlay.querySelector('.contact-card-text').textContent = text;

    const actionsContainer = contactOverlay.querySelector('.contact-card-actions');
    actionsContainer.innerHTML = '';

    actions.forEach((action) => {
        const actionLink = document.createElement('a');
        actionLink.className = 'botao botao-secundario';
        actionLink.href = action.href;
        actionLink.textContent = action.label;

        if (action.target) {
            actionLink.target = action.target;
            actionLink.rel = 'noopener noreferrer';
        }

        actionsContainer.appendChild(actionLink);
    });

    contactOverlay.classList.add('is-open');
};

contactOverlay.querySelector('.contact-close').addEventListener('click', closeContactCard);

contactOverlay.addEventListener('click', (event) => {
    if (event.target === contactOverlay) {
        closeContactCard();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeContactCard();
    }
});

document.querySelectorAll('.contact-email').forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        openContactCard(
            'E-mail para contato',
            'Olá ! Meu email é: mmmarcelinho11@gmail.com entre em contato comigo por ele para conversarmos!',
            [
                { label: 'Enviar e-mail', href: 'mailto:mmmarcelinho11@gmail.com' }
            ]
        );
    });
});

document.querySelectorAll('.contact-phone').forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        openContactCard(
            'Telefone para contato',
            'Olá! Meu número de telefone é (79)996483500 mas se quiser o link para o WhatsApp clique em uma das opções abaixo para entrar em contato comigo e conversar.',
            [
                { label: 'Abrir WhatsApp', href: 'https://wa.me/qr/LWEGLQOJRSAME1', target: '_blank' }
            ]
        );
    });
});
