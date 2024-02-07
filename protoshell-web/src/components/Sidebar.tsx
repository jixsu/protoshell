import { memo } from "react";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { CONTROL_CENTER_ROUTE, DASHBOARD_ROUTE } from "@/utils/routes";

const cx = classNames.bind(styles);

export const Sidebar = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname);
  console.log(location.pathname == "/");

  return (
    <div className={cx("sidebar-container")}>
      <button
        className={cx("sidebar-item", {
          active: location.pathname == DASHBOARD_ROUTE,
        })}
        onClick={() => navigate(DASHBOARD_ROUTE)}
      >
        Dashboard
      </button>
      <button
        className={cx("sidebar-item", {
          active: matchPath({path: `/${CONTROL_CENTER_ROUTE}`, end: false}, location.pathname)
        })}
        onClick={() => navigate(`${CONTROL_CENTER_ROUTE}`)}
      >
        Control Center
      </button>
    </div>
  );
});
