import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Avatar.module.scss";
import { Dropdown } from "./Dropdown";
import { DropdownItem } from "./DropdownItem";
import { dispatch } from "@/store/store";
import { authSlice } from "@/store/slices/auth";

const cx = classNames.bind(styles);

type AvatarProps = {
  name: string;
  imgUrl?: string;
  clickable?: boolean;
};

export const Avatar = memo<AvatarProps>((props) => {
  const { name, imgUrl, clickable = false } = props;
  const [showAvatarDropdown, setShowAvatarDropdown] = useState(false);

  const initials = useMemo(() => {
    let initials = "";
    const nameArray = name.split(" ");
    for (const index of nameArray) {
      initials += index[0];
    }

    return initials;
  }, [name]);

  const handleAvatarClick = useCallback(() => {
    if (clickable) {
      setShowAvatarDropdown((showAvatarDropdown) => !showAvatarDropdown);
    }
  }, [clickable]);

  const handleSignOut = useCallback(() => {
    dispatch(authSlice.actions.setUser(undefined));
  }, []);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleOutsideClicks = useCallback(
    (e: MouseEvent) => {
      if (
        showAvatarDropdown &&
        dropdownRef.current &&
        e.target instanceof Node &&
        !dropdownRef.current.contains(e.target)
      ) {
        setShowAvatarDropdown(false);
      }
    },
    [showAvatarDropdown]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClicks);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClicks);
    };
  }, [handleOutsideClicks]);

  return (
    <>
      <div
        className={cx(
          "avatar-container",
          { button: clickable },
          { active: showAvatarDropdown }
        )}
        onClick={handleAvatarClick}
      >
        {!imgUrl && <label className={cx("avatar-name")}>{initials}</label>}
        {showAvatarDropdown && (
          <Dropdown
            ref={dropdownRef}
            className={cx("avatar-dropdown")}
            topPadding={50}
            align="right"
          >
            <DropdownItem item="Sign out" onActivate={handleSignOut} />
          </Dropdown>
        )}
      </div>
    </>
  );
});
