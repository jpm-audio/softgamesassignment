import gsap from 'gsap';
import { Container, Rectangle } from 'pixi.js';
import { iSceneOptions } from './types';

export default class Scene extends Container {
  protected _id: string = '';
  protected _contentContainer: Container;
  public hideAnimationVars: gsap.TweenVars = { duration: 0.5, alpha: 0 };
  public showAnimationVars: gsap.TweenVars = { duration: 0.5, alpha: 0 };
  public referenceFrame: Rectangle;

  public get id() {
    return this._id;
  }

  constructor(options: iSceneOptions) {
    super();

    // Update scene options
    this._id = options.id ?? '';
    this.referenceFrame = options.referenceFrame;
    if (options.hideAnimation !== undefined) {
      this.hideAnimationVars = {
        ...this.hideAnimationVars,
        ...options.hideAnimation,
      };
    }
    if (options.showAnimation !== undefined) {
      this.showAnimationVars = {
        ...this.showAnimationVars,
        ...options.showAnimation,
      };
    }

    // Create content container
    this._contentContainer = new Container();
    this.addChild(this._contentContainer);

    // Reset state
    this.reset();
  }

  public async show() {
    await gsap.to(this, this.showAnimationVars);
  }

  public async hide() {
    await gsap.to(this, this.hideAnimationVars);
  }

  public addContent(content: Container) {
    this._contentContainer.addChild(content);
  }

  public removeContent(content: Container) {
    this._contentContainer.removeChild(content);
  }

  public reset() {
    this.alpha = 0;
  }

  public onScreenResize(_drawFrame: { width: number; height: number }) {}
}
