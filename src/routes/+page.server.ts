/**
   +page.server.ts
   Author: Lin Jiang (@Injng)
   Back-end function to load upcoming events data for the homepage.
*/

import type { PageServerLoad } from './$types';
import { error as svError } from '@sveltejs/kit';

/** Load upcoming events data for the homepage. */
export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  // get upcoming events from the database with location information
  const { data: upcomingEvents, error: eventError } = await supabase
    .from('events')
    .select(`
      *,
      locations (
        id,
        name,
        description
      )
    `)
    .gte('date', new Date().toISOString().split('T')[0]) // Only events from today onwards
    .order('date', { ascending: true })
    .limit(6); // Limit to 6 upcoming events
  if (eventError) {
    svError(500, eventError.message);
  }

  return { upcomingEvents };
} 