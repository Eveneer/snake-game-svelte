<script lang="ts">
	import { onMount } from 'svelte';
	import { defaultBoardPadding, defaultMaxBoardSize } from '$lib/utils/constants.js';
	import GameBoard from '../utils/GameBoard.js';
	import SnakeBodyPart from './SnakeBodyPart.svelte';
	import FoodParticle from './FoodParticle.svelte';
	import IconButton from './buttons/IconButton.svelte';
	import MenuIcon from './assets/MenuIcon.svelte';
	import PlayIcon from './assets/PlayIcon.svelte';
	import CloseIcon from './assets/CloseIcon.svelte';
	import PauseIcon from './assets/PauseIcon.svelte';
	import ResetIcon from './assets/ResetIcon.svelte';

	export let maxBoardSize: number = defaultMaxBoardSize;
	export let boardPadding: number = defaultBoardPadding;

	let screenWidth: number;
	let screenHeight: number;
	let boardSize: number;
	let board: GameBoard = new GameBoard();
	let gamePlayInterval: ReturnType<typeof setInterval> | undefined;

	$: menuIsShowing = board.control.getIsOptionsVisible();
	$: isResettable = board.control.hasStarted() && board.control.hasGameEnded();
	$: gameIsRunnig = board.control.isRunning();

	onMount(() => {
		boardSize = Math.min(maxBoardSize, screenWidth - boardPadding * 2);
	});

	const toggleOptions: () => void = () => {
		board.control.toggleOptionsVisibility();
		board = { ...board };

		if (board.control.getIsOptionsVisible()) {
			pauseGame();
		} else {
			unpauseGame();
		}
	};

	const gamePlayToggle: () => void = () => {
		if (isResettable) {
			resetGame();
		} else if (board.control.hasStarted()) {
			toggleOptions();
		} else {
			board.control.startGame();
			setGamePlayInterval();
			board = { ...board };
		}
	};

	const setGamePlayInterval = () => {
		gamePlayInterval = setInterval(() => {
			if (board.control.hasGameEnded() || !board.control.isRunning())
				setTimeout(() => {
					clearGameInterval();
				}, 100);

			board.control.progressGame();
			board = { ...board };
		}, board.control.getSpeed());
	};

	const pauseGame = () => {
		console.log('pause called');
		board.control.pauseGame();
		clearGameInterval();
		board = { ...board };
	};

	const unpauseGame = () => {
		console.log('unpause called');
		setTimeout(() => {
			board.control.unpauseGame();
			board = { ...board };
			setGamePlayInterval();
		}, 300);
		board = { ...board };
	};

	const resetGame = () => {
		console.log('reset called');

		board = new GameBoard();
		clearGameInterval();
	};

	const clearGameInterval = () => {
		if (gamePlayInterval) clearInterval(gamePlayInterval);
	};
</script>

<svelte:window bind:innerHeight={screenHeight} bind:innerWidth={screenWidth} />
<div
	class="board-container"
	style="max-width: {maxBoardSize + boardPadding * 2}px; padding: {boardPadding}px"
>
	<div class="flex flex-row justify-between">
		<div class="h-[40px] overflow-hidden">
			<IconButton onclickCallback={toggleOptions}>
				<div
					class="overflow-hidden transition-all !duration-[600ms]"
					style="width: {menuIsShowing ? 0 : 24}px; height: {menuIsShowing ? 0 : 24}px;"
				>
					<MenuIcon size={24} />
				</div>
				<div
					class="overflow-hidden transition-all !duration-[600ms]"
					style="width: {!menuIsShowing ? 0 : 24}px; height: {!menuIsShowing ? 0 : 24}px;"
				>
					<CloseIcon size={24} />
				</div>
			</IconButton>
			<IconButton onclickCallback={gamePlayToggle}>
				<div
					class="overflow-hidden transition-all !duration-[600ms]"
					style="width: {isResettable ? 24 : 0}px; height: {isResettable ? 24 : 0}px;"
				>
					<ResetIcon size={24} />
				</div>
				<div
					class="overflow-hidden transition-all !duration-[600ms]"
					style="width: {gameIsRunnig ? 0 : 24}px; height: {gameIsRunnig ? 0 : 24}px;"
				>
					<PlayIcon size={24} />
				</div>
				<div
					class="overflow-hidden transition-all !duration-[600ms]"
					style="width: {!gameIsRunnig || isResettable ? 0 : 24}px; height: {!gameIsRunnig ||
					isResettable
						? 0
						: 24}px;"
				>
					<PauseIcon size={24} />
				</div>
			</IconButton>
		</div>
		<div id="" />
	</div>
	<div class="board">
		{#each board.snake.body as part, index (index)}
			<SnakeBodyPart
				{part}
				partType={index === 0 ? 'head' : index === board.snake.body.length - 1 ? 'tail' : 'body'}
				speed={board.control.getSpeed()}
			/>
		{/each}

		{#each board.foodParticles as particle}
			<FoodParticle {particle} />
		{/each}
		<div
			class="w-full bg-green-500 absolute z-10 top-0 left-0 transition-all !duration-[600ms]"
			style="height: {board.control.getIsOptionsVisible() ? '100%' : '0%'};"
		/>
	</div>
</div>

<style lang="postcss">
	.board-container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		position: relative;
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
