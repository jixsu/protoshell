import { handlePostgresResponse, supabaseClient } from ".";

export const getUsers = async () => {
  const { data } = handlePostgresResponse(
    await supabaseClient.from("users").select("*")
  );

  return data;
};
