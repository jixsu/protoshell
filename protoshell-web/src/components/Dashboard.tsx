import { memo, useCallback, useEffect, useMemo } from "react";
import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";
import { useAppSelector } from "@/store/hooks";
import { getUserSourceConfigs } from "@/supabase/sources";
import { dispatch } from "@/store/store";
import { sourcesSlice } from "@/store/slices/sources";
import { useNavigate } from "react-router-dom";
import { CONTROL_CENTER_ROUTE } from "@/utils/routes";

const cx = classNames.bind(styles);

export const Dashboard = memo(() => {
  const user = useAppSelector((state) => state.auth.user);
  const sourceConfigs = useAppSelector((state) => state.sources.sourceConfigs);
  const navigate = useNavigate();

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
            active source
            {sourceConfigs?.length !== 1 && "s"}
          </label>
        </div>
        <button className={cx("sources-button")} onClick={handleSourcesClick}>
          <label className={cx("button-label")}>View Sources</label>
        </button>
      </div>
    </div>
  );
});
