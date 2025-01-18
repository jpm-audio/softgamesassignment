import { Button } from '../button/button';
import ButtonFactory from '../button/buttonFactory';
import { PRIMARY_BUTTON_CONFIG } from '../button/config/primary';
import ButtonBuilderRect from '../button/buttonBuilder/buttonBuilderRect';
import GameController from '../../../systems/game/gameController';
import { eGameEvents } from '../../../systems/game/types';
import FadeContainer from '../../fadeContainer/fadeContainer';

export default class BackButton extends FadeContainer {
  protected _button: Button;
  constructor() {
    super();

    this._button = ButtonFactory.button({
      buttonBuilder: new ButtonBuilderRect(PRIMARY_BUTTON_CONFIG),
      text: 'HOME',
      width: 250,
      height: 100,
    });

    this.addChild(this._button);

    this._button.on('pointerup', () => {
      GameController.bus.emit(eGameEvents.NAVIGATION_REQUESTED, {
        sceneIndex: 0,
      });
    });

    this._button.enable();
  }

  public enable() {
    this._button.enable();
  }

  public disable() {
    this._button.disable();
  }
}
