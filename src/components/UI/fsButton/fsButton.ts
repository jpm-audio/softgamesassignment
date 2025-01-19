import { Container, EventEmitter } from 'pixi.js';
import { Button } from '../button/button';
import { DEFAULT_BUTTON_CONFIG } from '../button/config/default';
import ButtonBuilderRect from '../button/buttonBuilder/buttonBuilderRect';
import ButtonFactory from '../button/buttonFactory';
import { Fullscreen } from '../../../systems/fullscreen/fullscreen';
import {
  eFullscreenEvents,
  eFullscreeState,
} from '../../../systems/fullscreen/types';

export class FSButton extends Container {
  public optionButtons: Map<eFullscreeState, Button> = new Map();
  protected _currentOption: eFullscreeState = eFullscreeState.OFF;

  public get option() {
    return this._currentOption;
  }

  public set option(value: eFullscreeState) {
    if (value !== this._currentOption) {
      const currentButton = this.optionButtons.get(this._currentOption);
      const optionButton = this.optionButtons.get(value);

      if (currentButton) {
        currentButton.visible = false;
      }
      if (optionButton) {
        optionButton.visible = true;
      }
      this._currentOption = value;
    }
  }

  constructor(bus: EventEmitter, fullscreen: Fullscreen) {
    super();

    const enterFSButton = ButtonFactory.button({
      buttonBuilder: new ButtonBuilderRect(DEFAULT_BUTTON_CONFIG),
      text: '< FS >',
      width: 200,
      height: 100,
    });

    this.addChild(enterFSButton);

    const exitFSButton = ButtonFactory.button({
      buttonBuilder: new ButtonBuilderRect(DEFAULT_BUTTON_CONFIG),
      text: '> FS <',
      width: 200,
      height: 100,
    });
    exitFSButton.visible = false;
    this.addChild(exitFSButton);

    this.optionButtons.set(eFullscreeState.OFF, enterFSButton);
    this.optionButtons.set(eFullscreeState.ON, exitFSButton);

    // Set Events
    enterFSButton.on('pointerup', () => {
      fullscreen.requestFullScreen();
    });

    exitFSButton.on('pointerup', () => {
      fullscreen.exitFullScreen();
    });

    bus.on(eFullscreenEvents.CHANGE, this.onChange, this);
  }

  public onChange(state: eFullscreeState) {
    this.option = state ? eFullscreeState.ON : eFullscreeState.OFF;
  }

  public enable() {
    this.optionButtons.forEach((button) => {
      button.enable();
    });
  }

  public disable() {
    this.optionButtons.forEach((button) => {
      button.disable();
    });
  }
}
