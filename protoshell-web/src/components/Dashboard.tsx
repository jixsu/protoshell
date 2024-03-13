import { memo, useCallback, useEffect, useMemo, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";
import { useAppSelector } from "@/store/hooks";
import { getUserSourceConfigs } from "@/supabase/sources";
import { dispatch } from "@/store/store";
import { sourcesSlice } from "@/store/slices/sources";
import { useNavigate } from "react-router-dom";
import { CONTROL_CENTER_ROUTE } from "@/utils/routes";
import { AddSource } from "./reusable/AddSource";

const cx = classNames.bind(styles);

export const Dashboard = memo(() => {
  const user = useAppSelector((state) => state.auth.user);
  const sourceConfigs = useAppSelector((state) => state.sources.sourceConfigs);
  const navigate = useNavigate();

  const [showAddSource, setShowAddSource] = useState(false);

  useEffect(() => {
    void (async () => {
      if (sourceConfigs === undefined && user && user.id) {
        const sourceConfigs = await getUserSourceConfigs(user.id);
        dispatch(sourcesSlice.actions.setSourceConfigs(sourceConfigs));
      }
    })();
  }, [sourceConfigs, user]);

  const timeOfDay = useMemo(() => {
    const now = new Date();
    const hours = now.getHours();
    if (hours > 18) {
      return "Evening";
    } else if (hours > 12) {
      return "Afternoon";
    } else {
      return "Morning";
    }
  }, []);

  const handleSourcesClick = useCallback(() => {
    navigate(`${CONTROL_CENTER_ROUTE}`);
  }, [navigate]);

  return (
    <div className={cx("dashboard-container")}>
      <label className={cx("dashboard-label")}>Dashboard</label>
      <label className={cx("greeting-label")}>
        Good {timeOfDay}, {user?.first_name}
      </label>
      <div className={cx("content")}>
        <div>
          <label className={cx("label")}>You currently have </label>
          <label className={cx("label", "primary")}>
            {sourceConfigs?.length ? sourceConfigs.length : "no"}
          </label>
          <label className={cx("label")}>
            {" "}
            active source collecting data on your information.
            {sourceConfigs?.length !== 1 && sourceConfigs?.length !== 0 && "s"}
          </label>
        </div>
        <div>
          <button className={cx("sources-button")} onClick={handleSourcesClick}>
            <label className={cx("button-label")}>View Sources</label>
          </button>
          <label className={cx("label", "or-padding")}>or</label>
          <button
            className={cx("sources-button")}
            onClick={() => setShowAddSource(true)}
          >
            <label className={cx("button-label")}>Add Source</label>
          </button>
          {showAddSource && (
            <AddSource onClose={() => setShowAddSource(false)} />
          )}
        </div>
      </div>
    </div>
  );
});
