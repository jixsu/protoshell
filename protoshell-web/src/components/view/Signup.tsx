import { memo, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Signup.module.scss";
import { Logo } from "@/components/Logo";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE } from "@/utils/routes";
import { signup } from "@/supabase/auth";
import { Loading } from "@/components/Loading";

const cx = classNames.bind(styles);

export const Signup = memo(() => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [signupError, setSignupError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigateToLogin = () => {
    navigate(`/${LOGIN_ROUTE}`);
  };

  const onSignup = async () => {
    setLoading(true);
    const users = await signup({
      firstName,
      lastName,
      username,
      email,
      password,
    });
    setLoading(false);

    if (users.length === 1) {
      navigate(HOME_ROUTE);
    } else {
      setSignupError(true);
    }
  };

  return (
    <div className={cx("signup-view")}>
      <div className={cx("lhs")}>
        <Logo size="lg" />
      </div>
      <div className={cx("rhs")}>
        <div className={cx("form-container")}>
          <label className={cx("form-header")}>Sign up</label>
          {signupError && (
            <div className={cx("form-row")}>
              <div className={cx("signup-error")}>
                <label className={cx("form-label")}>
                  The email provided was already taken!
                </label>
              </div>
            </div>
          )}
          <div className={cx("form-row")}>
            <div className={cx("form-entry")}>
              <label className={cx("form-label")}>First name</label>
              <input
                className={cx("form-input")}
                placeholder="Enter first name..."
                type="text"
                value={firstName}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setFirstName(e.currentTarget.value)
                }
              />
            </div>
            <div className={cx("form-entry")}>
              <label className={cx("form-label")}>Last name</label>
              <input
                className={cx("form-input")}
                placeholder="Enter last name..."
                type="text"
                value={lastName}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setLastName(e.currentTarget.value)
                }
              />
            </div>
          </div>
          <div className={cx("form-row")}>
            <div className={cx("form-entry")}>
              <label className={cx("form-label")}>Username</label>
              <input
                className={cx("form-input")}
                placeholder="Enter username..."
                type="text"
                value={username}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setUsername(e.currentTarget.value)
                }
              />
            </div>
          </div>
          <div className={cx("form-row")}>
            <div className={cx("form-entry")}>
              <label className={cx("form-label")}>Email</label>
              <input
                className={cx("form-input")}
                placeholder="Enter email..."
                type="email"
                value={email}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setEmail(e.currentTarget.value)
                }
              />
            </div>
          </div>
          <div className={cx("form-row")}>
            <div className={cx("form-entry")}>
              <label className={cx("form-label")}>Password</label>
              <input
                className={cx("form-input")}
                placeholder="Enter password..."
                type="password"
                value={password}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setPassword(e.currentTarget.value)
                }
              />
            </div>
          </div>
          <button className={cx("form-button")} onClick={onSignup}>
            {loading ? <Loading color="light" /> : <label>Sign up</label>}
          </button>
          <label className={cx("form-label", "link")} onClick={navigateToLogin}>
            Already have an account? Login
          </label>
        </div>
      </div>
    </div>
  );
});
