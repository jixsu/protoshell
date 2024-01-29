import { handlePostgresResponse, supabaseClient } from ".";

export type SignupRequestSchema = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
};

export type LoginRequestSchema = {
  email: string;
  password: string;
};

type UserDBSchema = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  username: string;
  created_at: string;
};

export const login = async (req: LoginRequestSchema) => {
  try {
    const { data } = handlePostgresResponse(
      await supabaseClient
        .from("users")
        .select("*")
        .eq("email", req.email)
        .eq("password", req.password)
    );

    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const signup = async (req: SignupRequestSchema) => {
  const date = new Date();

  const formattedReq: UserDBSchema = {
    first_name: req.firstName,
    last_name: req.lastName,
    username: req.username,
    email: req.email,
    password: req.password,
    created_at: date.toISOString(),
  };

  try {
    const { data } = handlePostgresResponse(
      await supabaseClient.from("users").insert([formattedReq]).select()
    );
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
