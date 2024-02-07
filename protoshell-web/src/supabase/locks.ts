import { handlePostgresResponse, supabaseClient } from ".";

export const getLocks = async (company: String, username: String) => {

  const {data: user} = handlePostgresResponse(
    await supabaseClient.from("users").select("id").eq("username", username)
  )

  const userId = user[0].id;
  console.log(userId);

  const { data } = handlePostgresResponse(
    await supabaseClient.from(company.toString()).select("*")
  );

  console.log(data);

  return data;
};

