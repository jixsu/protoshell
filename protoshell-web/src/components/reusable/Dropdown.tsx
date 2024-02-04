import { ReactNode, forwardRef, memo, useMemo } from "react";
import classNames from "classnames/bind";
import styles from "./Dropdown.module.scss";

const cx = classNames.bind(styles);

type DropdownProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Aligns dropdown relative to parent container
   * @default center
   * @options left, center, right
   */
  align?: string;

  children?: ReactNode;

  /**
   * If set, dropdown will be absolute positioned. This determines how far below the parent div the dropdown sits (in px)
   * @default undefined
   */
  topPadding?: number;
};

export const Dropdown = memo(
  forwardRef<HTMLDivElement, DropdownProps>((props, ref) => {
    const {
      align = "center",
      className,
      topPadding = undefined,
      children,
    } = props;

    const style = useMemo(
      () => ({
        top: topPadding ? `${topPadding}px` : undefined,
      }),
      [topPadding]
    );

    return (
      <div
        ref={ref}
        style={style}
        className={cx(
          "dropdown-container",
          className,
          { [`align-${align}`]: align },
          { absolute: top !== undefined }
        )}
      >
        {children}
      </div>
    );
  })
);
