import { Rectangle } from 'pixi.js';
import { iGameConfig, iGameSceneDefinition } from './types';
import { iSceneOptions } from '../../scenes/scene/types';
import SceneTask1 from '../../scenes/task1/sceneTask1';
import SceneTask2 from '../../scenes/task2/sceneTask2';
import SceneTask3 from '../../scenes/task3/sceneTask3';
import SceneMain from '../../scenes/main/sceneMain';

const mainFrame = new Rectangle(0, 0, 1280, 1280);

const commonSceneOptions: iSceneOptions = {
  referenceFrame: mainFrame,
  hideAnimation: {
    duration: 1,
    alpha: 0,
    ease: 'power2.out',
  },
  showAnimation: {
    duration: 1,
    alpha: 1,
    ease: 'power2.in',
  },
};

const SCENE_MAIN_CONFIG: iGameSceneDefinition = {
  class: SceneMain,
  options: { ...commonSceneOptions, ...{ id: 'main' } },
};

const SCENE1_CONFIG: iGameSceneDefinition = {
  class: SceneTask1,
  options: {
    ...commonSceneOptions,
    ...{
      id: 'task1',
      load: {
        name: 'tasks1_bundle',
        assets: { alias: 'task1', src: 'assets/sprites/task_1_0.json' },
      },
    },
  },
};

const SCENE2_CONFIG: iGameSceneDefinition = {
  class: SceneTask2,
  options: { ...commonSceneOptions, ...{ id: 'task2' } },
};

const SCENE3_CONFIG: iGameSceneDefinition = {
  class: SceneTask3,
  options: { ...commonSceneOptions, ...{ id: 'task3' } },
};

export const GAME_CONFIG: iGameConfig = {
  referenceSize: mainFrame,
  scenes: [SCENE_MAIN_CONFIG, SCENE1_CONFIG, SCENE2_CONFIG, SCENE3_CONFIG],
};
