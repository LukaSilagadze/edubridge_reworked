document.addEventListener('DOMContentLoaded', function() {
    // Burger Menu Functionality
    const burgerMenu = document.getElementById('burgerMenu');
    const nav = document.querySelector('.nav');
    
    burgerMenu.addEventListener('click', function() {
        burgerMenu.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!burgerMenu.contains(event.target) && !nav.contains(event.target)) {
            burgerMenu.classList.remove('active');
            nav.classList.remove('active');
        }
    });
    
    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav_a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            burgerMenu.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    const activityCards = [
        {
            id: 1,
            title: "ნიუ იორკის საერთაშორისო გაეროს მოდელირება",
            age: "13-24",
            location: "ნიუ იორკი, აშშ",
            image: "munnyc2025.png",
            badge: "ახალი",
            link: "https://forms.gle/GHzuzQ1E4bY356cy6",
        },
        {
            id: 2,
            title: "პროგრამირება სკოლის პარალელურად",
            age: "14-17 წლამდე",
            location: "თბილისი, საქართველო",
            image: "ItStep_1.png",
            badge: "",
            link: "https://ge.itstep.org/p-ropesia-sk-olis-p-aralelurad#program_learning",
        },
        {
            id: 3,
            title: "სამთო სათხილამურო კლუბი იქსტრიმი",
            age: "6-14 წლის",
            location: "ბაკურიანი, საქართველო",
            image: "Xtreme.jpg",
            badge: "",
            link: "https://forms.gle/Xnrae5GYvUVmptsU9",
        },
    ];

    const cardList = document.getElementById("activity_div_cards");

    activityCards.forEach((activity) => {
        const card = document.createElement("article");
        card.className = "activity_card";
        card.innerHTML = `
            <div class="activity-image">
                <img src="./images/${activity.image}" alt="${activity.title}" loading="lazy">
                ${activity.badge ? `<span class="activity-badge">${activity.badge}</span>` : ""}
            </div>
            <div class="activity-content">
                <h3 class="activity-title">${activity.title}</h3>
                <div class="activity-meta">
                    <div class="activity-meta-item">
                        <i class="fas fa-graduation-cap"></i>
                        <span>ასაკი: ${activity.age}</span>
                    </div>
                    <div class="activity-meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${activity.location}</span>
                    </div>
                </div>
                <div class="activity-actions">
                    <a href="#" class="activity-btn details-btn">დეტალები</a>
                    <a href="${activity.link}" target="_blank" class="activity-btn register-btn">რეგისტრაცია</a>
                </div>
            </div>
        `;
        cardList.appendChild(card);
    });
});