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
    const TEASER_MODE = false;

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

    // Jersey Click Listeners
    const jerseys = document.querySelectorAll('.clickable-jersey');
    jerseys.forEach(jersey => {
        jersey.addEventListener('click', (e) => {
            e.preventDefault();
            const name = jersey.getAttribute('data-jersey');
            if (name) openJerseyModal(name);
        });
    });

    // Jaune Événement Logo Click Listener
    const jauneLogos = document.querySelectorAll('.clickable-jaune-logo');
    jauneLogos.forEach(logo => {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            openJauneEventModal();
        });
    });

    // Gallery Photo Click Listeners (Popup Lightbox)
    const galleryPhotos = document.querySelectorAll('.photo-palette .photo-item img');
    galleryPhotos.forEach(photo => {
        photo.style.cursor = 'pointer';
        photo.addEventListener('click', () => {
            openGalleryModal(photo.src, photo.alt || "Photo Circuit Saône-et-Loire");
        });
    });

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

    // Initialize Floating Ad (Home page only)
    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '';
    if (isHomePage) {
        setTimeout(initFloatingAd, 5000);
    }

    // ===================================
    // TABS SYSTEM (Photos Page)
    // ===================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length > 0) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');

                // Remove active class from all buttons and contents
                tabButtons.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked button and target content
                btn.classList.add('active');
                const targetContent = document.getElementById(tabId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
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
        text: "Au cœur du Charolais, aux portes de la Bourgogne du Sud, à la frontière entre Allier et Saône-et-Loire, Digoin vit et revit grâce à son âme généreuse, son riche passé et sa situation géographique privilégiée. Digoin, c’est d’abord un carrefour fluvial. L’eau est omniprésente, à tel point qu’on ne peut gagner le cœur même de la cité sans traverser un pont. Les canaux construits au XIXème siècle permettent son développement, une nouvelle activité apparaît : la céramique. Aujourd’hui, la Loire et les canaux se savourent par le biais d’une promenade dominicale sur les quais ou d’une sortie vélo en famille sur les voies vertes. Après une période de mutation de son industrie, la cité ligérienne a de beaux jours devant elle. L’arrivée de l’autoroute A79 aux portes de la commune, le développement économique toujours plus prometteur dessine une petite ville à taille humaine où il y fait bon vivre, travailler... et se divertir ! N’oublions pas notre saison estivale et touristique : avec ses 50 évènements, marchés nocturnes et autres bars éphémères en bord de Loire. Vous l’avez compris, Digoin c’est un cadre naturel préservé, une population accueillante et une offre de services en constante évolution.<br><br><b>Infos pratiques :</b><br>🌐 Site : <a href='https://www.digoin.fr' target='_blank' style='color: var(--primary-color);'>digoin.fr</a><br>🔵 Facebook : ville de Digoin<br>📷 Insta : villededigoin<br>🔴 Youtube : ville de Digoin"
    },
    "Saint-Vallier": {
        img: "images/saintvallier.jpg",
        title: "Saint-Vallier",
        text: "À proximité immédiate de la Route des Grands Vins et au cœur d’un territoire riche en patrimoine, Saint-Vallier offre aux visiteurs une parenthèse faite d’authenticité, de nature et de convivialité, elle est un point de départ idéal pour les amateurs de promenade et de nature.<br><br>Les cyclistes apprécieront particulièrement les itinéraires doux reliant la commune aux paysages emblématiques de la Saône-et-Loire, entre collines, vignes et bords de canaux et de rivières.<br><br>Notre Commune est située au cœur de la Saône-et-Loire, en bordure de la Bourbince et de la rivière limace, 7ème ville de Saône-et-Loire et 5ème ville urbanisée la plus étendue de France, Saint-Vallier s’impose comme une commune dynamique où il fait bon vivre, portée par l’énergie de ses associations et de ses habitants dont le nombre avoisine les 8 700.<br><br>Au cœur du quartier « Les Gautherets », la place des Gueules Noires rappelle le passé minier qui a façonné l’âme de Saint-Vallier. Ce lieu emblématique est l’occasion de plonger dans l’histoire locale héritière des “gueules noires”.<br><br>Saint-Vallier propose également de nombreux dispositifs solidaires permettant de lutter contre la précarité, soutenir les familles dans leur quotidien, maintenir et développer l’inclusion des personnes de tout âge en situation de handicap et créer des lieux dynamiques et attractifs pour la jeunesse.<br><br><b>Découvrez la ville :</b><br>• <a href='https://www.facebook.com/saintvallier71?locale=fr_FR' target='_blank'>Facebook - Saint-Vallier 71</a><br>• <a href='https://www.instagram.com/saintvallier71?igsh=OThrZTMza201eTBo' target='_blank'>Instagram - Saint-Vallier 71</a><br>• <a href='https://www.mairie-saintvallier.fr/' target='_blank'>Site internet - Ville de Saint-Vallier 71</a><br><br><b>Animations de l'après-midi :</b><br>• Venez encourager l'association FJEP Guscircus à partir de 14 heures (<a href='https://www.facebook.com/share/14fiFZgejQH/?mibextid=wwXIfr' target='_blank'>Infos</a>)<br>• Partagez une glace ou prendre des rafraîchissements à la buvette tenue par l'Office Municipal des Sports"
    },
    "Chardonnay": {
        img: "images/chardonnay.jpg",
        title: "Chardonnay",
        text: "Chardonnay connue pour ses vins blancs dont le célèbre cépage porte le même nom que celui de la commune, mais aussi pour sa course cycliste historique, là où Bernard Hinault s’imposait il y a 50 ans avant de devenir le célèbre champion que l’on connait aujourd’hui (palmarès exceptionnel & quintuple vainqueur du Tour de France et Champion du Monde à Sallanches, en 1980). Une étape historique à double titre : elle célèbre la victoire du champion breton à Chardonnay et son organisateur Alain Pradier, mais aussi le centenaire de la Cave de Lugny - Chardonnay. Aujourd’hui, la Cave de Lugny exploite près de 1 250 hectares de vignes en appellations d’origine protégée et propose une trentaine de cuvées, principalement en Mâcon blanc, mais aussi en Crémant de Bourgogne, Bourgogne rouge ou Mâcon rouge. Avec 164,6 km et 2468 mètres de dénivelé positif, c’est l’étape reine de cette 54ème édition. Le parcours exigeant traverse le vignoble avec des ascensions redoutables comme le Col des Chèvres et le col de la Croix."
    },
    "Pierre-de-Bresse": {
        img: "images/pierredebresse.jpg",
        title: "Pierre-de-Bresse",
        text: "Pierre-de-Bresse, ville située au nord de la région bressane, à mi-chemin entre Chalon-sur-Saône (40 km) à l'ouest et Dôle et Lons-le-Saunier (40 km) à l'est. Pierre-de-Bresse est connue pour son château du 17ème siècle classé monument historique et qui abrite l’écomusée de la Bresse.<br><br>La ville est jumelée avec Gensingen en Allemagne (Rhénanie-Palatinat). Elle est composée des deux bourgs, le premier celui de la petite ville de Pierre (de Bresse), le principal, qui a fusionné en 1973 avec le petit village de Terrans, situé à 3 km à l'ouest environ de Pierre-de-Bresse même. Celui-ci est beaucoup moins important et compte aujourd'hui environ 250 âmes. La fusion de ces deux communes a permis de maintenir l'apparence d'une stabilité de la population (près de 2000 habitants) alors que celle-ci a diminué de plus de 250 unités en un siècle.<br><br><a href='https://www.pierredebresse.fr' target='_blank' style='color: var(--primary-color);'>🌐 www.pierredebresse.fr</a><br><br><b>Le Château de Pierre-de-Bresse</b><br><br>Ce magnifique château fût construit en 1680 pour Claude de Thyard, comte de Bissy. Situé sur la commune à la sortie du village, en plaine, il fait l’objet de multiples protections au titre des monuments historiques: classements en octobre 1957 et novembre 1997, et inscriptions en juillet 1945 et mai 1996. Le château abrite depuis 1981, l'Écomusée de la Bresse bourguignonne. C’est l'un des quatorze lieux d'exception ouverts au public réunis depuis une vingtaine d'années au sein de « La Route des châteaux en Bourgogne du Sud ».<br><br><a href='https://www.ecomusee-bresse71.fr/musees-et-sites/chateau-pierre-de-bresse-71/' target='_blank' style='color: var(--primary-color);'>🌐 Voir le site de l'Écomusée</a>"
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
        modalImg.classList.remove('is-logo', 'is-jersey');
    }
    if (modalTitle) modalTitle.innerText = data.title;
    if (modalText) modalText.innerHTML = data.text;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ===================================
// JERSEY DATA & MODAL
// ===================================
const jerseyData = {
    "Général": {
        img: "images/Maillots/general.png",
        title: "Maillot Jaune - Classement Général",
        text: "Le maillot iconique qui récompense le leader du classement général de l'épreuve."
    },
    "Sprint": {
        img: "images/Maillots/sprint.png",
        title: "Maillot Vert - Classement par Points",
        text: "Ce maillot distingue le coureur le plus rapide et régulier, leader du classement par points."
    },
    "Montagne": {
        img: "images/Maillots/montagne.png",
        title: "Maillot à Pois - Classement de la Montagne",
        text: "Le maillot destiné au meilleur grimpeur, ayant cumulé le plus de points aux sommets répertoriés."
    },
    "Jeune": {
        img: "images/Maillots/jeune.png",
        title: "Maillot Blanc - Classement du Meilleur Jeune",
        text: "Le maillot blanc récompense le coureur âgé de moins de 23 ans le mieux placé au classement général."
    },
    "Combiné": {
        img: "images/Maillots/region.png",
        title: "Maillot de la Région BFC - Combiné",
        text: "Ce maillot récompense le leader du classement du combiné."
    },
    "Points Chauds": {
        img: "images/Maillots/departement.png",
        title: "Maillot du Département de Saône-et-Loire - Points Chauds",
        text: "Un maillot spécial aux couleurs du département récompensant le vainqueur du classement des points chauds."
    }
};

function openJerseyModal(jerseyName) {
    const modal = document.querySelector('.modal');
    if (!modal) return;

    const modalImg = modal.querySelector('.modal-img');
    const modalTitle = modal.querySelector('.modal-body h2');
    const modalText = modal.querySelector('.modal-body p');

    const data = jerseyData[jerseyName];
    if (!data) return;

    if (modalImg) {
        modalImg.src = data.img;
        modalImg.classList.remove('is-logo');
        modalImg.classList.add('is-jersey');
        modalImg.style.padding = "20px";
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
        modalImg.classList.remove('is-jersey');
    }
    if (modalTitle) modalTitle.innerText = "JAUNE Événements";
    if (modalText) modalText.innerText = "L’association JAUNE Événements, est un club cycliste fondé en 2025 et affilié à la Fédération Française de Cyclisme. L'association loi 1901 rassemble des passionnés de vélo sous toutes ses formes et dévoués à la promotion de ce sport en Bourgogne. Outre la pratique régulière du cyclisme entre amis, l’association à plusieurs objectifs : organiser des manifestations sportives, telles que le Circuit Cycliste de Saône-et-Loire. Le but étant de conserver cette course historique dans le calendrier élite français et le vélo de haute compétition dans notre département. Organiser des manifestation extra-sportives dans le but de promouvoir plusieurs pratiques sportives, de soutenir la formation et le développement de jeunes talents, la pratique de compétitions, la promotion des déplacements doux, le sport tourisme et la promotion des lieux où les manifestations se déroulent. Enfin, l’ambition de JAUNE Evénements est également de pouvoir offrir une partie des bénéfices générés par ses organisations, à des associations caritatives, actions de solidarité ou à des œuvres d’intérêt public.";

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ===================================
// GALLERY MODAL (LIGHTBOX)
// ===================================
function openGalleryModal(src, alt) {
    const modal = document.querySelector('.modal');
    if (!modal) return;

    const modalImg = modal.querySelector('.modal-img');
    const modalTitle = modal.querySelector('.modal-body h2');
    const modalText = modal.querySelector('.modal-body p');

    if (modalImg) {
        modalImg.src = src;
        modalImg.alt = alt;
        modalImg.classList.add('is-gallery-photo');
        modalImg.classList.remove('is-logo', 'is-jersey');
        modalImg.style.padding = "0";
    }

    if (modalTitle) modalTitle.innerText = "";
    if (modalText) modalText.innerText = "";

    // Optional: Hide the modal body for photos
    const modalBody = modal.querySelector('.modal-body');
    if (modalBody) modalBody.style.display = 'none';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Reset modal body when closing
    const closeBtn = modal.querySelector('.close-modal');
    const closeHandler = () => {
        if (modalBody) modalBody.style.display = 'block';
        modalImg.classList.remove('is-gallery-photo');
        closeBtn.removeEventListener('click', closeHandler);
    };
    closeBtn.addEventListener('click', closeHandler, { once: true });
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

            <p class="maintenance-text">Nous préparons quelque chose de grand pour la 54ème édition. <br><span class="highlight-text">Nous lançons le site officiel à J-71 !</span></p>
            
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
// FLOATING AD (LISTE DES ENGAGÉS)
// ===================================
function initFloatingAd() {
    // Generate Widget
    const widget = document.createElement('div');
    widget.className = 'ad-floating-widget';
    widget.innerHTML = `
        <span class="ad-widget-close">&times;</span>
        <img src="images/generique-bleu.png" alt="Engagés" class="ad-widget-img">
        <div class="ad-widget-content">
            <h4>Liste des Engagés Disponible !</h4>
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
        modalImg.src = "images/generique-bleu.png";
        modalImg.classList.add('is-logo');
        modalImg.style.padding = "20px";
    }

    if (modalTitle) modalTitle.innerText = "Liste des Engagés - 54ème édition";

    if (modalText) {
        modalText.innerHTML = `
            <p style="color: var(--primary-color); font-weight: 700; font-size: 1.2rem; margin-bottom: 5px;">108 Partants • 18 Équipes</p>
            <p style="font-weight: 600; font-style: italic; margin-bottom: 20px;">Le peloton est prêt pour la 54ème édition !</p>
            
            <p>Retrouvez la liste nominative complète des 108 coureurs qui s'élanceront sur les routes de Saône-et-Loire. Découvrez les forces en présence, des formations continentales aux sélections régionales de haut niveau.</p>
            
            <div style="margin-top: 30px; text-align: center;">
                <a href="engages.html" class="btn btn-primary" style="padding: 12px 30px; border-radius: 50px;">
                    <i class="fas fa-list-ul"></i> Découvrir la liste des engagés
                </a>
            </div>
        `;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Hello Message
console.log('%c🚴 Circuit de Saône-et-Loire 🚴', 'font-size: 20px; font-weight: bold; color: #C2945D;');
