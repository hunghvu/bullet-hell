let gameEngine = new GameEngine();

let ASSET_MANAGER = new AssetManager();

// Download sprite sheet
ASSET_MANAGER.queueDownload("./assets/sprites/playerSprite.png");

// Download background
ASSET_MANAGER.queueDownload("./assets/background-near.png");
ASSET_MANAGER.queueDownload("./assets/background-far.png");


ASSET_MANAGER.downloadAll(function () {
	let canvas = document.getElementById('gameWorld');
	let ctx = canvas.getContext('2d');

	gameEngine.init(ctx);
	
	// Order is important, being added first means being drawn first

	// Add background to the game
	let background = new Background(gameEngine, 100, 100);
	background.setBackgroundInitialPosition(canvas);
	gameEngine.addEntity(background);

	// Add player to the game
	let player = new Player(gameEngine, 100, 100);
	player.addMouseListenerCanvas(canvas)
	player.setPlayerInitialPosition(canvas);
	gameEngine.addEntity(player);
	gameEngine.addEntity(player.weapon);
	gameEngine.addEntity(player.weapon.bullet);

	// For testing only
	window.addEventListener("keydown", event => {
		if (event.code === "KeyJ") {
			player.weapon.orbState === 0 ? player.weapon.orbState = 1 : player.weapon.orbState = 0;
			player.weapon.bullet.bulletState === 0 ? player.weapon.bullet.bulletState = 1 : player.weapon.bullet.bulletState = 0;
		}
	});

	gameEngine.start();
});




