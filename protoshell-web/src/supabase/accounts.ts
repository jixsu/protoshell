import { SourceDBName } from "@/schema";

export const postLockUpdateToCompany = async (
  sourceDBName: SourceDBName,
  locks: object
) => {
  try {
    if (sourceDBName == "amazon_demo") {
      const response = await fetch(
        "http://18.222.135.5/api/update-permissions/customers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "qLNcGV0LekdvHbT2VaLQ6jHcAO561afnERP4xvOrIULRxlS4jwMVT7YFfGC7FCY7",
          },
          body: JSON.stringify({
            data: [locks],
          }),
        }
      );
      console.log(response);

      if (response.status === 200) {
        return 1;
      }
      return 0;
    }
  } catch (error) {
    console.log(error);
    return 0;
  }
};
