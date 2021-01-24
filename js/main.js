let gameEngine = new GameEngine();

let ASSET_MANAGER = new AssetManager();

// Download sprite sheet
ASSET_MANAGER.queueDownload("./assets/sprites/playerSprite.png");


ASSET_MANAGER.downloadAll(function () {
	let canvas = document.getElementById('gameWorld');
	let ctx = canvas.getContext('2d');

	gameEngine.init(ctx);
	let player = new Player(gameEngine, 100, 100);
	player.addMouseListenerCanvas(canvas)
	gameEngine.addEntity(player);

	// Set a timer so the "quite-heavy" background is hopefully loaded
	timer = setTimeout (() => gameEngine.start(), 1200);
});




