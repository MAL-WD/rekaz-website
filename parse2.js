const fs = require('fs');
const html = fs.readFileSync('d:/Projects/Rekaz/index.html', 'utf-8');

function extractComponent(name) {
    // Find the start of the component
    const startRegex = new RegExp(`<div[^>]*name="${name}"[^>]*>`, 'i');
    const match = html.match(startRegex);
    if (!match) return `Component ${name} not found.`;
    
    let startIndex = match.index;
    let depth = 0;
    let endIndex = startIndex;
    
    for (let i = startIndex; i < html.length; i++) {
        if (html.startsWith('<div', i)) {
            depth++;
        } else if (html.startsWith('</div', i)) {
            depth--;
            if (depth === 0) {
                endIndex = i + 6;
                break;
            }
        }
    }
    
    return html.substring(startIndex, endIndex);
}

const navbar = extractComponent('Navbar');
const hero = extractComponent('Hero section');
// The ticker is named 'Partners' or 'Ticker' maybe? From scratch it says:
// Partners: <div class="framer-c8et2c" data-framer-name="Partners"
const partners = extractComponent('Partners');

fs.writeFileSync('d:/Projects/Rekaz/scratch-components.html', 
    `<!-- NAVBAR -->\n${navbar}\n\n<!-- HERO -->\n${hero}\n\n<!-- PARTNERS -->\n${partners}`
);
