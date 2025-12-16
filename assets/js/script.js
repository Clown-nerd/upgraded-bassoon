'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// ===== NEW INTERACTIVE FEATURES =====

// 1. Typing animation for title
const typeTitle = () => {
  const title = document.querySelector('.info-content .title');
  if (!title) return;
  
  const roles = ['Software Developer', 'AI Systems Architect', 'Digital Productivity Expert', 'Problem Solver'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  const typeSpeed = 100;
  const deleteSpeed = 50;
  const pauseTime = 2000;
  
  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      title.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      title.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
      setTimeout(() => { isDeleting = true; }, pauseTime);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
    
    const speed = isDeleting ? deleteSpeed : typeSpeed;
    setTimeout(type, speed);
  }
  
  type();
};

// 2. Parallax effect for avatar
const parallaxAvatar = () => {
  const avatar = document.querySelector('.avatar-box');
  if (!avatar) return;
  
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    avatar.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
  });
};

// 3. Smooth scroll reveal animations
const scrollReveal = () => {
  const reveals = document.querySelectorAll('.service-item, .testimonials-item, .timeline-item, .project-item, .blog-post-item, .skills-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  reveals.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });
};

// 4. Interactive skill bars animation
const animateSkills = () => {
  const skillBars = document.querySelectorAll('.skill-progress-fill');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.style.width;
        entry.target.style.width = '0%';
        setTimeout(() => {
          entry.target.style.width = width;
          entry.target.style.transition = 'width 1.5s ease-out';
        }, 100);
      }
    });
  }, { threshold: 0.5 });
  
  skillBars.forEach(bar => observer.observe(bar));
};

// 5. Hover effects for project items
const projectHoverEffects = () => {
  const projectItems = document.querySelectorAll('.project-item');
  
  projectItems.forEach(item => {
    const img = item.querySelector('.project-img img');
    
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
};

// 6. Animated counter for experience/stats
const animateCounters = () => {
  const counters = document.querySelectorAll('[data-value]');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-value'));
    let current = 0;
    const increment = target / 50;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target + '%';
              clearInterval(timer);
            } else {
              counter.textContent = Math.ceil(current) + '%';
            }
          }, 30);
          observer.unobserve(counter);
        }
      });
    });
    
    observer.observe(counter);
  });
};

// 7. Service card tilt effect
const serviceTiltEffect = () => {
  const serviceItems = document.querySelectorAll('.service-item');
  
  serviceItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
};

// 8. Smooth page transitions
const smoothPageTransitions = () => {
  const pages = document.querySelectorAll('[data-page]');
  
  navigationLinks.forEach(link => {
    link.addEventListener('click', () => {
      pages.forEach(page => {
        if (page.classList.contains('active')) {
          page.style.animation = 'fadeOut 0.3s ease-out';
          setTimeout(() => {
            page.style.animation = '';
          }, 300);
        }
      });
    });
  });
};

// 9. Progress bar for page scroll
const scrollProgressBar = () => {
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(to right, hsl(190, 95%, 50%), hsl(210, 100%, 60%));
    z-index: 9999;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
};

// 10. Floating animation for icons
const floatingIcons = () => {
  const icons = document.querySelectorAll('.service-icon-box, .icon-box');
  
  icons.forEach((icon, index) => {
    icon.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
  });
};

// Add CSS animations
const addAnimations = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes fadeOut {
      from { opacity: 1; transform: scale(1); }
      to { opacity: 0; transform: scale(0.95); }
    }
    
    .service-item, .project-item, .blog-post-item {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .form-input:focus {
      transform: scale(1.02);
      transition: transform 0.2s ease;
    }
    
    .navbar-link {
      position: relative;
      overflow: hidden;
    }
    
    .navbar-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--text-gradient-yellow);
      transform: translateX(-100%);
      transition: transform 0.3s ease;
    }
    
    .navbar-link:hover::after,
    .navbar-link.active::after {
      transform: translateX(0);
    }
    
    .contact-link:hover {
      color: var(--orange-yellow-crayola);
      transform: translateX(5px);
      display: inline-block;
      transition: all 0.3s ease;
    }
    
    .social-link {
      transition: transform 0.3s ease;
    }
    
    .social-link:hover {
      transform: scale(1.2) rotate(5deg);
    }
    
    .blog-post-item:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-5);
    }
    
    .timeline-item::after {
      animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 0 4px var(--jet); }
      50% { box-shadow: 0 0 0 8px var(--jet); }
    }
  `;
  document.head.appendChild(style);
};

// Initialize all interactive features
window.addEventListener('DOMContentLoaded', () => {
  addAnimations();
  typeTitle();
  parallaxAvatar();
  scrollReveal();
  animateSkills();
  projectHoverEffects();
  animateCounters();
  serviceTiltEffect();
  smoothPageTransitions();
  scrollProgressBar();
  floatingIcons();
});

// Smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
