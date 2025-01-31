import { iTextImageBlenderOption } from '../../systems/textImageBlender/types';

export const TASK_1_CONFIG: {
  textInterval: number;
  show: gsap.TweenVars;
  hide: gsap.TweenVars;
} = {
  textInterval: 2000,
  hide: {
    duration: 1,
    alpha: 0,
    ease: 'power2.out',
  },
  show: {
    duration: 1,
    alpha: 1,
    ease: 'power2.in',
  },
};

export const TEXT_IMAGE_BLENDER_OPTIONS: iTextImageBlenderOption = {
  textStyle: { fontSize: 74, fill: 0xffffff, align: 'center' },
  images: [
    '<bear.png>',
    '<buffalo.png>',
    '<chick.png>',
    '<chicken.png>',
    '<cow.png>',
    '<crocodile.png>',
    '<dog.png>',
    '<duck.png>',
    '<elephant.png>',
    '<frog.png>',
    '<giraffe.png>',
    '<goat.png>',
    '<gorilla.png>',
    '<hippo.png>',
    '<horse.png>',
    '<monkey.png>',
    '<moose.png>',
    '<narwhal.png>',
    '<owl.png>',
    '<panda.png>',
    '<parrot.png>',
    '<penguin.png>',
    '<pig.png>',
    '<rabbit.png>',
    '<rhino.png>',
    '<sloth.png>',
    '<snake.png>',
    '<walrus.png>',
    '<whale.png>',
    '<zebra.png>',
  ],
  words: [
    'lorem',
    'ipsum',
    'dolor',
    'sit',
    'amet,',
    'consectetur',
    'adipiscing',
    'elit',
    'etiam',
    'commodo',
    'ullamcorper',
    'mauris,',
    'ut',
    'tincidunt',
    'metus',
    'sagittis',
    'vitae',
    'nulla',
    'pharetra',
    'nulla',
    'in',
    'massa',
    'venenatis',
    'fermentum',
    'in',
    'vel',
    'ipsum',
    'duis',
    'faucibus',
    'placerat',
    'fringilla',
    'vivamus',
    'imperdiet',
    'enim',
    'quis',
    'quam',
    'cursus',
    'condimentum',
    'suspendisse',
    'cursus,',
    'urna',
    'id',
    'aliquet',
    'pulvinar,',
    'massa',
    'libero',
    'pretium',
    'dui,',
    'ac',
    'suscipit',
    'lorem',
    'quam',
    'quis',
    'leo',
    'vestibulum',
    'ultricies,',
    'nibh',
    'ac',
    'feugiat',
    'facilisis,',
    'purus',
    'metus',
    'aliquam',
    'ante,',
    'at',
    'scelerisque',
    'est',
    'leo',
    'ut',
    'tellus',
    'aenean',
    'ac',
    'purus',
    'mollis,',
    'cursus',
    'sapien',
    'eget,',
    'vestibulum',
    'lorem',
    'morbi',
    'non',
    'lobortis',
    'lacus',
    'phasellus',
    'diam',
    'est,',
    'pulvinar',
    'et',
    'consequat',
    'a,',
    'varius',
    'vitae',
    'lacus',
    'vestibulum',
    'consequat',
    'consectetur',
    'risus,',
    'non',
    'maximus',
    'ex',
    'bibendum',
    'sed',
    'duis',
    'et',
    'ultrices',
    'dolor,',
    'ac',
    'ullamcorper',
    'dolor',
    'vestibulum',
    'eleifend',
    'ligula',
    'sit',
    'amet',
    'lorem',
    'hendrerit,',
    'sed',
    'dictum',
    'dolor',
    'accumsan',
    'quisque',
    'commodo',
    'mi',
    'eget',
    'lectus',
    'auctor',
    'rutrum',
    'vestibulum',
    'ligula',
    'nulla,',
    'suscipit',
    'et',
    'metus',
    'et,',
    'aliquet',
    'tempor',
    'nibh',
    'morbi',
    'mauris',
    'orci,',
    'facilisis',
    'eget',
    'turpis',
    'vitae,',
    'placerat',
    'sagittis',
    'tortor',
    'orci',
    'varius',
    'natoque',
    'penatibus',
    'et',
    'magnis',
    'dis',
    'parturient',
    'montes,',
    'nascetur',
    'ridiculus',
    'mus',
  ],
};
