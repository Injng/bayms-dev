import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { supabase }}) => {
  const { data: { user }} = await supabase.auth.getUser();
  const auth = user != null;
  return { user, auth };
};
