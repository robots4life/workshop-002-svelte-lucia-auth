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
git checkout 003-setup-prisma
```

## 4. Setup Prisma

You are going to use Prisma with an SQLite database with SvelteKit.

<a href="https://www.prisma.io/" target="_blank">https://www.prisma.io/</a>

### 4.1 Add Prisma extension to VS Code

Add the Prisma extension to VS Code.

Extension id `Prisma.prisma`

<a href="https://marketplace.visualstudio.com/items?itemName=Prisma.prisma" target="_blank">https://marketplace.visualstudio.com/items?itemName=Prisma.prisma</a>

Create a new folder `.vscode` in your project.

Create a file `setings.json` inside that `.vscode` folder in your project.

Add these settings for the Prisma extension in that `settings.json` file. This formats your `schema.prisma` file on save.

**.vscode/settings.json**

```json
{
	"[prisma]": {
		"editor.defaultFormatter": "Prisma.prisma",
		"editor.formatOnSave": true
	}
}
```

### 4.2. Install Prisma CLI

Install the Prisma CLI as a development dependency in the project.

:bulb: <a href="https://www.prisma.io/docs/reference/api-reference/command-reference#installation" target="_blank">https://www.prisma.io/docs/reference/api-reference/command-reference#installation</a>

```bash
npm install prisma --save-dev
```

### 4.3 Setup Prisma with SQLite Database

Setup Prisma with the `init` command of the Prisma CLI and choose `sqlite` as database.

:bulb: <a href="https://www.prisma.io/docs/reference/api-reference/command-reference#usage" target="_blank">https://www.prisma.io/docs/reference/api-reference/command-reference#usage</a>

If you installed Prisma as a development dependency, you need to prefix the `prisma` command with your package runner.

:bulb: <a href="https://www.prisma.io/docs/reference/api-reference/command-reference#run-prisma-init---datasource-provider-sqlite" target="_blank">https://www.prisma.io/docs/reference/api-reference/command-reference#run-prisma-init---datasource-provider-sqlite</a>

```bash
npx prisma init --datasource-provider sqlite
```

output :point_right:

```bash
✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.

warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Run prisma db pull to turn your database schema into a Prisma schema.
3. Run prisma generate to generate the Prisma Client. You can then start querying your database.

More information in our documentation:
https://pris.ly/d/getting-started
```

### 4.4 Setup Prisma Schema for Username and Password Authentication with Lucia

The default Prisma schema for Lucia has an `User`, a `Key` and a `Session` model.

:bulb: <a href="https://lucia-auth.com/database-adapters/prisma#prisma-schema" target="_blank">https://lucia-auth.com/database-adapters/prisma#prisma-schema</a>

:exclamation: Since you are going to to do authentication with a `username` and `password` you need to add a `username` field to your `User` model. :exclamation:

The `username` field has to be of type `String` and be unique, `@unique`.

:bulb: <a href="https://lucia-auth.com/guidebook/sign-in-with-username-and-password/sveltekit/#update-your-database" target="_blank">https://lucia-auth.com/guidebook/sign-in-with-username-and-password/sveltekit/#update-your-database</a>

:bulb: <a href="https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#unique" target="_blank">https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#unique</a>

<a href="https://en.wikipedia.org/wiki/Basic_access_authentication" target="_blank">https://en.wikipedia.org/wiki/Basic_access_authentication</a>

<a href="https://www.loginradius.com/blog/identity/best-practices-username-password-authentication/" target="_blank">https://www.loginradius.com/blog/identity/best-practices-username-password-authentication/</a>

In this Prisma schme the `User` model has a `username` field.

**prisma/schema.prisma**

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id           String    @id @unique
  username     String    @unique
  auth_session Session[]
  key          Key[]
}

model Session {
  id             String @id @unique
  user_id        String
  active_expires BigInt
  idle_expires   BigInt
  user           User   @relation(references: [id], fields: [user_id], onDelete: Cascade)

  @@index([user_id])
}

model Key {
  id              String  @id @unique
  hashed_password String?
  user_id         String
  user            User    @relation(references: [id], fields: [user_id], onDelete: Cascade)

  @@index([user_id])
}
```

### 4.5 Generate SQLite Database with Prisma Schema

Now it is time to generate the SQLite database according to the Prisma Schema.

:bulb: <a href="https://www.prisma.io/docs/getting-started/quickstart#3-run-a-migration-to-create-your-database-tables-with-prisma-migrate" target="_blank">https://www.prisma.io/docs/getting-started/quickstart#3-run-a-migration-to-create-your-database-tables-with-prisma-migrate</a>

Run the following command in your terminal to create the SQLite database and the

- **User**
- **Session**
- **Key**

**tables** represented by your **models** and defined in in your **Prisma Schema**.

```bash
npx prisma migrate dev --name init
```

This command does two things.

1. It creates a new SQL migration file for this migration in the prisma/migrations directory.
2. It runs the SQL migration file against the database.

Because the SQLite database file didn't exist before, the command also created the file inside the prisma directory with the name `dev.db` as defined via the environment variable in the `.env` file.

output :point_right:

```bash
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": SQLite database "dev.db" at "file:./dev.db"

SQLite database dev.db created at file:./dev.db

Applying migration `20231025151831_init`

The following migration(s) have been created and applied from new schema changes:

migrations/
  └─ 20231025151831_init/
    └─ migration.sql

Your database is now in sync with your schema.

✔ Generated Prisma Client (v5.5.1) to ./node_modules/@prisma/client in 110ms
```

### 4.5 Centralize the Prisma Client

It is common practice to create a Singleton of the Prisma client to use throughout your app.

:bulb: <a href="https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/instantiate-prisma-client" target="_blank">https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/instantiate-prisma-client</a>

In addition and during development you can examine various logs from Prisma.

:bulb: <a href="https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/logging" target="_blank">https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/logging</a>

<a href="https://refactoring.guru/design-patterns/singleton" target="_blank">https://refactoring.guru/design-patterns/singleton</a>

Create a new folder `server` in the folder `src/lib`.

Create a new file `prisma.ts` in the folder `src/lib/server`.

**src/lib/server/prisma.ts**

```ts
import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient({
	log: ['query']
});
```

Now checkout the next branch.

```bash
git checkout 004-setup-lucia
```

## 5. Setup Lucia

You are going to use Lucia for authentication with username and password.

<a href="https://lucia-auth.com/" target="_blank">https://lucia-auth.com/</a>

### 5.1 Install Lucia and install Adapter Prisma for Lucia

:bulb: <a href="https://lucia-auth.com/getting-started/sveltekit" target="_blank">https://lucia-auth.com/getting-started/sveltekit</a>

```bash
npm install lucia
```

:bulb: <a href="https://lucia-auth.com/database-adapters/prisma#installation" target="_blank">https://lucia-auth.com/database-adapters/prisma#installation</a>

```bash
npm install @lucia-auth/adapter-prisma
```

### 5.2 Initialize Lucia

:bulb: <a href="https://lucia-auth.com/getting-started/sveltekit#initialize-lucia" target="_blank">https://lucia-auth.com/getting-started/sveltekit#initialize-lucia</a>

Import `lucia()` from `lucia` and initialize it in its own module (file).

Export `auth` and its type as `Auth`. Make sure to pass the `sveltekit()` middleware.

Create a new folder `server` in the folder `src/lib`.

Create a new file `lucia.ts` in the folder `src/lib/server`.

We’ll expose the user’s `username` to the `User` object by defining `getUserAttributes`.

For this you use the user attribute, `username`.

:bulb: <a href="https://lucia-auth.com/basics/configuration#getuserattributes" target="_blank">https://lucia-auth.com/basics/configuration#getuserattributes</a>

**src/lib/server/lucia.ts**

```ts
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { prisma } from '@lucia-auth/adapter-prisma';
import { db } from '$lib/server/prisma';

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	adapter: prisma(db, {
		user: 'user', // model User {}
		key: 'key', // model Key {}
		session: 'session' // model Session {}
	}),
	getUserAttributes: (data) => {
		return {
			username: data.username
		};
	}
});

export type Auth = typeof auth;
```

### 5.3. Setup Types for Lucia

:bulb: <a href="https://lucia-auth.com/getting-started/sveltekit#set-up-types" target="_blank">https://lucia-auth.com/getting-started/sveltekit#set-up-types</a>

In your `src/app.d.ts` file, declare a `Lucia` namespace. The import path for `Auth` is where you initialized `lucia()`.

Set the type for the user attribute you added to the Lucia configuration, `username`.

**src/app.d.ts**

```ts
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

// https://lucia-auth.com/getting-started/sveltekit#set-up-types
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: import('lucia').AuthRequest;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

/// <reference types="lucia" />
declare global {
	namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		type DatabaseUserAttributes = {
			// required fields (i.e. id) should not be defined here
			username: string;
		};
		type DatabaseSessionAttributes = Record<string, never>;
	}
}

export {};
```

### 5.4 Setup Hooks to store `Auth.request()` on the `locals.auth` Object

:bulb: <a href="https://lucia-auth.com/getting-started/sveltekit#set-up-hooks" target="_blank">https://lucia-auth.com/getting-started/sveltekit#set-up-hooks</a>

**This is optional but highly recommended**.

:bulb: <a href="https://kit.svelte.dev/docs/hooks#server-hooks-handle" target="_blank">https://kit.svelte.dev/docs/hooks#server-hooks-handle</a>

Create a new `handle()` hook that stores `AuthRequest` on the `locals.auth` object.

:bulb: <a href="https://lucia-auth.com/reference/lucia/interfaces/authrequest" target="_blank">https://lucia-auth.com/reference/lucia/interfaces/authrequest</a>

`locals.auth` will store the `Auth.request()` methods `setSession()`, `validate()` and `validateBearerToken()`.

Create a new file `hooks.server.ts` in the `src` folder.

:exclamation: Note, there is no `+` in front of the file name **`hooks.server.ts`**. :exclamation:

:bulb: <a href="https://kit.svelte.dev/docs/types#app-locals" target="_blank">https://kit.svelte.dev/docs/types#app-locals</a>

Note that you can access the `locals` object where you now store the `auth` methods when creating the `hooks.server.ts` file.

:bulb: <a href="https://kit.svelte.dev/docs/form-actions#loading-data" target="_blank">https://kit.svelte.dev/docs/form-actions#loading-data</a>

To access the `locals` object in a `load` function of a page or in a default or named `form action` of a page you need to add it as parameter to the function.

You will see an example of how this is done in just a moment.

You can unpack properties from objects passed as a function parameter. These properties may then be accessed within the function body.

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#unpacking_properties_from_objects_passed_as_a_function_parameter" target="_blank">MDN reference -> Unpacking properties from objects passed as a function parameter</a>

**src/hooks.server.ts**

```ts
import { auth } from '$lib/server/lucia';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// you can pass `event` because you used the SvelteKit middleware
	event.locals.auth = auth.handleRequest(event);
	return await resolve(event);
};
```

Now checkout the next branch.

```bash
git checkout 005-signup-user
```

## 6. Signup User

In the next steps you are going to add the code needed to create a new user in the database.

All of this is done server-side in the **src/routes/signup/+page.server.ts** file.

### 6.1 Do a basic check with the received form values

If the request couldn't be processed because of invalid data, you can return validation errors - along with the previously submitted form values - back to the user, so that they can try again.

The `fail` function lets you return an HTTP status code (typically `400` or `422`, in the case of validation errors) along with the data.

:bulb: <a href="https://kit.svelte.dev/docs/form-actions#anatomy-of-an-action-validation-errors" target="_blank">https://kit.svelte.dev/docs/form-actions#anatomy-of-an-action-validation-errors</a>

**src/routes/signup/+page.server.ts**

```ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	console.log(new Date());
	console.log('SIGNUP page : load function');
};

import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		console.log('SIGNUP page : form action');
		console.log(formData);

		const username = formData.get('username');
		const password = formData.get('password');
		// basic check
		if (typeof username !== 'string' || username.length < 4 || username.length > 32) {
			return fail(400, {
				message: 'Invalid username'
			});
		}
		if (typeof password !== 'string' || password.length < 4 || password.length > 8) {
			return fail(400, {
				message: 'Invalid password'
			});
		}
	}
};
```

To display the returned error `message` on the `signup` page you `export` the `form` property on the page and work with the error.

Use the Svelte `class` directive to trigger the `.error` class on the `form` property.

:bulb: <a href="https://learn.svelte.dev/tutorial/classes" target="_blank">https://learn.svelte.dev/tutorial/classes</a>

:exclamation: Change the form values to something that will break the validation to see the server-side check kick in. :exclamation:

**src/routes/signup/+page.svelte**

```html
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
<pre class:error="{form?.message}">{JSON.stringify(form, null, 2)}</pre>

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
```

### 6.2 Add a new User to the Database

After you have done a basic check with the received form values you can create a new user.

Users can be created with `Auth.createUser()`.

:bulb: <a href="https://lucia-auth.com/basics/users" target="_blank">https://lucia-auth.com/basics/users</a>

This will create a new user, and, if `key` is defined, a new `key`.

:bulb: <a href="https://lucia-auth.com/basics/keys" target="_blank">https://lucia-auth.com/basics/keys</a>

Keys represent the relationship between a user and a reference to that user.

While the user id is the primary way of identifying a user, there are other ways your app may reference a user during the authentication step such as by their `username`, `email`, or Github user id.

These identifiers, be it from a user input or an external source, are provided by a **provider**, identified by a `providerId`.

The unique id for that user within the **provider** is the `providerUserId`.

The unique combination of the provider id and provider user id makes up a `key`.

The `key` here defines the connection between the user and the provided unique `email` (`providerUserId`) when using the `email` & `password` authentication method (`providerId`).

We’ll also store the password in the `key`.

This `key` will be used to get the user and validate the password when logging them in.

:bulb: <a href="https://lucia-auth.com/basics/users/#create-users" target="_blank">https://lucia-auth.com/basics/users/#create-users</a>

```ts
const user = await auth.createUser({
	key: {
		providerId: 'username', // auth method
		providerUserId: username.toLowerCase(), // unique id when using "username" auth method
		password // hashed by Lucia
	},
	attributes: {
		username
	}
});
```

The form action so far has this code. By returning the `user` after `await auth.createUser()` we can see the created user on the signup page.

:exclamation: Do not do this in production in a real application. This is done here for you to see the result fo creating a new user in the database. :exclamation:

**src/routes/signup/+page.server.ts**

```ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	console.log(new Date());
	console.log('SIGNUP page : load function');
};

import type { Actions } from './$types';
import { auth } from '$lib/server/lucia';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		console.log('SIGNUP page : form action');
		console.log(formData);

		const username = formData.get('username');
		const password = formData.get('password');
		// basic check
		if (typeof username !== 'string' || username.length < 4 || username.length > 32) {
			return fail(400, {
				message: 'Invalid username'
			});
		}
		if (typeof password !== 'string' || password.length < 4 || password.length > 8) {
			return fail(400, {
				message: 'Invalid password'
			});
		}

		try {
			// https://lucia-auth.com/reference/lucia/interfaces/auth#createuser
			// 1. create a new user
			const user = await auth.createUser({
				key: {
					providerId: 'username', // auth method
					providerUserId: username.toLowerCase(), // unique id when using "username" auth method
					password // hashed by Lucia
				},
				attributes: {
					username
				}
			});

			// let's return the created user back to the sign up page for now
			return { user };
		} catch (e) {
			console.log(e);
		}
	}
} satisfies Actions;
```

On the `signup` page you can now see the data for the created `user` returned to the page in the `form` property, the returned value from the server-side default form action.

<img src="/static/Screenshot_20231026_151853.png">

You can also see the created user in database with **Prisma Studio**.

Start Prisma Studio.

```bash
npx prisma studio
```

:bulb: <a href="https://www.prisma.io/blog/prisma-studio-3rtf78dg99fe" target="_blank">https://www.prisma.io/blog/prisma-studio-3rtf78dg99fe</a>

Open <a href="http://localhost:5555/" target="_blank">http://localhost:5555/</a> if it is not automatically opened in your browser after this command.

<img src="/static/Screenshot_20231026_152400.png">

Click on `User` to see the data for the user.

<img src="/static/Screenshot_20231026_152512.png">

Now checkout the next branch.

```bash
git checkout 006-create-user-session
```

### 6.3 Create a User Session

Sessions can be created with `Auth.createSession()` and can be stored as a cookie.

:bulb: <a href="https://lucia-auth.com/reference/lucia/interfaces/auth#createsession" target="_blank">https://lucia-auth.com/reference/lucia/interfaces/auth#createsession</a>

After successfully creating a user, we’ll create a new session with `Auth.createSession()` and store it as a cookie with `AuthRequest.setSession()`.

:bulb: <a href="https://lucia-auth.com/reference/lucia/interfaces/authrequest#setsession" target="_blank">https://lucia-auth.com/reference/lucia/interfaces/authrequest#setsession</a>

```ts
// https://lucia-auth.com/reference/lucia/interfaces/auth#createsession
// 2. create a new session once the user is created
const session = await auth.createSession({
	userId: user.userId,
	attributes: {}
});

// https://lucia-auth.com/reference/lucia/interfaces/authrequest#setsession
// 3. store the session on the locals object and set session cookie
locals.auth.setSession(session);
```

:exclamation: Remember when you setup `hooks.server.ts` and stored the `Auth.request()` methods on the `locals.auth` object ? :exclamation:

:point_right: <a href="https://github.com/robots4life/workshop-002-svelte-lucia-auth/tree/005-signup-user#54-setup-hooks-to-store-authrequest-on-the-localsauth-object" target="_blank">5.4 Setup Hooks to store Auth.request() on the locals.auth Object</a>

Note that you can access the `locals` object where you stored the `auth` methods when creating the `hooks.server.ts` file.

:bulb: <a href="https://kit.svelte.dev/docs/form-actions#loading-data" target="_blank">https://kit.svelte.dev/docs/form-actions#loading-data</a>

To access the `locals` object in a `load` function of a page or in a default or named `form action` of a page you need to add it as parameter to the function.

You can unpack properties from objects passed as a function parameter. These properties may then be accessed within the function body.

Here you see `locals` being added as a function parameter so that it can be accessed in the function body, in this case the `form action`.

```ts
default: async ({ request, locals }) => {..
```

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#unpacking_properties_from_objects_passed_as_a_function_parameter" target="_blank">MDN reference -> Unpacking properties from objects passed as a function parameter</a>

**src/routes/signup/+page.server.ts**

```ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	console.log(new Date());
	console.log('SIGNUP page : load function');
};

import type { Actions } from './$types';
import { auth } from '$lib/server/lucia';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		console.log('SIGNUP page : form action');
		console.log(formData);

		const username = formData.get('username');
		const password = formData.get('password');
		// basic check
		if (typeof username !== 'string' || username.length < 4 || username.length > 32) {
			return fail(400, {
				message: 'Invalid username'
			});
		}
		if (typeof password !== 'string' || password.length < 4 || password.length > 8) {
			return fail(400, {
				message: 'Invalid password'
			});
		}

		try {
			// https://lucia-auth.com/reference/lucia/interfaces/auth#createuser
			// 1. create a new user
			const user = await auth.createUser({
				key: {
					providerId: 'username', // auth method
					providerUserId: username.toLowerCase(), // unique id when using "username" auth method
					password // hashed by Lucia
				},
				attributes: {
					username
				}
			});

			// https://lucia-auth.com/reference/lucia/interfaces/auth#createsession
			// 2. create a new session once the user is created
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});

			// https://lucia-auth.com/reference/lucia/interfaces/authrequest#setsession
			// 3. store the session on the locals object and set session cookie
			locals.auth.setSession(session);

			// let's return the created user back to the sign up page for now
			return { user };
		} catch (e) {
			console.log(e);
		}
	}
} satisfies Actions;
```

Start **Prisma Studio** if it is not running already.

```bash
npx prisma studio
```

Go to your Prisma Studio on <a href="http://localhost:5555/" target="_blank">http://localhost:5555/</a>, select the `User` row and hit `Delete 1 record` to delete the previously created user.

If you have any other users then delete all those as well so that you have no records in the database.

Go to the `signup` page and now let's create a new user and a session stored as a cookie for that new user, submit the form.

Again, the SvelteKit default `form action` returns the newly created `user` object to the page.

You should now see a new user and a new session.

<img src="/static/Screenshot_20231026_155513.png">

Click on `User` to see the created user and click on `Session` to the current session for that user.

The created `User`.

<img src="/static/Screenshot_20231026_155613.png">

The created `Session`.

<img src="/static/Screenshot_20231026_155653.png">

Now let's have a look at the created session cookie in the browser development tools.

<img src="/static/Screenshot_20231026_155759.png">

Well done, you just created a new user and a session for that new user that is stored as a cookie, all this with a SvelteKit form default action, using Lucia with Prisma and Sqlite. :tada:

Now checkout the next branch.

```bash
git checkout 007-handle-errors
```

### 6.4 Handle Errors

Lucia throws 2 types of errors: `LuciaError` and database errors from the database driver or ORM you’re using.

:bulb: <a href="https://lucia-auth.com/reference/lucia/modules/main#luciaerror" target="_blank">https://lucia-auth.com/reference/lucia/modules/main#luciaerror</a>

Most database related errors, such as connection failure, duplicate values, and foreign key constraint errors, are thrown as is. These need to be handled as if you were using just the driver/ORM.

Find details about how Prisma does error handling.

:bulb: <a href="https://www.prisma.io/docs/concepts/components/prisma-client/handling-exceptions-and-errors" target="_blank">https://www.prisma.io/docs/concepts/components/prisma-client/handling-exceptions-and-errors</a>

:bulb: <a href="https://www.prisma.io/docs/reference/api-reference/error-reference" target="_blank">https://www.prisma.io/docs/reference/api-reference/error-reference</a>

:bulb: <a href="https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes" target="_blank">https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes</a>

:bulb: <a href="https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/error-formatting" target="_blank">https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/error-formatting</a>

Let's try and log a `PrismaClientKnownRequestError` with Prisma.

:bulb: <a href="https://www.prisma.io/docs/reference/api-reference/error-reference#prismaclientknownrequesterror" target="_blank">https://www.prisma.io/docs/reference/api-reference/error-reference#prismaclientknownrequesterror</a>

:bulb: <a href="https://www.prisma.io/docs/reference/api-reference/error-reference#p2002" target="_blank">https://www.prisma.io/docs/reference/api-reference/error-reference#p2002</a>

**src/lib/server/prisma.ts**

```ts
import { Prisma, PrismaClient } from '@prisma/client';

export const db = new PrismaClient({
	log: ['query']
});

export const PrismaError = Prisma;
```

**src/routes/signup/+page.server.ts**

```ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	console.log(new Date());
	console.log('SIGNUP page : load function');
};

import type { Actions } from './$types';
import { auth } from '$lib/server/lucia';
import { fail } from '@sveltejs/kit';
import { LuciaError } from 'lucia';
import { PrismaError } from '$lib/server/prisma';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		console.log('SIGNUP page : form action');
		console.log(formData);

		const username = formData.get('username');
		const password = formData.get('password');
		// basic check
		if (typeof username !== 'string' || username.length < 4 || username.length > 32) {
			return fail(400, {
				message: 'Invalid username'
			});
		}
		if (typeof password !== 'string' || password.length < 4 || password.length > 8) {
			return fail(400, {
				message: 'Invalid password'
			});
		}

		try {
			// https://lucia-auth.com/reference/lucia/interfaces/auth#createuser
			// 1. create a new user
			const user = await auth.createUser({
				key: {
					providerId: 'username', // auth method
					providerUserId: username.toLowerCase(), // unique id when using "username" auth method
					password // hashed by Lucia
				},
				attributes: {
					username
				}
			});

			// https://lucia-auth.com/reference/lucia/interfaces/auth#createsession
			// 2. create a new session once the user is created
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});

			// https://lucia-auth.com/reference/lucia/interfaces/authrequest#setsession
			// 3. store the session on the locals object and set session cookie
			locals.auth.setSession(session);

			// let's return the created user back to the sign up page for now
			return { user };
		} catch (e) {
			//
			// Prisma error
			// https://www.prisma.io/docs/reference/api-reference/error-reference#prismaclientknownrequesterror
			if (e instanceof PrismaError.PrismaClientKnownRequestError) {
				//
				// https://www.prisma.io/docs/reference/api-reference/error-reference#p2002
				// The .code property can be accessed in a type-safe manner
				if (e.code === 'P2002') {
					console.log(`Unique constraint failed on the ${e?.meta?.target}`);
					console.log('\n');
					console.log('e : ' + e);
					console.log('e.meta : ' + e?.meta);
					console.log('e.meta.target : ' + e?.meta?.target);

					// return the error to the page with SvelteKit's fail function
					return fail(400, { message: `Unique constraint failed on the field ${e?.meta?.target}` });
				}
			}
			// Lucia error
			// https://lucia-auth.com/reference/lucia/modules/main#luciaerror
			if (e instanceof LuciaError) {
				// Lucia error
				return fail(400, { message: String(e) });
			}
			// throw any other error that is not caught by above conditions
			return fail(400, { message: String(e) });
		}
	}
} satisfies Actions;
```

If you try to sign up with an existing user you should see an error message be displayed on the `signup` page.

<img src="/static/Screenshot_20231026_162405.png">

Now checkout the next branch.

```bash
git checkout 008-redirect-authenticated-user
```

## 7. Redirect an Authenticated User

After a new user has successfully registered a new `username` on the `signup` page it makes sense to `redirect` that user to another page of the app instead of staying on the `signup` page.

For example we could redirect the new user to their personal `profile` page. Also, if a user tries to go back to the `signup` page we should redirect them to their `profile` page instead.

:bulb: <a href="https://lucia-auth.com/guidebook/sign-in-with-username-and-password/sveltekit#redirect-authenticated-users" target="_blank">https://lucia-auth.com/guidebook/sign-in-with-username-and-password/sveltekit#redirect-authenticated-users</a>

In the previous step we did create a new user and a session for that user stored in a cookie. We will use the session stored in that cookie to authenticate the user on every new request to the app.

You can validate requests by creating a new `AuthRequest` instance with `Auth.handleRequest()`, which is stored in `locals.auth ` and calling `AuthRequest.validate()`.

:bulb: <a href="https://lucia-auth.com/reference/lucia/interfaces/authrequest" target="_blank">https://lucia-auth.com/reference/lucia/interfaces/authrequest</a>

:bulb: <a href="https://lucia-auth.com/reference/lucia/interfaces/auth#handlerequest" target="_blank">https://lucia-auth.com/reference/lucia/interfaces/auth#handlerequest</a>

You just created a new session for the newly created user and set a session cookie for them on the `local` object under the `auth` property.

This is where the session is set in the created cookie.

```ts
// https://lucia-auth.com/reference/lucia/interfaces/auth#createsession
// 2. create a new session once the user is created
const session = await auth.createSession({
	userId: user.userId,
	attributes: {}
});

// https://lucia-auth.com/reference/lucia/interfaces/authrequest#setsession
// 3. store the session on the locals object and set session cookie
locals.auth.setSession(session);
```

Since we are on the `signup` page and submit a form the page reloads per web standards.

<a href="https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data" target="_blank">MDN reference -> Sending and retrieving form data</a>

So once the page reloads and while we still have the session cookie stored in the app we can define a SvelteKit `load` function that has access to the `locals` object. Remember, on this `locals` object we added the `auth` property with this code.

```ts
// https://lucia-auth.com/reference/lucia/interfaces/authrequest#setsession
// 3. store the session on the locals object and set session cookie
locals.auth.setSession(session);
```

The `locals` object can be accessed in hooks, handle, and handleError, server-only load functions, and `+server.js` files.

It is important to understand that this `locals` object can be accessed by the mentioned functions, all of them being executed in a server-side context.

:bulb: <a href="https://kit.svelte.dev/docs/form-actions#loading-data" target="_blank">https://kit.svelte.dev/docs/form-actions#loading-data</a>

**After a form action runs on a page, the page will be re-rendered (unless a redirect or an unexpected error occurs), with the action's return value available to the page as the form property.**

**This means that your page's load functions will run after the action completes.**

Since you do have a `load` function for the `signup` page **YOU WANT THE LOAD FUNCTION TO RUN** after the default form action.

:bulb: <a href="https://kit.svelte.dev/docs/types#app-locals" target="_blank">https://kit.svelte.dev/docs/types#app-locals</a>

:bulb: <a href="https://kit.svelte.dev/docs/hooks#server-hooks-handle" target="_blank">https://kit.svelte.dev/docs/hooks#server-hooks-handle</a>

Let's define a `load` function on the `signup` page and call the `validate` method on the `auth` property of the `locals` object.

The `validate` method returns a `Session` if the user is authenticated or `null` if not.

:bulb: <a href="https://lucia-auth.com/reference/lucia/interfaces/authrequest#validate" target="_blank">https://lucia-auth.com/reference/lucia/interfaces/authrequest#validate</a>

:bulb: <a href="https://lucia-auth.com/reference/lucia/interfaces#session" target="_blank">https://ucia-auth.com/reference/lucia/interfaces#session</a>

**src/routes/signup/+page.server.ts**

```ts
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	console.log(new Date());
	console.log('SIGNUP page : load function');

	// call the validate() method to check for a valid session
	// https://lucia-auth.com/reference/lucia/interfaces/authrequest#validate
	const session = await locals.auth.validate();

	if (session) {
		// we redirect the user to the profile page if the session is valid
		throw redirect(302, '/profile');
	}
};

// default form action code follows..

// when you submit the form the form action runs first..

// then the page reload triggers the load function to run..
```

Now checkout the next branch.

```bash
git checkout 009-protect-profile-page
```

## 8. Protect Profile Page

:exclamation: So far the `profile` page can be :scream: **accessed publicly** :scream: by every user of your app. :exclamation:

Let's change that.

You know that once a new user signs up there is a session being created. You can use this session to protect the `profile` page.

```ts
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	console.log(new Date());
	console.log('PROFILE page : load function');

	// call the validate() method to check for a valid session
	// https://lucia-auth.com/reference/lucia/interfaces/authrequest#validate
	const session = await locals.auth.validate();

	if (!session) {
		// we redirect the user to the root/index/home page if the session is not valid
		throw redirect(302, '/');
	}

	console.log('PROFILE page : session ');
	console.log(session);

	if (session) {
		return {
			username: session.user.username,
			userId: session.user.userId,
			sessionId: session.sessionId,
			activePeriodExpiresAt: session.activePeriodExpiresAt,
			state: session.state
		};
	}
};
```

Since you now redirect a newly signed up user from the `signup` page to the `profile` page you can either omit returning the created user to the `signup` page or just log the data.

**src/routes/signup/+page.server.ts**

Before

```ts
// let's return the created user back to the sign up page for now
return { user };
```

After

```ts
console.log('SIGNUP page - form action : new user');
console.log(user);
```

Last not least, show the newly created user some private and user specific data on their `profile` page.

:zap: :exclamation: This page is now private, cannot be accessed by public users, and is only visible after a successful signup of a new user and a successful creation of a new session. :exclamation: :zap:

**src/routes/profile/+page.svelte**

```html
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
```

Now checkout the next branch.

```bash
git checkout 010-login-user
```

## 10. Login User

In the next steps you are going to add the code needed to **authenticate an existing user** against their details in the database.

All of this is done server-side in the **src/routes/login/+page.server.ts** file.

### 10.1 Do a basic check with the received form values

If the request couldn't be processed because of invalid data, you can return validation errors - along with the previously submitted form values - back to the user, so that they can try again.

The `fail` function lets you return an HTTP status code (typically `400` or `422`, in the case of validation errors) along with the data.

:bulb: <a href="https://kit.svelte.dev/docs/form-actions#anatomy-of-an-action-validation-errors" target="_blank">https://kit.svelte.dev/docs/form-actions#anatomy-of-an-action-validation-errors</a>

**src/routes/login/+page.server.ts**

```ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	console.log(new Date());
	console.log('LOGIN page : load function');
};

import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		console.log('LOGIN page : form action');
		console.log(formData);

		const username = formData.get('username');
		const password = formData.get('password');
		// basic check
		if (typeof username !== 'string' || username.length < 4 || username.length > 32) {
			return fail(400, {
				message: 'Invalid username'
			});
		}
		if (typeof password !== 'string' || password.length < 4 || password.length > 8) {
			return fail(400, {
				message: 'Invalid password'
			});
		}
	}
};
```
