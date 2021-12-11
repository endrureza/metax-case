import { UserContext } from "@/context/AuthContext";
import { useContext } from "react";

const useUser = () => {
  const { user, session } = useContext(UserContext);

  return { user, session };
};

export default useUser;
