import { handlePostgresResponse, supabaseClient } from ".";

export const getUser = async (userId: string) => {
  const { data } = handlePostgresResponse(
    await supabaseClient.from("users").select("*").eq("id", userId)
  );

  return data;
};

export const getUsers = async () => {
  const { data } = handlePostgresResponse(
    await supabaseClient.from("users").select("*")
  );

  return data;
};
