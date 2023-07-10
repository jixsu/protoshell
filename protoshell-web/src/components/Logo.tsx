import { memo } from "react";
// Ignore the ts error below, it is due to vite's client.d.ts shortcoming: https://github.com/vitejs/vite/issues/2269
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as ProtoShellLogo } from "@/assets/protoshell.svg";
import classNames from "classnames/bind";
import styles from "./Logo.module.scss";

const cx = classNames.bind(styles);

type LogoProps = {
  /**
   * Size
   * @default md
   */
  size?: string;
};

export const Logo = memo<LogoProps>((props) => {
  const { size = "md" } = props;

  return (
    <div className={cx("logo-container")}>
      <ProtoShellLogo className={cx({ [`size-${size}`]: size })} />
      <div className={cx("logo-text")}>
        <label>Proto</label>
        <label>Shell</label>
      </div>
    </div>
  );
});
