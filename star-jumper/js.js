
//Line 1 is where you bring Phaser to life by creating an instance of a Phaser.Game object and assigning it to a local variable called 'game'.
//The first two parameters are the width and the height of the canvas element that Phaser will create. In this case 800 x 600 pixels but changed to 150%.

//The third parameter can be either Phaser.CANVAS, Phaser.WEBGL, or Phaser.AUTO. This is the rendering context that you want to use.
//The recommended parameter is Phaser.AUTO which automatically tries to use WebGL, but if the browser or device doesn't support it it'll fall back to Canvas.

//The fourth parameter is an empty string, this is the id of the DOM element in which you would like to insert the canvas element that Phaser creates.
//As we've left it blank it will simply be appended to the body. The final parameter is an object containing four references to Phasers essential functions.

var game = new Phaser.Game(1200, 900, Phaser.AUTO, '', { preload: preload, create: create, update: update });

//You load assets by putting calls to game.load inside of a function called preload.
//Phaser will automatically look for this function when it starts and load anything defined within it.

//This will load in 4 assets: 3 images and a sprite sheet.
//The first parameter aka the asset key is a string i.e. 'sky' which is link to the loaded asset and is what you'll use in your code when creating sprites.
//You're free to use any valid JavaScript string as the key.



function preload() {
  game.load.image('sky', 'assets/sky_new.png');
  game.load.image('ground', 'assets/platform.png');
  game.load.image('star', 'assets/star.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

//Code to add a sprite to game is game.add.sprite(x,y,'asset key')
//The order in which items are rendered in the display matches the order in which you create them.
//To place a background behind the star sprite you need to ensure it is added as a sprite first, before the star.

var platforms;

function create() {
  // Enable the Arcade Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Simple background for the game
  game.add.sprite(0,0,'sky');

  //The platforms group contains the ground and the 2 ledges we can jump on
  platforms = game.add.group();

  // Enable physics for any object that is created in this group
  platforms.enableBody = true;

  // Create the ground, game.world is the world class and has lots of methods and properties like .height
  var ground = platforms.create(0, game.world.height - 64, 'ground');

  //Scale it to fit the width of the game (original sprite is 400x32 - changed from 2,2)
  ground.scale.setTo(4,4);

  //This stops it from falling away when you jump on it
  ground.body.immovable = true;

  //Create two ledges
  var ledge = platforms.create(400,400,'ground');

  ledge.body.immovable = true;

  ledge = platforms.create(-150, 250, 'ground');

  ledge.body.immovable = true;

}

function update() {
}
