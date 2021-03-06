import * as PIXI from 'pixi.js';
import firebase from "firebase/app";
import 'firebase/storage';
// console.log(mobileCheck() ? window.devicePixelRatio : 3);

const isMobile = mobileCheck();
const isFirebase = false;


const app = new PIXI.Application({
    antialias: false,    // default: false
    //transparent: true, // default: false
    resolution: window.devicePixelRatio,
    backgroundColor: 0xEEEEEE,
    interactive: true,
    resizeTo: window,
    autoDensity: true,


});

PIXI.settings.RESOLUTION = window.devicePixelRatio;

document.body.appendChild(app.view);






let numOfSpriteSheets = 2;
var sheets = [];
let plants = [
    'plants01',
    'plants02',
    'plants03',
    'plants04',
    'plants05',
    'plants06',
    'plants07',
];
let sheet;
let sheetPath;
let logo;
let interactionManager;
let stage = app.stage;

// if (numOfSpriteSheets >= 1) {
//     for (var i = 1; i < numOfSpriteSheets + 1; i++) {
//         app.loader.add(sheetPath + '0' + i + '.json')

//     }
// }



// if (isFirebase) {
//     setupFirebase();
// } else {
sheetPath = 'assets/sheets/sprites';
if (numOfSpriteSheets >= 1) {
    for (var i = 1; i < numOfSpriteSheets + 1; i++) {
        app.loader.add(sheetPath + '0' + i + '.json')

    }
}
app.loader
    .add('assets/logoGold.png')
    // .add(sheetPath)
    .load(setup);
// }

function setup() {

    let bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.width = app.screen.width;
    bg.height = app.screen.height;
    stage.addChild(bg);
    stage.sortableChildren = true;
    stage.hitArea = new PIXI.Rectangle(0, 0, stage.width, stage.height);




    // if (isFirebase) {
    //     console.log(sheetPath);
    //     console.log("a", app.loader.resources.atlas.baseTexture);
    //     sheets[0] = app.loader.resources[sheetPath].spritesheet;
    // } else {
    for (var i = 1; i < numOfSpriteSheets + 1; i++) {
        sheets[i - 1] = app.loader.resources[sheetPath + '0' + i + '.json'].spritesheet;
        console.log(sheets[i - 1]);
    }
    // }

    console.log(sheets);
    AddLogo()
    bg.interactive = true;
    bg.on('pointerdown', onPointerDown);
}


function AddLogo() {
    logo = new PIXI.Sprite(app.loader.resources['assets/logoGold.png'].texture);
    logo.anchor.x = 0.5;
    logo.anchor.y = 0.5;
    logo.position.set(stage.width / 2, stage.height / 2);
    logo.zIndex = 50;
    stage.addChild(logo);
}

function onPointerDown(e) {
    console.log(e.data.global);
    let pos = e.data.global;
    var spriteAnimations = randomFromArray(sheets).animations;
    console.log(randomProp(spriteAnimations))
    var animation = new PIXI.AnimatedSprite(randomProp(spriteAnimations))
    animation.animationSpeed = 0.15;

    animation.scale.x = Math.cos(Math.PI * randomInt(1, 10));
    animation.scale.set(isMobile ? 1 * Math.cos(Math.PI * randomInt(1, 10)) : 0.5 * Math.cos(Math.PI * randomInt(1, 10)), isMobile ? 1 : 0.5);
    // animation.rotation = randomFloat(-100, 100);
    animation.play();
    animation.position.set(pos.x, pos.y);
    animation.zIndex = randomInt(1, 75);
    app.stage.addChild(animation);
    animation.onLoop = function () {
        // looped!
        // console.log("on loop")
        animation.gotoAndPlay(this.totalFrames - 1);
    };
    // animation.onLoop(spriteOnLoop)
}

function randomFromArray(array) {
    return array[randomInt(0, array.length)];
}

function spriteOnLoop() {
    console.log("on loop")
    this.gotoAndPlay(this.totalFrames - randomInt(2, 5));
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max + (min)))
}

function randomFloat(min, max) {
    return (Math.random() * (max + (min)))
}




function mobileCheck() {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};



var randomProp = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
};



// function setupFirebase() {
//     var firebaseConfig = {
//         apiKey: "AIzaSyCLn0eciH3JDcDDyTnYJjTKQpLzONSabtc",
//         authDomain: "stoneroad-13803.firebaseapp.com",
//         projectId: "stoneroad-13803",
//         storageBucket: "stoneroad-13803.appspot.com",
//         messagingSenderId: "268130487831",
//         appId: "1:268130487831:web:94c13407507421504d5652"
//     };
//     // Initialize Firebase
//     firebase.initializeApp(firebaseConfig);

//     console.log("firebase connected")
//     var storage = firebase.storage();
//     var jsonRef = storage.refFromURL('gs://stoneroad-13803.appspot.com/spritesheet.json')
//     var pngRef = storage.refFromURL('gs://stoneroad-13803.appspot.com/spritesheet.json');
//     console.log(jsonRef.getDownloadURL());

//     jsonRef.getDownloadURL().then(function (url) {

//         console.log("b", url);
//         sheetPath = url;

//         app.loader
//             .add('atlas', url)
//             .load(setup);
//         // This can be downloaded directly:
//         var xhr = new XMLHttpRequest();
//         xhr.responseType = 'blob';
//         xhr.onload = function (event) {
//             var blob = xhr.response;
//         };
//         xhr.open('GET', url);
//         xhr.send();

//         // Or inserted into an <img> element:
//         var img = document.getElementById('myimg');
//         img.src = url;
//     }).catch(function (error) {
//         // Handle any errors
//     });



// }