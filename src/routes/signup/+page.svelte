<script lang="ts">
	// export the form property on this page to show the return value of the form action on the page
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<a href="/">Home</a>
<a href="/login">Log In With Username</a>
<hr />

<h1>Sign Up</h1>
<hr />

<form id="signup" method="POST">
	<label for="username">Username</label>
	<input
		required
		type="text"
		name="username"
		id="username"
		minlength="4"
		maxlength="32"
		placeholder="Choose Your Username"
		value="cyber.punk.9731"
	/>

	<label for="password">Password</label>
	<input
		required
		type="text"
		name="password"
		id="password"
		minlength="4"
		maxlength="8"
		placeholder="Choose Your password"
		value="12345678"
	/>

	<button form="signup" type="submit">Submit</button>
</form>

<!-- show the return value from the form action -->
<!-- use the Svelte class directive to trigger the CSS .error class -->
<pre class:error={form?.message}>{JSON.stringify(form, null, 2)}</pre>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	button {
		border-radius: 10px;
	}
	.error {
		background-color: darkred;
		color: lightgoldenrodyellow;
		border-radius: 10px;
		border: 4px solid darkslateblue;
	}
</style>
