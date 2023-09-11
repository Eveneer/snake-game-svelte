<script lang="ts">
	import { onMount } from 'svelte';

	const maxBoardSize: number = 500;
	const boardPadding: number = 40;
	let screenWidth: number;
	let screenHeight: number;
	let boardSize: number;

	onMount(() => {
		boardSize = Math.min(maxBoardSize, screenWidth - boardPadding);
	});
</script>

<svelte:window bind:innerHeight={screenHeight} bind:innerWidth={screenWidth} />
<div class="w-full max-w-[400px] bg-red-300 h-full min-h-[600px] flex flex-col p-5">
	<div
		class="relative mx-auto border border-black"
		style="width: {boardSize}px; height: {boardSize}px"
	>
		Board
	</div>
</div>
