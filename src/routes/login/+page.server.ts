import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	console.log(new Date());
	console.log('LOGIN page : load function');
};

import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia';
import { PrismaError } from '$lib/server/prisma';

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
};
