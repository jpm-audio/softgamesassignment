import './global.css';
import { Application } from 'pixi.js';

(async () => {
  // Init Pixi.js
  const app = new Application();
  await app.init({ background: '#000000', resizeTo: window });
  document.body.appendChild(app.canvas);

  // Add the main scene

  // Add screen change monitoring and handling
})();
