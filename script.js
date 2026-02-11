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
        text: "Nichée au cœur de la Bourgogne, Le Creusot est une ville au patrimoine industriel exceptionnel. Berceau de l'empire Schneider, elle a façonné l'histoire de la métallurgie française. Aujourd'hui, cette cité dynamique conjugue héritage historique et modernité, avec son château de la Verrerie, ses équipements sportifs de premier plan et son cadre naturel préservé. Ville de départ emblématique, Le Creusot offre aux coureurs un tremplin idéal vers l'aventure cycliste."
    },
    "Digoin": {
        img: "images/digoin.jpg",
        title: "Digoin",
        text: "Au confluent de la Loire, de l'Arroux et du canal du Centre, Digoin est la cité de l'eau par excellence. Son majestueux pont-canal, chef-d'œuvre d'architecture du XIXe siècle, enjambe la Loire sur 243 mètres. Capitale de la céramique, la ville perpétue un savoir-faire artisanal séculaire. Entre patrimoine fluvial, traditions artisanales et douceur de vivre bourguignonne, Digoin accueille les coureurs dans un écrin de charme et d'authenticité."
    },
    "Saint-Vallier": {
        img: "images/saintvallier.jpg",
        title: "Saint-Vallier",
        text: "Commune dynamique du bassin minier montcellien, Saint-Vallier incarne la reconversion réussie d'un territoire industriel. Dotée d'infrastructures sportives modernes et de nombreux espaces verts, la ville offre un cadre de vie agréable à ses habitants. Son tissu associatif vivant et son engagement dans le sport en font une ville d'arrivée parfaite pour célébrer l'effort des coureurs et la passion du cyclisme."
    },
    "Chardonnay": {
        img: "images/chardonnay.jpg",
        title: "Chardonnay",
        text: "Village viticole de renommée mondiale, Chardonnay a donné son nom au cépage blanc le plus célèbre de la planète. Perché sur les coteaux du Mâconnais, ce joyau bourguignon offre des panoramas à couper le souffle sur les vignobles dorés. Entre tradition viticole millénaire, patrimoine architectural préservé et paysages vallonnés, Chardonnay propose aux coureurs un parcours exigeant dans un décor de carte postale, où chaque virage révèle la beauté de la Bourgogne du Sud."
    },
    "Pierre-de-Bresse": {
        img: "images/pierredebresse.jpg",
        title: "Pierre-de-Bresse",
        text: "Capitale de la Bresse bourguignonne, Pierre-de-Bresse rayonne autour de son magnifique château du XVIIe siècle qui abrite l'Écomusée de la Bresse. Cette étape culturelle majeure permet de découvrir l'architecture bressane typique, les traditions rurales et l'art de vivre bressan. Entre bocages verdoyants, fermes à pans de bois et patrimoine préservé, Pierre-de-Bresse offre aux coureurs une traversée bucolique au cœur d'un terroir d'exception."
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
