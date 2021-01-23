var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

// Download sprite sheet
ASSET_MANAGER.queueDownload("./assets/sprites/playerSprite.png");


ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	gameEngine.init(ctx);

	gameEngine.start();
});
