let gameEngine = new GameEngine();

let ASSET_MANAGER = new AssetManager();

// Download sprite sheet
ASSET_MANAGER.queueDownload("./assets/sprites/playerSprite.png");
ASSET_MANAGER.queueDownload("./assets/sprites/enemySprite.png");

// Download background
ASSET_MANAGER.queueDownload("./assets/background-near.png");
ASSET_MANAGER.queueDownload("./assets/background-far.png");


ASSET_MANAGER.downloadAll(function () {
	let canvas = document.getElementById("gameWorld");
	let ctx = canvas.getContext("2d");
	let canvasInfoBoard = document.getElementById("infoBoard");

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

	// Add enemy to the game
	let enemy = new Enemy(gameEngine, 100, 100);
	enemy.setEnemyInitialPosition(canvas);
	gameEngine.addEntity(enemy);

	// Add score info to the game
	let score = new Score(player.weapon, canvasInfoBoard);
	gameEngine.addEntity(score);

	// For testing only
	let accumulator = 1;
	window.addEventListener("keydown", event => {
		if (event.code === "KeyJ") {
			if (accumulator > 2) {
				accumulator = 0;
			}
			player.weapon.orbState = accumulator;
			player.weapon.bullet.bulletState = accumulator;
			accumulator ++;
		}
	});

	gameEngine.start();
});




