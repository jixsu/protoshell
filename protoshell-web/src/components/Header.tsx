import classNames from "classnames/bind";
import { memo } from "react";
import { Logo } from "@/components/reusable/Logo";
import styles from "./Header.module.scss";
import { Avatar } from "./reusable/Avatar";
import { useAppSelector } from "@/store/hooks";

const cx = classNames.bind(styles);

export const Header = memo(() => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return;
  }

  return (
    <div className={cx("header-container")}>
      <Logo />
      <Avatar name={user.username} clickable />
    </div>
  );
});
