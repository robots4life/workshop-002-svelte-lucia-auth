# SvelteKit Workshop @ Liip Zurich Switzerland 2023-10-27

Location
**<a href="https://www.liip.ch/en" target="_blank">https://www.liip.ch/en</a>**

Event
**<a href="https://www.meetup.com/sveltesocietyzurich/events/296854457/" target="_blank">https://www.meetup.com/sveltesocietyzurich/events/296854457/</a>**

Repository
**<a href="https://github.com/robots4life/workshop-002-svelte-lucia-auth" target="_blank">https://github.com/robots4life/workshop-002-svelte-lucia-auth</a>**

## 1. Clone Repository

##### Prerequisites

You need to have **Node** v18.17.1 or higher and **git** installed.

Install Node with nvm
<a href="https://github.com/nvm-sh/nvm" target="_blank">https://github.com/nvm-sh/nvm</a>

Install git
<a href="https://git-scm.com/book/en/v2/Getting-Started-Installing-Git" target="_blank">https://git-scm.com/book/en/v2/Getting-Started-Installing-Git</a>

##### Clone Repository

```bash
git clone git@github.com:robots4life/workshop-002-svelte-lucia-auth.git
```

```bash
gh repo clone robots4life/workshop-002-svelte-lucia-auth
```

The branch names are numbered in sequence starting with `001-branch-name`.

Go through the workshop by checking out the first branch **`git checkout 001-setup-sveltekit`** and continue from there.

:bulb: With tab completion on your terminal you can just type the next number and easily checkout the next branch without having to type the whole name of the next branch.

<a href="https://en.wikipedia.org/wiki/Command-line_completion" target="_blank">https://en.wikipedia.org/wiki/Command-line_completion</a>

##### Start here.

```bash
git checkout 001-setup-sveltekit
```

## 2. Setup SvelteKit

In addition to having the ready-made solution in this workshop repository you can code along in your own project.

Create a new folder and run this command in the terminal inside the new folder.

```bash
npm create svelte@latest
```

- choose current directory
- choose Skeleton project
- choose TypeScript
- choose ESLint
- choose Prettier

That should create a default skeleton project in the folder.

Next install the packages.

```bash
npm install
```

You can run the development server to make sure everything works fine so far.

```bash
npm run dev
```

Now checkout the next branch.

```bash
git checkout 002-setup-app
```

## 3. Setup basic app styles, layout and pages

Create an **app.css** file in the **src** folder with the following contents.

**src/app.css**

```css
/* https://andy-bell.co.uk/a-modern-css-reset/ START */
/* Box sizing rules */
*,
*::before,
*::after {
	box-sizing: border-box;
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd {
	margin: 0;
}

/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul[role='list'],
ol[role='list'] {
	list-style: none;
}

/* Set core root defaults */
html:focus-within {
	scroll-behavior: smooth;
}

/* Set core body defaults */
body {
	min-height: 100vh;
	text-rendering: optimizeSpeed;
	line-height: 1.5;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
	text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img,
picture {
	max-width: 100%;
	display: block;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
	font: inherit;
}

/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
	html:focus-within {
		scroll-behavior: auto;
	}

	*,
	*::before,
	*::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
		scroll-behavior: auto !important;
	}
}
/* https://andy-bell.co.uk/a-modern-css-reset/ END */

html {
	background-color: #002244;
	color: blanchedalmond;
}

body {
	padding: 2rem;
}

body,
form,
input,
button,
a {
	font-family: sans-serif;
	font-size: 1.6rem;
}
a {
	color: whitesmoke;
}
a:hover {
	color: green;
}
```

Create a **+layout.svelte** file in the **src/routes** folder with following contents.

**src/routes/+layout.svelte**

```html
<script lang="ts">
	import '../app.css';
</script>

<slot />
```

Create 3 pages, `signup`, `login` and `profile`.

Create a **signup** folder in the **src/routes** folder.
Create a **login** folder in the **src/routes** folder.
Create a **profile** folder in the **src/routes** folder.

Create a **+page.svelte** and **+page.server.ts** file in each new page.

### **Signup Page**

Create a simple form to send `signup` data to the default form action on the server.

**src/routes/signup/+page.svelte**

```html
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
```

Create a default form action on the server that logs the sent data to the terminal.

:bulb: <a href="https://kit.svelte.dev/docs/form-actions#default-actions" target="_blank">https://kit.svelte.dev/docs/form-actions#default-actions</a>

**src/routes/signup/+page.server.ts**

```ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	console.log(new Date());
	console.log('SIGNUP page : load function');
};

import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		console.log('SIGNUP page : form action');
		console.log(formData);
	}
};
```

### **Login Page**

Create a simple form to send `login` data to the default form action on the server.

**src/routes/login/+page.svelte**

```html
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
```

Create a default form action on the server that logs the sent data to the terminal.

:bulb: <a href="https://kit.svelte.dev/docs/form-actions#default-actions" target="_blank">https://kit.svelte.dev/docs/form-actions#default-actions</a>

**src/routes/login/+page.server.ts**

```ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	console.log(new Date());
	console.log('LOGIN page : load function');
};

import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		console.log('LOGIN page : form action');
		console.log(formData);
	}
};
```

### **Profile Page**

**src/routes/profile/+page.svelte**

```html
<a href="/">Home</a>
<hr />

<h1>Profile</h1>
<hr />

<h2>Account Details</h2>
<h3>Protected Route - User Specific Information</h3>
```

**src/routes/profile/+page.server.ts**

```ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	console.log(new Date());
	console.log('PROFILE page : load function');
};
```

### **Root Page**

Last not least, add links to these pages on the root page.

**src/routes/+page.svelte**

```html
<a href="/signup">Sign Up With Username</a>
<a href="/login">Log In With Username</a>
<a href="/profile">View Profile</a>
<hr />

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
```

Now checkout the next branch.

```bash
git checkout 003-setup-lucia
```
