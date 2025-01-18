import { Container, Graphics, Text, Ticker } from 'pixi.js';
import { iFpsDisplayOptions } from './types';

class FpsDisplay extends Container {
  protected _fpsText: Text;
  protected _measures: number[] = [];
  protected _options: iFpsDisplayOptions = {
    ticker: new Ticker(),
    padding: 20,
    margin: 50,
    poolSize: 10,
    textStyle: {
      text: '60 fps',
      style: {
        fontSize: 46,
        fill: 0xffffff,
      },
      resolution: 1,
    },
  };

  constructor(options: iFpsDisplayOptions) {
    super();

    this._options = { ...this._options, ...options };

    this._fpsText = new Text(this._options.textStyle);
    const rect = new Graphics();

    const padding = this._options.padding as number;
    rect.rect(
      -padding,
      -padding,
      this._fpsText.width + 2 * padding,
      this._fpsText.height + 2 * padding
    );
    rect.fill({ color: 0x000000, alpha: 0.5 });
    rect.stroke({ color: 0xffffff, alpha: 0.5, width: 2 });

    rect.x = this._fpsText.x = this._options.margin as number;
    rect.y = this._fpsText.y = this._options.margin as number;

    this.addChild(rect);
    this.addChild(this._fpsText);

    if (this._options.ticker) this._options.ticker.add(this.update, this);
  }

  public update(ticker: Ticker) {
    this._measures.push(ticker.FPS);
    if (this._measures.length > this._options.poolSize) {
      this._measures.shift();
    }

    const average =
      this._measures.reduce((a, b) => a + b, 0) / this._measures.length;

    this._fpsText.text = `${Math.round(average).toString()} fps`;
  }
}

export default FpsDisplay;
