import { Application, Assets, Container, EventEmitter } from 'pixi.js';
import Scene from '../../scenes/scene/scene';
import {
  eGameEvents,
  iGameConfig,
  iGameEventErrorInfo,
  iGameEventNavRequestedInfo,
} from './types';
import Environment from '../environment/environment';
import { eEnvironmentEvents } from '../environment/types';
import FpsDisplay from '../../components/UI/display/fpsDisplay';
import BackButton from '../../components/UI/backButton/backButton';
import { Fullscreen } from '../fullscreen/fullscreen';

/**
 * Game Controller
 *
 * Singleton class that controls the game flow and holds all the needed systems
 */
export default class GameController {
  private static _instance: GameController;
  private static _bus: EventEmitter;
  private static _app: Application;
  private static _environment: Environment;
  private static _fullscreen: Fullscreen;

  protected _config: iGameConfig;
  protected _scenes: Scene[] = [];
  protected _currentSceneIndex: number = -1;
  protected _layerGame!: Container;
  protected _layerUI!: Container;
  protected _backButton!: BackButton;
  protected _drawFrame!: { width: number; height: number };

  protected static get _stage() {
    return GameController._app.stage;
  }

  public static get environment() {
    return GameController._environment;
  }

  public static get game() {
    return GameController._instance;
  }

  public static get bus() {
    return GameController._bus;
  }

  public static get renderer() {
    return GameController._app.renderer;
  }

  public static get assetsResolution() {
    return 1;
  }

  public static get ticker() {
    return GameController._app.ticker;
  }

  /**
   * Creates the game controller instance and initializes all needed systems
   * @param app
   * @returns
   */
  public static async init(
    app: Application,
    environment: Environment,
    config: iGameConfig
  ) {
    GameController._environment = environment;
    GameController._app = app;
    GameController._bus = new EventEmitter();
    GameController._instance = new GameController(config);
    GameController._fullscreen = new Fullscreen();

    return GameController.game.init();
  }

  /**
   * Constructor
   */
  constructor(config: iGameConfig) {
    this._config = config;
    this._drawFrame = {
      width: this._config.referenceSize.width,
      height: this._config.referenceSize.height,
    };
  }

  /**
   * Initializes the game controller and all the needed systems.
   * @returns
   */
  public async init() {
    // First init Error notification system
    GameController._bus.on(eGameEvents.ERROR, this.onError, this);

    // Game Resolution
    Assets.init(this._config.assetsInitOptions);

    // Layers
    this._layerGame = new Container();
    GameController._stage.addChild(this._layerGame);

    this._layerUI = new Container();
    GameController._stage.addChild(this._layerUI);

    // Scenes
    // - Create and add scenes
    this._config.scenes.forEach((sceneConfig) => {
      this._scenes.push(
        new sceneConfig.class({
          ...sceneConfig.options,
          ...{ resolution: GameController.assetsResolution },
        })
      );
    });

    // Listen for navigation requests
    GameController.bus.on(
      eGameEvents.NAVIGATION_REQUESTED,
      this.onNavigationRequested,
      this
    );

    // Add FPS Display
    const fpsDisplay = new FpsDisplay({
      ticker: GameController.ticker,
      poolSize: 10,
    });
    this._layerUI.addChild(fpsDisplay);

    // Back Button
    this._backButton = new BackButton();
    this._backButton.alpha = 0;
    this._backButton.visible = false;
    this._backButton.disable();
    this._layerUI.addChild(this._backButton);

    // Fullscreen
    await GameController._fullscreen.init(
      document.querySelector('.canvas_container') as HTMLElement,
      GameController.environment,
      GameController.bus
    );

    // - Init Main Scene
    this._setSceneByIndex(0);

    // Resize Handling
    this._watchResize();
  }

  /**
   * Takes care of the scene transition from the current one to the next one.
   *
   * @param sceneIndex
   * @returns
   */
  protected async _setSceneByIndex(sceneIndex: number) {
    // Checkif index is valid
    if (sceneIndex < 0 || sceneIndex >= this._scenes.length) return;

    // Handle the scene transition
    const currentScene = this._scenes[this._currentSceneIndex];
    const nextScene = this._scenes[sceneIndex];

    // Disable UI
    this._backButton.disable();

    // Change the scenes
    await nextScene.init();

    this._layerGame.addChild(nextScene);
    nextScene.onScreenResize(this._drawFrame);

    // Show the Back Button?
    if (sceneIndex > 0) {
      this._backButton.show();
    } else {
      this._backButton.hide();
    }

    const currentSceneHide =
      currentScene !== undefined ? currentScene.hide() : null;
    const nextSceneShow = nextScene.show();

    await Promise.all([currentSceneHide, nextSceneShow]);

    if (currentScene !== undefined) {
      await currentScene.reset();
      this._layerGame.removeChild(currentScene);
    }

    // Update scene index
    this._currentSceneIndex = sceneIndex;

    // Enable UI
    this._backButton.enable();
  }

  /**
   * Start listening to environment events to handle screen resize.
   */
  protected _watchResize() {
    GameController.environment.on(
      eEnvironmentEvents.SCREEN_SIZE_CHANGE,
      this.onScreenResize,
      this
    );
    GameController.environment.on(
      eEnvironmentEvents.ORIENTATION_CHANGE,
      this.onScreenResize,
      this
    );
    this.onScreenResize();
  }

  /**
   * Listener callback for navigation requested events.
   * It will change the current scene if the requested scene index is different from the current one.
   *
   * @param event
   */
  public onNavigationRequested(event: iGameEventNavRequestedInfo) {
    if (event.sceneIndex !== this._currentSceneIndex) {
      this._setSceneByIndex(event.sceneIndex);
    }
  }

  /**
   *Listener callback for error events.
   * It will display an alert with the error message.
   *
   * @param event
   */
  public onError(event: iGameEventErrorInfo) {
    alert(event.error);
  }

  /**
   * Listener callback for screen resize events.
   * It will calculate the proper scale to fit the current size and also it will
   * propagate the resize to the rest of the game hierarchy if needed.
   */
  public onScreenResize() {
    // Calculate the proper scale to fit the current size.
    let scale = 1;

    if (GameController.environment.viewportAR < 1) {
      scale =
        GameController._app.canvas.width / this._config.referenceSize.width;
    } else {
      scale =
        GameController._app.canvas.height / this._config.referenceSize.height;
    }

    scale /= GameController.environment.canvasResolution;

    // Calculate the drawFrame size
    this._drawFrame =
      GameController.environment.viewportAR < 1
        ? {
            width: this._config.referenceSize.height,
            height:
              this._config.referenceSize.height /
              GameController.environment.viewportAR,
          }
        : {
            width:
              this._config.referenceSize.height *
              GameController.environment.viewportAR,
            height: this._config.referenceSize.height,
          };

    this._layerGame.scale.set(scale);
    this._layerUI.scale.set(scale);

    // Center the game layer by the reference frame into the draw frame
    this._layerGame.x =
      ((this._drawFrame.width - this._config.referenceSize.width) / 2) * scale;
    this._layerGame.y =
      ((this._drawFrame.height - this._config.referenceSize.height) / 2) *
      scale;

    // Set the Back Button position
    if (this._backButton) {
      this._backButton.x =
        this._drawFrame.width -
        this._backButton.width / 2 -
        this._config.referenceMargin;
      this._backButton.y =
        this._backButton.height / 2 + this._config.referenceMargin;
    }

    // Update the draw frame in the scenes
    if (this._scenes[this._currentSceneIndex]) {
      this._scenes[this._currentSceneIndex].onScreenResize(this._drawFrame);
    }
  }
}
