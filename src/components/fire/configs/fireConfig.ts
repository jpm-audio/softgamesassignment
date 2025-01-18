import {
  iParticleEmitterOptions,
  TParticleOptionRange,
} from '../../../systems/particles/types';
import { FireParticle } from '../fireParticle';

export const FIRE_PARTICLES_CONFIG: iParticleEmitterOptions = {
  ClassType: FireParticle,
  initialSize: 1,
  maxParticles: 10,
  spawnOptions: {
    lifespan: [0.35, 0.5],
    position: {
      x: [-10, 10],
      y: [-10, 10],
      velocityX: [-150, 150] as TParticleOptionRange,
      velocityY: [-750, -1000] as TParticleOptionRange,
    },
    //rotation: {
    //  value: [-Math.PI, Math.PI] as TParticleOptionRange,
    //  velocity: [-Math.PI / 4, Math.PI / 4] as TParticleOptionRange,
    //},
    scale: {
      start: [0.25, 0.5],
      end: [2, 3],
    },
    color: {
      start: 0xffffff,
      end: 0xff0000,
    },
    alpha: {
      start: 1,
      end: 0,
    },
  },
  updateOptions: {
    spawnRate: { value: 25 },
    interval: 32,
  },
};
