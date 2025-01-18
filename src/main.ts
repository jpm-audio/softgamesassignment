import gsap from 'gsap';
import './global.css';
import { Application, Container, Sprite } from 'pixi.js';

(async () => {
  // Init Pixi.js
  const app = new Application();
  await app.init({ background: '#000000', resizeTo: window });
  document.body.appendChild(app.canvas);

  // Init GSAP
  gsap.registerPlugin(PixiPlugin);
  PixiPlugin.registerPIXI({ Container, Sprite });

  // Add the main scene

  // Add screen change monitoring and handling
})();
