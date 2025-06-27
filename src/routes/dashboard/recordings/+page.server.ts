/**
   dashboard/recordings/+page.server.ts
   Author: Lin Jiang (@Injng)
   Back-end function to load data for recordings from the database.
*/

import type { Actions, PageServerLoad } from './$types';
import { error as svError, fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { recordingSchema } from './schema';

/** Load event and recording data for the recordings page. */
export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  // get event data from the database with location information
  const { data: eventData, error: eventError } = await supabase
    .from('events')
    .select(`
      *,
      locations (
        id,
        name,
        description
      )
    `)
    .order('date', { ascending: false });
  if (eventError) {
    svError(500, eventError.message);
  }

  // get recording data from the database with event information
  const { data: recordingData, error: recordingError } = await supabase
    .from('recordings')
    .select(`
      *,
      events (
        id,
        name,
        date,
        locations (
          id,
          name
        )
      )
    `)
    .order('id', { ascending: false });
  if (recordingError) {
    svError(500, recordingError.message);
  }

  // load recording form
  const recordingForm = await superValidate(zod(recordingSchema));

  return { 
    eventData, 
    recordingData, 
    recordingForm 
  };
}

export const actions = {
  /** Action for adding a new recording. */
  add_recording: async ({ locals: { supabase }, request }) => {
    // validate form inputs
    const form = await superValidate(request, zod(recordingSchema));
    if (!form.valid) return fail(400, { form });

    // insert the new recording
    const { error } = await supabase
      .from('recordings')
      .insert(form.data);
    if (error) {
      return message(form, 'Database error.', {
        status: 500
      });
    }

    // success message
    return message(form, 'Recording added successfully.');
  }
} satisfies Actions;
