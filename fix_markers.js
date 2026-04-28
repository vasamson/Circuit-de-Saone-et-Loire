const fs = require('fs');
let html = fs.readFileSync('map_equipes_insta.html', 'utf8');

const svgMatch = html.match(/<svg[\s\S]*?<\/svg>/);
if (!svgMatch) {
    console.error("Could not find SVG");
    process.exit(1);
}
let svgContent = svgMatch[0];

// Remove any existing .france-map-svg class from the SVG
svgContent = svgContent.replace(/class="france-map-svg"/g, '');

const newMapWrapper = `
        <div class="map-wrapper">
            <div class="map-container">
                ${svgContent}
                
                <!-- 1. Aix-en-Provence -->
                <div class="marker" style="top: 52%; left: 69%;"></div>
                <div class="label" style="top: 52%; left: 72%;">AVC Aix-en-Provence</div>

                <!-- 2. Bourg-en-Bresse -->
                <div class="marker" style="top: 35%; left: 67%;"></div>
                <div class="label" style="top: 35%; left: 70%;">Bourg-en-Bresse</div>

                <!-- 4. Rouen -->
                <div class="marker" style="top: 12%; left: 40%;"></div>
                <div class="label" style="top: 10%; left: 33%;">VC Rouen 76</div>

                <!-- 5. Dijon -->
                <div class="marker" style="top: 26.5%; left: 64%;"></div>
                <div class="label" style="top: 24.5%; left: 66%;">SCO Dijon</div>

                <!-- 6. Elite Fondations -->
                <div class="marker" style="top: 35%; left: 78%;"></div>
                <div class="label" style="top: 33%; left: 80%;">Elite Fondations (SUI)</div>

                <!-- 7. UV Aube -->
                <div class="marker" style="top: 20.5%; left: 57%;"></div>
                <div class="label" style="top: 18.5%; left: 59%;">UV Aube</div>

                <!-- 8. Entente SL -->
                <div class="marker special" style="top: 32.8%; left: 62.5%;"></div>
                <div class="label" style="top: 30.8%; left: 30%; border-left: 0; border-right: 2.5px solid var(--brand-gold);">Entente Saône-et-Loire</div>

                <!-- 9. Vittel -->
                <div class="marker" style="top: 19.5%; left: 76%;"></div>
                <div class="label" style="top: 17.5%; left: 78%;">Team Vittel N'Side</div>

                <!-- 11. Besançon -->
                <div class="marker" style="top: 29%; left: 74%;"></div>
                <div class="label" style="top: 27%; left: 76%;">AC Bisontine</div>

                <!-- 12. Clermont-Ferrand -->
                <div class="marker" style="top: 40%; left: 48.6%;"></div>
                <div class="label" style="top: 42%; left: 42.6%; border-left: 0; border-right: 2.5px solid var(--brand-gold);">Team Atria</div>

                <!-- 13. Annecy -->
                <div class="marker" style="top: 38.8%; left: 74.6%;"></div>
                <div class="label" style="top: 40.8%; left: 77%;">Team 74</div>

                <!-- 14. Roanne -->
                <div class="marker" style="top: 37.6%; left: 57%;"></div>
                <div class="label" style="top: 39.6%; left: 52%; border-left: 0; border-right: 2.5px solid var(--brand-gold);">CR4C Roanne</div>

                <!-- 15. Moyon -->
                <div class="marker" style="top: 17%; left: 22.5%;"></div>
                <div class="label" style="top: 17%; left: 6.5%; border-left: 0; border-right: 2.5px solid var(--brand-gold);">Moyon Percy</div>

                <!-- 17. Haguenau -->
                <div class="marker" style="top: 14.5%; left: 88.5%;"></div>
                <div class="label" style="top: 14.5%; left: 66.5%; border-left: 0; border-right: 2.5px solid var(--brand-gold);">UC Haguenau</div>

                <!-- 18. Lyon -->
                <div class="marker" style="top: 40%; left: 64%;"></div>
                <div class="label" style="top: 42%; left: 67%;">Team Buffaz</div>
            </div>
        </div>
`;

html = html.replace(/<div class="map-wrapper">[\s\S]*?<\/div>\s*<\/div>\s*<footer/, newMapWrapper + '\n        <footer');

// Also fix the CSS for map-container
const newCss = `
        .map-wrapper {
            flex: 1;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0;
            margin-top: -30px; /* Shift up a bit */
        }

        .map-container {
            position: relative;
            width: 90%;
            max-width: 450px;
            aspect-ratio: 576 / 823;
        }

        .map-container svg {
            width: 100%;
            height: 100%;
            filter: drop-shadow(0 15px 40px rgba(0,0,0,0.7));
        }

        /* Styling the SVG elements from carte.svg */
        .map-container path {
            fill: #152b6d !important;
            stroke: var(--brand-blue) !important;
            stroke-width: 1px !important;
        }
        
        .map-container polyline {
            fill: none !important;
            stroke: rgba(194, 148, 93, 0.4) !important; /* Subtle gold for internal borders */
            stroke-width: 0.5px !important;
        }
`;

html = html.replace(/\.map-wrapper \{[\s\S]*?\.france-map-svg polyline \{[\s\S]*?\}/, newCss);

fs.writeFileSync('map_equipes_insta.html', html);
console.log("Fixed markers");
