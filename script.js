// ===================================
// NAVIGATION & CORE
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenus = document.querySelectorAll('.nav-menu'); // Changed to querySelectorAll
    const navLinks = document.querySelectorAll('.nav-link');

    // ===================================
    // TEASER CONFIGURATION
    // ===================================
    // Mettre à false pour tout afficher, true pour flouter
    const TEASER_MODE = true;

    if (TEASER_MODE) {
        document.body.classList.add('teaser-mode');
    }

    if (navToggle && navMenus.length > 0) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenus.forEach(menu => menu.classList.toggle('active')); // Toggle for all menus
            document.body.style.overflow = navToggle.classList.contains('active') ? 'hidden' : '';
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle?.classList.remove('active');
            navMenus.forEach(menu => menu.classList.remove('active')); // Remove for all menus
            document.body.style.overflow = '';
        });
    });

    // Stats Animation removed as per request

    // Modal Handling
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.closest('.close-modal')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // City Click Listeners
    const cities = document.querySelectorAll('.clickable-city');
    cities.forEach(city => {
        city.style.cursor = 'pointer'; // Ensure pointer
        city.addEventListener('click', (e) => {
            e.preventDefault();
            const name = city.getAttribute('data-city');
            if (name) openCityModal(name);
        });
    });
});

// ===================================
// CITY DATA & MODAL
// ===================================
const cityData = {
    "Le Creusot": {
        img: "images/creusot.jpg",
        title: "Le Creusot",
        text: "Ville industrielle historique, Le Creusot est célèbre pour son passé lié à la métallurgie et aux Schneider. Aujourd'hui, elle est un pôle d'enseignement supérieur et d'industrie de pointe, nichée dans un écrin de verdure."
    },
    "Digoin": {
        img: "images/digoin.jpg",
        title: "Digoin",
        text: "Située au confluent de la Loire, de l'Arroux et du canal du Centre, Digoin est la cité de l'eau et de la céramique. Son pont-canal franchissant la Loire est un chef-d'œuvre architectural incontournable."
    },
    "Saint-Vallier": {
        img: "images/saintvallier.jpg",
        title: "Saint-Vallier",
        text: "Commune dynamique du bassin minier, Saint-Vallier offre un cadre de vie agréable avec ses nombreux parcs et ses infrastructures sportives de qualité, au cœur du territoire de la CUCM."
    },
    "Chardonnay": {
        img: "images/chardonnay.jpg",
        title: "Chardonnay",
        text: "Village viticole mondialement connu qui a donné son nom au célèbre cépage blanc. Ses collines vallonnées offrent des paysages typiques de la Bourgogne du Sud et des vins d'exception."
    },
    "Pierre-de-Bresse": {
        img: "images/pierredebresse.jpg",
        title: "Pierre-de-Bresse",
        text: "Célèbre pour son château du XVIIe siècle qui abrite l'Écomusée de la Bresse bourguignonne, Pierre-de-Bresse est une étape culturelle majeure de la plaine de la Bresse."
    }
};

function openCityModal(cityName) {
    const modal = document.querySelector('.modal');
    if (!modal) return;

    const modalImg = modal.querySelector('.modal-img');
    const modalTitle = modal.querySelector('.modal-body h2');
    const modalText = modal.querySelector('.modal-body p');

    const data = cityData[cityName] || {
        img: "images/hero.png",
        title: cityName,
        text: "Découvrez cette charmante commune de Saône-et-Loire, étape clé de notre épreuve cycliste."
    };

    if (modalImg) modalImg.src = data.img;
    if (modalTitle) modalTitle.innerText = data.title;
    if (modalText) modalText.innerText = data.text;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ===================================
// SCROLL EFFECTS
// ===================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.style.opacity = window.scrollY > 100 ? '0' : '1';
    }
});

// Hello Message
console.log('%c🚴 Circuit de Saône-et-Loire 🚴', 'font-size: 20px; font-weight: bold; color: #C2945D;');
