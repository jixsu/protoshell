import { Source, SourceDBName, SourceType } from "@/schema";

export const sources: Source[] = [
  {
    id: "1",
    dbName: "amazon_demo",
    name: "Amazon.com, Inc.",
    label: "Amazon",
    description: "Some random description here",
    typeId: "2",
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
