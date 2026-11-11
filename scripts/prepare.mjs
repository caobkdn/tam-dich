// Copies the Capacitor browser bundles and the Vietnamese font files into www/.
import { mkdirSync, copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const nm = 'node_modules';
mkdirSync('www/lib', { recursive: true });
mkdirSync('www/fonts', { recursive: true });

copyFileSync(join(nm, '@capacitor/core/dist/capacitor.js'), 'www/lib/capacitor.js');
copyFileSync(join(nm, '@capacitor/preferences/dist/plugin.js'), 'www/lib/preferences.js');
copyFileSync(join(nm, '@capacitor/local-notifications/dist/plugin.js'), 'www/lib/local-notifications.js');

const faces = [
  ['be-vietnam-pro', ['400', '500', '600']],
  ['cormorant-garamond', ['500', '600', '500-italic']],
];
const keep = ['latin', 'latin-ext', 'vietnamese'];
let css = '';
for (const [fam, weights] of faces) {
  for (const w of weights) {
    const src = readFileSync(join(nm, '@fontsource', fam, w + '.css'), 'utf8');
    for (const block of src.split('@font-face').slice(1)) {
      const subset = (block.match(/\/\*\s*([\w-]+)\s*\*\//) || [])[1] || (block.match(/files\/[\w-]+?-(latin-ext|latin|vietnamese|cyrillic-ext|cyrillic|greek-ext|greek|math|symbols)-/) || [])[1];
      const files = [...block.matchAll(/url\(\.\/files\/([^)]+\.woff2)\)/g)].map(m => m[1]);
      const sub = files.length ? files[0].replace(fam + '-', '').split('-').slice(0, -2).join('-') : subset;
      if (!keep.includes(sub)) continue;
      for (const f of files) copyFileSync(join(nm, '@fontsource', fam, 'files', f), join('www/fonts', f));
      css += '@font-face' + block
        .replace(/url\(\.\/files\/([^)]+\.woff2)\)/g, 'url(./$1)')
        .replace(/,\s*url\(\.\/files\/[^)]+\.woff\)\s*format\('woff'\)/g, '');
    }
  }
}
writeFileSync('www/fonts/fonts.css', css);
console.log('prepared www/lib and www/fonts');
