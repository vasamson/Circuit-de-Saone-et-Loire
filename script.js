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

    // Jaune Événement Logo Click Listener
    const jauneLogo = document.querySelector('.clickable-jaune-logo');
    if (jauneLogo) {
        jauneLogo.addEventListener('click', (e) => {
            e.preventDefault();
            openJauneEventModal();
        });
    }
});

// ===================================
// CITY DATA & MODAL
// ===================================
const cityData = {
    "Le Creusot": {
        img: "images/creusot.jpg",
        title: "Le Creusot",
        text: "Ville Grand-Départ du Circuit. Le Creusot mondialement réputée pour son industrialisation dans la sidérurgie (Industeel), le nucléaire (Framatome), le Ferroviaire (Alstom) et l’aéronautique (Safran)."
    },
    "Digoin": {
        img: "images/digoin.jpg",
        title: "Digoin",
        text: "Ville Départ. Digoin, qui doit avant tout sa réputation et son histoire à la qualité du travail de ses faïenciers depuis plusieurs siècles. Mais Digoin c’est aussi une notoriété due au tourisme lié au canal du centre et au canal latéral à la Loire, avec notamment son illustre pont canal de 243 m de long, véritable prouesse architecturale qui enjambe la Loire."
    },
    "Saint-Vallier": {
        img: "images/saintvallier.jpg",
        title: "Saint-Vallier",
        text: "Ville Arrivée. Saint-Vallier qui, avec ses 24,21 km2, est l’une des plus vastes communes urbanisées de France. Ses multiples infrastructures permettent d’y pratiquer de nombreux sports et activités dont l’une d’entre elles est unique en Saône-et-Loire, l’École de Cirque Gus Circus."
    },
    "Chardonnay": {
        img: "images/chardonnay.jpg",
        title: "Chardonnay",
        text: "Ville Départ et Arrivée. Chardonnay connue pour ses vins blancs dont le célèbre cépage porte le même nom que celui de la commune, mais aussi pour sa course cycliste historique, là où Bernard Hinault s’imposait il y a 50 ans avant de devenir, le célèbre champion que l’on connait aujourd’hui (quintuple vainqueur du Tour de France et un palmarès exceptionnel)."
    },
    "Pierre-de-Bresse": {
        img: "images/pierredebresse.jpg",
        title: "Pierre-de-Bresse",
        text: "Ville Arrivée. Pierre-de-Bresse connue pour son château du 17ème siècle classé monument historique et qui abrite actuellement l’écomusée de la Bresse."
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
// JAUNE ÉVÉNEMENT MODAL
// ===================================
function openJauneEventModal() {
    const modal = document.querySelector('.modal');
    if (!modal) return;

    const modalImg = modal.querySelector('.modal-img');
    const modalTitle = modal.querySelector('.modal-body h2');
    const modalText = modal.querySelector('.modal-body p');

    if (modalImg) modalImg.src = "images/ Picto_JauneEvenements.png";
    if (modalTitle) modalTitle.innerText = "JAUNE Événements";
    if (modalText) modalText.innerText = "JAUNE Événements est l'association organisatrice du Circuit de Saône-et-Loire. Créée en 1965, cette association loi 1901 rassemble des passionnés de cyclisme dévoués à la promotion de ce sport en Bourgogne. Chaque année, bénévoles et organisateurs œuvrent avec passion pour faire vivre cette épreuve historique et offrir aux coureurs un événement d'exception.";

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
