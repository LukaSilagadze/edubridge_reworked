// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact page functionality
    initializeContactForm();
    initializeFAQ();
    initializeFloatingCards();
});

// Contact Form Functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successAnimation = document.getElementById('successAnimation');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate form
            if (validateForm(formObject)) {
                // Show loading state
                showLoadingState();
                
                // Simulate form submission (replace with actual API call)
                setTimeout(() => {
                    hideLoadingState();
                    showSuccessMessage();
                    contactForm.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        hideSuccessMessage();
                    }, 5000);
                }, 2000);
            }
        });
    }
}

// Form validation
function validateForm(data) {
    const errors = [];
    
    // Check required fields
    if (!data.firstName || data.firstName.trim() === '') {
        errors.push('სახელი სავალდებულოა');
    }
    
    if (!data.lastName || data.lastName.trim() === '') {
        errors.push('გვარი სავალდებულოა');
    }
    
    if (!data.email || data.email.trim() === '') {
        errors.push('ელ-ფოსტა სავალდებულოა');
    } else if (!isValidEmail(data.email)) {
        errors.push('გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა');
    }
    
    if (!data.subject || data.subject === '') {
        errors.push('გთხოვთ აირჩიოთ თემა');
    }
    
    if (!data.message || data.message.trim() === '') {
        errors.push('შეტყობინება სავალდებულოა');
    }
    
    if (!data.privacy) {
        errors.push('გთხოვთ დაეთანხმოთ პირობებს');
    }
    
    // Show errors if any
    if (errors.length > 0) {
        showErrors(errors);
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show loading state
function showLoadingState() {
    const submitBtn = document.querySelector('.submit_btn');
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>იგზავნება...</span>';
        submitBtn.disabled = true;
    }
}

// Hide loading state
function hideLoadingState() {
    const submitBtn = document.querySelector('.submit_btn');
    if (submitBtn) {
        submitBtn.innerHTML = '<span>გაგზავნა</span><i class="fas fa-paper-plane"></i>';
        submitBtn.disabled = false;
    }
}

// Show success message
function showSuccessMessage() {
    const successAnimation = document.getElementById('successAnimation');
    if (successAnimation) {
        successAnimation.classList.add('show');
    }
}

// Hide success message
function hideSuccessMessage() {
    const successAnimation = document.getElementById('successAnimation');
    if (successAnimation) {
        successAnimation.classList.remove('show');
    }
}

// Show validation errors
function showErrors(errors) {
    // Remove existing error messages
    const existingErrors = document.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
    
    // Create error container
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-container';
    errorContainer.style.cssText = `
        background: #fee;
        border: 1px solid #fcc;
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 20px;
        color: #c33;
        font-family: var(--text-font);
        font-size: 14px;
    `;
    
    const errorTitle = document.createElement('h4');
    errorTitle.textContent = 'გთხოვთ შეასწოროთ შემდეგი შეცდომები:';
    errorTitle.style.cssText = 'margin: 0 0 10px 0; font-size: 16px;';
    
    const errorList = document.createElement('ul');
    errorList.style.cssText = 'margin: 0; padding-left: 20px;';
    
    errors.forEach(error => {
        const errorItem = document.createElement('li');
        errorItem.textContent = error;
        errorList.appendChild(errorItem);
    });
    
    errorContainer.appendChild(errorTitle);
    errorContainer.appendChild(errorList);
    
    // Insert error container at the top of the form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.insertBefore(errorContainer, contactForm.firstChild);
        
        // Auto-remove errors after 5 seconds
        setTimeout(() => {
            if (errorContainer.parentNode) {
                errorContainer.remove();
            }
        }, 5000);
    }
}

// FAQ Functionality
function initializeFAQ() {
    // FAQ toggle functionality is handled by the global toggleFAQ function
    // This is called from the HTML onclick attribute
}

// Global FAQ toggle function
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    const allFAQItems = document.querySelectorAll('.faq_item');
    allFAQItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Floating Cards Animation
function initializeFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating_card');
    
    // Add intersection observer for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    floatingCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Contact Method Cards Hover Effects
function initializeContactMethodCards() {
    const contactCards = document.querySelectorAll('.contact_method_card');
    
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form field focus effects
function initializeFormFieldEffects() {
    const formFields = document.querySelectorAll('.form_input, .form_select, .form_textarea');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
}

// Character counter for textarea
function initializeCharacterCounter() {
    const textarea = document.getElementById('message');
    
    if (textarea) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = `
            font-size: 12px;
            color: #666;
            text-align: right;
            margin-top: 5px;
            font-family: var(--text-font);
        `;
        
        textarea.parentElement.appendChild(counter);
        
        function updateCounter() {
            const maxLength = 1000;
            const currentLength = textarea.value.length;
            const remaining = maxLength - currentLength;
            
            counter.textContent = `${currentLength}/${maxLength}`;
            
            if (remaining < 100) {
                counter.style.color = '#ff6b6b';
            } else if (remaining < 200) {
                counter.style.color = '#ffa726';
            } else {
                counter.style.color = '#666';
            }
        }
        
        textarea.addEventListener('input', updateCounter);
        updateCounter(); // Initial count
    }
}

// Initialize all additional features
document.addEventListener('DOMContentLoaded', function() {
    initializeContactMethodCards();
    initializeSmoothScrolling();
    initializeFormFieldEffects();
    initializeCharacterCounter();
});

// Export functions for global access
window.toggleFAQ = toggleFAQ; 