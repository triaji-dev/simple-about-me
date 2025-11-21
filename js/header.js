const Header = () => {
  const header = document.createElement('header');
  if (header) {
    header.innerHTML = `
      <div class="header-content"> 
        <nav class="nav-links">
          <a href="/" class="nav-link">
            <i data-lucide="home"></i>
            <span class="adjust-link">Home</span>
          </a>
          <a href="/#download" class="nav-link">
            <i data-lucide="building-2"></i>
            <span class="adjust-link">Architecture</span>
          </a>
          <a href="portfolio.html" class="nav-link">
            <i data-lucide="code-2"></i>
            <span class="adjust-link">Web Dev</span>
          </a>
        </nav>
      </div>
    `;
    document.body.insertBefore(header, document.body.firstChild);
    
    // Initialize Lucide icons for the header
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
};

// Start header when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', Header);
} else {
  Header();
}
