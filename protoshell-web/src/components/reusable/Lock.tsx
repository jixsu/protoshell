import { HTMLAttributes, memo, useCallback, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Lock.module.scss";
// Ignore the ts error below, it is due to vite's client.d.ts shortcoming: https://github.com/vitejs/vite/issues/2269
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as Locked } from "@/assets/locked.svg";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as Locking } from "@/assets/locking.svg";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as Unlocked } from "@/assets/unlocked.svg";
import { Popup } from "./Popup";

const cx = classNames.bind(styles);

export type LockProps = HTMLAttributes<HTMLDivElement> & {
  description?: string;
  label: string;
  value: boolean;
  onToggle: () => void;
  pending: boolean;
  popupTitle?: string;
  popupDescription?: string;
};

export const Lock = memo<LockProps>((props) => {
  const {
    className,
    description,
    label,
    onToggle,
    value,
    pending,
    popupTitle,
    popupDescription,
  } = props;

  const [showPopup, setShowPopup] = useState(false);

  const handleToggle = useCallback(() => {
    if (popupTitle && popupDescription) {
      setShowPopup(true);
    } else {
      onToggle();
    }
  }, [onToggle, popupDescription, popupTitle]);

  const handlePopupConfirm = useCallback(() => {
    onToggle();
    setShowPopup(false);
  }, [onToggle]);

  return (
    <div>
      {showPopup && (
        <Popup onExit={() => setShowPopup(false)}>
          <div className={cx("popup-text")}>
            <label className={cx("popup-title")}>{popupTitle}</label>
            <label className={cx("popup-description")}>
              {popupDescription}
            </label>
          </div>
          <div className={cx("popup-actions")}>
            <button onClick={() => setShowPopup(false)}>Cancel</button>
            <button onClick={handlePopupConfirm}>
              {!value ? "Unlock" : "Lock"}
            </button>
          </div>
        </Popup>
      )}
      <div className={cx("lock-container", className)}>
        <div className={cx("lhs")}>
          <label className={cx("label")}>{label}</label>
          {description && (
            <label className={cx("description")}>{description}</label>
          )}
        </div>
        <div className={cx("rhs")}>
          <button onClick={handleToggle} className={cx("toggle-button")}>
            {!value ? "On" : "Off"}
          </button>
          {pending ? (
            <Locking fill="var(--color-grey-0)" className={cx("lock-icon")} />
          ) : !value ? (
            <Locked fill="var(--color-primary-2)" className={cx("lock-icon")} />
          ) : (
            <Unlocked
              fill="var(--color-dark-6)"
              className={cx("lock-icon", "locked")}
            />
          )}
        </div>
      </div>
    </div>
  );
});
