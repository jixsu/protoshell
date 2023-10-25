import { parseEnv } from "znv";
import { z } from "zod";

// See https://vitejs.dev/guide/env-and-mode.html for info on adding env variables

export const {
  VITE_SUPABASE_KEY: SUPABASE_KEY,
  VITE_SUPABASE_URL: SUPABASE_URL,
} = parseEnv(import.meta.env, {
  VITE_SUPABASE_URL: z.string(),
  VITE_SUPABASE_KEY: z.string(),
});
