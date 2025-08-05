// Events Page JavaScript

// Sample events data
const eventsData = [
  {
    id: 1,
    title: "ნიუ იორკის საერთაშორისო გაეროს მოდელირება",
    category: "mun",
    subject: "debate",
    age: "13-24",
    location: "ნიუ იორკი, აშშ",
    date: "2025-10-15",
    description: "ნიუ იორკის საერთაშორისო გაეროს მოდელირება",
    image: "./images/munnyc2025.png",
    status: "closed",
    participants: 150,
    maxParticipants: 200,
    organizer: {
      name: "Gmuna",
      logo: "./images/gmuna.jpg"
    }
  },
  {
    id: 2,
    title: "ისტორიული კრიზისების კომიტეტის სიმულაცია",
    category: "mun",
    subject: "debate",
    age: "14-25",
    location: "თილისი, საქართველო",
    date: "12-16 აგვისტო",
    description: "ისტორიული კრიზისების კომიტეტის სიმულაცია",
    image: "./images/HccSimulation2025.png",
    status: "closed",
    participants: 80,
    maxParticipants: 100,
    organizer: {
      name: "Gmuna",
      logo: "./images/gmuna.jpg"
    }
  },
  {
    id: 3,
    title: "SDG საზაფხულო ბანაკი ბაკურიანში",
    category: "camp",
    subject: "SDG",
    age: "14-25",
    location: "ბაკურიანი, საქართველო",
    date: "12-16 აგვისტო",
    description: "SDG საზაფხულო ბანაკი ბაკურიანში",
    image: "./images/SDGCampBakuriani.png",
    status: "closed",
    participants: 25,
    maxParticipants: 30,
    organizer: {
      name: "Gmuna",
      logo: "./images/gmuna.jpg"
    }
  },
  {
    id: 4,
    title: "ლოგოსის საზაფხულო სკოლა ლისზე",
    category: "camp",
    subject: "საზაფხულო სკოლა",
    age: "5-12 წლამდე",
    location: "თბილისი, საქართველო",
    date: "12-16 აგვისტო",
    description: "ლოგოსის საზაფხულო სკოლა ლისზე",
    image: "./images/gardening.png",
    status: "open",
    participants: 25,
    maxParticipants: 30,
    organizer: {
      name: "ლოგოსი",
      logo: "./images/logosi.jpg"
    }
  },
  {
    id: 5,
    title: "ახალგაზრდობის ხმა",
    category: "workshops",
    subject: "დებატები",
    age: "14-29",
    location: "თბილისი, საქართველო",
    date: "12-16 აგვისტო",
    description: "ახალგაზრდობის ხმა",
    image: "./images/debate1.jpg",
    status: "open",
    participants: 25,
    maxParticipants: 30,
    organizer: {
      name: "GIDE",
      logo: "./images/GIDE.png"
    }
  },
  {
    id: 6,
    title: "პროგრამირება სკოლის პარალელურად",
    category: "course",
    subject: "პროგრამირება",
    age: "14-17 წლამდე",
    location: "თბილისი, საქართველო",
    date: "2024-03-25",
    description: "ItStep Academy",
    image: "./images/ItStep_1.png",
    status: "open",
    participants: 25,
    maxParticipants: 30,
    organizer: {
      name: "ItStep Academy",
      logo: "./images/it-step.png"
    }
  },
  {
    id: 7,
    title: "Junior IT აკადემია",
    category: "course",
    subject: "პროგრამირება",
    age: "9-13 წელი",
    location: "თბილისი, საქართველო",
    date: "2024-03-25",
    description: "ItStep Academy",
    image: "./images/ItStep_2.png",
    status: "open",
    participants: 25,
    maxParticipants: 30,
    organizer: {
      name: "ItStep Academy",
      logo: "./images/it-step.png"
    }
  },
  {
    id: 8,
    title: "გრაფიკული დიზაინი სკოლის პარალელურად",
    category: "course",
    subject: "გრაფიკული დიზაინი",
    age: "14-17 წლამდე",
    location: "თბილისი, საქართველო",
    date: "2024-03-25",
    description: "ItStep Academy",
    image: "./images/ItStep_3.png",
    status: "open",
    participants: 25,
    maxParticipants: 30,
    organizer: {
      name: "ItStep Academy",
      logo: "./images/it-step.png"
    }
  },
  {
    id: 9,
    title: "სამთო სათხილამურო კლუბი იქსტრიმი",
    category: "camp",
    subject: "ბანაკი",
    age: "6-14 წლის",
    location: "ბაკურიანი, საქართველო",
    date: "12-16 აგვისტო",
    description: "სამთო სათხილამურო კლუბი იქსტრიმი",
    image: "./images/Xtreme.jpg",
    status: "open",
    participants: 25,
    maxParticipants: 30,
    organizer: {
      name: "იქსტრიმი",
      logo: "./images/Xtreme.jpg"
    }
  },
  {
    id: 10,
    title: "International Education Fair LEAF Tbilisi / Batumi",
    category: "fair",
    subject: "სამსახური",
    age: "14-25",
    location: "თბილისი, საქართველო",
    date: "12-16 აგვისტო",
    description: "განათლების საერთაშორისო გამოფენა",
    image: "./images/leaf_1.png",
    status: "open",
    participants: 25,
    maxParticipants: 30,
    organizer: {
      name: "იქსტრიმი",
      logo: "./images/LEAF.jpg"
    }
  },
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

        ${event.organizer ? `
          <div class="event_organizer">
            <img src="${event.organizer.logo}" alt="${event.organizer.name}" class="organizer_logo">
            <span class="organizer_name">${event.organizer.name}</span>
          </div>
        ` : ''}
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