const fs = require('fs');
let html = fs.readFileSync('map_equipes_insta.html', 'utf8');

// Change background
html = html.replace(/(\.insta-container\s*{[^}]*background-color:\s*)var\(--brand-blue\)/, '$1var(--white)');

// Change title color
html = html.replace(/(\.title\s*{[^}]*color:\s*)var\(--white\)/, '$1var(--brand-blue)');

// Change footer text color
html = html.replace(/(\.edition-text\s*{[^}]*color:\s*)rgba\(255,255,255,0\.6\)/, '$1rgba(11, 31, 80, 0.6)');

// Change footer gradient
html = html.replace(/(\.info-footer\s*{[^}]*background:\s*)linear-gradient\(to top, rgba\(0,0,0,0\.5\), transparent\)/, '$1transparent');

// Remove animation and keyframes
html = html.replace(/\.marker::after\s*{[\s\S]*?}\s*@keyframes pulse\s*{[\s\S]*?}/, '');

// Adjust marker box-shadow slightly since it's on a blue map but no animation
// The marker itself is on the map, map is blue, so white border on gold is fine.

fs.writeFileSync('map_equipes_insta.html', html);
console.log("Styles updated for white background and no animation.");
