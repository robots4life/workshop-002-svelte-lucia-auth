<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	console.log('ROOT page : data');

	console.log(data);
</script>

<a href="/signup">Sign Up With Username</a>
<a href="/login">Log In With Username</a>

{#if data.username}
	<a href="/profile">View Profile</a>
{/if}
<hr />

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
