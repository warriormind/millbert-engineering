document.addEventListener('DOMContentLoaded', () => {
  // Throttle function for performance
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }

  // Smooth scrolling for nav links
  document.querySelectorAll('#navmenu a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Typing animation for hero headline
  const heroHeadline = document.querySelector('#hero h1');
  if (heroHeadline) {
    const text = heroHeadline.textContent;
    heroHeadline.textContent = '';
    let index = 0;
    function type() {
      if (index < text.length) {
        heroHeadline.textContent += text.charAt(index);
        index++;
        setTimeout(type, 100);
      }
    }
    type();
  }

  // Form validation for contact form
  const contactForm = document.querySelector('.php-email-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      try {
        let valid = true;
        const name = contactForm.querySelector('input[name="name"]');
        const email = contactForm.querySelector('input[name="email"]');
        const subject = contactForm.querySelector('input[name="subject"]');
        const message = contactForm.querySelector('textarea[name="message"]');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Clear previous errors
        document.querySelectorAll('.error-text').forEach(el => el.textContent = '');

        if (!name || !name.value.trim()) {
          valid = false;
          if (name) name.classList.add('input-error');
          const nameError = document.getElementById('name-error');
          if (nameError) nameError.textContent = 'Name is required.';
        } else {
          if (name) name.classList.remove('input-error');
        }
        if (!email || !emailPattern.test(email.value.trim())) {
          valid = false;
          if (email) email.classList.add('input-error');
          const emailError = document.getElementById('email-error');
          if (emailError) emailError.textContent = 'Please enter a valid email address.';
        } else {
          if (email) email.classList.remove('input-error');
        }
        if (!subject || !subject.value.trim()) {
          valid = false;
          if (subject) subject.classList.add('input-error');
          const subjectError = document.getElementById('subject-error');
          if (subjectError) subjectError.textContent = 'Subject is required.';
        } else {
          if (subject) subject.classList.remove('input-error');
        }
        if (!message || !message.value.trim()) {
          valid = false;
          if (message) message.classList.add('input-error');
          const messageError = document.getElementById('message-error');
          if (messageError) messageError.textContent = 'Message is required.';
        } else {
          if (message) message.classList.remove('input-error');
        }
        if (!valid) {
          e.preventDefault();
        } else {
          // Show loading state
          const submitBtn = contactForm.querySelector('.submit-btn');
          const loading = contactForm.querySelector('.loading');
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending...</span> <i class="bi bi-send-fill"></i>';
          }
          if (loading) loading.style.display = 'block';
        }
      } catch (error) {
        console.error('Error in form validation:', error);
        e.preventDefault();
      }
    });
  }

  // Counter animations on scroll
  const counters = document.querySelectorAll('.purecounter');
  let countersStarted = false;
  function animateCounters() {
    if (countersStarted) return;
    const scrollPosition = window.scrollY + window.innerHeight;
    counters.forEach(counter => {
      const offsetTop = counter.offsetTop;
      if (scrollPosition > offsetTop) {
        countersStarted = true;
        try {
          new PureCounter();
        } catch (error) {
          console.error('Error initializing PureCounter:', error);
        }
      }
    });
  }

  // Interactive hover effects for service cards
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('hovered');
    });
    card.addEventListener('mouseleave', () => {
      card.classList.remove('hovered');
    });
  });

  // Enhance mobile menu with slide-in animation
  const mobileNav = document.querySelector('.navmenu');
  if (mobileNav) {
    mobileNav.style.transition = 'transform 0.3s ease';
  }

  // Scroll top button with progress bar
  let scrollTop = document.querySelector('.scroll-top');
  let scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  scrollProgress.innerHTML = '<div class="scroll-progress-bar"></div>';
  document.body.appendChild(scrollProgress);

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    // Update scroll progress
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.querySelector('.scroll-progress-bar').style.width = scrolled + '%';
  }

  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Combined throttled scroll handler
  const throttledScrollHandler = throttle(() => {
    animateCounters();
    toggleScrollTop();
  }, 100);

  window.addEventListener('scroll', throttledScrollHandler);
  window.addEventListener('load', toggleScrollTop);
});
