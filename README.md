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

### 4.4 Setup Prisma Schema for Password Verification with Lucia

The default Prisma schema for Lucia has an `User`, `Key` and `Session` model.

:bulb: <a href="https://lucia-auth.com/database-adapters/prisma#prisma-schema" target="_blank">https://lucia-auth.com/database-adapters/prisma#prisma-schema</a>

Copy the Prisma schema for Lucia to the Prisma schema of your project.

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

Applying migration `20231025133811_init`

The following migration(s) have been created and applied from new schema changes:

migrations/
  └─ 20231025133811_init/
    └─ migration.sql

Your database is now in sync with your schema.

Running generate... (Use --skip-generate to skip the generators)

added 2 packages, and audited 222 packages in 4s

45 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

✔ Generated Prisma Client (v5.5.1) to ./node_modules/@prisma/client in 97ms
```
