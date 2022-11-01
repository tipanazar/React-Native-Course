import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AuthNavigation from "./shared/Components/AuthNavigation";
import MainNavigation from "./shared/Components/MainNavigation";

import { getUserId } from "./redux/selectors";
import { getCurrentUser } from "./redux/user/userOperations";
import { getPosts } from "./redux/post/postOperations";
import { useState } from "react";

const Main = () => {
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (!userId) {
      dispatch(getCurrentUser());
    }
  }, [userId]);

  useEffect(() => {
    if (userId && isFirstRender) {
      setIsFirstRender(false);
      dispatch(getPosts());
    }
  });

  return <>{userId ? <MainNavigation /> : <AuthNavigation />}</>;
};

export default Main;
