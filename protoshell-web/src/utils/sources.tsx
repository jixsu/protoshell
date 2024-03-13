import { Source, SourceDBName, SourceType } from "@/schema";
// Ignore the ts error below, it is due to vite's client.d.ts shortcoming: https://github.com/vitejs/vite/issues/2269
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ProtoShopLogo from "@/assets/protoshop.png";

export const sources: Source[] = [
  {
    id: "1",
    dbName: "protoshop",
    name: "ProtoShop, Inc.",
    label: "ProtoShop Demo",
    description:
      "Multinational technology company focused on e-commerce, cloud computing, online advertising, digital streaming and artificial intelligence",
    typeId: "2",
    logo: ProtoShopLogo,
    lockInfo: {
      NAME: "ProtoShop collects your name for a variety of purposes, including user identification, personalization, and analytics.",
      AGE: "ProtoShop collects your age for the purposes of user identification, analytics, and to ensure the safety of its users",
      SALARY:
        "Salary is collected in order to tailor user experiences and gain valuable insights through analytics.",
      ADDRESS:
        "Address tracking is required for ProtoShop to ship and deliver user orders. ProtoShop also uses addresses for analytics and product suggestions.",
      DEFAULT: "",
    },
    lockConfirms: {
      DEFAULT:
        "Are you sure? By blocking this data, some ProtoShop services may no longer be optimized for your user experience, and some services may become unavailable.",
    },
    integrationEndpoint: "https://shop.protoshell.ca/api/cross-auth",
    permissionsEndpoint: "https://protoshell.ca/api/get-permissions",
  },
  {
    id: "2",
    dbName: "protoshop_clickstream",
    name: "ProtoShop, Inc.",
    label: "ProtoShop",
    description:
      "Multinational technology company focused on e-commerce, cloud computing, online advertising, digital streaming and artificial intelligence",
    typeId: "2",
    logo: ProtoShopLogo,
    lockInfo: {
      target:
        "ProtoShop collects target data for analytics purposes, which is used to create a better experience for users.",
      click_page:
        "ProtoShop collects your click data for analytics purposes, which is used to create a better experience for users.",
      ip: "IP is collected in order to tailor user experiences and gain valuable insights through analytics.",
      loc: "Location is used for ProtoShop to tailor user experiences and gain valuable insights through analytics.",
      geoloc:
        "Geolocation is used for ProtoShop to tailor user experiences and gain valuable insights through analytics.",
      device:
        "Device data is collected for ProtoShop to better understand which devices users prefer, and helps us better optimize user experiences on that device.",
      DEFAULT: "",
    },
    lockConfirms: {
      DEFAULT:
        "Are you sure? By blocking this data, some ProtoShop services may no longer be optimized for your user experience, and some services may become unavailable.",
    },
    integrationEndpoint: "https://shop.protoshell.ca/api/cross-auth",
    permissionsEndpoint: "https://protoshell.ca/api/get-permissions",
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
