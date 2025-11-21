const Footer = () => {
  const footer = document.querySelector('.footer');
  if (footer) {
    footer.innerHTML = `
      <div class="footer-content">
        <div class="contact-grid">
          <a href="mailto:aji.prabandaru@gmail.com" class="contact-item">
            <i data-lucide="mail" class="contact-icon"></i>
            <span class="contact-text">aji.prabandaru@gmail.com</span>
          </a>
          <a href="tel:+6281317569036" class="contact-item">
            <i data-lucide="phone" class="contact-icon"></i>
            <span class="contact-text">+62 813-1756-9036</span>
          </a>
          <a href="https://wa.me/6281317569036" target="_blank" rel="noopener noreferrer" class="contact-item">
            <i data-lucide="message-circle" class="contact-icon"></i>
            <span class="contact-text">WhatsApp</span>
          </a>
          <div class="contact-item">
            <i data-lucide="map-pin" class="contact-icon"></i>
            <span class="contact-text">Tangerang Selatan, Indonesia</span>
          </div>
        </div>
        <p class="footer-copy">&copy; 2025 Tri Aji Prabandaru</p>
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
