import { Container, DestroyOptions } from 'pixi.js';
import { eButtonState, iButtonOptions } from './types';

export class Button extends Container {
  protected _states = new Map<eButtonState, Container>();
  protected _layerStates: Container;

  public get isDisabled() {
    return this._layerStates.eventMode === 'none';
  }

  constructor(options: iButtonOptions) {
    super();

    this._layerStates = new Container();
    this.addChild(this._layerStates);

    // Normal State
    const normalState = options.states[eButtonState.NORMAL];
    this._states.set(eButtonState.NORMAL, normalState);
    this._layerStates.addChild(normalState);

    // Hover State
    if (options.states[eButtonState.HOVER]) {
      const hoverState = options.states[eButtonState.HOVER];
      this._states.set(eButtonState.HOVER, hoverState);
      this._layerStates.addChild(hoverState);
    }

    // Active State
    if (options.states[eButtonState.ACTIVE]) {
      const activeState = options.states[eButtonState.ACTIVE];
      this._states.set(eButtonState.ACTIVE, activeState);
      this._layerStates.addChild(activeState);
    }

    // Disabled State
    if (options.states[eButtonState.DISABLED]) {
      const disabledState = options.states[eButtonState.DISABLED];
      this._states.set(eButtonState.DISABLED, disabledState);
      this._layerStates.addChild(disabledState);
    }

    this._setupEvents();
  }

  protected _setupEvents() {
    this.on('pointerdown', this._onPointerDown, this);
    this.on('pointerup', this._onPointerUp, this);
    this.on('pointerover', this._onPointerOver, this);
    this.on('pointerout', this._onPointerOut, this);
  }

  protected _removeEvents() {
    this.off('pointerdown', this._onPointerDown, this);
    this.off('pointerup', this._onPointerUp, this);
    this.off('pointerover', this._onPointerOver, this);
    this.off('pointerout', this._onPointerOut, this);
  }

  protected _hideAllStates() {
    this._states.forEach((state) => {
      state.visible = false;
    });
  }

  protected _onPointerDown() {
    this._hideAllStates();

    const activeState = this._states.get(eButtonState.ACTIVE);
    if (activeState) {
      activeState.visible = true;
    }
  }

  // Handle pointer up event
  protected _onPointerUp() {
    this._hideAllStates();
    const normalState = this._states.get(eButtonState.NORMAL);
    if (normalState) {
      normalState.visible = true;
    }
  }

  // Handle pointer over event
  protected _onPointerOver() {
    this._hideAllStates();
    const hoverState = this._states.get(eButtonState.HOVER);
    if (hoverState) {
      hoverState.visible = true;
    }
  }

  // Handle pointer out event
  protected _onPointerOut() {
    this._hideAllStates();
    const normalState = this._states.get(eButtonState.NORMAL);
    if (normalState) {
      normalState.visible = true;
    }
  }

  protected _onEnabled() {
    this._hideAllStates();
    const normalState = this._states.get(eButtonState.NORMAL);
    if (normalState) {
      normalState.visible = true;
    }
  }

  protected _onDisabled() {
    this._hideAllStates();
    const disabledState = this._states.get(eButtonState.DISABLED);
    if (disabledState) {
      disabledState.visible = true;
    }
  }

  public disable() {
    this.eventMode = 'none';
    this.cursor = 'default';
    this._onDisabled();
  }

  public enable() {
    this.eventMode = 'static';
    this.cursor = 'pointer';
    this._onEnabled();
  }

  public destroy(options?: DestroyOptions): void {
    this._removeEvents();
    super.destroy(options);
  }
}
