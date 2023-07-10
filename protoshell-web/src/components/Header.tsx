import classNames from "classnames/bind";
import { memo } from "react";
import { Logo } from "@/components/Logo";
import styles from "./Header.module.scss";
import { Avatar } from "./Avatar";

const cx = classNames.bind(styles);

// TODO: Change hardcoded username
export const Header = memo(() => {
  return (
    <div className={cx("header-container")}>
      <Logo />
      <Avatar name="Jackson Xiao" />
    </div>
  );
});
