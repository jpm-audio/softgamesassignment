import { Container, Sprite, Texture } from 'pixi.js';

export default class Card extends Container {
  public id: string;
  public back: Sprite;
  public front: Sprite;

  constructor(id: string, frame: Texture, front: Texture, back: Texture) {
    super();

    this.id = id;

    const frameSprite = Sprite.from(frame);
    this.front = Sprite.from(front);
    this.back = Sprite.from(back);

    frameSprite.anchor.set(0.5, 0.5);
    this.front.anchor.set(0.5, 0.5);
    this.back.anchor.set(0.5, 0.5);

    this.addChild(frameSprite);
    this.addChild(this.front);
    this.addChild(this.back);

    this.reset();
  }

  /**
   * Flip the card by swapping the front and back sprites visibility
   */
  public flip() {
    this.back.visible = !this.back.visible;
    this.front.visible = !this.front.visible;
  }

  /**
   * Reset the card properties to their initial state
   */
  public reset() {
    this.back.visible = true;
    this.front.visible = false;
    this.x = 0;
    this.y = 0;
    this.scale.set(1);
    this.skew.set(0);
  }
}
