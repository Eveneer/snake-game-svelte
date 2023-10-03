import GCS from 'game-control-system/dist/index.js';
import type { GCSConstructorObjectType } from 'game-control-system/dist/types.d.ts';
import FoodParticleGenerationMixin from './mixins/FoodParticleGenerationMixin.js';
import SnakeBodyGenerationMixin from './mixins/SnakeBodyGenerationMixin.js';
import { boardDimension } from './constants.js';
import type {
	DirectionType,
	FoodParticleType,
	GameBoardType,
	SnakeGameState,
	SnakeType,
	SnakeBodyPartType
} from '../types.js';
import SnakeMovementMixin from './mixins/SnakeMovementAndGrowthMixin.js';

const GameBoardBase = SnakeMovementMixin(
	FoodParticleGenerationMixin(SnakeBodyGenerationMixin(class {}))
);

class GameBoard extends GameBoardBase implements GameBoardType {
	control: GCS;
	snake: SnakeType;
	foodParticles: FoodParticleType[];
	moveQueue: DirectionType[];

	constructor() {
		super();
		Object.assign(GameBoard.prototype, SnakeBodyGenerationMixin, FoodParticleGenerationMixin);
		this.snake = this.generateSnake();
		this.foodParticles = [this.generateFoodParticle(this.snake.body)];
		this.control = new GCS(this.getGCSParam());
		this.moveQueue = [];
	}

	hasLost: () => boolean = () =>
		new Set<number>(this.snake.body.map((part) => part.cardinality)).size <
			this.snake.body.length || this.willSnakeOverflow(this.snake);

	hasWon: () => boolean = () => this.snake.body.length === boardDimension * boardDimension;

	gameStateCallback: () => SnakeGameState = () => ({
		snake: this.snake,
		foodParticles: this.foodParticles
	});

	progressGame: () => void = () => {
		if (!this.willSnakeOverflow(this.snake)) {
			this.setSnakeMovementDirection(this.snake, this.moveQueue, this.control);
			this.moveSnake(this.snake);
			this.consumeFoodParticle(this.snake, this.foodParticles, this.control);
			this.updateSpeed(this.control);

			if (this.foodParticles.length === 0) {
				this.generateFoodParticle(this.snake.body);
			}
		} else {
            this.control.endGame();
        }
	};

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

	getSnakeBody: () => SnakeBodyPartType[] = () => this.snake.body;
}

export default GameBoard;
