import { createContext, useCallback, useContext, useState } from "react";
import BaseRequest from "./Axios.config";

const UserContext = createContext({});

const UserProvider = (props) => {
  async function getUser() {
    // const { data } = await BaseRequest.get("/users?document=02742547002");
    const { data } = await BaseRequest.get("/users?document=11111111111");
    setUser(data);
  }

  const [user, setUserContext] = useState();

  const setUser = useCallback((user) => {
    setUserContext(user);
    console.info("updated user: ", user);
    return () => null;
  }, []);

  useState(() => getUser(), []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUserContext = () => useContext(UserContext);
