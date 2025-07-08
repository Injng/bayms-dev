/**
   dashboard/members/+page.server.ts
   Author: Lin Jiang (@Injng)
   Back-end function to load data for all members from the database.
*/

import type { PageServerLoad } from './$types';
import { error as svError } from '@sveltejs/kit';

/** Load member data for the members page. */
export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  // get member data from the database
  const { data: memberData, error } = await supabase
    .from('members')
    .select('name,email,phone,birthday,street,city,state,zip,school,grade,picture,instruments,bio,parent1name,parent1email,parent1phone,parent2name,parent2email,parent2phone,graduated');
  if (error) {
    svError(500, error.message);
  }

// sort alphabetically ai!
  return { memberData };
}
