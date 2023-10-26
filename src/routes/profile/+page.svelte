<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	console.log(data);
</script>

<a href="/">Home</a>
<hr />

<h1>Profile</h1>
<hr />

<h2>Account Details</h2>
<h3>Protected Route - User Specific Information</h3>

{#if Object.keys(data).length !== 0}
	<pre>{JSON.stringify(data, null, 2)}</pre>
{/if}
