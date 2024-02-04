import { memo, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { Logo } from "@/components/reusable/Logo";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE, SIGNUP_ROUTE } from "@/utils/routes";
import { login } from "@/supabase/auth";
import { Loading } from "../reusable/Loading";
import { dispatch } from "@/store/store";
import { authSlice } from "@/store/slices/auth";

const cx = classNames.bind(styles);

export const Login = memo(() => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const navigateToSignup = () => {
    navigate(`/${SIGNUP_ROUTE}`);
  };

  const onLogin = () => {
    void (async () => {
      setLoading(true);
      const users = await login({ email, password });
      setLoading(false);

      if (users.length === 1) {
        const user = users[0];
        dispatch(authSlice.actions.setUser(user));
        navigate(HOME_ROUTE);
      } else {
        setLoginError(true);
      }
    })();
  };

  return (
    <div className={cx("login-view")}>
      <div className={cx("lhs")}>
        <Logo size="lg" />
      </div>
      <div className={cx("rhs")}>
        <div className={cx("form-container")}>
          <label className={cx("form-header")}>Login</label>
          {loginError && (
            <div className={cx("form-row")}>
              <div className={cx("login-error")}>
                <label className={cx("form-label")}>
                  The email or password was incorrect
                </label>
              </div>
            </div>
          )}
          <div className={cx("form-row")}>
            <div className={cx("form-entry")}>
              <label className={cx("form-label")}>Email</label>
              <input
                className={cx("form-input")}
                placeholder="Enter email..."
                type="email"
                value={email}
                onChange={onEmailChange}
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
                onChange={onPasswordChange}
              />
            </div>
          </div>
          <button className={cx("form-button")} onClick={onLogin}>
            {loading ? <Loading color="light" /> : <label>Login</label>}
          </button>
          <label
            className={cx("form-label", "link")}
            onClick={navigateToSignup}
          >
            Click here to sign up!
          </label>
        </div>
      </div>
    </div>
  );
});
