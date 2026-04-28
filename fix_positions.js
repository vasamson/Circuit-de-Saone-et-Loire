const fs = require('fs');
let html = fs.readFileSync('map_equipes_insta.html', 'utf8');

// 1. Hide the scale and comersis text by adding a CSS rule
if (!html.includes('.map-container text')) {
    html = html.replace('</style>', `
        .map-container text { display: none !important; }
        .map-container polyline[stroke="#333333"] { display: none !important; }
    </style>`);
}

// 2. Define the new marker coordinates
const markers = {
    'Aix-en-Provence': { top: '46%', left: '68%' },
    'Bourg-en-Bresse': { top: '34%', left: '67%' },
    'VC Rouen 76': { top: '16%', left: '42%' },
    'SCO Dijon': { top: '26%', left: '64%' },
    'Elite Fondations': { top: '31%', left: '79%' },
    'UV Aube': { top: '21%', left: '58%' },
    'Entente Saône-et-Loire': { top: '31%', left: '62%' },
    'Team Vittel N\'Side': { top: '19%', left: '72%' },
    'AC Bisontine': { top: '27%', left: '71%' },
    'Team Atria': { top: '40%', left: '51%' },
    'Team 74': { top: '35%', left: '74%' },
    'CR4C Roanne': { top: '38%', left: '58%' },
    'Moyon Percy': { top: '15%', left: '28%' },
    'UC Haguenau': { top: '16%', left: '80%' },
    'Team Buffaz': { top: '38%', left: '65%' }
};

// 3. Replace the coordinates in the HTML
// The format is: <div class="marker" style="top: XX%; left: YY%;"></div>
// Followed by the label which we will also adjust

html = html.replace(/<!-- 1\. Aix-en-Provence -->\s*<div class="marker" style="top: [^;]+; left: [^;]+;"><\/div>\s*<div class="label" style="top: [^;]+; left: [^;]+;">AVC Aix-en-Provence<\/div>/g, 
`<!-- 1. Aix-en-Provence -->
                <div class="marker" style="top: ${markers['Aix-en-Provence'].top}; left: ${markers['Aix-en-Provence'].left};"></div>
                <div class="label" style="top: ${markers['Aix-en-Provence'].top}; left: 71%;">AVC Aix-en-Provence</div>`);

html = html.replace(/<!-- 2\. Bourg-en-Bresse -->\s*<div class="marker" style="top: [^;]+; left: [^;]+;"><\/div>\s*<div class="label" style="top: [^;]+; left: [^;]+;">Bourg-en-Bresse<\/div>/g, 
`<!-- 2. Bourg-en-Bresse -->
                <div class="marker" style="top: ${markers['Bourg-en-Bresse'].top}; left: ${markers['Bourg-en-Bresse'].left};"></div>
                <div class="label" style="top: ${markers['Bourg-en-Bresse'].top}; left: 70%;">Bourg-en-Bresse</div>`);

html = html.replace(/<!-- 4\. Rouen -->\s*<div class="marker" style="top: [^;]+; left: [^;]+;"><\/div>\s*<div class="label" style="top: [^;]+; left: [^;]+;">VC Rouen 76<\/div>/g, 
`<!-- 4. Rouen -->
                <div class="marker" style="top: ${markers['VC Rouen 76'].top}; left: ${markers['VC Rouen 76'].left};"></div>
                <div class="label" style="top: 14%; left: 45%;">VC Rouen 76</div>`);

html = html.replace(/<!-- 5\. Dijon -->\s*<div class="marker" style="top: [^;]+; left: [^;]+;"><\/div>\s*<div class="label" style="top: [^;]+; left: [^;]+;">SCO Dijon<\/div>/g, 
`<!-- 5. Dijon -->
                <div class="marker" style="top: ${markers['SCO Dijon'].top}; left: ${markers['SCO Dijon'].left};"></div>
                <div class="label" style="top: 24%; left: 66%;">SCO Dijon</div>`);

html = html.replace(/<!-- 6\. Elite Fondations -->\s*<div class="marker" style="top: [^;]+; left: [^;]+;"><\/div>\s*<div class="label" style="top: [^;]+; left: [^;]+;">Elite Fondations \(SUI\)<\/div>/g, 
`<!-- 6. Elite Fondations -->
                <div class="marker" style="top: ${markers['Elite Fondations'].top}; left: ${markers['Elite Fondations'].left};"></div>
                <div class="label" style="top: 29%; left: 81%;">Elite Fondations (SUI)</div>`);

html = html.replace(/<!-- 7\. UV Aube -->\s*<div class="marker" style="top: [^;]+; left: [^;]+;"><\/div>\s*<div class="label" style="top: [^;]+; left: [^;]+;">UV Aube<\/div>/g, 
`<!-- 7. UV Aube -->
                <div class="marker" style="top: ${markers['UV Aube'].top}; left: ${markers['UV Aube'].left};"></div>
                <div class="label" style="top: 19%; left: 60%;">UV Aube</div>`);

html = html.replace(/<!-- 8\. Entente SL -->\s*<div class="marker special" style="top: [^;]+; left: [^;]+;"><\/div>\s*<div class="label" style="top: [^;]+; left: [^;]+; border-left: 0; border-right: 2.5px solid var\(--brand-gold\);">Entente Saône-et-Loire<\/div>/g, 
`<!-- 8. Entente SL -->
                <div class="marker special" style="top: ${markers['Entente Saône-et-Loire'].top}; left: ${markers['Entente Saône-et-Loire'].left};"></div>
                <div class="label" style="top: 29%; left: 30%; border-left: 0; border-right: 2.5px solid var(--brand-gold);">Entente Saône-et-Loire</div>`);

html = html.replace(/<!-- 9\. Vittel -->\s*<div class="marker" style="top: [^;]+; left: [^;]+;"><\/div>\s*<div class="label" style="top: [^;]+; left: [^;]+;">Team Vittel N'Side<\/div>/g, 
`<!-- 9. Vittel -->
                <div class="marker" style="top: ${markers['Team Vittel N\'Side'].top}; left: ${markers['Team Vittel N\'Side'].left};"></div>
                <div class="label" style="top: 17%; left: 74%;">Team Vittel N'Side</div>`);

html = html.replace(/<!-- 11\. Besançon -->\s*<div class="marker" style="top: [^;]+; left: [^;]+;"><\/div>\s*<div class="label" style="top: [^;]+; left: [^;]+;">AC Bisontine<\/div>/g, 
`<!-- 11. Besançon -->
                <div class="marker" style="top: ${markers['AC Bisontine'].top}; left: ${markers['AC Bisontine'].left};"></div>
                <div class="label" style="top: 25%; left: 73%;">AC Bisontine</div>`);

html = html.replace(/<!-- 12\. Clermont-Ferrand -->\s*<div class="marker" style="top: [^;]+; left: [^;]+;"><\/div>\s*<div class="label" style="top: [^;]+; left: [^;]+; border-left: 0; border-right: 2.5px solid var\(--brand-gold\);">Team Atria<\/div>/g, 
`<!-- 12. Clermont-Ferrand -->
                <div class="marker" style="top: ${markers['Team Atria'].top}; left: ${markers['Team Atria'].left};"></div>
                <div class="label" style="top: 42%; left: 35%; border-left: 0; border-right: 2.5px solid var(--brand-gold);">Team Atria</div>`);

html = html.replace(/<!-- 13\. Annecy -->\s*<div class="marker" style="top: [^;]+; left: [^;]+;"><\/div>\s*<div class="label" style="top: [^;]+; left: [^;]+;">Team 74<\/div>/g, 
`<!-- 13. Annecy -->
                <div class="marker" style="top: ${markers['Team 74'].top}; left: ${markers['Team 74'].left};"></div>
                <div class="label" style="top: 37%; left: 76%;">Team 74</div>`);

html = html.replace(/<!-- 14\. Roanne -->\s*<div class="marker" style="top: [^;]+; left: [^;]+;"><\/div>\s*<div class="label" style="top: [^;]+; left: [^;]+; border-left: 0; border-right: 2.5px solid var\(--brand-gold\);">CR4C Roanne<\/div>/g, 
`<!-- 14. Roanne -->
                <div class="marker" style="top: ${markers['CR4C Roanne'].top}; left: ${markers['CR4C Roanne'].left};"></div>
                <div class="label" style="top: 40%; left: 40%; border-left: 0; border-right: 2.5px solid var(--brand-gold);">CR4C Roanne</div>`);

html = html.replace(/<!-- 15\. Moyon -->\s*<div class="marker" style="top: [^;]+; left: [^;]+;"><\/div>\s*<div class="label" style="top: [^;]+; left: [^;]+; border-left: 0; border-right: 2.5px solid var\(--brand-gold\);">Moyon Percy<\/div>/g, 
`<!-- 15. Moyon -->
                <div class="marker" style="top: ${markers['Moyon Percy'].top}; left: ${markers['Moyon Percy'].left};"></div>
                <div class="label" style="top: 15%; left: 5%; border-left: 0; border-right: 2.5px solid var(--brand-gold);">Moyon Percy</div>`);

html = html.replace(/<!-- 17\. Haguenau -->\s*<div class="marker" style="top: [^;]+; left: [^;]+;"><\/div>\s*<div class="label" style="top: [^;]+; left: [^;]+; border-left: 0; border-right: 2.5px solid var\(--brand-gold\);">UC Haguenau<\/div>/g, 
`<!-- 17. Haguenau -->
                <div class="marker" style="top: ${markers['UC Haguenau'].top}; left: ${markers['UC Haguenau'].left};"></div>
                <div class="label" style="top: 16%; left: 58%; border-left: 0; border-right: 2.5px solid var(--brand-gold);">UC Haguenau</div>`);

html = html.replace(/<!-- 18\. Lyon -->\s*<div class="marker" style="top: [^;]+; left: [^;]+;"><\/div>\s*<div class="label" style="top: [^;]+; left: [^;]+;">Team Buffaz<\/div>/g, 
`<!-- 18. Lyon -->
                <div class="marker" style="top: ${markers['Team Buffaz'].top}; left: ${markers['Team Buffaz'].left};"></div>
                <div class="label" style="top: 40%; left: 67%;">Team Buffaz</div>`);

fs.writeFileSync('map_equipes_insta.html', html);
console.log("Positions updated.");
