/*
 * dashboard/events/schema.ts
 * Author: Lin Jiang (@Injng)
 * Zod schemas for validating events and locations forms.
 */

import { z } from 'zod';

/**
 * @schema locationSchema
 * @description Zod schema for validating location form data.
 * Includes required name and optional description.
 */
export const locationSchema = z.object({
  name: z.string().min(1, 'Location name is required'),
  description: z.string().optional(),
});

/**
 * @schema eventSchema
 * @description Zod schema for validating event form data.
 * Includes required name, date, location_id and optional description and time.
 */
export const eventSchema = z.object({
  name: z.string().min(1, 'Event name is required'),
  description: z.string().optional(),
  location_id: z.number().min(1, 'Please select a location'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().optional(),
}); 