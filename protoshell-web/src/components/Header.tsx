import classNames from "classnames/bind";
import { memo, useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import styles from "./Header.module.scss";
import { Avatar } from "./Avatar";
import { getUsers } from "@/supabase/users";

const cx = classNames.bind(styles);

// TODO: Change hardcoded username
export const Header = memo(() => {
  // TODO: This is just a demo for supabase
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsername(users[0].username);
    };

    void fetchUsers();
  }, []);

  return (
    <div className={cx("header-container")}>
      <Logo />
      <Avatar name={username} />
    </div>
  );
});
