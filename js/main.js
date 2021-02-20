// Global vars.
let gameEngine = new GameEngine();

let ASSET_MANAGER = new AssetManager();

// Download sprite sheet
ASSET_MANAGER.queueDownload("./assets/sprites/playerSprite.png");
ASSET_MANAGER.queueDownload("./assets/sprites/enemySprite.png");
ASSET_MANAGER.queueDownload("./assets/sprites/bulletSprite.png");

// Download background
ASSET_MANAGER.queueDownload("./assets/background-near.png");
ASSET_MANAGER.queueDownload("./assets/background-far.png");
ASSET_MANAGER.queueDownload("./assets/background-score.png");

// Download sound
ASSET_MANAGER.queueDownload("./assets/sound/background-ingame.mp3");

let canvas = null;
let ctx = null;

let canvasInfoBoard = null;
let ctxInfoBoard = null;

window.onload = () => {

	// Only onload the canvas, etc are defined.

	canvas = document.getElementById("gameWorld");
	ctx = canvas.getContext("2d");

	canvasInfoBoard = document.getElementById("infoBoard");
	ctxInfoBoard = canvasInfoBoard.getContext("2d");

	ASSET_MANAGER.downloadAll(() => {
		createMainMenu();
	})
	
}


// Global functions.
let isStart = false; // flag to not re-init and restart game engine
// This function will display a main menu for the game.
function createMainMenu(){
	clearGameEngine();
	if(!isStart) gameEngine.init(ctx);
	let mainMenu = new MenuMain(gameEngine, 100, 100);
	mainMenu.addMainMenuListener(canvas);
	mainMenu.setInitialButtonLocation(canvas);
	gameEngine.addEntity(mainMenu);
	// console.log(gameEngine.entities)
	if(!isStart) {
		gameEngine.start();
		isStart = true;
	}
}

function createResultMenu (result){
	ASSET_MANAGER.muteAudio("./assets/sound/background-ingame.mp3");
	clearGameEngine();
	let resultMenu = new MenuResult(gameEngine, 100, 100, result);
	resultMenu.addMainMenuListener(canvas);
	resultMenu.setInitialButtonLocation(canvas);
	gameEngine.addEntity(resultMenu);
}

/**
 * This function will start a game.
 */
function startGame() {

	clearGameEngine();
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
	gameEngine.addEntity(enemy.weapon);
	gameEngine.addEntity(enemy.weapon.bullet);
	// console.log(enemy.weaponEnemy)
	// gameEngine.addEntity(enemy.weapon.bullet);

	// Add score info to the game
	let score = new Score(player.weapon, canvasInfoBoard, enemy, player, gameEngine);
	gameEngine.addEntity(score);

	canvasInfoBoard.style.visibility = "visible"; // Show infoboard when the game is started.

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
	// gameEngine.start();
}

/**
 * This function clear all items in game engine for scence transition.
 */
function clearGameEngine() {
	for(let i = gameEngine.entities.length - 1; i >= 0; i --) {		
		gameEngine.entities[i].removeFromWorld = true;
	}
}





