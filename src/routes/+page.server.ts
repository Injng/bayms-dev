/**
   +page.server.ts
   Author: Lin Jiang (@Injng)
   Provides page data that contain information on the user and authentication status.
*/

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { supabase }}) => {
  const { data: { user }} = await supabase.auth.getUser();
  const auth = user != null;
  return { user, auth };
};
