import GCS from 'game-control-system/dist/index.js';
import type { GCSConstructorObjectType } from 'game-control-system/dist/types.d.ts';
import FoodParticleGenerationMixin from './mixins/FoodParticleGenerationMixin.js';
import SnakeBodyGenerationMixin from './mixins/SnakeBodyGenerationMixin.js';
import { boardDimension } from './constants.js';
import type { FoodParticleType, GameBoardType, SnakeGameState, SnakeType } from '../types.js';

const GameBoardBase = FoodParticleGenerationMixin(SnakeBodyGenerationMixin(class {}));

class GameBoard extends GameBoardBase implements GameBoardType {
	control: GCS;
	snake: SnakeType;
	foodParticles: FoodParticleType[];

	constructor() {
		super();
		Object.assign(GameBoard.prototype, SnakeBodyGenerationMixin, FoodParticleGenerationMixin);
		this.snake = this.generateSnake();
		this.foodParticles = [this.generateFoodParticle(this.snake.body)];
		this.control = new GCS(this.getGCSParam());
	}

	hasLost: () => boolean = () =>
		new Set<number>(this.snake.body.map((part) => part.cardinality)).size < this.snake.body.length;

	hasWon: () => boolean = () => this.snake.body.length === boardDimension * boardDimension;

	gameStateCallback: () => SnakeGameState = () => ({
		snake: this.snake,
		foodParticles: this.foodParticles
	});

	progressGame: () => void = () => {};

	toggleGameMode: () => void = () => {
		if (this.control.isScoreRateLimited()) {
			this.control.updateLimiters({});
		} else {
			this.control.updateLimiters({
				scoreRate: {
					value: 5,
					unitTime: 5000
				}
			});
		}
	};

	initGameBoard: () => void = () => {
		this.snake = this.generateSnake();
		this.foodParticles = [this.generateFoodParticle(this.snake.body)];
		this.control = new GCS(this.getGCSParam());
	};

	startGame: () => void = () => {};

	getGCSParam: () => GCSConstructorObjectType = () => ({
		progression: 'time-based',
		speed: 300,
		loseCheckCallback: this.hasLost,
		winCheckCallback: this.hasWon,
		gameStateCallback: this.gameStateCallback,
		gameStateProgressionCallback: this.progressGame
	});
}

export default GameBoard;
