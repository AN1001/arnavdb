<script>
    let name = "Arnav";
    let count = 0
    function addCount(){
        count+=1
    }
</script>

<h1>Welcome to {name}'s website</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button on:click={addCount}>
    click me!
</button>

<div>
    the count is {count}
</div>

<style>
    div{
        padding: 10px;
        border-radius: 0.25em;
        background: whitesmoke;
        border: 2px solid yellowgreen;
        width: 400px;
        margin-top: 30px; 
    }
</style>
