import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useRouter } from "next/router";

const DaktarContext = React.createContext();

export const ContextProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [socket, setSocket] = useState();
  const [incomingCall, setIncomingCall] = useState({});
  const [callAccepted, setCallAccepted] = useState();
  const router = useRouter();

  // console.log(loginToken);
  const setupSocket = () => {
    const token = localStorage.getItem("loginToken");
    if (token && !socket) {
      const newSocket = io(process.env.NEXT_PUBLIC_BASE_URL, {
        query: {
          token: token.slice(1, token.length - 1),
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        console.log("socket disconnected");
        setTimeout(setupSocket, 3000);
      });
      newSocket.on("connect", () => {
        console.log("socket connected.");
      });

      setSocket(newSocket);

      newSocket.on("new_message", () => {
        console.log("something");
      });
    }
  };

  const callFromDoc = () => {
    if (socket) {
      socket.on("incomingCall", (data) => {
        setIncomingCall(data);
        console.log(data);
      });

      socket.on("callAccepted", (data) => {
        // console.log(data);
        setCallAccepted(data);
      });
      socket.on("notification", (data) => {
        console.log(data);
      });
    }
  };

  useEffect(() => {
    callFromDoc();
  }, [socket]);

  useEffect(() => {
    const trySetup = () => {
      if (localStorage.getItem("loginToken")) {
        setupSocket();
      } else {
      }
    };
    trySetup();
    //eslint-disable-next-line
  }, [loggedInUser]);

  const getUser = async () => {
    try {
      const getToken = JSON.parse(localStorage.getItem("loginToken"));
      if (getToken) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
            method: "GET",
            headers: { sobar_daktar_session: getToken },
            mode: "cors",
          });
          const data = await res.json();
          // console.log(data);
          if (data.success === "no") {
            localStorage.removeItem("loginToken");
            setLoggedInUser({});
            router.push("/Login");
          } else {
            setLoggedInUser(data);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err, "erro");
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
        socket,
        incomingCall,
        callAccepted,
      }}
    >
      {children}
    </DaktarContext.Provider>
  );
};

export default DaktarContext;
