import type GCS from 'game-control-system/dist/index.js';

export interface ComponentPositionType {
	row: number;
	col: number;
}

export type DirectionType = 'left' | 'right' | 'up' | 'down';

export interface SnakeBodyPartType {
	position: ComponentPositionType;
	cardinality: number;
	classes: string;
}

export interface SnakeType {
	body: SnakeBodyPartType[];
	movesTo: DirectionType;
	growthQueue: number[];
}

export interface FoodParticleType {
	position: ComponentPositionType;
	cardinality: number;
	points: number;
	growth: boolean;
}

export interface GameBoardType {
	control: GCS;
	snake: SnakeType;
	foodParticles: FoodParticleType[];
}

export interface SnakeBodyPartGenerationVarType {
	position: ComponentPositionType;
	classes?: string;
}

export type Constructor = new (...args: any[]) => {};

export interface SnakeGameState {
	snake: SnakeType;
	foodParticles: FoodParticleType[];
}
