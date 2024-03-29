import { memo } from "react";
// Ignore the ts error below, it is due to vite's client.d.ts shortcoming: https://github.com/vitejs/vite/issues/2269
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import TurtleLogo from "@/assets/turtle.png";
import classNames from "classnames/bind";
import styles from "./Logo.module.scss";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "@/utils/routes";

const cx = classNames.bind(styles);

type LogoProps = {
  /**
   * Size
   * @default md
   * @options xs, sm, md, lg
   */
  size?: string;
};

export const Logo = memo<LogoProps>((props) => {
  const { size = "md" } = props;
  const navigate = useNavigate();

  const onLogoClick = () => {
    navigate(HOME_ROUTE);
  };

  return (
    <div className={cx("logo-container")} onClick={onLogoClick}>
      <img src={TurtleLogo} className={cx({ [`size-${size}`]: size })}/>
      <div className={cx("logo-text", { [`text-size-${size}`]: size })}>
        <label>Proto</label>
        <label className={cx("primary")}>Shell</label>
      </div>
    </div>
  );
});
