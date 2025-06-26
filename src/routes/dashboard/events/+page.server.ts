/**
   dashboard/events/+page.server.ts
   Author: Lin Jiang (@Injng)
   Back-end function to load data for events and locations from the database.
*/

import type { Actions, PageServerLoad } from './$types';
import { error as svError, fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { locationSchema, eventSchema } from './schema';

/** Load event and location data for the events page. */
export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  // get location data from the database
  const { data: locationData, error: locationError } = await supabase
    .from('locations')
    .select('*')
    .order('name');
  if (locationError) {
    svError(500, locationError.message);
  }

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

  // load forms
  const locationForm = await superValidate(zod(locationSchema));
  const eventForm = await superValidate(zod(eventSchema));

  return { 
    locationData, 
    eventData, 
    locationForm, 
    eventForm 
  };
}

export const actions = {
  /** Action for adding a new location. */
  add_location: async ({ locals: { supabase }, request }) => {
    // validate form inputs
    const form = await superValidate(request, zod(locationSchema));
    if (!form.valid) return fail(400, { form });

    // insert the new location
    const { error } = await supabase
      .from('locations')
      .insert(form.data);
    if (error) {
      return message(form, 'Database error.', {
        status: 500
      });
    }

    // success message
    return message(form, 'Location added successfully.');
  },

  /** Action for adding a new event. */
  add_event: async ({ locals: { supabase }, request }) => {
    // validate form inputs
    const form = await superValidate(request, zod(eventSchema));
    if (!form.valid) return fail(400, { form });

    // insert the new event
    const { error } = await supabase
      .from('events')
      .insert(form.data);
    if (error) {
      return message(form, 'Database error.', {
        status: 500
      });
    }

    // success message
    return message(form, 'Event added successfully.');
  }
} satisfies Actions;
