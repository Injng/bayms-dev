# BAYMS

This is the source code for the BAYMS website, built with SvelteKit and deployed using Vercel.

## Developing

Beforehand, you will need to set up a Supabase project. All of the migration code is under the directory `migrations/`. After configuring all of the necessary values, it is highly recommended to turn on RLS for security. Copy `.env.example` and put the project URL and key into `.env.local`.

Once you've set the repository up and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Usage
Refer to the GitHub Wiki for usage details.
