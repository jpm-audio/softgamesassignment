import { FillGradient } from 'pixi.js';
import { eButtonState, iButtonBuilderConfig } from '../types';

export const PRIMARY_BUTTON_CONFIG: iButtonBuilderConfig = {
  fill: {
    [eButtonState.NORMAL]: (width: number, height: number) => {
      const grd = new FillGradient(width / 2, 0, width / 2, height);
      grd.addColorStop(0, 0x63104d);
      grd.addColorStop(0.5, 0xbc0980);
      grd.addColorStop(0.55, 0x9b0072);
      grd.addColorStop(1, 0xfc88d9);
      return grd;
    },
    [eButtonState.HOVER]: (width: number, height: number) => {
      const grd = new FillGradient(width / 2, 0, width / 2, height);
      grd.addColorStop(0, 0xfc88d9);
      grd.addColorStop(0.5, 0x9b0072);
      grd.addColorStop(0.55, 0xbc0980);
      grd.addColorStop(1, 0x63104d);

      return grd;
    },
    [eButtonState.ACTIVE]: (width: number, height: number) => {
      const grd = new FillGradient(width / 2, 0, width / 2, height);
      grd.addColorStop(0, 0xfc88d9);
      grd.addColorStop(1, 0xffffff);
      return grd;
    },
    [eButtonState.DISABLED]: (width: number, height: number) => {
      const grd = new FillGradient(width / 2, 0, width / 2, height);
      grd.addColorStop(0, 0x999999);
      grd.addColorStop(0.5, 0x898989);
      grd.addColorStop(0.51, 0x7c7c7c);
      grd.addColorStop(1, 0xfc88d9);
      return grd;
    },
  },
  stroke: {
    [eButtonState.NORMAL]: () => {
      return {
        color: 0xffffff,
      };
    },
    [eButtonState.HOVER]: () => {
      return {
        color: 0xffffff,
      };
    },
    [eButtonState.ACTIVE]: () => {
      return {
        color: 0x63104d,
      };
    },
    [eButtonState.DISABLED]: () => {
      return {
        color: 0xffffff,
      };
    },
  },
  textStyle: {
    [eButtonState.NORMAL]: () => {
      return {
        fontFamily: 'Arial',
        fontSize: 40,
        fontWeight: 'bold',
        fill: 0xffffff,
      };
    },
    [eButtonState.HOVER]: () => {
      return {
        fontFamily: 'Arial',
        fontSize: 40,
        fontWeight: 'bold',
        fill: 0xffffff,
      };
    },
    [eButtonState.ACTIVE]: () => {
      return {
        fontFamily: 'Arial',
        fontSize: 40,
        fontWeight: 'bold',
        fill: 0xffffff,
      };
    },
    [eButtonState.DISABLED]: () => {
      return {
        fontFamily: 'Arial',
        fontSize: 40,
        fontWeight: 'bold',
        fill: 0xffffff,
      };
    },
  },
};
