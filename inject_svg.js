const fs = require('fs');

const svgContentRaw = fs.readFileSync('carte.svg', 'utf8');
// Extract just the <svg ...> ... </svg> part
const svgMatch = svgContentRaw.match(/<svg[\s\S]*?<\/svg>/i);
if (!svgMatch) {
    console.error("Could not find <svg> in carte.svg");
    process.exit(1);
}
let svgContent = svgMatch[0];

// Add the class to the svg
svgContent = svgContent.replace('<svg', '<svg class="france-map-svg"');

const htmlContent = fs.readFileSync('map_equipes_insta.html', 'utf8');

// Replace the existing <svg class="france-map-svg" ...> ... </svg> with the new one
const newHtmlContent = htmlContent.replace(/<svg[^>]*class="france-map-svg"[\s\S]*?<\/svg>/i, svgContent);

fs.writeFileSync('map_equipes_insta.html', newHtmlContent);
console.log("Injected successfully!");
