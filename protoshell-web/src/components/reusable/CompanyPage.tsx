import { memo, useEffect, useState } from "react";
// Ignore the ts error below, it is due to vite's client.d.ts shortcoming: https://github.com/vitejs/vite/issues/2269
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as ProtoShellLogo } from "@/assets/protoshell.svg";
import { useNavigate, useParams } from "react-router-dom";
import { getLocks } from "@/supabase/locks";
import { useAppSelector } from "@/store/hooks";

export const CompanyPage = memo(() => {
  let [locks, setLocks] = useState({});

  const params = useParams();

  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (params.companyName) {
      fetchLocks(params.companyName);
    } else {
      console.log("got to a companypage, but couldn't find valid URL");
    }
  }, [])

  async function fetchLocks(name: String) {
    if (!user) {
      return;
    }
    try {
      const response = await getLocks(name, user.username);
      setLocks(response[0]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1> company: {params.companyName} </h1>
      <h3> user: {(locks as any).id}</h3>
    </div>
  );
});