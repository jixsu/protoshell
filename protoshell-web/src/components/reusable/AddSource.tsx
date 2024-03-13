import { memo, useCallback, useMemo, useState } from "react";
import { Popup } from "./Popup";
import { getSourceTypeByTypeId, sources } from "@/utils/sources";
import { useAppSelector } from "@/store/hooks";
import classNames from "classnames/bind";
import styles from "./AddSource.module.scss";
import { Source } from "@/schema";
import { getSourceLocks, integrateWithSource } from "@/utils/integrate";
import { Loading } from "./Loading";
import { getUserSourceConfigs, linkUserWithSource } from "@/supabase/sources";
import { useNavigate } from "react-router-dom";
import { CONTROL_CENTER_ROUTE } from "@/utils/routes";
import { dispatch } from "@/store/store";
import { sourcesSlice } from "@/store/slices/sources";

const cx = classNames.bind(styles);

type FlowState = "SELECT" | "AUTH" | "SUCCESS";

type AddSourceProps = {
  onClose: () => void;
};

export const AddSource = memo<AddSourceProps>((props) => {
  const { onClose } = props;

  const [flowState, setFlowState] = useState<FlowState>("SELECT");
  const [noIntegratedSourcesRemain, setNoIntegratedSourcesRemain] =
    useState(true);
  const [selectedSource, setSelectedSource] = useState<Source | undefined>(
    undefined
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [integrateError, setIntegrateError] = useState(false);
  const [loading, setLoading] = useState(false);
  const sourceConfigs = useAppSelector((state) => state.sources.sourceConfigs);
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const sourcesModified = useMemo(() => {
    if (!sourceConfigs) {
      return [];
    }

    return sources.map((s) => {
      if (sourceConfigs.find((sc) => sc.id === s.id)) {
        return {
          ...s,
          integrated: true,
        };
      } else {
        setNoIntegratedSourcesRemain(false);
        return {
          ...s,
          integrated: false,
        };
      }
    });
  }, [sourceConfigs]);

  const onExitPopup = useCallback(() => {
    onClose();
  }, [onClose]);

  const onEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const integrate = useCallback(async () => {
    if (!selectedSource || !user) {
      return;
    }
    setLoading(true);

    const integrateRes = await integrateWithSource(
      selectedSource,
      email,
      password
    );

    if (!integrateRes) {
      setIntegrateError(true);
      setLoading(false);
      return;
    }

    const sourceId = integrateRes.uid;
    const linkRes = await linkUserWithSource(user.id, selectedSource, sourceId);

    if (!linkRes) {
      setIntegrateError(true);
      setLoading(false);
      return;
    }

    const locksRes = await getSourceLocks(selectedSource, sourceId);
    console.log(locksRes);
    // TODO: Get lock response and upsert to supabase table

    setFlowState("SUCCESS");
    setLoading(false);

    const sourceConfigs = await getUserSourceConfigs(user.id);
    dispatch(sourcesSlice.actions.setSourceConfigs(sourceConfigs));
  }, [email, password, selectedSource, user]);

  const selectFlow = useMemo(() => {
    return (
      <>
        <div className={cx("header-row")}>
          <label className={cx("header")}>Add a new source</label>
          <button className={cx("close-button")} onClick={onExitPopup}>
            <label className={cx("label")}>✕</label>
          </button>
        </div>
        <label className={cx("label")}>
          Select a source from the list below to integrate with ProtoShell.
        </label>
        <label className={cx("label-small")}>
          The list below displays all the sources that can currently be
          integrated with ProtoShell.
        </label>
        {noIntegratedSourcesRemain && (
          <label className={cx("label-special")}>
            You have already added all existing sources integrated with
            ProtoShell.
          </label>
        )}
        <div className={cx("sources-grid")}>
          {sourcesModified.map((s) => {
            const sourceType = getSourceTypeByTypeId(s.typeId);
            return (
              <div
                className={cx(
                  "source-container",
                  { disabled: s.integrated },
                  { selected: s.id === selectedSource?.id }
                )}
                onClick={() => {
                  if (!s.integrated) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { integrated, ...source } = s;
                    setSelectedSource(source);
                  }
                }}
                key={`${s.name}-button`}
              >
                <img src={s.logo} width={60} />
                <label className={cx("header")}>{s.label}</label>
                <label className={cx("label")}>{sourceType?.label}</label>
                {s.integrated && (
                  <label className={cx("label-small")}>
                    Already Integrated
                  </label>
                )}
              </div>
            );
          })}
        </div>
        <div className={cx("flow-nav")}>
          <button
            className={cx("next-button", { disabled: !selectedSource })}
            disabled={!selectedSource}
            onClick={() => setFlowState("AUTH")}
          >
            <label className={cx("button-label")}>Next</label>
          </button>
        </div>
      </>
    );
  }, [noIntegratedSourcesRemain, onExitPopup, selectedSource, sourcesModified]);

  const authFlow = useMemo(() => {
    return (
      <>
        <div className={cx("header-row")}>
          <label className={cx("header")}>Enter source credentials</label>
          <button className={cx("close-button")} onClick={onExitPopup}>
            <label className={cx("label")}>✕</label>
          </button>
        </div>
        <label className={cx("label")}>
          Enter your credentials for {selectedSource?.label} to request an
          integration between the ProtoShell platform and{" "}
          {selectedSource?.label}
        </label>
        <label className={cx("label-small")}>
          Clicking integrate will initiate a request from our end with{" "}
          {selectedSource?.label}
        </label>
        <div className={cx("form-container")}>
          <label className={cx("form-header")}>
            {selectedSource?.label} authentication
          </label>
          {integrateError && (
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
        </div>
        <div className={cx("flow-nav")}>
          <button
            className={cx("next-button", {
              disabled: (!email && !password) || loading,
            })}
            disabled={(!email && !password) || loading}
            onClick={() => {
              void integrate();
            }}
          >
            {loading ? (
              <Loading />
            ) : (
              <label className={cx("button-label")}>Integrate</label>
            )}
          </button>
          <button
            className={cx("back-button", { disabled: loading })}
            disabled={loading}
            onClick={() => {
              setEmail("");
              setPassword("");
              setFlowState("SELECT");
              setIntegrateError(false);
              setLoading(false);
            }}
          >
            <label className={cx("button-label")}>Back</label>
          </button>
        </div>
      </>
    );
  }, [
    email,
    integrate,
    integrateError,
    loading,
    onExitPopup,
    password,
    selectedSource?.label,
  ]);

  const successFlow = useMemo(() => {
    return (
      <>
        <div className={cx("header-row")}>
          <label className={cx("header")}>New integration added</label>
        </div>
        <label className={cx("label")}>
          {selectedSource?.label} has been successfully integrated with
          ProtoShell!
        </label>
        <label className={cx("label-small")}>
          You can now see the different locks that you can control through for{" "}
          {selectedSource?.label}
          ProtoShell in the Control Center. Feel free to close this popup or
          click the button below to go to the Control Center
        </label>

        <div className={cx("flow-nav")}>
          <button
            className={cx("next-button")}
            onClick={() => {
              navigate(`${CONTROL_CENTER_ROUTE}`);
            }}
          >
            <label className={cx("button-label")}>Go to Control Center</label>
          </button>
          <button className={cx("back-button")} onClick={onExitPopup}>
            <label className={cx("button-label")}>Close</label>
          </button>
        </div>
      </>
    );
  }, [navigate, onExitPopup, selectedSource?.label]);

  return (
    <Popup onExit={onExitPopup}>
      {/* <div className={cx("add-source-container")}>{renderPopup}</div> */}
      <div className={cx("add-source-container")}>
        {flowState === "SELECT" && selectFlow}
        {flowState === "AUTH" && authFlow}
        {flowState === "SUCCESS" && successFlow}
      </div>
    </Popup>
  );
});
