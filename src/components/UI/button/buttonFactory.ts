import { Button } from './button';
import { eButtonState, iButtonFactoryOptions } from './types';

export default class ButtonFactory {
  public static button(options: iButtonFactoryOptions): Button {
    const { buttonBuilder, text, width, height } = options;
    const normalState = buttonBuilder.getState(
      eButtonState.NORMAL,
      text,
      width,
      height
    );
    const hoverState = buttonBuilder.getState(
      eButtonState.HOVER,
      text,
      width,
      height
    );
    const pressedState = buttonBuilder.getState(
      eButtonState.ACTIVE,
      text,
      width,
      height
    );
    const disabledState = buttonBuilder.getState(
      eButtonState.DISABLED,
      text,
      width,
      height
    );

    const button = new Button({
      states: {
        [eButtonState.NORMAL]: normalState,
        [eButtonState.HOVER]: hoverState,
        [eButtonState.ACTIVE]: pressedState,
        [eButtonState.DISABLED]: disabledState,
      },
    });

    return button;
  }
}
