import FoodParticleGenerationMixin from './FoodParticleGenerationMixin.js';
import SnakeBodyGenerationMixin from './SnakeBodyGenerationMixin.js';
import type { FoodParticleType, GameBoardType, SnakeType } from './types.js';

const GameBoardBase = FoodParticleGenerationMixin(SnakeBodyGenerationMixin(class {}));

class GameBoard extends GameBoardBase implements GameBoardType {
	snake: SnakeType;
	foodParticles: FoodParticleType[];

	constructor() {
		super();
		Object.assign(GameBoard.prototype, SnakeBodyGenerationMixin, FoodParticleGenerationMixin);
		this.snake = this.generateSnake();
		this.foodParticles = [this.generateFoodParticle(this.snake.body)];
	}
}

export default GameBoard;
