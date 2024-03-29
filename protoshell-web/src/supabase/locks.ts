import { SourceDBName } from "@/schema";
import { handlePostgresResponse, supabaseClient } from ".";

export const getLocks = async (
  sourceDBName: SourceDBName,
  userId: string | number
) => {
  const { data } = handlePostgresResponse(
    await supabaseClient.from(sourceDBName).select().eq("id", userId)
  );

  if (data.length) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data[0];
  }

  return undefined;
};

export const setLock = async (
  sourceDBName: SourceDBName,
  userId: string | number,
  colName: string,
  newValue: number
) => {
  const { data } = handlePostgresResponse(
    await supabaseClient
      .from(sourceDBName)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .update({ [colName]: newValue })
      .eq("id", userId)
      .select()
  );

  if (data.length) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data[0];
  }

  return undefined;
};

export const upsertLocks = async (
  sourceDBName: SourceDBName,
  locks: object
) => {
  const { data } = handlePostgresResponse(
    await supabaseClient
      .from(sourceDBName)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .upsert(locks, { onConflict: "id" })
      .select()
  );

  if (data.length) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data[0];
  }

  return undefined;
};
