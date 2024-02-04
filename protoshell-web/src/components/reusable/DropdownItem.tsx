import { ReactNode, memo, useCallback, useMemo } from "react";
import classNames from "classnames/bind";
import styles from "./DropdownItem.module.scss";

const cx = classNames.bind(styles);

type DropdownItemProps = React.HTMLAttributes<HTMLButtonElement> & {
  item: ReactNode;

  /**
   * Align dropdown item
   * @default start
   * @options start, center, end
   */
  justify?: string;

  labelClassName?: string;

  onActivate: () => void;
};

export const DropdownItem = memo<DropdownItemProps>((props) => {
  const { item, justify = "left", labelClassName, onActivate } = props;

  const handleItemClick = useCallback(() => {
    onActivate();
  }, [onActivate]);

  const wrapItemInLabel = useMemo(() => {
    const itemType = typeof item;

    if (itemType === "string" || itemType === "number") {
      return true;
    }
    return false;
  }, [item]);

  console.log("itemType", wrapItemInLabel);

  return (
    <button
      className={cx("dropdown-item", { [`justify-${justify}`]: justify })}
      onClick={handleItemClick}
    >
      {wrapItemInLabel ? (
        <label className={cx("item-label", labelClassName)}>{item}</label>
      ) : (
        item
      )}
    </button>
  );
});
