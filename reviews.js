/* Sharing is initiated by the visitor; this page never sends messages or reviews. */
(() => {
  const copyButton = document.querySelector('[data-copy-review-link]');
  const status = document.querySelector('#review-copy-status');
  copyButton?.addEventListener('click', async () => {
    const link = copyButton.dataset.copyReviewLink;
    try {
      await navigator.clipboard.writeText(link);
      status.textContent = 'Review page link copied. You can share it in your preferred app.';
    } catch {
      status.textContent = 'Copy this link to share: ' + link;
    }
  });
  document.querySelector('[data-print-review-card]')?.addEventListener('click', () => window.print());
})();
