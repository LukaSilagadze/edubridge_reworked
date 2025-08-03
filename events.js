// Events Page JavaScript

// Sample events data
const eventsData = [
  {
    id: 1,
    title: "მათემატიკის რესპუბლიკური ოლიმპიადა",
    category: "olympiads",
    subject: "math",
    grade: "high",
    location: "offline",
    date: "2024-03-15",
    description: "წარმოადგენს საქართველოს მათემატიკის საუკეთესო სტუდენტების შეჯიბრს.",
    image: "./images/hero_image.jpeg",
    status: "open",
    participants: 150,
    maxParticipants: 200
  },
  {
    id: 2,
    title: "ფიზიკის საერთაშორისო ტურნირი",
    category: "tournaments",
    subject: "science",
    grade: "high",
    location: "online",
    date: "2024-04-20",
    description: "ონლაინ ფიზიკის ტურნირი, რომელიც აერთიანებს სტუდენტებს მთელი მსოფლიოდან.",
    image: "./images/hero_image.jpeg",
    status: "open",
    participants: 80,
    maxParticipants: 100
  },
  {
    id: 3,
    title: "პროგრამირების სახელოსნო",
    category: "workshops",
    subject: "technology",
    grade: "middle",
    location: "hybrid",
    date: "2024-03-25",
    description: "Python პროგრამირების სახელოსნო დამწყები მოსწავლეებისთვის.",
    image: "./images/hero_image.jpeg",
    status: "open",
    participants: 25,
    maxParticipants: 30
  }
];

// Global variables
let currentEvents = [...eventsData];
let currentCategory = 'all';
let currentFilters = { subject: '', grade: '', location: '', date: '' };
let currentSearch = '';

// DOM elements
const categoryTabs = document.getElementById('categoryTabs');
const searchInput = document.getElementById('searchInput');
const subjectFilter = document.getElementById('subjectFilter');
const gradeFilter = document.getElementById('gradeFilter');
const locationFilter = document.getElementById('locationFilter');
const dateFilter = document.getElementById('dateFilter');
const clearFiltersBtn = document.getElementById('clearFilters');
const eventsCount = document.getElementById('eventsCount');
const eventsGrid = document.getElementById('eventsGrid');
const loadingState = document.getElementById('loadingState');
const noResults = document.getElementById('noResults');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  setupEventListeners();
  renderEvents();
});

// Setup event listeners
function setupEventListeners() {
  // Category tabs
  categoryTabs.addEventListener('click', handleCategoryChange);
  
  // Search
  searchInput.addEventListener('input', handleSearch);
  
  // Filters
  subjectFilter.addEventListener('change', handleFilterChange);
  gradeFilter.addEventListener('change', handleFilterChange);
  locationFilter.addEventListener('change', handleFilterChange);
  dateFilter.addEventListener('change', handleFilterChange);
  
  // Clear filters
  clearFiltersBtn.addEventListener('click', clearAllFilters);
}

// Handle category change
function handleCategoryChange(e) {
  if (e.target.classList.contains('category_tab')) {
    document.querySelectorAll('.category_tab').forEach(tab => {
      tab.classList.remove('active');
    });
    
    e.target.classList.add('active');
    currentCategory = e.target.dataset.category;
    filterEvents();
  }
}

// Handle search
function handleSearch() {
  currentSearch = searchInput.value.toLowerCase().trim();
  filterEvents();
}

// Handle filter change
function handleFilterChange() {
  currentFilters = {
    subject: subjectFilter.value,
    grade: gradeFilter.value,
    location: locationFilter.value,
    date: dateFilter.value
  };
  filterEvents();
}

// Clear all filters
function clearAllFilters() {
  subjectFilter.value = '';
  gradeFilter.value = '';
  locationFilter.value = '';
  dateFilter.value = '';
  searchInput.value = '';
  
  currentFilters = { subject: '', grade: '', location: '', date: '' };
  currentSearch = '';
  
  filterEvents();
}

// Filter events
function filterEvents() {
  let filtered = [...eventsData];
  
  // Filter by category
  if (currentCategory !== 'all') {
    filtered = filtered.filter(event => event.category === currentCategory);
  }
  
  // Filter by search
  if (currentSearch) {
    filtered = filtered.filter(event => 
      event.title.toLowerCase().includes(currentSearch) ||
      event.description.toLowerCase().includes(currentSearch)
    );
  }
  
  // Filter by subject
  if (currentFilters.subject) {
    filtered = filtered.filter(event => event.subject === currentFilters.subject);
  }
  
  // Filter by grade
  if (currentFilters.grade) {
    filtered = filtered.filter(event => event.grade === currentFilters.grade);
  }
  
  // Filter by location
  if (currentFilters.location) {
    filtered = filtered.filter(event => event.location === currentFilters.location);
  }
  
  currentEvents = filtered;
  renderEvents();
}

// Render events
function renderEvents() {
  eventsCount.textContent = currentEvents.length;
  
  if (currentEvents.length === 0) {
    showNoResults();
    return;
  }
  
  hideNoResults();
  
  eventsGrid.innerHTML = '';
  
  currentEvents.forEach(event => {
    const eventCard = createEventCard(event);
    eventsGrid.appendChild(eventCard);
  });
}

// Create event card
function createEventCard(event) {
  const card = document.createElement('div');
  card.className = 'event_card';
  
  const statusClass = getStatusClass(event.status);
  const statusText = getStatusText(event.status);
  
  card.innerHTML = `
    <div class="event_image">
      <img src="${event.image}" alt="${event.title}">
      <div class="event_badge">${getCategoryText(event.category)}</div>
    </div>
    <div class="event_content">
      <h3 class="event_title">${event.title}</h3>
      <div class="event_meta">
        <div class="event_meta_item">
          <i class="fas fa-calendar"></i>
          <span>${formatDate(event.date)}</span>
        </div>
        <div class="event_meta_item">
          <i class="fas fa-map-marker-alt"></i>
          <span>${getLocationText(event.location)}</span>
        </div>
        <div class="event_meta_item">
          <i class="fas fa-users"></i>
          <span>${event.participants}/${event.maxParticipants} მონაწილე</span>
        </div>
      </div>
      <p class="event_description">${event.description}</p>
      <div class="event_actions">
        <div class="event_status ${statusClass}">
          <i class="fas fa-circle"></i>
          <span>${statusText}</span>
        </div>
        <button class="event_btn primary">
          დეტალები
        </button>
      </div>
    </div>
  `;
  
  return card;
}

// Helper functions
function getStatusClass(status) {
  switch (status) {
    case 'open': return 'status_open';
    case 'closed': return 'status_closed';
    case 'full': return 'status_full';
    default: return '';
  }
}

function getStatusText(status) {
  switch (status) {
    case 'open': return 'ღიაა';
    case 'closed': return 'დაკეტილია';
    case 'full': return 'სავსეა';
    default: return '';
  }
}

function getCategoryText(category) {
  const categories = {
    'olympiads': 'ოლიმპიადა',
    'tournaments': 'ტურნირი',
    'workshops': 'სახელოსნო',
    'conferences': 'კონფერენცია',
    'charity': 'ქველმოქმედება',
    'labs': 'ლაბორატორია'
  };
  return categories[category] || category;
}

function getLocationText(location) {
  const locations = {
    'online': 'ონლაინ',
    'offline': 'ფიზიკური',
    'hybrid': 'ჰიბრიდული'
  };
  return locations[location] || location;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('ka-GE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function showNoResults() {
  noResults.style.display = 'block';
  eventsGrid.style.display = 'none';
}

function hideNoResults() {
  noResults.style.display = 'none';
  eventsGrid.style.display = 'grid';
} 