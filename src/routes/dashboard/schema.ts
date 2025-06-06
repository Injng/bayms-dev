/*
 * dashboard/schema.ts
 * Author: Lin Jiang (@Injng)
 * Zod schemas for validating dashboard forms.
 */

import { z } from 'zod';

/**
 * @constant states
 * @description An array of US state names. Used for dropdowns and validation.
 */
const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California",
  "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
  "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
] as const;

/**
 * @constant instruments
 * @description An array of musical instrument names. Used for dropdowns and validation.
 */
const instruments = [
  "Bassoon", "Cello", "Clarinet", "Flute", "Oboe", "Percussion", "Piano",
  "Saxophone", "Trumpet", "Viola", "Violin", "Voice"
] as const;

/**
 * @schema personalInformationSchema
 * @description Zod schema for validating personal information form data.
 * Includes optional fields for name, email, phone number, and birthday.
 */
export const personalInformationSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  birthday: z.string().date().optional(),
});

/**
 * @schema locationSchoolSchema
 * @description Zod schema for validating school and location information form data.
 * Includes optional fields for street, city, state, ZIP code, school name, and grade.
 */
export const locationSchoolSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.enum(states).optional(),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/).optional(),
  school: z.string().optional(),
  grade: z.number().optional(),
});

/**
 * @schema aboutInformationSchema
 * @description Zod schema for validating "about" information form data.
 * Includes optional fields for a picture (File instance), instrument, and biography.
 */
export const aboutInformationSchema = z.object({
  picture: z.instanceof(File).refine((f) => f.size < 5_000_000 , 'Max 5 MB.').optional(),
  instruments: z.enum(instruments).array().optional(),
  bio: z.string().max(650).optional(),
});

/**
 * @schema parent1InformationSchema
 * @description Zod schema for validating Parent 1 information form data.
 * Includes optional fields for name, email, and phone number.
 */
export const parent1InformationSchema = z.object({
  parent1name: z.string().optional(),
  parent1email: z.string().email().optional(),
  parent1phone: z.string().optional(),
});

/**
 * @schema parent2InformationSchema
 * @description Zod schema for validating Parent 2 information form data.
 * Includes optional fields for name, email, and phone number.
 */
export const parent2InformationSchema = z.object({
  parent2name: z.string().optional(),
  parent2email: z.string().email().optional(),
  parent2phone: z.string().optional(),
});
