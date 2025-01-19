import { EventEmitter } from 'pixi.js';
import { eFullscreenEvents } from './types';
import fscreen from 'fscreen';
import Environment from '../environment/environment';

export class Fullscreen {
  private _disabled: boolean = false;
  private _fullscreenElement: HTMLElement | null = null;
  private _environment!: Environment;

  /**
   * It returns true if fullScreenManager is disabled. False in other case.
   */
  public get isDisabled(): boolean {
    return this._disabled || !fscreen.fullscreenEnabled;
  }

  /**
   * It returns true if the game is in full screen mode and false in other case.
   */
  public get isFullscreen(): boolean {
    return !this._disabled && !!fscreen.fullscreenElement;
  }

  /**
   *
   * @param fullscreenElement
   * @param auto
   * @returns
   */
  public async init(
    fullscreenElement: HTMLElement,
    environment: Environment,
    bus: EventEmitter
  ): Promise<void> {
    if (this._disabled) {
      return;
    }

    this._environment = environment;
    this._fullscreenElement = fullscreenElement;

    fscreen.onfullscreenchange = () => {
      bus.emit(eFullscreenEvents.CHANGE, this.isFullscreen);
    };
  }

  /**
   *
   */
  public async requestFullScreen(): Promise<void> {
    if (!this._fullscreenElement || this.isFullscreen) {
      return;
    }

    // Perform the request if enabled
    if (!this.isDisabled) {
      await fscreen.requestFullscreen(this._fullscreenElement);
    }

    // Try to hide the top bar on mobile devices
    if (this._environment.isMobile) {
      await new Promise((resolve) => {
        setTimeout(() => {
          window.scrollTo(0, 1);
          resolve(null);
        }, 500);
      });
    }
  }
  /**
   *
   */
  public async exitFullScreen(): Promise<void> {
    if (this._disabled || !this.isFullscreen) {
      return;
    }
    await fscreen.exitFullscreen();
  }
}
