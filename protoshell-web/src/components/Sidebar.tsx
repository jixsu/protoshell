import { memo } from "react";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { CONTROL_CENTER_ROUTE, DASHBOARD_ROUTE } from "@/utils/routes";

const cx = classNames.bind(styles);

export const Sidebar = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (route: string) => {
    navigate(route);
  };

  console.log(location.pathname);
  console.log(location.pathname == "/");

  return (
    <div className={cx("sidebar-container")}>
      <button
        className={cx("sidebar-item", {
          active: location.pathname == DASHBOARD_ROUTE,
        })}
        onClick={() => navigateTo(DASHBOARD_ROUTE)}
      >
        Dashboard
      </button>
      <button
        className={cx("sidebar-item", {
          active: location.pathname == `/${CONTROL_CENTER_ROUTE}`,
        })}
        onClick={() => navigateTo(CONTROL_CENTER_ROUTE)}
      >
        Control Center
      </button>
    </div>
  );
});
