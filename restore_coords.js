const fs = require('fs');
let html = fs.readFileSync('map_equipes_insta.html', 'utf8');

// Ensure viewBox is correct
html = html.replace(/viewBox="0 0 576 823"/, 'viewBox="0 0 576 500"');

const coords = {
    'Aix-en-Provence': { x: 420, y: 430, labelX: 435, labelY: 430 },
    'Bourg-en-Bresse': { x: 390, y: 290, labelX: 405, labelY: 290 },
    'VC Rouen 76': { x: 230, y: 100, labelX: 245, labelY: 100 },
    'SCO Dijon': { x: 360, y: 220, labelX: 375, labelY: 220 },
    'Elite Fondations': { x: 450, y: 290, labelX: 465, labelY: 290 },
    'UV Aube': { x: 320, y: 170, labelX: 335, labelY: 170 },
    'Entente Saône-et-Loire': { x: 360, y: 270, labelX: 180, labelY: 270 },
    'Team Vittel N\'Side': { x: 440, y: 160, labelX: 455, labelY: 160 },
    'AC Bisontine': { x: 420, y: 240, labelX: 435, labelY: 240 },
    'Team Atria': { x: 280, y: 330, labelX: 180, labelY: 330 },
    'Team 74': { x: 440, y: 300, labelX: 455, labelY: 300 },
    'CR4C Roanne': { x: 330, y: 310, labelX: 230, labelY: 310 },
    'Moyon Percy': { x: 130, y: 140, labelX: 40, labelY: 140 },
    'UC Haguenau': { x: 500, y: 120, labelX: 380, labelY: 120 },
    'Team Buffaz': { x: 360, y: 330, labelX: 375, labelY: 330 }
};

for (const [name, pos] of Object.entries(coords)) {
    const top = (pos.y / 500 * 100).toFixed(1) + '%';
    const left = (pos.x / 576 * 100).toFixed(1) + '%';
    const labelTop = (pos.labelY / 500 * 100).toFixed(1) + '%';
    const labelLeft = (pos.labelX / 576 * 100).toFixed(1) + '%';

    const regex = new RegExp(`(<!-- \\d+\\.? ${name.replace('(', '\\(').replace(')', '\\)')} -->\\s*<div class="marker[^>]*?style="top: )[^;]+(; left: )[^;]+(;"></div>\\s*<div class="label[^>]*?style="top: )[^;]+(; left: )[^;]+(;[^>]*?>)`);
    
    html = html.replace(regex, `$1${top}$2${left}$3${labelTop}$4${labelLeft}$5`);
}

fs.writeFileSync('map_equipes_insta.html', html);
console.log("Restored exact mathematical coordinates!");
