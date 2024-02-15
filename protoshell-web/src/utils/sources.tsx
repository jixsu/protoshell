import { Source, SourceDBName, SourceType } from "@/schema";
// Ignore the ts error below, it is due to vite's client.d.ts shortcoming: https://github.com/vitejs/vite/issues/2269
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as AmazonLogo } from "@/assets/amazon.svg";

export const sources: Source[] = [
  {
    id: "1",
    dbName: "amazon_demo",
    name: "Amazon.com, Inc.",
    label: "Amazon",
    description:
      "Multinational technology company focused on e-commerce, cloud computing, online advertising, digital streaming and artificial intelligence",
    typeId: "2",
    logo: <AmazonLogo />,
  },
];

export const sourceTypes: SourceType[] = [
  {
    id: "1",
    name: "Social Media",
    label: "Social media platform",
  },
  {
    id: "2",
    name: "Online Store",
    label: "Online purchasing",
  },
  {
    id: "3",
    name: "Misc",
    label: "Miscellaneous",
  },
];

export const getSourceById = (id: string) => {
  return sources.find((s) => s.id === id);
};

export const getSourceTypeByTypeId = (id: string) => {
  return sourceTypes.find((st) => st.id === id);
};

export const getSourceIdByDBName = (dbName: SourceDBName) => {
  return sources.find((s) => s.dbName === dbName)?.id;
};

export const getSourceByDBName = (dbName: SourceDBName) => {
  return sources.find((s) => s.dbName === dbName);
};

export const SOURCE_COLUMN_BLACKLIST = ["ID", "updated_at", "created_at"];
