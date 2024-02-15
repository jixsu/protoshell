import { SourceDBName } from "@/schema";
import { handlePostgresResponse, supabaseClient } from ".";

export const getLocks = async (
  sourceDBName: SourceDBName,
  userId: string | number
) => {
  const { data } = handlePostgresResponse(
    await supabaseClient.from(sourceDBName).select().eq("ID", userId)
  );

  console.log(data);

  if (data.length) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data[0];
  }

  return undefined;
};
