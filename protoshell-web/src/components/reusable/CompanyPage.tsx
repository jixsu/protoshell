import { memo, useCallback, useEffect, useMemo, useState } from "react";
// Ignore the ts error below, it is due to vite's client.d.ts shortcoming: https://github.com/vitejs/vite/issues/2269
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import classNames from "classnames/bind";
import styles from "./CompanyPage.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { getLocks, setLock } from "@/supabase/locks";
import { useAppSelector } from "@/store/hooks";
import { SourceDBName, SourceType } from "@/schema";
import {
  SOURCE_COLUMN_BLACKLIST,
  getSourceByDBName,
  getSourceTypeByTypeId,
} from "@/utils/sources";
import { Lock } from "./Lock";
import { postLockUpdateToCompany } from "../../supabase/accounts";

const cx = classNames.bind(styles);

export const CompanyPage = memo(() => {
  const [locks, setLocks] = useState<object | undefined>(undefined);

  const [pendingLocks, setPendingLocks] = useState<string[]>([]);

  const navigate = useNavigate();
  const params = useParams();

  const sourceConfigs = useAppSelector((state) => state.sources.sourceConfigs);
  const source = getSourceByDBName(params.companyName as SourceDBName);
  const sourceType: SourceType | undefined = useMemo(() => {
    if (!source) {
      return undefined;
    }
    return getSourceTypeByTypeId(source.typeId);
  }, [source]);
  const sourceConfig = sourceConfigs?.find(
    (sc) => sc.name === params.companyName
  );

  useEffect(() => {
    if (sourceConfig && !locks) {
      void (async () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const locks: object | undefined = await getLocks(
          sourceConfig.name,
          sourceConfig.userId
        );

        if (locks) {
          setLocks(locks);
        }
      })();
    }
  }, [locks, params.companyName, source, sourceConfig]);

  const onLockToggle = useCallback(
    (colName: string, newValue: number) => {
      if (!source || !sourceConfig) {
        return;
      }
      setPendingLocks((oldPending) => [...oldPending, colName]);
      void (async () => {
        const locks: object | undefined = await setLock(
          source.dbName,
          sourceConfig.userId,
          colName,
          newValue
        );
        if (locks) {
          setLocks(locks);
          const result = await postLockUpdateToCompany(
            params.companyName as SourceDBName,
            locks
          );
          if (result) {
            setPendingLocks([]);
          }
        }
      })();
    },
    [params.companyName, source, sourceConfig]
  );

  const lockSection = useMemo(() => {
    if (!locks) {
      return [];
    }
    const locksArray = Object.entries(locks);
    const filteredLocksArray = [];
    for (const lock of locksArray) {
      const key = lock[0];
      if (!SOURCE_COLUMN_BLACKLIST.includes(key)) {
        filteredLocksArray.push(lock);
      }
    }

    return filteredLocksArray.map((lock, i) => (
      <Lock
        key={`lock-${i}`}
        className={cx("lock")}
        description={
          source && lock[0] in source.lockInfo
            ? source.lockInfo[lock[0] as keyof typeof source.lockInfo]
            : source?.lockInfo.DEFAULT
        }
        onToggle={() => onLockToggle(lock[0], lock[1] ? 0 : 1)}
        label={lock[0]}
        value={lock[1] ? true : false}
        pending={pendingLocks.some((item) => item == lock[0]) ? true : false}
        popupTitle={lock[1] ? `Unlocking ${lock[0]}` : `Locking ${lock[0]}`}
        popupDescription={
          source && lock[0] in source.lockConfirms
            ? source.lockConfirms[lock[0] as keyof typeof source.lockConfirms]
            : source?.lockConfirms.DEFAULT
        }
      />
    ));
  }, [locks, onLockToggle, pendingLocks, source]);

  return (
    <div className={cx("page-container")}>
      <button className={cx("back-button")} onClick={() => navigate(-1)}>
        {"<-"}
      </button>
      <div className={cx("company-info-container")}>
        <div className={cx("lhs")}>
          <img src={source?.logo} width={100} />
        </div>
        <div className={cx("rhs")}>
          <label className={cx("header")}>{source?.label}</label>
          <label className={cx("label")}>{sourceType?.label}</label>
          <label className={cx("label-small")}>{source?.description}</label>
        </div>
      </div>
      <label className={cx("lock-info")}>
        The list below shows the different locks controlled by you. Click on the
        toggle to adjust the visibility of the corresponding data to{" "}
        {source?.label}
      </label>
      <label className={cx("lock-info")}>
        Locks are updated in realtime on our end. However, to see the changes in
        effect on {source?.label}'s side, this change may take up to 24 hours
      </label>
      <div className={cx("lock-container")}>{lockSection}</div>
    </div>
  );
});
