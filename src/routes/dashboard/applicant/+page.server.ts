/**
   dashboard/+page.server.ts
   Author: Lin Jiang (@Injng)
   Back-end actions to handle saving personal information on the profile page.
*/

import type { Actions, PageServerLoad } from './$types';
import { error as svError, fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import {
  aboutInformationSchema,
  locationSchoolSchema,
  parent1InformationSchema,
  parent2InformationSchema,
  personalInformationSchema
} from '../schema';

/** Load member data for the profile page. */
export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  // obtain the user from supabase
  const { data: { user } } = await supabase.auth.getUser();

  // get member data from the database
  const { data: memberData, error } = await supabase
    .from('applicants')
    .select('name,email,phone,birthday,street,city,state,zip,school,grade,instruments,bio,parent1name,parent1email,parent1phone,parent2name,parent2email,parent2phone')
    .eq('email', user!.email)
    .single();
  if (error) {
    svError(500, error.message);
  }
  
  // load all of the dashboard forms
  const personalInformationForm =
    await superValidate(memberData || {}, zod(personalInformationSchema));
  const locationSchoolForm =
    await superValidate(memberData || {}, zod(locationSchoolSchema));
  const aboutInformationForm =
    await superValidate(memberData || {}, zod(aboutInformationSchema));
  const parent1InformationForm =
    await superValidate(memberData || {}, zod(parent1InformationSchema));
  const parent2InformationForm =
    await superValidate(memberData || {}, zod(parent2InformationSchema));
  
  return {
    user,
    personalInformationForm,
    locationSchoolForm,
    aboutInformationForm,
    parent1InformationForm,
    parent2InformationForm
  };
}

/** Function to format phone numbers by removing all non-digit characters. */
function formatPhoneNumber(phone: string): string {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");  
  return cleaned;
}

export const actions = {
  /** Action for saving personal information. */
  save_personal_information: async ({ locals: { supabase }, request }) => {
    // validate form inputs
    const form = await superValidate(request, zod(personalInformationSchema));
    if (!form.valid) return fail(400, { form });

    // obtain user information
    const { data: { user } } = await supabase.auth.getUser();
    if (user === null) return svError(401, 'Please log in and try again.');

    // format phone number consistently
    if (form.data.phone) {
      form.data.phone = formatPhoneNumber(form.data.phone);
    }

    // ensure email is not changed
    form.data.email = user.email;

    // update the database
    const { error } = await supabase
      .from('applicants')
      .update(form.data)
      .eq('email', user.email);
    if (error) {
      return message(form, 'Database error.', {
        status: 500
      });
    }

    // success message
    return message(form, 'Submit successful.');
  },

  /** Action for saving location and school information. */
  save_location_information: async ({ locals: { supabase }, request }) => {
    // validate form inputs
    const form = await superValidate(request, zod(locationSchoolSchema));
    if (!form.valid) return fail(400, { form });

    // obtain user information
    const { data: { user } } = await supabase.auth.getUser();
    if (user === null) return svError(401, 'Please log in and try again.');

    // update the database
    const { error } = await supabase
      .from('applicants')
      .update(form.data)
      .eq('email', user.email);
    if (error) {
      return message(form, 'Database error.', {
        status: 500
      });
    }

    // success message
    return message(form, 'Submit successful.');
  },

  /** Action for saving about information. */
  save_about_information: async ({ locals: { supabase }, request }) => {
    // validate form inputs
    const form = await superValidate(request, zod(aboutInformationSchema));
    if (!form.valid) return fail(400, { form });

    // obtain user information
    const { data: { user } } = await supabase.auth.getUser();
    if (user === null) return svError(401, 'Please log in and try again.');

    // upload image to storage bucket with user ID in path and store URL
    let pictureUrl = '';
    if (form.data.picture) {
      const { data, error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(`${user.id}/${form.data.picture?.name}`, form.data.picture, {
          cacheControl: '3600',
          upsert: true
        });
      if (uploadError) {
        return message(form, 'Upload error.', {
          status: 500
        });
      }
      pictureUrl = data.path;
    }

    // construct update values
    const update = {
      'picture': pictureUrl || undefined,
      'instruments': form.data.instruments,
      'bio': form.data.bio
    };

    // update the database
    const { error } = await supabase
      .from('applicants')
      .update(update)
      .eq('email', user.email);
    if (error) {
      return message(form, 'Database error.', {
        status: 500
      });
    }

    // success message
    return message(form, 'Submit successful.');
  },

  /** Action for saving parent 1 information. */
  save_parent1_information: async ({ locals: { supabase }, request }) => {
    // validate form inputs
    const form = await superValidate(request, zod(parent1InformationSchema));
    if (!form.valid) return fail(400, { form });

    // obtain user information
    const { data: { user } } = await supabase.auth.getUser();
    if (user === null) return svError(401, 'Please log in and try again.');

    // format phone number consistently
    if (form.data.parent1phone) {
      form.data.parent1phone = formatPhoneNumber(form.data.parent1phone);
    }

    // update the database
    const { error } = await supabase
      .from('applicants')
      .update(form.data)
      .eq('email', user.email);
    if (error) {
      return message(form, 'Database error.', {
        status: 500
      });
    }

    // success message
    return message(form, 'Submit successful.');
  },

  /** Action for saving parent 2 information. */
  save_parent2_information: async ({ locals: { supabase }, request }) => {
    // validate form inputs
    const form = await superValidate(request, zod(parent2InformationSchema));
    if (!form.valid) return fail(400, { form });

    // obtain user information
    const { data: { user } } = await supabase.auth.getUser();
    if (user === null) return svError(401, 'Please log in and try again.');

    // format phone number consistently
    if (form.data.parent2phone) {
      form.data.parent2phone = formatPhoneNumber(form.data.parent2phone);
    }

    // update the database
    const { error } = await supabase
      .from('applicants')
      .update(form.data)
      .eq('email', user.email);
    if (error) {
      return message(form, 'Database error.', {
        status: 500
      });
    }

    // success message
    return message(form, 'Submit successful.');
  }
} satisfies Actions;
