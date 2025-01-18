import { Container } from 'pixi.js';
import { Button } from '../button/button';
import ButtonFactory from '../button/buttonFactory';
import ButtonBuilderRect from '../button/buttonBuilder/buttonBuilderRect';
import { eMainConsoleButtons } from './types';
import { MAIN_SELECTORS_CONFIG } from '../button/config/mainSelectors';

export default class MainConsole extends Container {
  public buttons = new Map<eMainConsoleButtons, Button>();
  public config = {
    gap: 25,
    width: 350,
    height: 250,
  };

  constructor() {
    super();

    const scene1Button = ButtonFactory.button({
      buttonBuilder: new ButtonBuilderRect(MAIN_SELECTORS_CONFIG),
      text: 'SCENE 1\n"Ace of Shadows"',
      width: this.config.width,
      height: this.config.height,
    });

    scene1Button.x = scene1Button.width / 2;
    this.buttons.set(eMainConsoleButtons.SCENE1, scene1Button);
    this.addChild(scene1Button);

    const scene2Button = ButtonFactory.button({
      buttonBuilder: new ButtonBuilderRect(MAIN_SELECTORS_CONFIG),
      text: 'SCENE 2\n"Magic Words"',
      width: this.config.width,
      height: this.config.height,
    });

    scene2Button.x = scene1Button.x + scene1Button.width + this.config.gap;
    this.buttons.set(eMainConsoleButtons.SCENE2, scene2Button);
    this.addChild(scene2Button);

    const scene3Button = ButtonFactory.button({
      buttonBuilder: new ButtonBuilderRect(MAIN_SELECTORS_CONFIG),
      text: 'SCENE 3\n"Phoenix Flame"',
      width: this.config.width,
      height: this.config.height,
    });
    scene3Button.x = scene2Button.x + scene2Button.width + this.config.gap;
    this.buttons.set(eMainConsoleButtons.SCENE3, scene3Button);
    this.addChild(scene3Button);
  }

  public enable() {
    this.buttons.forEach((button) => button.enable());
  }

  public disable() {
    this.buttons.forEach((button) => button.disable());
  }
}
