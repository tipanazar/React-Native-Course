import { useSelector } from "react-redux";

import AuthNavigation from "./shared/Components/AuthNavigation";
import MainNavigation from "./shared/Components/MainNavigation";
import { getUserId } from "./redux/selectors";

const Routes = () => {
  const userId = useSelector(getUserId);
  console.log(userId);
  return <>{userId ? <MainNavigation /> : <AuthNavigation />}</>;
};

export default Routes;
