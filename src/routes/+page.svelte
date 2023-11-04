<script>
	let user = { loggedIn: false };

	function toggle() {
		user.loggedIn = !user.loggedIn;
	}
</script>

<h1>User State: <span style="color:{user.loggedIn?"yellow":"green"}">Logged {user.loggedIn?"in":"out"}</span></h1>
{#if user.loggedIn}
	<button on:click={toggle}> Log out </button>
{/if}

{#if !user.loggedIn}
	<button on:click={toggle}> Log in </button>
{/if}

<style>
    :root{
        background: rgb(25,25,25);
    }
    
    h1{
        margin: 0;
        font-family: sans-serif;
    }
</style>