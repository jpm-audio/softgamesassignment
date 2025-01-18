import { Texture } from 'pixi.js';
import Card from './card';

export default class CardsFactory {
  public static card(id: string) {
    const cardFrameTexture = Texture.from('card.png');
    const cardBackTexture = Texture.from('card_back_image.png');
    const cardFrontTexture = Texture.from(`genericItem_color_${id}.png`);
    return new Card(id, cardFrameTexture, cardFrontTexture, cardBackTexture);
  }
}
