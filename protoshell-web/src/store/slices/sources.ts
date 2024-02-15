import { SourceDBName } from "@/schema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SourceConfig = {
  name: SourceDBName;
  id: string;
  userId: string | number;
};

export type SourcesState = {
  userId: string | undefined;
  sourceConfigs: SourceConfig[] | undefined;
};

const initialState: SourcesState = {
  userId: undefined,
  sourceConfigs: undefined,
};

export const sourcesSlice = createSlice({
  name: "sources",
  initialState,
  reducers: {
    // This should only be used when getting sources from API call
    setSourceConfigs: (state, action: PayloadAction<SourceConfig[]>) => {
      state.sourceConfigs = action.payload;
    },
    addSourceConfig: (state, action: PayloadAction<SourceConfig>) => {
      const source = action.payload;
      const newSources = state.sourceConfigs ?? [];
      if (!newSources.includes(source)) {
        newSources.push(source);
      }
      state.sourceConfigs = newSources;
    },
    addSourceConfigs: (state, action: PayloadAction<SourceConfig[]>) => {
      const sources = action.payload;
      const newSources = state.sourceConfigs ?? [];
      for (const source of sources) {
        if (!newSources.includes(source)) {
          newSources.push(source);
        }
      }
      state.sourceConfigs = newSources;
    },
    removeSourceConfig: (state, action: PayloadAction<SourceConfig>) => {
      if (state.sourceConfigs) {
        state.sourceConfigs.filter((s) => s !== action.payload);
      }
    },
  },
});
