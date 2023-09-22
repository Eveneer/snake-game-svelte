import { boardDimension } from '../constants.js';
import type { FoodParticleType, SnakeBodyPartType, Constructor } from '../../types.js';

function FoodParticleGenerationMixin<TBase extends Constructor>(Base: TBase) {
	return class extends Base {
		generateFoodParticle: (snakeBody: SnakeBodyPartType[]) => FoodParticleType = (snakeBody) => {
			const maxCardinality = boardDimension * boardDimension;
			let cardinality: number = Math.floor(Math.random() * maxCardinality);
			let occupied: number[] = snakeBody.map((part) => part.cardinality);

			while (occupied.includes(cardinality))
				cardinality = Math.floor(Math.random() * maxCardinality);

			return {
				position: {
					row: Math.floor(cardinality / boardDimension),
					col: cardinality % boardDimension
				},
				cardinality,
				points: Math.random() < 0.95 ? 5 : 10,
				growth: Math.random() < 0.8
			};
		};
	};
}

export default FoodParticleGenerationMixin;
