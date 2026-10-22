/* Progressive enhancement: original photograph links and native video controls remain usable. */
(() => {
  const photoLinks = [...document.querySelectorAll('a[data-gallery-photo], #wildlife-photo-grid a')];
  if (photoLinks.length && typeof HTMLDialogElement !== 'undefined') {
    const dialog = document.createElement('dialog');
    dialog.className = 'media-lightbox';
    dialog.setAttribute('aria-labelledby', 'media-lightbox-title');
    dialog.innerHTML = '<h2 id="media-lightbox-title" class="media-sr-only">Travel photograph</h2><div class="media-lightbox-toolbar"><span data-photo-count></span><button type="button" data-photo-close aria-label="Close photograph">Close ×</button></div><figure><img alt=""><figcaption aria-live="polite"></figcaption></figure><div class="media-lightbox-navigation"><button type="button" data-photo-previous aria-label="Previous photograph">← Previous</button><a data-photo-original target="_blank" rel="noopener">Open original ↗</a><button type="button" data-photo-next aria-label="Next photograph">Next →</button></div>';
    document.body.appendChild(dialog);
    const photo = dialog.querySelector('img');
    const caption = dialog.querySelector('figcaption');
    const close = dialog.querySelector('[data-photo-close]');
    let current = 0;
    let activePhotos = [];
    let returnFocus;
    function showPhoto(index) {
      current = (index + activePhotos.length) % activePhotos.length;
      const link = activePhotos[current];
      const description = link.querySelector('img')?.alt || 'Augur travel photograph';
      photo.src = link.href;
      photo.alt = description;
      caption.textContent = description;
      dialog.querySelector('[data-photo-count]').textContent = `${current + 1} / ${activePhotos.length}`;
      dialog.querySelector('[data-photo-original]').href = link.href;
    }
    for (const link of photoLinks) {
      link.addEventListener('click', event => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        activePhotos = photoLinks.filter(item => item.getClientRects().length > 0);
        returnFocus = link;
        showPhoto(activePhotos.indexOf(link));
        dialog.showModal();
        close.focus();
      });
    }
    close.addEventListener('click', () => dialog.close());
    dialog.querySelector('[data-photo-previous]').addEventListener('click', () => showPhoto(current - 1));
    dialog.querySelector('[data-photo-next]').addEventListener('click', () => showPhoto(current + 1));
    dialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        showPhoto(current + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => returnFocus?.focus({preventScroll: true}));
  }

  // Motion is silent, on screen only, and optional. Pausing a video manually is respected.
  const section = document.querySelector('.journey-videos');
  if (!section) return;
  const videos = [...section.querySelectorAll('video[data-preview-video]')];
  const toggle = section.querySelector('[data-video-toggle]');
  if (!('IntersectionObserver' in window) || !toggle) return;
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let enabled = !motionPreference.matches && !navigator.connection?.saveData;
  const visible = new Map();
  const pausedByVisitor = new WeakSet();
  const pausedByPage = new WeakSet();
  function pause(video) {
    if (!video.paused) {
      pausedByPage.add(video);
      video.pause();
    }
  }
  function updatePlayback() {
    for (const video of videos) {
      if (enabled && !document.hidden && visible.get(video) && !pausedByVisitor.has(video)) {
        video.play().catch(() => { /* The browser may require a click on native Play. */ });
      } else if (!visible.get(video) || document.hidden) {
        pause(video);
      }
    }
  }
  function updateToggle() {
    toggle.textContent = enabled ? 'Pause previews' : 'Play muted previews';
    toggle.setAttribute('aria-pressed', String(enabled));
  }
  for (const video of videos) {
    video.muted = true;
    video.addEventListener('pause', () => {
      if (pausedByPage.has(video)) pausedByPage.delete(video);
      else pausedByVisitor.add(video);
    });
    video.addEventListener('play', () => pausedByVisitor.delete(video));
  }
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) visible.set(entry.target, entry.isIntersecting && entry.intersectionRatio >= .5);
    updatePlayback();
  }, {threshold: [0, .5]});
  videos.forEach(video => observer.observe(video));
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    enabled = !enabled;
    if (!enabled) videos.forEach(pause);
    if (enabled) videos.forEach(video => { video.muted = true; pausedByVisitor.delete(video); });
    updateToggle();
    updatePlayback();
  });
  motionPreference.addEventListener('change', event => {
    if (event.matches) { enabled = false; videos.forEach(pause); updateToggle(); }
  });
  document.addEventListener('visibilitychange', updatePlayback);
  window.addEventListener('pagehide', () => videos.forEach(pause));
  updateToggle();
})();
