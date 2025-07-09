/**
   performances/+page.server.ts
   Author: Lin Jiang (@Injng)
   Back-end function to load data for musicians page from the database.
*/

import type { PageServerLoad } from './$types';
import { error as svError } from '@sveltejs/kit';

/** Load member data for the musicians page. */
export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  // get member data from the database 
  const { data: memberData, error } = await supabase
    .from('members')
    .select(`name,picture,bio,grade,graduated,instruments`)
    .order('name', { ascending: true });
  if (error) {
    svError(500, error.message);
  }

  return { memberData };
} 
