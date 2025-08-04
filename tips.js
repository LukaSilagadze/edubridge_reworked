// Tips Page JavaScript

// Sample data for tips
const tipsData = [
  {
    id: 1,
    title: "ეფექტური სწავლის მეთოდები",
    category: "study",
    subject: "general",
    grade: "all",
    content: "გამოიყენე პომოდორო ტექნიკა - 25 წუთი სწავლა, შემდეგ 5 წუთი დასვენება. ეს ხელს უწყობს კონცენტრაციის შენარჩუნებას და ინფორმაციის უკეთ ათვისებას.",
    rating: 4.8,
    featured: true,
    icon: "fas fa-lightbulb"
  },
  {
    id: 2,
    title: "ოლიმპიადის მომზადების სტრატეგიები",
    category: "olympiad",
    subject: "math",
    grade: "high",
    content: "დაიწყე მომზადება ადრე, გამოიყენე წინა წლების ამოცანები, ივარჯიშე ყოველდღე და არ დაივიწყო დასვენება.",
    rating: 4.9,
    featured: true,
    icon: "fas fa-trophy"
  },
  {
    id: 3,
    title: "დროის მართვის რჩევები",
    category: "time",
    subject: "general",
    grade: "all",
    content: "შექმენი ყოველდღიური გეგმა, დაალაგე პრიორიტეტები და გამოიყენე დროის ბლოკები ეფექტურად.",
    rating: 4.7,
    featured: true,
    icon: "fas fa-clock"
  },
  {
    id: 4,
    title: "მოტივაციის შენარჩუნება",
    category: "motivation",
    subject: "general",
    grade: "all",
    content: "დაისახე მცირე მიზნები, აღნიშნე წარმატებები და არ დაივიწყო რატომ იწყებდი.",
    rating: 4.6,
    featured: false,
    icon: "fas fa-heart"
  },
  {
    id: 5,
    title: "მათემატიკის სწავლის რჩევები",
    category: "study",
    subject: "math",
    grade: "middle",
    content: "ივარჯიშე ყოველდღე, გამოიყენე ვიზუალური დახმარება და არ შეგეშინდეს შეცდომების.",
    rating: 4.5,
    featured: false,
    icon: "fas fa-calculator"
  },
  {
    id: 6,
    title: "ენის სწავლის მეთოდები",
    category: "study",
    subject: "language",
    grade: "all",
    content: "მოისმინე მუსიკა, ნახე ფილმები, ივარჯიშე ყოველდღე და გამოიყენე ენის გაცვლის პროგრამები.",
    rating: 4.4,
    featured: false,
    icon: "fas fa-language"
  },
  {
    id: 7,
    title: "კარიერული გეგმვა",
    category: "career",
    subject: "general",
    grade: "high",
    content: "გაარკვიე შენი ინტერესები, შეისწავლე ბაზრის მოთხოვნები და შექმენი გრძელვადიანი გეგმა.",
    rating: 4.3,
    featured: false,
    icon: "fas fa-briefcase"
  },
  {
    id: 8,
    title: "ფიზიკის ოლიმპიადის მომზადება",
    category: "olympiad",
    subject: "science",
    grade: "high",
    content: "შეისწავლე თეორია, ივარჯიშე ექსპერიმენტები და გამოიყენე ონლაინ რესურსები.",
    rating: 4.8,
    featured: false,
    icon: "fas fa-atom"
  },
  {
    id: 9,
    title: "პრეზენტაციის უნარების გაუმჯობესება",
    category: "career",
    subject: "general",
    grade: "all",
    content: "ივარჯიშე ყოველდღე, გამოიყენე ვიზუალური დახმარება და არ დაივიწყო აუდიტორიის ინტერესი.",
    rating: 4.2,
    featured: false,
    icon: "fas fa-presentation"
  },
  {
    id: 10,
    title: "შტრესის მართვა",
    category: "motivation",
    subject: "general",
    grade: "all",
    content: "ივარჯიშე მედიტაცია, გაატარე დრო ბუნებაში და არ დაივიწყო ფიზიკური აქტივობა.",
    rating: 4.1,
    featured: false,
    icon: "fas fa-spa"
  },
  {
    id: 11,
    title: "პროგრამირების საფუძვლები",
    category: "study",
    subject: "technology",
    grade: "middle",
    content: "დაიწყე Python-ით, ივარჯიშე ყოველდღე და გამოიყენე პრაქტიკული პროექტები.",
    rating: 4.7,
    featured: false,
    icon: "fas fa-code"
  },
  {
    id: 12,
    title: "ისტორიის სწავლის მეთოდები",
    category: "study",
    subject: "history",
    grade: "middle",
    content: "შექმენი ქრონოლოგია, გამოიყენე ვიზუალური დახმარება და დააკავშირე თანამედროვე მოვლენებთან.",
    rating: 4.0,
    featured: false,
    icon: "fas fa-landmark"
  }
];

// Categories data
const categoriesData = [
  {
    id: "study",
    title: "სწავლის მეთოდები",
    description: "ეფექტური სწავლის ტექნიკები და სტრატეგიები",
    icon: "fas fa-graduation-cap",
    count: 45
  },
  {
    id: "olympiad",
    title: "ოლიმპიადის მომზადება",
    description: "სპეციალური რჩევები ოლიმპიადებისთვის",
    icon: "fas fa-trophy",
    count: 32
  },
  {
    id: "time",
    title: "დროის მართვა",
    description: "როგორ ვიმართოთ დრო ეფექტურად",
    icon: "fas fa-clock",
    count: 28
  },
  {
    id: "motivation",
    title: "მოტივაცია",
    description: "როგორ შევინარჩუნოთ მოტივაცია",
    icon: "fas fa-heart",
    count: 35
  },
  {
    id: "career",
    title: "კარიერა",
    description: "კარიერული განვითარების რჩევები",
    icon: "fas fa-briefcase",
    count: 22
  }
];

// Experts data
const expertsData = [
  {
    id: 1,
    name: "დოქტორი მარიამ ბერიძე",
    title: "საგანმანათლებლო ფსიქოლოგი",
    quote: "ყველა სტუდენტს აქვს უნიკალური სწავლის სტილი. მნიშვნელოვანია მისი აღმოჩენა და გამოყენება.",
    specialties: ["სწავლის მეთოდები", "მოტივაცია", "ფსიქოლოგია"],
    avatar: "./images/hero_image.jpeg"
  },
  {
    id: 2,
    name: "პროფესორი გიორგი მაისურაძე",
    title: "მათემატიკის პედაგოგი",
    quote: "მათემატიკა არის ლოგიკის ენა. მნიშვნელოვანია ფუნდამენტური ცნებების გაგება.",
    specialties: ["მათემატიკა", "ოლიმპიადები", "პედაგოგიკა"],
    avatar: "./images/hero_image.jpeg"
  },
  {
    id: 3,
    name: "ანა კაპანაძე",
    title: "კარიერული კონსულტანტი",
    quote: "წარმატებული კარიერა იწყება ადრეული გეგმვით და მუდმივი განვითარებით.",
    specialties: ["კარიერა", "გეგმვა", "განვითარება"],
    avatar: "./images/hero_image.jpeg"
  }
];

// Resources data
const resourcesData = [
  {
    id: 1,
    title: "ონლაინ კურსები",
    description: "უფასო და ფასიანი კურსები სხვადასხვა საგნებში",
    icon: "fas fa-laptop",
    link: "#"
  },
  {
    id: 2,
    title: "სახელმძღვანელოები",
    description: "ელექტრონული და ფიზიკური სახელმძღვანელოები",
    icon: "fas fa-book",
    link: "#"
  },
  {
    id: 3,
    title: "ვიდეო გაკვეთილები",
    description: "საგანმანათლებლო ვიდეოები და ლექციები",
    icon: "fas fa-video",
    link: "#"
  },
  {
    id: 4,
    title: "პრაქტიკული ამოცანები",
    description: "ამოცანების ბანკი სხვადასხვა საგნებში",
    icon: "fas fa-tasks",
    link: "#"
  },
  {
    id: 5,
    title: "ონლაინ ტესტები",
    description: "საშუალო და უმაღლესი დონის ტესტები",
    icon: "fas fa-clipboard-check",
    link: "#"
  },
  {
    id: 6,
    title: "მენტორობის პროგრამა",
    description: "პერსონალური მენტორობა ექსპერტებისგან",
    icon: "fas fa-user-graduate",
    link: "#"
  }
];

// Global variables
let currentTips = [...tipsData];
let currentFilters = { category: '', grade: '', subject: '' };
let currentSearch = '';
let displayedTips = 6;
let allTipsLoaded = false;

// DOM elements
const categoriesGrid = document.getElementById('categoriesGrid');
const featuredTipsGrid = document.getElementById('featuredTipsGrid');
const expertsGrid = document.getElementById('expertsGrid');
const resourcesGrid = document.getElementById('resourcesGrid');
const tipsGrid = document.getElementById('tipsGrid');
const tipsSearchInput = document.getElementById('tipsSearchInput');
const categoryFilter = document.getElementById('categoryFilter');
const gradeFilter = document.getElementById('gradeFilter');
const subjectFilter = document.getElementById('subjectFilter');
const clearFiltersBtn = document.getElementById('clearFiltersBtn');
const tipsCount = document.getElementById('tipsCount');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const tipsNewsletterForm = document.getElementById('tipsNewsletterForm');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  setupEventListeners();
  renderCategories();
  renderFeaturedTips();
  renderExperts();
  renderResources();
  renderTips();
  initializeAnimations();
});

// Setup event listeners
function setupEventListeners() {
  // Search
  if (tipsSearchInput) {
    tipsSearchInput.addEventListener('input', handleSearch);
  }
  
  // Filters
  if (categoryFilter) {
    categoryFilter.addEventListener('change', handleFilterChange);
  }
  if (gradeFilter) {
    gradeFilter.addEventListener('change', handleFilterChange);
  }
  if (subjectFilter) {
    subjectFilter.addEventListener('change', handleFilterChange);
  }
  
  // Clear filters
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', clearAllFilters);
  }
  
  // Load more
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadMoreTips);
  }
  
  // Newsletter form
  if (tipsNewsletterForm) {
    tipsNewsletterForm.addEventListener('submit', handleNewsletterSubmit);
  }
}

// Handle search
function handleSearch() {
  currentSearch = tipsSearchInput.value.toLowerCase().trim();
  filterTips();
}

// Handle filter change
function handleFilterChange() {
  currentFilters = {
    category: categoryFilter.value,
    grade: gradeFilter.value,
    subject: subjectFilter.value
  };
  filterTips();
}

// Clear all filters
function clearAllFilters() {
  if (tipsSearchInput) tipsSearchInput.value = '';
  if (categoryFilter) categoryFilter.value = '';
  if (gradeFilter) gradeFilter.value = '';
  if (subjectFilter) subjectFilter.value = '';
  
  currentFilters = { category: '', grade: '', subject: '' };
  currentSearch = '';
  
  filterTips();
}

// Filter tips
function filterTips() {
  let filtered = [...tipsData];
  
  // Filter by search
  if (currentSearch) {
    filtered = filtered.filter(tip => 
      tip.title.toLowerCase().includes(currentSearch) ||
      tip.content.toLowerCase().includes(currentSearch)
    );
  }
  
  // Filter by category
  if (currentFilters.category) {
    filtered = filtered.filter(tip => tip.category === currentFilters.category);
  }
  
  // Filter by grade
  if (currentFilters.grade) {
    filtered = filtered.filter(tip => tip.grade === currentFilters.grade || tip.grade === 'all');
  }
  
  // Filter by subject
  if (currentFilters.subject) {
    filtered = filtered.filter(tip => tip.subject === currentFilters.subject || tip.subject === 'general');
  }
  
  currentTips = filtered;
  displayedTips = 6;
  allTipsLoaded = false;
  renderTips();
}

// Render categories
function renderCategories() {
  if (!categoriesGrid) return;
  
  categoriesGrid.innerHTML = '';
  
  categoriesData.forEach(category => {
    const categoryCard = createCategoryCard(category);
    categoriesGrid.appendChild(categoryCard);
  });
}

// Create category card
function createCategoryCard(category) {
  const card = document.createElement('div');
  card.className = 'category_card';
  card.dataset.category = category.id;
  
  card.innerHTML = `
    <div class="category_icon">
      <i class="${category.icon}"></i>
    </div>
    <h3 class="category_title">${category.title}</h3>
    <p class="category_description">${category.description}</p>
    <span class="category_count">${category.count} რჩევა</span>
  `;
  
  card.addEventListener('click', () => {
    // Filter tips by category
    if (categoryFilter) {
      categoryFilter.value = category.id;
      handleFilterChange();
    }
    
    // Scroll to tips section
    const tipsSection = document.querySelector('.all_tips_section');
    if (tipsSection) {
      tipsSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
  
  return card;
}

// Render featured tips
function renderFeaturedTips() {
  if (!featuredTipsGrid) return;
  
  featuredTipsGrid.innerHTML = '';
  
  const featuredTips = tipsData.filter(tip => tip.featured);
  
  featuredTips.forEach(tip => {
    const tipCard = createFeaturedTipCard(tip);
    featuredTipsGrid.appendChild(tipCard);
  });
}

// Create featured tip card
function createFeaturedTipCard(tip) {
  const card = document.createElement('div');
  card.className = 'featured_tip_card';
  
  card.innerHTML = `
    <div class="tip_header">
      <div class="tip_icon">
        <i class="${tip.icon}"></i>
      </div>
      <div class="tip_meta">
        <h3 class="tip_title">${tip.title}</h3>
        <span class="tip_category">${getCategoryText(tip.category)}</span>
      </div>
    </div>
    <p class="tip_content">${tip.content}</p>
    <div class="tip_actions">
      <div class="tip_rating">
        <i class="fas fa-star"></i>
        <span>${tip.rating}</span>
      </div>
      <button class="read_more_btn" onclick="showTipDetails(${tip.id})">
        ნახვა <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  `;
  
  return card;
}

// Render experts
function renderExperts() {
  if (!expertsGrid) return;
  
  expertsGrid.innerHTML = '';
  
  expertsData.forEach(expert => {
    const expertCard = createExpertCard(expert);
    expertsGrid.appendChild(expertCard);
  });
}

// Create expert card
function createExpertCard(expert) {
  const card = document.createElement('div');
  card.className = 'expert_card';
  
  card.innerHTML = `
    <div class="expert_avatar">
      <img src="${expert.avatar}" alt="${expert.name}">
    </div>
    <h3 class="expert_name">${expert.name}</h3>
    <p class="expert_title">${expert.title}</p>
    <p class="expert_quote">"${expert.quote}"</p>
    <div class="expert_specialties">
      ${expert.specialties.map(specialty => 
        `<span class="expert_specialty">${specialty}</span>`
      ).join('')}
    </div>
  `;
  
  return card;
}

// Render resources
function renderResources() {
  if (!resourcesGrid) return;
  
  resourcesGrid.innerHTML = '';
  
  resourcesData.forEach(resource => {
    const resourceCard = createResourceCard(resource);
    resourcesGrid.appendChild(resourceCard);
  });
}

// Create resource card
function createResourceCard(resource) {
  const card = document.createElement('div');
  card.className = 'resource_card';
  
  card.innerHTML = `
    <div class="resource_icon">
      <i class="${resource.icon}"></i>
    </div>
    <h3 class="resource_title">${resource.title}</h3>
    <p class="resource_description">${resource.description}</p>
    <a href="${resource.link}" class="resource_link">
      ნახვა <i class="fas fa-arrow-right"></i>
    </a>
  `;
  
  return card;
}

// Render tips
function renderTips() {
  if (!tipsGrid) return;
  
  tipsGrid.innerHTML = '';
  
  const tipsToShow = currentTips.slice(0, displayedTips);
  
  if (tipsToShow.length === 0) {
    tipsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
        <i class="fas fa-search" style="font-size: 48px; color: #ccc; margin-bottom: 20px;"></i>
        <h3 style="color: #666; margin-bottom: 10px;">რჩევა ვერ მოიძებნა</h3>
        <p style="color: #999;">სცადეთ სხვა ფილტრები ან ძიების ტერმინები</p>
      </div>
    `;
    return;
  }
  
  tipsToShow.forEach(tip => {
    const tipCard = createTipCard(tip);
    tipsGrid.appendChild(tipCard);
  });
  
  // Update count
  if (tipsCount) {
    tipsCount.textContent = currentTips.length;
  }
  
  // Show/hide load more button
  if (loadMoreBtn) {
    if (displayedTips >= currentTips.length) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'inline-flex';
    }
  }
}

// Create tip card
function createTipCard(tip) {
  const card = document.createElement('div');
  card.className = 'tip_card';
  
  card.innerHTML = `
    <div class="tip_card_header">
      <div class="tip_card_icon">
        <i class="${tip.icon}"></i>
      </div>
      <div class="tip_card_meta">
        <h3 class="tip_card_title">${tip.title}</h3>
        <span class="tip_card_category">${getCategoryText(tip.category)}</span>
      </div>
    </div>
    <p class="tip_card_content">${tip.content}</p>
    <div class="tip_card_footer">
      <div class="tip_card_rating">
        <i class="fas fa-star"></i>
        <span>${tip.rating}</span>
      </div>
      <button class="tip_card_read_more" onclick="showTipDetails(${tip.id})">
        ნახვა <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  `;
  
  return card;
}

// Load more tips
function loadMoreTips() {
  displayedTips += 6;
  renderTips();
  
  // Smooth scroll to new tips
  const newTips = tipsGrid.children[displayedTips - 6];
  if (newTips) {
    newTips.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// Show tip details (placeholder function)
function showTipDetails(tipId) {
  const tip = tipsData.find(t => t.id === tipId);
  if (tip) {
    // Create modal or navigate to detail page
    alert(`რჩევის დეტალები: ${tip.title}\n\n${tip.content}`);
  }
}

// Handle newsletter submit
function handleNewsletterSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(tipsNewsletterForm);
  const name = formData.get('name') || 'Anonymous';
  const email = formData.get('email');
  
  if (!email) {
    alert('გთხოვთ შეიყვანოთ ელ-ფოსტა');
    return;
  }
  
  // Simulate form submission
  const submitBtn = tipsNewsletterForm.querySelector('.subscribe_btn');
  const originalText = submitBtn.innerHTML;
  
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>იგზავნება...</span>';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    submitBtn.innerHTML = '<i class="fas fa-check"></i><span>გამოწერილია!</span>';
    
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      tipsNewsletterForm.reset();
    }, 2000);
  }, 1500);
}

// Initialize animations
function initializeAnimations() {
  // Intersection Observer for fade-in animations
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
  
  // Observe all cards for animation
  const cards = document.querySelectorAll('.category_card, .featured_tip_card, .expert_card, .resource_card, .tip_card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// Helper functions
function getCategoryText(category) {
  const categories = {
    'study': 'სწავლის მეთოდები',
    'olympiad': 'ოლიმპიადის მომზადება',
    'time': 'დროის მართვა',
    'motivation': 'მოტივაცია',
    'career': 'კარიერა'
  };
  return categories[category] || category;
}

// Add smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
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
});

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
  // Category cards hover effect
  const categoryCards = document.querySelectorAll('.category_card');
  categoryCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Tip cards hover effect
  const tipCards = document.querySelectorAll('.tip_card, .featured_tip_card');
  tipCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
});

// Export functions for global access
window.showTipDetails = showTipDetails; 