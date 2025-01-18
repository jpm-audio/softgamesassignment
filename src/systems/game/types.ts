import { Container, Graphics, Sprite } from 'pixi.js';

export type TPixiElement = Container | Sprite | Graphics;

export interface iGameConfig {
  referenceSize: { width: number; height: number };
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
