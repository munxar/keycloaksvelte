<script lang="ts">	
	import { auth } from '$lib/stores';
</script>

<!-- user === null means not logged in -->
{#if $auth.user}
	<button on:click={auth.logout}>logout</button>
{:else}
	<button on:click={auth.login}>login</button>
{/if}
{#if $auth.user}
	<h1>Hi {$auth.user.name}, welcome back!</h1>
	{JSON.stringify($auth.user, null, 2)}
{:else}
	<h1>Welcome!</h1>
{/if}
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
