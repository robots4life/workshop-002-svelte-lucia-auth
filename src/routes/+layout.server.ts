import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	console.log(new Date());
	console.log('LAYOUT SERVER : load function');

	// call the validate() method to check for a valid session
	// https://lucia-auth.com/reference/lucia/interfaces/authrequest#validate
	const session = await locals.auth.validate();

	console.log('LAYOUT SERVER : session ');
	console.log(session);

	if (session) {
		return {
			username: session.user.username
		};
	}
};
