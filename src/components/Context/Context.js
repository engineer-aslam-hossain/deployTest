import React, { useEffect, useState } from "react";

const DaktarContext = React.createContext();

export const ContextProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({});

  const getUser = async () => {
    try {
      const getToken = JSON.parse(localStorage.getItem("loginToken"));
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
        method: "GET",
        headers: { sobar_daktar_session: getToken },
        mode: "cors",
      });
      const data = await res.json();
      // console.log(data);
      setLoggedInUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <DaktarContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
      }}
    >
      {children}
    </DaktarContext.Provider>
  );
};

export default DaktarContext;
