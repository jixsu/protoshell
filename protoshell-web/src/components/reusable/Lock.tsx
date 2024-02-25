import { HTMLAttributes, memo, useCallback } from "react";
import classNames from "classnames/bind";
import styles from "./Lock.module.scss";
import { ReactComponent as Locked } from "@/assets/locked.svg";
import { ReactComponent as Locking } from "@/assets/locking.svg";
import { ReactComponent as Unlocked } from "@/assets/unlocked.svg";

const cx = classNames.bind(styles);

export type LockProps = HTMLAttributes<HTMLDivElement> & {
  description?: string;
  label: string;
  value: boolean;
  onToggle: () => void;
  pending: boolean;
};

export const Lock = memo<LockProps>((props) => {
  const { className, description, label, onToggle, value, pending } = props;

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
        {pending ? (
          <Locking fill="var(--color-grey-0)" className={cx("lock-icon")}/>
        ) : 
          value ? (
            <Locked fill="var(--color-primary-2)" className={cx("lock-icon")}/>
          ) : (
            <Unlocked fill="var(--color-dark-6)" className={cx("lock-icon", "locked")}/>
          )
        }
      </div>
    </div>
  );
});
