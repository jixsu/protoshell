import { handlePostgresResponse, supabaseClient } from ".";
import { getSourceIdByDBName } from "@/utils/sources";
import { SourceConfig } from "@/store/slices/sources";
import { Source } from "@/schema";

export const getUserSourceConfigs = async (userId: string) => {
  const { data } = handlePostgresResponse(
    await supabaseClient.from("sources").select().eq("user_id", userId)
  );

  if (!data.length) {
    return [];
  }

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

  console.log("yep");
  return sourceConfigs;
};

export const linkUserWithSource = async (
  userId: string,
  source: Source,
  sourceId: number
) => {
  const sourceColName = source.dbName;
  const sourceColId = `${source.dbName}_id`;

  console.log(userId, source, sourceId);

  const { data } = handlePostgresResponse(
    await supabaseClient
      .from("sources")
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .upsert(
        { user_id: userId, [sourceColName]: true, [sourceColId]: sourceId },
        { onConflict: "user_id" }
      )
      .select()
  );

  const updatedSource = data[0];

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return updatedSource;
};
