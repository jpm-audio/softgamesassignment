import gsap from 'gsap';
import PixiPlugin from 'gsap/PixiPlugin';
import './global.css';
import { Application, Container, Sprite } from 'pixi.js';
import { GAME_CONFIG } from './systems/game/config';
import GameController from './systems/game/gameController';
import Environment from './systems/environment/environment';
import { ENVIRONMENT_CONFIG } from './systems/environment/settings';

(async () => {
  // Init Enviroment detection system
  const environment = new Environment(ENVIRONMENT_CONFIG);
  const canvasContainerEl: HTMLElement | null =
    document.querySelector('#canvas_container');

  if (canvasContainerEl === null) {
    throw new Error('Canvas container not found');
  }

  // Init Pixi.js
  const app = new Application();
  await app.init({
    backgroundAlpha: 0,
    resizeTo: canvasContainerEl,
    resolution: environment.canvasResolution,
  });
  document.body.appendChild(app.canvas);

  // Init GSAP
  gsap.registerPlugin(PixiPlugin);
  PixiPlugin.registerPIXI({ Container, Sprite });

  // Init GameController
  await GameController.init(app, environment, GAME_CONFIG);

  // Add screen change monitoring and handling
})();
