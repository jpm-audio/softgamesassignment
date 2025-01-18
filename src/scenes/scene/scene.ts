import { Assets, Color, Container, Rectangle, Sprite } from 'pixi.js';
import { iSceneOptions } from './types';
import createRadialGradientTexture from '../../utils/createRadialGradientTexture';
import FadeContainer from '../../components/fadeContainer/fadeContainer';

/**
 * Scene
 *
 * Base class for all the scenes of the game. It holds basic and common functionality to all scenes.
 */
export default class Scene extends FadeContainer {
  protected _background!: Sprite;
  protected _id: string = '';
  protected _contentContainer: Container;
  protected _assetsBundleId: string = '';
  protected _isInitialized: boolean = false;
  protected _isRunning: boolean = false;
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
    console.log('Scene::load', this._assetsBundleId);
    if (this._assetsBundleId !== '') {
      await Assets.loadBundle(this._assetsBundleId);
    }
  }

  /**
   * Override this method to initialize the scene, called right before the scene is shown.
   */
  public async init() {}

  /**
   * Override this method to reset the scene, called right after the scene is hidden.
   */
  public reset() {
    this._isRunning = false;
    this.alpha = 0;
  }

  /**
   * To be used instead addChild to add content to the content container.
   *
   * @param content
   */
  public addContent(content: Container) {
    this._contentContainer.addChild(content);
  }

  /**
   * Same as addContent but removes the content from the content container.
   *
   * @param content
   */
  public removeContent(content: Container) {
    this._contentContainer.removeChild(content);
  }

  /**
   * Handles the scene resize event, adapting the background.
   *
   * @param drawFrame
   */
  public onScreenResize(drawFrame: { width: number; height: number }) {
    const size = Math.max(drawFrame.width, drawFrame.height);
    this._background.width = this._background.height = size;
  }
}
