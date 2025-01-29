/**
   dashboard/+page.server.ts
   Author: Lin Jiang (@Injng)
   Back-end actions to handle saving personal information on the profile page.
*/

import type { Actions, PageServerLoad } from './$types';

/** Load member data for the profile page. */
export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  // obtain the user from supabase
  const { data: { user } } = await supabase.auth.getUser();

  // obtain member data according to uid
  const { data } = await supabase.from('members')
    .select()
    .eq('uid', user!.id)
  return { user: data };
}

/** Function to format phone numbers universally. */
function formatPhoneNumber(phone: string): string {
  if (!phone) return "";

  // remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "");

  // if it's a US/Canada number (10 or 11 digits)
  if (
    cleaned.length === 10 ||
    (cleaned.length === 11 && cleaned.startsWith("1"))
  ) {
    // remove leading 1 if present
    const digits = cleaned.length === 11 ? cleaned.substring(1) : cleaned;
    // format as (XXX) XXX-XXXX
    return `(${digits.substring(0, 3)}) ${digits.substring(3, 6)}-${digits.substring(6)}`;
  }

  // for international numbers:
  // if longer than 7 digits, group in chunks of 2-3 from the right
  if (cleaned.length >= 7) {
    let formatted = "";
    let remaining = cleaned;

    // add last 4 digits
    formatted = remaining.slice(-4);
    remaining = remaining.slice(0, -4);

    // add next 3 digits
    if (remaining.length > 0) {
      formatted = remaining.slice(-3) + "-" + formatted;
      remaining = remaining.slice(0, -3);
    }

    // add remaining digits in groups of 2-3
    while (remaining.length > 0) {
      if (remaining.length > 3) {
        formatted = remaining.slice(-3) + "-" + formatted;
        remaining = remaining.slice(0, -3);
      } else {
        formatted = remaining + "-" + formatted;
        remaining = "";
      }
    }

    return formatted;
  }

  // for very short numbers, just return as is
  return cleaned;
}

export const actions = {
  /** Action for saving personal information. */
  save_personal_information: async ({ locals: { supabase }, request }) => {
    // access form data and get necessary inputs
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formatPhoneNumber(formData.get('phone') as string);
    const birthday = formData.get('birthday') as string;

    // build update const
    const update = { name, email, phone, birthday };

    // obtain user information
    const { data: { user } } = await supabase.auth.getUser();
    if (user === null) return { success: false };

    // update the database
    const { error } = await supabase.from('members').update(update).eq('uid', user.id);
    if (error) return { success: false };
    else return { success: true };
  }
} satisfies Actions;
