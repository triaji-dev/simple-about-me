// Fungsi untuk memuat data dari portfolio.json
async function loadPortfolioData() {
  try {
    const response = await fetch('portfolio.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Gagal memuat data portofolio:", error);
    // Kembalikan array kosong jika gagal memuat
    return []; 
  }
}

// Intersection Observer for scroll animations
if ('IntersectionObserver' in window) {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
} else {
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.classList.add('animate-in');
  });
}

// Initialize Lucide icons
lucide.createIcons();

// --- Grid Rendering Logic for Portfolio Page ---
document.addEventListener('DOMContentLoaded', async () => {
  const gridContainer = document.getElementById('full-portfolio-grid');
  
  // Memuat semua data
  const portfolioData = await loadPortfolioData();

  /**
   * Renders ALL portfolio items into the grid container.
   * @param {Array} data - Array of ALL portfolio objects.
   */
  function renderItems(data) {
    gridContainer.innerHTML = ''; // Clear existing content
    
    if (data.length === 0) {
      gridContainer.innerHTML = '<p class="description text-center">Data portofolio belum tersedia.</p>';
      return;
    }

    // Pastikan kelas grid yang sesuai sudah ada
    if (!gridContainer.classList.contains('portfolio-grid')) {
      gridContainer.classList.add('portfolio-grid');
    }
    
    data.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'grid-item'; 
      
      // Build icon links HTML - only show if links exist
      let iconLinksHtml = '';
      const hasLinks = item.vercelUrl || item.gitHubUrl;
      
      if (hasLinks) {
        iconLinksHtml = '<div class="portfolio-links">';
        
        // Only add Vercel icon if vercelUrl exists
        if (item.vercelUrl) {
          iconLinksHtml += `
            <a href="${item.vercelUrl}" class="portfolio-link-icon" target="_blank" rel="noopener noreferrer" title="View on Vercel" onclick="event.stopPropagation()">
              <i data-lucide="external-link" class="icon-sm"></i>
            </a>
          `;
        }
        
        // Only add GitHub icon if gitHubUrl exists
        if (item.gitHubUrl) {
          iconLinksHtml += `
            <a href="${item.gitHubUrl}" class="portfolio-link-icon" target="_blank" rel="noopener noreferrer" title="View on GitHub" onclick="event.stopPropagation()">
              <i data-lucide="github" class="icon-sm"></i>
            </a>
          `;
        }
        
        iconLinksHtml += '</div>';
      }
      
      // Card structure without link on thumbnail
      itemElement.innerHTML = `
        <div class="portfolio-card">
          <div class="portfolio-image-container">
            <img 
              src="${item.imageUrl}" 
              alt="Thumbnail of ${item.title}" 
              class="portfolio-image"
              loading="lazy"
              onerror="this.onerror=null; this.src='https://placehold.co/400x225/333333/ffffff?text=${encodeURIComponent(item.title.replace(/\s/g, '+'))}'"
            />
            ${iconLinksHtml}
          </div>
          <div class="portfolio-caption">
            ${item.title}
          </div>
        </div>
      `;
      gridContainer.appendChild(itemElement);
    });
    
    // Re-initialize Lucide icons for dynamically added content
    lucide.createIcons();
  }
  
  // 1. Initial Render: Render SEMUA item
  renderItems(portfolioData); 
});