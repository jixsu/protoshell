import { SourceDBName } from "@/schema";
import { handlePostgresResponse, supabaseClient } from ".";
import { getSourceIdByDBName } from "@/utils/sources";

export const getUserActiveSourceIds = async (userId: string) => {
  console.log("Getting sources from DB for userid: ", userId);
  const { data } = handlePostgresResponse(
    await supabaseClient.from("sources").select().eq("user_id", userId)
  );

  console.log(data);
  const userSources = data[0];

  const keyValPairs = Object.entries(userSources);

  const activeSourceIds: string[] = [];

  for (const pair of keyValPairs) {
    const key = pair[0];
    const value = pair[1];
    if (value === true) {
      const sourceId = getSourceIdByDBName(key as SourceDBName);
      if (sourceId) {
        activeSourceIds.push(sourceId);
      }
    }
  }

  return activeSourceIds;
};
