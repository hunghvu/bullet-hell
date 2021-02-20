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

window.onload = () => {
	// These must stays out side of function to have bigger scope.
	let gameDiv = document.getElementById("gameScreen");

	let canvas = document.getElementById("gameWorld");
	let ctx = canvas.getContext("2d");

	let canvasInfoBoard = document.getElementById("infoBoard");
	let ctxInfoBoard = canvasInfoBoard.getContext("2d");



	
	createMainMenu();
	
	// This function will display a main menu for the game.
	function createMainMenu(){
	
		ASSET_MANAGER.downloadAll(() => {
			clearGameEngine();
			gameEngine.init(ctx);
			let mainMenu = new MenuMain(gameEngine, 100, 100);
			mainMenu.addMainMenuListener(canvas);
			mainMenu.setInitialButtonLocation(canvas);
			gameEngine.addEntity(mainMenu);
			gameEngine.start();

			// For testing only.
			let startButton = document.createElement("button");
			startButton.innerHTML = "Start";
			startButton.onclick = startGame;
			gameDiv.appendChild(startButton);
			console.log(gameDiv);
		})
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
		gameEngine.start();
	}

	function clearGameEngine() {
		ctx.clearRect(0, 0, 1000, 1000); // Clear canvas
		ctxInfoBoard.clearRect(0, 0, 1000, 1000);
		// Nullify all objects so they can be garbage collected.
		for(let i = gameEngine.entities.length - 1; i >= 0; i --) {
			gameEngine.entities[i] = null;
			gameEngine.entities.splice(i, 1);
		}
		gameEngine = null;
		gameEngine = new GameEngine(); // Start a new game engine.
	}
}





