import type { Constructor, DirectionType, SnakeType, FoodParticleType } from '$lib/types.js';
import type GCS from 'game-control-system/dist/index.js';
import {
	boardDimension,
	maxCoordinateValue,
	downDir,
	leftDir,
	rightDir,
	upDir
} from '../constants.js';

function SnakeMovementAndGrowthMixin<TBase extends Constructor>(Base: TBase) {
	return class extends Base {
		moveSnake: (snake: SnakeType) => void = (snake) => {
			let index: number = snake.body.length - 1;

			if (this.willSnakeGrow(snake)) {
				snake.body.push({
					...snake.body[index],
					position: { ...snake.body[index].position }
				});
				snake.growthQueue.slice(0, 1);
			}

			for (; index > 0; index--) {
				snake.body[index].position = { ...snake.body[index - 1].position };
				snake.body[index].cardinality = snake.body[index - 1].cardinality;
			}

			this.moveSnakeHead(snake);
		};

		moveSnakeHead: (snake: SnakeType) => void = (snake: SnakeType) => {
			let col: number = snake.body[0].position.col;
			let row: number = snake.body[0].position.row;
			let classes: string[] = ['snake-head', 'transition-all transform-gpu'];

			switch (snake.movesTo) {
				case rightDir:
					col += 1;

					if (col > maxCoordinateValue) {
						col = 0;
						classes[0] = 'transition-none';
					}

					break;
				case leftDir:
					col -= 1;

					if (col < 0) {
						col = maxCoordinateValue;
						classes[0] = 'transition-none';
					}

					break;
				case upDir:
					row += 1;

					if (row > maxCoordinateValue) {
						row = 0;
						classes[0] = 'transition-none';
					}

					break;
				case downDir:
					row -= 1;

					if (row < 0) {
						row = maxCoordinateValue;
						classes[0] = 'transition-none';
					}

					break;
				default:
					break;
			}

			snake.body[0].position = { row, col };
			snake.body[0].cardinality = col + row * boardDimension;
			snake.body[0].classes = classes.join(' ');
		};

		willSnakeGrow: (snake: SnakeType) => boolean = (snake: SnakeType) =>
			snake.growthQueue.length > 0
				? snake.body[snake.body.length - 1].cardinality === snake.growthQueue[0]
				: false;

		updateSpeed: (control: GCS) => void = (control) => {
			control.updateSpeed(
				Math.max(125, control.getSpeed() - Math.floor(control.currentScore() / 50))
			);
		};

		setSnakeMovementDirection: (
			snake: SnakeType,
			moveQueue: DirectionType[],
			control: GCS
		) => void = (snake, moveQueue, control) => {
			let dir: DirectionType | undefined = moveQueue.shift();

			if (dir) {
				snake.movesTo = dir;
				control.updateMovesBy(1);
			}
		};

		consumeFoodParticle: (
			snake: SnakeType,
			foodParticles: FoodParticleType[],
			control: GCS
		) => void = (snake, foodParticles, control) => {
			foodParticles.forEach((particle, index) => {
				if (particle.cardinality === snake.body[0].cardinality) {
					foodParticles.splice(index, 1);
					control.updateScoreBy(particle.points);

					if (particle.growth) snake.growthQueue.push(particle.cardinality);
				}
			});
		};
	};
}

export default SnakeMovementAndGrowthMixin;
