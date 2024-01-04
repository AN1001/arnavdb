<script>
	let values = [
		{done:false, name:"world domination"},
		{done:false, name:"world domination 2"},
		{done:false, name:"world domination 3"},
		{done:false, name:"make a svelte app"}
	]

	function add(){
		values.push({done:false, name:"What should be done?"})
		values = values
	}
	
</script>

{#each values as value}
	<div style="opacity:{value.done?"0.4":"1"}">
		<input type="checkbox" bind:checked={value.done}>
		<input bind:value={value.name}>
	</div>
{/each}

<button on:click={add}>
	Add more
</button>

