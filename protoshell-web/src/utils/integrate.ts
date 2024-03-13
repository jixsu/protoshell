import { Source } from "@/schema";

export const integrateWithSource = async (
  source: Source,
  email: string,
  password: string
) => {
  console.log(source.integrationEndpoint);
  const res = await fetch(source.integrationEndpoint, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  console.log(res);

  // TODO: return proper response

  return false;
};
