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
let plants = ['plant01',
    'plant02',
    'plant03',
    'plant04',
    'plant05',
    'plant06',
    'plant07',
    'plant08',
    'plant09',
    'plant10',
    'plant11',
    'plant12',
    'plant13',
    'plant14',
    'plant15',
    'plant16',
    'plant17',
    'plant18',
    'plant19',
    'plant20',
];
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
    var animation = new PIXI.AnimatedSprite(sheet.animations[randomFromArray(plants) + '/sr'])
    animation.animationSpeed = 0.15;
    animation.scale.x = Math.cos(Math.PI * randomInt(1, 10));
    // animation.rotation = randomFloat(-100, 100);
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

function randomFromArray(array) {
    return array[randomInt(0, array.length - 1)];
}

function spriteOnLoop() {
    console.log("on loop")
    this.gotoAndPlay(this.totalFrames - randomInt(2, 5));
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max + (min + 1)))
}

function randomFloat(min, max) {
    return (Math.random() * (max + (min)))
}

// class MySprite{
//     constructor(path) {

//     }
// }