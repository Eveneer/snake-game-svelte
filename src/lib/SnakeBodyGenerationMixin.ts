import { allDirections, boardDimension } from './constants.js';
import type {
	ComponentPositionType,
	Constructor,
	SnakeBodyPartGenerationVarType,
	SnakeBodyPartType,
	SnakeType
} from './types.js';

function SnakeBodyGenerationMixin<TBase extends Constructor>(Base: TBase) {
	return class extends Base {
		generateSnake: () => SnakeType = () => {
			const snake: SnakeType = {
				movesTo: allDirections[Math.floor(Math.random() * 4)],
				body: [],
				growthQueue: []
			};
			const position: ComponentPositionType = {
				row: this.generateRandomCoordinatePoint(),
				col: this.generateRandomCoordinatePoint()
			};

			snake.body.push(this.generateSnakeBodyPart({ position, classes: 'snake-head' }));

			switch (snake.movesTo) {
				case 'left':
					snake.body.push(
						this.generateSnakeBodyPart({ position: { ...position, col: position.col + 1 } })
					);
					snake.body.push(
						this.generateSnakeBodyPart({ position: { ...position, col: position.col + 2 } })
					);
					break;
				case 'right':
					snake.body.push(
						this.generateSnakeBodyPart({ position: { ...position, col: position.col - 1 } })
					);
					snake.body.push(
						this.generateSnakeBodyPart({ position: { ...position, col: position.col - 2 } })
					);
					break;
				case 'up':
					snake.body.push(
						this.generateSnakeBodyPart({ position: { ...position, row: position.row + 1 } })
					);
					snake.body.push(
						this.generateSnakeBodyPart({ position: { ...position, row: position.row + 2 } })
					);
					break;
				default:
					snake.body.push(
						this.generateSnakeBodyPart({ position: { ...position, row: position.row - 1 } })
					);
					snake.body.push(
						this.generateSnakeBodyPart({ position: { ...position, row: position.row - 2 } })
					);
					break;
			}

			return snake;
		};

		generateSnakeBodyPart: ({
			position,
			classes
		}: SnakeBodyPartGenerationVarType) => SnakeBodyPartType = ({ position, classes }) => ({
			position,
			cardinality: position.row * boardDimension + position.col,
			classes: classes ?? ''
		});

		generateRandomCoordinatePoint: () => number = () =>
			Math.floor(Math.random() * (boardDimension - 6)) + 3;
	};
}

export default SnakeBodyGenerationMixin;
