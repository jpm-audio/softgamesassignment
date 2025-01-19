import {
  Container,
  Sprite,
  Text,
  TextStyle,
  Texture,
  CanvasTextMetrics,
} from 'pixi.js';
import { iTextImageBlenderOption } from './types';

/**
 * Text-Image Blender
 *
 * It will create a random line of text or image elements based on the options given.
 */
export default class TextImageBlender {
  private _textMetrics: CanvasTextMetrics;
  private _options: iTextImageBlenderOption = {
    resolution: 1,
    lineMaxElements: 6,
    lineMinElements: 2,
    lineTimeInterval: 2000,
    images: [],
    words: [],
    textStyle: { fontSize: 24, fill: 0xffffff },
  };

  constructor(options: iTextImageBlenderOption) {
    this._options = { ...this._options, ...options };

    const textStyle = new TextStyle(this._options.textStyle);

    this._textMetrics = CanvasTextMetrics.measureText(' ', textStyle);
  }

  /**
   * It returns a random list of elements to compose a text/image line to blend.
   * It can be improved balancing the chances of adding an image or text element,
   * but right now is 50% chance either text or image.
   *
   * Once it is choose the type of element, a random one from the list of images or words
   * will be chosen and added to the line.
   *
   * @returns
   */
  public getRandomLine(): string[] {
    const minElements = this._options.lineMinElements as number;
    const maxElements = this._options.lineMaxElements as number;
    const numElements =
      Math.floor(Math.random() * (maxElements - minElements + 1)) + minElements;
    const line = [];

    for (let i = 0; i < numElements; i++) {
      const isImage = Math.random() < 0.5;
      const sourceList = isImage ? this._options.images : this._options.words;
      const elementIndex = Math.floor(Math.random() * sourceList.length);
      const element = sourceList[elementIndex];
      line.push(element);
    }

    return line;
  }

  /**
   * Factory method to create a Container with the elements of the line.
   * It will add a sprite per each image element in the line, or a text element,
   * with the text style given in the options.
   *
   * @param line
   * @returns
   */
  public buildLine(line: string[]): Container {
    const container = new Container();

    if (line.length === 0) return container;

    line.forEach((element, index) => {
      const offset = index ? this._textMetrics.width : 0;

      if (element.startsWith('<')) {
        const sprite = new Sprite(Texture.from(this.parseImageName(element)));
        sprite.height = this._textMetrics.lineHeight;
        sprite.scale.x = sprite.scale.y;
        sprite.x = offset + container.width;
        container.addChild(sprite);
      } else {
        const elementText = index > 0 ? element : this.capitalizeText(element);
        const fontSize = this.getRandomFontSize();
        const style = {
          ...this._options.textStyle,
          ...{ fontSize },
        };

        const text = new Text({
          text: elementText,
          style: style,
          resolution: this._options.resolution,
        });
        text.x = offset + container.width;
        container.addChild(text);
      }
    });

    return container;
  }

  /**
   * It returns a random font size for the text, calculated by variating
   * between a 50% and a 150% of the default font size.
   *
   * @returns
   */
  public getRandomFontSize() {
    const textStyle = this._options.textStyle as TextStyle;
    const defaultFontSize = textStyle.fontSize;
    return defaultFontSize * (0.5 + Math.random());
  }

  /**
   * Parser/helper method to remove the <> characters from the image name.
   *
   * @param imageName
   * @returns
   */
  public parseImageName(imageName: string): string {
    return imageName.replace('<', '').replace('>', '');
  }

  /**
   * Helper method to capitalize the first letter of a text string given.
   *
   * @param text
   * @returns
   */
  public capitalizeText(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
