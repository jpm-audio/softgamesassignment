import gsap from 'gsap';
import { Assets, Color, Container, Rectangle, Sprite } from 'pixi.js';
import { iSceneOptions } from './types';
import createRadialGradientTexture from '../../utils/createRadialGradientTexture';

export default class Scene extends Container {
  protected _id: string = '';
  protected _contentContainer: Container;
  protected _assetsBundleId: string = '';
  protected _isRunning: boolean = false;
  public hideAnimationVars: gsap.TweenVars = { duration: 0.5, alpha: 0 };
  public showAnimationVars: gsap.TweenVars = { duration: 0.5, alpha: 0 };
  public referenceFrame: Rectangle;
  public resolution: number = 1;

  public get id() {
    return this._id;
  }

  public get isRunning() {
    return this._isRunning;
  }

  constructor(options: iSceneOptions) {
    super();

    // Update scene options
    this._id = options.id ?? '';
    this.resolution = options.resolution ?? 1;
    this.referenceFrame = options.referenceFrame;
    this._assetsBundleId = options.assetBundleId ?? '';
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
   * Utility method to create a radial gradient background for the scene.
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
      backgroundRadius * this.resolution,
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
   * It will load the configured assets through the constructor options given.
   */
  public async load() {
    if (this._assetsBundleId !== '') {
      await Assets.loadBundle(this._assetsBundleId);
    }
  }

  /**
   * Override this method to initialize the scene, called right before the scene is shown.
   */
  public async init() {}

  /**
   * Override this method to add content to the scene, called showing the scene.
   */
  public async show() {
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
    this._isRunning = false;
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
