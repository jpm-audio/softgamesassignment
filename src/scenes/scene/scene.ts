import gsap from 'gsap';
import { Color, Container, Rectangle, Sprite } from 'pixi.js';
import { iSceneOptions } from './types';
import createRadialGradientTexture from '../../utils/createRadialGradientTexture';
import GameController from '../../systems/game/gameController';

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

  /**
   * Uitility method to create a radial gradient background for the scene.
   *
   * @param colorStops
   * @returns
   */
  protected _getBackgroundGradient(
    colorStops: {
      color: Color;
      stop: number;
    }[]
  ) {
    // Background
    const backgroundRadius = Math.max(
      this.referenceFrame.width,
      this.referenceFrame.height
    );
    const bgTexture = createRadialGradientTexture(
      backgroundRadius * GameController.assetsResolution,
      colorStops
    );
    const background = Sprite.from(bgTexture);
    background.anchor.set(0.5);
    background.width = background.height = backgroundRadius;
    background.x = this.referenceFrame.width / 2;
    background.y = this.referenceFrame.height / 2;
    return background;
  }

  /**
   * Override this method to initialize the scene, called right before the scene is shown.
   */
  public async init() {}

  /**
   * Override this method to add content to the scene, called showing the scene.
   */
  public async show() {
    console.log('show', this.showAnimationVars);
    await gsap.to(this, this.showAnimationVars);
  }

  /**
   * Override this method to hide content from the scene, called for hiding the scene.
   */
  public async hide() {
    await gsap.to(this, this.hideAnimationVars);
  }

  /**
   * Override this method to reset the scene, called right after the scene is hidden.
   */
  public reset() {
    this.alpha = 0;
  }

  public addContent(content: Container) {
    this._contentContainer.addChild(content);
  }

  public removeContent(content: Container) {
    this._contentContainer.removeChild(content);
  }

  public onScreenResize(_drawFrame: { width: number; height: number }) {}
}
