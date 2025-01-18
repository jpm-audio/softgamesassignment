import {
  Container,
  FillInput,
  Graphics,
  StrokeInput,
  Text,
  TextStyle,
} from 'pixi.js';
import { eButtonState, iButtonBuilder, iButtonBuilderConfig } from '../types';
import GameController from '../../../../systems/game/gameController';

export default class ButtonBuilderRect implements iButtonBuilder {
  public config: iButtonBuilderConfig;
  public backgroundRadius: number = 5;

  constructor(config: iButtonBuilderConfig) {
    this.config = config;
  }

  public getState(
    state: eButtonState,
    text: string,
    width: number,
    height: number
  ) {
    const stateContainer = new Container();

    const background = this.getBackground(state, width, height);
    background.x = -width / 2;
    background.y = -height / 2;
    stateContainer.addChild(background);

    const textEl = this.getText(state, text);
    textEl.anchor.set(0.5);
    stateContainer.addChild(textEl);

    return stateContainer;
  }

  public getBackground(state: eButtonState, width: number, height: number) {
    const graphics = new Graphics();
    const fill = this.config.fill[state](width, height) as FillInput;
    const stroke = this.config.stroke[state]() as StrokeInput;

    graphics.roundRect(0, 0, width, height, this.backgroundRadius);
    graphics.fill(fill);
    graphics.stroke(stroke);

    return graphics;
  }

  public getText(state: eButtonState, text: string) {
    const textStyle = this.config.textStyle[state]() as TextStyle;
    const textEl = new Text({
      text,
      style: textStyle,
      resolution: GameController.assetsResolution,
    });

    return textEl;
  }
}
