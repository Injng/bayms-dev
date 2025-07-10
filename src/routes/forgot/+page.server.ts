/**
   forgot/+page.server.ts
   Author: Lin Jiang (@Injng)
   Back-end actions to handle requesting a password reset email.
*/

import type { Actions } from './$types';

export const actions = {
  /** Action for requesting a password reset email. */
  forgot: async ({ locals: { supabase }, request }) => {
    // access form data and get necessary inputs
    const formData = await request.formData();
    const email = formData.get('email') as string;

    // valid that email is not empty
    if (email.length === 0) {
      return { success: false };
    }

    // request password reset email using supabase and handle any errors
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `https://dev.bayms.org/reset`
    });
    if (error) {
      return { success: false };
    }

    return { success: true };
  }
} satisfies Actions;
