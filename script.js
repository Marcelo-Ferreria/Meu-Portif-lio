document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    if (!link.rel.includes('noopener')) {
        link.rel = `${link.rel} noopener noreferrer`.trim();
    }
});
