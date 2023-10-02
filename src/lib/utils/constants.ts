import type { DirectionType } from '../types.js';

export const allDirections: DirectionType[] = ['left', 'right', 'up', 'down'];

export const leftDir: DirectionType = 'left'; // 0

export const downDir: DirectionType = 'down'; // 1

export const rightDir: DirectionType = 'right'; // 2

export const upDir: DirectionType = 'up'; // 3

export const boardDimension: number = 25;

export const maxCoordinateValue: number = boardDimension - 1;

export const defaultMaxBoardSize: number = 450;

export const defaultBoardPadding: number = 20;
