import { IntegrateResponse, Source, SourceLockResponse } from "@/schema";

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

export const getSourceLocks = async (source: Source, id: number) => {
  if (source.dbName === "protoshop_clickstream") {
    const url = source.permissionsEndpoint + "/clickstream/" + id.toString();
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-api-key":
          "qLNcGV0LekdvHbT2VaLQ6jHcAO561afnERP4xvOrIULRxlS4jwMVT7YFfGC7FCY7",
      },
    });

    if (res.status >= 300) {
      return undefined;
    }

    const data = res.json() as Promise<SourceLockResponse>;

    return data;
  }
};
