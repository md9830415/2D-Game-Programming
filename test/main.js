//------------Init-----------------------------------
var ctx, width, height;
var ctx_font = "Consolas",
    ctx_fontsize = 10,
    ctx_backColor = "#777";

var animation,
    lastTime = 0,
    loop = true;

window.onload = function () {
    document.addEventListener("keydown", keydown, false);
    document.addEventListener("keyup", keyup, false);

    main();
}
//--------------------------------------------

var keys = {};
var player, tilemap;

function main() {
    console.log("Start");


    Loader.loadImage("player", "resource/character.png");
    Loader.loadImage("tiles", "resource/tiles.png");

    ctx = CreateDisplay("myCanvas", 512, 512);
    width = ctx.canvas.width; height = ctx.canvas.height;

    player = new Player(100, 100);
    tilemap = new Tilemap("tiles", 64);

    window.requestAnimationFrame(mainLoop);
}


function update(dt) {
    let dirx = 0, diry = 0;

    if (keys[37]) dirx = -1;
    else if (keys[39]) dirx = 1;
    else if (keys[38]) diry = -1;
    else if (keys[40]) diry = 1;
    player.update(dt, dirx, diry);
}

function draw(ctx) {
    tilemap.draw(ctx, 0);
    player.draw(ctx);
    tilemap.draw(ctx, 1);
}

function mainLoop(timestamp) {
    let Timesub = timestamp - lastTime;// get sleep
    let DeltaTime = Timesub / 1000;
    lastTime = timestamp;
    //Clear
    ctx.fillStyle = ctx_backColor;
    ctx.fillRect(0, 0, width, height);
    //--------Begin-----------

    update(DeltaTime);
    draw(ctx);

    //--------End---------------

    let debugStr = [
        "Fps: " + 1000 / Timesub,
        "Timesub: " + Timesub,
        "DeltaTime: " + DeltaTime
    ];
    drawString(ctx, debugStr.join("\n"),
        0, height - debugStr.length * ctx_fontsize,
        "#FFF", ctx_fontsize, ctx_font);

    if (loop) {
        animation = window.requestAnimationFrame(mainLoop);
    } else {
        // over
    }
}


function keydown(e) {
    keys[e.keyCode] = true;
};
function keyup(e) {
    delete keys[e.keyCode];
}


//----tool-------
function toRadio(angle) {
    return angle * Math.PI / 180;
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function random(min, max) {
    return Math.random() * (max - min) + min;
}

//---------------------
function CreateDisplay(id, width, height) {
    let canvas = document.createElement("canvas");
    canvas.id = id;
    canvas.width = width;
    canvas.height = height;
    canvas.style.cssText = [
        "display: block;",
        "margin: 0 auto;",
        "background: #FFF;",
        "border:1px solid #000;"
    ].join("");
    document.body.appendChild(canvas);

    return canvas.getContext("2d");
}