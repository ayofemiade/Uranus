// Sample property data (in a real application, this would come from a backend API)
const properties = [
    { id: 1, title: "Cozy Apartment", type: "apartment", price: 150000, image: "https://via.placeholder.com/300x200.png?text=Apartment" },
    { id: 2, title: "Spacious House", type: "house", price: 350000, image: "https://via.placeholder.com/300x200.png?text=House" },
    { id: 3, title: "Modern Condo", type: "condo", price: 250000, image: "https://via.placeholder.com/300x200.png?text=Condo" },
    // Add more properties as needed
];

// Sample team member data
const teamMembers = [
    { name: "John Doe", role: "CEO", image: "https://via.placeholder.com/150x150.png?text=John" },
    { name: "Jane Smith", role: "Senior Agent", image: "https://via.placeholder.com/150x150.png?text=Jane" },
    { name: "Mike Johnson", role: "Property Manager", image: "https://via.placeholder.com/150x150.png?text=Mike" },
];

// Function to create a property card
function createPropertyCard(property) {
    return `
        <div class="property">
            <img src="${property.image}" alt="${property.title}">
            <div class="property-info">
                <h3>${property.title}</h3>
                <p>Type: ${property.type}</p>
                <p>Price: $${property.price.toLocaleString()}</p>
                <a href="property-details.html?id=${property.id}" class="btn">View Details</a>
            </div>
        </div>
    `;
}

// Function to display properties
function displayProperties(propertiesArray) {
    const propertyList = document.getElementById('property-list');
    if (propertyList) {
        propertyList.innerHTML = propertiesArray.map(createPropertyCard).join('');
    }

    const featuredProperties = document.querySelector('#featured-properties .property-grid');
    if (featuredProperties) {
        featuredProperties.innerHTML = propertiesArray.slice(0, 3).map(createPropertyCard).join('');
    }
}

// Function to display team members
function displayTeamMembers() {
    const teamMembersContainer = document.getElementById('team-members');
    if (teamMembersContainer) {
        teamMembersContainer.innerHTML = teamMembers.map(member => `
            <div class="team-member">
                <img src="${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.role}</p>
            </div>
        `).join('');
    }
}

// Function to display property details
function displayPropertyDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = parseInt(urlParams.get('id'));
    const property = properties.find(p => p.id === propertyId);

    if (property) {
        const propertyDetails = document.getElementById('property-details');
        propertyDetails.innerHTML = `
            <h2>${property.title}</h2>
            <img src="${property.image}" height="300">
            <p>Type: ${property.type}</p>
            <p>Price: $${property.price.toLocaleString()}</p>
            <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        `;
    }
}

// Event listener for form submission
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your message. We will get back to you soon!');
            contactForm.reset();
        });
    }

    // Initialize page content
    displayProperties(properties);
    displayTeamMembers();
    displayPropertyDetails();

    // Add event listeners for property filters
    const searchInput = document.getElementById('search');
    const typeSelect = document.getElementById('property-type');
    const priceSelect = document.getElementById('price-range');

    if (searchInput && typeSelect && priceSelect) {
        [searchInput, typeSelect, priceSelect].forEach(element => {
            element.addEventListener('change', filterProperties);
        });
    }
});

// Function to filter properties
function filterProperties() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const selectedType = document.getElementById('property-type').value;
    const selectedPrice = document.getElementById('price-range').value;

    const filteredProperties = properties.filter(property => {
        const matchesSearch = property.title.toLowerCase().includes(searchTerm);
        const matchesType = selectedType === '' || property.type === selectedType;
        const matchesPrice = selectedPrice === '' || isPriceInRange(property.price, selectedPrice);
        return matchesSearch && matchesType && matchesPrice;
    });

    displayProperties(filteredProperties);
}

// Helper function to check if a price is in the selected range
function isPriceInRange(price, range) {
    const [min, max] = range.split('-').map(Number);
    return price >= min && (max ? price <= max : true);
}




document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });



    // Mobile Menu Toggle
    const menuToggle = document.createElement('button');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = `
         <span class="bar"></span>
         <span class="bar"></span>
         <span class="bar"></span>
     `;

    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');

    // Insert menu toggle button before nav links
    nav.insertBefore(menuToggle, navLinks);

    menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const contactButton = document.getElementById('contact-agent');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            mainImage.src = this.src;
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    contactButton.addEventListener('click', function () {
        alert('Thank you for your interest! An agent will contact you shortly.');
    });




});












