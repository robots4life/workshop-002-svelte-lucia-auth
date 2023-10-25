import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	console.log(new Date());
	console.log('PROFILE page : load function');
};
