import gsap from 'gsap';
import PixiPlugin from 'gsap/PixiPlugin';
import './global.css';
import { Application, Container, Sprite } from 'pixi.js';
import { GAME_CONFIG } from './systems/game/config';
import GameController from './systems/game/gameController';

(async () => {
  // Init Pixi.js
  const app = new Application();
  await app.init({ background: '#000000', resizeTo: window });
  document.body.appendChild(app.canvas);

  // Init GSAP
  gsap.registerPlugin(PixiPlugin);
  PixiPlugin.registerPIXI({ Container, Sprite });

  // Init GameController
  await GameController.init(app, GAME_CONFIG);

  // Add screen change monitoring and handling
})();
