import { useEffect } from "react";
import { useRouter } from "next/router";
import { LOCAL_STORAGE_KEYS } from "../../common/constants";
import { useAppDispatch, useAppSelector } from "../../store";
import { authState, getMeAsync } from "./auth.slice";

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isUserLoggedIn } = useAppSelector(authState);
  const path = router.asPath;
  const authSelector = useAppSelector(authState);

  useEffect(() => {
    if(authSelector.showGoogleRegistrationForm.isFromGoogle) {
      router.push("/auth/signUp");
    }
  }, [authSelector.showGoogleRegistrationForm])



  useEffect(() => {
    const isTokenExists = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)
      ? true
      : false;
    if (isTokenExists) {
      dispatch(getMeAsync());
      router.push("/dashboard");
    } else {
      if (path === "/auth/signUp") {
        router.push("/auth/signUp");
      } else {
        router.push("/auth/signIn");
      }
    }
  }, [isUserLoggedIn, path]);

  return children;
};

export default AuthGuard;
