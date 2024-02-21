import { SourceDBName } from "@/schema";

export const postLockUpdateToCompany = async (
  sourceDBName: SourceDBName,
  locks: Object
) => {
  if (sourceDBName == "amazon_demo") {
    fetch("http://18.222.135.5/api/update-permissions/customers", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key' : 'qLNcGV0LekdvHbT2VaLQ6jHcAO561afnERP4xvOrIULRxlS4jwMVT7YFfGC7FCY7'

    },
    body: JSON.stringify({
      data: [locks]
    })
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
  }
};
