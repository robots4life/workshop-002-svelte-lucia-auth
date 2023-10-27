import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	console.log(new Date());
	console.log('LOGIN page : load function');
};

import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';

export const actions: Actions = {
	default: async ({ request, locals }) => {
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

		try {
			// https://lucia-auth.com/reference/lucia/interfaces/auth#usekey
			// 1. find user by key and check if the password is defined and check if the password is correct/valid
			const key = await auth.useKey('username', username.toLowerCase(), password);
			console.log('LOGIN page - form action : key');
			console.log(key);

			// https://lucia-auth.com/reference/lucia/interfaces/auth#createsession
			// 2. create a new session once the user is created
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});

			// https://lucia-auth.com/reference/lucia/interfaces/authrequest#setsession
			// 3. store the session on the locals object and set session cookie
			locals.auth.setSession(session);
		} catch (e) {
			console.log(e);
		}
	}
};
