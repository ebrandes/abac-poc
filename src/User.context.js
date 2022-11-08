import { createContext, useCallback, useContext, useState } from "react";

const UserContext = createContext({});

const UserProvider = (props) => {
  async function getUser() {
    // const { data } = await BaseRequest.get("/users?document=02742547002");
    // const { data } = await BaseRequest.get("/users?document=11111111111");
    const user = {
        id: 1,
        name: 'Eduardo Brandes',
        roles: ['CLIENTES_RIESGOS']
    }
    setUser(user);
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
