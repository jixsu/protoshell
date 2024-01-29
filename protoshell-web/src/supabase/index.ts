import {
  PostgrestResponse,
  SupabaseClient,
  SupabaseClientOptions,
  createClient,
} from "@supabase/supabase-js";
import { Database } from "./types";

export type SupabaseCreateClient = SupabaseClient<Database>;

export const supabaseClient = (
  supabaseUrl: string,
  supabaseAnonKey: string,
  accessToken?: string
): SupabaseCreateClient => {
  const options: SupabaseClientOptions<"public"> = {};

  if (accessToken) {
    options.global = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey, options);
};

export const handlePostgresResponse = <T>(response: PostgrestResponse<T>) => {
  const { data, count, error } = response;

  if (error) {
    throw error;
  }

  return { data, count };
};
