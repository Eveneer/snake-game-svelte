<script lang="ts">
	import { onMount } from 'svelte';

	export let maxBoardSize: number = 500;
	export let boardPadding: number = 20;

	let screenWidth: number;
	let screenHeight: number;
	let boardSize: number;

	onMount(() => {
		boardSize = Math.min(maxBoardSize, screenWidth - boardPadding * 2);
	});
</script>

<svelte:window bind:innerHeight={screenHeight} bind:innerWidth={screenWidth} />
<div
	class="w-full bg-red-300 h-full min-h-[600px] flex flex-col"
	style="max-width: {maxBoardSize + boardPadding * 2}px; padding: {boardPadding}px"
>
	<div
		class="relative mx-auto border border-black"
		style="width: {boardSize}px; height: {boardSize}px"
	>
		Board
	</div>
</div>
