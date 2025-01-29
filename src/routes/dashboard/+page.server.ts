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
  },

  /** Action for saving location and school information. */
  save_location_information: async ({ locals: { supabase }, request }) => {
    const formData = await request.formData();
    
    const update = {
      'address/street': formData.get('street') as string,
      'address/city': formData.get('city') as string,
      'address/state': formData.get('state') as string,
      'address/zip': formData.get('zip') as string,
      'school': formData.get('school') as string,
      'grade': parseInt(formData.get('grade') as string)
    };

    const { data: { user } } = await supabase.auth.getUser();
    if (user === null) return { success: false };

    const { error } = await supabase.from('members').update(update).eq('uid', user.id);
    if (error) return { success: false };
    else return { success: true };
  },

  /** Action for saving about information. */
  save_about_information: async ({ locals: { supabase }, request }) => {
    const formData = await request.formData();
    
    // Handle file upload for picture
    const pictureFile = formData.get('picture') as File;
    let pictureUrl = '';
    
    if (pictureFile.size > 0) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user === null) return { success: false };
      
      // Upload to storage bucket with user ID in path
      const { data, error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(`${user.id}/${pictureFile.name}`, pictureFile, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (uploadError) return { success: false };
      pictureUrl = data.path;
    }

    const update = {
      'picture': pictureUrl || undefined, // Only update if new picture was uploaded
      'instrument': formData.get('instrument') as string,
      'bio': formData.get('bio') as string
    };

    const { data: { user } } = await supabase.auth.getUser();
    if (user === null) return { success: false };

    const { error } = await supabase.from('members').update(update).eq('uid', user.id);
    if (error) return { success: false };
    else return { success: true };
  },

  /** Action for saving parent 1 information. */
  save_parent1_information: async ({ locals: { supabase }, request }) => {
    const formData = await request.formData();
    
    const update = {
      'parent1/name': formData.get('parent1-name') as string,
      'parent1/email': formData.get('parent1-email') as string,
      'parent1/phone': formatPhoneNumber(formData.get('parent1-phone') as string)
    };

    const { data: { user } } = await supabase.auth.getUser();
    if (user === null) return { success: false };

    const { error } = await supabase.from('members').update(update).eq('uid', user.id);
    if (error) return { success: false };
    else return { success: true };
  },

  /** Action for saving parent 2 information. */
  save_parent2_information: async ({ locals: { supabase }, request }) => {
    const formData = await request.formData();
    
    const update = {
      'parent2/name': formData.get('parent2-name') as string,
      'parent2/email': formData.get('parent2-email') as string,
      'parent2/phone': formatPhoneNumber(formData.get('parent2-phone') as string)
    };

    const { data: { user } } = await supabase.auth.getUser();
    if (user === null) return { success: false };

    const { error } = await supabase.from('members').update(update).eq('uid', user.id);
    if (error) return { success: false };
    else return { success: true };
  }
} satisfies Actions;
