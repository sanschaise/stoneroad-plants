import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    antialias: false,    // default: false
    //transparent: true, // default: false
    resolution: 2,
    backgroundColor: 0xEEEEEE,
    interactive: true,
    resizeTo: window,
    autoDensity: true,


});

document.body.appendChild(app.view);

let sheetPath = 'assets/spritesheet.json';
let sheet;
let interactionManager;
let stage = app.stage;

app.loader
    .add(sheetPath)
    .load(setup);

function setup() {
    let bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.width = app.screen.width;
    bg.height = app.screen.height;
    app.stage.addChild(bg);
    stage.hitArea = new PIXI.Rectangle(0, 0, stage.width, stage.height);
    sheet = app.loader.resources[sheetPath].spritesheet;

    bg.interactive = true;
    bg.on('pointerdown', onPointerDown);
}


function onPointerDown(e) {
    console.log(e.data.global);
    let pos = e.data.global;
    var animation = new PIXI.AnimatedSprite(sheet.animations['plant01/sr'])
    animation.animationSpeed = 0.15;
    animation.play();
    animation.position.set(pos.x, pos.y);
    app.stage.addChild(animation);
    animation.onLoop = function () {
        // looped!
        // console.log("on loop")
        animation.gotoAndPlay(this.totalFrames - 3);
    };
    // animation.onLoop(spriteOnLoop)
}


function spriteOnLoop() {
    console.log("on loop")
    this.gotoAndPlay(this.totalFrames - randomInt(2, 5));
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max + (min + 1)))
}
// class MySprite{
//     constructor(path) {

//     }
// }