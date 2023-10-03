<script lang="ts">
	import type GameBoard from "$lib/utils/GameBoard.js";

    export let board: GameBoard;

    const options = [
        {
            name: "Reset game",
            callback: () => {}
        },
        {
            name: "Tutorial",
            callback: () => {}
        },
    ];
</script>

<div
	class="w-full bg-green-500 absolute z-10 top-0 left-0 transition-all !duration-[600ms]"
	style="height: {board.control.getIsOptionsVisible() ? '100%' : '0%'};"
/>
