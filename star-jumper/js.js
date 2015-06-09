
//Line 1 is where you bring Phaser to life by creating an instance of a Phaser.Game object and assigning it to a local variable called 'game'.
//The first two parameters are the width and the height of the canvas element that Phaser will create. In this case 800 x 600 pixels but changed to 150%.

//The third parameter can be either Phaser.CANVAS, Phaser.WEBGL, or Phaser.AUTO. This is the rendering context that you want to use.
//The recommended parameter is Phaser.AUTO which automatically tries to use WebGL, but if the browser or device doesn't support it it'll fall back to Canvas.

//The fourth parameter is an empty string, this is the id of the DOM element in which you would like to insert the canvas element that Phaser creates.
//As we've left it blank it will simply be appended to the body. The final parameter is an object containing four references to Phasers essential functions.

var game = new Phaser.Game(1200, 900, Phaser.AUTO, '', { preload: preload, create: create, update: update });

//You load assets by putting calls to game.load inside of a function called preload.
//Phaser will automatically look for this function when it starts and load anything defined within it.

function preload() {

}

function create() {
}

function update() {
}
