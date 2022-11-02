import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserId } from "./redux/selectors";
import { getCurrentUser } from "./redux/user/userOperations";
import { getPosts } from "./redux/post/postOperations";

import AuthNavigation from "./shared/Components/AuthNavigation";
import MainNavigation from "./shared/Components/MainNavigation";

const Main = () => {
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);

  useEffect(() => {
    if (!userId) {
      dispatch(getCurrentUser());
    }
  }, [userId]);
  userId && dispatch(getPosts());

  return <>{userId ? <MainNavigation /> : <AuthNavigation />}</>;
};

export default Main;
