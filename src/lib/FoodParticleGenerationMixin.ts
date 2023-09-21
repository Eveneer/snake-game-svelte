import type { FoodParticleType, SnakeBodyPartType, Constructor } from './types.js';

function FoodParticleGenerationMixin<TBase extends Constructor>(Base: TBase) {
	return class extends Base {
        generateFoodParticle: (snakeBody: SnakeBodyPartType[]) => FoodParticleType = (snakeBody) => {
            let cardinality: number = Math.floor(Math.random() * 1600);
            let occupied: number[] = snakeBody.map((part) => part.cardinality);
    
            while (occupied.includes(cardinality)) cardinality = Math.floor(Math.random() * 1600);
    
            return {
                position: { row: Math.floor(cardinality / 40), col: cardinality % 40 },
                cardinality,
                points: Math.random() < 0.95 ? 5 : 10,
                growth: Math.random() < 0.8
            };
        };
    }
}

export default FoodParticleGenerationMixin;
