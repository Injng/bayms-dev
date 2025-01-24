/**
   +layout.ts
   Author: Lin Jiang (@Injng)
   Provides global access to the supabase client and session states.
*/

import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr'
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({ data, depends, fetch }) => {
  // declare a dependency so the layout can be invalidated
  depends('supabase:auth')

  // obtain the supabase client using the url and key
  const supabase = isBrowser()
    ? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: {
          fetch,
        },
      })
    : createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: {
          fetch,
        },
        cookies: {
          getAll() {
            return data.cookies
          },
        },
    });

  // obtain the session from supabase
  const { data: { session } } = await supabase.auth.getSession();

  // obtain the user from supabase
  const { data: { user } } = await supabase.auth.getUser();
  const auth = user != null;

  return { session, supabase, user, auth };
}
