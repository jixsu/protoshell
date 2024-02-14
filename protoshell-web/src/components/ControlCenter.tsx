import { memo, useCallback, useEffect, useMemo, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ControlCenter.module.scss";
import { Source } from "@/schema";
import { sources, sourceTypes } from "@/utils/sources";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { dispatch } from "@/store/store";
import { getUserActiveSourceIds } from "@/supabase/sources";
import { sourcesSlice } from "@/store/slices/sources";

const cx = classNames.bind(styles);

export const ControlCenter = memo(() => {
  // TODO: This should be taken from central state to persist filters
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);
  const sourceIds = useAppSelector((state) => state.sources.activeSourceIds);

  useEffect(() => {
    console.log(sourceIds);
    console.log(user);
    void (async () => {
      if (sourceIds === undefined && user && user.id) {
        const sourceIds = await getUserActiveSourceIds(user.id);
        dispatch(sourcesSlice.actions.setSourceIds(sourceIds));
      }
    })();
  }, [sourceIds, user]);

  const activeSources = useMemo(() => {
    sources.filter((s) => sourceIds?.includes(s.id));
    return sources;
  }, [sourceIds]);

  const handleFilterToggle = (id: string) => {
    activeFilters.includes(id)
      ? setActiveFilters((activeFilters) => [
          ...activeFilters.filter((f) => f !== id),
        ])
      : setActiveFilters((activeFilters) => [...activeFilters, id]);
  };

  const filteredSources = useMemo(() => {
    // if no filters selected, show all
    if (activeFilters.length === 0 || !activeSources) {
      return activeSources;
    }

    let filteredSources: Source[] = [];

    for (const filter of activeFilters) {
      filteredSources = filteredSources.concat(
        activeSources.filter((s) => s.typeId === filter)
      );
    }

    return filteredSources;
  }, [activeFilters, activeSources]);

  const formatSourcesFoundLabel = useMemo(() => {
    return filteredSources.length === 1
      ? `${filteredSources.length} source found`
      : `${filteredSources.length} sources found`;
  }, [filteredSources]);

  const handleCountainerClick = useCallback(() => {
    console.log("click");
    navigate("demo");
  }, []);

  return (
    <div className={cx("control-center-container")}>
      <label className={cx("sources-label")}>Sources</label>
      {/* TODO: Could add some adjustment for how each source is displayed, i.e. size or list like in file explorer */}
      <div className={cx("filter-bar-container")}>
        {sourceTypes.map((sourceType) => (
          <button
            className={cx("filter-button", {
              active: activeFilters.includes(sourceType.id),
            })}
            onClick={() => handleFilterToggle(sourceType.id)}
          >
            <label className={cx("filter-button-label")}>
              {sourceType.label}
            </label>
          </button>
        ))}
      </div>
      <label className={cx("sources-found-label")}>
        {formatSourcesFoundLabel}
      </label>
      {sourceTypes.map((sourceType) => {
        const sourcesByType = filteredSources.filter(
          (s) => s.typeId === sourceType.id
        );

        // only show headers if they have > 0 sources (including filters)
        return sourcesByType.length > 0 ? (
          <div className={cx("type-container")}>
            <label className={cx("source-type-header")}>
              {sourceType.label}
            </label>
            <div className={cx("sources-grid")}>
              {sourcesByType.map((s) => (
                <div
                  className={cx("source-container")}
                  onClick={handleCountainerClick}
                >
                  <label>{s.label}</label>
                  <label>{sourceType.label}</label>
                  {/* TODO: Complete the source container */}
                </div>
              ))}
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
});
