const Footer = () => {
  const footer = document.querySelector('.footer');
  if (footer) {
    footer.innerHTML = `
      <div class="footer-content">
        <div class="footer-links">
          <a href="mailto:aji.prabandaru@gmail.com" class="footer-link" title="Email">
            <i data-lucide="mail" class="footer-icon"></i>
          </a>
          <a href="tel:+6281317569036" class="footer-link" title="Phone">
            <i data-lucide="phone" class="footer-icon"></i>
          </a>
          <a href="https://wa.me/6281317569036" target="_blank" rel="noopener noreferrer" class="footer-link" title="WhatsApp">
            <i data-lucide="message-circle" class="footer-icon"></i>
          </a>
          <span class="footer-divider"></span>
          <span class="footer-location">
            <i data-lucide="map-pin" class="footer-icon"></i>
            Tangerang Selatan, Indonesia
          </span>
          <span class="footer-divider"></span>
          <p class="footer-copy">&copy; 2025 Tri Aji Prabandaru</p>
        </div>
      </div>
    `;
  }
};

// Start footer when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', Footer);
} else {
  Footer();
}
