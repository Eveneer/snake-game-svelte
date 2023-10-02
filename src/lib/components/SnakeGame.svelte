<script lang="ts">
	import { onMount } from 'svelte';
	import GameBoard from '../utils/GameBoard.js';
	import SnakeBodyPart from './SnakeBodyPart.svelte';
	import FoodParticle from './FoodParticle.svelte';
	import { defaultBoardPadding, defaultMaxBoardSize } from '$lib/utils/constants.js';

	export let maxBoardSize: number = defaultMaxBoardSize;
	export let boardPadding: number = defaultBoardPadding;

	let screenWidth: number;
	let screenHeight: number;
	let boardSize: number;
	let board: GameBoard = new GameBoard();
	let iter: number = 0;

	onMount(() => {
		boardSize = Math.min(maxBoardSize, screenWidth - boardPadding * 2);
	});

	const intervalFunc = setInterval(() => {
		if (!board.control.hasStarted()) {
			board.control.startGame();
		}
		board.control.progressGame();
		iter++;
	}, board.control.getSpeed());
</script>

<svelte:window bind:innerHeight={screenHeight} bind:innerWidth={screenWidth} />
<div
	class="board-container"
	style="max-width: {maxBoardSize + boardPadding * 2}px; padding: {boardPadding}px"
>
	<div class="board">
		{#each board.snake.body as part, index (index)}
			<SnakeBodyPart
				{part}
				partType={index === 0 ? 'head' : index === board.snake.body.length - 1 ? 'tail' : 'body'}
				speed={300}
			/>
		{/each}

		{#each board.foodParticles as particle}
			<FoodParticle {particle} />
		{/each}
	</div>
</div>

<style lang="postcss">
	.board-container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.board {
		position: relative;
		margin-left: auto;
		margin-right: auto;
		border: 1px solid;
		border-radius: 1%;
		overflow: hidden;
		width: 100%;
	}

	.board::before {
		display: block;
		content: '';
		padding-top: 100%;
	}
</style>
