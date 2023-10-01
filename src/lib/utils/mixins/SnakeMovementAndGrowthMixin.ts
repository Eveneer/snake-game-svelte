import type { Constructor, DirectionType, SnakeType } from '$lib/types.js';
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
            
        }

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

			snake.body[0].position = { col, row };
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

		setSnakeMovementDirection: (snake: SnakeType, moveQueue: DirectionType[]) => void = (
			snake,
			moveQueue
		) => {
			let dir: DirectionType | undefined = moveQueue.shift();
			snake.movesTo = dir ?? snake.movesTo;
		};
	};
}

export default SnakeMovementAndGrowthMixin;
