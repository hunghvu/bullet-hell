// Global vars.
let gameEngine;

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
ASSET_MANAGER.queueDownload("./assets/sound/background-win.mp3");
ASSET_MANAGER.queueDownload("./assets/sound/background-defeat.mp3");
ASSET_MANAGER.queueDownload("./assets/sound/bullet-shot.mp3");

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
	gameEngine = new GameEngine();
	ASSET_MANAGER.downloadAll(() => {
		clearGameEngine();
		gameEngine.init(ctx);
		createMainMenu();
		gameEngine.start();

	})
	
}


// Global functions.

// This function will display a main menu for the game.
function createMainMenu(){
	clearGameEngine();
	ASSET_MANAGER.pauseBackgroundMusic();
	let mainMenu = new MenuMain(gameEngine, 100, 100);
	mainMenu.addMainMenuListener(canvas);
	mainMenu.setInitialButtonLocation(canvas);
	gameEngine.addEntity(mainMenu);
	// console.log(gameEngine.entities)

}

function createResultMenu (result){
	ASSET_MANAGER.pauseBackgroundMusic();
	clearGameEngine();
	let resultMenu = new MenuResult(gameEngine, 100, 100, result);
	resultMenu.addMainMenuListener(canvas);
	resultMenu.setInitialButtonLocation(canvas);
	gameEngine.addEntity(resultMenu);
}

let player;
let infoboard;
/**
 * This function will start a game.
 */
function startGame(bulletAngleInterval, notBouncedBackRate, playerInitHealth, enemyInitHealth) {

	clearGameEngine();
	gameEngine.init(ctx);
	
	// Order is important, being added first means being drawn first

	// Add background to the game
	let background = new Background(gameEngine, 100, 100);
	background.setBackgroundInitialPosition(canvas);
	gameEngine.addEntity(background);

	// Add player to the game
	player = new Player(gameEngine, 100, 100);
	player.addMouseListenerCanvas(canvas)
	player.setPlayerInitialPosition(canvas);
	player.initialHealth = playerInitHealth;
	player.maxHP = playerInitHealth;
	gameEngine.addEntity(player);
	gameEngine.addEntity(player.weapon);
	gameEngine.addEntity(player.weapon.bullet);

	// Add enemy to the game
	let enemy = new Enemy(gameEngine, 100, 100);
	enemy.setEnemyInitialPosition(canvas);
	enemy.weapon.bullet.bulletAngleInterval = bulletAngleInterval;
	enemy.weapon.bullet.notBouncedBackRate = notBouncedBackRate;
	enemy.initialHealth = enemyInitHealth;
	gameEngine.addEntity(enemy);
	gameEngine.addEntity(enemy.weapon);
	gameEngine.addEntity(enemy.weapon.bullet);
	// console.log(enemy.weaponEnemy)
	// gameEngine.addEntity(enemy.weapon.bullet);

	// Add score info to the game
	infoBoard = new InfoBoard(player.weapon, canvasInfoBoard, enemy, player, gameEngine);
	gameEngine.addEntity(infoBoard);

	canvasInfoBoard.style.visibility = "visible"; // Show infoboard when the game is started.

	// For testing only
	// let accumulator = 1;
	// window.addEventListener("keydown", event => {
	// 	if (event.code === "KeyJ") {
	// 		if (accumulator > 2) {
	// 			accumulator = 0;
	// 		}
	// 		player.weapon.orbState = accumulator;
	// 		player.weapon.bullet.bulletState = accumulator;
	// 		accumulator ++;
	// 		if (player.weapon.bullet.bulletState === 0) {
	// 			clearInterval(infoBoard.bulletSound);
	// 			infoBoard.bulletSound = setInterval(() => {
	// 				ASSET_MANAGER.playAsset("./assets/sound/bullet-shot.mp3");
	// 			}, 100);
	// 		} else if (player.weapon.bullet.bulletState === 1) {
	// 			setPlayerWeaponLevelTwo();
	// 		} else if (player.weapon.bullet.bulletState === 2){
	// 			setPlayerWeaponLevelThree();
	// 		}
	// 	}
	// });
}

function setPlayerWeaponLevelTwo() {
	player.weapon.orbState = 1;
	player.weapon.bullet.bulletState = 1;
	clearInterval(infoBoard.bulletSound);
	infoBoard.bulletSound = setInterval(() => {
		ASSET_MANAGER.playAsset("./assets/sound/bullet-shot.mp3");
	}, 75);
}

function setPlayerWeaponLevelThree() {
	player.weapon.orbState = 2;
	player.weapon.bullet.bulletState = 2;
	clearInterval(infoBoard.bulletSound);
	infoBoard.bulletSound = setInterval(() => {
		ASSET_MANAGER.playAsset("./assets/sound/bullet-shot.mp3");
	}, 65);
}

function enhancedPlayerWeaponLevelThree() {
	player.weapon.bullet.bulletState = 3;
	clearInterval(infoBoard.bulletSound);
	infoBoard.bulletSound = setInterval(() => {
		ASSET_MANAGER.playAsset("./assets/sound/bullet-shot.mp3");
	}, 55);
}

/**
 * This function clear all items in game engine for scence transition.
 */
function clearGameEngine() {
	for(let i = gameEngine.entities.length - 1; i >= 0; i --) {		
		gameEngine.entities[i].removeFromWorld = true;
	}
}





