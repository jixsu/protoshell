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
    lockInfo: {
      NAME: "Amazon collects your name for a variety of purposes, including user identification, personalization, and analytics.",
      AGE: "Amazon collects your age for the purposes of user identification, analytics, and to ensure the safety of its users",
      SALARY:
        "Salary is collected in order to tailor user experiences and gain valuable insights through analytics.",
      ADDRESS:
        "Address tracking is required for Amazon to ship and deliver user orders. Amazon also uses addresses for analytics and product suggestions.",
      DEFAULT: "",
    },
    lockConfirms: {
      DEFAULT:
        "Are you sure? By blocking this data, some Amazon services may no longer be optimized for your user experience, and some services may become unavailable.",
    },
    integrationEndpoint: "https://protoshell.ca:81/cross-auth",
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

export const SOURCE_COLUMN_BLACKLIST = ["id", "updated_at", "created_at"];
