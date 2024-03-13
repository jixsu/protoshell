import { IntegrateResponse, Source } from "@/schema";

export const integrateWithSource = async (
  source: Source,
  email: string,
  password: string
): Promise<undefined | IntegrateResponse> => {
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

  if (res.status >= 300) {
    return undefined;
  }

  const data = res.json() as Promise<IntegrateResponse>;

  return data;
};
