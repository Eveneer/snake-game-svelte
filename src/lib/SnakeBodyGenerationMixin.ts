import { allDirections } from './constants.js';
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
				row: Math.floor(Math.random() * 18),
				col: Math.floor(Math.random() * 18)
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
			cardinality: position.row * 20 + position.col,
			classes: classes ?? ''
		});
	};
}

export default SnakeBodyGenerationMixin;
