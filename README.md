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
