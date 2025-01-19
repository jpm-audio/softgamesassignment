import { Texture } from 'pixi.js';
import { ParticleItem } from '../../systems/particles/ParticleItem';
import { randomListItem } from '../../utils/random';

const textureNames = [
  'particle_fire_0.png',
  'particle_fire_1.png',
  'particle_fire_2.png',
  'particle_fire_3.png',
  'particle_fire_4.png',
  'particle_fire_5.png',
  'particle_fire_6.png',
  'particle_fire_7.png',
  'particle_fire_8.png',
  'particle_fire_9.png',
];

export class FireParticle extends ParticleItem {
  constructor() {
    super(Texture.from(randomListItem(textureNames as [])));
  }
}
