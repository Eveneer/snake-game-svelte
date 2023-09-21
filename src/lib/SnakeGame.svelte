<script lang="ts">
	import GCS from 'game-control-system/dist';
	import { onMount } from 'svelte';
	import GameBoard from './GameBoard.js';

	export let maxBoardSize: number = 500;
	export let boardPadding: number = 20;

	let screenWidth: number;
	let screenHeight: number;
	let boardSize: number;
	let board: GameBoard = new GameBoard();

	onMount(() => {
		boardSize = Math.min(maxBoardSize, screenWidth - boardPadding * 2);
	});
</script>

<svelte:window bind:innerHeight={screenHeight} bind:innerWidth={screenWidth} />
<div
	class="board-container"
	style="max-width: {maxBoardSize + boardPadding * 2}px; padding: {boardPadding}px"
>
	<div class="board" style="width: {boardSize}px; height: {boardSize}px">
		{#each board.snake.body as part}
			<span
				class="absolute w-[2.5%] h-[2.5%] rounded-[25%] {part.classes === ''
					? 'bg-white'
					: 'bg-red-500'} transform-gpu"
				style="top: {part.position.row * 2.5}%; left: {(part.position.col % 40) * 2.5}%"
			/>
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
	}

	.transform-gpu {
		transform: translate3d(var(--tw-translate-x), var(--tw-translate-y), 0) rotate(var(--tw-rotate))
			skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x))
			scaleY(var(--tw-scale-y));
	}
</style>
