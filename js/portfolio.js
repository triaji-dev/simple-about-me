// Function to load portfolio data from JSON file
async function loadPortfolioData() {
  try {
    const response = await fetch('portfolio.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Gagal memuat data portofolio:', error);
    return [];
  }
}

// Intersection Observer for scroll animations
if ('IntersectionObserver' in window) {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver(entries => {
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
  const selectedGridContainer = document.getElementById(
    'selected-portfolio-grid'
  );
  const loadingSpinner = document.getElementById('loading-spinner');

  // Show loading spinner
  if (loadingSpinner) {
    loadingSpinner.style.display = 'flex';
  }

  // Track loading start time
  const startTime = Date.now();

  // Memuat semua data
  const portfolioData = await loadPortfolioData();

  /**
   * Renders portfolio items into a specific grid container.
   * @param {Array} data - Array of portfolio objects to render.
   * @param {HTMLElement} container - The container element to render into.
   */
  function renderItems(data, container) {
    container.innerHTML = ''; // Clear existing content

    if (data.length === 0) {
      container.innerHTML =
        '<p class="description text-center">Data portofolio belum tersedia.</p>';
      return;
    }

    // Pastikan kelas grid yang sesuai sudah ada
    if (!container.classList.contains('portfolio-grid')) {
      container.classList.add('portfolio-grid');
    }

    data.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'grid-item';

      // Build icon links HTML - only show if links exist
      let iconLinksHtml = '';
      const hasLinks = item.vercelUrl || item.gitHubUrl || item.youtubeUrl;

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

        if (item.youtubeUrl) {
          iconLinksHtml += `
            <button class="portfolio-link-icon" title="Watch on YouTube" onclick="event.stopPropagation(); openVideoModal('${
              item.youtubeUrl
            }', '${item.title.replace(/'/g, "\\'")}');">
              <i data-lucide="youtube" class="icon-sm"></i>
            </button>
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
              onerror="this.onerror=null; this.src='https://placehold.co/400x225/333333/ffffff?text=${encodeURIComponent(
                item.title.replace(/\s/g, '+')
              )}'"
            />
            ${iconLinksHtml}
          </div>
          <div class="portfolio-caption">
            ${item.title}
          </div>
        </div>
      `;
      container.appendChild(itemElement);
    });

    // Re-initialize Lucide icons for dynamically added content
    lucide.createIcons();
  }

  // 1. Render Selected Projects
  if (selectedGridContainer) {
    const selectedProjects = portfolioData.filter(
      item => item.selected === true
    );
    renderItems(selectedProjects, selectedGridContainer);
  }

  // 2. Render All Projects
  if (gridContainer) {
    renderItems(portfolioData, gridContainer);
  }

  // Calculate minimum loading time (1000ms)
  const elapsedTime = Date.now() - startTime;
  const remainingTime = Math.max(1000 - elapsedTime, 0);

  // Wait for remaining time to ensure minimum loading display
  await new Promise(resolve => setTimeout(resolve, remainingTime));

  // Hide loading spinner after all data is loaded
  if (loadingSpinner) {
    loadingSpinner.style.display = 'none';
  }
});

// Modal Video Functions
function openVideoModal(youtubeUrl, title) {
  // Extract video ID from YouTube URL
  let videoId = '';

  // Handle different YouTube URL formats
  if (youtubeUrl.includes('youtu.be/')) {
    videoId = youtubeUrl.split('youtu.be/')[1].split('?')[0];
  } else if (youtubeUrl.includes('youtube.com/watch')) {
    videoId = youtubeUrl.split('v=')[1].split('&')[0];
  } else if (youtubeUrl.includes('youtube.com/embed/')) {
    videoId = youtubeUrl.split('embed/')[1].split('?')[0];
  }

  if (!videoId) {
    console.error('Invalid YouTube URL');
    return;
  }

  // Create modal if it doesn't exist
  let modal = document.getElementById('video-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'video-modal';
    modal.className = 'video-modal';
    modal.innerHTML = `
      <div class="video-modal-overlay" onclick="closeVideoModal()"></div>
      <div class="video-modal-content">
        <button class="video-modal-close" onclick="closeVideoModal()" aria-label="Close video">
          <i data-lucide="x" class="icon-close"></i>
        </button>
        <div class="video-modal-title"></div>
        <div class="video-container"></div>
      </div>
    `;
    document.body.appendChild(modal);
    lucide.createIcons();
  }

  // Set title and iframe
  const modalTitle = modal.querySelector('.video-modal-title');
  const videoContainer = modal.querySelector('.video-container');

  modalTitle.textContent = title;
  videoContainer.innerHTML = `
    <iframe 
      width="100%" 
      height="100%" 
      src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
      title="${title}" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      referrerpolicy="strict-origin-when-cross-origin" 
      allowfullscreen>
    </iframe>
  `;

  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  const modal = document.getElementById('video-modal');
  if (modal) {
    modal.classList.remove('active');
    // Clear iframe to stop video
    const videoContainer = modal.querySelector('.video-container');
    videoContainer.innerHTML = '';
  }
  document.body.style.overflow = '';
}

// Close modal on ESC key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeVideoModal();
  }
});
