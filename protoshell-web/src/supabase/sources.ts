import { handlePostgresResponse, supabaseClient } from ".";
import { getSourceIdByDBName } from "@/utils/sources";
import { SourceConfig } from "@/store/slices/sources";

export const getUserSourceConfigs = async (userId: string) => {
  const { data } = handlePostgresResponse(
    await supabaseClient.from("sources").select().eq("user_id", userId)
  );

  const userSources = data[0];

  const sourceConfigs: SourceConfig[] = [];

  if (userSources.amazon_demo) {
    const sourceId = getSourceIdByDBName("amazon_demo");
    if (sourceId) {
      sourceConfigs.push({
        name: "amazon_demo",
        id: sourceId,
        userId: userSources.amazon_demo_id,
      });
    }
  }

  return sourceConfigs;
};
