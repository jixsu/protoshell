import { memo } from "react";
import classNames from "classnames/bind";
import styles from "./Loading.module.scss";

const cx = classNames.bind(styles);

type LoadingProps = {
  /**
   * Color
   * @default primary
   * @options primary, light, dark
   */
  color?: string;

  /**
   * Size
   * @default md
   * @options sm, md
   */
  size?: string;
};

export const Loading = memo<LoadingProps>((props) => {
  const { color = "primary", size = "md" } = props;

  return (
    <div
      className={cx(
        "load",
        { [`size-${size}`]: size },
        { [`color-${color}`]: color }
      )}
    ></div>
  );
});
