import { Container, FillInput, StrokeInput, TextStyleOptions } from 'pixi.js';

export enum eButtonState {
  NORMAL = 'buttonStateNormal',
  HOVER = 'buttonStateHover',
  ACTIVE = 'buttonStateActive',
  DISABLED = 'buttonStateDisabled',
}

export type TButtonStatesOptions = {
  [key in eButtonState]: Container;
};

export interface iButtonBuilderConfig {
  fill: {
    [key in eButtonState]: (width: number, height: number) => FillInput;
  };
  stroke: {
    [key in eButtonState]: () => StrokeInput;
  };
  textStyle: {
    [key in eButtonState]: () => TextStyleOptions;
  };
}

export interface iButtonOptions {
  states: TButtonStatesOptions;
}

export interface iButtonBuilder {
  getState(
    state: eButtonState,
    text: string,
    width: number,
    height: number
  ): Container;
}

export interface iButtonFactoryOptions {
  buttonBuilder: iButtonBuilder;
  text: string;
  width: number;
  height: number;
}
