const fs = require('fs');
let html = fs.readFileSync('map_equipes_insta.html', 'utf8');

// 1. Update SVG viewBox to crop out the empty bottom part
html = html.replace(/viewBox="0 0 576 823"/, 'viewBox="0 0 576 500"');

// 2. Update map-container CSS to match the new aspect ratio
html = html.replace(/aspect-ratio:\s*576\s*\/\s*823;/, 'aspect-ratio: 576 / 500;');

// 3. Define the precise coordinates in SVG units (0-576 for X, 0-500 for Y)
const coords = {
    'Aix-en-Provence': { x: 400, y: 430, labelX: 415, labelY: 430 },
    'Bourg-en-Bresse': { x: 390, y: 290, labelX: 405, labelY: 290 },
    'VC Rouen 76': { x: 250, y: 100, labelX: 200, labelY: 80 },
    'SCO Dijon': { x: 370, y: 220, labelX: 385, labelY: 220 },
    'Elite Fondations': { x: 455, y: 270, labelX: 470, labelY: 270 },
    'UV Aube': { x: 335, y: 170, labelX: 350, labelY: 170 },
    'Entente Saône-et-Loire': { x: 360, y: 260, labelX: 180, labelY: 260 },
    'Team Vittel N\'Side': { x: 435, y: 160, labelX: 450, labelY: 160 },
    'AC Bisontine': { x: 425, y: 230, labelX: 440, labelY: 230 },
    'Team Atria': { x: 290, y: 330, labelX: 200, labelY: 345 },
    'Team 74': { x: 430, y: 310, labelX: 445, labelY: 310 },
    'CR4C Roanne': { x: 330, y: 310, labelX: 230, labelY: 325 },
    'Moyon Percy': { x: 130, y: 140, labelX: 40, labelY: 140 },
    'UC Haguenau': { x: 480, y: 110, labelX: 350, labelY: 110 },
    'Team Buffaz': { x: 370, y: 330, labelX: 385, labelY: 330 }
};

// 4. Update the HTML markers
for (const [name, pos] of Object.entries(coords)) {
    // Calculate percentages
    const top = (pos.y / 500 * 100).toFixed(1) + '%';
    const left = (pos.x / 576 * 100).toFixed(1) + '%';
    const labelTop = (pos.labelY / 500 * 100).toFixed(1) + '%';
    const labelLeft = (pos.labelX / 576 * 100).toFixed(1) + '%';

    // Regex to find the marker section for this team
    // e.g. <!-- 1. Aix-en-Provence --> ...
    const regex = new RegExp(`(<!-- \\d+\\.? ${name.replace('(', '\\(').replace(')', '\\)')} -->\\s*<div class="marker[^>]*?style="top: )[^;]+(; left: )[^;]+(;"></div>\\s*<div class="label[^>]*?style="top: )[^;]+(; left: )[^;]+(;[^>]*?>)`);
    
    html = html.replace(regex, `$1${top}$2${left}$3${labelTop}$4${labelLeft}$5`);
}

// 5. Unhide labels if they were hidden (just in case)
html = html.replace(/\.label\s*{[^}]*display:\s*none[^}]*}/, '');

fs.writeFileSync('map_equipes_insta.html', html);
console.log("Map coordinates updated based on 576x500 viewBox.");
