<script lang="ts">
	export let onclickCallback: () => void;
	export let classes: string = '';
	export let styling: string = '';
</script>

<button
	type="button"
	on:click={onclickCallback}
	class="w-[40px] h-[40px] p-2 bg-white/20 hover:bg-white/30 transition-all rounded-md {classes}"
	style={styling}
>
	<slot />
</button>
