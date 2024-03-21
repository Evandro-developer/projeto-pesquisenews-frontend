import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

const useCurrentUser = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  return { currentUser, setCurrentUser };
};

export default useCurrentUser;
