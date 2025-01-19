import { Container, EventEmitter } from 'pixi.js';
import BackButton from '../backButton/backButton';
import { FSButton } from '../fsButton/fsButton';
import { Fullscreen } from '../../../systems/fullscreen/fullscreen';

export class GlobalConsole extends Container {
  protected _backButton!: BackButton;
  protected _fsButton!: FSButton;
  protected _fullscreen!: Fullscreen;

  public get backButton() {
    return this._backButton;
  }

  constructor(bus: EventEmitter, fullscreen: Fullscreen) {
    super();

    this._fullscreen = fullscreen;

    // Back Button
    this._backButton = new BackButton(bus);
    this._backButton.x = this._backButton.width / 2;
    this.addChild(this._backButton);

    // Fullscreen Button
    this._fsButton = new FSButton(bus, fullscreen);
    this._fsButton.x = this._backButton.x + this._backButton.width + 0;
    this.addChild(this._fsButton);
    if (fullscreen.isDisabled) {
      this._fsButton.disable();
      this._fsButton.alpha = 0.5;
    }
  }

  public enable() {
    this._backButton.enable();
    if (!this._fullscreen.isDisabled) {
      this._fsButton.enable();
    }
  }

  public disable() {
    this._backButton.disable();
    if (this._fsButton) this._fsButton.disable();
  }
}
