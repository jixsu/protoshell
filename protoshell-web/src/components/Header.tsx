import classNames from "classnames/bind";
import { memo } from "react";
import { Logo } from "@/components/Logo";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

export const Header = memo(() => {
  return (
    <div className={cx("header-container")}>
      <Logo />
    </div>
  );
});
