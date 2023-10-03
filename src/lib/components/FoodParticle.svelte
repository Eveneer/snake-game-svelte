<script lang="ts">
	import { boardDimension } from '../utils/constants.js';
	import type { FoodParticleType } from '../types.ts';

	export let particle: FoodParticleType;

	const dimensionUnit = 100 / boardDimension;

	$: top = `top: ${particle.position.row * dimensionUnit}%`;
	$: left = `left: ${particle.position.col * dimensionUnit}%`;
	$: height = `height: ${dimensionUnit}%; width: ${dimensionUnit}%`;
	$: width = `width: ${dimensionUnit}%`;
</script>

<div class="particle-container" style="{top}; {left}; {height}; {width};">
	<span class="particle mx-auto" />
</div>

<style lang="postcss">
	.particle-container {
		z-index: 1;
		position: absolute;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.particle {
		margin-left: auto;
		margin-right: auto;
		display: inline-block;
		width: 50%;
		height: 50%;
		background-color: white;
		border-radius: 50%;
	}
</style>
