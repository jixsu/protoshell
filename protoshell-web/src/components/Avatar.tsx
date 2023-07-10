import { memo, useMemo } from "react";
import classNames from "classnames/bind";
import styles from "./Avatar.module.scss";

const cx = classNames.bind(styles);

type AvatarProps = {
  name: string;
  imgUrl?: string;
};

export const Avatar = memo<AvatarProps>((props) => {
  const { name, imgUrl } = props;

  const initials = useMemo(() => {
    let initials = "";
    const nameArray = name.split(" ");
    for (const index of nameArray) {
      initials += index[0];
    }

    return initials;
  }, [name]);

  return (
    <div className={cx("avatar-container")}>
      {!imgUrl && <label className={cx("avatar-name")}>{initials}</label>}
    </div>
  );
});
