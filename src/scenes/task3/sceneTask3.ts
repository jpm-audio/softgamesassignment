import { Color, FederatedPointerEvent } from 'pixi.js';
import Scene from '../scene/scene';
import { iSceneOptions } from '../scene/types';
import { ParticleEmitter } from '../../systems/particles/ParticleEmitter';
import { FIRE_PARTICLES_CONFIG } from '../../components/fire/configs/fireConfig';

export default class SceneTask3 extends Scene {
  protected _fireEmitter!: ParticleEmitter;

  constructor(options: iSceneOptions) {
    super(options);

    this._background = this._getBackgroundGradient([
      { color: new Color(0x00fe50), stop: 0 },
      { color: new Color(0x000000), stop: 1 },
    ]);
    this._background.anchor.set(0.5);
    this._background.x = this.referenceFrame.width / 2;
    this._background.y = this.referenceFrame.height / 2;

    this.addChildAt(this._background, 0);
  }

  public async init() {
    if (this._isInitialized) return;
    this._isInitialized = true;

    // Load the assets
    await this.load();

    // Create the particle emitter for the fire
    this._fireEmitter = new ParticleEmitter(FIRE_PARTICLES_CONFIG);
    this._fireEmitter.x = this.referenceFrame.width / 2;
    this._fireEmitter.y = this.referenceFrame.height / 2;
    this.addChild(this._fireEmitter);

    // Set interaction for moving the fire location by pressing on the screen
    this._background.on('pointerdown', this._onBackgroundPress, this);
  }

  public async show() {
    await super.show();
    // Start fire emission
    this._animate();
    this.enable();
  }

  protected _onBackgroundPress(e: FederatedPointerEvent) {
    // Set the fire location to the pointer position
    this._fireEmitter.x = e.client.x;
    this._fireEmitter.y = e.client.y;
  }

  public async _animate() {
    if (!this._isInitialized) return;
    this._fireEmitter.start(true);
  }

  public async reset() {
    if (!this._isInitialized) return;
    this._fireEmitter.stop();
  }

  public enable() {
    this._background.eventMode = 'static';
    this._background.cursor = 'pointer';
  }

  public disable() {
    this._background.eventMode = 'none';
    this._background.cursor = 'default';
  }
}
