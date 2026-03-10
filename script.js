// ===================================
// PRELOADER
// ===================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 500); // Small delay for smooth feel
    }
});

// ===================================
// NAVIGATION & CORE
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // ===================================
    // CONFIGURATION & GESTION MAINTENANCE
    // ===================================
    // Mettre à true pour activer la page d'attente, false pour le site normal
    const MAINTENANCE_MODE = false;

    // Mettre à false pour tout afficher, true pour flouter les équipes (mode teaser)
    const TEASER_MODE = true;

    if (MAINTENANCE_MODE) {
        document.body.classList.add('in-maintenance');
        injectMaintenanceOverlay();
        startMaintenanceCountdown();
        return; // Arrete l'exécution du reste du script
    }

    if (TEASER_MODE) {
        document.body.classList.add('teaser-mode');
    }

    const navToggle = document.querySelector('.nav-toggle');
    const navMenus = document.querySelectorAll('.nav-menu'); // Changed to querySelectorAll
    const navLinks = document.querySelectorAll('.nav-link');



    const navbar = document.querySelector('.navbar');
    if (navToggle && navMenus.length > 0 && navbar) {
        navToggle.addEventListener('click', () => {
            const isActive = !navToggle.classList.contains('active');
            navToggle.classList.toggle('active');
            navbar.classList.toggle('nav-active');
            navMenus.forEach(menu => menu.classList.toggle('active'));
            document.body.style.overflow = isActive ? 'hidden' : '';
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle?.classList.remove('active');
            navbar?.classList.remove('nav-active');
            navMenus.forEach(menu => menu.classList.remove('active'));
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

    // ===================================
    // COUNTDOWN TIMER
    // ===================================
    const countdownTimer = document.getElementById('countdown-timer');
    if (countdownTimer) {
        const targetDate = new Date('2026-05-08T13:30:00').getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                countdownTimer.innerHTML = "LA COURSE A COMMENCÉ !";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Format desired: J-130   21h 34min 24sec
            countdownTimer.innerHTML = `<span class="text-primary">J-${days}</span> &nbsp;&nbsp; ${hours}h ${minutes}min ${seconds}sec`;
        };

        setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    // Initialize Floating Ad
    setTimeout(initFloatingAd, 5000);
});

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

// ===================================
// CITY DATA & MODAL
// ===================================
const cityData = {
    "Le Creusot": {
        img: "images/creusot.jpg",
        title: "Le Creusot",
        text: "Le Creusot mondialement réputée pour son industrialisation dans la sidérurgie (Industeel), le nucléaire (Framatome), le Ferroviaire (Alstom) et l’aéronautique (Safran). Le Creusot n’en demeure pas moins une ville verte avec ses nombreux parcs et jardins : le Parc de la Verrerie et son Château ainsi que le Parc des Combes, désigné 2ème destination touristique du département (71) grâce à sa vingtaine d’attractions. La culture est omniprésente avec deux festivals au cours de l’été et des parcours d’art urbain à travers la ville. Le Creusot est également une ville étudiante, abritant le 2ème pôle universitaire de Bourgogne et des formations de haut niveau dont certains cursus internationaux."
    },
    "Digoin": {
        img: "images/digoin.jpg",
        title: "Digoin",
        text: "Au cœur du Charolais, aux portes de la Bourgogne du Sud, à la frontière entre Allier et Saône-et-Loire, Digoin vit et revit grâce à son âme généreuse, son riche passé et sa situation géographique privilégiée.<br><br>Digoin, c’est d’abord un carrefour fluvial. L’eau est omniprésente, à tel point qu’on ne peut gagner le cœur même de la cité sans traverser un pont. Une spécificité qui vaut à cette ville le surnom « d’île Charolaise ». Bordée par la Loire, Digoin s’impose comme un point de passage incontournable dès l’époque gallo-romaine. Haut-lieu du transit de marchandises, la cité est au Moyen-âge une petite bourgade habitée par des paysans et des mariniers. Les canaux construits au XIXème siècle permettent son développement, une nouvelle activité apparaît : la céramique. C’est l’époque des cités ouvrières et d’une vie quotidienne rythmée au son des sirènes des usines. Aujourd’hui, la Loire et les canaux se savourent par le biais d’une promenade dominicale sur les quais ou d’une sortie vélo en famille sur les voies vertes.<br><br>Digoin, c’est aussi une population généreuse et solidaire, des valeurs fortes issues de la tradition ouvrière. Une culture du partage, une célébration de la mixité qui nourrissent aujourd’hui encore l’important tissu associatif, les nombreux clubs sportifs et les incontournables évènements, organisés par des bénévoles, qui rythment notre vie locale tout au long de l’année. Cette culture de l’accueil et de la convivialité sont des atouts indéniables pour amorcer avec humanité les défis de demain.<br><br>Digoin enfin, c’est une promesse d’avenir. Après une période de mutation de son industrie, la cité ligérienne a de beaux jours devant elle. L’arrivée de l’autoroute A79 aux portes de la commune, le développement économique toujours plus prometteur dessine une petite ville à taille humaine où il y fait bon vivre, travailler… et se divertir ! N’oublions pas notre saison estivale et touristique : avec ses 50 évènements, marchés nocturnes et autres bars éphémères en bord de Loire. Une véritable vitrine du dynamisme retrouvé de notre cité.<br><br>Vous l’avez compris, Digoin c’est un cadre naturel préservé, une population accueillante et une offre de services en constante évolution.<br><br><b>Infos pratiques :</b><br>🌐 Site : <a href='https://www.digoin.fr' target='_blank' style='color: var(--primary-color);'>digoin.fr</a><br>🔵 Facebook : ville de Digoin<br>📷 Insta : villededigoin<br>🔴 Youtube : ville de Digoin"
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

    if (modalImg) {
        modalImg.src = data.img;
        modalImg.classList.remove('is-logo');
    }
    if (modalTitle) modalTitle.innerText = data.title;
    if (modalText) modalText.innerHTML = data.text;

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

    if (modalImg) {
        modalImg.src = "images/jaune-evenements.png";
        modalImg.classList.add('is-logo');
    }
    if (modalTitle) modalTitle.innerText = "JAUNE Événements";
    if (modalText) modalText.innerText = "L’association JAUNE Événements, est un club cycliste fondé en 2025 et affilié à la Fédération Française de Cyclisme. L'association loi 1901 rassemble des passionnés de vélo sous toutes ses formes et dévoués à la promotion de ce sport en Bourgogne. Outre la pratique régulière du cyclisme entre amis, l’association à plusieurs objectifs : organiser des manifestations sportives, telles que le Circuit Cycliste de Saône-et-Loire. Le but étant de conserver cette course historique dans le calendrier élite français et le vélo de haute compétition dans notre département. Organiser des manifestation extra-sportives dans le but de promouvoir plusieurs pratiques sportives, de soutenir la formation et le développement de jeunes talents, la pratique de compétitions, la promotion des déplacements doux, le sport tourisme et la promotion des lieux où les manifestations se déroulent. Enfin, l’ambition de JAUNE Evénements est également de pouvoir offrir une partie des bénéfices générés par ses organisations, à des associations caritatives, actions de solidarité ou à des œuvres d’intérêt public.";

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ===================================
// GESTION MAINTENANCE
// ===================================
function injectMaintenanceOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'maintenance-overlay';
    overlay.innerHTML = `
        <div class="maintenance-content">
            <img src="images/generique-bleu.png" alt="Circuit Saône & Loire" class="maintenance-logo-img">
            <h1 class="maintenance-title">Site en <span class="text-primary">construction</span></h1>
            
            <h3 class="maintenance-countdown-title">Départ dans :</h3>
            <div class="maintenance-timer">
                <div class="maintenance-time-unit">
                    <span id="m-days" class="maintenance-time-value">00</span>
                    <span class="maintenance-time-label">Jours</span>
                </div>
                <div class="maintenance-time-unit">
                    <span id="m-hours" class="maintenance-time-value">00</span>
                    <span class="maintenance-time-label">Heures</span>
                </div>
                <div class="maintenance-time-unit">
                    <span id="m-mins" class="maintenance-time-value">00</span>
                    <span class="maintenance-time-label">Minutes</span>
                </div>
                <div class="maintenance-time-unit">
                    <span id="m-secs" class="maintenance-time-value">00</span>
                    <span class="maintenance-time-label">Secondes</span>
                </div>
            </div>

            <p class="maintenance-text">Nous préparons quelque chose de grand pour l'édition 2026. <br><span class="highlight-text">Nous lançons le site officiel à J-71 !</span></p>
            
            <div class="maintenance-socials">
                <a href="https://www.facebook.com/lecircuitdeSaoneetLoire" target="_blank" title="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="https://www.instagram.com/lecircuitdesaoneetloire/" target="_blank" title="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="https://www.youtube.com/@LECIRCUITDESAONELOIRE-qe6rf" target="_blank" title="YouTube"><i class="fab fa-youtube"></i></a>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

function startMaintenanceCountdown() {
    const targetDate = new Date('2026-05-08T13:30:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) return;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const dEl = document.getElementById('m-days');
        const hEl = document.getElementById('m-hours');
        const mEl = document.getElementById('m-mins');
        const sEl = document.getElementById('m-secs');

        if (dEl) dEl.innerText = days.toString().padStart(2, '0');
        if (hEl) hEl.innerText = hours.toString().padStart(2, '0');
        if (mEl) mEl.innerText = minutes.toString().padStart(2, '0');
        if (sEl) sEl.innerText = seconds.toString().padStart(2, '0');
    };

    setInterval(updateCountdown, 1000);
    updateCountdown();
}

// ===================================
// FLOATING AD (CYCLO BERNARD THEVENET)
// ===================================
function initFloatingAd() {
    // Generate Widget
    const widget = document.createElement('div');
    widget.className = 'ad-floating-widget';
    widget.innerHTML = `
        <span class="ad-widget-close">&times;</span>
        <img src="images/bandeau-3/LOGOCyclo.jpg" alt="Cyclo Bernard Thévenet" class="ad-widget-img">
        <div class="ad-widget-content">
            <h4>La Cyclo Bernard THEVENET</h4>
            <button class="ad-widget-btn">Découvrir</button>
        </div>
    `;
    document.body.appendChild(widget);

    // Show with animation
    setTimeout(() => widget.classList.add('active'), 100);

    // Close listener
    widget.querySelector('.ad-widget-close').addEventListener('click', () => {
        widget.classList.remove('active');
        setTimeout(() => widget.remove(), 600);
    });

    // Open Modal listener
    widget.querySelector('.ad-widget-btn').addEventListener('click', () => {
        openAdModal();
        widget.classList.remove('active');
    });
}

function openAdModal() {
    const modal = document.querySelector('.modal');
    if (!modal) return;

    const modalImg = modal.querySelector('.modal-img');
    const modalTitle = modal.querySelector('.modal-body h2');
    const modalText = modal.querySelector('.modal-body p');

    if (modalImg) {
        modalImg.src = "images/bandeau-3/LOGOCyclo.jpg";
        modalImg.classList.add('is-logo');
        modalImg.style.padding = "20px";
    }

    if (modalTitle) modalTitle.innerText = "La Cyclo Bernard THEVENET";

    if (modalText) {
        modalText.innerHTML = `
            <p style="color: var(--primary-color); font-weight: 700; font-size: 1.2rem; margin-bottom: 5px;">Samedi 30 mai 2026 à Vitry-en-Charollais</p>
            <p style="font-weight: 600; font-style: italic; margin-bottom: 20px;">Sur les routes d’un Champion !</p>
            
            <p>L’épreuve se déroule au cœur du bocage du Charolais/Brionnais, sur des routes vallonnées caractéristiques de la région : paysages verdoyants, bosses régulières, faible circulation, loin des centres urbanisés et sur les routes d’entraînement historiques où Bernard Thévenet a forgé ses qualités de grimpeur.</p>
            
            <p><b>3 parcours sont proposés</b> au départ de Vitry-en-Charollais.</p>
            
            <p>L’évènement propose aussi une dimension conviviale et gastronomique avec un repas d’après-course autour de produits AOP locaux (pavé de bœuf et fromage de chèvre). Un moment de partage qui prolonge parfaitement l’effort et ancre encore davantage l’épreuve dans son territoire.</p>
            
            <div style="margin-top: 30px; text-align: center;">
                <a href="https://www.labernardthevenet.fr" target="_blank" class="btn btn-primary">
                    <i class="fas fa-external-link-alt"></i> Plus d’informations & Inscriptions
                </a>
            </div>
        `;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Hello Message
console.log('%c🚴 Circuit de Saône-et-Loire 🚴', 'font-size: 20px; font-weight: bold; color: #C2945D;');
