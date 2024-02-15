import { memo, useEffect, useMemo, useState } from "react";
// Ignore the ts error below, it is due to vite's client.d.ts shortcoming: https://github.com/vitejs/vite/issues/2269
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import classNames from "classnames/bind";
import styles from "./CompanyPage.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { getLocks } from "@/supabase/locks";
import { useAppSelector } from "@/store/hooks";
import { SourceDBName } from "@/schema";
import { SOURCE_COLUMN_BLACKLIST, getSourceByDBName } from "@/utils/sources";

const cx = classNames.bind(styles);

export const CompanyPage = memo(() => {
  const [locks, setLocks] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  const sourceConfigs = useAppSelector((state) => state.sources.sourceConfigs);
  const source = getSourceByDBName(params.companyName as SourceDBName);
  const sourceConfig = sourceConfigs?.find(
    (sc) => sc.name === params.companyName
  );

  useEffect(() => {
    if (sourceConfig) {
      void (async () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const locks: object = await getLocks(
          sourceConfig.name,
          sourceConfig.userId
        );
        setLocks(locks);
      })();
    }
  }, [params.companyName, source, sourceConfig]);

  const lockSection = useMemo(() => {
    const locksArray = Object.entries(locks);
    const filteredLocksArray = [];
    for (const lock of locksArray) {
      const key = lock[0];
      if (!SOURCE_COLUMN_BLACKLIST.includes(key)) {
        filteredLocksArray.push(lock);
      }
    }

    return filteredLocksArray.map((lock) => (
      <div>
        {lock[0]}: {lock[1] as string}
      </div>
    ));
  }, [locks]);

  return (
    <div>
      <button className={cx("back_button")} onClick={() => navigate(-1)}>
        {"<-"}
      </button>
      <h1> company: {params.companyName} </h1>
      <div>{lockSection}</div>
    </div>
  );
});
