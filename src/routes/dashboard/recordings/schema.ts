/*
 * dashboard/recordings/schema.ts
 * Author: Lin Jiang (@Injng)
 * Zod schemas for validating recordings forms.
 */

import { z } from 'zod';

/**
 * @schema recordingSchema
 * @description Zod schema for validating recording form data.
 * Includes required name, recording_url, event_id and optional description.
 */
export const recordingSchema = z.object({
  name: z.string().min(1, 'Recording name is required'),
  description: z.string().optional(),
  recording_url: z.string().url('Please enter a valid URL').min(1, 'Recording URL is required'),
  event_id: z.number().min(1, 'Please select an event'),
}); 