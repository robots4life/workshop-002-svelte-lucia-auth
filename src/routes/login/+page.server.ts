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
