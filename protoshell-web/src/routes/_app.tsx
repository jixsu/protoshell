import { Home } from "@/components/Home";
import { useAppSelector } from "@/store/hooks";
import "@/styles/styles.module.scss";
import { LOGIN_ROUTE } from "@/utils/routes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const loggedInUser = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  console.log(loggedInUser);

  useEffect(() => {
    if (!loggedInUser) {
      console.log("renavigating");
      navigate(`/${LOGIN_ROUTE}`);
    }
  }, [loggedInUser, navigate]);

  return (
    <>
      <Home />
    </>
  );
}

export default App;
