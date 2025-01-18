import { Container } from 'pixi.js';
import { Button } from '../button/button';
import ButtonFactory from '../button/buttonFactory';
import ButtonBuilderRect from '../button/buttonBuilder/buttonBuilderRect';
import { PRIMARY_BUTTON_CONFIG } from '../button/config/primary';
import { DEFAULT_BUTTON_CONFIG } from '../button/config/default';
import { eTask1ConsoleButtons } from './types';

export default class Task1Console extends Container {
  public buttons = new Map<eTask1ConsoleButtons, Button>();
  public config = {
    gap: 25,
    width: 150,
    height: 60,
  };

  constructor() {
    super();

    const playButton = ButtonFactory.button({
      buttonBuilder: new ButtonBuilderRect(PRIMARY_BUTTON_CONFIG),
      text: 'PLAY',
      width: this.config.width,
      height: this.config.height,
    });

    playButton.x = playButton.width / 2;
    this.buttons.set(eTask1ConsoleButtons.PLAY, playButton);
    this.addChild(playButton);

    const stopButton = ButtonFactory.button({
      buttonBuilder: new ButtonBuilderRect(DEFAULT_BUTTON_CONFIG),
      text: 'STOP',
      width: this.config.width,
      height: this.config.height,
    });

    stopButton.x = playButton.x + playButton.width + this.config.gap;
    this.buttons.set(eTask1ConsoleButtons.STOP, stopButton);
    this.addChild(stopButton);

    const resetButton = ButtonFactory.button({
      buttonBuilder: new ButtonBuilderRect(DEFAULT_BUTTON_CONFIG),
      text: 'RESET',
      width: this.config.width,
      height: this.config.height,
    });
    resetButton.x = stopButton.x + stopButton.width + this.config.gap;
    this.buttons.set(eTask1ConsoleButtons.RESET, resetButton);
    this.addChild(resetButton);
  }
}
