
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

  //Groups allow you to group together similar objects and control them all as one single unit.
  //You can also check for collision between Groups, and for this game we'll be using two different Groups, one of which is created in the code above for the platforms: platforms = game.add.group();
  //As with sprites game.add creates our Group object. We assign it to a new local variable called platforms.
  //Now created we can add objects to it. First up is the ground. This is positioned at the bottom of the game and uses the 'ground' image loaded earlier.
  //The ground is scaled to fill the width of the game. Finally we set its immovable property to true.
  //Had we not done this the ground would move when the player collides with it (more on this in the Physics section).
  //With the ground in place we create two smaller ledges to jump on to using the exact same technique as for the ground.

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

  //This creates a new sprite called 'player', positioned at 32 pixels by 150 pixels from the bottom of the game.
  //We're telling it to use the 'dude' asset previously loaded. The preload function loaded 'dude' as a sprite sheet, not an image due to animation frames.

  //This player and its settings here
  player = game.add.sprite(32, game.world.height - 150, 'dude');

  //Enable physics on the player
  game.physics.arcade.enable(player);

  //We define two animations called 'left' and 'right'. The 'left' animation uses frames 0, 1, 2 and 3 and runs at 10 frames per second.
  //The 'true' parameter tells the animation to loop. This is our standard run-cycle and we repeat it for running in the opposite direction.
  //With the animations set we create a few physics properties.

  //Once done the sprites gain a new body property, which is an instance of ArcadePhysics.Body.
  //This represents the sprite as a physical body in Arcade Physics engine. The body object has itself a lot of properties that we can play with.
  //To simulate the effects of gravity on a sprite, it's as simple as writing this: player.body.gravity.y = 300;
  //This is an arbitrary value, but logically, the higher the value, the heavier your object feels and the quicker it falls.

  //Player physics properties.
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;

}


//We've already told our ground and ledges to be immovable. Had we not done that when the player collided with them it would stop for a moment and then everything would have collapsed.
//This is because unless told otherwise, the ground sprite is a moving physical object (also known as a dynamic body)
//When the player hits it, the resulting force of the collision is applied to the ground so the two bodies exchange their velocities and ground starts falling as well.
//So to allow the player to collide and take advantage of the physics properties we need to introduce a collision check in the update function: game.physics.arcade.collide(player, platforms);

//The update function is called by the core game loop every frame.
//The Physics.collide function is the one that performs the magic.
//It takes two objects and tests for collision and performs separation against them.
//In this case we're giving it the player sprite and the platforms Group.
//It's clever enough to run collision against all Group members, so this one call will collide against the ground and both ledges. The result is a firm platform.

function update() {

  // Collide the player and the stars with the platforms
  game.physics.arcade.collide(player, platforms);
}
