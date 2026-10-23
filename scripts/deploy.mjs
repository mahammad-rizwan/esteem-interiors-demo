// Builds the site for GitHub Pages and publishes dist/ to the gh-pages branch.
// Usage: npm run deploy
import { execSync } from 'child_process';
import fs from 'fs';
import ghpages from 'gh-pages';

const REPO = 'esteem-interiors-demo';
execSync('npx vite build', { stdio: 'inherit', env: { ...process.env, BASE_PATH: `/${REPO}/` } });
fs.writeFileSync('dist/.nojekyll', '');
// Single-page app: serve index.html for unknown paths too.
fs.copyFileSync('dist/index.html', 'dist/404.html');

await ghpages.publish('dist', { dotfiles: true, message: 'Deploy site' });
console.log(`Published → https://<user>.github.io/${REPO}/`);
