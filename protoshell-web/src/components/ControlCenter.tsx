import { memo, useMemo, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ControlCenter.module.scss";
import { mockSourceTypes } from "@/utils/mockSourceTypes";
import { mockSources } from "@/utils/mockSources";
import { Source } from "@/schema";
import { getPlatformById } from "@/utils/mockPlatforms";

const cx = classNames.bind(styles);

export const ControlCenter = memo(() => {
  // TODO: This should ideally be taken from central state to persist filters
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const sourceTypes = mockSourceTypes;
  const sources = mockSources;

  const handleFilterToggle = (id: string) => {
    activeFilters.includes(id)
      ? setActiveFilters((activeFilters) => [
          ...activeFilters.filter((f) => f !== id),
        ])
      : setActiveFilters((activeFilters) => [...activeFilters, id]);
  };

  const filteredSources = useMemo(() => {
    // if no filters selected, show all
    if (activeFilters.length === 0) {
      return sources;
    }

    let filteredSources: Source[] = [];

    for (const filter of activeFilters) {
      filteredSources = filteredSources.concat(
        sources.filter((s) => s.typeId === filter)
      );
    }

    return filteredSources;
  }, [sources, activeFilters]);

  const formatSourcesFoundLabel = useMemo(() => {
    return filteredSources.length === 1
      ? `${filteredSources.length} source found`
      : `${filteredSources.length} sources found`;
  }, [filteredSources]);

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
      {mockSourceTypes.map((sourceType) => {
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
              {sourcesByType.map((s) => {
                const platform = getPlatformById(s.platformId);
                return platform ? (
                  <div className={cx("source-container")}>
                    <label>{platform.label}</label>
                    <label>{sourceType.label}</label>
                    {/* TODO: Complete the source container */}
                  </div>
                ) : null;
              })}
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
});
