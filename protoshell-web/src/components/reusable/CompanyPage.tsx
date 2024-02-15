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

const cx = classNames.bind(styles);

export const CompanyPage = memo(() => {
  const [locks, setLocks] = useState<object | undefined>(undefined);
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
      void (async () => {
        const locks: object | undefined = await setLock(
          source.dbName,
          sourceConfig.userId,
          colName,
          newValue
        );
        if (locks) {
          setLocks(locks);
        }
      })();
    },
    [source, sourceConfig]
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

    return filteredLocksArray.map((lock) => (
      <Lock
        className={cx("lock")}
        onToggle={() => onLockToggle(lock[0], lock[1] ? 0 : 1)}
        label={lock[0]}
        value={lock[1] ? true : false}
      />
    ));
  }, [locks, onLockToggle]);

  return (
    <div className={cx("page-container")}>
      <button className={cx("back-button")} onClick={() => navigate(-1)}>
        {"<-"}
      </button>
      <div className={cx("company-info-container")}>
        <div className={cx("lhs")}>{source?.logo}</div>
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
      <div className={cx("lock-container")}>{lockSection}</div>
    </div>
  );
});
