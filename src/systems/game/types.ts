import { Container, Graphics, Rectangle, Sprite } from 'pixi.js';
import { iSceneOptions } from '../../scenes/scene/types';
import Scene from '../../scenes/scene/scene';

export type TPixiElement = Container | Sprite | Graphics;

export interface iGameSceneDefinition {
  class: new (options: iSceneOptions) => Scene;
  options: iSceneOptions;
}

export interface iGameConfig {
  referenceSize: Rectangle;
  scenes: iGameSceneDefinition[];
}

export enum eGameStates {
  LOADING = 'gameStateLoading',
  READY = 'gameStateReady',
}

export enum eGameEvents {
  ERROR = 'gameEventError',
}

export interface iGameEventErrorInfo {
  error: string;
}
