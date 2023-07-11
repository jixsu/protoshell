import { memo } from "react";
import { Header } from "@/components/Header";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

const cx = classNames.bind(styles);

export const Home = memo(() => {
  return (
    <div className={cx("home")}>
      <Header />
      <div className={cx("content")}>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
});
