document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    if (!link.rel.includes('noopener')) {
        link.rel = `${link.rel} noopener noreferrer`.trim();
    }
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
