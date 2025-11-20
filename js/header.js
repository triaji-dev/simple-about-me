const Header = () => {
  const header = document.createElement('header');
  if (header) {
    header.innerHTML = `
      <div class="header-content"> 
        <nav class="nav-links">
          <a href="/" class="nav-link">Home</a>
          <a href="/#download" class="nav-link">Architecture</a>
          <a href="portfolio.html" class="nav-link">Web Development</a>
        </nav>
      </div>
    `;
    document.body.insertBefore(header, document.body.firstChild);
  }
};

// Start header when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', Header);
} else {
  Header();
}
