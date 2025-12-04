// Lisa and the Jet Setters - Main JavaScript
// Handles lightbox and interactive features

(function() {
  'use strict';

  // Lightbox functionality
  document.addEventListener('DOMContentLoaded', function() {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightboxImg');
    var lightboxClose = document.getElementById('lightboxClose');

    if (!lightbox || !lightboxImg || !lightboxClose) return;

    // Helper: pick best source from data attributes
    function bestLargeSource(anchor) {
      var webp = anchor.getAttribute('data-large-webp');
      var jpg = anchor.getAttribute('data-large-jpg');
      // Prefer webp if available
      if (webp) return webp;
      return jpg || anchor.href;
    }

    // Open lightbox
    function openLightbox(src, alt) {
      lightboxImg.src = src;
      lightboxImg.alt = alt || 'Large photo view';
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    function closeLightbox() {
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      lightboxImg.src = '';
    }

    // Attach click handlers to all .lightbox-trigger elements
    var triggers = document.querySelectorAll('.lightbox-trigger');
    triggers.forEach(function(trigger) {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        var src = bestLargeSource(trigger);
        var img = trigger.querySelector('img');
        var alt = img ? img.alt : 'Photo';
        openLightbox(src, alt);
      });
    });

    // Close on button click
    lightboxClose.addEventListener('click', closeLightbox);

    // Close on background click
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') {
        closeLightbox();
      }
    });
  });

})();
