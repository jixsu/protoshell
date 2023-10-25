import { parseEnv } from "znv";
import { z } from "zod";

export const {
  VITE_SUPABASE_KEY: SUPABASE_KEY,
  VITE_SUPABASE_URL: SUPABASE_URL,
} = parseEnv(import.meta.env, {
  VITE_SUPABASE_URL: z.string(),
  VITE_SUPABASE_KEY: z.string(),
});
