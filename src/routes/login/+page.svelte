<a href="/">Home</a>
<a href="/signup">Sign Up With Username</a>
<hr />

<h1>Log In</h1>
<hr />

<form id="login" method="POST">
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

	<button form="login" type="submit">Submit</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	button {
		border-radius: 10px;
	}
</style>
