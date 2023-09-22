<script lang="ts">
	import type { SnakeBodyPartType } from '../types.ts';
	import { boardDimension } from '../utils/constants.js';

	export let part: SnakeBodyPartType;
	export let partType: 'head' | 'tail' | 'body';
	export let speed: number;

	const dimensionUnit = 100 / boardDimension;
	$: top = `top: ${part.position.row * dimensionUnit}%`;
	$: left = `left: ${(part.position.col % boardDimension) * dimensionUnit}%`;
	$: height = `height: ${dimensionUnit}%; width: {dimensionUnit}%`;
	$: width = `width: ${dimensionUnit}%`;
	$: transformSpeed = `transition-duration: ${speed}ms`;
</script>

<span
	class="snake snake-{partType} {part.classes} transform-gpu transition-all"
	style="{top}; {left}; {height}; {width}; {transformSpeed}"
/>

<style lang="postcss">
	.snake {
		z-index: 100;
		position: absolute;
		border-radius: 25%;
		transition-property: all;
		transition-timing-function: linear;
	}

	.snake-head {
		background-color: rgb(239, 68, 68);
	}

	.snake-body {
		background-color: white;
	}

	.snake-tail {
		background-color: white;
	}
</style>
