import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

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

import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';

export const actions: Actions = {
	default: async ({ locals }) => {
		const session = await locals.auth.validate();

		if (!session) {
			// 1. check if there is a session, if there is NO session return a 401 error
			// https://en.wikipedia.org/wiki/HTTP_403
			return fail(401);
		}

		if (session) {
			// 2. if there is a session invalidate the user's session
			// https://lucia-auth.com/reference/lucia/interfaces/auth/#invalidatesession
			await auth.invalidateSession(session.sessionId);

			//3. remove the cookie with the session
			// https://lucia-auth.com/reference/lucia/interfaces/authrequest/#setsession
			locals.auth.setSession(null);

			// 4. redirect the user to the root/index/hom page of your app
			throw redirect(302, '/');
		}

		// redirect ALL other cases to the root/index/home page
		throw redirect(302, '/');
	}
} satisfies Actions;
