/**
   dashboard/applicants/+page.server.ts
   Author: Lin Jiang (@Injng)
   Back-end function to load data for all applicants from the database.
*/

import type { PageServerLoad } from './$types';
import { error as svError } from '@sveltejs/kit';

/** Load applicant data for the applicants page. */
export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  // get applicant data from the database
  const { data: memberData, error } = await supabase
    .from('applicants')
    .select('name,email,phone,birthday,street,city,state,zip,school,grade,picture,instruments,bio,parent1name,parent1email,parent1phone,parent2name,parent2email,parent2phone')
    .eq('rejected', false);
  if (error) {
    svError(500, error.message);
  }

  return { memberData };
}
