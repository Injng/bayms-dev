/**
   reset/+page.server.ts
   Author: Lin Jiang (@Injng)
   Back-end actions to handle resetting a user's password.
*/

import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
  /** Action for resetting a user's password. */
  reset: async ({ locals: { supabase }, request }) => {
    // access form data and get necessary inputs
    const formData = await request.formData();
    const password = formData.get('password') as string;
    const password2 = formData.get('password2') as string;

    // valid that passwords match
    if (password !== password2) {
      return { success: false };
    }

    // update user's password using supabase and handle any errors
    const { error } = await supabase.auth.updateUser({
      password
    });
    if (error) {
      return { success: false };
    }

    // redirect to dashboard
    return redirect(302, '/dashboard');
  }
} satisfies Actions;
