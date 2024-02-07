import { handlePostgresResponse, supabaseClient } from ".";
import { useAppSelector } from "@/store/hooks";

export const getAccountsFromUser = async () => {
  //unused rn, no idea if we even need this function/table, but probably useful to display all companies a user is registered with 
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return;
  }

  const { data } = handlePostgresResponse(
    await supabaseClient.from("accounts").select("*, users!inner (id, username)").eq("users.username", user.username)
  );

  return data;
};

