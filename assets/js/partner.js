(() => {
    const gallery = document.querySelector('.partner-gallery');
    const viewport = gallery.querySelector('.partner-gallery-window');
    const row = gallery.querySelector('.partner-gallery-row');
    const track = row.parentElement;
    const preview = document.querySelector('.partner-photo-preview');
    const photo = preview.querySelector('img');

    const copy = row.cloneNode(true);
    copy.setAttribute('aria-hidden', 'true');
    copy.querySelectorAll('a').forEach((link) => { link.tabIndex = -1; });

    const resize = new ResizeObserver(() => {
        const rowWidth = row.getBoundingClientRect().width;
        if (!rowWidth) return;

        const rowCount = 1 + Math.ceil(viewport.clientWidth / rowWidth);
        while (track.children.length < rowCount) track.append(copy.cloneNode(true));
        while (track.children.length > rowCount) track.lastElementChild.remove();
        track.style.setProperty('--partner-scroll-distance', `${-rowWidth}px`);
        viewport.classList.add('is-playing');
    });
    resize.observe(row);
    resize.observe(viewport);

    gallery.addEventListener('click', (event) => {
        const link = event.target.closest('.partner-gallery-row a');
        if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

        event.preventDefault();
        photo.src = link.href;
        photo.alt = link.querySelector('img').alt;
        gallery.classList.add('is-previewing');
        preview.showModal();
    });

    preview.addEventListener('click', (event) => {
        if (event.target === preview || event.target.closest('button')) preview.close();
    });

    preview.addEventListener('close', () => gallery.classList.remove('is-previewing'));
})();
