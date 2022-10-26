import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AuthNavigation from "./shared/Components/AuthNavigation";
import MainNavigation from "./shared/Components/MainNavigation";

import { getUserId } from "./redux/selectors";
import { getCurrentUser } from "./redux/user/userOperations";

const Main = () => {
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  useEffect(() => {
    if (!userId) {
      dispatch(getCurrentUser());
      // console.log("get")
    }
  });

  // console.log(userId);

  return <>{userId ? <MainNavigation /> : <AuthNavigation />}</>;
};

export default Main;
