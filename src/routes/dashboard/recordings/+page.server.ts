/**
   dashboard/recordings/+page.server.ts
   Author: Lin Jiang (@Injng)
   Back-end function to load data for recordings from the database.
*/

import type { Actions, PageServerLoad } from './$types';
import { error as svError, fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { recordingSchema, highlightSchema } from './schema';

/** Load event, recording, and highlight data for the recordings page. */
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

  // get highlights data from the database
  const { data: highlightData, error: highlightError } = await supabase
    .from('highlights')
    .select('*')
    .order('id', { ascending: false });
  if (highlightError) {
    svError(500, highlightError.message);
  }

  // load forms
  const recordingForm = await superValidate(zod(recordingSchema));
  const highlightForm = await superValidate(zod(highlightSchema));

  return { 
    eventData, 
    recordingData, 
    highlightData,
    recordingForm,
    highlightForm
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
  },

  /** Action for adding a new highlight. */
  add_highlight: async ({ locals: { supabase }, request }) => {
    // validate form inputs
    const form = await superValidate(request, zod(highlightSchema));
    if (!form.valid) return fail(400, { form });

    // insert the new highlight
    const { error } = await supabase
      .from('highlights')
      .insert(form.data);
    if (error) {
      return message(form, 'Database error.', {
        status: 500
      });
    }

    // success message
    return message(form, 'Highlight added successfully.');
  },

  /** Action for removing a highlight. */
  remove_highlight: async ({ locals: { supabase }, request }) => {
    const formData = await request.formData();
    const highlightId = formData.get('highlight_id');
    
    if (!highlightId) {
      return fail(400, { message: 'Highlight ID is required' });
    }

    // delete the highlight
    const { error } = await supabase
      .from('highlights')
      .delete()
      .eq('id', highlightId);
    if (error) {
      return fail(500, { message: 'Database error.' });
    }

    return { success: true };
  }
} satisfies Actions;
