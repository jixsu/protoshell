import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SourcesState = {
  userId: string | undefined;
  activeSourceIds: string[] | undefined;
};

const initialState: SourcesState = {
  userId: undefined,
  activeSourceIds: undefined,
};

export const sourcesSlice = createSlice({
  name: "sources",
  initialState,
  reducers: {
    // This should only be used when getting sources from API call
    setSourceIds: (state, action: PayloadAction<string[]>) => {
      state.activeSourceIds = action.payload;
    },
    addSourceId: (state, action: PayloadAction<string>) => {
      const sourceId = action.payload;
      const newSourceIds = state.activeSourceIds ?? [];
      if (!newSourceIds.includes(sourceId)) {
        newSourceIds.push(sourceId);
      }
      state.activeSourceIds = newSourceIds;
    },
    addSources: (state, action: PayloadAction<string[]>) => {
      const sourceIds = action.payload;
      const newSourceIds = state.activeSourceIds ?? [];
      for (const sourceId of sourceIds) {
        if (!newSourceIds.includes(sourceId)) {
          newSourceIds.push(sourceId);
        }
      }
      state.activeSourceIds = newSourceIds;
    },
    removeSource: (state, action: PayloadAction<string>) => {
      if (state.activeSourceIds) {
        state.activeSourceIds.filter((s) => s !== action.payload);
      }
    },
  },
});
