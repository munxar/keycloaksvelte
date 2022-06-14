<script lang="ts">
    import { auth } from '$lib/stores';
    import { onMount } from 'svelte';

    // note: add a realm and client to keycloak and adopt this to your needs
    // important: this init call must be in the root layout
	onMount(() => auth.init({
			realm: 'keycloak-demo',
			url: 'http://127.0.0.1:8080/auth/',
			clientId: 'app-svelte'
		} as any));	
</script>

{#if $auth.loading}
	loading...
{:else}
<slot />
{/if}