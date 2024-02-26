import { memo } from "react";
import classNames from "classnames/bind";
import styles from "./Popup.module.scss";

const cx = classNames.bind(styles);

type PopupProps = React.HTMLAttributes<HTMLDivElement> & {
  onExit: () => void;
};

export const Popup = memo<PopupProps>((props) => {
  const { children, onExit } = props;

  return (
    <>
      <div className={cx("popup-background")} onClick={onExit}></div>
      <div className={cx("popup-container")}>{children}</div>;
    </>
  );
});
