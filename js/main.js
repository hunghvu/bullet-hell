var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

// Download sprite sheet
ASSET_MANAGER.queueDownload("./assets/sprites/playerSprite.png");


ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	gameEngine.init(ctx);
	let player = new Player(gameEngine, 100, 100);
	gameEngine.addEntity(player);
	// Mouse position
	canvas.addEventListener('mousemove', event => {
		let canvasRect = canvas.getBoundingClientRect();
		player.canvasX = event.clientX - canvasRect.left;
		player.canvasY = event.clientY - canvasRect.top;
	})
	gameEngine.start();
});




