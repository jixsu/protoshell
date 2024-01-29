import { SUPABASE_KEY, SUPABASE_URL } from "@/config.ts/env";
import { handlePostgresResponse, supabaseClient } from ".";

export const getUsers = async () => {
  const supabase = supabaseClient(SUPABASE_URL, SUPABASE_KEY);

  const { data } = handlePostgresResponse(
    await supabase.from("users").select("*")
  );

  return data;
};
