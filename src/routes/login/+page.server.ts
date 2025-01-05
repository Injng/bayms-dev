/**
   login/+page.server.ts
   Author: Lin Jiang (@Injng)
   Back-end actions to handle authentication on the login page.
*/

import type { Actions } from './$types';

export const actions = {
  /** Action for logging in a user. */
  login: async ({ locals: { supabase }, request }) => {
    // access form data and get necessary inputs
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // sign in with password using supabase and handle any errors
    const { error } = await supabase.auth.signInWithPassword({
      email, password
    });
    if (error) {
      console.error(error);
      return { success: false };
    } else {
      return { success: true };
    }
  }
} satisfies Actions;
