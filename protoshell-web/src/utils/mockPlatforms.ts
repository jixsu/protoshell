import { Platform } from "@/schema";

export const mockPlatforms: Platform[] = [
  {
    id: "1",
    name: "Instagram LLC.",
    label: "Instagram",
    description: "Some random description here",
  },
  {
    id: "2",
    name: "Facebook LLC.",
    label: "Facebook",
    description: "Some random description here",
  },
  {
    id: "3",
    name: "Amazon.com, Inc.",
    label: "Facebook",
    description: "Some random description here",
  },
];

export const getPlatformById = (id: string) => {
  return mockPlatforms.find((p) => p.id === id);
};
