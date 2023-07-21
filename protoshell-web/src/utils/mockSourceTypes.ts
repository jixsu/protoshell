import { SourceType } from "@/schema";

export const mockSourceTypes: SourceType[] = [
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

export const getSourceTypeById = (id: string) => {
  return mockSourceTypes.find((st) => st.id === id);
};
