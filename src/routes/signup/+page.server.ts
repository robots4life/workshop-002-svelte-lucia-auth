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
