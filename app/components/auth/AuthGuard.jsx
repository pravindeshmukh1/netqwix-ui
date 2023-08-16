import { useEffect } from "react";
import { useRouter } from "next/router";
import { LOCAL_STORAGE_KEYS, routingPaths } from "../../common/constants";
import { useAppDispatch, useAppSelector } from "../../store";
import { authState, getMeAsync } from "./auth.slice";

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isUserLoggedIn } = useAppSelector(authState);
  const path = router.asPath;
  const authSelector = useAppSelector(authState);

  useEffect(() => {
    if (authSelector.showGoogleRegistrationForm.isFromGoogle) {
      router.push(routingPaths.signUp);
    }
  }, [authSelector.showGoogleRegistrationForm]);

  useEffect(() => {
    const isTokenExists = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)
      ? true
      : false;
    if (isTokenExists) {
      dispatch(getMeAsync());
      router.push(routingPaths.dashboard);
    } else {
      if (path === routingPaths.signUp) {
        router.push(path);
      } else if (path === routingPaths.forgetPassword) {
        router.push(path);
      } else if (path === routingPaths.verifiedForgetPassword) {
        router.push(path);
      } else {
        router.push(routingPaths.signIn);
      }
    }
  }, [isUserLoggedIn, path]);

  return children;
};

export default AuthGuard;
