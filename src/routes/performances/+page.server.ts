/**
   performances/+page.server.ts
   Author: Lin Jiang (@Injng)
   Back-end function to load data for performances page from the database.
*/

import type { PageServerLoad } from './$types';
import { error as svError } from '@sveltejs/kit';

/** Load event and recording data for the performances page. */
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

  return { 
    eventData, 
    recordingData
  };
} 