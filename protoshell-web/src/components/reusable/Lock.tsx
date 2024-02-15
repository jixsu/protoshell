import { HTMLAttributes, memo, useCallback } from "react";
import classNames from "classnames/bind";
import styles from "./Lock.module.scss";

const cx = classNames.bind(styles);

export type LockProps = HTMLAttributes<HTMLDivElement> & {
  description?: string;
  label: string;
  value: boolean;
  onToggle: () => void;
};

export const Lock = memo<LockProps>((props) => {
  const { className, description, label, onToggle, value } = props;

  const handleToggle = useCallback(() => {
    onToggle();
  }, [onToggle]);

  return (
    <div className={cx("lock-container", className)}>
      <div className={cx("lhs")}>
        <label className={cx("label")}>{label}</label>
        {description && (
          <label className={cx("description")}>{description}</label>
        )}
      </div>
      <div className={cx("rhs")}>
        <button onClick={handleToggle} className={cx("toggle-button")}>
          {value ? "On" : "Off"}
        </button>
      </div>
    </div>
  );
});
