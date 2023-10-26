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
