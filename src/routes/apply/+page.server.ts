/**
   apply/+page.server.ts
   Author: Lin Jiang (@Injng)
   Back-end actions to handle sign-up on the application page.
*/

import type { Actions } from '../../../../../../.emacs.d/saves/!home!lnjng!Projects!dev!bayms!.svelte-kit!types!src!routes!apply!$types.d.ts~';

export const actions = {
  /** Action for signing up an applicant. */
  apply: async ({ locals: { supabase }, request }) => {
    // access form data and get necessary inputs
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;
    const password = formData.get('password') as string;
    const password2 = formData.get('password2') as string;

    // valid that passwords match
    if (password !== password2) {
      return { success: false };
    }

    // sign up with email password using supabase and handle any errors
    const { error } = await supabase.auth.signUp({
      email, password
    });
    if (error) {
      return { success: false };
    }

    // if successful, automatically sign in
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email, password
    });
    if (signInError) {
      return { success: false };
    }

    // create new entry for user in applicants table
    const { error: insertError } = await supabase
      .from('applicants')
      .insert([{ email, name }]);
    if (insertError) {
      return { success: false };
    }
    
    return { success: true };
  }
} satisfies Actions;
