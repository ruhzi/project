document.addEventListener('DOMContentLoaded', () => {
    const scenarioButtons = document.querySelectorAll('.scenario-btn');
    const forms = document.querySelectorAll('.task-form');
    const socialLinkError = document.getElementById('social-link-error');
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
  
    scenarioButtons.forEach(button => {
      button.addEventListener('click', () => {
        const selectedScenario = button.getAttribute('data-scenario');
  
        forms.forEach(form => {
          form.classList.remove('active');
          form.style.opacity = 0; // Start hidden
        });
        const selectedForm = document.getElementById(`${selectedScenario}-form`);
        if (selectedForm) {
          selectedForm.classList.add('active');
          setTimeout(() => {
            selectedForm.style.opacity = 1; // Fade in
          }, 10);
        }
        button.classList.add('clicked'); // Add click effect
        setTimeout(() => button.classList.remove('clicked'), 300); // Remove click effect after animation
  
        // Fade out all headings and paragraphs
        document.querySelectorAll('h1, p').forEach(element => {
          element.style.animation = 'fadeOut 1s ease forwards'; // Fade out animation
          setTimeout(() => {
            element.style.opacity = 0; // Set opacity to 0 after fade out
          }, 1000); // Wait for animation to finish
        });
      });
    });
  
    document.querySelector('.submit-task').addEventListener('click', () => {
      const socialLink = document.getElementById('social-link').value;
      if (!isValidURL(socialLink)) {
        socialLinkError.textContent = 'Please enter a valid URL.';
        return;
      }
      socialLinkError.textContent = '';
      alert('Scraping started!');
    });
  
    function isValidURL(url) {
      const pattern = new RegExp(
        '^(https?:\\/\\/)?' +
        '(([a-z\\d]([a-z\\d-]*[a-z\\d])?\\.)+[a-z]{2,}|' +
        'localhost|' +
        '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|\\[?[a-f\\d:\\.]+\\]?)' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$',
        'i'
      );
      return !!pattern.test(url);
    }
  });
  