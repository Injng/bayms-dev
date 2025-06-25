/**
   status/+page.server.ts
   Author: Lin Jiang (@Injng)
   Back-end actions to handle displaying application status.
*/

import type { PageServerLoad } from './$types';
import { error as svError } from '@sveltejs/kit';

/** Load member data for the profile page. */
export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  // obtain the user from supabase
  const { data: { user } } = await supabase.auth.getUser();

  // get application status from the database
  const { data: isRejected, error } = await supabase
    .from('applicants')
    .select('rejected')
    .eq('email', user!.email)
    .single();
  if (error) {
    svError(500, error.message);
  }
  
  return { isRejected };
}
