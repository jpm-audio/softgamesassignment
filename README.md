# jPm - Softgames Assignment

Game Developer Assignment for Softgames created by Jesús Pérez de Miguel <jesus@perezdemiguel.com>

## Comments

### Pixi.js Version not v7 but v8.6.1.

The assignment specifies v7, but I've been using v8 for months and I'd rather not spend time remembering the differences between versions. So I've decided to use v8 which I'm currently more familiar with.

### Tweens with GSAP <https://gsap.com/>

The project uses GSAP library for tween animations since it works with no issues with Pixi.js v8 and it has great support and documentation.

### Environment Detection

I decided to add a custom environment detection class that I had already developed, which also uses some functionality from the ua-parser-js library.
Decision made also to save time and focus on the tasks at hand.

### Fullscreen with fsScreen <https://github.com/rafgraph/fscreen#readme>

To meet the full screen requirement, I use the fsScreen library to work regardless of the browser. To use it, there is a class created by me that handles the full screen functionality.

## Run

To play the game in local environment just run

```bash
  npm run dev
```

## Build

To create a new build of the game run

```bash
  npm run build
```
